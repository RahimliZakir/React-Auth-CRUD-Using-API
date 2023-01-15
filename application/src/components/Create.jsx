import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { useScript } from "../hooks/useScript";
import { createTruck } from "../store/trucks";

const Create = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (typeof data[key] === "object") {
        if (data[key][0] === undefined) formData.append(key, null);
        else formData.append(key, data[key][0]);
      } else formData.append(key, data[key]);
    }
    dispatch(createTruck(formData));
    handleClose();
    reset();
  };

  return (
    <HelmetProvider>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>Create</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                {...register("company", { required: true })}
              />
              <small className="text-danger">
                {errors.company?.type === "required" && (
                  <p role="alert">Bu xana doldurulmalıdır!</p>
                )}
              </small>
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                placeholder="Model"
                name="model"
                {...register("model", { required: true })}
              />
              <small className="text-danger">
                {errors.model?.type === "required" && (
                  <p role="alert">Bu xana doldurulmalıdır!</p>
                )}
              </small>
            </div>
            <div>
              <label className="control-label">Şəkil</label>
              <label className="image-input" htmlFor="File">
                <input type="hidden" name="FileTemp" value="" />
                <span>&times;</span>
              </label>
              <input
                {...register("file")}
                id="File"
                type="file"
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
        <Helmet>
          <script src="./libs/js/image-input.js" type="text/javascript" />
        </Helmet>
      </Modal>
    </HelmetProvider>
  );
};

export default Create;
