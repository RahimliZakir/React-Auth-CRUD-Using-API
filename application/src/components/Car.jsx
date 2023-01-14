import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Col, Row, Container, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Loader from "./Loader";
import DynamicDetails from "./DynamicDetails";
import { getAllCars, deleteCar } from "../store/cars";

const Car = () => {
  const [show, setShow] = useState(false);
  const [car, setCar] = useState();

  const handleShow = (data) => {
    const filteredData = {
      ...data,
      carImages: [...data?.carImages]?.sort((a, b) =>
        a.isMain === b.isMain ? 0 : a.isMain ? -1 : 1
      ),
    };
    setCar(filteredData);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());

    // eslint-disable-next-line
  }, []);

  const MySwal = withReactContent(Swal);

  const handleDeleteCar = (id) => {
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
        dispatch(deleteCar(id));

        return MySwal.fire(
          "Uğurlu!",
          "Seçilmiş məlumat uğurla silindi.",
          "success"
        );
      }
    });
  };

  const { error, list, loading } = useSelector((state) => state.cars);

  const cars = list?.map((item) => {
    return {
      ...item,
      selectedImage: item.carImages.filter((image) => image.isMain),
    };
  });

  if (error)
    return (
      <Alert variant="danger" className="text-center">
        Something went wrong.
      </Alert>
    );

  return (
    <section id="car-section">
      <Container>
        <Row>
          <h2 className="text-center">Cars</h2>
          {loading ? (
            <Loader />
          ) : cars?.length > 0 ? (
            cars?.map((item) => {
              return (
                <Col md={4} key={item.id} className="cars-cards mt-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={item.selectedImage[0].imagePath}
                    />
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
                        onClick={() => handleDeleteCar(item.id)}
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
          <DynamicDetails show={show} handleClose={handleClose} data={car} />
        </Row>
      </Container>
    </section>
  );
};

export default Car;
