import React from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Card from '../AdminPanelNGOStoryReq/Card';
// import axios from 'axios';


import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';
import AdminPanelNGODonationReq from '../AdminPanelNGODonationReq/AdminPanelNGODonationReq'
import AdminPanelNGOStoryReq from '../AdminPanelNGOStoryReq/AdminPanelNGOStoryReq'



import './AdminPanelNGORequests.css'

class AdminPanelNGORequests extends React.Component {

  constructor() {
    super();
    this.state = {
    open: false,
    showDonation: true,
    showStory:false,    
    el: "donationreq",

      
            //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
                
            arrayforcards : [
                {
                  id:'1',
                  title: 'Donation Request 1',
                  image: 'https://i.pinimg.com/originals/5d/b4/19/5db4194390eb77b2b0400066f5fb3bc2.jpg',
                  description: 'This is description Lorem Ipsum it is simply dummy text of industry Lorem.',
                  category: 'Clothes',
                  date:'9jan2020',
                },
                {
                  id:'2',
                  title: 'donation 2',
                  image: 'https://live.staticflickr.com/8374/8415723372_c595df3247_b.jpg',
                  description: 'We made people happy like we always do u know thats our job so you are reading thiss text hi hello',
                  category: 'Books',
                  date:'12april2020'
                },
                {
                  id:'3',
                  title: 'Donation Request 3',
                  image: 'https://i.pinimg.com/originals/5d/b4/19/5db4194390eb77b2b0400066f5fb3bc2.jpg',
                  description: 'You saved a life. i am ready to donate this item',
                  category: 'Medicines',
                  date:'21may2020'
                },
                {
                  id:'4',
                  title: 'Donation 4',
                  image: 'https://live.staticflickr.com/8374/8415723372_c595df3247_b.jpg',
                  description: 'Desc is that We made people happy',
                  category: 'Clothes',
                  date:'2may2020'
                }
              ],
    
    //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***



   };
}

//////

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  ////////////

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

///////////////

StoryReqHandler = () => { 
    this.setState(function(){
        return {showStory: true, showDonation: false}
    });
    };
DonationReqHandler = () => { 
this.setState(function(){
    return {showStory: false, showDonation: true}
});
};

//////////////

  render() {
    const { open } = this.state; 
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }

 ///

 if(this.state.showDonation){
         return <AdminPanelNGODonationReq></AdminPanelNGODonationReq>
 }
         else return  <AdminPanelNGOStoryReq></AdminPanelNGOStoryReq>
      
           }
}

export default AdminPanelNGORequests;