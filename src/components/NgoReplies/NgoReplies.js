import React from "react";
import Footer from "../Footer/Footer";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import dummy from "../../images/grayscale-kid.jpg";
import { baseURL } from "../../baseURL";
import "./NgoReplies.css";
import axios from "axios";
// import ProceedOrderModal from '../Modal/ProceedOrderModal';
import RequestCard from "./RequestCard";
import { filter } from "lodash";
import moment from "moment";

// const dummyData = [
//   {
//     DonationTitle: "three set of gloves",
//     ReplyId: 1,
//     NGOName: "Saylani Welfare",
//     Message: "this is the dummy msg",
//     PostedDate: "March 33, 2022",
//     Status: "Pending",
//   },
//   {
//     DonationTitle: "three set of gloves",
//     ReplyId: 1,
//     NGOName: "Saylani Welfare",
//     Message: "this is the dummy msg",
//     PostedDate: "March 33, 2022",
//     Status: "Pending",
//   },
//   {
//     DonationTitle: "three set of gloves",
//     ReplyId: 1,
//     NGOName: "Saylani Welfare",
//     Message: "this is the dummy msg",
//     PostedDate: "March 33, 2022",
//     Status: "Pending",
//   },
//   {
//     DonationTitle: "three set of gloves",
//     ReplyId: 1,
//     NGOName: "Saylani Welfare",
//     Message: "this is the dummy msg",
//     PostedDate: "March 33, 2022",
//     Status: "Pending",
//   },
//   {
//     DonationTitle: "three set of gloves",
//     ReplyId: 1,
//     NGOName: "Saylani Welfare",
//     Message: "this is the dummy msg",
//     PostedDate: "March 33, 2022",
//     Status: "Pending",
//   },
// ];

class NgoReplies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siderDrawerOpen: false,
      selectedCase: "",
      caseTitleList: [],
      replies: [],
      // addModalShow: false,
    };
  }
  componentDidMount() {
    // this.setState({
    //   replies: dummyData,
    // });
    // get requests
    this.getData();

    //get cases
    // axios
    //   .get(
    //     `${baseURL}/case/get?ngoId=${localStorage.getItem(
    //       "ngoID"
    //     )}&status=approved&isActive=true `
    //   )
    //   .then((list) => {
    //     console.log("list", list);
    //     this.setState({
    //       caseTitleList: list.data.cases.map((item) => ({
    //         id: item.CaseId,
    //         name: item.CaseTitle,
    //       })),
    //     });
    //   })
    //   .catch((error) => console.log(error));
  }

  getData=()=>{
    axios
    .get(
      `${baseURL}/response/get?donorId=${localStorage.getItem('donorID')}&status=Pending`
    )
    .then((res) => {
      // console.log('res', res)
      if(!res.data.noData){
        this.setState({
          replies: res.data.reply
        });
      }
      else{
        this.setState({
          replies: []
        });
      }

      // console.log(this.state)
    })
    .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCase !== this.state.selectedCase) {
      this.filteredContent(this.state.selectedCase);
    }
  }

  filteredContent = (selectedCase) => {
    axios
      .get(
        `${baseURL}/reply/get?ngoId=${localStorage.getItem(
          "ngoID"
        )}${selectedCase ? `&caseId=${selectedCase}` : ""}&status=Pending `
      )
      .then((res) => {
        if (!res.data.noData) {
          this.setState({
            replies: res.data.reply,
          });
        } else {
          this.setState({
            replies: [],
          });
        }
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
    console.log("donor reply", this.state);
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
          {/* <div className="filter-area">
            <h2 className="filter-heading">Filter By Titles:</h2>
            <ul className="filter-options">
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedCase === "" ? "#579df8" : "#4a89dc",
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
                          this.state.selectedCase === list.id
                            ? "#579df8"
                            : "#4a89dc",
                      }}
                      onClick={() => {
                        this.setState({ selectedCase: list.id });
                      }}
                    >
                      {list.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div> */}
          <div class="request-area" style={{margin:'0 auto'}}>
            <h3 className="request-area-heading">NGO'S RESPONSE</h3>
            {this.state.replies.map((reply) => {
              return (
                <RequestCard
                  {...reply}
                  fetchData={this.getData}
                  history={this.props.history}
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
export default NgoReplies;
