import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import axios from 'axios';

import './AdminPanelNGORecords.css'

class DonationModal extends Component{
    componentDidMount(){
      console.log('ngoid',this.props.ngoid)
        axios.get(`/api/getUserDetails/${this.props.ngoid}`)
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

    render(){
  
        return(
            <Modal
           
      {...this.props}
       center
      classNames={{
        overlay: 'customOverlay',
        modal: 'customModal',
      }}>
     




    <div style= {{padding: "10px"}}>
    <h1>{this.state.selectedNgo.name}</h1>
                    <hr></hr>
                    <h5 className="small-text-admin">
                    <p>{this.state.selectedNgo.email} || {this.state.selectedNgo.phoneNumber}</p>
                    <p className="small-b-i">Address:</p>   
                    <p>{this.state.selectedNgo.address}</p>
                    <p className="small-b-i">Registration Number:</p>   
                    <p>{this.state.selectedNgo.regNum}</p>
                    <p className="small-b-i">Date of Registration:</p>   
                    <p>{this.state.selectedNgo.regDate}</p>
                    <p className="small-b-i">What We Do?</p>   
                    <p>{this.state.selectedNgo.description}</p>
                    </h5>
                    </div>
                </Modal>
        );
    }
}
export default DonationModal;