import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container } from "react-bootstrap";

import { getAllCars } from "../store/cars";

const Car = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());

    // eslint-disable-next-line
  }, []);

  const { error, list, loading } = useSelector((state) => state.cars);

  const cars = list?.map((item) => {
    return {
      ...item,
      carImages: item.carImages.filter((image) => image.isMain),
    };
  });

  return (
    <section id="car-section">
      <Container>
        <Row>
          <h2 className="text-center">Cars</h2>
          {cars?.map((item) => {
            return (
              <Col md={4} key={item.id} className="cars-cards mt-3">
                <Card>
                  <Card.Img variant="top" src={item.carImages[0].imagePath} />
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

export default Car;
