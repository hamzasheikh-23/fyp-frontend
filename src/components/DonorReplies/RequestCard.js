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
            Case Title here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
            <table className="table">
              <tbody>
              <tr>
                <td>Date & Time of Reply:</td>
                <td>{'March 3, 2022 12:00:00'}</td>

                {/* <td>{moment(data.posted).format('LL hh:mm:ss')}</td> */}
              </tr>
              <tr>
                <td>Case ID:</td>
                <td>{2}</td>
              </tr>
              <tr>
                <td>Donation ID:</td>
                <td>{5}</td>
              </tr>
              {/* <tr>
                <td>Address:</td>
                <td>{this.state.selectedItem.donationAddress}</td>
              </tr> */}
              {/* <tr><td></td><td></td></tr>
              <tr>
                <td colSpan={2}>ORDER BILL</td>
              </tr> */}
              <tr>
                <td>Service Charges:</td>
                <td>{'300 PKR'}</td>
              </tr>
              <tr>
                <td>Delivery Charges:</td>
                <td>{'150 PKR'}</td>
              </tr>
              <tr>
                <td>VAT:</td>
                <td>{'2.66 PKR'}</td>
              </tr>
              
              
              </tbody>
         
            </table>
            {/* <div  className="container"> 
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                {this.props.itemImages[0]===null? null : <img src={require(`../../serverImages/${this.props.itemImages[0]}`)} height="200px" width="100%" style={{objectFit:'contain', marginBottom:'5px'}} />}
              </div>
              
              {this.props.itemImages[1]===null? null : <div className="col-lg-4 col-md-6 col-sm-12">
                <img src={require(`../../serverImages/${this.props.itemImages[1]}`)} height="200px" width="100%" style={{objectFit:'contain', marginBottom:'5px'}} />
                </div>}
            
              
              {this.props.itemImages[2]===null? null : <div className="col-lg-4 col-md-6 col-sm-12">
                <img src={require(`../../serverImages/${this.props.itemImages[2]}`)} height="200px" width="100%" style={{objectFit:'contain', marginBottom:'5px'}} />
                </div>}
            
            </div>
            </div> */}
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
