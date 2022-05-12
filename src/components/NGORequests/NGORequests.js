import React from "react";
import Footer from "../Footer/Footer";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import dummy from "../../images/grayscale-kid.jpg";
import "./NGORequests.css";
import axios from "axios";
// import ProceedOrderModal from '../Modal/ProceedOrderModal';
import RequestCard from "./RequestCard";
import { filter } from "lodash";
import moment from "moment";
import { baseURL } from "../../baseURL";

class NGORequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siderDrawerOpen: false,
      donor: true,
      selectedNgo: "",
      selectedCategory: "",
      requests: [],
      ngoList: [],
      categoryList: [],
      // addModalShow: false,
    };
  }
  componentDidMount() {
    //get requests
    axios
      .get(
        `${baseURL}/case/get?status=approved&&isActive=true`
      )
      .then((res) => {
        // console.log('res', res)
        if (!res.data.noData) {
          this.setState({
            requests: res.data.cases.map((item) => ({
              caseId: item.CaseId,
              ngoID: item.NGOId,
              caseTitle: item.CaseTitle,
              quantity: item.Quantity,
              unit: item.Unit,
              postedDate: item.PostedDate,
              description: item.Description,
              imageBase64: item.ImageBase64,
              imageName: item.ImageName,
            })),
          });
        } else {
          this.setState({ requests: [] });
        }

        // console.log(this.state)
      })
      .catch((err) => console.log(err));

    //get ngos
    axios
      .get(`${baseURL}/user/get/usertype/3 `)
      .then((list) => {
        console.log("ngo list", list);
        this.setState({
          ngoList: list.data.map((item) => ({
            id: item.NgoId,
            name: `${item.FirstName} ${item.LastName ? item.LastName : ""}`,
          })),
        });
      })
      .catch((error) => console.log(error));

    //get categories
    axios
      .get(`${baseURL}/donation/category/get`)
      .then((list) => {
        this.setState({
          categoryList: [...list.data],
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevState.selectedNgo !== this.state.selectedNgo
    ) {
      this.filteredContent(this.state.selectedCategory, this.state.selectedNgo);
    }
  }

  filteredContent = (selectedCategory, selectedNgo) => {
    axios
      .get(
        `${baseURL}/case/get?${
          selectedNgo ? `ngoId=${selectedNgo}` : ""
        }&&status=approved&&isActive=true${
          selectedCategory ? `&&category=${selectedCategory}` : ""
        }`
      )
      .then((res) => {
        if (!res.data.noData) {
          this.setState({
            requests: res.data.cases.map((item) => ({
              caseId: item.CaseId,
              ngoID: item.NGOId,
              caseTitle: item.CaseTitle,
              quantity: item.Quantity,
              unit: item.Unit,
              postedDate: item.PostedDate,
              description: item.Description,
              imageBase64: item.ImageBase64,
              imageName: item.ImageName,
            })),
          });
        } else {
          this.setState({ requests: [] });
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
        <div className="ngo-main-div">
          <div className="filter-area">
            <h2 className="filter-heading">Filter By NGO:</h2>
            <ul className="filter-options">
              <li>
                <a
                  style={{
                    backgroundColor:
                      this.state.selectedNgo === "" ? "#579df8" : "#4a89dc",
                  }}
                  onClick={() => {
                    this.setState({ selectedNgo: "" });
                  }}
                >
                  All
                </a>
              </li>
              {this.state.ngoList.map((ngo) => {
                return (
                  <li>
                    <a
                      style={{
                        backgroundColor:
                          this.state.selectedNgo === ngo.id
                            ? "#579df8"
                            : "#4a89dc",
                      }}
                      onClick={() => {
                        console.log("onClick", ngo.id);
                        this.setState({ selectedNgo: ngo.id });
                      }}
                    >
                      {ngo.name}
                    </a>
                  </li>
                );
              })}

              {/* <li>
                <a>Human Rights Organization </a>
              </li>
              <li>
                <a>Helping Hands</a>
              </li>
              <li>
                <a>Justice For You</a>
              </li>
              <li>
                <a>Little Care</a>
              </li>
              <li>
                <a>Speak For Change</a>
              </li>
              <li>
                <a>We Work Together</a>
              </li> */}
            </ul>

            {/* category filters */}
            {/* <h2 className="filter-heading">Filter By Category:</h2>
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
              </ul>*/}
          </div>
          <div class="request-area">
            <h3 className="request-area-heading">NGO'S REQUESTS</h3>
            {this.state.requests.map((request) => {
              return (
                <RequestCard
                  image={
                    request.imageName
                      ? require(`../../serverImages/cases/${request.imageName}`)
                      : "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
                  }
                  title={request.caseTitle}
                  reqId={request.caseId}
                  quantity={request.quantity}
                  unit={request.unit}
                  ngoname={request.ngoName || ""}
                  des={request.description}
                  date={moment(request.postedDate).format("LL hh:mm:ss")}
                  fetchData={this.filteredContent}
                />
              );
            })}

            {/* <RequestCard
              image={dummy}
              title={"Title"}
              reqId={1}
              ngoname={"NGO Name"}
              des={
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
              }
              date={"12 March 2021"}
            />
            <RequestCard
              image={dummy}
              title={"Title"}
              reqId={1}
              ngoname={"NGO Name"}
              des={"Descrption here..."}
              date={"12 March 2021"}
            /> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default NGORequests;
