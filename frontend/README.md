# TaskFlow AI - AI-Powered Task Manager

![TaskFlow AI Banner](./public/taskflow-banner.png)

A modern, AI-powered task management application that helps you stay organized and productive. Built with React, Vite, and Tailwind CSS, featuring advanced natural language processing for task creation.

## ✨ Features

- **AI-Powered Task Parsing** - Convert natural language into structured tasks
- **Batch Script Processing** - Parse multiple tasks from a single text input
- **Smart Due Date Detection** - Automatically recognizes and sets due dates
- **Priority Assignment** - Intelligently assigns priorities based on task context
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode** - Beautiful dark theme for comfortable use

## 🚀 AI-Powered Batch Task Parsing

Our advanced AI can parse multiple tasks from a single block of text, making it easy to quickly add multiple tasks at once.

### How It Works

1. **Natural Language Input**
   Simply type or paste your tasks in natural language
   
   ![Script Input Demo](./public/script-input.png)

2. **AI Processing**
   Our system uses Google's Gemini AI to analyze the text and identify individual tasks, assignees, due dates, and priorities.

3. **Task Preview & Edit**
   Review and edit the parsed tasks before adding them to your list.
   
   ![Task Preview](./public/task-preview.png)

4. **One-Click Import**
   Add all selected tasks to your task list with a single click.

### Example Inputs

```
John, please complete the landing page by Friday (P1)
Sarah, client follow-up by EOD
Team meeting tomorrow 11am
Review PR #42 - high priority
```

## 🛠️ Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/task-manager-app.git
   cd task-manager-app/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 🌟 Features in Detail

### Single Task Parsing
Quickly add individual tasks using natural language. The AI will extract all relevant details.

### Batch Processing
Process multiple tasks at once by pasting meeting notes, emails, or any text containing multiple action items.

### Smart Date Parsing
Automatic detection of due dates in various formats:
- "tomorrow at 3pm"
- "next Monday"
- "by EOD Friday"
- "in 2 days"

### Priority Detection
Intelligently assigns priorities based on keywords:
- P1: "urgent", "asap", "critical"
- P2: "important", "high priority"
- P3: Normal (default)
- P4: "when you have time", "low priority"

## 📝 Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **AI**: Google Gemini API
- **Build Tool**: Vite

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
