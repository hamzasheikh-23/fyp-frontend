import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./alreadyLoggedIn.scss";

export default class AlreadyLoggedIn extends React.Component {
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
    console.log("already", this.props.history);
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} />
        <SideDrawer show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="already-logged-in-page container">
          <div className="main center">You are already logged in !</div>
          <div className="sub-text center">
            Please logout to signup or login with a different account.
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.clear();
              this.props.history.push("/login");
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  }
}
