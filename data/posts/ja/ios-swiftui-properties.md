---
title: SwiftUIのプロパティラッパー
date: 2025-06-20 07:24
excerpt: SwiftUIで重要に使われるプロパティラッパーをまとめました。
coverImage: 
categories:
  - iOS
tags:
  - iOS
  - Properties
author: Geunil Park
featured: false
---
## 概要

プロパティはユーザー属性修飾子

## 1. @State

SwiftUIで状態を処理する方法
ビューの状態を保存するプロパティで、状態管理主体は各該当ビュー
基本的にPrivate宣言のため、他のビューと値を通信するにはBindingを利用
値が変更されるたびにUIが更新される

## 2. @Binding

ビューと状態をバインディングする方法
上位@State変数を受け取って下位ビューでキャッチして変化感知および接続
Bindingは他のビューが所有するプロパティを接続するため、所有権および保存空間がない（接続のみ）

## 2. ObservableObject

クラスプロトコルで、観察している何らかの値が変更されると変更事項を知らせる -> 主にビューモデルで採択
ビューでインスタンス変化を監視するためにビューモデルオブジェクトで生成する時に使用できる。
-> objectWillChange()を使用できるようになる

## 2. @Published

ObservableObjectを実装したクラス内でプロパティ宣言時に使用。
@Publishedで宣言されたプロパティをビューで観察できる。
ObservableObjectのobjectWillChange.send()機能を@Publishedプロパティが変更されると自動的に呼び出し。

## 2. @ObservedObject

ビューでObservableObjectタイプのインスタンス宣言時に使用
ObservableObjectの値がアップデートされるとビューをアップデートする。

## 2. @StateObject

ビューでObservableObjectタイプのインスタンス宣言時に使用
ビューごとに一つのインスタンスを生成し、ビューが消える前まで同じインスタンス維持
@ObservableObjectのビューレンダリング時インスタンス初期化イシュー解決のための方法
毎回インスタンスが新しく生成されるような外部から注入される場合ではなく、最初の生成宣言時に@StateObjectを使用するのが適切な方法。

## 2. @Environment

事前定義されたシステム共有データ
使用したい共有データの名前をkeyPathで渡して使用
システム共有データは可変のためvarで宣言する必要がある（ビュー内部で変更可能）
ビューが生成される時点で値が自動的に初期化される（ビュー内部で変更後再び戻ると元通りに戻っている）

## @EnvironmentObject

ObservableObjectを通して実装されたタイプのインスタンスをグローバルに共有して使用。
-> グローバルに同一のオブジェクトを使用する。
アプリ全域で共通に使用するデータを注入および使用
乱用するとデータ依存性が大きくなりすぎ、Unit Testが困難になる（各テスト別に入れる必要があるが多すぎるとオーバーヘッド） 