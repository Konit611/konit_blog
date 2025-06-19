---
title: "React Hooks 완벽 가이드: 함수형 컴포넌트 마스터하기"
date: "2024-01-10"
excerpt: "React Hooks의 모든 것을 담은 완전 가이드. useState부터 커스텀 훅까지, 실무에서 바로 적용할 수 있는 실전 예제와 함께 React Hooks를 마스터해보세요."
coverImage: "/images/react-hooks.jpg"
categories: ["React", "프론트엔드", "JavaScript"]
tags: ["React", "Hooks", "useState", "useEffect", "커스텀 훅"]
author: "개발자"
featured: true
---

# React Hooks 완벽 가이드

React 16.8에서 도입된 Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기를 다룰 수 있게 해주는 혁신적인 기능입니다. 이 가이드에서는 실무에서 가장 많이 사용되는 Hooks부터 고급 패턴까지 모든 것을 다뤄보겠습니다.

## 기본 Hooks

### useState: 상태 관리의 기본

`useState`는 함수형 컴포넌트에서 상태를 관리하는 가장 기본적인 Hook입니다.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        감소
      </button>
    </div>
  );
}
```

#### useState 활용 팁
- **함수형 업데이트**: 이전 상태에 의존하는 경우 함수를 전달
- **초기값 지연 계산**: 비용이 큰 초기값은 함수로 전달
- **여러 상태 분리**: 관련 없는 상태는 별도로 관리

### useEffect: 부수 효과 처리

`useEffect`는 컴포넌트의 생명주기와 부수 효과를 관리합니다.

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
        console.error('사용자 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userId가 변경될 때만 실행

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다.</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 고급 Hooks

### useReducer: 복잡한 상태 관리

여러 상태가 복잡하게 연관된 경우 `useReducer`를 사용합니다.

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
    // JSX 구현...
  );
}
```

### useContext: 전역 상태 공유

컴포넌트 트리 전체에서 상태를 공유할 때 사용합니다.

```javascript
import { createContext, useContext, useState } from 'react';

// Context 생성
const ThemeContext = createContext();

// Provider 컴포넌트
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

// 커스텀 훅
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 내에서 사용해야 합니다');
  }
  return context;
}
```

## 커스텀 Hooks

로직을 재사용하기 위해 자신만의 Hook을 만들 수 있습니다.

### useFetch: API 호출 Hook

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
          throw new Error(`HTTP error! status: ${response.status}`);
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

// 사용 예시
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts');

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### useLocalStorage: 로컬 스토리지 Hook

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`로컬 스토리지 읽기 오류:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`로컬 스토리지 저장 오류:`, error);
    }
  };

  return [storedValue, setValue];
}

// 사용 예시
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
      <input 
        type="range" 
        value={fontSize} 
        onChange={e => setFontSize(Number(e.target.value))}
        min="12" 
        max="24" 
      />
    </div>
  );
}
```

## 성능 최적화 Hooks

### useMemo: 값 메모이제이션

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('필터링 연산 실행');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // items나 filter가 변경될 때만 재계산

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback: 함수 메모이제이션

```javascript
import { useCallback, useState, memo } from 'react';

const TodoItem = memo(({ todo, onToggle, onDelete }) => {
  console.log('TodoItem 렌더링:', todo.id);
  
  return (
    <li>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleToggle = useCallback((id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
```

## Hook 사용 규칙

### 1. Hook 호출 규칙
- **최상위에서만 호출**: 반복문, 조건문, 중첩 함수 내에서 호출 금지
- **React 함수에서만 호출**: 일반 JavaScript 함수에서 호출 금지

```javascript
// ❌ 잘못된 사용
function BadComponent() {
  if (someCondition) {
    const [state, setState] = useState(0); // 조건부 호출
  }
  
  return <div>...</div>;
}

// ✅ 올바른 사용
function GoodComponent() {
  const [state, setState] = useState(0);
  
  if (someCondition) {
    // 조건부 로직
  }
  
  return <div>...</div>;
}
```

### 2. 의존성 배열 관리
```javascript
// ❌ 의존성 누락
useEffect(() => {
  fetchUser(userId);
}, []); // userId 의존성 누락

// ✅ 모든 의존성 포함
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

## 실전 패턴

### 데이터 페칭 패턴
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
      cancelled = true; // 클린업으로 메모리 누수 방지
    };
  }, [url]);

  return state;
}
```

### 폼 관리 패턴
```javascript
function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  }, [values, touched, validate]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validate(values);
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
  }, [values, validate]);

  const isValid = useMemo(() => {
    const formErrors = validate(values);
    return Object.keys(formErrors).length === 0;
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    reset: () => {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  };
}
```

## 마무리

React Hooks는 함수형 컴포넌트의 가능성을 크게 확장시켜준 강력한 도구입니다. 이 가이드에서 다룬 내용들을 실제 프로젝트에 적용해보면서 경험을 쌓아보세요.

### 다음 단계
- **고급 패턴**: Compound Components, Render Props 패턴과 Hooks 조합
- **테스팅**: React Testing Library를 활용한 Hook 테스트
- **성능 분석**: React DevTools Profiler를 활용한 최적화

*Hook 사용 경험이나 질문이 있으시면 댓글로 공유해주세요!* 