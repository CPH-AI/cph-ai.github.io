# Copenhagen AI · Pages

> _"Anyone who is not shocked by quantum theory has not understood it."_ — Niels Bohr

4명의 엔지니어가 매주 한 번 모여 AI 활용의 경계를 관측하는 공간입니다.
1927년 솔베이 회의의 정신을 빌렸습니다.

---

## 목차

1. [사이트 구조](#사이트-구조)
2. [라우트 전체 목록](#라우트-전체-목록)
3. [로컬 개발](#로컬-개발)
4. [배포 방법](#배포-방법)
5. [회의록 추가하기](#회의록-추가하기) ← 자동화 안내 포함
6. [각 멤버가 자기 책 채우기](#각-멤버가-자기-책-채우기)
7. [데이터 스키마 레퍼런스](#데이터-스키마-레퍼런스)
8. [시각 시스템](#시각-시스템)
9. [디렉터리 구조](#디렉터리-구조)
10. [키보드 단축키](#키보드-단축키)

---

## 사이트 구조

세 단계의 spatial narrative — 줌인 구조로 들어갑니다.

```
Layer 0  Arrival         1927년 브뤼셀, Hôtel Métropole 정문
                         ↓ 클릭 / Enter / 모바일 탭
Layer 1  Study           회의장 옆 서재
         ├─ 책 4권       ↓ 클릭 → Book 페이지 (Layer 2)
         ├─ 왼쪽 보드    OPEN QUESTIONS — 미해결 질문 3개 + 더보기
         ├─ 오른쪽 보드  EXPERIMENTS — 진행 중인 실험들
         ├─ 시계         다음 회의까지 남은 일수
         └─ 단상         회의록 클릭 → Conference Archive
                         ↓ 책 클릭
Layer 2  Book            펼쳐진 책. 왼쪽 frontispiece + 오른쪽 bookplate
         ├─ Reflections  ↓ 클릭 → 회고 한 편 (내부 에세이 / 외부 블로그)
         ├─ Conferences  이 멤버가 참석한 회차 자동 cross-link
         ├─ Experiments  진행 중인 실험 목록
         └─ Wherefrom    외부 채널 링크
                         ↓ Reflection 항목 클릭
Reflection               책 한 페이지 — 멤버가 직접 쓴 회고 에세이

Conference Archive       /conferences   — 모든 회차 list
                         /conference/0  — founding manifesto
                         /conference/N  — 회차 상세 (학술지 한 장)
                           └─ #open-questions anchor → 미해결 질문 섹션 하이라이트

Open Questions Archive   /questions     — 모든 미해결 질문 모음
                         § In superposition — 아직 논쟁 중인 질문
                         § Collapsed       — 합의된 질문 (결론 포함)
```

---

## 라우트 전체 목록

| 경로 | 화면 | 비고 |
|---|---|---|
| `/#/` | Arrival | 브뤼셀 정문. 클릭/Enter/탭으로 진입 |
| `/#/study` | Study | 서재. 책 · 핀보드 · 단상 |
| `/#/book/:id` | Book | id: `einstein` / `bohr` / `heisenberg` / `schrodinger` |
| `/#/book/:id/reflection/:refId` | Reflection | 회고 에세이 한 편 |
| `/#/conferences` | Conference Archive | 모든 회차 목록 |
| `/#/conference/0` | Founding Manifesto | 창립 선언 |
| `/#/conference/:no` | Conference Detail | 학술지 한 장 형식 |
| `/#/conference/:no#open-questions` | Conference Detail | Open Questions 섹션으로 scroll + 하이라이트 |
| `/#/questions` | Open Questions Archive | superposition / collapsed 분리 목록 |
| (존재하지 않는 경로) | 404 | *파동함수가 붕괴했습니다* |

---

## 로컬 개발

```bash
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:5173
# → 파일 수정 시 자동 새로고침
```

**주의사항**
- `src/data/members.json` 또는 `src/data/conferences.json` 수정 후 저장하면
  브라우저가 자동으로 갱신됩니다.
- 로컬에서는 Hash Router 기반이라 `/#/study` 형식으로 접근합니다.

---

## 배포 방법

### 자동 배포 (기본)

`main` 브랜치에 push가 생기면 GitHub Actions가 자동으로 빌드 + 배포합니다.
**아무것도 할 필요 없습니다.** PR Merge = 사이트 반영.

```
PR Merge (또는 직접 push)
        ↓ 자동 실행
GitHub Actions — 빌드 + gh-pages 배포
        ↓ 약 1–2분
https://cph-ai.github.io 반영 완료
```

Actions 진행 상황은 레포 상단 **Actions 탭**에서 확인할 수 있습니다.

### 수동 배포 (로컬 긴급 수정 시)

로컬에서 직접 수정하고 즉시 배포가 필요할 때만 사용합니다.

```bash
git add .
git commit -m "내용 요약"
git push           # main에 push → 위 자동 배포 트리거됨
```

`npm run deploy` 는 더 이상 직접 실행할 필요 없습니다.
`git push` 만 하면 Actions가 알아서 배포합니다.

---

## 회의록 추가하기

회의록을 추가하는 방법은 두 가지입니다.

### 방법 1 — GitHub Issue 자동화 (권장)

회의가 끝난 직후, 코드를 건드리지 않고 사이트를 업데이트할 수 있습니다.

#### 전체 흐름

```
1. GitHub 레포 → Issues → New Issue
2. "📋 Conference 회의록" 템플릿 선택
3. 폼 작성 후 Submit
        ↓ 자동으로 진행됨
4. GitHub Actions가 이슈를 파싱
5. conferences.json 업데이트 브랜치 자동 생성
6. PR 자동 오픈 (내용 요약 포함)
7. 이슈에 PR 링크 코멘트 자동 등록
        ↓ 팀원이 리뷰 후
8. PR Merge
        ↓ 자동으로 진행됨
9. GitHub Actions 빌드 + 배포
10. 약 1–2분 후 사이트 반영 완료
```

#### 이슈 폼 작성 가이드

**회차 번호** — 숫자만 입력. 같은 번호로 다시 제출하면 기존 데이터를 덮어씁니다.

**날짜** — `YYYY-MM-DD` 형식 정확히 입력 (예: `2026-05-04`)

**주최자** — 드롭다운에서 한 명 선택

**참석자 / 결석자** — 체크박스. 참석한 사람 체크 / 결석한 사람 체크. 둘 다 체크해도 됩니다.

**Synthesis** — 회의에서 도달한 핵심 합의 1–3문장. 나중에 회의록 페이지의 `§ Synthesis` 섹션에 표시됩니다.

**발표 목록** — 한 줄에 발표 하나씩. 파이프(`|`)로 구분:
```
발표자ID | 발표 제목 | URL (없으면 빈칸)
```
예시:
```
einstein | Toolcall idempotency 문제 | https://my-blog.github.io/post-1
bohr | 에이전트 메모리 설계 패턴 |
```

**Open Questions** — 한 줄에 질문 하나씩. 파이프(`|`)로 구분:
```
질문 내용 | 발의자ID | superposition
```
예시:
```
에이전트가 자기 결정을 forget할 권리가 있는가? | bohr | superposition
메모리 분리가 멱등성에 미치는 영향은? | einstein | superposition
```
status는 `superposition` (논쟁 중) 또는 `collapsed` (합의됨).

#### PR 리뷰 포인트

PR 본문에 자동 생성된 표와 내용을 확인합니다. `conferences.json` 의 diff를 보고 의도한 대로 파싱됐는지 확인한 뒤 Merge. 이후 `npm run deploy` 로 배포.

#### 파싱 오류 시

폼을 잘못 작성하면 이슈에 오류 코멘트가 달립니다. 이슈를 수정하고 저장하면 Actions가 자동 재실행됩니다.

---

### 방법 2 — 직접 JSON 수정

`src/data/conferences.json` 에 항목을 직접 추가하고 PR을 올립니다.

```jsonc
{
  "no": 2,
  "type": "session",
  "date": "2026-05-04",
  "host": "einstein",
  "topic": "에이전트 메모리의 휘발성",
  "attendees": ["einstein", "bohr", "heisenberg", "schrodinger"],
  "absent": [],
  "synthesis": "메모리를 외부 저장소로 분리하면 toolcall 멱등성을 잃는다는 잠정 합의.",
  "presentations": [
    { "by": "einstein", "title": "Toolcall idempotency 문제", "url": "https://..." }
  ],
  "openQuestions": [
    {
      "question": "에이전트가 자기 자신의 결정을 forget할 권리가 있는가?",
      "raisedBy": "bohr",
      "status": "superposition"
    }
  ]
}
```

추가 후 `npm run deploy` 로 배포.

---

## 각 멤버가 자기 책 채우기

`src/data/members.json` 에서 자기 항목을 수정하고 PR 한 번으로 반영합니다.

### Reflections (회고글) 추가

회고글은 사이트 내부에 책 한 페이지처럼 펼쳐지는 에세이입니다.

```jsonc
"reflections": [
  {
    "id": "slug-like-id",          // URL에 사용됨 — 영문 소문자, 하이픈만
    "title": "첫 회의를 기다리며",
    "date": "2026-04-25",
    "internal": true,              // true = 사이트 내부 에세이
    "body": [
      "첫 문단입니다. 들여쓰기 없이 시작합니다.",
      "두 번째 문단부터 자동으로 들여쓰기가 적용됩니다.",
      "원하는 만큼 문단을 추가할 수 있습니다."
    ]
  }
]
```

외부 블로그 링크로만 연결하고 싶다면:

```jsonc
{
  "id": "conference-2-retrospect",
  "title": "Conference No.2 회고",
  "date": "2026-05-10",
  "internal": false,
  "url": "https://my-blog.github.io/post-2"
}
```

### Experiments (실험) 추가

자기가 진행 중이거나 완성한 프로젝트를 등록합니다.
Study 화면의 EXPERIMENTS 핀보드 + Book 페이지에 동시에 표시됩니다.

```jsonc
"experiments": [
  {
    "name": "my-experiment",       // 핀보드에 표시될 짧은 이름
    "desc": "한 줄 설명",
    "url": "https://...",          // 클릭 시 이동할 URL
    "status": "live"               // "live" 또는 "superposition"
  }
]
```

`live` → 녹색 점 + 실선 카드 (운영 중)
`superposition` → amber 점 + 점선 카드 (진행 중 / 미정)

### Wherefrom (외부 채널) 추가

```jsonc
"wherefrom": [
  { "label": "github", "url": "https://github.com/your-id" },
  { "label": "blog",   "url": "https://your-blog.github.io" },
  { "label": "youtube", "url": "https://youtube.com/@channel" }
]
```

`label` 은 자유 텍스트 — github, blog, youtube, notion, linkedin 등 무엇이든.

### Sigil (인용구) 변경

Book frontispiece 하단에 표시되는 철학자 인용구와 역할 설명입니다.

```jsonc
"sigil":    "신은 주사위를 던지지 않는다.",
"subSigil": "납득될 때까지 토 다는 사람."
```

---

## 데이터 스키마 레퍼런스

### members.json 전체 구조

```jsonc
{
  "site": {
    "conferenceNumber": 1,         // Study 단상에 표시되는 현재 회차
    "nextConferenceInDays": 4      // 시계 아래 카운트다운
  },
  "books": [
    {
      "id": "einstein",            // URL 식별자 (변경 금지)
      "vol": "I",
      "physicist": "Einstein",
      "handle": "e9ua1",
      "coverColor": "#5a3a2a",     // 책 표지 색상
      "role": "The Skeptic",
      "sigil": "...",
      "subSigil": "...",
      "reflections": [ ... ],
      "experiments": [ ... ],
      "wherefrom": [ ... ]
    }
    // bohr, heisenberg, schrodinger 동일 구조
  ]
}
```

`conferenceNumber` 와 `nextConferenceInDays` 는 회의가 열릴 때마다 직접 수정합니다.

### conferences.json 전체 구조

```jsonc
{
  "conferences": [
    {
      "no": 0,
      "type": "manifesto",         // 창립 선언 (고정)
      "title": "...",
      "subtitle": "...",
      "body": [ "문단1", "문단2" ]
    },
    {
      "no": 1,
      "type": "session",           // 일반 회차
      "date": "2026-04-25",        // YYYY-MM-DD
      "host": "schrodinger",       // 주최자 ID
      "topic": "...",
      "attendees": ["einstein", "bohr", "heisenberg", "schrodinger"],
      "absent": [],
      "synthesis": "...",
      "presentations": [
        { "by": "멤버ID", "title": "제목", "url": "https://..." }
      ],
      "openQuestions": [
        {
          "question": "질문 내용",
          "raisedBy": "멤버ID",
          "status": "superposition"  // "superposition" | "collapsed"
        }
      ]
    }
  ]
}
```

**Open Questions 상태 전환**
- `superposition` → 아직 논쟁 중. Study 핀보드 + `/questions` 에 표시.
- `collapsed` → 합의됨. Study 핀보드에서 사라지고 `/questions` 의 *§ Collapsed* 섹션으로 이동.

질문이 합의되면 해당 항목의 `status` 를 `"collapsed"` 로 바꾸고 PR 혹은 `npm run deploy`.

---

## 4 Volumes

| Vol | Physicist | Member | Role |
|---|---|---|---|
| I | Einstein | [@e9ua1](https://github.com/e9ua1) | The Skeptic |
| II | Bohr | [@Chocoding1](https://github.com/Chocoding1) | The Convener |
| III | Heisenberg | [@Jaeminjeong1](https://github.com/Jaeminjeong1) | The Improviser |
| IV | Schrödinger | [@JohnPrk](https://github.com/JohnPrk) | The Polymath |

---

## 시각 시스템

| Token | 값 | 의도 |
|---|---|---|
| `--ink` | `#1a1410` | 어두운 서재 배경 |
| `--parchment` | `#ece6d6` | 책 종이 |
| `--amber` | `#c8941d` | 가스등 빛 / 강조 |
| `--quantum-blue` | `#58a6ff` | 헤더 hybrid 모티프 |
| `--green-live` | `#1d9e75` | 실험 live status |

폰트: Georgia (serif, 본문) · SF Mono / Consolas (mono, meta라벨) · Inter (sans, UI)

---

## 디렉터리 구조

```
.github/
├── ISSUE_TEMPLATE/
│   └── conference.yml         ← 회의록 이슈 폼 템플릿
└── workflows/
    └── conference-to-pr.yml   ← 이슈 → PR 자동화 워크플로우

src/
├── data/
│   ├── members.json           ← 4명 멤버 데이터 (PR로 갱신)
│   └── conferences.json       ← 회의록 데이터 (자동화 또는 직접 PR)
├── hooks/
│   └── useWindowSize.js       ← 모바일 감지 훅
├── layers/
│   ├── Arrival.jsx            ← Layer 0 브뤼셀 정문
│   ├── Study.jsx              ← Layer 1 서재 (데스크탑 + 모바일)
│   ├── Book.jsx               ← Layer 2 펼쳐진 책
│   ├── Reflection.jsx         ← 회고 에세이 한 편
│   ├── Conferences.jsx        ← 회의록 archive list
│   ├── Conference.jsx         ← 회의록 단일 회차 상세
│   ├── Questions.jsx          ← Open Questions archive
│   └── NotFound.jsx           ← 404 파동함수 붕괴
├── styles/
│   └── tokens.css             ← CSS 변수 / 글로벌 스타일
├── App.jsx                    ← 라우팅
└── main.jsx                   ← 진입점

public/
├── avatars/                   ← 4명 SVG 아바타
├── org-avatar.svg             ← 기관 아이콘
└── favicon.svg                ← hybrid quantum-neural 모티프
```

---

## 키보드 단축키

| Key | 화면 | 동작 |
|---|---|---|
| `Enter` / `Space` | Arrival | 서재 진입 |
| `1` `2` `3` `4` | Study | 해당 번호 책 직접 선택 |
| `← →` | Study | 책 사이 이동 |
| `Enter` | Study | 선택된 책 펼치기 |
| `← →` | Book | 이전 / 다음 권 |
| `Esc` | 어디서나 | 한 단계 뒤로 |
| `← →` | Conference | 이전 / 다음 회차 |

---

<sub>`Built between observation and collapse.`</sub>
