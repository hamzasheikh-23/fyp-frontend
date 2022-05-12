import React from "react";
import DonationDetailsModal from "./DonationDetailsModal";
// import { Badge } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";

class Card extends React.Component {
  state = {
    addDetailModalShow: false,
    acceptModal: false,
    address: "",
    addressErr: "",
    msg: "",
  };
  acceptModalClose = () => {
    this.setState({ acceptModal: false });
  };
  changeHandler = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    // console.log(event.target.value);
  };
  validation = () => {
    let msgErr = "";
    let addressErr = "";

    console.log("validation", this.state);

    const validText = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces

    if (!this.state.address) {
      addressErr = "required";
    } else if (!validText.test(this.state.address)) {
      addressErr = "remove extra and unnecessary spaces";
    }

    if (
      // msgErr ||
      addressErr
    ) {
      this.setState({
        // msgErr,
        addressErr,
      });
      return false;
    }

    return true;
  };
  acceptItem = () => {
    this.setState({ acceptModal: true });
    // axios
    //   .put(
    //     `https://charitableapis.azurewebsites.net/donation/delete/${this.props.donationId}`
    //   )
    //   .then((res) => {
    //       this.props.getData();
    //   });
  };
  render() {
    // console.log("card", this.props);
    let addDetailModalClose = () =>
      this.setState({ addDetailModalShow: false });

    let images = [
      this.props.image1Name,
      this.props.image2Name,
      this.props.image3Name,
    ];

    return (
      <div style={{ margin: "0 10px" }}>
        <div
          style={{
            height: "calc(100% - 20px)",
            // backgroundColor: !this.props.isActive && "#F8F8F8",
            boxShadow: "10px 10px 6px -6px rgba(0,0,0,0.07)",
          }}
          class="card"
        >
          {this.props.image1Name ? (
            <img
              src={
                "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
              }
              //    src={require(`../../serverImages/${this.props.image1Name}`)}
              alt=".."
              className="card-image"
            />
          ) : (
            <img
              src={
                "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
              }
              alt=".."
              className="card-image"
            />
          )}
          <div
            style={{ display: "flex", flexDirection: "column" }}
            class="card-body"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // flexWrap: "wrap",
              }}
            >
              <h5
                style={{
                  display: "inline",
                  marginBottom: "16px",
                  color: "rgb(74, 137, 220)",
                }}
                class="card-title"
              >
                {this.props.title}
              </h5>
              <div style={{ whiteSpace: "nowrap" }}>
                <FaCheck
                  onClick={this.acceptItem}
                  style={{
                    fill: "green",
                    margin: "0 10px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {/* <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Status</span> &nbsp;
                {this.props.status}
              </p> */}
              <p class="card-text">
                <span style={{ fontWeight: "bold" }}>Posted Date</span> &nbsp;{" "}
                {this.props.postedDate}
              </p>
            </div>

            <button
              style={{
                backgroundColor: "#4A89DC",
                border: "none",
                // width: 170px,
                color: "white",
                padding: "7px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                fontSize: "12px",
                margin: "10px auto",
                borderRadius: "65px",
              }}
              href="#"
              onClick={() => this.setState({ addDetailModalShow: true })}
              class="btn btn-primary view-detail"
            >
              View Details
            </button>
          </div>
        </div>
        <DonationDetailsModal
          itemImages={images}
          data={this.props}
          show={this.state.addDetailModalShow}
          onHide={addDetailModalClose}
        />
        {this.state.acceptModal && (
          <Modal
            show={this.state.acceptModal}
            onHide={this.acceptModalClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.props.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <form action="/" noValidate>
                  <div className="form-group">
                    <label htmlFor="address" className="my-donation-label mb-2">
                      Pickup/Dropoff Address
                    </label>
                    <input
                      name="address"
                      value={this.state.address}
                      onChange={(event) => this.changeHandler(event, "address")}
                      type="text"
                      id="address"
                      placeholder="Address here..."
                      className="form-control"
                    />
                    <div
                      style={{
                        fontSize: "12.8px",
                        color: "#DC3545",
                        marginLeft: "10px",
                      }}
                    >
                      {this.state.addressErr}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="mb-2" htmlFor="requestResponse">
                      Response Message (optional)
                    </label>
                    <textarea
                      name="requestResponse"
                      rows="8"
                      // cols="50"
                      value={this.state.msg}
                      onChange={(event) => this.changeHandler(event, "msg")}
                      id="requestResponse"
                      placeholder="Send a message to NGO"
                      className="form-control"
                    ></textarea>
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="#4A89DC" onClick={() => this.acceptModalClose()}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  // this.addModalClose(true)
                  // this.props.history.push('/paymentInfo',{data:{caseId: this.props.CaseId, replyId: this.props.ReplyId, address: this.props.Address, amount: parseFloat(this.state.serviceAmount + this.state.deliveryAmount + this.state.vat)}})
                }}
              >
                Proceed To Pay
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

export default Card;
