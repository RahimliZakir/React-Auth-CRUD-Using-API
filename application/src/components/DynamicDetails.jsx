import React from "react";
import { Modal, Button } from "react-bootstrap";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatDate } from "../utils/date";

const DynamicDetails = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Company: {data?.company}</Modal.Title>
          <Modal.Body className="p-0">
            <p>
              Model: <strong>{data?.model}</strong>
            </p>
            <p>
              Created Date: <strong>{formatDate(data?.createdDate)}</strong>
            </p>
          </Modal.Body>
        </div>
      </Modal.Header>
      <Modal.Body>
        {data?.selectedImage == null ? (
          <div className="img-div">
            <img src={data?.imagePath} alt="Details Img" />
          </div>
        ) : (
          <Swiper spaceBetween={50} slidesPerView={1} loop={true}>
            {data?.carImages?.map((item) => {
              return (
                <SwiperSlide key={item?.id}>
                  <img src={item?.imagePath} alt="Details Img" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DynamicDetails;
