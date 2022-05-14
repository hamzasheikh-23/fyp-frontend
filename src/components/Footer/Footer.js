import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faFacebook,
  faTwitter,
  faLinkedinIn,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      feedbackValue: "",
      ErrorMsg: "",
    };
  }
  feedbackSubmit = (event) => {
    this.setState({ feedbackValue: event.target.value });
    // console.log(event.target.value);
  };
  feedbackValidation = () => {
    let feedbackErr;
    if (!localStorage.getItem("userID")) {
      feedbackErr = "Please Login";
      this.setState({ ErrorMsg: feedbackErr });
      return false;
    } else if (!this.state.feedbackValue) {
      feedbackErr = "Enter some feedback message";
      this.setState({ ErrorMsg: feedbackErr });
      return false;
    }
    return true;
  };
  submitFeedback = (e) => {
    e.preventDefault();
    // const isValidFeedback = this.feedbackValidation();
    // if (isValidFeedback) {
    //   const feedbackData = {
    //     user_id: localStorage.getItem("userID"),
    //     comment: this.state.feedbackValue,
    //   };
    //   // console.log(feedbackData)

    //   axios.post("/api/postFeedback", feedbackData);
    //   // .then(res=>{
    //   //     console.log(res.data);
    //   // }).catch(err=>console.log(err));
    //   this.setState({ feedbackValue: "" });
    // }
  };
  render() {
    return (
      <footer>
        <div className="footer-top">
          <div className="footer-container">
            <div className="row">
              <div className=" col-lg-3 col-md-6 col-sm-12  segment-one md-mb-30 sm-mb-30">
                <h3>Charitable</h3>
                <p>
                  Donation is a noble act and is the need for maintaining the
                  social cycle, We caters the donation cycle for in-kind
                  donations in a modern way, by providing a centralized platform
                  for NGOs and donors to connect virtually.
                </p>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12  segment-two md-mb-30 sm-mb-30">
                <h2>Useful Links</h2>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  {/* <li><Link to="/help">Help</Link></li> */}
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12  segment-three sm-mb-30">
                <h2>Follow Us</h2>
                <p>
                  Please follow us on our social media profile in order to keep
                  updated.
                </p>
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faFacebook} />
                  </i>
                </Link>
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faTwitter} />
                  </i>
                </Link>
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </i>
                </Link>
                <Link to="/">
                  <i>
                    <FontAwesomeIcon icon={faPinterest} />
                  </i>
                </Link>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12  segment-four sm-mb-30">
                <h2>Feedback</h2>
                <p>
                  We would love to hear back from you about your experience and
                  welcome any suggestions.
                </p>
                <form onSubmit={this.submitFeedback}>
                  <textarea
                    style={{ color: "black" }}
                    cols="35"
                    rows="3"
                    placeholder="Write Review Here"
                    onChange={(event) => this.feedbackSubmit(event)}
                    value={this.state.feedbackValue}
                  ></textarea>
                  <br />
                  <div
                    style={{
                      fontSize: "12.8px",
                      color: "#DC3545",
                      marginLeft: "10px",
                    }}
                  >
                    {this.state.ErrorMsg}
                  </div>
                  <input type="submit" value="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <p className="footer-bottom-text">
          All Rights Reserved by &copy; LittleDeeds.2020
        </p>
      </footer>
    );
  }
}
export default Footer;
