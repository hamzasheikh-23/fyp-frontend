import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

class DonationModal extends Component{
    componentDidMount(){
      // console.log('itemid',this.props.item)
        // axios.get(`/api/getDonatedItem/${this.props.item}`)
        // .then(res=>{
        // this.setState({selectedItem:{...res.data}})
  
        // }).catch(err=>console.log(err)); 

        
        axios.get(`/api/getUserDetails/${this.props.donor}`)
        .then(res=>{
          this.setState({selectedItem:{...res.data}})
              
        })
        .catch(err=>console.log(err))
                         
        
    }
    constructor(props){
        super(props);
        this.state={
          selectedItem: {},
         
        }
    }
    rejectDonation=()=>{
     const reject={
       status:'Rejected'
     }
      axios.put(`/api/putDonatedItem/${this.props.item}`,reject)
      .then(res=>{
        this.props.onHide();
      
      })
      .catch(err=>console.log(err))
    }
    acceptDonation=()=>{
      const accept={
        status: 'Approved'
      }
      axios.put(`/api/putDonatedItem/${this.props.item}`,accept)
      .then(res=>{
        this.props.onHide();
      
      })
      .catch(err=>console.log(err))
    }

    render(){
  
        return(
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      center
     
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {this.state.selectedItem.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container">
            <table className="table">
              <tbody>
              
              <tr>
                <td>CNIC:</td>
                <td>{this.state.selectedItem.CNIC_Number}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{this.state.selectedItem.address}</td>
              </tr>
              <tr>
                <td>Email Address:</td>
                <td>{this.state.selectedItem.email}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{this.state.selectedItem.gender}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{this.state.selectedItem.phoneNumber}</td>
              </tr>
              <tr>
                <td>Donation Picture(s):</td>
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
        <Button variant="danger" onClick={this.rejectDonation}>Reject</Button>
        <Button variant="success" onClick={this.acceptDonation}>Accept</Button>
      </Modal.Footer>
    </Modal>
        );
    }
}
export default DonationModal;