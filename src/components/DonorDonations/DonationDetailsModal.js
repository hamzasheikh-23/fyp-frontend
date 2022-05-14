import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { checkProperty } from "../../assets/utils";

class DonationDetailsModal extends Component {
  // componentDidMount(){
  //     axios.get(`/api/getDonatedItem/${this.props.item}`)
  //     .then(res=>{
  //     this.setState({selectedItem:{...res.data}})
  //     console.log('chal gaya', this.state)
  //     }).catch(err=>console.log(err));

  // }
  // constructor(props){
  //     super(props);
  //     this.state={
  //       selectedItem: {}
  //     }
  // }

  render() {
    console.log("detail", this.props);
    const { data } = this.props;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "rgb(74, 137, 220)" }}
          >
            Title: {data.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <table className="table">
              <tbody>
                <tr>
                  <td>Date & Time of Donation:</td>
                  <td>{moment(data.posted).format("LL hh:mm:ss")}</td>
                </tr>
                <tr>
                  <td>Donor Name:</td>
                  <td>{data.donorName}</td>
                </tr>
                <tr>
                  <td>Condition:</td>
                  <td>{data.condition}</td>
                </tr>
                <tr>
                  <td>Category:</td>
                  <td>{data.category}</td>
                </tr>
                {/* <tr>
                <td>Address:</td>
                <td>{this.state.selectedItem.donationAddress}</td>
              </tr> */}
                <tr>
                  <td>Quantity:</td>
                  <td>{data.quantity}</td>
                </tr>
                <tr>
                  <td>Quantity Per Unit:</td>
                  <td>{data.quantityPerUnit}</td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>{data.weight}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{data.description}</td>
                </tr>
                <tr>
                  <td>Rating:</td>
                  <td>{data.rating}</td>
                </tr>
                {data.date && (
                  <tr>
                    <td>Expiration Date:</td>
                    <td>{moment(data.date).format("LL hh:mm:ss")}</td>
                  </tr>
                )}
                <tr>
                  <td>Status:</td>
                  <td>{data.status}</td>
                </tr>
                <tr>
                  <td>Pickup Address:</td>
                  <td>{checkProperty("address", data)}</td>
                </tr>
              </tbody>
            </table>
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  {this.props.itemImages[0] === null ? null : (
                    <img
                      // onClick={() =>
                      //   window.open(
                      //     require(`../../serverImages/${this.props.itemImages[0]}`),
                      //     "_blank"
                      //   )
                      // }
                      src={
                        `data:image/*;base64,${this.props.itemImages[0]}`
                      }
                      // src={require(`../../serverImages/${this.props.itemImages[0]}`)}
                      height="200px"
                      width="100%"
                      style={{ objectFit: "contain", marginBottom: "5px" }}
                    />
                  )}
                </div>

                {this.props.itemImages[1] === null ? null : (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <img
                      // onClick={() =>
                      //   window.open(
                      //     require(`../../serverImages/${this.props.itemImages[1]}`),
                      //     "_blank"
                      //   )
                      // }
                      src={
                        `data:image/*;base64,${this.props.itemImages[1]}`
                      }
                      // src={require(`../../serverImages/${this.props.itemImages[1]}`)}
                      height="200px"
                      width="100%"
                      style={{ objectFit: "contain", marginBottom: "5px" }}
                    />
                  </div>
                )}

                {this.props.itemImages[2] === null ? null : (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <img
                      // onClick={() =>
                      //   window.open(
                      //     require(`../../serverImages/${this.props.itemImages[2]}`),
                      //     "_blank"
                      //   )
                      // }
                      src={
                        `data:image/*;base64,${this.props.itemImages[2]}`
                      }
                      // src={require(`../../serverImages/${this.props.itemImages[2]}`)}
                      height="200px"
                      width="100%"
                      style={{ objectFit: "contain", marginBottom: "5px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "rgb(74, 137, 220)" }}
            onClick={this.props.onHide}
          >
            Close
          </Button>
          {/* <Button variant="primary">Submit</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DonationDetailsModal;
