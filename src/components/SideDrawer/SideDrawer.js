import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";
import {
  FaAddressCard,
  FaSignInAlt,
  FaQuestionCircle,
  FaHandHoldingHeart,
  FaArrowLeft,
  FaDotCircle,
  FaGreaterThan,
} from "react-icons/fa";

class SideDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      donation: false,
      manage: false,
    };
  }
  MakingDonation = () => {
    this.setState((prevState) => {
      return { donation: !prevState.donation };
    });
  };
  showDonationOptions = () => {
    if (this.state.donation) {
      return (
        <div className="donation-options">
          <li>
            <Link to="/donationForm">
              <i>
                <FaDotCircle />
              </i>
              Donate Random Item
            </Link>
          </li>
          <li>
            <Link to="/ngoRequests">
              <i>
                <FaDotCircle />
              </i>
              see NGO's requirement
            </Link>
          </li>
        </div>
      );
    }
  };

  Manage = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return { manage: !prevState.manage };
    });
  };
  showManageOptions = () => {
    if (this.state.manage) {
      return (
        <div className="donation-options">
          <li>
            <Link to="/manage-donations">
              <i>
                <FaDotCircle />
              </i>
              Manage Donations
            </Link>
          </li>
          <li>
            <Link to="/manage-stories">
              <i>
                <FaDotCircle />
              </i>
              Manage Stories
            </Link>
          </li>
        </div>
      );
    }
  };
  logout = () => {
    localStorage.clear();
  };
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    return (
      <nav className={drawerClasses}>
        {/* <div className="image-card">
          <div className="image"></div>
        </div> */}

        <div className="pic-content">
          <h1>Charitable</h1>
          <p className="color-highlight">-that make big difference!</p>
        </div>

        <div>
          {/* <FaArrowLeft
            style={{
              margin: "15px",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={()=>this.props.history.goBack()}
          /> */}
          <ul>
            {localStorage.getItem("loginType") === "admin" && (
              <li>
                <Link to="/adminPanelMain">
                  <i>
                    <FaAddressCard />
                  </i>
                  Options
                </Link>
              </li>
            )}
            {localStorage.getItem("loginType") !== "admin" && (
              <>
                <li>
                  <Link to="/">
                    <i>
                      <FaAddressCard />
                    </i>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/aboutUs">
                    <i>
                      <FaAddressCard />
                    </i>
                    About
                  </Link>
                </li>
              </>
            )}

            {localStorage.getItem("loginType") === "ngo" ? (
              <>
                <li>
                  {/* <Link to="/#" onClick={this.Manage}>
                    <i>
                      <FaGreaterThan />
                    </i>
                    <button>Manage</button>
                  </Link> */}
                  <Link to="/manage-donations">
                    <i>
                      <FaGreaterThan />
                    </i>
                    <button>Manage</button>
                  </Link>
                </li>
                {this.showManageOptions()}
                <li>
                  <Link to="/confirmed-donations">
                    <i>
                      <FaAddressCard />
                    </i>
                    Confirm donations
                  </Link>
                </li>
              </>
            ) : null}
            {localStorage.getItem("loginType") === "donor" ? (
              <>
                <li>
                  <Link onClick={this.MakingDonation}>
                    <i>
                      <FaHandHoldingHeart />
                    </i>
                    <button>Make Donations</button>
                  </Link>
                </li>
                {this.showDonationOptions()}
                <li>
                  <Link to="/profile">
                    <i>
                      <FaAddressCard />
                    </i>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/ngo-replies">
                    <i>
                      <FaAddressCard />
                    </i>
                    NGO's response
                  </Link>
                </li>
                {/* <li>
                  <Link to="/viewStory">
                    <i>
                      <FaAddressCard />
                    </i>
                    NGOs stories
                  </Link>
                </li> */}
              </>
            ) : null}

            {localStorage.getItem("loginToken") ||
            localStorage.getItem("admin") ? (
              <li>
                <Link to="/" onClick={this.logout}>
                  <i>
                    <FaSignInAlt />
                  </i>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <i>
                    <FaSignInAlt />
                  </i>
                  Login
                </Link>
              </li>
            )}

            {/* <li><Link to="/help"><i><FaQuestionCircle/></i>Help</Link></li> */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default SideDrawer;
