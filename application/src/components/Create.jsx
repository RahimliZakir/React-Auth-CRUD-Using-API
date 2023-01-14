import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { createTruck } from "../store/trucks";
import "../libs/css/image-input.css";
import "../libs/js/image-input.js";

const Create = ({ show, handleClose }) => {
  const [data, setData] = useState({
    company: "",
    model: "",
    file: null,
  });

  const handleInputChange = (name, e) => {
    if (name === "file") setData({ ...data, [name]: e.target.files[0] });
    else setData({ ...data, [name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch(createTruck(formData));

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Create</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            name="company"
            onChange={(e) => handleInputChange("company", e)}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Model"
            name="model"
            onChange={(e) => handleInputChange("model", e)}
          />
          <div>
            <label className="control-label">Şəkil</label>
            <label className="image-input" htmlFor="File">
              <input type="hidden" name="FileTemp" value="" />
              <span>&times;</span>
            </label>
            <input
              name="file"
              id="File"
              type="file"
              onChange={(e) => handleInputChange("file", e)}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
          <Button type="submit" variant="success">
            Add
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Create;
