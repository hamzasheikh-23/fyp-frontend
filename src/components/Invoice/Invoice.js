import React, { Component } from 'react';
// import "./TrackOrder.scss";
import axios from "axios";
import moment from "moment";

export default class Invoice extends Component {
  render() {
    return (
      <div className='container'>
          <div style={{ margin: "50px 10px" }}>
        <div
          style={{
            height: "calc(100% - 20px)",
            width:'100%',
            // backgroundColor: !this.props.isActive && "#F8F8F8",
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
                  marginBottom: "16px",
                  color: "rgb(74, 137, 220)",
                //   textAlign:'center',
                //   display:'block'
                }}
                class="card-title"
              >
                ORDER INVOICE
              </h5>
              
            <div style={{ flex: 1 }}>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Status:</span> &nbsp;
                {'Satdfef'}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Case Id:</span> &nbsp;
                {'wdadasd'}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Reply Id:</span> &nbsp;
                {"dadad"}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Delivery Address:</span> &nbsp;
                {"dasda"}
              </p>
              <p class="card-text">
                <span style={{ fontWeight: "bold" }}>Posted Date</span> &nbsp;{" "}
                {moment(new Date()).format('LL hh:mm:ss')}
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
            //   onClick={() => this.props.history.push('/invoice')}
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
