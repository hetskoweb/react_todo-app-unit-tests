import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoFooter } from '../src/components/TodoFooter/TodoFooter';
import { ErrorNotification } from '../src/components/ErrorNotification/ErrorNotification';
import { FilterStatus } from '../src/types/FilterStatus';
import { Todo } from '../src/types/Todo';

describe('TodoFooter', () => {
  const todos: Todo[] = [
    { userId: 1, id: 1, title: 'Task 1', completed: false },
    { userId: 1, id: 2, title: 'Task 2', completed: true },
    { userId: 1, id: 3, title: 'Task 3', completed: false },
  ];

  const onFilterChange = jest.fn();
  const onClearCompleted = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders null if there are no todos', () => {
    const { container } = render(
      <TodoFooter
        todos={[]}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('displays correct active items count', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    expect(screen.getByText('2 items left')).toBeInTheDocument();
  });

  it('renders filter links with the correct selected class and handles invalid filter gracefully', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={'InvalidFilter' as FilterStatus}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    Object.values(FilterStatus).forEach(filter => {
      const link = screen.getByText(filter);
      expect(link).toBeInTheDocument();
      // none should be selected for invalid filter
      expect(link).not.toHaveClass('selected');
    });
  });

  it('calls onFilterChange with correct arguments when a filter link is clicked', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const activeLink = screen.getByText(FilterStatus.Active);
    fireEvent.click(activeLink);
    expect(onFilterChange).toHaveBeenCalledTimes(1);
    expect(onFilterChange).toHaveBeenCalledWith(FilterStatus.Active);
  });

  it('disables the clear completed button if there are no completed todos', () => {
    render(
      <TodoFooter
        todos={todos.filter(todo => !todo.completed)}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const button = screen.getByRole('button', { name: /clear completed/i });
    expect(button).toBeDisabled();
  });

  it('enables the clear completed button if there are completed todos', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const button = screen.getByRole('button', { name: /clear completed/i });
    expect(button).not.toBeDisabled();
  });

  it('calls onClearCompleted with no arguments when clicked', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const button = screen.getByRole('button', { name: /clear completed/i });
    fireEvent.click(button);
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
    expect(onClearCompleted).toHaveBeenCalledWith();
  });

  it('has proper accessibility roles and labels', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear completed/i })).toHaveAttribute('aria-label', expect.stringContaining('Clear'));
  });

  it('handles performance gracefully with large number of todos', () => {
    const largeTodos = Array.from({ length: 1000 }, (_, i) => ({
      userId: 1,
      id: i,
      title: `Task ${i}`,
      completed: i % 2 === 0,
    }));

    const start = performance.now();

    render(
      <TodoFooter
        todos={largeTodos}
        currentFilter={FilterStatus.All}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
});

describe('ErrorNotification', () => {
  const onClose = jest.fn();
  const setError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const knownErrors = {
    load: 'Unable to load todos',
    add: 'Unable to add a todo',
    delete: 'Unable to delete a todo',
    update: 'Unable to update a todo',
    empty: 'Title should not be empty',
  };

  Object.entries(knownErrors).forEach(([key, message]) => {
    it(`renders "${key}" error message`, () => {
      render(<ErrorNotification error={key} setError={setError} onClose={onClose} />);
      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  it('renders fallback message for unexpected error type', () => {
    render(<ErrorNotification error="unknownError" setError={setError} onClose={onClose} />);
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });

  it('handles null or undefined error safely', () => {
    const { rerender } = render(<ErrorNotification error={null as any} setError={setError} onClose={onClose} />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    rerender(<ErrorNotification error={undefined as any} setError={setError} onClose={onClose} />);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('has appropriate accessibility roles and attributes', () => {
    render(<ErrorNotification error="load" setError={setError} onClose={onClose} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('hides the notification if error is empty', () => {
    render(<ErrorNotification error="" setError={setError} onClose={onClose} />);
    const notification = screen.getByTestId('ErrorNotification');
    expect(notification).toHaveClass('hidden');
  });

  it('calls onClose when the hide button is clicked', () => {
    render(<ErrorNotification error="load" setError={setError} onClose={onClose} />);
    const button = screen.getByTestId('HideErrorButton');
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('automatically clears the error after 3 seconds', () => {
    jest.useFakeTimers();
    render(<ErrorNotification error="load" setError={setError} onClose={onClose} />);

    jest.advanceTimersByTime(3000);
    expect(setError).toHaveBeenCalledWith('');
  });
});
