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

# Unit Tests for React Todo App

This directory contains unit tests for the **TodoFooter** and **ErrorNotification** components of the React Todo App.
The tests are written using **Jest** and **React Testing Library (RTL)** with **TypeScript**.

### 📦 Dependencies

Make sure the following dev dependencies are installed:

- `jest`
- `ts-jest`
- `@types/jest`
- `jest-environment-jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`

### ⚙️ Configuration

- **`jest.config.js`** — Jest configuration for TypeScript and React.
- **`jest.setup.ts`** — Setup file for RTL custom matchers (like `toBeInTheDocument`).
- **`tsconfig.json`** — TypeScript configuration including `@testing-library/jest-dom` types.

### 🧪 Running Tests

- Run all tests in watch mode using your npm script:
  `npm run test`
- Or using npx:
  `npx jest --watchAll`

### ✅ TodoFooter Tests

- **renders null if there are no todos** — checks that the footer is hidden when there are no todos.
- **displays correct active items count** — verifies the number of active tasks shown.
- **renders filter links with the correct selected class** — ensures the active filter is highlighted.
- **calls onFilterChange when a filter link is clicked** — tests filter click behavior.
- **disables/enables the clear completed button** — checks button state depending on completed todos.
- **calls onClearCompleted when the button is clicked** — verifies the clear completed button works.

### ✅ ErrorNotification Tests

- **renders the correct error messages** — tests `"load"`, `"add"`, `"delete"`, `"update"`, `"empty"` errors.
- **hides the notification if error is empty** — verifies that the component adds `hidden` class when no error.
- **calls onClose when the delete button is clicked** — ensures close button works.
- **automatically clears the error after 3 seconds** — tests the `useEffect` timeout logic with fake timers.

### 🔧 Notes

- Make sure `jest.setup.ts` is loaded via `setupFilesAfterEnv` in Jest config, otherwise matchers like `toBeInTheDocument` won’t work.
- All tests are written in **TypeScript**; make sure your editor is using the correct `tsconfig.json` including `"@testing-library/jest-dom"` types.

