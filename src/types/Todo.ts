/**
 * @brief Represents a single todo item.
 */
export interface Todo {
  /** @brief Unique identifier of the todo */
  id: number;

  /** @brief Title of the todo */
  title: string;

  /** @brief Completion status of the todo */
  completed: boolean;

  /** @brief User ID associated with the todo */
  userId: number;
}
