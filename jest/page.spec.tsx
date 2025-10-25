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

  it('renders filter links with the correct selected class', () => {
    render(
      <TodoFooter
        todos={todos}
        currentFilter={FilterStatus.Active}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    );

    Object.values(FilterStatus).forEach(filter => {
      const link = screen.getByText(filter);
      expect(link).toBeInTheDocument();
      if (filter === FilterStatus.Active) {
        expect(link).toHaveClass('selected');
      } else {
        expect(link).not.toHaveClass('selected');
      }
    });
  });

  it('calls onFilterChange when a filter link is clicked', () => {
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

  it('calls onClearCompleted when the button is clicked', () => {
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
    expect(onClearCompleted).toHaveBeenCalled();
  });
});


describe('ErrorNotification', () => {
  const onClose = jest.fn();
  const setError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders the "load" error message', () => {
    render(<ErrorNotification error="load" setError={setError} onClose={onClose} />);
    expect(screen.getByText('Unable to load todos')).toBeInTheDocument();
  });

  it('renders the "add" error message', () => {
    render(<ErrorNotification error="add" setError={setError} onClose={onClose} />);
    expect(screen.getByText('Unable to add a todo')).toBeInTheDocument();
  });

  it('renders the "delete" error message', () => {
    render(<ErrorNotification error="delete" setError={setError} onClose={onClose} />);
    expect(screen.getByText('Unable to delete a todo')).toBeInTheDocument();
  });

  it('renders the "update" error message', () => {
    render(<ErrorNotification error="update" setError={setError} onClose={onClose} />);
    expect(screen.getByText('Unable to update a todo')).toBeInTheDocument();
  });

  it('renders the "empty" error message', () => {
    render(<ErrorNotification error="empty" setError={setError} onClose={onClose} />);
    expect(screen.getByText('Title should not be empty')).toBeInTheDocument();
  });

  it('hides the notification if error is empty', () => {
    render(<ErrorNotification error="" setError={setError} onClose={onClose} />);
    const notification = screen.getByTestId('ErrorNotification');
    expect(notification).toHaveClass('hidden');
  });

  it('calls onClose when the delete button is clicked', () => {
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
