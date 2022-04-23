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
import { toast } from 'react-toastify';
// import FileBase64 from "react-file-base64";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const initialDonationState = {
  rating: 0,
  category: "Clothes",
  itemDescription: "",
  itemQuantity: "",
  itemQuantityPerUnit: "",
  itemTitle: "",
  itemWeight: "",
  condition: 1,
  ratingError: "",
  itemDescriptionError: "",
  itemQuantityError: "",
  itemTitleError: "",
  itemWeightError: "",
  itemQuantityPerUnitError: "",
  // itemPic: [],
  categoriesArr: [],
  expirationDate: new Date(),
  expirationDateErr: null,
  base64Images: [],
  donationId: null,
  address:"",
  addressError:"",
};

const requireExpirationDate = [3, 2];

class DonationForm extends Component {
  constructor() {
    super();

    this.state = initialDonationState;
  }

  componentDidMount() {
    console.log("donation form", this.props.history.location.state?.data);

    // const temp = [
    //   {
    //     id: 0,
    //     name: "Cloth",
    //   },
    //   {
    //     id: 1,
    //     name: "Medicine",
    //   },
    //   {
    //     id: 2,
    //     name: "Toy",
    //   },
    //   {
    //     id: 3,
    //     name: "Food",
    //   },
    // ];
    // this.setState({ categoriesArr: temp });

    axios
      .get("https://localhost:44357/donation/category/get")
      .then((res) => {
        const isEdit = this.props.history.location.state?.data ? true : false;
        if (isEdit) {
          const {
            address,
            title,
            quantity,
            quantityPerUnit,
            date,
            weight,
            description,
            category,
            donationId,
            rating,
            condition,
            itemImg1,
            itemImg2,
            itemImg3,
            image1Name,
            image2Name,
            image3Name,
            postedDate,
            status,
            isActive,
          } = this.props.history.location.state.data;
          this.setState({
            address,
            rating,
            donationId,
            itemDescription: description,
            itemQuantity: quantity,
            itemQuantityPerUnit: quantityPerUnit,
            itemTitle: title,
            itemWeight: weight,
            condition: condition == "Unused" ? 1 : 2,
            // itemPic: [
            //   (image1Name && itemImg1) && { name: image1Name, base64: itemImg1 },
            //   (image2Name && itemImg2) && { name: image2Name, base64: itemImg2 },
            //   (image3Name && itemImg3) && { name: image3Name, base64: itemImg3 },
            // ].filter(item=>item),
            categoriesArr: [],
            expirationDate: moment(date,'LL hh:mm:ss').utc(true).toDate(),
            expirationDateErr: null,
            base64Images: [
              (image1Name && itemImg1) && { name: image1Name, base64: itemImg1 },
              (image2Name && itemImg2) && { name: image2Name, base64: itemImg2 },
              (image3Name && itemImg3) && { name: image3Name, base64: itemImg3 },
            ].filter(item=>item),
          },()=>console.log('check state', this.state));
        }
        // console.log(res)
        this.setState({
          category: isEdit
            ? res.data.find((item) => item.DonationCategory === this.props.history.location.state?.data?.category)
                ?.CategoryId
            : res.data.length > 0
            ? res.data[0].CategoryId
            : 0,
          categoriesArr: res.data.map((item) => ({
            id: item.CategoryId,
            name: item.DonationCategory,
          })),
        });
      })
      .catch((err) => console.log("error in getting categories api", err));
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  DonationFormInputChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    console.log('DonationFormInputChange',event.target.value);
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  ImagefileSelectedHandler = (e) => {
    console.log("file", e.target.files);
    // let idCardBase64 = "";
    var pattern = /[\/](jpg|png|jpeg)$/i;
    e.persist();
    if (e.target.files[0].type.match(pattern)) {
      this.getBase64(e.target.files[0], (result) => {
        this.setState({
          base64Images: [
            ...this.state.base64Images,
            { name: e.target.files[0].name, base64: result },
          ],
          imageErr: null,
        });
      });
      // this.setState({
      //   itemPic: [...this.state.itemPic, ...e.target.files],
      //   imageErr: null,
      // });
    } else {
      this.setState({ imageErr: "Invalid file format" });
    }
  };

  RemoveImg = (event, img) => {
    // console.log(img.name);

    // this.setState((prev) => ({
    //   itemPic: prev.itemPic.filter((el) => el.name !== img.name),
    // }));
    this.setState((prev) => ({
      base64Images: prev.base64Images.filter((el) => el.name !== img.name),
    }));
    // console.log(this.state.itemPic);
  };

  displayImg = () => {
    const isEdit = this.props.history.location.state?.data ? true : false;
    console.log('display image', this.state.itemPic, this.state.base64Images)
    const images = this.state.base64Images.map((img,i) => {
      return (
        <div key={i}>
          <i onClick={(event) => this.RemoveImg(event, img)}>
            <FaTimesCircle size="1.15rem" />
          </i>
          <div className="upload-pic-container">
            <img src={ img?.base64} alt="..." />
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
    let itemQuantityPerUnitError = "";
    let itemWeightError = "";
    let addressError = "";

    const validTitle = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const validWeight = /^[0-9]*(\.[0-9]{0,2})?$/;
    const validDesc = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces

    if (!this.state.itemDescription) {
      itemDescriptionError = "required";
    } else if (!validDesc.test(this.state.itemDescription)) {
      itemDescriptionError = "No boundary spaces allowed";
    }

    if (!this.state.address) {
      addressError = "required";
    } else if (!validDesc.test(this.state.address)) {
      addressError = "No boundary spaces allowed";
    }

    if (!this.state.itemTitle) {
      itemTitleError = "required";
    } else if (!validTitle.test(this.state.itemTitle)) {
      itemTitleError =
        "Only alphabets, No special characters and boundary spaces allowed";
    } else if (
      this.state.itemTitle.length < 5 ||
      this.state.itemTitle.length > 30
    ) {
      itemTitleError = "Title must be between 5 to 30 characters";
    }

    if (!this.state.itemQuantityPerUnit) {
      itemQuantityPerUnitError = "required";
    } else if (
      this.state.itemQuantityPerUnit < 1 ||
      this.state.itemQuantityPerUnit > 50
    ) {
      itemQuantityPerUnitError = "unit must be in range 1 to 50";
    }

    if (!this.state.itemQuantity) {
      itemQuantityError = "required";
    } else if (this.state.itemQuantity < 1 || this.state.itemQuantity > 1000) {
      itemQuantityError = "Quantity must be in range 1 to 1000";
    }

    if (!this.state.itemWeight) {
      itemWeightError = "required";
    } else if (this.state.itemWeight < 0.1 || this.state.itemWeight > 80) {
      itemWeightError = "Weight must be in range 0.1 to 80 kg ";
    } else if (!validWeight.test(this.state.itemWeight)) {
      itemWeightError = "Only two decimal places allowed";
    }

    if (this.state.rating < 1) {
      ratingError = "please rate condition";
    }

    if (
      ratingError ||
      itemDescriptionError ||
      itemWeightError ||
      itemQuantityError ||
      itemQuantityPerUnitError ||
      itemTitleError ||
      this.state.imageErr ||
      this.state.expirationDateErr ||
      addressError
    ) {
      this.setState({
        ratingError,
        addressError,
        itemDescriptionError,
        itemWeightError,
        itemQuantityError,
        itemQuantityPerUnitError,
        itemTitleError,
      });
      return false;
    }

    return true;
  };

  DonationFormSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = this.Donationvalidation();
    console.log("isValid: ", isValid, this.state);
    if (isValid) {
      // let picnames= this.state.itemPic.map((pic)=>{
      //     return pic.name;
      //     });
      const DonationData = {
        Address: this.state.address,
        Rating: this.state.rating,
        Category: parseFloat(this.state.category),
        Description: this.state.itemDescription,
        Title: this.state.itemTitle,
        Quantity: parseFloat(this.state.itemQuantity),
        Weight: parseFloat(this.state.itemWeight),
        ConditionId: this.state.condition,
        DonorId: localStorage.getItem("donorID"),
        QuantityPerUnit: parseFloat(this.state.itemQuantityPerUnit),
        // status: "Pending",
        // Images: this.state.base64Images,
        Image1base64:
          this.state.base64Images[0] === undefined
            ? null
            : this.state.base64Images[0].base64,
        Image2base64:
          this.state.base64Images[1] === undefined
            ? null
            : this.state.base64Images[1].base64,
        Image3base64:
          this.state.base64Images[2] === undefined
            ? null
            : this.state.base64Images[2].base64,
        Image1Name:
          this.state.base64Images[0] === undefined
            ? null
            : this.state.base64Images[0].name,
        Image2Name:
          this.state.base64Images[1] === undefined
            ? null
            : this.state.base64Images[1].name,
        Image3Name:
          this.state.base64Images[2] === undefined
            ? null
            : this.state.base64Images[2].name,

        ExpirationDate: requireExpirationDate.includes(Number(this.state.category))
          ? this.state.expirationDate
          : null,
      };
      console.log("data", DonationData);
      const isEdit = this.props.history.location.state?.data ? true : false;

      if(isEdit){
        axios.put(`https://localhost:44357/donation/edit/${this.state.donationId} `,DonationData)
        .then(res=>{
          this.props.history.push('/profile');
          
        })
        .catch(err=>{
          console.log('Put Error',err)
          toast.error(`Some error Occured: ${err}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        });
      }else{
        axios.post(`https://localhost:44357/donation/post`,DonationData)
        .then(res=>{
          this.props.history.push('/profile');
          
        })
        .catch(err=>{
          console.log('Post Error',err);
          toast.error(`Some error Occured: ${err}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        });
      }

      // this.setState(initialDonationState);
      // this.props.history.push({
      //   pathname: "/googleMap",
      //   state: { data: DonationData, isEdit, donationId: this.state.donationId },
      // });
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
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.itemTitleError}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
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
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
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
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.itemQuantityError}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label
                  htmlFor="item-quantity-per-unit"
                  className="my-donation-label"
                >
                  Quantity Per Unit
                </label>
                <input
                  name="item-quantity-per-unit"
                  value={this.state.itemQuantityPerUnit}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "itemQuantityPerUnit")
                  }
                  type="number"
                  id="item-quantity-per-unit"
                  placeholder="Quantity Per Unit"
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.itemQuantityPerUnitError}
                </div>
              </div>
              <div className="col-lg-6">
                <label htmlFor="item-weight" className="my-donation-label">
                  Weight (Kg)
                </label>
                <input
                  type="number"
                  name="item-weight"
                  value={this.state.itemWeight}
                  onChange={(event) =>
                    this.DonationFormInputChange(event, "itemWeight")
                  }
                  id="item-weight"
                  placeholder="Weight"
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.itemWeightError}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pickup-address" className="my-donation-label">
                Pickup Address
              </label>

              <textarea
                name="pickup-address"
                // rows="10"
                // cols="50"
                value={this.state.address}
                onChange={(event) =>
                  this.DonationFormInputChange(event, "address")
                }
                id="pickup-address"
                placeholder="Add Pickup Address"
                className="form-control"
              ></textarea>
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.addressError}
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
                  accept="image/*"
                  multiple
                  onChange={this.ImagefileSelectedHandler}
                  disabled={this.state.base64Images.length > 2 ? true : false}
                />

                <div>
                  {this.state.base64Images.length > 0 ? this.displayImg() : null}
                </div>
              </div>
              <div
                style={{
                  fontSize: "12.8px",
                  color: "#DC3545",
                  marginLeft: "10px",
                }}
              >
                {this.state.imageErr}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="form-group my-condition-radio">
                  <label>Select One:</label>
                  <br />
                  <div>
                    <label className="radio">
                      <input
                        type="radio"
                        name="condition"
                        value={2}
                        checked={this.state.condition == 2}
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
                        value={1}
                        checked={this.state.condition == 1}
                        onChange={(event) =>
                          this.DonationFormInputChange(event, "condition")
                        }
                      />{" "}
                      Unused
                      <span></span>
                    </label>
                  </div>
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
              {requireExpirationDate.includes(parseFloat(this.state.category)) && (
                <div className="col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Expiration Date:</label>
                    <br />
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.expirationDate}
                      onChange={(date) => {
                        console.log("date", date, moment(date).isAfter(), date.getDate(), date.getMonth());
                        if (moment(date).isAfter()) {
                          this.setState({
                            expirationDate: date,
                            expirationDateErr: null,
                          });
                        } else {
                          this.setState({
                            expirationDateErr: "Please select a future date",
                          });
                        }
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12.8px",
                        color: "#DC3545",
                        marginLeft: "10px",
                      }}
                    >
                      {this.state.expirationDateErr}
                    </span>
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
