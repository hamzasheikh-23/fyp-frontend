import React, { Component } from 'react';
// import "./TrackOrder.scss";
import axios from "axios";
import moment from "moment";
import {checkProperty} from '../../assets/utils';
import { toast } from 'react-toastify';

export default class Invoice extends Component {
    state={
        data:{}
    }
    componentDidMount(){
        const {orderId} = this.props.history?.location?.state
        axios.get(`https://localhost:44357/invoice/get?orderId=${orderId}`)
        .then(res=>{this.setState({data: res.data.invoices})})
        .catch(console.log)
    }
    payNow=()=>{
      const {orderId} = this.props.history?.location?.state
      axios.put(`https://localhost:44357/order/edit?id=${orderId}&status=Completed`)
        .then(res=>{
          toast.success("Payment has been made succesfully!")
          this.props.history.push('/')
        })
        .catch(console.log)
    }
  render() {
      const {data}=this.state
    return (
      <div className='container'>
          <div style={{ margin: "50px 10px" }}>
        <div
          style={{
            height: "calc(100% - 20px)",
            width:'100%',
            backgroundColor: "#F8F8F8",
            boxShadow: "10px 10px 6px -6px rgba(0,0,0,0.07)",
          }}
          class="card"
        >
          
          <div
            style={{ display: "flex", flexDirection: "column", padding: '1rem 15%' }}
            class="card-body"
          >
              <h5
                style={{
                //   display: "inline",
                  margin: "10px 0",
                  color: "rgb(74, 137, 220)",
                //   textAlign:'center',
                //   display:'block'
                }}
                class="card-title"
              >
                ORDER INVOICE
              </h5>
              <hr></hr>
              
            <div style={{ flex: 1 }}>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Invoice Id:</span> &nbsp;
                {checkProperty('InvoiceId', data)}
              </p>

              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Order Id:</span> &nbsp;
                {checkProperty('OrderId', data)}
              </p>

              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Card Number:</span> &nbsp;
                {checkProperty('CardNumber', data)}
              </p>

              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Card Holder Name:</span> &nbsp;
                {checkProperty('CardholderName', data)}
              </p>

              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Amount:</span> &nbsp;
                {checkProperty('Amount', data,'0')} PKR
              </p>
              
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Date:</span> &nbsp;
                {data.Date ? moment(data.Date).format('LL hh:mm:ss') : ""}
              </p>
            </div>


            <button
            //   style={{
            //     backgroundColor: "#4A89DC",
            //     border: "none",
            //     // width: 170px,
            //     color: "white",
            //     padding: "7px 20px",
            //     textAlign: "center",
            //     textDecoration: "none",
            //     display: "block",
            //     fontSize: "12px",
            //     margin: "10px auto",
            //     borderRadius: "65px",
            //   }}
              href="#"
              onClick={() => this.payNow()}
            className="my-btn signup-btn"
            >
              Pay Now
            </button>
            
          </div>
        </div>
      </div>
      </div>
    )
  }
}
