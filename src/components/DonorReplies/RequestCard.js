import React from "react";
import { Label } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import {checkProperty}  from '../../assets/utils';
import { toast } from "react-toastify";
import { remove } from "lodash";


class RequestCard extends React.Component {
  state = {
    addModalShow: false,
  };
  rejectReply=()=>{
    console.log('id of remove')
  }
  addModalClose = (showMsg) =>{
    this.setState({ addModalShow: false });
    if(showMsg){
      toast.success("Thank you for your order wait till it gets approve by admin", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } 
  render() {
    console.log('single item', this.props)
    
    return (
      <div>
        <div class="card-body ngo-request-card-body">
          {/* <img
            width="200px"
            height="200px"
            style={{ marginBottom: "10px", objectFit: "cover" }}
            src={this.props.image}
            alt="..."
          /> */}
          <h5 class="card-title ngo-request-card-title">Abc title</h5>
          <h6 class="card-subtitle mb-4 text-muted ngo-request-card-subtitle">
            Donor Name: {'abc donor'}
          </h6>
          <p class="card-text ngo-request-card-text ">{'msg here'}</p>
          <p class="card-text ngo-request-card-text mb-5"><span style={{fontWeight:'bold'}}>Donation Quantity:</span> &nbsp; {`${checkProperty('quantity',this.props, 1)} ${checkProperty('unit',this.props,'unit')}`}</p>
          <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', alignItems:'center'}} >
          <h6 className="text-muted ">
            {'date here'}
          </h6>
          <div style={{display:'flex',}}>
            <button
              onClick={() => this.setState({ addModalShow: true })}
              class="btn btn-primary .ngo-request-card-btn"
              style={{
                backgroundColor: "#6fbf73",
                border: "none",
                // width: 170px,
                color: "white",
                padding: "7px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                // fontSize: "12px",
                // margin: "10px auto",
                borderRadius: "65px",
                marginRight:10
              }}
            >
              Accept
            </button>
            <button
              onClick={() => this.rejectReply()}
              class="btn btn-primary .ngo-request-card-btn"
              style={{
                backgroundColor: "#ff1744",
                border: "none",
                // width: 170px,
                color: "white",
                padding: "7px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                // fontSize: "12px",
                // margin: "10px auto",
                borderRadius: "65px",
              }}
            >
              Reject
            </button>
            </div>
          </div>
        </div>
        {this.state.addModalShow &&
        <Modal
        show={this.state.addModalShow}
        onHide={this.addModalClose}
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
          check
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="#4A89DC" onClick={()=>this.addModalClose()}>Close</Button>
          <Button variant="success" onClick={()=>this.addModalClose(true)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>}
      </div>
    );
  }
}
export default RequestCard;
