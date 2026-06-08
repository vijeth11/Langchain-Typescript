# First AI Agent Using OpenAI + TypeScript + LangChain

A comprehensive TypeScript project demonstrating how to build AI agents using LangChain with OpenAI and Google GenAI models. This project includes various examples ranging from simple chat interactions to complex multi-agent systems with middleware, memory, and tools integration.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

## ✨ Features

- **Simple Chat Integration**: Basic agent-based chat interactions with OpenAI
- **Few-Shot Prompting**: Examples of few-shot learning techniques
- **Structured Responses**: Generate structured output with validation using Zod
- **Tool Integration**: Enable agents to search the web and interact with external tools
- **Memory Management**: Short-term memory to maintain conversation context
- **Multi-Agent Systems**: Orchestrate multiple agents that can communicate and pass information
- **Middleware Support**: Customize agent behavior with middleware (summarization, message filtering, dynamic model selection)
- **Human-in-the-Loop**: Integrate human approval/interaction in agent workflows
- **Image Generation**: Generate images using MCP-based models
- **Context State Management**: Maintain and update user context across conversations
- **MCP Integration**: Model Context Protocol support for enhanced functionality

## 📦 Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **API Keys**:
  - OpenAI API key (for GPT models)
  - Google Generative AI API key (alternative/additional)
  - Tavily API key (for web search capabilities)

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd first-ai-agent-using-openai-ts-langchain
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🔐 Environment Setup

Create a `.env` file in the project root with your API keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_generative_ai_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

**Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

## 📁 Project Structure

```
├── index.ts                          # Main entry point with all examples
├── package.json                      # Project configuration and dependencies
├── tsconfig.json                     # TypeScript configuration
├── .env                              # Environment variables (not in version control)
│
├── sample_chat/                      # Basic chat example
│   └── chat.ts
│
├── few-shot-example/                 # Few-shot prompting techniques
│   └── few-shot-prompt.ts
│
├── structured-response/              # Structured output with validation
│   └── structured-prompt.ts
│
├── tools-example/                    # Tool integration (web search)
│   └── tool.ts
│
├── memory-example/                   # Short-term memory management
│   └── short-memory.ts
│
├── context-state-example/            # User context state management
│   ├── context.ts
│   └── update-state.ts
│
├── multi-agent-example/              # Multi-agent orchestration
│   ├── multi-agent-parent.ts
│   ├── sub-agents.ts
│   └── tools.ts
│
├── middleware-example/               # Agent behavior customization
│   ├── summarise.ts                 # Message summarization middleware
│   ├── remove-tool-message.ts       # Filter tool messages
│   ├── human-in-loop.ts             # Human approval workflow
│   ├── dynamic-modal-agent.ts       # Dynamic model/prompt selection
│   └── tools.ts
│
├── stream-chat-example/              # Streaming response example
│   └── langstream.ts
│
├── image-generation-edit/            # Image generation using MCP
│   └── image-genration-agent.ts
│
├── mcp/                              # Model Context Protocol examples
│   └── langchain_mcp.ts             # Flight booking agent with MCP
│
└── utils/                            # Utility functions
```

## 💡 Examples

### 1. Simple Chat
Basic agent chat interaction with OpenAI:
```typescript
await simpleChatWithAgent(agent);
```

### 2. Few-Shot Prompting
Demonstrate few-shot learning with examples:
```typescript
await fewShotPrompt("What's the capital of France?");
```

### 3. Structured Responses
Generate validated structured output:
```typescript
await structuredPrompt(question);
await structuredOutputPrompt(question);
```

### 4. Web Search Tool
Enable agents to search the web using Tavily:
```typescript
await searchTheWeb("Who is the current Mayor of Boston?");
```

### 5. Memory Management
Maintain conversation history and context:
```typescript
await shortMemoryExample([
    "Hello my name is John. My favorite color is blue.",
    "What is my name?",
    "What is my favorite color?"
]);
```

### 6. Multi-Agent System
Orchestrate multiple agents:
```typescript
await multiAgentExample();
```

### 7. Middleware Examples

**Message Summarization**:
```typescript
await summariseMessagesAgent(messages, question);
```

**Remove Tool Messages**:
```typescript
await removeToolMessageAgent(messages, question);
```

**Human-in-the-Loop**:
```typescript
await emailSendingAgentWithHumanInLoop(["Please read my email and send a response."]);
```

**Dynamic Model & Language Support**:
```typescript
await dynamicModalAgentAndUserLanguage();
```

### 8. Image Generation
Generate images with MCP:
```typescript
await generateImagesBasedOnDescription("A sunset over mountains", "output.png");
```

### 9. MCP Integration
Use Model Context Protocol for advanced features:
```typescript
await flightBookingAgent();
```

### 10. Context State Management
Persist user preferences:
```typescript
await getMyFaviourateColor();
await setMyFaviourateColor();
```

## 🏃 Getting Started

1. **Set up your environment variables** (see [Environment Setup](#environment-setup))

2. **Open `index.ts`** and uncomment the example you want to run:
   ```typescript
   // Example: uncomment the line for the example you want to test
   await simpleChatWithAgent(agent);
   ```

3. **Run the project**:
   ```bash
   npm start
   ```

## 📝 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run the main application using tsx |
| `npm test` | Run tests (currently not configured) |

## 📦 Dependencies

### Core Dependencies
- **@langchain/core** (^1.1.30): Core LangChain functionality
- **@langchain/openai** (^1.2.12): OpenAI integration
- **@langchain/google-genai** (^2.1.31): Google Generative AI integration
- **@langchain/google-vertexai** (^2.1.31): Google Vertex AI integration
- **@langchain/langgraph** (^1.3.2): Graph-based agent orchestration
- **@langchain/mcp-adapters** (^1.1.3): Model Context Protocol adapters
- **langchain** (^1.2.29): Main LangChain library
- **@tavily/core** (^0.7.2): Web search tool
- **fastmcp** (^4.0.1): Fast MCP server
- **dotenv** (^17.4.1): Environment variable management
- **zod** (^4.3.6): Schema validation and parsing

### Dev Dependencies
- **@types/node** (^25.3.3): TypeScript types for Node.js

## 🔧 Configuration

### TypeScript Configuration
The project uses TypeScript with the following key settings:
- Target: ES2020
- Module: CommonJS
- Strict mode enabled
- Resolves JSON modules

## 📚 Learning Path

1. Start with **simple chat** to understand basic agent interactions
2. Explore **few-shot prompting** for improved response quality
3. Try **structured responses** for validated outputs
4. Add **tools** to enable web search capabilities
5. Implement **memory** to maintain conversation context
6. Build **multi-agent systems** for complex workflows
7. Apply **middleware** for advanced customization
8. Integrate **image generation** and other advanced features

## 🤝 Contributing

This is an educational project. Feel free to modify and extend the examples for your use cases.

## 👤 Author

**Vijeth**

## 📄 License

ISC License - Feel free to use this project for learning and development purposes.

## 🚨 Important Notes

1. **API Keys**: Never commit your `.env` file. Keep your API keys private.
2. **Costs**: Using OpenAI, Google Generative AI, and Tavily APIs will incur costs. Monitor your usage.
3. **Rate Limits**: Be aware of API rate limits for each service.
4. **Model Selection**: Adjust the models used based on your needs and budget.

## 🔗 Useful Resources

- [LangChain Documentation](https://js.langchain.com)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Google Generative AI Documentation](https://ai.google.dev)
- [Tavily API Documentation](https://tavily.com)
- [Model Context Protocol](https://modelcontextprotocol.io)

## ❓ Troubleshooting

### Missing Dependencies
```bash
npm install
```

### TypeScript Errors
```bash
npm run build
```

### API Key Issues
- Verify all required environment variables are set in `.env`
- Ensure API keys are valid and have appropriate permissions
- Check API quota limits

---

Happy learning! Feel free to extend these examples and build your own AI agents! 🚀
