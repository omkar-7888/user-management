import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from "../services/api";
import type {
  CreateUserRequest,
  User
} from "../types/user";

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);
    } catch {
      setError(
        "Unable to load users. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (
    data: CreateUserRequest
  ) => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (selectedUser) {
        await updateUser(selectedUser.id, data);
        setMessage("User updated successfully.");
      } else {
        await createUser(data);
        setMessage("User created successfully.");
      }

      setSelectedUser(null);

      await loadUsers();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data?.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(
          "Unable to save the user. Please try again."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await deleteUser(user.id);

      setMessage("User deleted successfully.");

      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }

      await loadUsers();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response?.data?.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(
          "Unable to delete the user. Please try again."
        );
      }
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <main className="container">
      <header className="page-header">
        <div>
          <h1>User Management</h1>
          <p>
            Simple React + Node.js + PostgreSQL CRUD
            application
          </p>
        </div>
      </header>

      {message && (
        <div
          className="alert success"
          role="alert"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="alert error"
          role="alert"
        >
          {error}
        </div>
      )}

      <UserForm
        user={selectedUser}
        loading={saving}
        onSubmit={handleSubmit}
        onCancelEdit={() => {
          setSelectedUser(null);
          setMessage("");
          setError("");
        }}
      />

      <section className="users-section">
        <h2>Users</h2>

        <UserTable
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={(user) => {
            void handleDelete(user);
          }}
        />
      </section>
    </main>
  );
}