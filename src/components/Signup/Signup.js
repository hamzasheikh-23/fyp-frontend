import React, { Component } from "react";
import "./Signup.css";
import "./AccountTypeButton.css";
import { connect } from "react-redux";
import { userType } from "../../actions";
import { Link } from "react-router-dom";
import { Field, reduxForm, reset } from "redux-form";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import {
  FaCalendarDay,
  FaAddressCard,
  FaHashtag,
  FaFileAlt,
  FaUserTie,
  FaAt,
  FaLock,
  FaMapMarkedAlt,
  FaPhoneVolume,
  FaCertificate,
  AiOutlineUser,
} from "react-icons/fa";
import { baseURL } from "../../baseURL";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      userType: "donor",
      alertMsg: false,
      msg: "",
      bg: "",
    };
  }

  AccountSelectionHandler = (user) => {
    this.props.userType(user);
    // this.setState((prevState)=>{
    //     return {donor: !prevState.donor,ngo: prevState.donor}
    // });
  };

  renderError(meta) {
    if (meta.error && meta.touched) {
      return (
        <div
          style={{
            fontSize: "12.8px",
            color: "#DC3545",
            marginLeft: "20px",
            marginTop: "5px",
            lineHeight: "13px",
          }}
        >
          {meta.error}
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    const className = `form-group ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    } `;
    // console.log('onchange', formProps)
    return (
      <div className={className}>
        {formProps.input.name === "password" ? (
          <i>
            <FaLock />
          </i>
        ) : null}
        {formProps.input.name === "password_confirmation" ? (
          <i>
            <FaLock />
          </i>
        ) : null}
        {formProps.input.name === "email" ? (
          <i>
            <FaAt />
          </i>
        ) : null}
        {formProps.input.name === "regDate" ? (
          <i>
            <FaCalendarDay />
          </i>
        ) : null}
        {formProps.input.name === "regNum" ? (
          <i>
            <FaHashtag />
          </i>
        ) : null}
        {formProps.input.name === "fname" ? (
          <i>
            <FaUserTie />
          </i>
        ) : null}

        {formProps.input.name === "name" ? (
          <i>
            <FaUserTie />
          </i>
        ) : null}

        {formProps.input.name === "lname" ? (
          <i>
            <FaUserTie />
          </i>
        ) : null}
        {formProps.input.name === "username" ? (
          <i>
            <FaUserTie />
          </i>
        ) : null}
        {formProps.input.name === "phoneNumber" ? (
          <i>
            <FaPhoneVolume />
          </i>
        ) : null}
        {formProps.input.name === "address" ? (
          <i>
            <FaMapMarkedAlt />
          </i>
        ) : null}
        {formProps.input.name === "CNIC_Number" ? (
          <i>
            <FaAddressCard />
          </i>
        ) : null}
        {formProps.label ? (
          <small
            style={{ color: "#6c6c6c", position: "relative", left: "-25px" }}
          >
            {formProps.label}
          </small>
        ) : null}
        <input
          type={formProps.type}
          className="form-control"
          placeholder={formProps.placeholder}
          id={formProps.id}
          {...formProps.input}
          autoComplete="off"
        />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderTextAreaInput = (formProps) => {
    const className = `form-group ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    } `;

    return (
      <div className={className}>
        {formProps.input.name === "description" ? (
          <i>
            <FaFileAlt />
          </i>
        ) : null}
        <textarea
          style={{ height: "100px" }}
          className="form-control"
          placeholder={formProps.placeholder}
          id={formProps.id}
          {...formProps.input}
          rows={formProps.rows}
          cols={formProps.cols}
          autoComplete="off"
        ></textarea>
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  renderSelectInput = (formProps) => {
    const className = `form-group gender-field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    } `;
    return (
      <div className={className}>
        <small style={{ color: "#6c6c6c" }}>Gender</small>
        <select
          id="gender"
          className="form-control signup-gender"
          {...formProps.input}
        >
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  // is neeche wale function me jo signupdata hai wo hai sara data ho ye raha hai k redux me jab b
  // onsubmit waha funtion chalta hai to us ko ek argument milta h jis me wo sala data hota h jo humne send kiya hota hai
  // to mene wohi kiya hua k formvalues k and data aa raha tha us se nikal k signupdata me dala sath me comma k bad
  // user type kya h wo dali is trha sara form ka data incluing user type signup data me aa raha

  onSubmit = (formValues, dispatch) => {
    window.scrollTo(0, 0);

    let signupData;

    const {
      password,
      email,
      regDate,
      regNum,
      fname,
      lname,
      name,
      username,
      phoneNumber,
      address,
      CNIC_Number,
      description,
      gender,
    } = formValues;

    if (this.props.type === "ngo") {
      const [first, ...last] = name.split(" ");
      signupData = {
        FirstName: first,
        LastName: last.join(" "),
        Username: username,
        Email: email,
        Password: password,
        Contact: phoneNumber,
        UserTypeId: 3,
        Address: address,
      };
    } else {
      //donor
      signupData = {
        FirstName: fname,
        LastName: lname,
        Username: username,
        Email: email,
        Password: password,
        Contact: phoneNumber,
        UserTypeId: 2,
        Gender: gender,
        Address: address,
        CNIC: CNIC_Number,
      };
    }

    console.log("Sign up data:", signupData);
    this.setState({
      alertMsg: true,
      msg: "We are processing. Please wait",
      bg: "primary",
    });
    axios
      .post(
        `${baseURL}/user/register`,
        signupData
      )
      .then((res) => {
        if (res.data.isSuccess) {
          dispatch(reset("signupForm"));
          //this.setState({alertMsg:true, msg:'Form submitted successfully', bg:'success'});
          this.props.history.push("/");
          // console.log("response: ", res);
        } else {
          this.setState({
            alertMsg: true,
            msg: res.data.errMessage,
            bg: "danger",
          });
        }
      })
      .catch((err) => {
        // console.log("error: ", err);
        this.setState({
          alertMsg: true,
          msg: "Form submission failed",
          bg: "danger",
        });
      });
  };

  isNgo = () => {
    if (this.props.type === "ngo") {
      return (
        <div className="ngo-form">
          <div className="row">
            <div className="col-lg-6">
              <Field
                name="regDate"
                component={this.renderInput}
                label="Registration Date"
                type="date"
                id="regDate"
                placeholder="Registration Date"
              />
            </div>
            <div className="col-lg-6">
              <Field
                name="regNum"
                component={this.renderInput}
                type="number"
                id="regNum"
                placeholder="Registration Num"
              />
            </div>
          </div>
          <Field
            name="description"
            component={this.renderTextAreaInput}
            id="description"
            placeholder="What You Do?"
            rows="10"
            cols="50"
          />
        </div>
      );
    }
  };
  alertHandler = () => {
    if (this.state.alertMsg) {
      return (
        <Alert
          variant={this.state.bg}
          onClose={() => this.setState({ alertMsg: false })}
          dismissible
        >
          {this.state.msg}
        </Alert>
      );
    }
  };

  render() {
    return (
      <div className="my-signup-page">
        {this.alertHandler()}
        <div className="container">
          <h1 className="blue-heading sigup-page-heading">
            Choose Account Type
          </h1>
          <div className="account-pic-container">
            <div className="row">
              <div className="col-6 main-pic-container ">
                <button
                  className="account-button"
                  onClick={() => this.AccountSelectionHandler("donor")}
                >
                  <div className="pic-border">
                    <div className="pic-container ">
                      <div className="pic1"></div>
                      <h3 className="tag">Donor</h3>
                    </div>
                    {this.props.type === "donor" ? (
                      <i>
                        <FaCertificate />
                      </i>
                    ) : null}
                  </div>
                </button>
              </div>
              <div className="col-6  main-pic-container ">
                <button
                  className="account-button"
                  onClick={() => this.AccountSelectionHandler("ngo")}
                >
                  <div className="pic-border">
                    <div className="pic-container ">
                      <div className="pic2"></div>
                      <h3 className="tag">NGO</h3>
                    </div>
                    {this.props.type === "ngo" ? (
                      <i>
                        <FaCertificate />
                      </i>
                    ) : null}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="instructions">
            {/* <Link to="/signup" className="no-decor">Not sure what to choose?</Link> */}
            <p>Hello! Please fill out the form below to get started</p>
          </div>

          <form
            action=""
            className="main-donor-signup-form"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            noValidate
          >
            {this.props.type === "donor" ? (
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="fname"
                    id="fname"
                    component={this.renderInput}
                    placeholder="First Name"
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="lname"
                    id="lname"
                    component={this.renderInput}
                    placeholder="Last Name"
                  />
                </div>
              </div>
            ) : (
              <Field
                name="name"
                component={this.renderInput}
                type="text"
                id="name"
                placeholder={"Organization Name"}
              />
            )}
            <Field
              name="username"
              component={this.renderInput}
              type="text"
              id="username"
              placeholder={"Username"}
            />
            <div className="row">
              <div className="col-lg-6">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  component={this.renderInput}
                  placeholder="Email"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  // onChange={(e)=>{console.log('phone field', e.target.value)}}
                  component={this.renderInput}
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8">
                <Field
                  type="text"
                  name="address"
                  id="address"
                  component={this.renderInput}
                  placeholder="Address"
                />
              </div>
              {this.props.type === "donor" ? (
                <div className="col-lg-4">
                  <Field name="gender" component={this.renderSelectInput} />
                </div>
              ) : null}
            </div>

            <div className="row field-spacer">
              <div className="col-lg-6">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  component={this.renderInput}
                  placeholder="Password"
                />
              </div>
              <div className="col-lg-6">
                <Field
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  component={this.renderInput}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            {this.props.type === "donor" ? (
              <Field
                name="CNIC_Number"
                component={this.renderInput}
                type="text"
                id="CNIC_Number"
                placeholder="CNIC (eg format: 12345-1234567-1)"
              />
            ) : null}

            {/* {this.isNgo()} */}
            <button
              type="submit"
              style={{ outline: "none" }}
              className=" signup-btn"
            >
              Sign Up
            </button>
            <p>
              <Link to="/" style={{ color: "#6c6c6c", fontSize: "15px" }}>
                Back to Home Page
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
const Signupvalidate = (formValues) => {
  const errors = {};
  const validCNIC = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
  const validEmail =
    /^([a-zA-z0-9_\-\.]+)@([a-zA-z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const validName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  const onlyAlphabets = /^[a-zA-Z]*$/;
  const onlyAlphanumeric = /^[a-zA-Z0-9]*$/;

  const validUsername = /^[a-zA-Z][a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;

  // const validUsername = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  // const validPhoneNum = /^\(?\d{4}\)?[-.]?\d{3}[-.]?\d{4}$/;
  const validRegNum = /^[0-9]*$/;
  if (!formValues.CNIC_Number) {
    errors.CNIC_Number = "you must enter CNIC";
  } else if (!validCNIC.test(formValues.CNIC_Number)) {
    errors.CNIC_Number = "invalid CNIC or format";
  }
  if (!formValues.email) {
    errors.email = "you must enter an email";
  } else if (!validEmail.test(formValues.email)) {
    errors.email = "invalid email";
  }

  if (!formValues.password) {
    errors.password = "you must enter password";
  } else if (
    formValues.password.length < 5 ||
    formValues.password.length > 20
  ) {
    errors.password = "Password must be between 5 to 20";
  } else if (!onlyAlphanumeric.test(formValues.password)) {
    errors.password =
      "Only alphanumeric characters, No special characters and spaces allowed";
  }

  if (!formValues.password_confirmation) {
    errors.password_confirmation = "retype your password";
  } else if (formValues.password !== formValues.password_confirmation) {
    errors.password_confirmation = "password does not match ";
  }

  if (!formValues.fname) {
    errors.fname = "you must enter first name";
  } else if (formValues.fname.length < 3 || formValues.fname.length > 25) {
    errors.fname = "name must be characters between 3 to 25";
  } else if (!onlyAlphabets.test(formValues.fname)) {
    errors.fname =
      "Only alphabets, No special characters and boundary spaces allowed";
  }

  if (!formValues.name) {
    errors.name = "you must enter organization name";
  } else if (formValues.name.length < 3 || formValues.name.length > 30) {
    errors.name = "name must be characters between 3 to 30";
  } else if (!validUsername.test(formValues.name)) {
    errors.name =
      "First character must be an alphabet and rest alphanumeric, No special characters and boundary spaces allowed";
  }

  if (!formValues.lname) {
    errors.lname = "you must enter last name";
  } else if (!onlyAlphabets.test(formValues.lname)) {
    errors.lname =
      "Only alphabets, No special characters and boundary spaces allowed";
  } else if (formValues.lname.length < 3 || formValues.lname.length > 25) {
    errors.lname = "name must be characters between 3 to 25";
  }

  if (!formValues.username) {
    errors.username = "you must enter username";
  } else if (
    formValues.username.length < 3 ||
    formValues.username.length > 30
  ) {
    errors.username = "username must be characters between 3 to 30";
  } else if (!validUsername.test(formValues.username)) {
    errors.username =
      "First character must be an alphabet and rest alphanumeric, No special characters and boundary spaces allowed";
  }
  // console.log('phone check', formValues.phoneNumber)

  if (!formValues.phoneNumber) {
    errors.phoneNumber = "you must enter a valid number";
  } else if (!validRegNum.test(formValues.phoneNumber)) {
    errors.phoneNumber = "invalid number";
  } else if (formValues.phoneNumber.length > 11) {
    errors.phoneNumber = "phone number must be a 11-digit number";
  } else if (formValues.phoneNumber.includes(".")) {
    errors.phoneNumber = "you must enter a valid number";
  }

  if (!formValues.regNum) {
    errors.regNum = "you must enter registration number";
  }

  if (!formValues.regDate) {
    errors.regDate = "you must enter a date";
  }

  if (!formValues.address) {
    errors.address = "you must enter an address";
  }

  if (!formValues.description) {
    errors.description = "you must enter a description of your NGO";
  }

  if (!formValues.gender) {
    errors.gender = "select a gender";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "signupForm",
  validate: Signupvalidate,
})(Signup);
const mapStateToProps = (state) => {
  return { type: state.userType };
};
export default connect(mapStateToProps, { userType })(formWrapped);
