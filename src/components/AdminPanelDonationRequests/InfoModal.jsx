import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./AdminPanelDonationRequests.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const InfoModal = (props) => {
  // const node = useRef()

  // useEffect(() => {
  //     const handleClickOutside = event => {
  //         if (node.current && !node.current.contains(event.target)) {
  //             props.closeModal()
  //         }
  //     }

  //     document.addEventListener("mousedown", handleClickOutside)
  //     return () => {
  //         document.removeEventListener("mousedown", handleClickOutside)
  //     }
  // }, [node, props])

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Title: {props.data.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <table className="table">
                  <tbody>
                    <tr>
                      <td>Date:</td>
                      <td>
                        {moment(props.data.PostedDate).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                    <tr>
                      <td>Time: </td>
                      <td>{moment(props.data.PostedDate).format("HH:MM A")}</td>
                    </tr>
                    <tr>
                      <td>Condition: </td>
                      <td>{props.data.Condition}</td>
                    </tr>
                    <tr>
                      <td>Category: </td>
                      <td>{props.data.Category}</td>
                    </tr>
                    <tr>
                      <td>Quantity:</td>
                      <td>{props.data.Quantity}</td>
                    </tr>
                    <tr>
                      <td>Quantity Per Unit:</td>
                      <td>{props.data.QuantityPerUnit}</td>
                    </tr>
                    <tr>
                      <td>Weight: </td>
                      <td>{props.data.Weight}</td>
                    </tr>
                    <tr>
                      <td>Description: </td>
                      <td>{props.data.Description}</td>
                    </tr>
                    <tr>
                      <td>Rating: </td>
                      <td>{props.data.Rating}</td>
                    </tr>
                    <tr>
                      <td>Status: </td>
                      <td>{props.data.Status}</td>
                    </tr>
                    <tr>
                      <td>Expiry Date:</td>
                      <td>
                        {moment(props.data.ExpiryDate).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                    <tr>
                      <td>Pickup Address:</td>
                      <td>{props.data.Address}</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {props.data.Image1 && (
                    <div
                      style={{
                        border: "1px solid #4A89DC",
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      <img
                        alt={"..."}
                        
                        src={`data:image/*;base64,${props.data.Image1}`}
                        height="80px"
                        width="80px"
                        style={{ objectFit: "contain", marginBottom: "5px" }}
                      />
                    </div>
                  )}
                  {props.data.Image2 && (
                    <div
                      style={{
                        border: "1px solid #4A89DC",
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      <img
                        alt={"..."}
                       
                        src={`data:image/*;base64,${props.data.Image2}`}
                        height="80px"
                        width="80px"
                        style={{ objectFit: "contain", marginBottom: "5px" }}
                      />
                    </div>
                  )}
                  {props.data.Image3 && (
                    <div
                      style={{
                        border: "1px solid #4A89DC",
                        margin: 5,
                        padding: 5,
                      }}
                    >
                      <img
                        alt={"..."}
                       
                        src={`data:image/*;base64,${props.data.Image3}`}
                        height="80px"
                        width="80px"
                        style={{ objectFit: "contain", marginBottom: "5px" }}
                      />
                    </div>
                  )}
                </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InfoModal;
