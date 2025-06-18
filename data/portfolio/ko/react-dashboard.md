---
title: "React 기반 관리자 대시보드"
description: "React와 Chart.js를 활용한 실시간 데이터 시각화 대시보드"
coverImage: ""
tech: ["React", "TypeScript", "Chart.js", "Material-UI", "Socket.io"]
projectUrl: "https://dashboard-demo.vercel.app"
githubUrl: "https://github.com/username/react-dashboard"
order: 2
featured: false
date: "2023-12-10"
---

# React 기반 관리자 대시보드

실시간 데이터 시각화를 위한 React 기반 관리자 대시보드입니다. Chart.js와 Socket.io를 활용하여 실시간 차트 업데이트 기능을 구현했습니다.

## 주요 기능

- **실시간 데이터**: Socket.io를 통한 실시간 데이터 업데이트
- **다양한 차트**: Line, Bar, Pie, Doughnut 차트 지원
- **반응형 레이아웃**: 모든 디바이스에서 최적화된 UI
- **테마 지원**: 라이트/다크 모드 전환
- **데이터 필터링**: 날짜 범위 및 카테고리별 필터링

## 기술 스택

### Frontend
- **React 18**: 최신 React Hook 활용
- **TypeScript**: 타입 안전성
- **Material-UI**: 일관된 디자인 시스템
- **Chart.js**: 차트 라이브러리

### Backend
- **Node.js**: 서버 사이드
- **Socket.io**: 실시간 통신
- **Express**: REST API
- **MongoDB**: 데이터베이스

## 핵심 구현

### 실시간 차트 업데이트
```javascript
useEffect(() => {
  socket.on('dataUpdate', (newData) => {
    setChartData(prevData => ({
      ...prevData,
      datasets: [{
        ...prevData.datasets[0],
        data: newData
      }]
    }));
  });
}, []);
```

### 반응형 그리드 시스템
- CSS Grid와 Flexbox를 조합한 레이아웃
- 화면 크기에 따른 차트 크기 자동 조절
- 모바일에서의 터치 친화적 인터랙션 