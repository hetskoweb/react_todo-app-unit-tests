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

