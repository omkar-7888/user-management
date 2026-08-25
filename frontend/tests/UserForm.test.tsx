import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserForm } from "../src/components/UserForm";

describe("UserForm", () => {
  it("renders all form fields", () => {
    render(
      <UserForm
        user={null}
        loading={false}
        onSubmit={vi.fn()}
        onCancelEdit={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
  });

  it("shows validation errors for invalid form", async () => {
    const onSubmit = vi.fn();

    render(
      <UserForm
        user={null}
        loading={false}
        onSubmit={onSubmit}
        onCancelEdit={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "invalid" }
    });

    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "" }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create User"
      })
    );

    expect(
      await screen.findByText("Name is required")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Enter a valid email")
    ).toBeInTheDocument();

    expect(
      screen.getByText("City is required")
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits valid form data", async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <UserForm
        user={null}
        loading={false}
        onSubmit={onSubmit}
        onCancelEdit={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" }
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" }
    });

    fireEvent.change(screen.getByLabelText("Age"), {
      target: { value: "30" }
    });

    fireEvent.change(screen.getByLabelText("City"), {
      target: { value: "Pune" }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create User"
      })
    );

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      age: 30,
      city: "Pune"
    });
  });
});