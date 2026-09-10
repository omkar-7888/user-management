import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({
  users,
  loading,
  onEdit,
  onDelete
}: UserTableProps) {
  if (loading) {
    return (
      <div className="status-message">
        Loading users...
      </div>
    );
  }

  if (users?.length === 0) {
    return (
      <div className="status-message">
        No users found.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.city}</td>
              <td className="actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}