import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";

import { FaUsers, FaRegHandshake, FaSlackHash } from "react-icons/fa";

import "./AdminPanel.css";
import CardsAdminPanel from "../CardsAdminPanel/CardsAdminPanel.js";
import axios from "axios";
import { baseURL } from "../../baseURL";

class AdminPanel extends React.Component {
  componentDidMount() {
    axios
      .get(`${baseURL}/user/users/count?userType=1 `)
      .then((admin) => {
        console.log('admin',admin)
        axios
          .get(`${baseURL}/user/users/count?userType=3 `)
          .then((ngo) => {
            console.log('ngo',ngo)
            axios
              .get(`${baseURL}/user/users/count`)
              .then((user) => {
                console.log('user',user)
                this.setState({ users: user.data.count || 0, partners: ngo.data.count || 0, admins: admin.data.count || 0 });
              })
              .catch(console.log);
          })
          .catch(console.log);
      })
      .catch(console.log);
  }

  state = {
    users: 0,
    partners: 0,
    admins: 0,
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

        <div className="main-admin-container">
          <h1 className="text-in-admin1">Welcome Admin!</h1>
          <h5 className="text-in-admin2">
            &nbsp;What would you like to do today?
          </h5>
          <hr></hr>

          <CardsAdminPanel history={this.props.history} buttontext="View" />

          <hr></hr>

          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div class="card-counter primary">
                  <i className="adminpageicon">
                    <FaUsers />
                  </i>
                  <span class="count-numbers">{this.state.users}</span>
                  <span class="count-name">Total Users</span>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card-counter success">
                  <i className="adminpageicon">
                    <FaRegHandshake />
                  </i>
                  <span class="count-numbers">{this.state.partners}</span>
                  <span class="count-name">Our Partners</span>
                </div>
              </div>

              <div class="col-md-4">
                <div class="card-counter info">
                  <i className="adminpageicon">
                    <FaSlackHash />
                  </i>
                  <span class="count-numbers">{this.state.admins}</span>
                  <span class="count-name">Successful Donations</span>
                </div>
              </div>
            </div>
          </div>

          <br></br>
          <hr></hr>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AdminPanel;
