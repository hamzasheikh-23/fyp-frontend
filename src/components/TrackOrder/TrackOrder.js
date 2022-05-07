import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";
import "./TrackOrder.scss";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {Form} from 'react-bootstrap';
import { toast } from "react-toastify";
import { FaTrash, FaPen } from "react-icons/fa";



export default class TrackOrder extends React.Component {
  state = {
    siderDrawerOpen: false,
    donor: true,
    items:[
//       {
//         "OrderId": 1,
//         "NGOId": 7,
//         "CaseId": 11,
//         "ReplyId": 7,
//         "NGOName": "Saylani Welfare",
//         "DeliveryAddress": "Bahadurabad, Karachi",
//         "StatusId": 3,
//         "Status": "Pending",
//         "OrderDateTime": "2022-05-08T01:14:00"
//     },
//     {
//       "OrderId": 1,
//       "NGOId": 7,
//       "CaseId": 11,
//       "ReplyId": 7,
//       "NGOName": "Saylani Welfare",
//       "DeliveryAddress": "Bahadurabad, Karachi",
//       "StatusId": 3,
//       "Status": "Pending",
//       "OrderDateTime": "2022-05-08T01:14:00"
//   },
//   {
//     "OrderId": 1,
//     "NGOId": 7,
//     "CaseId": 11,
//     "ReplyId": 7,
//     "NGOName": "Saylani Welfare",
//     "DeliveryAddress": "Bahadurabad, Karachi",
//     "StatusId": 3,
//     "Status": "Delivered",
//     "OrderDateTime": "2022-05-08T01:14:00"
// }
    ]
    
  };

  componentDidMount(){
    axios.get(`https://localhost:44357/order/get?ngoId=${localStorage.getItem('ngoID')}`)
    .then(res=>{
      if(!res.data.noData){
        this.setState({items: res.data.order})
      }else{
        this.setState({items:[]})
      }
    })
    .catch(console.log)
  }

  

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };
  render() {
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="trackOrder container">
          <h1 className="center blue-heading">Track Your Orders</h1>
          <div className="container item-card-container">
          {this.state.items.map((item) => {
            // console.log(item, "worked");
            return (
              <div style={{ margin: "0 10px" }}>
        <div
          style={{
            height: "calc(100% - 20px)",
            // backgroundColor: !this.props.isActive && "#F8F8F8",
            boxShadow: "10px 10px 6px -6px rgba(0,0,0,0.07)",
          }}
          class="card"
        >
          
          <div
            style={{ display: "flex", flexDirection: "column" }}
            class="card-body"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // flexWrap: "wrap",
              }}
            >
              <h5
                style={{
                  display: "inline",
                  marginBottom: "16px",
                  color: "rgb(74, 137, 220)",
                }}
                class="card-title"
              >
                ORDER ID: {item.OrderId}
              </h5>
              {/* <div style={{ whiteSpace: "nowrap" }}>
                <FaTrash
                  onClick={this.deleteItem}
                  style={{
                    fill: "red",
                    margin: "0 10px",
                    cursor: "pointer",
                  }}
                />
                <FaPen
                  onClick={this.editItem}
                  style={{
                    fill: "green",
                    margin: "0 10px",
                    cursor: "pointer",
                  }}
                />
              </div> */}
            </div>
            <div style={{ flex: 1 }}>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Status:</span> &nbsp;
                {item.Status}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Case Id:</span> &nbsp;
                {item.CaseId}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Reply Id:</span> &nbsp;
                {item.ReplyId}
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Order Amount:</span> &nbsp;
                {item.Amount || 0} PKR
              </p>
              <p class="card-text" style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: "bold" }}>Delivery Address:</span> &nbsp;
                {item.DeliveryAddress}
              </p>
              <p class="card-text">
                <span style={{ fontWeight: "bold" }}>Posted Date</span> &nbsp;{" "}
                {moment(item.OrderDateTime).format('LL hh:mm:ss')}
              </p>
            </div>

            {item.Status === "Delivered" &&

            <button
              style={{
                backgroundColor: "#4A89DC",
                border: "none",
                // width: 170px,
                color: "white",
                padding: "7px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "block",
                fontSize: "12px",
                margin: "10px auto",
                borderRadius: "65px",
              }}
              href="#"
              onClick={() => this.props.history.push('/invoice')}
              class="btn btn-primary view-detail"
            >
              View Invoice
            </button>}
            
          </div>
        </div>
      </div>
            );
          })}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
