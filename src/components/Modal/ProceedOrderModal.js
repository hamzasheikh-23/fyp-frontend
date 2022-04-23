import React, { Component } from "react";
import { Label } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "./ProceedOrderModal.css";

class ProceedOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      msgErr: "",
      remainingRequiredQuantity:0,
      donationQuantity:0,
      donationQuantityErr: "",
      address:"",
      addressErr:"",

    };
  }
  ResponseFormSubmitHandler = () => {
    const response = {
      responseMessage: this.state.msg,
      requestedItem_id: this.props.reqId,
      donor_id: localStorage.getItem("userID"),
    };
    console.log("data of response", response);
    axios
      .post("/api/storeResponse", response)
      .then((res) => {
        console.log("success", res);
        this.props.onHide();
      })
      .catch((err) => console.log("error", err));
  };
  responseMsgHandler = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    // console.log(event.target.value);
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Proceed Donation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form action="/" noValidate>
              <div className="row mb-2">
              <div className="col-lg-6 col-md-12">
                <label htmlFor="item-quantity" className="my-donation-label mb-2">
                  Add quantity you want to donate
                </label>
                <input
                  name="item-quantity"
                  value={this.state.donationQuantity}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "donationQuantity")
                  }
                  type="number"
                  id="item-quantity"
                  placeholder="Quantity"
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationQuantityErr}
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <label htmlFor="remaining-quantity" className="my-donation-label mb-2">
                  Remaining quantity required for the case
                </label>
                <input
                  name="remaining-quantity"
                  value={this.state.remainingRequiredQuantity}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "remainingRequiredQuantity")
                  }
                  style={{color: this.state.remainingRequiredQuantityErr ? 'red' : '#212529'}}
                  type="number"
                  id="remaining-quantity"
                  placeholder="Remaining quantity"
                  className="form-control"
                  disabled={true}
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.remainingRequiredQuantityErr}
                </div>
              </div>
              </div>
              <div className="form-group">
                <label htmlFor="item-quantity" className="my-donation-label mb-2">
                  Add quantity you want to donate
                </label>
                <input
                  name="item-quantity"
                  value={this.state.donationQuantity}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "donationQuantity")
                  }
                  type="number"
                  id="item-quantity"
                  placeholder="Quantity"
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationQuantityErr}
                </div>
              </div>
              <div className="form-group">
                <label className="mb-2" htmlFor="requestResponse">
                  Response Message (optional)
                </label>
                <textarea
                  name="requestResponse"
                  rows="10"
                  // cols="50"
                  value={this.state.msg}
                  onChange={(event) => this.responseMsgHandler(event, "msg")}
                  id="requestResponse"
                  placeholder="Send a message to NGO"
                  className="form-control"
                ></textarea>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
          <Button variant="success" onClick={this.ResponseFormSubmitHandler}>
            Submit
          </Button>
          {/* <Button variant="primary">Submit</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ProceedOrderModal;
