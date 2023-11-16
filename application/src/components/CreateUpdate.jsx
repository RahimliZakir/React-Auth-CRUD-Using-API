import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { createTruck } from "../store/trucks";
import { createBus, updateBus } from "../store/buses";

import ImageInput from "./core/ImageInput";

const CreateUpdate = ({ show, handleClose, componentName, item, setItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Object.keys(item).length > 0) {
      reset({ ...item, fileTemp: item?.imagePath });
    }
  }, [reset, item]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (typeof data[key] === "object") {
        if (data[key][0] === undefined) formData.append(key, null);
        else formData.append(key, data[key][0]);
      } else formData.append(key, data[key]);
    }

    console.log(data)

    // switch (componentName) {
    //   case "truck":
    //     dispatch(createTruck(formData));
    //     break;
    //   case "bus":
    //     data !== undefined
    //       ? dispatch(updateBus(formData))
    //       : dispatch(createBus(formData));
    //     break;
    //   default:
    //     break;
    // }

    customReset();
    handleClose();
  };

  const closeModal = () => {
    customReset();
    handleClose();
  };

  const customReset = () => {
    setItem({});

    reset({
      model: "",
      company: "",
      file: "",
      fileTemp: "",
    });
  };

  console.log(item)

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title>
            {Object.keys(item).length > 0 ? "Update" : "Create"}
          </Modal.Title>
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
              {...register("model", { required: true })}
            />
            <small className="text-danger">
              {errors.model?.type === "required" && (
                <p role="alert">Bu xana doldurulmalıdır!</p>
              )}
            </small>
          </div>
          <ImageInput registerFunction={register} item={item} />
          <Button type="submit" variant="success">
            Save
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUpdate;
