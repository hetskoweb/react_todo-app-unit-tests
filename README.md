# 📝 Todo App — Your Smart Task Manager
Todo App is a modern, intuitive task management tool built with React. Easily create, edit, complete, and remove tasks with real-time feedback and smooth user interactions. The app supports task filtering (All, Active, Completed), mass toggling, inline editing, and persistent error handling. With responsive design and clean UI, it's optimized for both desktop and mobile users, helping you stay focused and productive.

## How to Use 🚀

- ✍️ **Add tasks:** Type your task into the input field at the top and press Enter or click the add button to create a new task.
- ✏️ **Edit tasks:** Double-click on a task title to edit it inline. Press Enter or click outside to save changes.
- ✔️ **Complete tasks:** Click the checkbox next to a task to mark it as completed or active.
- 🗑️ **Delete tasks:** Click the delete icon/button on a task to remove it individually.
- 🔄 **Toggle all tasks:** Use the toggle-all checkbox to mark all tasks as completed or active at once.
- 🔍 **Filter tasks:** Use the filter buttons at the bottom to view All, Active, or Completed tasks.
- 🧹 **Clear completed:** Click the "Clear completed" button to remove all completed tasks from the list.
- ⚠️ **Error notifications:** If an action fails (e.g., network issues), a notification will appear to inform you.


## Live demo

Experience the live website: [TodoApp Demo](https://hetskoweb.github.io/react_todo-app/)

## Technologies Used 💻

**Core**
* **React (v18.3.1)** - UI framework
* **TypeScript (v5.2.2)** - Type safety
* **Sass (v1.83.4)** - Styling

**Development && Deployment**
* **Vite (v5.3.1)** - Build tool
* **ESLint (v8.57.0)** - Code Quality
* **Prettier (v3.3.2)** - Code Formatting

## Features

- ✅ **Add new tasks** with a simple and intuitive input form
- ✅ **Edit task titles** inline for quick updates
- ✅ **Mark tasks as completed** or active with a single click
- ✅ **Delete tasks** individually or clear all completed tasks at once
- ✅ **Filter tasks** by status: All, Active, Completed
- ✅ **Toggle all tasks** as completed or active in bulk
- ✅ **Responsive design** optimized for desktop and mobile devices
- ✅ **Error handling** with user-friendly notifications
- ✅ **Focus management** to improve keyboard navigation and accessibility
- ✅ **Loading states** to indicate async operations (adding, deleting, toggling)

## Additional Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/hetskoweb/react_todo-app.git
cd react_todo-app
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Run the project locally:**
```bash
npm start
# or
yarn start
```

## CI/CD (GitHub Actions) ⚙️

The workflow performs the following steps:

1. Repository checkout
2. Node.js setup and dependency installation
3. Documentation generation via TypeDoc
4. Automatic deployment of generated HTML docs to the `gh-pages` branch

### Summary 📝

During the lab work, the following was accomplished:

- Documented the code using TypeDoc/JSDoc comments
- Generated HTML documentation
- Configured CI/CD with GitHub Actions
- Automated deployment of documentation to GitHub Pages

The documentation system is fully automated: after each push to the `features/docs-ci` branch, GitHub Actions builds the docs and deploys them, making them immediately available online.

