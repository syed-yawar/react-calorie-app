import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardText, CardHeader, CardBody, CardTitle } from "reactstrap";
import { getDashBoardData } from "../../redux/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../table";
import { Heading } from "../pageHeader";

export const Admin = () => {
  const dispatch = useDispatch();
  const { dashboard, isDashBoardLoading } = useSelector(state => state.admin);
  const columns = React.useMemo(
    () => [
      {
        Header: "Average Calories Added In Last 7 Days",
        columns: [
          {
            Header: "User Id",
            accessor: "userId",
          },
          {
            Header: "Total Calories",
            accessor: "totalCalories",
          },
          {
            Header: "Average",
            accessor: "avg",
            // Cell: props => {
            //   return props.value ? "Published" : "Pending";
            // },
          },
        ],
      },
    ],
    [],
  );
  useEffect(() => {
    dispatch(getDashBoardData());
  }, []);
  return (
    <>
      <Container>
        <Heading title="Admin Dashboard" />
        <Row className="p-4">
          <Col xs={12} md={6} className="pt-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-center" tag="h5">
                  <b> Meals Added In Last 7 Days</b>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CardText className="text-center">{dashboard && dashboard.lastSevenDaysCount}</CardText>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6} className="pt-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-center" tag="h5">
                  <b> Meals Added In Previous Week</b>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CardText className="text-center">{dashboard && dashboard.olderThanSevenDaysCount}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="p-4">
          {isDashBoardLoading ? (
            <span>loading</span>
          ) : !dashboard || !dashboard.usersData ? (
            <span>No users To Show</span>
          ) : (
            <Col xs={12}>
              <CustomTable columns={columns} data={dashboard.usersData} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
