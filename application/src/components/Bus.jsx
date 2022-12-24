import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container } from "react-bootstrap";

import { getAllBuses } from "../store/buses";

const Bus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBuses());

    // eslint-disable-next-line
  }, []);

  const { error, list, loading } = useSelector((state) => state.buses);

  return (
    <section id="bus-section">
      <Container>
        <Row>
          <h2 className="text-center">Buses</h2>
          {list?.map((item) => {
            return (
              <Col md={4} key={item.id} className="buses-cards mt-3">
                <Card>
                  <Card.Img variant="top" src={item.imagePath} />
                  <Card.Body>
                    <Card.Title>Company: {item.company}</Card.Title>
                    <Card.Text className="my-3">Model: {item.model}</Card.Text>
                    <Button variant="primary">Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Bus;
