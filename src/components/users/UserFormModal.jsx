import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";

const UserFormModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const isEdit = !!user;
  const { projects } = useSelector((state) => state.projects);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      reset(user);
    }
  }, [user, isEdit, reset]);

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      id: isEdit ? user.id : Date.now().toString(),
      projectIds: Array.isArray(data.projectIds)
        ? data.projectIds
        : [data.projectIds],
    };

    if (isEdit) {
      dispatch(updateUser(formattedData));
      toast.success("User updated");
    } else {
      dispatch(addUser({
  ...formattedData,
  role: data.role || "manager"
}));


      toast.success("User created");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            type="email"
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 4, message: "Minimum 4 characters" },
            })}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <select
            {...register("role", { required: "Role is required" })}
            className="w-full p-2 border rounded"
            defaultValue={user?.role || ""}
          >
            <option value="">-- Select Role --</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          <label className="block text-sm text-gray-700 font-medium">
            Assign Projects
          </label>
          <select
            {...register("projectIds")}
            multiple
            className="w-full p-2 border rounded"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;