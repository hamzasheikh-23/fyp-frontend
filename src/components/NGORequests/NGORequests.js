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

class NGORequests extends React.Component {
  componentDidMount() {
    //get requests
    axios
      .get(
        `https://localhost:44357/case/get?status=approve&isActive=true&category=all`
      )
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
  state = {
    siderDrawerOpen: false,
    donor: true,
    selectedNgo: "",
    selectedCategory: "",
    requests: [],
    ngoList: [],
    categoryList:[,]
    // addModalShow: false,
  };
  filteredContent = () => {
    let url = "";
    console.log('filteredContect')

    if (this.state.selectedNgo & this.state.selectedCategory) {
      url = `https://localhost:44357/case/get/${this.state.selectedNgo}?status=approve&isActive=true&category=${this.state.selectedCategory}`;
    } else if (this.state.selectedNgo & !this.state.selectedCategory) {
      url = `https://localhost:44357/case/get/${this.state.selectedNgo}?status=approve&isActive=true&category=all`;
    } else if (!this.state.selectedNgo & this.state.selectedCategory) {
      url = `https://localhost:44357/case/get?status=approve&isActive=true&category=${this.state.selectedCategory}`;
    } else if (!this.state.selectedNgo & !this.state.selectedCategory) {
      url = `https://localhost:44357/case/get?status=approve&isActive=true&category=all`;
    }
    console.log('filteredContect',url)

    axios
      .get(url)
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

    // console.log(
    //   "ngo: ",
    //   this.state.selectedNgo,
    //   "category: ",
    //   this.state.selectedCategory
    // );
    // if (this.state.selectedCategory && this.state.selectedNgo) {
    //   axios
    //     .get(`/api/getRequestedItemsByNgoId/${this.state.selectedNgo}`)
    //     .then((res) => {
    //       const newList = res.data.filter(
    //         (item) => item.category === this.state.selectedCategory
    //       );
    //       this.setState({ requests: [...newList] });
    //       // console.log('filtered req with ngo n category', newList)
    //     })
    //     .catch((error) => console.log(error));
    // } else if (this.state.selectedNgo && !this.state.selectedCategory) {
    //   axios
    //     .get(`/api/getRequestedItemsByNgoId/${this.state.selectedNgo}`)
    //     .then((res) => {
    //       // const newList= res.data.filter(item=>item.category===this.state.selectedCategory)
    //       this.setState({ requests: [...res.data] });
    //       // console.log('filtered req with ngo', res.data)
    //     })
    //     .catch((error) => console.log(error));
    // } else if (!this.state.selectedNgo && this.state.selectedCategory) {
    //   axios
    //     .get("/api/getRequestedItemsByStatus/approved")
    //     .then((res) => {
    //       const newList = res.data.filter(
    //         (item) => item.category === this.state.selectedCategory
    //       );
    //       this.setState({ requests: [...newList] });
    //       // console.log('filtered req with category', newList)
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   axios
    //     .get("/api/getRequestedItemsByStatus/approved")
    //     .then((res) => {
    //       // const newList= res.data.filter(item=>item.category===this.state.selectedCategory)
    //       this.setState({ requests: [...res.data] });
    //       // console.log('filtered req with nothing', res.data)
    //     })
    //     .catch((err) => console.log(err));
    // }
  };
  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };
  // filterByName=()=>{
  //     axios.get(`/api/getRequestedItemsByNgoId/${this.state.selectedNgo}`)
  //         .then(res=>{
  //             const newList= res.data.filter(item=>item.category===this.state.selectedCategory)
  //             // this.setState({requests:[...res.data]})
  //             console.log('filtered req', newList)
  //     })
  //         .catch(error=>console.log(error));
  // }
  // filterByAll=()=>{
  //     axios.get('/api/getRequestedItemsByStatus/approved')
  //     .then(res=>{ this.setState({requests:[...res.data]}) })
  //     .catch(err=>console.log(err))
  // }
  // filterCategory=(category)=>{
  //     const newList= this.state.requests.filter((item)=>item.category === category)
  //   this.setState({requests:[...newList]})
  // }
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
                    this.setState({ selectedNgo: "" }, () =>
                      this.filteredContent()
                    );
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
                        console.log('onClick', ngo.id)
                        this.setState({ selectedNgo: ngo.id }, () =>
                          this.filteredContent()
                        );
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
            <h2 className="filter-heading">Filter By Category:</h2>
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
                    this.setState({ selectedCategory: "" }, () =>
                      this.filteredContent()
                    );
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
                        this.setState({ selectedCategory: cat.CategoryId }, () =>
                          this.filteredContent()
                        );
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
              </li> */}
            </ul>
          </div>
          <div class="request-area">
            <h3 className="request-area-heading">NGO'S REQUESTS</h3>
            {this.state.requests.map((request) => {
              return (
                <RequestCard
                  image={
                    request.imageBase64 ||
                    "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
                  }
                  title={request.caseTitle}
                  reqId={request.caseId}
                  quantity={request.quantity}
                  unit={request.unit}
                  ngoname={request.ngoName || ""}
                  des={request.description}
                  date={moment(request.postedDate).format("LL hh:mm:ss")}
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
