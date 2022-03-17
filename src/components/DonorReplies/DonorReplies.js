import React, { Component } from 'react';

import axios from 'axios';
import Footer from '../Footer/Footer';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import "./DonorReplies.css";

import "bootstrap/dist/css/bootstrap.min.css";



class DonorReplies extends Component{
   







    constructor() {
        super();
        
        this.state = {

          
            //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
      //      arrayforcards : [],  
       arrayforcards : [
            {
              id:'1',
              title: 'Female Clothing Required',
              image: '',
              donor: 'Aiman Izhar',
              description: 'I have some dresses that are in excellent condition, but sizes are very loose. If relevant contact.',
              date:'9jan2020',
              status: 'pending'
            },
            {
              id:'2',
              title: 'Medicines for a Cancer Patient',
              image: '',
              donor: 'Sana Khan',
              description: 'I am a medical store owner and have the following required medicines available. I want to donate them to that needy person in order to save his life.',
              date:'12april2020',
              status: 'confirmed'
            },
            {
              id:'3',
              title: 'Primary Level Books',
              image: '',
              donor: 'Hafsa Choudhry',
              description: 'I have my O-Levels and A-Levels books along with their notes. These books are expensive and are of no longer in my use. I hope someone else gets benefit from them.',
              date:'21may2020',
              status: 'rejected'
            },
            {
              id:'4',
              title: 'Toys needed',
              image: '',
              donor: 'Sana Khan',
              description: 'My kids toys are all in good condition and are no longer in use as they have grown up. I would love to donate these preloved toys to a kid.',
              date:'2may2020',
              status: 'confirmed'
            },
            {
                id:'5',
                title: 'Medicines for a Cancer Patient',
                image: '',
                donor: 'Aiman Izhar',
                description: 'I want to donate 35,000 for this purpose.',
                date:'9mar2020',
                status: 'pending'
              },
          ],
 
//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***

el: "all",
        };
    }

    state = {
        siderDrawerOpen: false,
    };

    drawerToggleHandler = () => {
        this.setState(prevState => {
            return { siderDrawerOpen: !prevState.siderDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ siderDrawerOpen: false });
    };

    AllHandler = () => { 
      this.setState(function(){
            return {el: "all" }
         });
    };
    PendingHandler = () => { 
        this.setState(function(){
            return {el: "pending"}
        });
        };
    ConfirmedHandler = () => { 
        this.setState(function(){
            return {el: "confirmed"}
        });
        };
    RejectedHandler = () => { 
    this.setState(function(){
            return {el: "rejected"}
        });
    };





 render() {
        let backdrop;
        if (this.state.siderDrawerOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />;
            }   
        
        var donationstatus;
            donationstatus =[this.state.el];
         // console.log(donationstatus[0] + "hi  " + donationstatus[1] + "hi " + donationstatus[2]);
  
        if(donationstatus == "all"){
            donationstatus = ["rejected", "pending", "confirmed"];
           // console.log(donationstatus[0] + "thissssssss " + donationstatus[1] + "hi " + donationstatus[2]);  
             }

    return (
        <div>
            <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
            <SideDrawer about={true} show={this.state.siderDrawerOpen} />
            {backdrop}


<div className="replies-main-div">

                    <div className="filter-area">
                        <h2 className="filter-heading">Filter Replies:</h2>
                        <ul className="filter-options">
                       
                            <li id="allfiltertag" onClick={this.AllHandler}> <a href="#">All Replies</a></li>
                            <li id="pendingfiltertag" onClick={this.PendingHandler} ><a href="#">Pending Response </a></li>
                            <li id="confirmedfiltertag" onClick={this.ConfirmedHandler}><a href="#">Approved</a></li>
                            <li id="rejectedfiltertag" onClick={this.RejectedHandler}><a href="#">Rejected</a></li>
                           
                        </ul>
                    </div>
 </div>



    
          
<div className="replies-area">
        <h3 className="replies-area-heading">DONOR REPLIES</h3>


    <ul style={{ listStyleType: "none" }}>     

{this.state.arrayforcards.filter(filteredrequest => filteredrequest.status === donationstatus[0] || filteredrequest.status === donationstatus[1] || filteredrequest.status === donationstatus[2] )
.map(donation => (
          <div className="listofreplies">                                           
 
          <li >
    <div className="card-body donor-reply-card-body">
    <h5 className="card-title donor-reply-card-title">{donation.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">{donation.donor}</h6>
    <p className="card-text donor-reply-card-text">{donation.description}</p>
    <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{donation.date}</h6>
    <div  className="text-right" >a</div>
    {/* <div className="text-right"><a href="/" className="btn btn-primary .donor-reply-card-btn" style={{fontWeight:"bold", padding: "10px 1.25rem"}}>View Details</a></div> */}
</div> 
          </li>

          </div>
                        ) )}
</ul>

</div>

         <Footer/>
        
         
</div>
            );
        }
       
 }
    
    
    
    
export default DonorReplies;
    
