import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";
import "./ConfirmedDonations.scss";
import Card from "./Card";
import item1 from "../../images/book.png";
import item2 from "../../images/speak-for-change.jpg";
import item3 from "../../images/together.png";
import item5 from "../../images/hope.png";
import axios from "axios";
import data from "./temp";
import moment from "moment";
import { checkProperty } from "../../assets/utils";
import { baseURL } from "../../baseURL";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class ConfirmedDonations extends React.Component {
  componentDidMount() {
    // this.setState({
    //   items: data.map((item) => ({
    //     title: item.Title,
    //     quantity: item.Quantity,
    //     quantityPerUnit: item.QuantityPerUnit,
    //     date: item.ExpiryDate
    //       ? moment(item.ExpiryDate).format("LL hh:mm:ss")
    //       : null,
    //     weight: item.Weight,
    //     description: item.Description,
    //     category: item.Category,
    //     donationId: item.DonationId,
    //     rating: item.Rating,
    //     condition: item.Condition,
    //     itemImg1: item.Image1base64,
    //     itemImg2: item.Image2base64,
    //     itemImg3: item.Image3base64,
    //     image1Name: item.Image1Name,
    //     image2Name: item.Image2Name,
    //     image3Name: item.Image3Name,
    //     postedDate: item.PostedDate
    //       ? moment(item.PostedDate).format("LL hh:mm:ss")
    //       : null,
    //     status: item.Status,
    //     isActive: item.IsActive,
    //   })),
    // });
    this.getData();
  }

  getData = () => {
    console.log("get data called");
    axios
      .get(
        `${baseURL}/response/get?ngoId=${localStorage.getItem(
          "ngoID"
        )}&status=Approved`
      )
      .then((res) => {
        console.log("res", res);

        if (!res.data.noData) {
          this.setState({
            items: res.data.reply
              .map((item) => ({
                title: item.Title,
                address: item.PickupAddress,
                dropof: item.Address,
                quantity: item.Quantity,
                quantityPerUnit: item.QuantityPerUnit,
                date: checkProperty("ExpiryDate", item)
                  ? moment(item.ExpiryDate).format("LL hh:mm:ss")
                  : null,
                weight: item.Weight,
                message: item.Message,
                description: item.Description,
                responseId: item.ResponseId,
                category: item.DonationCategory,
                donationId: item.DonationId,
                rating: item.Rating,
                condition: item.Condition,
                itemImg1: item.DonationImage1,
                itemImg2: item.DonationImage2,
                itemImg3: item.DonationImage3,
                image1Name: item.Image1Name,
                image2Name: item.Image2Name,
                image3Name: item.Image3Name,
                postedDate: checkProperty("PostedDateTime", item)
                  ? moment(item.PostedDateTime).format("LL hh:mm:ss")
                  : null,
                status: item.Status,
                isActive: JSON.parse(item.isActive),
                serviceAmount: 300,
                deliveryAmount: randomIntFromInterval(300, 500),
                vat: 2.66,
              }))
              .filter((item) => item.status !== "Deleted"),
          });
        } else {
          this.setState({
            items: [],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  state = {
    siderDrawerOpen: false,
    donor: true,
    items: [],
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
    console.log("profile", this.props);
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}
        <h1 className="blue-heading success-main-heading">
          Confirmed Donor Donations
        </h1>
        <div className="container item-card-container-donor-reply">
          {this.state.items.map((item) => {
            // console.log(item, "worked");
            return (
              <Card
                getData={() => this.getData()}
                history={this.props.history}
                totalAmount={parseFloat(
                  item.serviceAmount +
                    item.deliveryAmount +
                    item.vat
                )}
                {...item}
              />
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default ConfirmedDonations;
