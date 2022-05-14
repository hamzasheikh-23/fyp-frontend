import React from "react";
import { Label } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { checkProperty } from "../../assets/utils";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import { baseURL } from "../../baseURL";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class RequestCard extends React.Component {
  rejectReply = () => {
    axios
      .put(
        `${baseURL}/response/edit?id=${this.props.ResponseId}&status=Rejected`
      )
      .then((res) => {
        this.props.fetchData();
      })
      .catch(console.log);
  };
  acceptReply = () => {
    axios
      .put(
        `${baseURL}/response/edit?id=${this.props.ResponseId}&status=Approved`
      )
      .then((res) => {
        this.props.fetchData();
      })
      .catch(console.log);
  };

  render() {
    console.log("single item", this.props);

    return (
      <div>
        <div class="card-body ngo-request-card-body">
          <h5 class="card-title ngo-request-card-title">
            {this.props.DonationTitle}
          </h5>
          <h6 class="card-subtitle mb-4 text-muted ngo-request-card-subtitle">
            Responder's Name: {this.props.NgoName}
          </h6>
          <p class="card-text ngo-request-card-text ">{this.props.Message}</p>
          {/* <p class="card-text ngo-request-card-text mb-5"><span style={{fontWeight:'bold'}}>Donation Quantity:</span> &nbsp; {`${checkProperty('Quantity',this.props, 1)} ${checkProperty('Unit',this.props,'unit')}`}</p> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <h6 className="text-muted ">
              {moment(this.props.PostedDate).format("LL hh:mm:ss")}
            </h6>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => this.acceptReply()}
                // class="btn .ngo-request-card-btn"
                style={{
                  backgroundColor: "#6fbf73",
                  border: "none",
                  color: "white",
                  padding: "7px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                  borderRadius: "65px",
                  marginRight: 10,
                }}
              >
                Accept
              </button>
              <button
                onClick={() => this.rejectReply()}
                style={{
                  backgroundColor: "#ff1744",
                  border: "none",
                  color: "white",
                  padding: "7px 20px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "block",
                  borderRadius: "65px",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RequestCard;
