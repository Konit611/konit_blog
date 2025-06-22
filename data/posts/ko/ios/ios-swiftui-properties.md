---
title: SwiftUI의 프로퍼티 래퍼
date: 2025-06-20 07:24
excerpt: SwiftUI에서 중요하게 쓰이는 프로퍼티 래퍼들을 정리해봤다.
coverImage: 
categories:
  - iOS
tags:
  - iOS
  - Properties
author: Geunil Park
featured: false
---
## Summary

Property는 사용자 속성 Modifier

## 1. @State

SwiftUI에서 상태를 처리하는 방법
뷰의 상태를 저장하는 프로퍼티로 상태 관리 주체는 각 해당 뷰
기본적으로 Private 선언이기에 다른 뷰와 값을 소통하려면 Binding을 이용
값이 변경될 때마다 UI가 업데이트됨

## 2. @Binding

뷰와 상태를 바인딩 하는 방법
상위 @State 변수를 전달 받아 하위 뷰에서 캐치해 변화 감지 및 연결
Binding은 다른 뷰가 소유한 속성을 연결하기에 소유권 및 저장 공간이 없음 (연결만 한다)

## 2. ObservableObject

클래스 프로토콜로, 관찰하는 어떠한 값이 변경되면 변경사항을 알려줌 -> 주로 뷰 모델에서 채택
뷰에서 인스턴스 변화를 감시하기 위해 뷰모델 객체로 생성할 때 사용할 수 있음.
-> objectWillChange()를 사용할 수 있게 됨

## 2. @Published

ObservableObject를 구현한 클래스 내에서 프로퍼티 선언 시 사용.
@Published로 선언된 프로퍼티를 뷰에서 관찰할 수 있음.
ObservableObject의 objectWillChange.send() 기능을 @Published 프로퍼티가 변경되면 자동으로 호출.

## 2. @ObservedObject

뷰에서 ObservableObject 타입의 인스턴스 선언 시 사용
ObservableObject의 값이 업데이트되면 뷰를 업데이트함.

## 2. @StateObject

뷰에서 ObservableObject 타입의 인스턴스 선언 시 사용
뷰마다 하나의 인스턴스를 생성하며, 뷰가 사라지기 전까지 같은 인스턴스 유지
@ObservableObject의 뷰 렌더링 시 인스턴스 초기화 이슈 해결을 위한 방법
매번 인스턴스가 새롭게 생성되는 것처럼 외부에서 주입받는 경우가 아닌, 최초 생성 선언 시에 @StateObject를 사용하는 것이 적절한 방법.

## 2. @Environment

미리 정의된 시스템 공유 데이터
사용하려는 공유 데이터의 이름을 keyPath로 전달하여 사용
시스템 공유 데이터는 가변하기에 var로 선언할 필요가 있음 (뷰 내부에서 바꿀 수 있음)
뷰가 생성되는 시점에 값이 자동으로 초기화 (뷰 내부에서 바꾼 후 다시 돌아오면 원래대로 돌아와있음)

## @EnvironmentObject

ObservableObject를 통해 구현된 타입의 인스턴스를 전역적으로 공유하여 사용. 
-> 전역적으로 동일한 객체를 사용한다.
앱 전역에서 공통으로 사용할 데이터를 주입 및 사용
남발하면 데이터 의존성이 너무 커짐, Unit Test가 어려워짐 (각 테스트별로 넣어줘야하는데 너무 많아지면 Overhead임)
