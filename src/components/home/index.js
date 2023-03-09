import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tooltip, Button } from "reactstrap";
import { Heading } from "../pageHeader";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../table";
import { userMeals } from "../../redux/slices/meal";
import { Invite } from "../invite";
import { AddEdit } from "../meal";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";

export const Home = () => {
  const dispatch = useDispatch();
  const { loadingMeals, allMeals } = useSelector(state => state.meals);
  const [inviteModal, setInviteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const calorieThreshold = useSelector(state => state.user.calorieThreshold);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [dateRangeState, setDateRange] = useState([null, null]);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const open = id => {};
  const addMeal = () => {
    setModal(true);
  };
  const inviteFriend = () => {
    setInviteModal(true);
  };
  const filter = () => {
    if (!filterApplied) {
      const [startDate, endDate] = dateRangeState;
      if (!startDate || !endDate) return;
      dispatch(
        userMeals({
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
        }),
      );
    } else {
      setDateRange([null, null]);
      getAllMeals();
    }
    setFilterApplied(filter => !filter);
  };

  const columns = React.useMemo(
    () => [
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
      // {
      //   Header: "Actions",
      //   accessor: "actions",
      //   Cell: props => {
      //     const rowIdx = props.row.original["_id"];
      //     return (
      //       <div>
      //         <span onClick={() => open(rowIdx, props)}>
      //           <i className="far fa-edit action mr-2" />
      //         </span>

      //         <span onClick={() => open(rowIdx)}>
      //           <i className="fas fa-trash action" />
      //         </span>
      //       </div>
      //     );
      //   },
      // },
    ],
    [],
  );
  const getAllMeals = () => dispatch(userMeals());
  useEffect(() => {
    getAllMeals();
  }, []);
  return (
    <Container>
      <Heading title="Your Meals" addButton={addMeal} addButtonText="Add Meal" inviteButton={inviteFriend} />

      <Row className="p-4">
        <Container className="m-4">
          <Row style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Col xs={12} md={4} className="mt-2">
              <DateRangePicker
                disabled={filterApplied}
                className="w-100"
                onChange={setDateRange}
                value={dateRangeState}
              />
            </Col>
            <Col xs={12} md={4} className="mt-2">
              <Button className="" color="primary" block onClick={filter}>
                {filterApplied && " Remove "}Filter
              </Button>
            </Col>
          </Row>
        </Container>

        {loadingMeals ? (
          <span>loading</span>
        ) : !allMeals || !allMeals.length ? (
          <span>No Meal To Show</span>
        ) : (
          allMeals.map(({ date, meals, totalCalories }, index) => {
            return (
              <Col className="border mt-4 pt-3" key={index} xs="12">
                <Row>
                  <Col xs={6}>
                    <h5>
                      Date: <u>{date}</u>
                    </h5>
                  </Col>
                  <Col xs={6}>
                    <h5>
                      Total Calories Consumed: <u>{totalCalories}</u>
                      {"  "}
                      {calorieThreshold <= totalCalories && (
                        <>
                          <span className="text-warning" id={"TooltipExample" + index}>
                            &#9888;
                          </span>
                          <Tooltip
                            placement="right"
                            isOpen={tooltipOpen}
                            target={"TooltipExample" + index}
                            toggle={toggle}
                          >
                            limit exceeded!
                          </Tooltip>
                        </>
                      )}
                    </h5>
                  </Col>
                </Row>
                <CustomTable columns={columns} data={meals} />
              </Col>
            );
          })
        )}
      </Row>
      <AddEdit modal={modal} setModal={setModal} />
      <Invite modal={inviteModal} setModal={setInviteModal} />
    </Container>
  );
};
