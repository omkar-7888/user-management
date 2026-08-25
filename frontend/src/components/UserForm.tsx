import { useEffect, useState } from "react";
import type {
  CreateUserRequest,
  User
} from "../types/user";

interface UserFormProps {
  user: User | null;
  loading: boolean;
  onSubmit: (data: CreateUserRequest) => Promise<void>;
  onCancelEdit: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  city?: string;
}

const emptyForm: CreateUserRequest = {
  name: "",
  email: "",
  age: 18,
  city: ""
};

export function UserForm({
  user,
  loading,
  onSubmit,
  onCancelEdit
}: UserFormProps) {
  const [form, setForm] =
    useState<CreateUserRequest>(emptyForm);

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        age: user.age,
        city: user.city
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [user]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    } else if (form.name.trim().length > 100) {
      nextErrors.name =
        "Name must not exceed 100 characters";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = "Enter a valid email";
    }

    if (
      !Number.isInteger(form.age) ||
      form.age < 1 ||
      form.age > 120
    ) {
      nextErrors.age = "Age must be between 1 and 120";
    }

    if (!form.city.trim()) {
      nextErrors.city = "City is required";
    } else if (form.city.trim().length > 100) {
      nextErrors.city =
        "City must not exceed 100 characters";
    }

    return nextErrors;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      age: Number(form.age),
      city: form.city.trim()
    });

    if (!user) {
      setForm(emptyForm);
    }

    setErrors({});
  };

  const handleChange = (
    field: keyof CreateUserRequest,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]:
        field === "age"
          ? Number(value)
          : value
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined
    }));
  };

  return (
    <form
      className="user-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-header">
        <h2>{user ? "Edit User" : "Add User"}</h2>

        {user && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Name
          <input
            aria-label="Name"
            value={form.name}
            onChange={(event) =>
              handleChange("name", event.target.value)
            }
            disabled={loading}
          />
          {errors.name && (
            <span className="field-error">
              {errors.name}
            </span>
          )}
        </label>

        <label>
          Email
          <input
            aria-label="Email"
            type="email"
            value={form.email}
            onChange={(event) =>
              handleChange("email", event.target.value)
            }
            disabled={loading}
          />
          {errors.email && (
            <span className="field-error">
              {errors.email}
            </span>
          )}
        </label>

        <label>
          Age
          <input
            aria-label="Age"
            type="number"
            min="1"
            max="120"
            value={form.age}
            onChange={(event) =>
              handleChange("age", event.target.value)
            }
            disabled={loading}
          />
          {errors.age && (
            <span className="field-error">
              {errors.age}
            </span>
          )}
        </label>

        <label>
          City
          <input
            aria-label="City"
            value={form.city}
            onChange={(event) =>
              handleChange("city", event.target.value)
            }
            disabled={loading}
          />
          {errors.city && (
            <span className="field-error">
              {errors.city}
            </span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="primary-button"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : user
            ? "Update User"
            : "Create User"}
      </button>
    </form>
  );
}