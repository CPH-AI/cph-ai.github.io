# Copenhagen AI · Pages

> _"Anyone who is not shocked by quantum theory has not understood it."_ — Niels Bohr

[Copenhagen AI](https://github.com/Copenhagen-AI) 의 GitHub Pages 사이트 소스.
1927년 솔베이 회의의 정신을 빌려, 4명의 엔지니어가 매주 한 번 모여 AI 활용의 경계를 관측하는 공간입니다.

## 사이트 구조

세 단계의 spatial narrative — 줌인 구조로 들어갑니다:

```
Layer 0 — Arrival     1927년 브뤼셀, Hôtel Métropole 정문
                      ↓ click / Enter
Layer 1 — Study       회의장 옆 서재. 4권의 책, 시계, 핀보드, 회의록 노트
                      ↓ 책 클릭 → Layer 2
                      ↓ 회의록 노트 → Conference Archive
Layer 2 — Book        펼쳐진 책. frontispiece + bookplate
                      ↓ Reflection 클릭 → 회고 한 편 펼쳐짐
                      ↓ Conference 클릭 → 해당 회차로 cross-link

Conference Archive    /conferences   — 모든 회차 list
                      /conference/N  — 한 회차 상세 (학술지 한 장)
                      /conference/0  — founding manifesto
```

## 4 Volumes

| Vol | Physicist | Member | Role |
|---|---|---|---|
| I | Einstein | [@e9ua1](https://github.com/e9ua1) | The Skeptic |
| II | Bohr | [@Chocoding1](https://github.com/Chocoding1) | The Convener |
| III | Heisenberg | [@Jaeminjeong1](https://github.com/Jaeminjeong1) | The Improviser |
| IV | Schrödinger | [@JohnPrk](https://github.com/JohnPrk) | The Polymath |

## 로컬 개발

```bash
npm install
npm run dev      # localhost:5173 / hash routing
```

라우트:
- `/` — Layer 0
- `/#/study` — Layer 1
- `/#/book/einstein` — Layer 2 (einstein / bohr / heisenberg / schrodinger)

## 배포

```bash
npm run deploy   # gh-pages 브랜치로 배포
```

Vite `base: "./"` + HashRouter 조합이라 GitHub Pages org 사이트 / 프로젝트 사이트 모두 동작합니다.

## 자기 책 채우기

각 멤버는 [`src/data/members.json`](./src/data/members.json) 의 자기 항목에 PR 한 번으로 콘텐츠를 추가할 수 있습니다.

### Reflections (회고글) 추가

회고는 사이트 내부에 책 한 페이지처럼 펼쳐집니다. `body` 배열에 문단을 적습니다.

```jsonc
"reflections": [
  {
    "id": "first-light",
    "title": "Conference No. 3 회고",
    "date": "2025-11-16",
    "internal": true,
    "body": [
      "첫 문단입니다. textIndent 없이 시작합니다.",
      "두 번째 문단부터는 자동으로 들여쓰기가 들어갑니다.",
      "원하는 만큼 문단을 추가하세요."
    ]
  }
]
```

외부 블로그로 link하고 싶다면 `internal: false` + `url: "..."`.

### Conference (회의록) 추가

`src/data/conferences.json`. 한 회차 = 학술지 한 장:

```jsonc
{
  "no": 2,
  "type": "session",
  "date": "2025-11-09",
  "topic": "에이전트 메모리의 휘발성",
  "attendees": ["einstein", "bohr", "heisenberg", "schrodinger"],
  "absent": [],
  "synthesis": "메모리를 외부 저장소로 분리하면 toolcall이 멱등성을 잃는다는 잠정 합의.",
  "presentations": [
    { "by": "einstein", "title": "...", "url": "..." }
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

`status`: `superposition` (논쟁 중) / `collapsed` (합의됨).

### Experiments (실험) 추가

```jsonc
"experiments": [
  {
    "name": "my-experiment",
    "desc": "한 줄 설명",
    "url": "https://github.com/...",
    "status": "live"
  }
]
```

`live` = 운영 중 (녹색 점) / `superposition` = 진행 중·미정 (점선 박스, amber 점)

### Wherefrom (외부 채널) 추가

```jsonc
"wherefrom": [
  { "label": "github", "url": "https://github.com/..." },
  { "label": "blog",   "url": "https://..." }
]
```

label은 자유 — `github`, `blog`, `youtube`, `twitter`, `notion`, 무엇이든.

### Sigil (인용구) 변경

각자 자기 sigil은 처음 매칭할 때 default가 들어가있습니다. 바꾸고 싶다면:

```jsonc
"sigil":    "관측 전까지 고양이는 두 상태에 있다.",
"subSigil": "상태를 동시에 여러 개 굴리는 사람."
```

## 시각 시스템

| Token | 값 | 의도 |
|---|---|---|
| `--ink` | `#1a1410` | 어두운 서재 배경 |
| `--parchment` | `#ece6d6` | 책 종이 |
| `--amber` | `#c8941d` | 가스등 빛 / 강조 |
| `--quantum-blue` | `#58a6ff` | 헤더 hybrid 모티프 |
| `--green-live` | `#1d9e75` | 실험 live status |

폰트: Georgia (serif, 본문) / Inter (sans, UI) / JetBrains Mono (mono, meta).

## 디렉터리 구조

```
src/
├── data/members.json          ← 4명 데이터 (PR로 갱신)
├── styles/tokens.css          ← 디자인 토큰
├── layers/
│   ├── Arrival.jsx            ← Layer 0 (브뤼셀)
│   ├── Study.jsx              ← Layer 1 (서재)
│   └── Book.jsx               ← Layer 2 (책)
├── App.jsx                    ← 라우팅
└── main.jsx                   ← 진입점

public/
├── avatars/                   ← 4명 SVG 아바타
└── favicon.svg                ← hybrid 모티프
```

## 키보드 단축키

| Key | 동작 |
|---|---|
| `Enter` / `Space` | (Layer 0) 회의장 진입 |
| `1` `2` `3` `4` | (Layer 1) 책 직접 선택 |
| `← →` | (Layer 1) 책 사이 이동 / (Layer 2) prev / next book |
| `Enter` | (Layer 1) 선택된 책 펼치기 |
| `Esc` | 한 단계 뒤로 |

---

<sub>`Built between observation and collapse.`</sub>
