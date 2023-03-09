import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Label, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { addUserMeal } from "../../redux/slices/meal";
import { editUserMeal } from "../../redux/slices/admin";
import { AdminMeal } from "./addAdminMeal";
const Meal = ({ modal, setModal, meal }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.meals.isAddedEditMeal);
  const isEditMealLoading = useSelector(state => state.admin.isEditMealLoading);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const toggle = () => {
    reset();
    setModal(modal => !modal);
  };
  const onSubmit = data => {
    if (meal) {
      dispatch(editUserMeal(data));
    } else {
      dispatch(addUserMeal(data));
    }
    reset();
  };
  useEffect(() => {
    for (const property in meal) {
      setValue(property, meal[property]);
    }
  }, [meal]);
  useEffect(() => {
    (!isLoading || !isEditMealLoading) && setModal(false);
  }, [isLoading, isEditMealLoading]);
  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{meal ? "Edit" : "Add"} Meal </ModalHeader>
        <ModalBody>
          <Form className="w-100">
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
            disabled={isLoading || isEditMealLoading}
          >
            {meal ? "Edit" : "Add"}
            {(isLoading || isEditMealLoading) && <Spinner size="md" color="success" />}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const AddEdit = memo(Meal);
export const AdminMealAdd = memo(AdminMeal);
