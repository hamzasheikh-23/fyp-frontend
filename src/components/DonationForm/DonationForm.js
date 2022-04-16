import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./DonationForm.css";
import StarRatingComponent from "react-star-rating-controlled-component";
import DummyImage from "./DummyImage";
import axios from "axios";
import { FaTimesCircle } from "react-icons/fa";
// import GoogleMap from '../GoogleMap/GoogleMap';
import history from "../../assets/history";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ItemDonation } from "../../actions";
// import FileBase64 from "react-file-base64";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialDonationState = {
  rating: 0,
  category: "Clothes",
  itemDescription: "",
  itemQuantity: "",
  itemTitle: "",
  itemWeight: "",
  condition: "Used",
  ratingError: "",
  itemDescriptionError: "",
  itemQuantityError: "",
  itemTitleError: "",
  itemWeightError: "",
  itemPic: [],
  categoriesArr: [],
  expirationDate: new Date(),
  base64Images:[]
};

const requireExpirationDate = ["Food", "Medicine"];

class DonationForm extends Component {
  constructor() {
    super();

    this.state = initialDonationState;
  }

  componentDidMount() {
    const temp = [
      {
        id: 0,
        name: "Cloth",
      },
      {
        id: 1,
        name: "Medicine",
      },
      {
        id: 2,
        name: "Toy",
      },
      {
        id: 3,
        name: "Food",
      },
    ];
    this.setState({ categoriesArr: temp });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  DonationFormInputChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    console.log(event.target.value);
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  ImagefileSelectedHandler = (e) => {
    // console.log("file", e.target.files);
    // let idCardBase64 = "";
    this.getBase64(e.target.files[0], (result) => {
      // console.log('result', result, this.state.base64Images)
      // idCardBase64 = result;
      this.setState({base64Images: [...this.state.base64Images, {name: e.target.files[0].name ,base64:result}]})
    });
    this.setState(
      { itemPic: [...this.state.itemPic, ...e.target.files] },
      function () {
        // for (let index = 0; index < this.state.itemPic.length; index++) {
        //    console.log(this.state.itemPic[index].name)
        // }
        //  this.state.itemPic.foreach(
        //      (item)=>{
        //          console.log(item.name)
        //      }
        //  );
        // console.log(this.state.itemPic)
        // console.log(this.state.itemPic[0].name)
      }
    );
  };

  RemoveImg = (event, img) => {
    // console.log(img.name);

    this.setState((prev) => ({
      itemPic: prev.itemPic.filter((el) => el.name !== img.name),
    }));
    this.setState((prev) => ({
      base64Images: prev.base64Images.filter((el) => el.name !== img.name),
    }));
    // console.log(this.state.itemPic);
  };

  displayImg = () => {
    const images = this.state.itemPic.map((img) => {
      return (
        <div key={img}>
          <i onClick={(event) => this.RemoveImg(event, img)}>
            <FaTimesCircle size="1.15rem" />
          </i>
          <div className="upload-pic-container">
            <img src={URL.createObjectURL(img)} alt="..." />
          </div>
        </div>
      );
    });
    return <div className="item-pic ">{images}</div>;
  };

  Donationvalidation = (e) => {
    let itemDescriptionError = "";
    let ratingError = "";
    let itemTitleError = "";
    let itemQuantityError = "";
    let itemWeightError = "";

    if (!this.state.itemDescription) {
      itemDescriptionError = "*required";
    }

    if (!this.state.itemTitle) {
      itemTitleError = "*required";
    }

    if (!this.state.itemQuantity) {
      itemQuantityError = "*required";
    }

    if (!this.state.itemWeight) {
      itemWeightError = "*required";
    }

    if (this.state.rating < 1) {
      ratingError = "*please rate condition";
    }

    if (
      ratingError ||
      itemDescriptionError ||
      itemWeightError ||
      itemQuantityError ||
      itemTitleError
    ) {
      this.setState({
        ratingError,
        itemDescriptionError,
        itemWeightError,
        itemQuantityError,
        itemTitleError,
      });
      return false;
    }

    return true;
  };

  DonationFormSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = this.Donationvalidation();
    console.log("isValid: ", isValid, this.state.base64Images);
    if (isValid) {
      // let picnames= this.state.itemPic.map((pic)=>{
      //     return pic.name;
      //     });
      const DonationData = {
        Rating: this.state.rating,
        Category: this.state.category,
        Description: this.state.itemDescription,
        Title: this.state.itemTitle,
        Quantity: this.state.itemQuantity,
        Weight: this.state.itemWeight,
        Condition: this.state.condition,
        DonorId: localStorage.getItem("donorId"),
        // status: "Pending",
        // Images: this.state.base64Images,
        Image1: this.state.base64Images[0]===undefined? null: this.state.base64Images[0],
        Image2: this.state.base64Images[1]===undefined? null: this.state.base64Images[1],
        Image3: this.state.base64Images[2]===undefined? null: this.state.base64Images[2],

        ExpirationDate: requireExpirationDate.includes(this.state.category)
          ? this.state.expirationDate
          : null,

      };
      console.log('data', DonationData)
      // axios
      // .post("https://localhost:44357/donation/post", DonationData)
      // .then((res) => {
      //    // this.props.history.push("/profile")
      //       this.props.history.push({
      //   pathname: "/googleMap",
      //   state: { data: DonationData },
      // });
      //   console.log("response: ", res);
      // })
      // .catch((err) => {
      //   console.log("error: ", err);
      // });

      this.setState(initialDonationState);
      this.props.history.push({
        pathname: "/googleMap",
        state: { data: DonationData },
      });
    }
  };
  // getFiles(files){
  //   console.log('files', files)
  //   this.setState({ itemPic: [...this.state.itemPic, files[0]] },()=>console.log('files', this.state.itemPic))
  // }
  render() {
    const { rating } = this.state;
    return (
      <div className="my-donation-page">
        <div className="container">
          <h1 className="blue-heading donation-heading">Make A Donation</h1>

          {/* pictures */}
          <div className="account-pic-container">
            <div className="row">
              <div className="col-4 main-pic-container">
                <DummyImage picture="giftbox" />
              </div>
              <div className="col-4 main-pic-container">
                <DummyImage picture="heart-img" />
              </div>
              <div className="col-4 main-pic-container">
                <DummyImage picture="book" />
              </div>
            </div>
          </div>

          {/* donation form */}
          <form
            action="/"
            className="my-donation-form"
            onSubmit={this.DonationFormSubmitHandler}
            noValidate
          >
            <div className="form-group">
              <label htmlFor="item-title" className="my-donation-label">
                Title
              </label>
              <input
                name="item-title"
                value={this.state.itemTitle}
                onChange={(event) =>
                  this.DonationFormInputChange(event, "itemTitle")
                }
                id="item-title"
                placeholder="Item Title"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="my-donation-label">
                Category
              </label>
              <select
                name="category"
                value={this.state.category}
                onChange={(event) =>
                  this.DonationFormInputChange(event, "category")
                }
                id="category"
                className="form-control"
              >
                {this.state.categoriesArr.map((option) => (
                  <option value={option.name}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="item-quantity" className="my-donation-label">
                  Quantity
                </label>
                <input
                  name="item-quantity"
                  value={this.state.itemQuantity}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "itemQuantity")
                  }
                  type="number"
                  id="item-quantity"
                  placeholder="Quantity"
                  className="form-control"
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="item-weight" className="my-donation-label">
                  Weight
                </label>
                <input
                  type="number"
                  name="item-weight"
                  value={this.state.itemWeight}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "itemWeight")
                  }
                  id="item-weight"
                  placeholder="Weight in kg"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="item-description" className="my-donation-label">
                Description
              </label>

              <textarea
                name="item-description"
                // rows="10"
                // cols="50"
                value={this.state.itemDescription}
                onChange={(event) =>
                  this.DonationFormInputChange(event, "itemDescription")
                }
                id="item-description"
                placeholder="Add Item Description"
                className="form-control"
              ></textarea>
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.itemDescriptionError}
              </div>
            </div>

            <div className="form-group">
              <label>Upload Item Image(s)</label>
              <div className="item-pic-container ">
                {/* <FileBase64 disabled={this.state.itemPic.length > 2 ? true : false} multiple={true} onDone={this.getFiles.bind(this)} /> */}
                <input
                  type="file"
                  multiple
                  onChange={this.ImagefileSelectedHandler}
                  disabled={this.state.itemPic.length > 2 ? true : false}
                />

                <div>
                  {this.state.itemPic.length > 0 ? this.displayImg() : null}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group my-condition-radio">
                  <label>Select One:</label>
                  <br />
                  <label className="radio">
                    <input
                      type="radio"
                      name="condition"
                      value="Used"
                      checked={this.state.condition === "Used"}
                      onChange={(event) =>
                        this.DonationFormInputChange(event, "condition")
                      }
                    />{" "}
                    Used
                    <span></span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="condition"
                      value="Unused"
                      checked={this.state.condition === "Unused"}
                      onChange={(event) =>
                        this.DonationFormInputChange(event, "condition")
                      }
                    />{" "}
                    Unused
                    <span></span>
                  </label>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="form-group">
                  <label style={{ marginBottom: "0px" }}>
                    Please rate condition of item
                    <span
                      style={{
                        fontSize: "12.8px",
                        color: "#DC3545",
                        marginLeft: "10px",
                      }}
                    >
                      {this.state.ratingError}
                    </span>
                  </label>
                  <br />

                  <StarRatingComponent
                    className="star-rating"
                    name="rate"
                    starCount={5}
                    value={rating}
                    emptyStarColor={"#6c6c6c"}
                    onStarClick={this.onStarClick.bind(this)}
                  />
                </div>
              </div>
              {requireExpirationDate.includes(this.state.category) && (
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Expiration Date:</label>
                    <br />
                    <DatePicker
                      selected={this.state.expirationDate}
                      onChange={(date) => {
                        console.log("date", date);
                        this.setState({ expirationDate: date });
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* <GoogleMap/> */}
            <button style={{ outline: "none" }} className="my-btn donation-btn">
              NEXT
            </button>
            <p>
              <Link to="/" style={{ color: "#6c6c6c" }}>
                Back to Home Page
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { data: state.donation };
};
export default connect(mapStateToProps, { ItemDonation })(DonationForm);
