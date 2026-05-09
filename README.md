# ⚔️ Champions Copilot

포켓몬 챔피언스 AI 파티 빌더

쓰고 싶은 포켓몬과 대처하고 싶은 상대를 입력하면, AI가 6마리 파티를 추천합니다.

🔗 [champions-copilot.vercel.app](https://champions-copilot.vercel.app)

---

## 기능

- **파티 추천** — 포켓몬 1~2마리를 고르면 나머지를 채워서 6마리 파티를 구성
- **메타 대응** — 랭크에서 자꾸 지는 상대 포켓몬을 지정하면 카운터를 고려한 파티를 추천
- **파티 성격 선택** — 날씨 / 트릭룸 / 스탠다드 / 기믹
- **선출 가이드** — 파티 구성뿐 아니라 어떤 3~4마리를 선출할지까지 제안
- **모바일 대응** — 모바일 퍼스트 반응형 UI

현재 레귤레이션 M-A 기준.

---

## 스크린샷

> TODO: 메인 화면 + 결과 화면 캡처 추가

---

## 시작하기

### 요구 사항

- Node.js 18+
- [Google AI Studio](https://aistudio.google.com/) Gemini API 키 (무료)

### 설치

```bash
git clone https://github.com/SeungyongJasperLee/champions-copilot.git
cd champions-copilot
npm install
```

`.env.local` 생성:

```
GEMINI_API_KEY=your_api_key_here
```

```bash
npm run dev
```

`http://localhost:3000` 에서 확인.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | Next.js (App Router) |
| AI | Google Gemini API |
| 포켓몬 데이터 | PokéAPI + 자체 JSON |
| 스타일링 | Tailwind CSS |
| 배포 | Vercel |

---

## 프로젝트 구조

```
app/
├── api/recommend/      # Gemini API Route + 프롬프트 + 데이터 주입
├── data/
│   └── pokemon.ts      # 챔피언스 레귤레이션 포켓몬·기술·특성·아이템 데이터
├── layout.tsx           # 메타데이터 + OG
└── page.tsx             # 메인 화면
```

---

## 데이터 관리

- **포켓몬 기본 정보** (스탯, 타입) → PokéAPI에서 자동
- **챔피언스 전용 데이터** (사용 가능 포켓몬, 기술, 특성, 아이템) → `pokemon.ts`에서 수동 관리
- 레귤레이션은 시즌 단위(약 5주)로 변경됨 — 시즌 교체 시 JSON 업데이트 필요

현재 주요 포켓몬 10마리에 상세 데이터(abilities, moves) 추가 완료. 나머지는 점진적으로 확장 중.

---

## 로드맵

- [ ] 나머지 포켓몬 상세 데이터 확장
- [ ] 결과 URL 공유 (링크로 파티 공유)
- [ ] 다크모드
- [ ] 영어 지원
- [ ] OP.GG MCP 연동 (데이터 자동화)

---

## 기여

버그 리포트, 기능 제안, PR 모두 환영합니다.

특히 다음 영역에서 도움이 필요합니다:

- 챔피언스 포켓몬 데이터 보강 (기술, 특성, 아이템 검증)
- 메타 트렌드 반영 제안
- 다국어 번역

---

## 라이선스

MIT