import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";

import Loader from "./Loader";
import Details from "./Details";
import { getAllTrucks } from "../store/trucks";

const Truck = () => {
  const [show, setShow] = useState(false);
  const [truck, setTruck] = useState();

  const handleShow = (data) => {
    setTruck(data);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTrucks());

    // eslint-disable-next-line
  }, []);

  const { error, list, loading } = useSelector((state) => state.trucks);

  if (error)
    return (
      <Alert variant="danger" className="text-center">
        Something went wrong.
      </Alert>
    );

  return (
    <section id="truck-section">
      <Container>
        <Row>
          <h2 className="text-center">Trucks</h2>
          {loading ? (
            <Loader />
          ) : list?.length > 0 ? (
            list?.map((item) => {
              return (
                <Col md={4} key={item.id} className="trucks-cards mt-3">
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
          <Details show={show} handleClose={handleClose} data={truck} />
        </Row>
      </Container>
    </section>
  );
};

export default Truck;
