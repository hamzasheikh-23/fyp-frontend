import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { checkProperty } from "../../assets/utils";

class DetailModal extends Component {
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
    console.log('detail',this.props)
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
            Title: {data.caseTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            
          {data.imageName ? (
              <div className="col-lg-12">
              <img
                  src={data.imageName}
                  height="200px"
                  width="100%"
                  style={{ objectFit: "contain", marginBottom: "5px" }}
                />
            </div>
            ) : null}


            <table className="table">
              <tbody>
                <tr>
                  <td>Date & Time of Donation:</td>
                  <td>{moment(data.postedDate).format("LL hh:mm:ss")}</td>
                </tr>
                <tr>
                  <td>Category:</td>
                  <td>{checkProperty("categoryName", data)}</td>
                </tr>
                <tr>
                  <td>Quantity Required:</td>
                  <td>
                    {`${checkProperty("quantity", data)} ${checkProperty(
                      "unit",
                      data
                    )}`}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{checkProperty("description", data)}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td>{data.status}</td>
                </tr>
              </tbody>
            </table>
            
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
export default DetailModal;
