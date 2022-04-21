import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginForm.css";
import FaceImage from "../../images/peo.png";
import { FaUserTie } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
//import jwt_decode from 'jwt-decode';
import axios from "axios";

const LoginInitialState = {
  loginUserName: "",
  loginPassword: "",
  loginUserNameError: "",
  loginPasswordError: "",
  loginErr: false,
};

class LoginForm extends Component {
  constructor() {
    super();
    this.state = LoginInitialState;
  }
  LoginHandleInputChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };
  loginFormValidate = () => {
    let loginUserNameError = "";
    let loginPasswordError = "";
    // const validName = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    //with numbers
    const validName = /^[a-zA-Z][a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;

    const validEmail =
      /^([a-zA-z0-9_\-.]+)@([a-zA-z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

    // if(!this.state.loginEmail){
    //     loginEmailError="you must enter an email";
    // }
    //else if(!validEmail.test(this.state.loginEmail)){
    //     loginEmailError="invalid email";
    // }

    if (!this.state.loginUserName) {
      loginUserNameError = "you must enter a user name";
    } else if (this.state.loginUserName.length > 50) {
      loginUserNameError = "User name must be less than 50 characters";
    } else if (!validName.test(this.state.loginUserName)) {
      loginUserNameError = "First character must be an alphabet and rest alphanumeric, No special characters and boundary spaces allowed";
    }

    if (!this.state.loginPassword) {
      loginPasswordError = "you must enter password";
    } else if (
      this.state.loginPassword.length < 5 ||
      this.state.loginPassword.length > 20
    ) {
      loginPasswordError = "Password must be between 6 to 20";
    }

    if (loginUserNameError || loginPasswordError) {
      this.setState({ loginUserNameError, loginPasswordError });
      return false;
    }
    return true;
  };
  LoginFormSubmitHandler = (e) => {
    e.preventDefault();
    const isLoginFormValid = this.loginFormValidate();
    // console.log(isLoginFormValid);

    if (isLoginFormValid) {
      console.log(this.state);

      const loginData = {
        Username: this.state.loginUserName,
        password: this.state.loginPassword,
      };
      axios
        .post("https://localhost:44357/user/login", loginData)
        .then((res) => {
          console.log("response", res, this.props.history, this.props);
          // console.log(res);
          if (res.data.code !== "0") {
            localStorage.clear();
            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("userID", res.data.userID);
            localStorage.setItem("userTypeId", res.data.userTypeId);
            if (res.data.code === "1") {
              localStorage.setItem("admin", true);
              localStorage.setItem("loginType", "admin");
              localStorage.setItem("adminID", res.data.adminID);
              this.props.history.push("/adminPanelMain");
            } else {
              localStorage.setItem("admin", false);
              if (res.data.code === "2") {
                //donor
                localStorage.setItem("loginType", "donor");
                localStorage.setItem("donorID", res.data.donorID);
              } else if (res.data.code === "3") {
                //ngo
                localStorage.setItem("loginType", "ngo");
                localStorage.setItem("ngoID", res.data.ngoID);
                if (!res.data.planID) {
                  this.props.history.push("/subscription");
                  return;
                }
              }
              this.props.history.push("/");
            }
          } else {
            this.setState({ loginErr: true });
          }
        })

        .catch((err) => {
          this.setState({ loginErr: true });
          console.log("login error", err);
        });
    }
  };

  render() {
    console.log("login page");
    return (
      <div className="my-login-background">
        <div className="modal-dialog text-center">
          <div className="col-sm-12 main-section">
            <div className="modal-content">
              <div className="dark-border">
                <div className="col-12 user-img">
                  <img src={FaceImage} alt="no img" />
                </div>
                <div className="col-12 form-input">
                  <form
                    className="my-login-form"
                    onSubmit={this.LoginFormSubmitHandler}
                    noValidate
                  >
                    <div className="form-group ">
                      <i>
                      <FaUserTie />
                      </i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        name="username"
                        id="username"
                        onChange={(event) =>
                          this.LoginHandleInputChange(event, "loginUserName")
                        }
                        value={this.state.loginUserName}
                        autoComplete="off"
                      />
                      <div style={{ fontSize: "12.8px", color: "#DC3545" }}>
                        {this.state.loginUserNameError}
                      </div>
                    </div>
                    <div className="form-group">
                      <i>
                        <FaLock />
                      </i>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        onChange={(event) =>
                          this.LoginHandleInputChange(event, "loginPassword")
                        }
                        value={this.state.loginPassword}
                        autoComplete="off"
                      />
                      <div style={{ fontSize: "12.8px", color: "#DC3545" }}>
                        {this.state.loginPasswordError}
                      </div>
                    </div>

                    <button type="submit" className="login-btn my-btn">
                      Login
                    </button>
                  </form>
                </div>
                <div className="col-12 forgot">
                  {this.state.loginErr ? (
                    <p
                      style={{
                        fontSize: "18px",
                        color: "#DC3545",
                        fontWeight: "bold",
                      }}
                    >
                      Login Unsuccessful
                    </p>
                  ) : null}
                  {/* <p><a href="/">Forgot Password?</a></p> */}
                  <p>
                    <Link to="/signup">Don't have an account?</Link>
                  </p>
                  <p id="backtohome">
                    <Link to="/">Back to Home Page</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
