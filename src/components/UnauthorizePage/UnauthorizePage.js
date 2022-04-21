import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./UnauthorizePage.scss";

export default class UnauthorizePage extends React.Component {
  state = {
    siderDrawerOpen: false,
    donor: true,
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
    console.log("UnauthorizePage", this.props.history);
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} />
        <SideDrawer show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="unauthorize-page container">
          <div className="main center">You are not authorized to view this page!</div>
          <div className="sub-text center">
            Please login with the correct user account type.
          </div>
          {JSON.parse(localStorage.getItem("isAuthenticated")) && 
          <button
          className="btn btn-primary"
          onClick={() => {
            localStorage.clear();
            this.props.history.push("/login");
          }}
        >
          LOGOUT
        </button>}
          
        </div>
      </div>
    );
  }
}
