# Multi-Persona AI Chatbot

다양한 페르소나를 가진 AI 챗봇을 생성하고 대화할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- **멀티 페르소나**: 다양한 성격과 말투를 가진 챗봇 생성
- **멀티 프로바이더**: OpenAI, Anthropic, Google AI 모델 지원
- **템플릿 제공**: 미리 정의된 챗봇 템플릿으로 빠른 생성
- **실시간 스트리밍**: AI 응답을 실시간으로 스트리밍
- **로컬 저장**: 챗봇 및 대화 내역 브라우저에 저장

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **AI SDK**: Vercel AI SDK v6
- **UI**: shadcn/ui, Tailwind CSS
- **State**: Zustand (localStorage 영속화)
- **Language**: TypeScript

## 지원 모델

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-4o Mini |
| Anthropic | Claude 3.5 Sonnet, Claude 3.5 Haiku |
| Google | Gemini 2.0 Flash, Gemini 2.0 Flash Lite |

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

## 사용 방법

1. 메인 페이지에서 **API 키 설정** 버튼을 클릭하여 사용할 AI 프로바이더의 API 키를 입력합니다.
2. **새 챗봇 만들기** 버튼을 클릭하여 챗봇을 생성합니다.
3. 템플릿을 선택하거나 직접 페르소나를 설정합니다.
4. 생성된 챗봇 카드를 클릭하여 대화를 시작합니다.

## 프로젝트 구조

```
├── app/
│   ├── api/chat/       # 채팅 API 라우트
│   ├── chat/[id]/      # 채팅 페이지
│   ├── create/         # 챗봇 생성 페이지
│   └── page.tsx        # 메인 페이지
├── components/
│   ├── chat/           # 채팅 UI 컴포넌트
│   ├── chatbot/        # 챗봇 관리 컴포넌트
│   └── ui/             # shadcn/ui 컴포넌트
├── lib/
│   ├── store/          # Zustand 스토어
│   ├── templates/      # 챗봇 템플릿
│   └── types/          # TypeScript 타입 정의
└── public/             # 정적 파일 (아바타 이미지)
```

## 챗봇 템플릿

| 템플릿 | 설명 |
|--------|------|
| 친절한 어시스턴트 | 공손하고 도움이 되는 범용 AI |
| 코딩 도우미 | 프로그래밍 전문 멘토 |
| 츤데레 천재 박사 | 까칠하지만 실력 있는 전문가 |
| 조선시대 무사 | 충성스러운 사극 말투 호위무사 |
| 고장 난 미래 로봇 | 2099년에서 온 오작동 로봇 |
| 열정 과다 근육 코치 | 에너지 넘치는 동기부여 코치 |

## 라이선스

MIT License
