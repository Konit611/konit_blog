---
title: SwiftUI 属性包装器
date: 2025-06-20 07:24
excerpt: 整理了在 SwiftUI 中重要使用的属性包装器。
coverImage: 
categories:
  - iOS
tags:
  - iOS
  - Properties
author: Geunil Park
featured: false
---
## 摘要

属性是用户属性修饰符

## 1. @State

SwiftUI 中处理状态的方法
存储视图状态的属性，状态管理主体是各个对应的视图
默认为私有声明，因此要与其他视图进行值通信需要使用 Binding
每当值发生变化时 UI 都会更新

## 2. @Binding

绑定视图和状态的方法
接收上级 @State 变量并在下级视图中捕获以检测变化和连接
Binding 连接其他视图拥有的属性，因此没有所有权和存储空间（只是连接）

## 2. ObservableObject

类协议，当观察的任何值发生变化时通知变更 -> 主要在视图模型中采用
可以在视图中创建视图模型对象时用于监控实例变化。
-> 可以使用 objectWillChange()

## 2. @Published

在实现 ObservableObject 的类内声明属性时使用。
可以在视图中观察用 @Published 声明的属性。
当 @Published 属性发生变化时自动调用 ObservableObject 的 objectWillChange.send() 功能。

## 2. @ObservedObject

在视图中声明 ObservableObject 类型实例时使用
当 ObservableObject 的值更新时更新视图。

## 2. @StateObject

在视图中声明 ObservableObject 类型实例时使用
每个视图创建一个实例，在视图消失之前维护同一个实例
解决 @ObservableObject 视图渲染时实例初始化问题的方法
在最初创建声明时使用 @StateObject 是合适的方法，而不是像外部注入那样每次都新创建实例的情况。

## 2. @Environment

预定义的系统共享数据
通过将要使用的共享数据名称作为 keyPath 传递来使用
系统共享数据是可变的，因此需要用 var 声明（可以在视图内部更改）
视图创建时值会自动初始化（在视图内部更改后再回来会恢复原状）

## @EnvironmentObject

通过 ObservableObject 实现的类型实例全局共享使用。
-> 全局使用同一个对象。
注入和使用整个应用程序中共同使用的数据
滥用会使数据依赖性过大，单元测试变得困难（每个测试都需要注入，太多的话就是开销） 