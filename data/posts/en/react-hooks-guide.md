---
title: "Complete React Hooks Guide: Mastering Functional Components"
date: "2024-01-10"
excerpt: "A comprehensive guide covering everything about React Hooks. Master React Hooks with practical examples that you can apply to your projects immediately, from useState to custom hooks."
coverImage: "/images/react-hooks.jpg"
categories: ["React", "Frontend", "JavaScript"]
tags: ["React", "Hooks", "useState", "useEffect", "Custom Hooks"]
author: "Developer"
featured: true
---

# Complete React Hooks Guide

React Hooks, introduced in React 16.8, are revolutionary features that enable state management and lifecycle handling in functional components. This guide covers everything from the most commonly used Hooks in practice to advanced patterns.

## Basic Hooks

### useState: State Management Basics

`useState` is the most fundamental Hook for managing state in functional components.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(prev => prev - 1)}>
        Decrement
      </button>
    </div>
  );
}
```

#### useState Best Practices
- **Functional updates**: Pass a function when depending on previous state
- **Lazy initial state**: Pass a function for expensive initial values
- **Separate multiple states**: Manage unrelated states separately

### useEffect: Handling Side Effects

`useEffect` manages component lifecycle and side effects.

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
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Only run when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## Advanced Hooks

### useReducer: Complex State Management

Use `useReducer` when multiple states are complexly related.

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
    // JSX implementation...
  );
}
```

### useContext: Sharing Global State

Used to share state across the entire component tree.

```javascript
import { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider Component
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

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## Custom Hooks

You can create your own Hooks to reuse logic.

### useFetch: API Call Hook

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

// Usage Example
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## Performance Optimization Hooks

### useMemo: Value Memoization

```javascript
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering process executed');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]); // Only recalculate when items or filter changes

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Hook Usage Rules

### 1. Hook Call Rules
- **Only call at the top level**: No calls inside loops, conditions, or nested functions
- **Only call from React functions**: No calls from regular JavaScript functions

```javascript
// ❌ Wrong usage
function BadComponent() {
  if (someCondition) {
    const [state, setState] = useState(0); // Conditional call
  }
  
  return <div>...</div>;
}

// ✅ Correct usage
function GoodComponent() {
  const [state, setState] = useState(0);
  
  if (someCondition) {
    // Conditional logic
  }
  
  return <div>...</div>;
}
```

## Practical Patterns

### Data Fetching Pattern
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
      cancelled = true; // Prevent memory leaks with cleanup
    };
  }, [url]);

  return state;
}
```

## Summary

React Hooks are powerful tools that significantly expand the possibilities of functional components. Apply the content covered in this guide to real projects and gain experience.

### Next Steps
- **Advanced Patterns**: Combining Compound Components and Render Props patterns with Hooks
- **Testing**: Hook testing using React Testing Library
- **Performance Analysis**: Optimization using React DevTools Profiler

*Share your Hook usage experiences or questions in the comments!* 