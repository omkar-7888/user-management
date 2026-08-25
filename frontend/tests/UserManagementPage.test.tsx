import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { UserManagementPage } from "../src/pages/UserManagementPage";

vi.mock("../src/services/api", () => ({
  getUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn()
}));

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser
} from "../src/services/api";

const mockedGetUsers = vi.mocked(getUsers);
const mockedCreateUser = vi.mocked(createUser);
const mockedUpdateUser = vi.mocked(updateUser);
const mockedDeleteUser = vi.mocked(deleteUser);

const testUser = {
  id: 1,
  name: "Omkar Salunke",
  email: "omkar@example.com",
  age: 27,
  city: "Pune",
  createdAt: "2026-08-23T00:00:00.000Z",
  updatedAt: "2026-08-23T00:00:00.000Z"
};

describe("UserManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedGetUsers.mockResolvedValue([testUser]);
  });

  it("loads and displays users", async () => {
    render(<UserManagementPage />);

    expect(
      await screen.findByText("Omkar Salunke")
    ).toBeInTheDocument();

    expect(mockedGetUsers).toHaveBeenCalled();
  });

  it("shows API failure message", async () => {
    mockedGetUsers.mockRejectedValue(
      new Error("API failed")
    );

    render(<UserManagementPage />);

    expect(
      await screen.findByText(
        "Unable to load users. Please try again."
      )
    ).toBeInTheDocument();
  });

  it("creates a user", async () => {
    mockedCreateUser.mockResolvedValue({
      ...testUser,
      id: 2,
      email: "new@example.com"
    });

    render(<UserManagementPage />);

    await screen.findByText("Omkar Salunke");

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "New User" }
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "new@example.com" }
    });

    fireEvent.change(screen.getByLabelText("Age"), {
      target: { value: "25" }
    });

    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "Mumbai" }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create User"
      })
    );

    await waitFor(() => {
      expect(mockedCreateUser).toHaveBeenCalledWith({
        name: "New User",
        email: "new@example.com",
        age: 25,
        city: "Mumbai"
      });
    });
  });

  it("populates form when editing", async () => {
    render(<UserManagementPage />);

    await screen.findByText("Omkar Salunke");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit"
      })
    );

    expect(
      screen.getByDisplayValue("Omkar Salunke")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("omkar@example.com")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Update User"
      })
    ).toBeInTheDocument();
  });

  it("updates a user", async () => {
    mockedUpdateUser.mockResolvedValue({
      ...testUser,
      name: "Updated User"
    });

    render(<UserManagementPage />);

    await screen.findByText("Omkar Salunke");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Edit"
      })
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated User" }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Update User"
      })
    );

    await waitFor(() => {
      expect(mockedUpdateUser).toHaveBeenCalledWith(
        1,
        {
          name: "Updated User",
          email: "omkar@example.com",
          age: 27,
          city: "Pune"
        }
      );
    });
  });

  it("shows confirmation before deleting", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockReturnValue(false);

    render(<UserManagementPage />);

    await screen.findByText("Omkar Salunke");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete"
      })
    );

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockedDeleteUser).not.toHaveBeenCalled();

    confirmSpy.mockRestore();
  });

  it("deletes user after confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    mockedDeleteUser.mockResolvedValue();

    render(<UserManagementPage />);

    await screen.findByText("Omkar Salunke");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Delete"
      })
    );

    await waitFor(() => {
      expect(mockedDeleteUser).toHaveBeenCalledWith(1);
    });
  });
});