import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import Create from "./Create";
import { getAllTrucks, deleteTruck } from "../store/trucks";

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

  const MySwal = withReactContent(Swal);

  const handleDeleteTruck = (id) => {
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
        dispatch(deleteTruck(id));

        return MySwal.fire(
          "Uğurlu!",
          "Seçilmiş məlumat uğurla silindi.",
          "success"
        );
      }
    });
  };

  const [createShow, setCreateShow] = useState(false);
  const handleCreateShow = (data) => {
    setCreateShow(true);
  };
  const handleCreateClose = () => setCreateShow(false);

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
          <div className="create-side">
            <Button variant="success" onClick={handleCreateShow}>
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
                        onClick={() => handleShow(item)}
                        variant="primary"
                      >
                        Details
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-1"
                        onClick={() => handleDeleteTruck(item.id)}
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
          <Create show={createShow} handleClose={handleCreateClose} />
          <DynamicDetails show={show} handleClose={handleClose} data={truck} />
        </Row>
      </Container>
    </section>
  );
};

export default Truck;
