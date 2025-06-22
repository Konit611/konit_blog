---
title: SwiftUI Property Wrappers
date: 2025-06-20 07:24
excerpt: A comprehensive guide to important property wrappers used in SwiftUI.
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

Properties are user attribute modifiers

## 1. @State

How to handle state in SwiftUI
A property that stores the state of a view, where the state management authority is each corresponding view
Declared as private by default, so to communicate values with other views, use Binding
UI is updated whenever the value changes

## 2. @Binding

How to bind views and state
Receives an upper @State variable and catches it in a lower view to detect changes and connect
Binding connects properties owned by other views, so it has no ownership or storage space (only connects)

## 2. ObservableObject

A class protocol that notifies when any observed value changes -> mainly adopted in view models
Can be used when creating view model objects to monitor instance changes in views.
-> Enables the use of objectWillChange()

## 2. @Published

Used when declaring properties within a class that implements ObservableObject.
Properties declared with @Published can be observed in views.
Automatically calls the objectWillChange.send() function of ObservableObject when @Published properties change.

## 2. @ObservedObject

Used when declaring instances of ObservableObject type in views
Updates the view when ObservableObject values are updated.

## 2. @StateObject

Used when declaring instances of ObservableObject type in views
Creates one instance per view and maintains the same instance until the view disappears
A solution to the instance initialization issue during view rendering in @ObservableObject
Using @StateObject for initial creation declaration is the appropriate method, rather than cases where instances are newly created each time like external injection.

## 2. @Environment

Predefined system shared data
Used by passing the name of the shared data you want to use as keyPath
System shared data is mutable, so it needs to be declared as var (can be changed inside the view)
Values are automatically initialized when the view is created (returns to original state when you come back after changing inside the view)

## @EnvironmentObject

Globally shares and uses instances of types implemented through ObservableObject.
-> Uses the same object globally.
Injects and uses data commonly used across the entire app
Overuse makes data dependencies too large, makes Unit Testing difficult (overhead as you need to inject for each test when there are too many) 