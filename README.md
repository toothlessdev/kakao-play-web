## 📚 기술 개념 및 트러블슈팅 정리

### 1. **Proxy를 이용한 반응형 상태 구현**

`Proxy`는 JS에서 객체의 기본 동작을 가로챌 수 있게 해줌

#### 🧠 배운 점

-   `Proxy`의 `set`, `get`, `deleteProperty` 핸들러를 통해 상태 변경 감지 가능
-   객체의 속성이 바뀔 때 `onChange` 콜백 실행 → `reRender()` 트리거
-   `Proxy` 내부에서 `this` 사용 시 주의 필요
    → 화살표 함수 또는 외부에서 `thisArg` 명시적으로 bind 해야 함

#### 🚧 트러블슈팅

-   Proxy 내부 핸들러에서 `this`가 Proxy 인스턴스를 가리키지 않아 `undefined` 오류 발생
    → `this.jsonStorageService.getData()` 가 `undefined.includes` 에러
    → 해결: `this`를 핸들러 외부에서 캡처하거나 화살표 함수로 고정

### 2. **Web Component & Shadow DOM 기반 BaseComponent**

#### 핵심 개념

-   `Custom Elements API` + `Shadow DOM` = 웹 컴포넌트
-   라이프사이클: `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`
-   `Shadow DOM`: 스타일/구조 캡슐화 → 외부와 독립된 DOM 계층 구성

#### 🧠 배운 점

-   `this.attachShadow({mode: "open"})` 로 shadow root 연결
-   `render()`는 `Node` 또는 HTML 템플릿 리터럴 반환해야 함
-   `attributeChangedCallback()`으로 속성 변경 감지 가능
-   `observedAttributes` 선언 안하면 `attributeChangedCallback` 호출되지 않음

#### 🚧 트러블슈팅

-   `render()`에서 `Node` 외 값 반환 시 예외 발생
    → 체크: `render()`에서 HTML 문자열 아닌 DOM 요소 반환해야 함

### 3. **Observer 패턴을 활용한 전역 상태 관리**

#### 핵심 개념

-   `Observer Pattern`: 발행자(Subject)가 상태 변경 시 구독자(Observer)에게 알림
-   `subscribe(component, fn)`: 컴포넌트마다 `reRender` 콜백 등록
-   `dispatch()` 시 모든 `reRender()` 실행

#### 🧠 배운 점

-   `Map`으로 컴포넌트-콜백 페어 저장해 관리
-   전역 상태에서 특정 key 변경 시 효율적으로 필요한 컴포넌트만 업데이트 가능
-   단일 인스턴스(Singleton)로 `GlobalState` 공유

#### 🚧 트러블슈팅

-   컴포넌트 제거 시 `unsubscribe` 로 `Map`에서 제거해야 메모리 누수 방지
    → `WeakMap` 고려 필요

### 4. **HTML Tagged Template Literal**

#### 핵심 개념

-   `html\`<div>\${value}</div>\``구문은`html\` 함수 호출을 의미
-   템플릿 리터럴 내부에 배열이 들어오면 `,` 포함된 문자열이 생성됨

#### 🚧 트러블슈팅

-   배열 그대로 출력 시: `<div>1,2,3</div>`
-   해결: `.join("")` 등으로 명시적으로 문자열로 변환

### 5. **이벤트 핸들러에서의 this 바인딩 문제**

#### 핵심 개념

-   이벤트 리스너 내부에서 `this`는 기본적으로 `e.currentTarget`을 가리킴
-   클래스 메서드가 바인딩되지 않으면 `this`는 undefined 또는 엉뚱한 값

#### 해결법

-   메서드 내에서 `.bind(this)` 적용
-   또는 화살표 함수로 정의 → 선언 당시 this를 캡처

### 6. **LocalStorage + 상태 동기화 (Persist State)**

#### 핵심 개념

-   초기값 로드 → Proxy 기반 상태 객체 → 값 변경 시 localStorage 저장

#### 🚧 트러블슈팅

-   저장 값이 JSON.parse 불가능한 경우 예외 처리 필요
-   상태 변경 없이 `set` 호출 시 불필요한 렌더링 유발

좋아요! 기존 정리에 이어 아래에 다음 내용을 보완했습니다:

### 7. **WeakMap / WeakSet은 언제, 왜 사용하는가?**

#### 핵심 개념

-   \*\*`WeakMap`\*\*과 \*\*`WeakSet`\*\*은 _참조를 약하게(weakly)_ 유지함 → **GC(가비지 컬렉션) 최적화**에 유리
-   키가 객체일 경우, 객체가 더 이상 참조되지 않으면 자동으로 메모리 해제

#### ✅ 언제 사용하는가?

-   **컴포넌트 생명 주기와 함께 메모리 관리가 필요한 경우**
    → 예: 전역 상태에서 컴포넌트별로 콜백을 저장할 때

```js
// 일반 Map은 수동으로 unsubscribe 하지 않으면 메모리 누수 발생
const subscribers = new Map();
// WeakMap 사용 시 컴포넌트가 GC 대상이 되면 자동 제거됨
const subscribers = new WeakMap();
```

#### 🚧 주의 사항

-   `WeakMap`은 순회(iteration) 불가
-   `key`는 반드시 객체만 가능 (`primitive`는 불가)

### 8. **Web Component**

#### 핵심 개념

-   **Web Component**는 \*\*캡슐화된 사용자 정의 HTML 요소(Custom Element)\*\*를 만들 수 있는 브라우저 표준 기술
-   **대표 구성 요소**:

    -   `Custom Elements`: 사용자 정의 태그 `<my-component>`
    -   `Shadow DOM`: DOM/CSS 캡슐화
    -   `HTML Template`: 템플릿 재사용

-   HTML/CSS/JS를 하나의 독립된 컴포넌트로 구성 가능
-   라이브러리 없이도 재사용 가능한 UI 요소 구현 가능
-   완전한 **프레임워크 독립성**

### 9. **Shadow DOM이란?**

#### 📌 개념 요약

-   `Shadow DOM`은 **컴포넌트 내부 DOM과 외부 DOM을 격리시키는 기술**
-   일반 DOM과 달리, 외부에서 스타일/구조에 접근 불가능

#### ✅ 장점

-   **스타일 캡슐화**: 외부 CSS가 영향을 미치지 않음
-   **DOM 캡슐화**: 내부 구조가 외부와 충돌하지 않음
-   **컴포넌트 독립성 강화**

### 📌 Shadow DOM vs 일반 DOM 차이

| 항목            | 일반 DOM           | Shadow DOM              |
| --------------- | ------------------ | ----------------------- |
| 스타일 캡슐화   | ❌ 없음            | ✅ 있음                 |
| DOM 접근        | 외부에서 접근 가능 | 외부에서 직접 접근 불가 |
| 사용 목적       | 문서 구조 구성     | 컴포넌트 내부 DOM 보호  |
| 글로벌 CSS 영향 | 받음               | 받지 않음               |

## 🧠 결론: 직접 구현하며 체감한 JS 기초의 힘

-   `WeakMap`, `Proxy`, `WebComponent`, `Shadow DOM`, `Observer Pattern` 같은 **언어 내장 기능**만으로도 강력한 컴포넌트 시스템 구축 가능
-   생명주기 관리, 메모리 최적화, 구조화된 렌더링 로직 구현까지 → 프레임워크 없이도 가능
-   실제로 구현해보며 React, Vue 같은 프레임워크가 내부에서 어떤 원리로 동작하는지 체감할 수 있었음

## 💡 전반적인 깨달음

-   `Proxy`, `Map`, `Custom Elements`, `Shadow DOM`을 활용하면 React 없이도 충분히 컴포넌트 기반 아키텍처를 만들 수 있음
-   클래스 기반 아키텍처에서는 `this` 바인딩 실수가 버그의 주요 원인
-   직접 구현하며 SPA의 동작 원리를 구조적으로 체험할 수 있었음
-   상태 기반 렌더링, DOM 조작, 전역 상태 관리 등의 기초가 JS만으로도 가능함을 체감
-   실제로 구현해보며 React, Vue 같은 프레임워크가 내부에서 어떤 원리로 동작하는지 체감할 수 있었음

## ❓ 궁금한점 및 아쉬웠던 점

-   싱글톤 vs 객체 생성 후 export 어떤 방법을 써야할까
-   html tagged template literal 내부에 또다른 html tagged template literal 이 재귀적으로 들어가는 경우에 대해서 올바르게 처리하지 못함
