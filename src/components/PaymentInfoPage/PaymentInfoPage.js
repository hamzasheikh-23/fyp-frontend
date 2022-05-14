import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";
import "./PaymentInfoPage.scss";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { baseURL } from "../../baseURL";
import {checkProperty} from '../../assets/utils';

let expMonthArr = [];
let expYearArr = [];

(function () {
  for (let i = 1; i <= 12; i++) {
    expMonthArr.push(i);
  }
  for (let i = 2022; i <= 2030; i++) {
    expYearArr.push(i);
  }
})();

export default class PaymentInfoPage extends React.Component {
  state = {
    siderDrawerOpen: false,
    donor: true,

    cardHolder: "",
    cardHolderErr: "",

    cardNum: "",
    cardNumErr: "",

    expMonth: "",
    expMonthErr: "",

    expYear: "",
    expYearErr: "",

    cvv: "",
    cvvErr: "",
  };

  OnInputChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  validation = (e) => {
    let cardHolderErr = "";
    let cardNumErr = "";
    let cvvErr = "";
    let expMonthErr = "";
    let expYearErr = "";
    console.log(this.state);

    const validTitle = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const validNumber = /^[0-9]*$/;
    const validDesc = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces
    // debugger;
    if (!this.state.cardNum) {
      cardNumErr = "required";
    } else if (!validNumber.test(this.state.cardNum)) {
      cardNumErr = "Only numbers allowed";
    } else if (this.state.cardNum.length !== 16) {
      cardNumErr = "Card number must be a 16-digit number";
    }

    if (!this.state.cvv) {
      cvvErr = "required";
    } else if (!validNumber.test(this.state.cvv)) {
      cvvErr = "Only numbers allowed";
    } else {
      cvvErr = "";
    }

    if (!this.state.cardHolder) {
      cardHolderErr = "required";
    } else if (!validTitle.test(this.state.cardHolder)) {
      cardHolderErr =
        "Only alphabets, No special characters and boundary spaces allowed";
    }
    // else if (
    //   this.state.itemTitle.length < 5 ||
    //   this.state.itemTitle.length > 30
    // ) {
    //   itemTitleError = "Title must be between 5 to 30 characters";
    // }

    if (!this.state.expMonth) {
      expMonthErr = "required";
    }

    if (!this.state.expYear) {
      expYearErr = "required";
    }

    if (cvvErr || cardHolderErr || cardNumErr || expYearErr || expMonthErr) {
      this.setState({
        cvvErr,
        cardHolderErr,
        cardNumErr,
        expYearErr,
        expMonthErr,
      });
      return false;
    }

    return true;
  };

  subscriptionPayment = (paymentPayload) => {
    const { planId, amount } = this.props.history?.location?.state?.data;
    axios
      .post(`${baseURL}/paymentInfo/post`, paymentPayload)
      .then((res1) => {
        axios
        .put(
          `${baseURL}/subscription/assign?ngoId=${localStorage.getItem("ngoID")}&planId=${planId}&paymentId=${res1.data.lastId}`,
          {Amount: amount}
        )
        .then((res) => {
          localStorage.setItem("ngoPlanID", planId);
          localStorage.setItem("ngoSubscription", true);
  
          this.props.history.push("/");
        })
        .catch(console.log);
      })
      .catch(console.log);
   
  };

  donationPayment = (paymentPayload) => {
    const { donationId, address, amount, responseId } = this.props.history?.location?.state?.data;
    axios
      .post(`${baseURL}/paymentInfo/post`, paymentPayload)
      .then((res1) => {
        //later
        axios.post(`${baseURL}/order/response/post`,{ PaymentId: res1.data.lastId, DonationId: donationId, Address: address, Amount: amount, NGOId: localStorage.getItem("ngoID"), ResponseId:  responseId})
        .then((res2) => {
          toast.success(
            "Thank you for your order wait till it gets approve by admin",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          this.props.history.push("/trackOrder");
        })
        .catch(console.log);
      })
      .catch(console.log);
   
  };

  replyPayment = (paymentPayload) => {
    const { caseId, replyId, address, amount } =
      this.props.history?.location?.state?.data;

    const orderPayload = {
      NGOId: localStorage.getItem("ngoID"),
      CaseId: caseId,
      ReplyId: replyId,
      DeliveryAddress: address,
      Amount: amount,
    };

    console.log("call api replyPayment", paymentPayload, orderPayload);

    axios
      .post(`${baseURL}/paymentInfo/post`, paymentPayload)
      .then((res1) => {
        axios
          .post(
            `${baseURL}/order/post`,
            Object.assign({ PaymentId: res1.data.lastId }, orderPayload)
          )
          .then((res2) => {
            toast.success(
              "Thank you for your order wait till it gets approve by admin",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            this.props.history.push("/trackOrder");
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  proceed = (e) => {
    e.preventDefault();
    const isValid = this.validation();
    console.log("isValid: ", isValid, this.state);
    console.log('previous data', this.props.history?.location?.state?.data)

    if (isValid) {
      const paymentPayload = {
        NgoId: localStorage.getItem("ngoID"),
        CardholderName: this.state.cardHolder,
        CardNumber: this.state.cardNum,
        ExpiryMonth: this.state.expMonth,
        ExpiryYear: this.state.expYear,
        CVV: this.state.cvv,
      };


      const replyId = checkProperty('replyId', this.props.history?.location?.state?.data)
      const donationId = checkProperty('donationId', this.props.history?.location?.state?.data)
      const planId = checkProperty('planId', this.props.history?.location?.state?.data)

      // const { replyId } = this.props.history?.location?.state?.data;
      console.log('replyId',replyId);
      // const { donationId } = this.props.history?.location?.state?.data;
      console.log('donationId',donationId);
      // const { planId } = this.props.history?.location?.state?.data;
      console.log('planId',planId);

      if (replyId) {
        this.replyPayment(paymentPayload);
      } else if (donationId) {
        this.donationPayment(paymentPayload)
      } else if (planId) {
        this.subscriptionPayment(paymentPayload);
      }
    }
  };

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
        <div className="paymentInfoPage container">
          <h1 className="center blue-heading">Payment Information</h1>
          <form>
            <div className="form-group">
              <label htmlFor="item-title" className="my-donation-label">
                Card Holder Name
              </label>
              <input
                value={this.state.cardHolder}
                onChange={(event) => this.OnInputChange(event, "cardHolder")}
                // placeholder="Item Title"
                className="form-control"
              />
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.cardHolderErr}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="item-title" className="my-donation-label">
                Card Number
              </label>
              <input
                value={this.state.cardNum}
                onChange={(event) => this.OnInputChange(event, "cardNum")}
                // type='number'
                // placeholder="Item Title"
                className="form-control"
              />
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.cardNumErr}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="my-donation-label">Expiration Month</label>
                  <select
                    value={this.state.expMonth}
                    onChange={(event) => this.OnInputChange(event, "expMonth")}
                    className="form-control"
                  >
                    <option value={""}>{""}</option>
                    {expMonthArr.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      fontSize: "12.8px",
                      color: "#DC3545",
                      marginLeft: "10px",
                    }}
                  >
                    {this.state.expMonthErr}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="my-donation-label">Expiration Year</label>
                  <select
                    value={this.state.expYear}
                    onChange={(event) => this.OnInputChange(event, "expYear")}
                    className="form-control"
                  >
                    <option value={""}>{""}</option>
                    {expYearArr.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      fontSize: "12.8px",
                      color: "#DC3545",
                      marginLeft: "10px",
                    }}
                  >
                    {this.state.expYearErr}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <label className="my-donation-label">CVV</label>
                <input
                  value={this.state.cvv}
                  onChange={(event) => this.OnInputChange(event, "cvv")}
                  type="number"
                  // placeholder="Quantity"
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.cvvErr}
                </div>
              </div>
            </div>
            <button onClick={this.proceed} className="my-btn signup-btn">
              Proceed Order
            </button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
