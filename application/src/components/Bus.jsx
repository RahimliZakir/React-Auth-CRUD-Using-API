import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import CreateUpdate from "./CreateUpdate";
import { getAllBuses, deleteBus } from "../store/buses";

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

  const handlecreateUpdateShow = (data) => {
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

  const MySwal = withReactContent(Swal);

  const handleDeleteBus = (id) => {
    MySwal.fire({
      title: <h2>Silmək istədiyinizə əminsinizmi?</h2>,
      html: <p>Bu qərar geri alınmayacaq!</p>,
      icon: "warning",
      confirmButtonText: "Sil",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "İmtina",
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        // MySwal.showLoading();
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBus(id));

        return MySwal.fire(
          "Uğurlu!",
          "Seçilmiş məlumat uğurla silindi.",
          "success"
        );
      }
    });
  };

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
            <Button variant="success" onClick={handlecreateUpdateShow}>
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
                        onClick={() => handlecreateUpdateShow(item)}
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
                        onClick={() => handleDeleteBus(item.id)}
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
