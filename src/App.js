import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
// import history from "./history";
import history from './assets/history';
import MainPage from './components/MainPage/MainPage';
import AboutUs from './components/AboutUs/AboutUs';
import LoginForm from './components/Login/LoginForm';
import Help from './components/Help/Help';
import Signup from './components/Signup/Signup';
import DonationForm from './components/DonationForm/DonationForm';
import Profile from './components/Profile/Profile';
import ViewStory from './components/ViewStory/ViewStory';
import SuccessStoryForm from './components/SuccessStoryForm/SuccessStoryForm';
import AskDonationForm from './components/AskDonationForm/AskDonationForm';
import ManageDonations from './components/ManageDonations/ManageDonations';
import ManageStories from './components/ManageStories/ManageStories';
import DonorReplies from './components/DonorReplies/DonorReplies';
import NGORequests from './components/NGORequests/NGORequests';
import GoogleMap from './components/GoogleMap/GoogleMap';
import AdminPanel from './components/AdminPanel/AdminPanel';
import AdminPanelNGORecords from './components/AdminPanelNGORecords/AdminPanelNGORecords';
import AdminPanelNGOJoin from './components/AdminPanelNGOJoin/AdminPanelNGOJoin'; 
import AdminPanelDonorRequests from './components/AdminPanelDonorRequests/AdminPanelDonorRequests'; 
import AdminPanelNGORequests from './components/AdminPanelNGORequests/AdminPanelNGORequests'; 
import AdminPanelUserFeedback from './components/AdminPanelUserFeedback/AdminPanelUserFeedback';
import NGOStatusPending from './components/NGOStatusPending/NGOStatusPending'
import NGOStatusRejected from './components/NGOStatusRejected/NGOStatusRejected'
import AdminPanelStatistics from './components/AdminPanelStatistics/AdminPanelStatistics';


const App=()=>{
    return(
        <Router history={history}>
        <Routes>
           <Route path="/" exact element={<MainPage/>}/>
           <Route path="/viewStory" exact element={<ViewStory/>}/>
           <Route path="/signup" exact element={<Signup/>}/>
           <Route path="/aboutUs" element={<AboutUs/>}/>
           <Route path="/login" element={<LoginForm history={history}/>}/>
           <Route path="/help" element={<Help/>}/>
           <Route path="/donationForm" element={<DonationForm/>}/>
           <Route path="/adminPanelStatistics" element={<AdminPanelStatistics/>} />
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/ngoRequests" element={<NGORequests/>}/>
           <Route path="/googleMap" element={<GoogleMap/>}/>
           <Route path="/adminPanelMain" element={<AdminPanel/>}/>
           <Route path="/adminPanelDonorRequests" element={<AdminPanelDonorRequests/>}/>
           <Route path="/adminPanelNGORequests" element={<AdminPanelNGORequests/>}/>
           <Route path="/adminPanelNGORecords" element={<AdminPanelNGORecords/>}/>
           <Route path="/adminPanelNGOJoin" element={<AdminPanelNGOJoin/>}/>
           <Route path="/adminPanelUserFeedback" element={<AdminPanelUserFeedback/>}/>
           <Route path="/ngostatuspending" element={<NGOStatusPending/>}/>
           <Route path="/ngostatusrejected" element={<NGOStatusRejected/>}/>

           <Route path="/manage-donations"
                component={() => <ManageDonations  
                                    pageheading={"Manage Donations"}  />}/>

            <Route path="/askdonation" 
                    component={() => <AskDonationForm
                            formheading={"Ask for a Donation!"}
                            descplaceholder={"Describe the need in detail" }
                            buttontext={"Submit Request"}
                            iconimageurl={"../../images/pngdonat.png"} 
                            bgclass={"my-background-4"}
                            />}/>

            <Route path="/donor-replies" 
                    component={DonorReplies}/>   

            <Route path="/manage-stories"
                    component={() => <ManageStories  
                                        pageheading={"Manage Stories"}  />}/>
            
            <Route path="/addstory" 
                    component={() => <SuccessStoryForm  
                                    formheading={"Publish a life-changing Story!"}
                                    descplaceholder={"Add Story Description" }
                                    buttontext={"Upload Story" }
                                    iconimageurl={"../../images/icondiam.png"}
                                    bgclass={"my-background-3"} 
                                  />}/>
            

       </Routes>
       </Router>
    );
};
export default App;