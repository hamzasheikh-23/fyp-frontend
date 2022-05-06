import React from "react";
import DetailModal from "./DetailModal";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { FaTrash, FaPen } from "react-icons/fa";

class PreviousCard extends React.Component {
  state = {
    addDetailModalShow: false,
  };
  deleteItem = () => {
    axios
      .put(`https://localhost:44357/case/delete/${this.props.caseId}`)
      .then((res) => {
        if (res.data.isSuccess) {
          this.props.getData();
        }
      });
  };
  editItem = () => {
    console.log("worked");
    const {
      caseId,
      ngoID,
      caseTitle,
      quantity,
      unit,
      category ,
      postedDate,
      description,
      imageBase64,
      imageName,
      status,
      isActive,
    } = this.props;
    this.props.history.push({
      pathname: "/askdonation",
      state: {
        data: {
          caseId,
          category ,
          ngoID,
          caseTitle,
          quantity,
          unit,
          postedDate,
          description,
          imageBase64,
          imageName,
          status,
          isActive,
        },
        isEdit: true
      },
    });
  };
  render() {
    console.log("card ngo", this.props);
    let addDetailModalClose = () =>
      this.setState({ addDetailModalShow: false });

    return (
      <div style={{ margin: "0 10px" }}>
        <div
          style={{
            height: "calc(100% - 20px)",
            backgroundColor: !this.props.isActive ? "#F8F8F8" : "white",
            boxShadow: "10px 10px 6px -6px rgba(0,0,0,0.07)",
          }}
          class="card"
        >
          {this.props.imageName ? (
            <img
              src={require(`../../serverImages/${this.props.imageName}`)}
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
                {this.props.caseTitle}{" "}
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
          </div>
          <DetailModal
            data={this.props}
            show={this.state.addDetailModalShow}
            onHide={addDetailModalClose}
          />
        </div>
      </div>
    );
  }
}

export default PreviousCard;
