import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";
import "./SubscriptionPage.css";
import Card from "../Card/Card";
import item1 from "../../images/book.png";
import item2 from "../../images/speak-for-change.jpg";
import item3 from "../../images/together.png";
import item5 from "../../images/hope.png";
import axios from "axios";
import { baseURL } from "../../baseURL";

class SubscriptionPage extends React.Component {
  componentDidMount() {
    axios
      .get(`${baseURL}/subscription/get`)
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.data.map((item) => ({
            id: item.PlanId,
            name: item.PlanName,
            amountPerMonth: item.Amount,
            description: item.Description.split("\\n"),
          })),
        });
      })
      .catch((err) => console.log(err));
  }
  state = {
    siderDrawerOpen: false,
    donor: true,
    data: [
      // {
      //   id: 0,
      //   name: "SILVER",
      //   amountPerMonth: 10,
      //   description:
      //     ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut", "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"],
      // },
      // {
      //   id: 0,
      //   name: "SILVER",
      //   amountPerMonth: 10,
      //   description:
      //     ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut", "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"],
      // },
      // {
      //   id: 0,
      //   name: "SILVER",
      //   amountPerMonth: 10,
      //   description:
      //     ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut", "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"],
      // },
      // {
      //   id: 1,
      //   name: "GOLD",
      //   amountPerMonth: 100,
      //   description:
      //     "Lorem ipsum tion ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      // },
      // {
      //   id: 2,
      //   name: "PLATINUM",
      //   amountPerMonth: 1000,
      //   description:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      // },
    ],
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  subscribe = (id) => {
    console.log("subscription id =>", id);
    axios.put(`${baseURL}/subscription/assign?ngoId=${localStorage.getItem("ngoID")}&planId=${id}`)
    .then(res=>{
      localStorage.setItem("ngoPlanID", id);
      localStorage.setItem("ngoSubscription", true)

      this.props.history.push('/')
  })
    .catch(console.log)
  };

  render() {
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
    return (
      <div className="subscription">
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="alert alert-color text-center " role="alert">
          <strong>Subscribe</strong> for the greater cause !
        </div>
        <div className="container">
          <div className="row">
            {this.state.data.map((plan, i) => (
              <div
                style={{ display: "flex" }}
                className={`col-lg-4 col-md-${i === 2 ? 12 : 6} col-sm-12`}
              >
                <div class="card">
                  <div class="card-body">
                    <h6 class="card-title">{plan.name}</h6>
                    <hr />
                    <div className="amount-container">
                      <div className="amount-tag">
                        <span className="amount">{plan.amountPerMonth}</span>{" "}
                        PKR/month
                      </div>
                      {/* <div className="amount-tag">
                        <span className="amount">
                          {plan.amountPerMonth * 12}
                        </span>{" "}
                        PKR/year
                      </div> */}
                    </div>
                    <button
                      onClick={() => this.subscribe(plan.id)}
                      class="btn btn-primary"
                    >
                      GET STARTED
                    </button>
                    <ul>
                      {plan.description.map((text) => (
                        <li>
                          <p class="card-text">{text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SubscriptionPage;
