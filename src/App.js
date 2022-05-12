import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import history from "./history";
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
import PaymentInfoPage from "./components/PaymentInfoPage/PaymentInfoPage";

import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminPanelNGORecords from "./components/AdminPanelNGORecords/AdminPanelNGORecords";
import AdminPanelNGOJoin from "./components/AdminPanelNGOJoin/AdminPanelNGOJoin";
import AdminPanelDonorRequests from "./components/AdminPanelDonorRequests/AdminPanelDonorRequests";
import AdminPanelNGORequests from "./components/AdminPanelNGORequests/AdminPanelNGORequests";
import AdminPanelUserFeedback from "./components/AdminPanelUserFeedback/AdminPanelUserFeedback";
import AdminPanelStatistics from "./components/AdminPanelStatistics/AdminPanelStatistics";
import AdminPanelDonationRequests from "./components/AdminPanelDonationRequests/AdminPanelDonationRequests";
import AdminPanelManageRequestsFromNGO from "./components/AdminPanelManageRequestsFromNGO/AdminPanelManageRequestsFromNGO";
import AdminPanelManageSubscriptions from "./components/AdminPanelManageSubscriptions/AdminPanelManageSubscriptions";
import AdminPanelManageDonors from "./components/AdminPanelManageDonors/AdminPanelManageDonors";
import AdminPanelManagePartnerNGO from "./components/AdminPanelManagePartnerNGO/AdminPanelManagePartnerNGO";
import AdminPanelManageAdmin from "./components/AdminPanelManageAdmin/AdminPanelManageAdmin";

import NGOStatusPending from "./components/NGOStatusPending/NGOStatusPending";
import NGOStatusRejected from "./components/NGOStatusRejected/NGOStatusRejected";
import SubscriptionPage from "./components/SubscriptionPage/SubscriptionPage";
import NotSubscribed from './components/NotSubscribed/NotSubscribed';
import DoubleLoginProtection from "./components/RouteProtection/DoubleLoginProtection";
import AlreadyLoggedIn from "./components/AlreadyLoggedIn/AlreadyLoggedIn";
import RoleRouteProtection from "./components/RouteProtection/RoleRouteProtection";
import UnauthorizePage from "./components/UnauthorizePage/UnauthorizePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrackOrder from "./components/TrackOrder/TrackOrder";
import Invoice from "./components/Invoice/Invoice";
import AdminPanelManageOrders from "./components/AdminPanelManageOrders/AdminPanelManageOrders";
import NgoReplies from "./components/NgoReplies/NgoReplies";
import DonorDonations from "./components/DonorDonations/DonorDonations";
import ConfirmedDonations from "./components/ConfirmedDonations/ConfirmedDonations";
import SubscriptionProtection from "./components/RouteProtection/SubscriptionProtection";

const App = () => {
  useEffect(() => {}, []);

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
        <RoleRouteProtection
          exact
          path="/ngo-replies"
          component={NgoReplies}
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

        {/** ADMIN ROUTE STARTS HERE */}

        <RoleRouteProtection
          exact
          path="/adminPanelStatistics"
          component={AdminPanelStatistics}
          validUser="admin"
          // redirectTo="/"
        />
        <RoleRouteProtection
          exact
          path="/manage-order-ngo"
          component={AdminPanelManageOrders}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/donation-requests"
          component={AdminPanelDonationRequests}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/manage-ngo-requests"
          component={AdminPanelManageRequestsFromNGO}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/user-feedback"
          component={AdminPanelUserFeedback}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/manage-subscriptions"
          component={AdminPanelManageSubscriptions}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/manage-donors"
          component={AdminPanelManageDonors}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/manage-partner-ngos"
          component={AdminPanelManagePartnerNGO}
          validUser="admin"
        />
        <RoleRouteProtection
          exact
          path="/manage-admin"
          component={AdminPanelManageAdmin}
          validUser="admin"
        />

        {/** ADMIN ROUTE ENDS HERE */}

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
        <RoleRouteProtection
          exact
          path="/not-subscribed"
          component={NotSubscribed}
          validUser="ngo"
        />
        <RoleRouteProtection
          exact
          path="/confirmed-donations"
          // component={ConfirmedDonations}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <ConfirmedDonations history={props.history} />
            </SubscriptionProtection>
          )}
          validUser="ngo"
        />
        <RoleRouteProtection
          exact
          path="/donor-donations"
          // component={DonorDonations}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <DonorDonations history={props.history} />
            </SubscriptionProtection>
          )}
          validUser="ngo"
        />
        <RoleRouteProtection
          exact
          path="/invoice"
          // component={Invoice}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <Invoice history={props.history} />
            </SubscriptionProtection>
          )}
          validUser="ngo"
        />
        <RoleRouteProtection
          exact
          path="/trackOrder"
          // component={TrackOrder}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <TrackOrder history={props.history} />
            </SubscriptionProtection>
          )}
          validUser="ngo"
        />
        <RoleRouteProtection
          exact
          path="/paymentInfo"
          // component={PaymentInfoPage}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <PaymentInfoPage history={props.history} />
            </SubscriptionProtection>
          )}
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
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <ManageDonations history={props.history} />
            </SubscriptionProtection>
          )}
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
          // component={AskDonationForm}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <AskDonationForm history={props.history} />
            </SubscriptionProtection>
          )}
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
          // component={DonorReplies}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <DonorReplies history={props.history} />
            </SubscriptionProtection>
          )}
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
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <ManageStories
                history={props.history}
                pageheading={"Manage Stories"}
              />
            </SubscriptionProtection>
          )}
          // component={() => <ManageStories pageheading={"Manage Stories"} />}
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
          // component={() => (
          //   <SuccessStoryForm
          //     formheading={"Publish a life-changing Story!"}
          //     descplaceholder={"Add Story Description"}
          //     buttontext={"Upload Story"}
          //     iconimageurl={"../../images/icondiam.png"}
          //     bgclass={"my-background-3"}
          //   />
          // )}
          component={(props) => (
            <SubscriptionProtection history={props.history}>
              <SuccessStoryForm
                history={props.history}
                formheading={"Publish a life-changing Story!"}
                descplaceholder={"Add Story Description"}
                buttontext={"Upload Story"}
                iconimageurl={"../../images/icondiam.png"}
                bgclass={"my-background-3"}
              />
            </SubscriptionProtection>
          )}
          validUser="ngo"
          // redirectTo="/"
        />
      </Switch>
      <ToastContainer
        // position="top-center"
        // autoClose={false}
        // hideProgressBar
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
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
