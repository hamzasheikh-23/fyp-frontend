import React from "react";
import Footer from "../Footer/Footer";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import dummy from "../../images/grayscale-kid.jpg";
import "./DonorReplies.css";
import axios from "axios";
// import ProceedOrderModal from '../Modal/ProceedOrderModal';
import RequestCard from "./RequestCard";
import { filter } from "lodash";
import moment from "moment";

class DonorReplies extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      siderDrawerOpen: false,
      donor: true,
      selectedNgo: "",
      selectedCategory: "",
      requests: [],
      ngoList: [],
      categoryList:[]
      // addModalShow: false,
    };
  }
  componentDidMount() {
    //get requests
    axios
      .get(
        `https://localhost:44357/case/get?status=approve&&isActive=true`
      )
      .then((res) => {
        // console.log('res', res)
        this.setState({
          requests: res.data.map((item) => ({
            caseId: item.CaseId,
            ngoID: item.NGOId,
            caseTitle: item.CaseTitle,
            quantity: item.Quantity,
            unit: item.Unit,
            postedDate: item.PostedDate,
            description: item.Description,
            // imageBase64: item.ImageBase64,
            // imageName: item.ImageName,
          })),
        });

        // console.log(this.state)
      })
      .catch((err) => console.log(err));

    //get ngos
    axios
      .get(`https://localhost:44357/user/get/usertype/3 `)
      .then((list) => {
        console.log("ngo list", list);
        this.setState({
          ngoList: list.data.map((item) => ({
            id: item.UserId,
            name: `${item.FirstName} ${item.LastName ? item.LastName : ""}`,
          })),
        });
      })
      .catch((error) => console.log(error));

      //get categories
    axios
    .get(`https://localhost:44357/donation/category/get`)
    .then((list) => {
      this.setState({
        categoryList: [...list.data]
      });
    })
    .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState){
if(prevState.selectedCategory !== this.state.selectedCategory || prevState.selectedNgo !== this.state.selectedNgo){
  this.filteredContent(this.state.selectedCategory, this.state.selectedNgo);
}
  }



  
  filteredContent = (selectedCategory, selectedNgo) => {

    axios
      .get(`https://localhost:44357/case/get?${selectedNgo ? `ngoId=${selectedNgo}`:''}&&status=approve&&isActive=true${selectedCategory? `&&category=${selectedCategory}`: ''}`)
      .then((res) => {
        this.setState({
          requests: res.data.map((item) => ({
            caseId: item.CaseId,
            ngoID: item.NGOId,
            caseTitle: item.CaseTitle,
            Quantity: item.Quantity,
            Unit: item.Unit,
            postedDate: item.PostedDate,
            description: item.Description,
            imageBase64: item.ImageBase64,
            imageName: item.ImageName,
          })),
        });
      })
      .catch((err) => console.log(err));
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
    console.log("ngo requests", this.state);
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
    // let addModalClose=()=> this.setState({addModalShow:false});
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}
        <div className="replies-main-div">
          <div className="filter-area">
            <h2 className="filter-heading">Filter By Case Titles:</h2>
            <ul className="filter-options">
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === ""
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "" });
                  }}
                >
                  All
                </a>
              </li>
              {this.state.categoryList.map((cat) => {
                return (
                  <li>
                    <a
                      style={{
                        backgroundColor:
                          this.state.selectedCategory === cat.CategoryId
                            ? "#579df8"
                            : "#4a89dc",
                      }}
                      onClick={() => {
                        this.setState({ selectedCategory: cat.CategoryId });
                      }}
                    >
                      {cat.DonationCategory}
                    </a>
                  </li>
                );
              })}
              {/* <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Clothes"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Clothes" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Clothes
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Medicines"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Medicines" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Medicines
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Toys"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Toys" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Toys
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Books"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Books" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Books
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Food"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Food" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Food
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "School Fees"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "School Fees" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  School Fees
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Medicines"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Medicines" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Medicines
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Toys"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Toys" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Toys
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Books"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Books" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Books
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "Food"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "Food" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  Food
                </a>
              </li>
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCategory === "School Fees"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCategory: "School Fees" }, () =>
                      this.filteredContent()
                    );
                  }}
                >
                  last
                </a>
              </li> */}
            </ul>
          </div>
          <div class="request-area">
            <h3 className="request-area-heading">DONOR'S RESPONSE</h3>
            {this.state.replies.map((reply) => {
              return (
                <RequestCard
                    {...reply}
                  fetchData={this.filteredContent}
                />
              );
            })}

          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default DonorReplies;
