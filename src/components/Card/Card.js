import React from "react";
import DonationDetailsModal from "../Modal/DonationDetailsModal";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";

class Card extends React.Component {
  state = {
    addDetailModalShow: false,
  };
  deleteItem = () => {
    axios
      .delete(
        `https://localhost:44357/donation/delete/${this.props.donationId}`
      )
      .then((res) => {
        if (res.data.isSuccess) {
          this.props.getData();
        }
      });
  };
  editItem = () => {
    console.log("worked");
    const {
      title,
      quantity,
      quantityPerUnit,
      date,
      weight,
      description,
      category,
      donationId,
      rating,
      condition,
      itemImg1,
      itemImg2,
      itemImg3,
      image1Name,
      image2Name,
      image3Name,
      postedDate,
      status,
      isActive,
    } = this.props;
    this.props.history.push({
      pathname: "/donationForm",
      state: {
        data: {
          title,
          quantity,
          quantityPerUnit,
          date,
          weight,
          description,
          category,
          donationId,
          rating,
          condition,
          itemImg1,
          itemImg2,
          itemImg3,
          image1Name,
          image2Name,
          image3Name,
          postedDate,
          status,
          isActive,
        },
      },
    });
  };
  render() {
    // console.log("card", this.props);
    let addDetailModalClose = () =>
      this.setState({ addDetailModalShow: false });
    let badgeClass = "primary";
    if (this.props.status === "reject") {
      badgeClass = "danger";
    }
    if (this.props.status === "approve") {
      badgeClass = "success";
    }
    if (this.props.status === "pending") {
      badgeClass = "warning";
    }
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
            backgroundColor: !this.props.isActive && "#F8F8F8",
            boxShadow: "10px 10px 6px -6px rgba(0,0,0,0.07)",
          }}
          class="card"
        >
          {this.props.itemImg1 && (
            <img src={this.props.itemImg1} alt=".." className="card-image" />
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
                {this.props.title}{" "}
                {!this.props.isActive && (
                  <span style={{ fontSize: "small" }}>(Not Active)</span>
                )}{" "}
              </h5>
              <div style={{ whiteSpace: "nowrap" }}>
                <FaTrash
                  onClick={this.deleteItem}
                  style={{
                    fill: "red",
                    margin: "0 10px",
                    cursor: "pointer",
                  }}
                />
                <FaPen
                  onClick={this.editItem}
                  style={{
                    fill: "green",
                    margin: "0 10px",
                    cursor: "pointer",
                  }}
                />
              </div>
              {/* <Badge  style={{marginBottom:'10px'}} bg={badgeClass}>{this.props.status}</Badge>  */}
            </div>
            <div style={{ flex: 1 }}>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Status</span> &nbsp;
                {this.props.status}
              </p>
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
            {this.props.status === "Pending" ? (
              <button
                style={{ marginLeft: "10px" }}
                href="#"
                onClick={() => {
                  this.props.delete(this.props.itemId);
                }}
                class="btn btn-danger view-detail"
              >
                Delete
              </button>
            ) : null}
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
