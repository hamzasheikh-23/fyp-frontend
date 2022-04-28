import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import history from "./history";
import history from "./assets/history";
import MainPage from "./components/MainPage/MainPage";
import AboutUs from "./components/AboutUs/AboutUs";
import LoginForm from "./components/Login/LoginForm";
import Help from "./components/Help/Help";
import Signup from "./components/Signup/Signup";
import DonationForm from "./components/DonationForm/DonationForm";
import Profile from "./components/Profile/Profile";
import ViewStory from "./components/ViewStory/ViewStory";
import SuccessStoryForm from "./components/SuccessStoryForm/SuccessStoryForm";
import AskDonationForm from "./components/AskDonationForm/AskDonationForm";
import ManageDonations from "./components/ManageDonations/ManageDonations";
import ManageStories from "./components/ManageStories/ManageStories";
import DonorReplies from "./components/DonorReplies/DonorReplies";
import NGORequests from "./components/NGORequests/NGORequests";
import GoogleMap from "./components/GoogleMap/GoogleMap";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminPanelNGORecords from "./components/AdminPanelNGORecords/AdminPanelNGORecords";
import AdminPanelNGOJoin from "./components/AdminPanelNGOJoin/AdminPanelNGOJoin";
import AdminPanelDonorRequests from "./components/AdminPanelDonorRequests/AdminPanelDonorRequests";
import AdminPanelNGORequests from "./components/AdminPanelNGORequests/AdminPanelNGORequests";
import AdminPanelUserFeedback from "./components/AdminPanelUserFeedback/AdminPanelUserFeedback";
import NGOStatusPending from "./components/NGOStatusPending/NGOStatusPending";
import NGOStatusRejected from "./components/NGOStatusRejected/NGOStatusRejected";
import AdminPanelStatistics from "./components/AdminPanelStatistics/AdminPanelStatistics";
import SubscriptionPage from "./components/SubscriptionPage/SubscriptionPage";
import DoubleLoginProtection from "./components/RouteProtection/DoubleLoginProtection";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn/AlreadyLoggedIn";
import RoleRouteProtection from "./components/RouteProtection/RoleRouteProtection";
import UnauthorizePage from "./components/UnauthorizePage/UnauthorizePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    console.log("run");
  }, []);

  
  return (
    <Router>
      {/* <img src={require('./images/book.png')} /> */}
      <Switch>
        <Route path="/" exact component={MainPage} />
        <RoleRouteProtection
          exact
          path="/viewStory"
          component={ViewStory}
          validUser="donor"
          // redirectTo="/"
        />
        {/* <Route path="/viewStory" exact component={ViewStory} /> */}
        <DoubleLoginProtection
          exact
          path="/signup"
          component={Signup}
          redirectTo="/alreadyLoggedin"
        />
        {/* <Route path="/signup" exact component={Signup} /> */}
        <Route path="/aboutUs" component={AboutUs} />
        <DoubleLoginProtection
          path="/login"
          component={LoginForm}
          redirectTo="/alreadyLoggedin"
        />
        {/* <Route path="/login" component={LoginForm} /> */}
        <Route path="/help" component={Help} />
        {/* <Route path="/donationForm" component={DonationForm} /> */}
        <RoleRouteProtection
          exact
          path="/donationForm"
          component={DonationForm}
          validUser="donor"
          // redirectTo="/"
        />
        {/* <Route path="/adminPanelStatistics" component={AdminPanelStatistics} /> */}
        <RoleRouteProtection
          exact
          path="/adminPanelStatistics"
          component={AdminPanelStatistics}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/profile" component={Profile} /> */}
        <RoleRouteProtection
          exact
          path="/profile"
          component={Profile}
          validUser="donor"
          // redirectTo="/"
        />
        {/* <Route path="/ngoRequests" component={NGORequests} /> */}
        <RoleRouteProtection
          exact
          path="/ngoRequests"
          component={NGORequests}
          validUser="donor"
          // redirectTo="/"
        />
        {/* <Route path="/googleMap" component={GoogleMap} /> */}
        <RoleRouteProtection
          exact
          path="/googleMap"
          component={GoogleMap}
          validUser="donor"
          // redirectTo="/"
        />
        {/* <Route path="/adminPanelMain" component={AdminPanel} /> */}
        <RoleRouteProtection
          exact
          path="/adminPanelMain"
          component={AdminPanel}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/subscription" component={SubscriptionPage} /> */}
        <RoleRouteProtection
          exact
          path="/subscription"
          component={SubscriptionPage}
          validUser="ngo"
        />
        <Route path="/alreadyLoggedin" component={AlreadyLoggedIn} />
        <Route path="/unauthorized" component={UnauthorizePage} />

        

       
        {/* <Route
          path="/adminPanelDonorRequests"
          component={AdminPanelDonorRequests}
        /> */}
        <RoleRouteProtection
          exact
          path="/adminPanelDonorRequests"
          component={AdminPanelDonorRequests}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route
          path="/adminPanelNGORequests"
          component={AdminPanelNGORequests}
        /> */}
         <RoleRouteProtection
          exact
          path="/adminPanelNGORequests"
          component={AdminPanelNGORequests}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/adminPanelNGORecords" component={AdminPanelNGORecords} /> */}
        <RoleRouteProtection
          exact
          path="/adminPanelNGORecords"
          component={AdminPanelNGORecords}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/adminPanelNGOJoin" component={AdminPanelNGOJoin} /> */}
        <RoleRouteProtection
          exact
          path="/adminPanelNGOJoin"
          component={AdminPanelNGOJoin}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route
          path="/adminPanelUserFeedback"
          component={AdminPanelUserFeedback}
        /> */}
         <RoleRouteProtection
          exact
          path="/adminPanelUserFeedback"
          component={AdminPanelUserFeedback}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/ngostatuspending" component={NGOStatusPending} /> */}
        <RoleRouteProtection
          exact
          path="/ngostatuspending"
          component={NGOStatusPending}
          validUser="admin"
          // redirectTo="/"
        />
        {/* <Route path="/ngostatusrejected" component={NGOStatusRejected} /> */}
        <RoleRouteProtection
          exact
          path="/ngostatusrejected"
          component={NGOStatusRejected}
          validUser="admin"
          // redirectTo="/"
        />

        {/* <Route
          path="/manage-donations"
          component={() => <ManageDonations pageheading={"Manage Donations"} />}
        /> */}
         <RoleRouteProtection
          exact
          path="/manage-donations"
          component={ManageDonations}
          validUser="ngo"
          // redirectTo="/"
        />

        {/* <Route
          path="/askdonation"
          component={() => (
            <AskDonationForm
              formheading={"Ask for a Donation!"}
              descplaceholder={"Describe the need in detail"}
              buttontext={"Submit Request"}
              iconimageurl={"../../images/pngdonat.png"}
              bgclass={"my-background-4"}
            />
          )}
        /> */}
         <RoleRouteProtection
          exact
          path="/askdonation"
          component={AskDonationForm}
          // component={() => (
          //   <AskDonationForm
          //     history={props.history}
          //     formheading={"Ask for a Donation!"}
          //     descplaceholder={"Describe the need in detail"}
          //     buttontext={"Submit Request"}
          //     iconimageurl={"../../images/pngdonat.png"}
          //     bgclass={"my-background-4"}
          //   />
          // )}
          validUser="ngo"
          // redirectTo="/"
        />

        {/* <Route path="/donor-replies" component={DonorReplies} /> */}
        <RoleRouteProtection
          exact
          path="/donor-replies"
          component={DonorReplies}
          validUser="ngo"
          // redirectTo="/"
        />

        {/* <Route
          path="/manage-stories"
          component={() => <ManageStories pageheading={"Manage Stories"} />}
        /> */}
         <RoleRouteProtection
          exact
          path="/manage-stories"
          component={() => <ManageStories pageheading={"Manage Stories"} />}
          validUser="ngo"
          // redirectTo="/"
        />

        {/* <Route
          path="/addstory"
          component={() => (
            <SuccessStoryForm
              formheading={"Publish a life-changing Story!"}
              descplaceholder={"Add Story Description"}
              buttontext={"Upload Story"}
              iconimageurl={"../../images/icondiam.png"}
              bgclass={"my-background-3"}
            />
          )}
        /> */}
         <RoleRouteProtection
          exact
          path="/addstory"
          component={() => (
            <SuccessStoryForm
              formheading={"Publish a life-changing Story!"}
              descplaceholder={"Add Story Description"}
              buttontext={"Upload Story"}
              iconimageurl={"../../images/icondiam.png"}
              bgclass={"my-background-3"}
            />
          )}
          validUser="ngo"
          // redirectTo="/"
        />
      </Switch>
      <ToastContainer
          position="top-center"
          // autoClose={false}
          // hideProgressBar
          // newestOnTop={false}
          // closeOnClick
          rtl={false}
          // pauseOnFocusLoss={false}
          draggable
          pauseOnHover

hideProgressBar={false}
newestOnTop={false}
closeOnClick
pauseOnFocusLoss
        />
    </Router>
  );
};
export default App;
