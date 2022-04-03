import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from "../Footer/Footer";
import "./Profile.css";
import Card from "../Card/Card";
import item1 from "../../images/book.png";
import item2 from "../../images/speak-for-change.jpg";
import item3 from "../../images/together.png";
import item5 from "../../images/hope.png";
import axios from "axios";

class Profile extends React.Component {
  componentDidMount() {
    axios
      .get(`https://localhost:44357/donation/get/${localStorage.getItem("donorId")}`)
      .then((res) => {
        console.log(res)
        this.setState({ items: res.data.map(item=>({
          title:item.Title,
                quantity:item.Quantity,
                date:item.ExpiryDate,
                weight:item.Weight,
                quantityPerUnit:item.QuantityPerUnit,
                description:item.Description,
               // status:item,
        })) });
      })
      .catch((err) => console.log(err));
  }
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
  deleteItem = (item) => {
    // console.log('clicked',this.props.itemId)
    axios
      .delete(`/api/deleteDonatedItem/${item}`)
      .then((res) => {
        axios
          .get(`/api/getDonatedItems/${localStorage.getItem("loginId")}`)
          .then((res) => {
            this.setState({ items: [...res.data] });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
        <div className="alert alert-color text-center " role="alert">
          <strong>ThankYou</strong> so much for your Donations !
        </div>
        <div className="container item-card-container">
          {/* <Card
            // itemImg={'https://hanatichaeltblog.files.wordpress.com/2015/07/20150724_153445.jpg'}
            // itemImg1={'https://hanatichaeltblog.files.wordpress.com/2015/07/20150724_153445.jpg'}
            title="title"
            quantity={3}
            date={"12 March 2021"}
            weight={"1.50"}
            quantityPerUnit={"1"}
            description="I have my O-Levels and A-Levels books along with their notes. These books are expensive and are of no longer in my use. I hope someone else gets benefit from them."
            status="Approved"
          />
          <Card
            itemImg1={
              "https://is2.ecplaza.com/ecplaza2/products/a/a3/a38/429255138/4168030.jpg"
            }
            title="Category – Toys"
            description="My kids toys are all in good condition and are no longer in use as they have grown up. I would love to donate these preloved toys to a kid."
            status="Rejected"
          />
          <Card
            itemImg1={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyqRR2FZl7ucIzMQKufDnTTZYmuctJ-djGKw&usqp=CAU"
            }
            title="Category – Medicines"
            description="My Father was a Cancer patient and he passed away few days ago. We have his medicines that are no longer useful for us now. We want to donate these as a Sadqa-e-Jaria to a needy family."
            status="Pending"
          /> */}

          {this.state.items.map((item) => {
            console.log(item.donatedItem_id, "worked");
            return (
              // <Card
              // itemImg1={`http://localhost:8000/storage/cover_images/${item.images[0].imageurl}`}
              // itemImg2={item.images[1].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${item.images[1].imageurl}`}
              // itemImg3={item.images[2].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${item.images[2].imageurl}`}
              // title={item.category}
              // description={item.description}
              // status={item.status}
              // itemId={item.donatedItem_id}
              // delete={this.deleteItem}/>
              <Card
                title={item.title}
                quantity={item.quantity}
                date={item.date}
                weight={item.weight}
                quantityPerUnit={item.quantityPerUnit}
                description={item.description}
                status="Approved"
              />
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Profile;
