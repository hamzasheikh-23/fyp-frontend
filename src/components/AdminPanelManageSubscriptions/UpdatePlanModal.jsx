import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./AdminPanelManageSubscriptions.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { baseURL } from "../../baseURL";
import axios from "axios";

const UpdatePlanModal = (props) => {
  console.log("modal data", props);
  const [planName, setPlanName] = useState(props.data.PlanName);
  const [planNameErr, setPlanNameErr] = useState("");

  const [amount, setAmount] = useState(props.data.Amount);
  const [amountErr, setAmountErr] = useState("");

  const [description, setDescription] = useState(props.data.Description);
  const [descriptionErr, setDescriptionErr] = useState("");

  const validation = () => {
    let planNameErr = "";
    let amountErr = "";
    let descriptionErr = "";
    setPlanNameErr("");
    setAmountErr("");
    setDescriptionErr("");
    const validTitle = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const validDesc = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces

    if (!planName) {
        planNameErr = "required";
      } else if (!validTitle.test(planName)) {
        planNameErr =
          "Only alphabets, No special characters and boundary spaces allowed";
      } else if (
        planName.length < 4 ||
        planName.length > 30
      ) {
        planNameErr = "Name must be between 4 to 30 characters";
      }

      if (!amount) {
        amountErr = "required";
      } else if (amount < 1 || amount > 5000) {
        amountErr = "amount must be in range 1 to 5000";
      }

    if (!description) {
        descriptionErr = "required";
      } else if (!validDesc.test(description)) {
        descriptionErr = "No boundary spaces allowed";
      }

    

    if (descriptionErr || amountErr || planNameErr) {
      setPlanNameErr(planNameErr);
      setAmountErr(amountErr);
      setDescriptionErr(descriptionErr);
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    console.log("isValid: ", isValid);
    if (isValid) {
      const response = {
        PlanName: planName,
        Amount: amount,
        Description: description,
      };
      console.log("data of response", response);
      axios
        .put(`${baseURL}/subscription/edit/${props.data.PlanId} `, response)
        .then((res) => {
          console.log("success", res);
          props.update();
          props.onHide();
        })
        .catch((err) => console.log("error", err));
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Plan ID: {props.data.PlanId}
          </Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            {/* <div className="header-donation-requests-modal">
              <div className="headerTextLeft-donation-requests-modal">
                <label
                  className="infoLabels-donation-requests-modal"
                  style={{ width: "auto" }}
                >
                  Plan ID: {props.data.PlanId}
                </label>
              </div>
              <FontAwesomeIcon
                className="action-icons-donation-requests"
                icon={faCircleXmark}
                onClick={props.onHide}
              />
            </div> */}
            <div >
              <div className="form-group">
                <label htmlFor="address" className="my-donation-label mb-2">
                  Plan Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {planNameErr}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address" className="my-donation-label mb-2">
                  Plan Amount:
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {amountErr}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address" className="my-donation-label mb-2">
                  Plan Description:
                </label>
                <textarea
                  className="form-control"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {descriptionErr}
                </div>
              </div>
              <div
                className="contentTile-donation-requests-modal"
                style={{ justifyContent: "flex-end", marginTop: "16px" }}
              >
                <Button onClick={onSubmit} btn="btn btn-primary">Update</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePlanModal;
