import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2966;

/**
 * @brief Fetches todos for the current user.
 * @returns {Promise<Todo[]>} Array of todos.
 */
export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

/**
 * @brief Creates a new todo.
 * @param {string} title - Title of the new todo.
 * @returns {Promise<Todo>} Created todo item.
 */
export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    userId: USER_ID,
    completed: false,
  });
};

/**
 * @brief Deletes a todo by ID.
 * @param {number} id - ID of the todo to delete.
 * @returns {Promise<void>}
 */
export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`);
};

/**
 * @brief Toggles completion status of a todo.
 * @param {number} id - Todo ID.
 * @param {boolean} completed - New completion status.
 * @returns {Promise<void>}
 */
export const toggleTodo = (id: number, completed: boolean) => {
  return client.patch(`/todos/${id}`, { completed });
};

/**
 * @brief Renames a todo.
 * @param {number} id - Todo ID.
 * @param {string} newTitle - New title for the todo.
 * @returns {Promise<void>}
 */
export const renameTodo = (id: number, newTitle: string) => {
  return client.patch(`/todos/${id}`, { title: newTitle });
};
