import React from "react";
import DonationDetailsModal from "./DonationDetailsModal";
// import { Badge } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";

class Card extends React.Component {
  state = {
    addDetailModalShow: false,
  };
 
  
  render() {
    // console.log("card", this.props);
    let addDetailModalClose = () =>
      this.setState({ addDetailModalShow: false });

    let images = [
      this.props.itemImg1,
      this.props.itemImg2,
      this.props.itemImg3,
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
          {this.props.itemImg1 ? (
            <img
                 src={`data:image/*;base64,${this.props.itemImg1}`}
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
<div style={{display:'flex', flexWrap:'wrap'}}>
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
              onClick={() => this.props.history.push('/paymentInfo',{data:{donationId: this.props.donationId, address: this.props.dropof, amount: this.props.totalAmount, responseId: this.props.responseId}})}
              class="btn btn-primary view-detail"
            >
              Make Order
            </button>
            </div>
          </div>
        </div>
        <DonationDetailsModal
          itemImages={images}
          data={this.props}
          show={this.state.addDetailModalShow}
          onHide={addDetailModalClose}
        />
      </div>
    );
  }
}

export default Card;
