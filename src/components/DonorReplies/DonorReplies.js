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
      selectedCase: "",
      caseTitleList: [],
      replies:[],
      // addModalShow: false,
    };
  }
  componentDidMount() {
    //get requests
    axios
      .get(
        `https://localhost:44357/reply/get?status=approve&&isActive=true`
      )
      .then((res) => {
        // console.log('res', res)
        this.setState({
          replies: res.data
        });

        // console.log(this.state)
      })
      .catch((err) => console.log(err));

    //get ngos
    axios
      .get(`https://localhost:44357/cases`)
      .then((list) => {
        this.setState({
          caseTitleList: list.data.map((item) => ({
            id: item.CaseId,
            name: item.CaseTitle,
          })),
        });
      })
      .catch((error) => console.log(error));

  }

  componentDidUpdate(prevProps, prevState){
if(prevState.selectedCase !== this.state.selectedCase){
  this.filteredContent(this.state.selectedCase);
}
  }



  
  filteredContent = (selectedCase) => {

    axios
      .get(`https://localhost:44357/case/get?${selectedCase ? `caseId=${selectedCase}`:''}&&status=approve&&isActive=true`)
      .then((res) => {
        this.setState({
          requests: res.data
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
    // console.log("ngo requests", this.state);
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
                      this.state.selectedCase === ""
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "" });
                  }}
                >
                  All
                </a>
              </li>
              {this.state.caseTitleList.map((list) => {
                return (
                  <li>
                    <a
                      style={{
                        backgroundColor:
                          this.state.selectedCase === list.CaseId
                            ? "#579df8"
                            : "#4a89dc",
                      }}
                      onClick={() => {
                        this.setState({ selectedCase: list.CaseId });
                      }}
                    >
                      {list.CaseTitle}
                    </a>
                  </li>
                );
              })}
              {/* <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCase === "Clothes"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Clothes" }, () =>
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
                      this.state.selectedCase === "Medicines"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Medicines" }, () =>
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
                      this.state.selectedCase === "Toys"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Toys" }, () =>
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
                      this.state.selectedCase === "Books"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Books" }, () =>
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
                      this.state.selectedCase === "Food"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Food" }, () =>
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
                      this.state.selectedCase === "School Fees"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "School Fees" }, () =>
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
                      this.state.selectedCase === "Medicines"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Medicines" }, () =>
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
                      this.state.selectedCase === "Toys"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Toys" }, () =>
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
                      this.state.selectedCase === "Books"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Books" }, () =>
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
                      this.state.selectedCase === "Food"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "Food" }, () =>
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
                      this.state.selectedCase === "School Fees"
                        ? "#579df8"
                        : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedCase: "School Fees" }, () =>
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
