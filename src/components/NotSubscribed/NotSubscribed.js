import React from "react";
import BackDrop from "../BackDrop/BackDrop";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./NotSubscribed.scss";

export default class NotSubscribed extends React.Component {
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
    console.log("not", this.props.history);
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} />
        <SideDrawer show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="not-subscribed-page container">
          <div className="main center">You are not subscribed!</div>
          <div className="sub-text center">
            Please subscribe to one of our subscription plans.
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.props.history.push("/subscription");
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    );
  }
}
