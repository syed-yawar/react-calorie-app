/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Heading } from "../pageHeader";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../table";
import { userMeals, deleteMeal } from "../../redux/slices/admin";
import { AdminMealAdd, AddEdit } from "../meal";

export const Meal = () => {
  const dispatch = useDispatch();
  const { loadingMeals, allMeals } = useSelector(state => state.admin);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editMeal, setEditMeal] = useState(null);

  const deleteRow = id => {
    if (confirm("Want to delete?")) {
      dispatch(deleteMeal(id));
    }
  };
  const edit = data => {
    setEditMeal(data);
    setEditModal(true);
  };

  const addMeal = () => {
    setModal(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "userId",
      },
      {
        Header: "Food",
        accessor: "food",
      },
      {
        Header: "Calorie",
        accessor: "calorie",
      },
      {
        Header: "Date",
        accessor: "date",
        // Cell: props => {
        //   return props.value ? "Published" : "Pending";
        // },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: props => {
          const rowIdx = props.row.original["_id"];
          return (
            <div className="text-center">
              <span onClick={() => edit(props.row.original)}>
                <i className="far fa-edit action mr-2" />
              </span>

              <span onClick={() => deleteRow(rowIdx)}>
                <i className="fas fa-trash action" />
              </span>
            </div>
          );
        },
      },
    ],
    [],
  );
  useEffect(() => {
    dispatch(userMeals());
  }, []);
  return (
    <Container>
      <Heading title="All Users Meals" addButton={addMeal} addButtonText="Add Meal" />

      <Row className="p-4">
        {loadingMeals ? (
          <span>loading</span>
        ) : !allMeals || !allMeals.length ? (
          <span>No Meal To Show</span>
        ) : (
          <Col xs={12}>
            <CustomTable columns={columns} data={allMeals} />
          </Col>
        )}
      </Row>
      <AdminMealAdd modal={modal} setModal={setModal} />
      <AddEdit modal={editModal} setModal={setEditModal} meal={editMeal} />
    </Container>
  );
};
