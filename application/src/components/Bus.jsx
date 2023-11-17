import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import CreateUpdate from "./CreateUpdate";

import { getAllBuses, deleteBus } from "../store/buses";
import { useDeleteEntity } from "../hooks/useDeleteEntity";

const Bus = () => {
  const dispatch = useDispatch();
  const { error, list, loading } = useSelector((state) => state.buses);
  useEffect(() => {
    dispatch(getAllBuses());

    // eslint-disable-next-line
  }, []);

  const [bus, setBus] = useState({});
  const [show, setShow] = useState(false);
  const [createUpdateShow, setCreateUpdateShow] = useState(false);

  const handleCreateUpdateShow = (data) => {
    if (!data.target) {
      setBus(data);
    }

    setCreateUpdateShow(true);
  };
  const handleCreateUpdateClose = () => {
    setCreateUpdateShow(false);
  };

  const handleShow = (data) => {
    setBus(data);

    setShow(true);
  };
  const handleClose = () => setShow(false);

  //* Custom React Hook for deleting selected entity
  const deleteEntity = useDeleteEntity();

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
                <Col md={4} key={item.id} className="buses-cards mt-3">
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
                        className="mx-1"
                        variant="primary"
                      >
                        Details
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => deleteEntity(item.id, deleteBus)}
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
            componentName={"bus"}
            item={bus}
            setItem={setBus}
          />
          <DynamicDetails show={show} handleClose={handleClose} data={bus} />
        </Row>
      </Container>
    </section>
  );
};

export default Bus;
