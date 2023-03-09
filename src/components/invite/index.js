import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import { UserService } from "../../services";
import { openToast } from "../../services/utils/index";
import { TOAST_TYPE } from "../../constants";
import styles from "./invite.module.css";

const InviteModel = ({ modal, setModal }) => {
  const [inviteData, setInviteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const toggle = () => {
    reset();
    setInviteData(null);
    setModal(modal => !modal);
  };
  const onSubmit = async data => {
    setIsLoading(true);
    const userService = new UserService();
    const response = await userService.inviteFriend(data);
    setIsLoading(false);
    if (!response.success) {
      openToast(TOAST_TYPE.ERROR, response?.statusMessage);
    } else {
      setInviteData(response.data);
      reset();
    }
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <span className={styles.header_title}>Invite Friend </span>
        </ModalHeader>
        <ModalBody>
          <Form className={styles.form_body}>
            <FormGroup>
              <Label for="exampleEmail">User Name</Label>
              <input
                className="form-control"
                placeholder="Enter Name"
                {...register("userName", {
                  required: "Name is required",
                })}
              />
              {errors?.userName && <p className="error-form-field">{errors.userName.message}</p>}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Email</Label>
              <input
                className="form-control"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors?.email?.type === "required" && <p className="error-form-field">{errors.email.message}</p>}
              {errors?.email?.type === "pattern" && <p className="error-form-field">Email is invalid</p>}
            </FormGroup>
            <Button
              color="primary"
              size="lg"
              block
              className="btn"
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Invite
              {isLoading && <Spinner size="md" color="success" />}
            </Button>
          </Form>
          {inviteData && (
            <div>
              <h4 className={styles.invite_detail_header}>Invite Detail</h4>

              <p>Email: {inviteData.email}</p>
              <p>Password: {inviteData.password}</p>
              <p>
                Token:{" "}
                {inviteData.token.split("", 10).reduce((o, c) => (o.length === 9 ? `${o}${c}...` : `${o}${c}`), "")}
              </p>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export const Invite = InviteModel;
