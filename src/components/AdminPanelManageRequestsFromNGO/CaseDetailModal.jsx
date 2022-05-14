import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./AdminPanelManageRequestsFromNGO.css";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const CaseDetailModal = (props) => {
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
            Case Title: {props.data.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <tbody>
              <tr>
                <td>Date and Time: </td>
                <td>
                  {moment(props.data.PostedDate).format("DD-MM-YYYY HH:MM A")}
                </td>
              </tr>
              <tr>
                <td>NGO Name: </td>
                <td>{props.data.NGOName}</td>
              </tr>
              <tr>
                <td>Description: </td>
                <td>{props.data.Description}</td>
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
                <td>Unit:</td>
                <td>{props.data.Unit}</td>
              </tr>
              <tr>
                <td>Status: </td>
                <td>{props.data.Status}</td>
              </tr>
              <tr>
                <td>Active:</td>
                <td>{props.data.IsActive}</td>
              </tr>
            </tbody>
          </table>

          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {props.data.ImageName && (
              <div
                style={{
                  border: "1px solid #4A89DC",
                  margin: 5,
                  padding: 5,
                }}
              >
                <img
                  alt={"..."}
                  onClick={() =>
                    window.open(
                      require(`../../serverImages/cases/${props.data.ImageName}`),
                      "_blank"
                    )
                  }
                  src={require(`../../serverImages/cases/${props.data.ImageName}`)}
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

export default CaseDetailModal;
