import React, { Component } from "react";
import { Label } from "react-bootstrap";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import "./ProceedOrderModal.css";
import { FaTimesCircle } from "react-icons/fa";
import { baseURL } from "../../baseURL";

class ProceedOrderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      msgErr: "",
      remainingRequiredQuantity: 0,
      remainingRequiredQuantityErr: "",
      remainingRequiredQuantityOriginal: 0,
      donationQuantity: "",
      donationQuantityErr: "",
      address: "",
      addressErr: "",
      base64Images: [],
      imageErr: null,
    };
  }

  componentDidMount() {
    // console.log('props', this.props)
    axios
      .get(`${baseURL}/reply/remainingQuantity/${this.props.reqId}`)
      .then((res) => {
        // console.log('res', res)
        this.setState({
          remainingRequiredQuantity: res.data.RemainingQuantity,
          remainingRequiredQuantityOriginal: res.data.RemainingQuantity,
        });
      })
      .catch((err) => console.log("error", err));
  }

  validation = () => {
    let donationQuantityErr = "";
    let msgErr = "";
    let addressErr = "";
    let remainingRequiredQuantityErr = "";

    console.log("validation", this.state);

    const validText = /^[^\s]+(?: [^\s]+)*$/; //no concurrent spaces and no boundary spaces

    if (!this.state.address) {
      addressErr = "required";
    } else if (!validText.test(this.state.address)) {
      addressErr = "remove extra and unnecessary spaces";
    }

    // if(!validText.test(this.state.msg)){
    //   msgErr="required"
    // }

    if (!this.state.donationQuantity) {
      donationQuantityErr = "required";
    } else if (
      parseFloat(this.state.donationQuantity) < 1 ||
      parseFloat(this.state.donationQuantity) > 1000
    ) {
      donationQuantityErr =
        "Quantity must be in range 1 to the required quantity";
    }

    let validQuantity =
      parseFloat(this.state.remainingRequiredQuantityOriginal) -
      parseFloat(this.state.donationQuantity);
    console.log(
      "validQuantity",
      parseFloat(this.state.remainingRequiredQuantityOriginal),
      parseFloat(this.state.donationQuantity),
      validQuantity,
      remainingRequiredQuantityErr
    );
    if (validQuantity < 0) {
      remainingRequiredQuantityErr =
        "Your donation is exceeding the requested quantity";
    } else {
      remainingRequiredQuantityErr = "";
    }
    console.log("after", remainingRequiredQuantityErr);

    if (
      remainingRequiredQuantityErr ||
      donationQuantityErr ||
      // msgErr ||
      addressErr ||
      this.state.imageErr
    ) {
      this.setState({
        remainingRequiredQuantityErr,
        donationQuantityErr,
        // msgErr,
        addressErr,
      });
      return false;
    }

    return true;
  };

  ResponseFormSubmitHandler = (e) => {
    e.preventDefault();
    const isValid = this.validation();
    console.log("isValid: ", isValid, this.state);
    if (isValid) {
      const isEdit = this.props.history?.location?.state?.data ? true : false;

      const response = {
        Message: this.state.msg,
        CaseId: this.props.reqId,
        DonorId: localStorage.getItem("donorID"),
        Quantity: parseFloat(this.state.donationQuantity),
        RemainingQuantity: this.state.remainingRequiredQuantity,
        Address: this.state.address,
        Image1base64:
          this.state.base64Images[0] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[0].base64
            : this.state.base64Images[0].base64 ===
              this.props.history?.location?.state?.data?.itemImg1
            ? null
            : this.state.base64Images[0].base64,
        Image2base64:
          this.state.base64Images[1] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[1].base64
            : this.state.base64Images[1].base64 ===
              this.props.history?.location?.state?.data?.itemImg2
            ? null
            : this.state.base64Images[1].base64,
        Image3base64:
          this.state.base64Images[2] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[2].base64
            : this.state.base64Images[2].base64 ===
              this.props.history?.location?.state?.data?.itemImg3
            ? null
            : this.state.base64Images[2].base64,
        Image1Name:
          this.state.base64Images[0] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[0].name
            : this.state.base64Images[0].name ===
              this.props.history?.location?.state?.data?.image1Name
            ? null
            : this.state.base64Images[0].name,
        Image2Name:
          this.state.base64Images[1] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[1].name
            : this.state.base64Images[1].name ===
              this.props.history?.location?.state?.data?.image2Name
            ? null
            : this.state.base64Images[1].name,
        Image3Name:
          this.state.base64Images[2] === undefined
            ? null
            : !isEdit
            ? this.state.base64Images[2].name
            : this.state.base64Images[2].name ===
              this.props.history?.location?.state?.data?.image3Name
            ? null
            : this.state.base64Images[2].name,
      };
      console.log("data of response", response);
      axios
        .post(`${baseURL}/reply/post `, response)
        .then((res) => {
          console.log("success", res);
          this.props.fetchData();
          this.props.onHide(true);
        })
        .catch((err) => console.log("error", err));
    }
  };

  amountGenerator = (e) => {
    let amount = e.target.value;
    let remaining = this.state.remainingRequiredQuantityOriginal;
    if (isNaN(parseFloat(e.target.value))) {
      amount = 0;
    }
    // if(parseFloat(remaining)<0){
    //   remaining=0;
    // }

    console.log(
      "amountGenerator",
      parseFloat(remaining),
      amount,
      parseFloat(remaining) - amount
    );
    this.setState({
      remainingRequiredQuantity: parseFloat(remaining) - amount,
    });
  };

  changeHandler = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
    // console.log(event.target.value);
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
    if (e.target.files[0].size > 2000000) {
      this.setState({ imageErr: "Image size must not be more than 2mb" });
      return;
    }
    const isEdit = this.props.history?.location?.state?.data ? true : false;
    var pattern = /[\/](jpg|png|jpeg)$/i;
    e.persist();
    if (e.target.files[0].type.match(pattern)) {
      this.getBase64(e.target.files[0], (result) => {
        this.setState({
          base64Images: [
            ...this.state.base64Images,
            { name: e.target.files[0].name, base64: result, edit: false },
          ],
          imageErr: null,
        });
      });
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
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Proceed Donation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form action="/" noValidate>
              <div className="row mb-2">
                <div className="col-lg-6 col-md-12">
                  <label
                    htmlFor="item-quantity"
                    className="my-donation-label mb-2"
                  >
                    Add quantity you want to donate
                  </label>
                  <input
                    name="item-quantity"
                    value={this.state.donationQuantity}
                    onChange={(event) => {
                      this.changeHandler(event, "donationQuantity");
                    }}
                    onBlur={(event) => this.amountGenerator(event)}
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
                    {this.state.donationQuantityErr}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label
                    htmlFor="remaining-quantity"
                    className="my-donation-label mb-2"
                  >
                    Remaining quantity required for the case
                  </label>
                  <input
                    name="remaining-quantity"
                    value={this.state.remainingRequiredQuantity}
                    onChange={(event) =>
                      this.changeHandler(event, "remainingRequiredQuantity")
                    }
                    style={{
                      color:
                        this.state.remainingRequiredQuantity < 0
                          ? "red"
                          : "#212529",
                    }}
                    type="number"
                    id="remaining-quantity"
                    placeholder="Remaining quantity"
                    className="form-control"
                    disabled={true}
                  />
                  <div
                    style={{
                      fontSize: "12.8px",
                      color: "#DC3545",
                      marginLeft: "10px",
                    }}
                  >
                    {this.state.remainingRequiredQuantityErr}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address" className="my-donation-label mb-2">
                  Pickup Address
                </label>
                <input
                  name="address"
                  value={this.state.address}
                  onChange={(event) => this.changeHandler(event, "address")}
                  type="text"
                  id="address"
                  placeholder="Address here..."
                  className="form-control"
                />
                <div
                  style={{
                    fontSize: "12.8px",
                    color: "#DC3545",
                    marginLeft: "10px",
                  }}
                >
                  {this.state.addressErr}
                </div>
              </div>
              <div className="form-group mb-2">
                <label>Upload Image(s)</label>
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
              <div className="form-group">
                <label className="mb-2" htmlFor="requestResponse">
                  Response Message (optional)
                </label>
                <textarea
                  name="requestResponse"
                  rows="8"
                  // cols="50"
                  value={this.state.msg}
                  onChange={(event) => this.changeHandler(event, "msg")}
                  id="requestResponse"
                  placeholder="Send a message to NGO"
                  className="form-control"
                ></textarea>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onHide(false)}>Close</Button>
          <Button variant="success" onClick={this.ResponseFormSubmitHandler}>
            Submit
          </Button>
          {/* <Button variant="primary">Submit</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ProceedOrderModal;
