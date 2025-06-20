---
title: "React Hooks完全ガイド：関数コンポーネントをマスターする"
date: "2024-01-10"
excerpt: "React Hooksのすべてを網羅した完全ガイド。useStateからカスタムフックまで、プロジェクトですぐに適用できる実践的な例でReact Hooksをマスターしましょう。"
coverImage: "/images/react-hooks.jpg"
categories: ["React", "フロントエンド", "JavaScript"]
tags: ["React", "Hooks", "useState", "useEffect", "カスタムフック"]
author: "開発者"
featured: true
---

# React Hooks完全ガイド

React 16.8で導入されたReact Hooksは、関数コンポーネントで状態管理とライフサイクルを扱えるようにする革新的な機能です。このガイドでは、実務で最もよく使われるHooksから高度なパターンまでのすべてを扱います。

## 基本Hooks

### useState：状態管理の基本

`useState`は関数コンポーネントで状態を管理する最も基本的なHookです。

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>現在のカウント：{count}</p>
      <button onClick={() => setCount(count + 1)}>
        増加
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        減少
      </button>
    </div>
  );
}
```

#### useState活用のコツ
- **関数型更新**：以前の状態に依存する場合は関数を渡す
- **初期値の遅延計算**：コストの高い初期値は関数で渡す
- **複数状態の分離**：関連のない状態は別々に管理

### useEffect：副作用の処理

`useEffect`はコンポーネントのライフサイクルと副作用を管理します。

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
        console.error('ユーザーデータの読み込み失敗：', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userIdが変更された時のみ実行

  if (loading) return <div>読み込み中...</div>;
  if (!user) return <div>ユーザーが見つかりません</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 高度なHooks

### useReducer：複雑な状態管理

複数の状態が複雑に関連している場合は`useReducer`を使用します。

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
    // JSX実装...
  );
}
```

### useContext：グローバル状態の共有

コンポーネントツリー全体で状態を共有する場合に使用します。

```javascript
import { createContext, useContext, useState } from 'react';

// Context作成
const ThemeContext = createContext();

// Providerコンポーネント
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

// カスタムフック
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeはThemeProvider内で使用する必要があります');
  }
  return context;
}
```

## カスタムHooks

ロジックを再利用するために独自のHookを作成できます。

### useFetch：API呼び出しHook

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
          throw new Error(`HTTPエラー！ステータス：${response.status}`);
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

// 使用例
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts');

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー：{error}</div>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## パフォーマンス最適化Hooks

### useMemo：値のメモ化

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('フィルタリング処理実行');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // itemsまたはfilterが変更された時のみ再計算

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Hook使用ルール

### 1. Hook呼び出しルール
- **トップレベルでのみ呼び出し**：ループ、条件文、ネストした関数内での呼び出し禁止
- **React関数からのみ呼び出し**：通常のJavaScript関数からの呼び出し禁止

```javascript
// ❌ 間違った使用
function BadComponent() {
  if (someCondition) {
    const [state, setState] = useState(0); // 条件付き呼び出し
  }
  
  return <div>...</div>;
}

// ✅ 正しい使用
function GoodComponent() {
  const [state, setState] = useState(0);
  
  if (someCondition) {
    // 条件付きロジック
  }
  
  return <div>...</div>;
}
```

## 実践パターン

### データフェッチングパターン
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
      cancelled = true; // クリーンアップでメモリリーク防止
    };
  }, [url]);

  return state;
}
```

## まとめ

React Hooksは関数コンポーネントの可能性を大幅に拡張する強力なツールです。このガイドで扱った内容を実際のプロジェクトに適用して経験を積んでください。

### 次のステップ
- **高度なパターン**：Compound Components、Render PropsパターンとHooksの組み合わせ
- **テスト**：React Testing Libraryを活用したHookテスト
- **パフォーマンス分析**：React DevTools Profilerを活用した最適化

*Hook使用経験や質問があればコメントで共有してください！* 