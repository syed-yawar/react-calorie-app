import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Label, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import { addUserMealByAdmin } from "../../redux/slices/admin";
import { users } from "../../redux/slices/adminUsers";

export const AdminMeal = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const { allUsers, loadingUsers } = useSelector(state => state.adminUsers);
  const isLoading = useSelector(state => state.admin.isAddedEditMeal);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const toggle = () => setModal(modal => !modal);
  const onSubmit = data => {
    dispatch(addUserMealByAdmin(data));
    reset();
  };
  const getAllUsers = () => dispatch(users());
  useEffect(() => {
    !isLoading && setModal(false);
  }, [isLoading]);
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    !loadingUsers && setModal(false);
  }, [loadingUsers]);
  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Meal </ModalHeader>
        <ModalBody>
          <Form className="w-100">
            <FormGroup>
              <Label for="exampleEmail">User</Label>
              <select
                className="form-control"
                placeholder="Select User"
                name="userId"
                id="exampleSelect"
                {...register("userId", {
                  required: "User is required",
                })}
              >
                {allUsers.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))}
              </select>
              {errors?.userId && <p className="error-form-field">{errors.userId.message}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Food Name</Label>
              <input
                className="form-control"
                placeholder="Enter Food Name"
                {...register("food", {
                  required: "Food name is required",
                })}
              />
              {errors?.food && <p className="error-form-field">{errors.food.message}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Add Calories Intake</Label>
              <input
                className="form-control"
                type="number"
                min={1}
                placeholder="Enter Calories"
                {...register("calorie", {
                  required: "Calorie is required",
                  min: 1,
                })}
              />
              {errors?.calorie?.type === "required" && <p className="error-form-field">{errors.calorie.message}</p>}
              {errors?.calorie?.type === "min" && <p className="error-form-field">Min value is 1</p>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            size="lg"
            block
            className="btn"
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loadingUsers}
          >
            Add
            {loadingUsers && <Spinner size="md" color="success" />}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
