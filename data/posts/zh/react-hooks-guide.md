---
title: "React Hooks完全指南：掌握函数组件"
date: "2024-01-10"
excerpt: "涵盖React Hooks所有内容的完整指南。从useState到自定义Hook，通过可立即应用于项目的实用示例来掌握React Hooks。"
coverImage: "/images/react-hooks.jpg"
categories: ["React", "前端", "JavaScript"]
tags: ["React", "Hooks", "useState", "useEffect", "自定义Hook"]
author: "开发者"
featured: true
---

# React Hooks完全指南

React Hooks是在React 16.8中引入的革命性功能，它允许你在函数组件中管理状态和生命周期。本指南涵盖了从实际工作中最常用的Hooks到高级模式的所有内容。

## 基础Hooks

### useState：状态管理基础

`useState`是在函数组件中管理状态的最基本Hook。

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        减少
      </button>
    </div>
  );
}
```

#### useState使用技巧
- **函数式更新**：依赖于之前状态时传递函数
- **惰性初始状态**：昂贵的初始值使用函数传递
- **分离多个状态**：不相关的状态分别管理

### useEffect：处理副作用

`useEffect`管理组件生命周期和副作用。

```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('加载用户数据失败：', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // 仅在userId变化时运行

  if (loading) return <div>加载中...</div>;
  if (!user) return <div>未找到用户</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 高级Hooks

### useReducer：复杂状态管理

当多个状态复杂关联时使用`useReducer`。

```javascript
import { useReducer } from 'react';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  return (
    // JSX实现...
  );
}
```

### useContext：全局状态共享

在整个组件树中共享状态时使用。

```javascript
import { createContext, useContext, useState } from 'react';

// 创建Context
const ThemeContext = createContext();

// Provider组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 自定义Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme必须在ThemeProvider内使用');
  }
  return context;
}
```

## 自定义Hooks

您可以创建自己的Hook来重用逻辑。

### useFetch：API调用Hook

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP错误！状态：${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// 使用示例
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts');

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误：{error}</div>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## 性能优化Hooks

### useMemo：值记忆化

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('执行过滤操作');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // 仅在items或filter变化时重新计算

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Hook使用规则

### 1. Hook调用规则
- **仅在顶层调用**：不要在循环、条件或嵌套函数内调用
- **仅从React函数调用**：不要从普通JavaScript函数调用

```javascript
// ❌ 错误用法
function BadComponent() {
  if (someCondition) {
    const [state, setState] = useState(0); // 条件调用
  }
  
  return <div>...</div>;
}

// ✅ 正确用法
function GoodComponent() {
  const [state, setState] = useState(0);
  
  if (someCondition) {
    // 条件逻辑
  }
  
  return <div>...</div>;
}
```

## 实用模式

### 数据获取模式
```javascript
function useApi(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await fetch(url);
        const data = await response.json();
        
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true; // 清理以防止内存泄漏
    };
  }, [url]);

  return state;
}
```

## 结论

React Hooks是一个强大的工具，大大扩展了函数组件的可能性。将本指南中涵盖的概念应用到实际项目中，积累您的经验。

### 下一步
- **高级模式**：将Compound Components、Render Props模式与Hooks结合
- **测试**：使用React Testing Library进行Hook测试
- **性能分析**：使用React DevTools Profiler进行优化

*在评论中分享您的Hook使用经验或问题！* 