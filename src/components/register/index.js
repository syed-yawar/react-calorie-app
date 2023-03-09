import React from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { register as registerThunk } from "../../redux/slices/user";
import { Link } from "react-router-dom";

export const Register = props => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();
  const onSubmit = data => {
    dispatch(registerThunk(data));
  };
  return (
    <div className="container w-50 border">
      <div className="header text-center">
        <h3>Calorie Tracking App</h3>
      </div>
      <div className="row p-3 added">
        <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="userName">User Name</Label>
            <input
              className="form-control"
              id="userName"
              placeholder="Enter your Name"
              {...register("userName", {
                required: "User Name is required!",
              })}
            />
            {errors?.userName && <p className="error-form-field">{errors.userName.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <input
              className="form-control"
              placeholder="Enter your Email"
              {...register("email", {
                required: "Email is required!",
                pattern: /\S+@\S+\.\S+/,
              })}
            />
            {errors?.email?.type === "required" && <p className="error-form-field">{errors.email.message}</p>}
            {errors?.email?.type === "pattern" && <p className="error-form-field">Email is invalid</p>}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
            />
            {errors?.password && <p className="error-form-field">{errors.password.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label for="RePassword">Re-password</Label>
            <input
              className="form-control"
              type="password"
              placeholder="Re-password"
              {...register("passwordConfirmation", {
                required: "Please confirm password!",
                validate: {
                  matchesPreviousPassword: value => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                },
              })}
            />
            {errors?.passwordConfirmation && <p className="error-form-field">{errors.passwordConfirmation.message}</p>}
          </FormGroup>
          <Button color="primary" size="lg" block className="btn" type="submit" disabled={isLoading}>
            Register {"   "}
            {isLoading && <Spinner size="md" color="success" />}
          </Button>
        </Form>
        <Link to="/login">Need to login?</Link>
      </div>
    </div>
  );
};
