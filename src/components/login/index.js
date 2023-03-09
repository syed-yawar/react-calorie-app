import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { authenticate } from "../../redux/slices/user";

export const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    dispatch(authenticate(data));
  };
  return (
    <div className="container w-50 border">
      <div className="header ">
        <h3 className="text-center">Calorie Tracking App</h3>
      </div>
      <div className="row p-3 added">
        <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
            />
            {errors?.email?.type === "required" && <p className="error-form-field">This field is required</p>}
            {errors?.email?.type === "pattern" && <p className="error-form-field">Email is invalid</p>}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />
            {errors?.password?.type === "required" && <p className="error-form-field">This field is required</p>}
          </FormGroup>
          <Button color="primary" size="lg" block className="btn" type="submit" disabled={isLoading}>
            Login{"   "}
            {isLoading && <Spinner size="md" color="success" />}
          </Button>
        </Form>
        <Link to="/register">Need to sign-up?</Link>
      </div>
    </div>
  );
};
