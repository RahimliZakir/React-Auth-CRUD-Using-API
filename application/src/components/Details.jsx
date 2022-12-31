import React from "react";
import { Modal, Button } from "react-bootstrap";

import { formatDate } from "../utils/date";

const Details = ({ show, handleClose, data }) => {
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
        <div className="img-div">
          <img
            style={{ width: "100%" }}
            src={data?.imagePath}
            alt="Details Img"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Details;
