import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

class DonationDetailsModal extends Component{
    componentDidMount(){
        axios.get(`/api/getDonatedItem/${this.props.item}`)
        .then(res=>{
        this.setState({selectedItem:{...res.data}})
        console.log('chal gaya', this.state)
        }).catch(err=>console.log(err)); 
        
    }
    constructor(props){
        super(props);
        this.state={
          selectedItem: {}
        }
    }

    render(){
      console.log('images',this.props.itemImages)
        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
     
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Category : {this.state.selectedItem.category}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
            <table className="table">
              <tbody>
              <tr>
                <td>Date & Time of Donation:</td>
                <td>{this.state.selectedItem.created_at}</td>
              </tr>
              <tr>
                <td>Condition:</td>
                <td>{this.state.selectedItem.condition}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{this.state.selectedItem.donationAddress}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{this.state.selectedItem.description}</td>
              </tr>
              <tr>
                <td>Rating:</td>
                <td>{this.state.selectedItem.rating}</td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{this.state.selectedItem.status}</td>
              </tr>
              </tbody>
         
            </table>
            <div  className="container"> 
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                {this.props.itemImages[0]===null? null : <img src={this.props.itemImages[0]} height="200px" width="100%" style={{objectFit:'cover', marginBottom:'5px'}} />}
              </div>
              
              {this.props.itemImages[1]===null? null : <div className="col-lg-4 col-md-6 col-sm-12">
                <img src={this.props.itemImages[1]} height="200px" width="100%" style={{objectFit:'cover', marginBottom:'5px'}} />
                </div>}
            
              
              {this.props.itemImages[2]===null? null : <div className="col-lg-4 col-md-6 col-sm-12">
                <img src={this.props.itemImages[2]} height="200px" width="100%" style={{objectFit:'cover', marginBottom:'5px'}} />
                </div>}
            
            </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        {/* <Button variant="primary">Submit</Button> */}
      </Modal.Footer>
    </Modal>
        );
    }
}
export default DonationDetailsModal;