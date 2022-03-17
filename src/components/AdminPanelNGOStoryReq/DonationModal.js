import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

class DonationModal extends Component{
    componentDidMount(){
        axios.get(`/api/getUserDetails/${this.props.ngoId}`)
        .then(res=>{
        this.setState({selectedNgo:{...res.data}})
        console.log(this.state)
  
        }).catch(err=>console.log(err)); 
        
    }
    constructor(props){
        super(props);
        this.state={
          selectedNgo: {}
        }
    }
    rejectDonation=()=>{
      const reject={
        status:'Rejected'
      }
       axios.put(`/api/putStory/${this.props.sid}`,reject)
       .then(res=>{
         this.props.onHide();
       
       })
       .catch(err=>console.log(err))
     }
     acceptDonation=()=>{
       const accept={
         status: 'Approved'
       }
       axios.put(`/api/putStory/${this.props.sid}`,accept)
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
      {this.state.selectedNgo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="container">
            <table className="table">
              <tbody>
              <tr>
                <td>Description:</td>
                <td>{this.props.des}</td>
              </tr>
              
              <tr>
                <td>Date</td>
                <td>{this.props.date}</td>
              </tr>

              {/* <tr>
                <td>What We Do?</td>
                <td>{this.state.selectedNgo.description}</td>
              </tr> */}
              
              </tbody>
         
            </table>
            <div  className="container"> 
           
              
                <img src={this.props.image} height="250px" width="80%" style={{objectFit:'contain', marginBottom:'5px'}} />
                
            
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