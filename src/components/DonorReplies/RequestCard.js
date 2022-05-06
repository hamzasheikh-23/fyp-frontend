import React from "react";
import ProceedOrderModal from "../Modal/ProceedOrderModal";
import {checkProperty}  from '../../assets/utils';
import { toast } from "react-toastify";


class RequestCard extends React.Component {
  state = {
    addModalShow: false,
  };
  render() {
    // console.log('single item', this.props)
    let addModalClose = (showMsg) =>{
      this.setState({ addModalShow: false });
      if(showMsg){
        toast.success("Thank you for your donation wait till it gets accepted by NGO", {
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
          <h5 class="card-title ngo-request-card-title">{this.props.title}</h5>
          <h6 class="card-subtitle mb-4 text-muted ngo-request-card-subtitle">
            {this.props.ngoname}
          </h6>
          <p class="card-text ngo-request-card-text ">{this.props.des}</p>
          <p class="card-text ngo-request-card-text mb-5"><span style={{fontWeight:'bold'}}>Required:</span> &nbsp; {`${checkProperty('quantity',this.props)} ${checkProperty('unit',this.props)}`}</p>
          <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', alignItems:'center'}} >
          <h6 className="text-muted ">
            {this.props.date}
          </h6>
            <button
              onClick={() => this.setState({ addModalShow: true })}
              class="btn btn-primary .ngo-request-card-btn"
              style={{
                backgroundColor: "#4A89DC",
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
              Donate NOW
            </button>
          </div>
        </div>
        {this.state.addModalShow &&
        <ProceedOrderModal
        fetchData={this.props.fetchData}
          show={this.state.addModalShow}
          reqId={this.props.reqId}
          onHide={addModalClose}
        />}
      </div>
    );
  }
}
export default RequestCard;
