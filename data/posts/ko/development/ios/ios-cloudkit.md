---
title: Mac App과 iOS App 간의 iCloud 동기화 원리 및 구현 분석
date: 2026-01-18 11:44
excerpt: 네트워크를 사용하지 않고 Mac과 iOS 간의 데이터를 동기화해보았다.
coverImage: 
categories:
  - iOS
tags:
  - iOS
  - CloudKit
author: Geunil Park
featured: false
---

## 1. 개요 (Overview)
현재 개발 중인 `Meku` 프로젝트는 Mac App과 iOS App 간의 데이터 동기화를 성공적으로 구현했습니다. 이 동기화는 Apple의 최신 데이터 관리 프레임워크인 **SwiftData**와 백엔드 서비스인 **CloudKit**의 결합을 통해 이루어집니다.

개발자가 별도의 동기화 로직이나 네트워킹 코드를 작성하지 않아도, 데이터 모델을 정의하고 적절한 설정만 해주면 Apple 플랫폼의 내부 메커니즘을 통해 자동으로 데이터가 동기화됩니다.

---

## 2. 사용된 핵심 기술 (Core Technologies)

### 1) SwiftData
- Apple이 WWDC23에서 공개한 최신 데이터 관리 프레임워크입니다.
- Core Data를 기반으로 구축되었지만, Swift 언어의 특성을 살려 훨씬 간결하고 직관적인 API를 제공합니다.
- `@Model` 매크로를 사용하여 데이터 모델을 쉽게 정의할 수 있습니다.

### 2) CloudKit
- Apple의 iCloud 서버와 상호작용하기 위한 프레임워크입니다.
- 앱의 데이터를 iCloud에 저장하고, 사용자의 모든 기기에서 해당 데이터에 접근할 수 있게 해줍니다.
- Public, Private, Shared Database 등 다양한 데이터 공유 방식을 지원합니다.

### 3) NSPersistentCloudKitContainer (내부 동작)
- SwiftData는 내부적으로 Core Data의 `NSPersistentCloudKitContainer`를 활용합니다.
- 이 컨테이너는 로컬 데이터베이스(SQLite)와 iCloud(CloudKit) 간의 데이터 미러링을 관리하는 **동기화 엔진** 역할을 수행합니다.

---

## 3. 동기화 원리 (Sync Mechanism)

데이터 동기화는 다음과 같은 원리로 작동합니다:

1.  **로컬 저장**: 앱에서 데이터를 생성하거나 수정하면, SwiftData는 이를 로컬 저장소(SQLite)에 저장합니다.
2.  **변경 사항 감지**: `NSPersistentCloudKitContainer`는 로컬 저장소의 변경 사항을 감지합니다.
3.  **iCloud 업로드**: 변경된 데이터는 백그라운드에서 자동으로 CloudKit Private Database로 업로드됩니다.
4.  **원격 알림 (Push Notification)**: 데이터가 iCloud에 변경되면, CloudKit은 동일한 계정을 사용하는 다른 기기(예: Mac 또는 iPhone)에 "데이터가 변경되었다"는 무언의 푸시 알림(Silent Push)을 보냅니다.
5.  **데이터 가져오기 (Fetch)**: 알림을 받은 기기는 CloudKit에서 변경된 데이터를 다운로드하여 자신의 로컬 저장소에 반영(Merge)합니다.
6.  **UI 업데이트**: SwiftData와 바인딩된 SwiftUI 뷰(`@Query` 등)가 자동으로 갱신되어 사용자에게 최신 데이터를 보여줍니다.

이 모든 과정은 **개발자가 별도의 동기화 코드를 작성하지 않아도** 프레임워크 수준에서 자동으로 처리됩니다.

---

## 4. `Meku` 프로젝트의 실제 구현 (Current Implementation)

현재 프로젝트는 SwiftData와 CloudKit을 연동하기 위한 필수 구성을 모두 갖추고 있습니다.

### 1) 데이터 모델 정의 (`Item.swift`)
SwiftData의 `@Model` 매크로를 사용하여 데이터 모델을 정의했습니다. 이 모델은 자동으로 Core Data 엔티티 및 CloudKit 레코드로 변환될 수 있는 구조를 가집니다.

```swift
// Meku/Item.swift
import SwiftData

@Model
final class Item {
    var timestamp: Date = Date()
    var platform: String = ""
    
    init(timestamp: Date, platform: String) {
        self.timestamp = timestamp
        self.platform = platform
    }
}
```

### 2) ModelContainer 설정 (`MekuApp.swift`)
앱의 진입점에서 `ModelContainer`를 설정합니다. 기본적으로 `ModelConfiguration`을 통해 영구 저장소를 활성화하면, SwiftData는 권한(Entitlements)에 설정된 CloudKit 컨테이너를 자동으로 감지하여 동기화를 시도합니다.

```swift
// Meku/MekuApp.swift
import SwiftData

@main
struct MekuApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        // isStoredInMemoryOnly: false로 설정하여 영구 저장소 사용 및 CloudKit 동기화 활성화
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()
    // ...
}
```

### 3) 권한 및 기능 설정 (Entitlements)
`Meku.entitlements` 파일을 통해 앱이 iCloud와 CloudKit을 사용할 수 있는 권한을 부여받았습니다.
- **iCloud Services**: `CloudKit` 사용이 명시되어 있습니다.
- **iCloud Containers**: `iCloud.com.konit611.Meku`라는 컨테이너 식별자를 통해 데이터를 저장할 공간을 지정했습니다.
- **Background Modes**: (설정 화면에서 체크됨) `Remote notifications`가 활성화되어 있어야 실시간 동기화 알림을 받을 수 있습니다.

---

## 5. 공식 문서 및 참고 자료 (References)

이 블로그 포스트 작성에 참고할 수 있는 Apple 공식 문서들입니다.

### [Syncing model data across a person’s devices](https://developer.apple.com/documentation/swiftdata/syncing-model-data-across-a-persons-devices)
> **주요 내용**: SwiftData가 사용자의 기기 간에 모델 데이터를 동기화하는 방법과 이를 위해 필요한 CloudKit 권한 및 설정에 대해 설명합니다. 스키마 호환성 및 `ModelContainer`가 CloudKit 컨테이너를 추론하는 방식에 대한 내용을 포함합니다.

### [Preserving your app's model data across devices](https://developer.apple.com/documentation/swiftdata/preserving-your-apps-model-data-across-devices)
> **주요 내용**: 데이터 영속성과 기기 간 데이터 보존에 대한 전반적인 가이드를 제공합니다.

### [Mirroring a Core Data Store to CloudKit](https://developer.apple.com/documentation/coredata/mirroring_a_core_data_store_to_cloudkit)
> **주요 내용**: SwiftData의 기반이 되는 Core Data와 CloudKit의 미러링 작동 원리를 심도 있게 다룹니다. 동기화가 내부적으로 어떻게 처리되는지 이해하는 데 유용합니다.
