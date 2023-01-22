import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createTruck } from "../store/trucks";
import { createBus } from "../store/buses";
import { useImportScript } from "../hooks/importScript";

const Create = ({ show, handleClose, componentName }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useImportScript("./libs/js/image-input.js", show);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   if (show) {
  //     const script = document.createElement("script");
  //     script.src = "./libs/js/image-input.js";
  //     script.type = "text/javascript";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   } else {
  //     if (script !== undefined) {
  //       console.log(document.body.children.tagName);
  //     }
  //   }
  // }, [show]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (typeof data[key] === "object") {
        if (data[key][0] === undefined) formData.append(key, null);
        else formData.append(key, data[key][0]);
      } else formData.append(key, data[key]);
    }

    switch (componentName) {
      case "truck":
        dispatch(createTruck(formData));
        break;
      case "bus":
        dispatch(createBus(formData));
        break;
      default:
        break;
    }

    handleClose();
    reset();
  };

  return (
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
    </Modal>
  );
};

export default Create;
