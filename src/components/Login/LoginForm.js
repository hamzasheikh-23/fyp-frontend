import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./LoginForm.css";
import FaceImage from "../../images/peo.png";
import { FaAt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
//import jwt_decode from 'jwt-decode';
import axios from "axios";

const LoginInitialState = {
  loginEmail: "",
  loginPassword: "",
  loginEmailError: "",
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
    let loginEmailError = "";
    let loginPasswordError = "";
    const validEmail =
      /^([a-zA-z0-9_\-\.]+)@([a-zA-z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    // if(!this.state.loginEmail){
    //     loginEmailError="you must enter an email";
    // }else if(!validEmail.test(this.state.loginEmail)){
    //     loginEmailError="invalid email";
    // }

    if (!this.state.loginPassword) {
      loginPasswordError = "you must enter password";
    } else if (
      this.state.loginPassword.length < 5 ||
      this.state.loginPassword.length > 20
    ) {
      loginPasswordError = "Password must be between 6 to 20";
    }

    if (loginEmailError || loginPasswordError) {
      this.setState({ loginEmailError, loginPasswordError });
      return false;
    }
    return true;
  };
  LoginFormSubmitHandler = (e) => {
    e.preventDefault();
    const isLoginFormValid = this.loginFormValidate();
    console.log(isLoginFormValid);
    if (isLoginFormValid) {
      console.log(this.state);

      const loginData = {
        usernameOrEmail: this.state.loginEmail,
        password: this.state.loginPassword,
      };
      axios
        .post("https://localhost:44357/user/login", loginData)
        .then((res) => {
        console.log('response',res,this.props.history,this.props);
         // console.log(res);
          localStorage.clear();
          if (res.data.code === "1") {
            localStorage.setItem("admin", true);
            localStorage.setItem("loginType", "admin");
          } else {
            localStorage.setItem("admin", false);
            if (res.data.code === "2") {
              //donor
              localStorage.setItem("loginType", "donor");
            } else if (res.data.code === "3") {
              //ngo
              localStorage.setItem("loginType", "ngo");
            }
          }
          
          this.props.history.push("/");
        })
        .catch((err) => {
          this.setState({ loginErr: true });
          console.log("login error", err);
        });
    }
  };

  render() {
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
                        <FaAt />
                      </i>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        id="email"
                        onChange={(event) =>
                          this.LoginHandleInputChange(event, "loginEmail")
                        }
                        value={this.state.loginEmail}
                        autoComplete="off"
                      />
                      <div style={{ fontSize: "12.8px", color: "#DC3545" }}>
                        {this.state.loginEmailError}
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
