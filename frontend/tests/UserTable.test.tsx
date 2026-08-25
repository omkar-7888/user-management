import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserTable } from "../src/components/UserTable";
import type { User } from "../src/types/user";

const users: User[] = [
  {
    id: 1,
    name: "Omkar Salunke",
    email: "omkar@example.com",
    age: 27,
    city: "Pune",
    createdAt: "2026-08-23T00:00:00.000Z",
    updatedAt: "2026-08-23T00:00:00.000Z"
  }
];

describe("UserTable", () => {
  it("shows loading state", () => {
    render(
      <UserTable
        users={[]}
        loading={true}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText("Loading users...")
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(
      <UserTable
        users={[]}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText("No users found.")
    ).toBeInTheDocument();
  });

  it("renders users", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    );

    expect(
      screen.getByText("Omkar Salunke")
    ).toBeInTheDocument();

    expect(
      screen.getByText("omkar@example.com")
    ).toBeInTheDocument();

    expect(screen.getByText("Pune")).toBeInTheDocument();
  });

  it("calls edit handler", () => {
    const onEdit = vi.fn();

    render(
      <UserTable
        users={users}
        loading={false}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Edit" })
    );

    expect(onEdit).toHaveBeenCalledWith(users[0]);
  });

  it("calls delete handler", () => {
    const onDelete = vi.fn();

    render(
      <UserTable
        users={users}
        loading={false}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Delete" })
    );

    expect(onDelete).toHaveBeenCalledWith(users[0]);
  });
});