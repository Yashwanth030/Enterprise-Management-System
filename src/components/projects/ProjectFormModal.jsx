import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject } from "../../redux/slices/projectSlice";
import { addNotification } from "../../redux/slices/notificationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  manager: yup.string().required("Manager email is required"),
  status: yup.string().required("Status is required"),
});

const ProjectFormModal = ({ isEdit, defaultValues, onClose }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { name: "", manager: "", status: "" },
  });

  useEffect(() => {
    reset(defaultValues || { name: "", manager: "", status: "" });
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    if (isEdit) {
      dispatch(updateProject({ ...data, id: defaultValues.id }));
      toast.success("Project updated successfully ✅");

      if (data.status === "Completed") {
        dispatch(
          addNotification({
            message: `📌 Project '${data.name}' marked completed.`,
            role: "admin",
            type: "success",
          })
        );
        dispatch(
          addNotification({
            message: `✅ Project '${data.name}' successfully completed.`,
            role: "manager",
            type: "success",
          })
        );
      }
    } else {
      const id = Date.now();
      dispatch(addProject({ ...data, id }));
      toast.success("Project created successfully 🎉");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Project" : "New Project"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Project Name
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="manager" className="block text-sm font-medium">
              Manager
            </label>
            <select
              id="manager"
              {...register("manager")}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Manager</option>
              {users
                .filter((u) => u.role === "manager")
                .map((manager) => (
                  <option key={manager.id} value={manager.email}>
                    {manager.email}
                  </option>
                ))}
            </select>
            {errors.manager && (
              <p className="text-red-500 text-sm">
                {errors.manager.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default ProjectFormModal;
