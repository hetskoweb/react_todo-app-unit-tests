import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

/**
 * @brief Footer component for filtering and clearing completed todos.
 *
 * @param {Object} props
 * @param {Todo[]} props.todos - All todos.
 * @param {FilterStatus} props.currentFilter - Current filter.
 * @param {(filter: FilterStatus) => void} props.onFilterChange - Filter change handler.
 * @param {() => void} props.onClearCompleted - Clear completed handler.
 * @returns {JSX.Element | null}
 */
type Props = {
  todos: Todo[];
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeftText}
      </span>
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
