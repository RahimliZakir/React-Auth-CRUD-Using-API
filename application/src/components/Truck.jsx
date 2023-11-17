import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import CreateUpdate from "./CreateUpdate";

import { getAllTrucks, deleteTruck } from "../store/trucks";
import { useDeleteEntity } from "../hooks/useDeleteEntity";

const Truck = () => {
  const dispatch = useDispatch();
  const { error, list, loading } = useSelector((state) => state.trucks);
  useEffect(() => {
    dispatch(getAllTrucks());

    // eslint-disable-next-line
  }, []);

  const [truck, setTruck] = useState({});
  const [show, setShow] = useState(false);
  const [createUpdateShow, setCreateUpdateShow] = useState(false);

  const handleCreateUpdateShow = (data) => {
    if (!data.target) {
      setTruck(data);
    }

    setCreateUpdateShow(true);
  };
  const handleCreateUpdateClose = () => {
    setCreateUpdateShow(false);
  };

  const handleShow = (data) => {
    setTruck(data);

    setShow(true);
  };
  const handleClose = () => setShow(false);

  const deleteEntity = useDeleteEntity();

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
          <div className="create-side">
            <Button variant="success" onClick={handleCreateUpdateShow}>
              Create
            </Button>
          </div>
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
                        variant="warning"
                        onClick={() => handleCreateUpdateShow(item)}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => handleShow(item)}
                        variant="primary"
                        className="mx-1"
                      >
                        Details
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteEntity(item.id, deleteTruck)}
                      >
                        Delete
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
          <CreateUpdate
            show={createUpdateShow}
            handleClose={handleCreateUpdateClose}
            componentName={"truck"}
            item={truck}
            setItem={setTruck}
          />
          <DynamicDetails show={show} handleClose={handleClose} data={truck} />
        </Row>
      </Container>
    </section>
  );
};

export default Truck;
