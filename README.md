# Interview Prep App

A Next.js application that simulates job interviews using AI to help users practice and improve their interview skills.

## 🚀 Features

- **AI-Powered Interview Simulation**: Realistic interview experiences using advanced language models
- **Multiple AI Models**: Choose between OpenAI (GPT-4o), Anthropic (Claude 3.5), or Google (Gemini 1.5)
- **Customizable Interview Experience**:
  - Choose interviewer personality (e.g., "Friendly HR recruiter conducting first interview")
  - Set question difficulty (easy, medium, hard)
  - Select from different prompt strategies
- **Real-time Feedback**: Tips and ratings on users's interview responses implemented with OpenAI (GPT-4o) (not configurable)
- **Interactive Chat Interface**: Natural conversation flow with the AI interviewer

## 📊 Architecture

src/
├── components/ # UI components
│ ├── ChatMessageDisplay.tsx
│ ├── FeedbackDisplay.tsx
│ ├── FeedbackIndicator.tsx
│ ├── FeedbackTooltip.tsx
│ ├── LoadingIndicator.tsx
│ ├── Sidebar.tsx
│ ├── SidebarContent.tsx
│ └── SidebarWrapper.tsx
├── models/ # TypeScript interfaces
│ ├── aiSettings.model.ts
│ ├── chatMessage.model.ts
│ ├── feedback.model.tsx
│ ├── promptStrategy.model.tsx
│ └── questionDifficulty.model.ts
├── pages/ # Next.js pages
│ ├── api/ # API endpoints
│ │ ├── chat.ts # AI chat API
│ │ └── feedback.ts # Response feedback API
│ ├── \_app.tsx # App wrapper
│ └── index.tsx # Main chat interface
├── prompts/ # System prompts for AI
│ └── systemPrompts.ts
└── services/ # API service functions
└── apiRequests.ts

## 💻 Getting Started

### Prerequisites

- Node.js 22.x or later
- API keys for OpenAI, Anthropic, or Google AI (depending on which models you want to use)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/interview-prep-app.git
   cd interview-prep-app

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the root directory and add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   GOOGLE_AI_API_KEY=your_google_key
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 🔧 Configuration

## 🎛 AI Settings (Adjustable in Sidebar)

- **System Personality**: Define the interviewer's persona. Also worth adding what kind of interview is being conducted.
- **Prompt Strategy**:
  - `Chain-of-Thought`: Step-by-step reasoning
  - `Few-Shot`: Guided by example prompts
  - `Self-Refinement`: AI iterates on its own questions
  - `Generated Knowledge`: Creates contextual insights
  - `Maieutic`: Socratic questioning method
- **Question Difficulty**: `Easy`, `Medium`, or `Hard`
- **Temperature**: Controls randomness (`0.0–1.0`)
- **Top P**: Controls diversity (`0.0–1.0`)
- **Frequency Penalty**: Reduces repetition (`0.0–2.0`) (not applicable to Claude and Gemini models)
- **Model**: GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Flash

---

# 📝 Usage

1. Describe the role you're applying for in the chat.
2. The AI interviewer introduces itself and begins asking questions.
3. Respond to each question using the provided text area.
4. Get **real-time feedback** by hovering over the 💡 tip icon. The model under the hood is not configurable.
5. Repeat until you're confident and interview-ready.
6. Change settings for your chat experience

---

# 👩‍💻 Further Development

## 🔌 Adding New Features

- **New AI Models**: Update `chat.ts` to include additional providers, especially open-source providers.
- **Custom Prompt Strategies**: Add logic to `systemPrompts.ts`.
- **Enhanced Feedback**: Modify schema in `feedback.ts`.
- **Enhance Jailbraking Prevention**: Review prevention strategy, especially with regards to inputing/updating persona or the model.

---

# 📚 Technology Stack

- [Next.js](https://nextjs.org)
- TypeScript
- OpenAI API
- Anthropic API
- Google AI API
- Material UI
- TailwindCSS
- Zod

---

# 📄 License

This project is licensed under the **MIT License**.
