import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";

const TaskForm = ({ onSubmit, users, task, mode }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    dueDate: Yup.date()
      .typeError("Please provide a valid date")
      .required("Due date is required"),
    assignedTo: Yup.string().required("Task must be assigned to a user"),
  });

  const usersFiltered = users?.filter((user) => user.role === "User");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      assignedTo: "",
    },
  });

  useEffect(() => {
    if (task && mode === "edit") {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate.split("T")[0],
        assignedTo: task.assignedTo?._id,
      });
    }
  }, [task, mode, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 style={{ marginBottom: 0 }}>Create Task</h2>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            fullWidth
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        )}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Priority"
            select
            fullWidth
            margin="normal"
          >
            {["Low", "Medium", "High"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="dueDate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
          />
        )}
      />
      <Controller
        name="assignedTo"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Assign To"
            select
            fullWidth
            margin="normal"
            error={!!errors.assignedTo}
            helperText={errors.assignedTo?.message}
          >
            {usersFiltered.length > 0 ? (
              usersFiltered?.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No users found</MenuItem>
            )}
          </TextField>
        )}
      />
      <Button
        sx={{ backgroundColor: "#1c98b0" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;
