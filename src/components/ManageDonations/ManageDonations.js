import React, { Component } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import Footer from "../Footer/Footer";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import Card from "react-bootstrap/Card";
// import {CardDeck} from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import CardsGrid from "../CardsGrid/CardsGrid";

import "bootstrap/dist/css/bootstrap.min.css";

import "./ManageDonations.css";
import PreviousCard from "./PreviousCard";
import { checkProperty } from "../../assets/utils";
import { baseURL } from "../../baseURL";

class ManageDonations extends Component {
  componentDidMount() {
    this.getData();
    // console.log('manage donation', this.props.history)
  }

  getData = () => {
    axios
      .get(
        `${baseURL}/case/get?ngoId=${localStorage.getItem(
          "ngoID"
        )}`
      )
      .then((res) => {
        if (!res.data.noData) {
          const stories = res.data.cases
            .map((item) => ({
              caseId: item.CaseId,
              ngoID: item.NGOId,
              caseTitle: item.CaseTitle,
              quantity: item.Quantity,
              unit: item.Unit,
              description: item.Description,
              imageBase64: item.ImageBase64,
              imageName: item.ImageName
                ? require(`../../serverImages/cases/${item.ImageName}`)
                : "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=",
              category: item.CategoryId,
              categoryName: item.Category,
              status: item.Status,
              isActive: JSON.parse(item.IsActive),
              postedDate: checkProperty("PostedDate", item)
                ? moment(item.PostedDate).format("LL hh:mm:ss")
                : "",
            }))
            .filter((item) => {
              // console.log('filter',item.status!=="Deleted", item.status)
              return item.status !== "Deleted";
            });

          console.log("manage donations", stories);

          this.setState({ arrayforcards: [...stories] });
        } else {
          this.setState({ arrayforcards: [] });
        }
      })
      .catch((err) => console.log("Requested Items", err));
  };

  constructor() {
    super();
    this.state = {
      open: false,
      showDonation: false,
      showStory: true,

      //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***

      arrayforcards: [
        // {
        //   caseId:"1",
        //   title:'abc',
        //   description:'abs'
        // },
        // {
        //   caseId:"2",
        //   title:'abc',
        //   description:'abs'
        // },{
        //   caseId:"3",
        //   title:'abc',
        //   description:'abs'
        // },{
        //   caseId:"4",
        //   title:'abc',
        //   description:'abs'
        // }
      ],

      //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***

      ngo_id: localStorage.getItem("userID"),
      siderDrawerOpen: false,
    };
  }

  state = {
    siderDrawerOpen: false,
  };
  ////
  updateList = () => {
    axios
      .get(`/api/getRequestedItemsByNgoId/${localStorage.getItem("userID")}`)
      .then((res) => {
        const stories = res.data.filter(
          (story) => story.status === "Pending" || story.status === "Approved"
        );

        this.setState({ arrayforcards: [...stories] });
      })
      .catch((err) => console.log("Requested Items", err));
  };
  //////

  ////

  deleteCard = (id) => {
    console.log(id);
    // console.log('clicked',this.props.itemId)
    axios
      .delete("/api/deleteRequest/" + id)
      .then((res) => {
        axios
          .get(
            `/api/getRequestedItemsByNgoId/${localStorage.getItem("userID")}`
          )
          .then((res) => {
            const stories = res.data.filter(
              (story) =>
                story.status === "Pending" || story.status === "Approved"
            );

            this.setState({ arrayforcards: [...stories] });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  ///////
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
        <div className="my-background" style={{ height: "100%" }}>
          <div className="container">
            <hr></hr>
            <h1 className="blue-heading success-main-heading">
              Manage Donations
            </h1>
            <br></br>
            <ul className="u-list">
              <div className="divforbuttons">
                <Link to="/askdonation">
                  <Button variant="outline-info" className="buttonlist">
                    <li>Ask for a new Donation</li>
                  </Button>
                </Link>

                <Link to="/donor-replies">
                  <Button variant="outline-info" className="buttonlist">
                    <li>View replies from Donors</li>
                  </Button>
                </Link>
                <Link to="/donor-donations">
                  <Button variant="outline-info" className="buttonlist">
                    <li>View Donor Donations</li>
                  </Button>
                </Link>
              </div>
              <hr></hr>
              <h3>Previously Asked Donations:</h3>

              <div className="cards-container-ngo">
                {this.state.arrayforcards.map((data) => (
                  <PreviousCard
                    {...data}
                    getData={this.getData}
                    history={this.props.history}
                  />
                ))}
              </div>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ManageDonations;
