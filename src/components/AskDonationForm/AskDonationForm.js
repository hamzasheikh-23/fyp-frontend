import React, { Component } from "react";
import { getCurrentDate } from "../../utils";

// import { FormInput } from "shards-react";
// import { FormTextarea } from "shards-react";
import { FaTimesCircle } from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";

import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import "./AskDonationForm.css";
import "../SuccessStoryForm/SuccessStoryForm.css";
import "../SuccessStoryForm/ImageUpload.css";

import axios from "axios";

const initialDonationFormState = {
  donationTitle: "",
  itemQuantity: "",
  donationTitleError: "",
  itemQuantityError: "",
  donationDescription: "",
  donationDescriptionError: "",
  donationCategoryError: "",
  file: "",
  imageErr: "",
  imagePreviewUrl: "",
  donationImageError: "",
  askDonationDate: getCurrentDate(),
  categoryType: "",
  categoriesArr: [],
  unitsArr: ["Kg", "Pounds", "Liter", "Pieces"],
  unit: "Kg",
  unitErr: "",
  base64Images: [],
};

class AskDonationForm extends Component {
  constructor() {
    super();
    this.state = initialDonationFormState;
  }

  componentDidMount() {
    axios
      .get("https://localhost:44357/donation/category/get")
      .then((res) => {
        const isEdit = this.props.history?.location?.state?.data ? true : false;
        if (isEdit) {
          const {
            caseId,
            ngoID,
            caseTitle,
            quantity,
            unit,
            postedDate,
            description,
            imageBase64,
            imageName,
            status,
            isActive,
          } = this.props.history.location.state.data;
          this.setState(
            {
              donationTitle: caseTitle,
              donationTitleError: "",
              donationDescription: description,
              donationDescriptionError: "",
              donationCategoryError: "",
              donationImageError: "",
              unit: unit,
              itemQuantity: quantity,
              base64Images: [
                imageName &&
                  imageBase64 && {
                    name: imageName,
                    base64: imageBase64,
                    edit: true,
                  },
              ].filter((item) => item),
            },
            () => console.log("check state", this.state)
          );
        }
        console.log(res);
        this.setState({
          categoryType: isEdit
            ? this.props.history.location.state?.data?.category
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

  state = {
    siderDrawerOpen: false,
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  askDonationFormInputChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    // console.log(event.target.value);
  };

  donationValidation = (e) => {
    let donationDescriptionError = "";
    let donationTitleError = "";
    let donationCategoryError = "";
    let itemQuantityError = "";
    let unitErr = "";

    const validTitle = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const validDesc = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces

    if (!this.state.donationTitle) {
      donationTitleError = "required";
    } else if (!validTitle.test(this.state.donationTitle)) {
      donationTitleError =
        "Only alphabets, No special characters and boundary spaces allowed";
    } else if (
      this.state.donationTitle.length < 5 ||
      this.state.donationTitle.length > 30
    ) {
      donationTitleError = "Title must be between 5 to 30 characters";
    }

    if (!this.state.unit) {
      unitErr = "required";
    }

    if (!this.state.itemQuantity) {
      itemQuantityError = "required";
    } else if (this.state.itemQuantity < 1 || this.state.itemQuantity > 1000) {
      itemQuantityError = "Quantity must be in range 1 to 1000";
    }

    if (!this.state.donationDescription) {
      donationDescriptionError = "required";
    } else if (!validDesc.test(this.state.donationDescription)) {
      donationDescriptionError = "No boundary spaces allowed";
    }

    if (
      donationTitleError ||
      donationDescriptionError ||
      donationCategoryError ||
      this.state.imageErr ||
      itemQuantityError ||
      unitErr
    ) {
      this.setState({
        donationTitleError,
        itemQuantityError,
        donationDescriptionError,
        donationCategoryError,
        unitErr,
      });
      return false;
    }

    return true;
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(e.target.files[0]);
    reader.onloadend = () => {
      console.log("called ", file);
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  askDonationFormSubmitHandler = (e, formValues, dispatch) => {
    e.preventDefault();

    const isValid = this.donationValidation();
    console.log("isValid", isValid, this.state);
    if (isValid) {
      const askDonationData = {
        NGOId: parseFloat(localStorage.getItem("ngoID")),
        CaseTitle: this.state.donationTitle,
        Quantity: parseFloat(this.state.itemQuantity),
        Unit: this.state.unit,
        Description: this.state.donationDescription,
        // ImageBase64,
        // ImageName,
        CategoryId: parseFloat(this.state.categoryType),
      };

      console.log(askDonationData);

      // let data = new FormData();
      // for (var key in askDonationData) {
      //   data.set(key, askDonationData[key]);
      // }

      console.log("submittedData", askDonationData);
      // axios({
      //   method: "post",
      //   data: data,
      //   url: "https://localhost:44357/case/post ",
      //   // headers: { "Content-Type": "multipart/form-data" }, //to submit documents
      // });

      axios
        .post("https://localhost:44357/case/post ", askDonationData)
        .then((res) => {
          console.log(res.data);
          this.setState(initialDonationFormState);
          this.props.history.push("/");
        })
        .catch(console.log);
    }
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
    const isEdit = this.props.history.location.state?.data ? true : false;
    console.log("edit wala", isEdit);
    // let idCardBase64 = "";
    var pattern = /[\/](jpg|png|jpeg)$/i;
    e.persist();
    if (e.target.files[0].type.match(pattern)) {
      this.getBase64(e.target.files[0], (result) => {
        console.log("173 wala", isEdit);
        this.setState({
          base64Images: [
            ...this.state.base64Images,
            { name: e.target.files[0].name, base64: result, edit: false },
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
    // const isEdit = this.props.history.location.state?.data ? true : false;
    console.log("display image", this.state.itemPic, this.state.base64Images);
    const images = this.state.base64Images.map((img, i) => {
      console.log("latest", img);
      if (img.edit) {
        return (
          <div key={i}>
            <i onClick={(event) => this.RemoveImg(event, img)}>
              <FaTimesCircle size="1.15rem" />
            </i>
            <div className="upload-pic-container">
              <img src={require(`../../serverImages/${img.name}`)} alt="..." />
            </div>
          </div>
        );
      } else {
        return (
          <div key={i}>
            <i onClick={(event) => this.RemoveImg(event, img)}>
              <FaTimesCircle size="1.15rem" />
            </i>
            <div className="upload-pic-container">
              <img src={img?.base64} alt="..." />
            </div>
          </div>
        );
      }
    });

    return <div className="item-pic ">{images}</div>;
  };

  render() {
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt="No preview could be fetched" />
      );
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}

        <div className={"my-background-4"}>
          <div className="container" id="container">
            <h1 className="blue-heading success-main-heading">
              Ask for a Donation!
            </h1>

            {/* iconpicture */}

            {/* <div className="imagecont">
              <img src={this.props.iconimageurl} className="iconimage"></img>
            </div> */}

            {/* iconpicture */}

            <form
              className="success-story-form"
              onSubmit={this.askDonationFormSubmitHandler}
              noValidate
            >
              <hr></hr>

              <div className="form-group mb-2">
                <label htmlFor="donationTitle" className="my-story-label">
                  Title:
                </label>
                <input
                  placeholder="Add a title"
                  name="donationTitle"
                  value={this.state.donationTitle}
                  onChange={(event) =>
                    this.askDonationFormInputChange(event, "donationTitle")
                  }
                  id="donationtitle"
                  className="form-control"
                />

                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationTitleError}
                </div>
              </div>

              {/* catgories */}
              <div className="form-group mb-2">
                <label htmlFor="category" className="my-donation-label">
                  Category
                </label>
                <select
                  name="categoryType"
                  value={this.state.categoryType}
                  onChange={(event) =>
                    this.askDonationFormInputChange(event, "categoryType")
                  }
                  id="category"
                  className="form-control"
                >
                  {this.state.categoriesArr.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationCategoryError}
                </div>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="item-quantity" className="my-donation-label">
                  Quantity
                </label>
                <input
                  name="item-quantity"
                  value={this.state.itemQuantity}
                  onChange={(event) =>
                    this.askDonationFormInputChange(event, "itemQuantity")
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

              <div className="form-group mb-2">
                <label htmlFor="unit" className="my-donation-label">
                  Unit
                </label>
                <select
                  name="unit"
                  value={this.state.unit}
                  onChange={(event) =>
                    this.askDonationFormInputChange(event, "unit")
                  }
                  id="unit"
                  className="form-control"
                >
                  {this.state.unitsArr.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.unitErr}
                </div>
              </div>

              <div className="form-group mb-2">
                <label
                  htmlFor="donation-description"
                  className="my-story-label"
                >
                  Description:
                </label>

                <textarea
                  name="donation-description"
                  value={this.state.donationDescription}
                  onChange={(event) =>
                    this.askDonationFormInputChange(
                      event,
                      "donationDescription"
                    )
                  }
                  id="donation-description"
                  placeholder={"Describe the need in detail"}
                  className="form-control"
                  rows="3"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationDescriptionError}
                </div>
              </div>

              {/* <div className="form-group">
                <div className="previewComponent">
                  <label htmlFor="donation-image" className="my-story-label">
                    Cover Image:
                  </label>
                  <input
                    className="fileInput"
                    id="fileInput"
                    name="donation-image"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)}
                  />

                  <div className="imgPreview" id="imgPreview">
                    {$imagePreview}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.donationImageError}
                </div>
              </div> */}

              <div className="form-group mb-2">
                <label>Upload Cover Image</label>
                <div className="item-pic-container ">
                  {/* <FileBase64 disabled={this.state.itemPic.length > 2 ? true : false} multiple={true} onDone={this.getFiles.bind(this)} /> */}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={this.ImagefileSelectedHandler}
                    disabled={this.state.base64Images.length > 0 ? true : false}
                  />

                  <div>
                    {this.state.base64Images.length > 0
                      ? this.displayImg()
                      : null}
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

              {/* <hr></hr> */}
              <button
                className=" my-btn signup-btn"
                type="submit"
                onClick={this.askDonationFormSubmitHandler}
              >
                Submit Request
              </button>
            </form>

            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default AskDonationForm;
