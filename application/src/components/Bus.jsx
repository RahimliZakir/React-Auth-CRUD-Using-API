import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import { getAllBuses } from "../store/buses";

const Bus = () => {
  const [show, setShow] = useState(false);
  const [bus, setBus] = useState();

  const handleShow = (data) => {
    setBus(data);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBuses());

    // eslint-disable-next-line
  }, []);

  const { error, list, loading } = useSelector((state) => state.buses);

  if (error)
    return (
      <Alert variant="danger" className="text-center">
        Something went wrong.
      </Alert>
    );

  return (
    <section id="bus-section">
      <Container>
        <Row>
          <h2 className="text-center">Buses</h2>
          {loading ? (
            <Loader />
          ) : list?.length > 0 ? (
            list?.map((item) => {
              return (
                <Col md={4} key={item.id} className="buses-cards mt-3">
                  <Card>
                    <Card.Img variant="top" src={item.imagePath} />
                    <Card.Body>
                      <Card.Title>Company: {item.company}</Card.Title>
                      <Card.Text className="my-3">
                        Model: {item.model}
                      </Card.Text>
                      <Button
                        onClick={() => handleShow(item)}
                        variant="primary"
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Alert variant="warning" className="text-center">
              There are no data.
            </Alert>
          )}
          <DynamicDetails show={show} handleClose={handleClose} data={bus} />
        </Row>
      </Container>
    </section>
  );
};

export default Bus;
