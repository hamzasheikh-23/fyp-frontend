import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

class DonationModal extends Component{
    componentDidMount(){
        axios.get(`/api/getUserDetails/${this.props.ngo}`)
        .then(res=>{
        this.setState({selectedItem:{...res.data}})
        console.log('abhi',res.data)
  
        }).catch(err=>console.log(err)); 
        
    }
    constructor(props){
        super(props);
        this.state={
          selectedItem: {}
        }
    }
    rejectDonation=()=>{
      const reject={
        status:'Rejected'
      }
       axios.put(`/api/putRequest/${this.props.item}`,reject)
       .then(res=>{
         this.props.onHide();
       
       })
       .catch(err=>console.log(err))
     }
     acceptDonation=()=>{
       const accept={
         status: 'Approved'
       }
       axios.put(`/api/putRequest/${this.props.item}`,accept)
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
                <td>Email Address:</td>
                <td> {this.state.selectedItem.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{this.state.selectedItem.phoneNumber}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{this.state.selectedItem.address}</td>
              </tr>
              
              <tr>
                <td>What We Do?:</td>
                <td>{this.state.selectedItem.description}</td>
              </tr>
              <tr>
                <td>Registration Date:</td>
                <td>{this.state.selectedItem.regDate}</td>
              </tr>
              <tr>
                <td>Registration Number:</td>
                <td>{this.state.selectedItem.regNum}</td>
              </tr>
        
              
              
              </tbody>
         
            </table>
            <div  className="container"> 

           {/* if needes just uncomment. works fine */}
            {/* {this.props.itemImages[0]===null? null :   <img src={this.props.itemImages[0]} height="200px" width="80%" style={{objectFit:'contain', marginBottom:'5px'}} />} */}
            
              
                
            
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