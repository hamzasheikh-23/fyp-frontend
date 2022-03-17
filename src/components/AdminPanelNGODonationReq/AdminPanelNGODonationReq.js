import React from 'react';
import ReactDOM from 'react-dom';
import Card2 from './Card';
import Modal from 'react-responsive-modal';


// import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';
import AdminPanelNGOStoryReq from '../AdminPanelNGOStoryReq/AdminPanelNGOStoryReq';
import axios from 'axios';



class AdminPanelNGODonationReq extends React.Component {
  componentDidMount(){
   
    axios.get('/api/getRequestedItemsByStatus/Pending')
    .then(res=>{
      // console.log('abhi',res.data)
      this.setState({arrayforcards:[...res.data]})
  })
    .catch(err=>console.log('Requested Items',err))
  }

  constructor() {
    super();
    this.state = {
    open: false,
    showDonation: true,
    showStory:false,    

      
            //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
                
            arrayforcards : [],
    
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
updateList=()=>{
  axios.get('/api/getRequestedItemsByStatus/Pending')
    .then(res=>{
      console.log(res.data)
      this.setState({arrayforcards:[...res.data]})
  })
    .catch(err=>console.log('Requested Items',err))
}

  render() {
    const { open } = this.state; 
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }

 //
    
 if(this.state.showStory===true){

    return <AdminPanelNGOStoryReq></AdminPanelNGOStoryReq>
}

else return(
        <div>
<Toolbar drawerClickHandler={this.drawerToggleHandler} about={true}/>
<SideDrawer about={true} show={this.state.siderDrawerOpen} />
{backdrop}


<div className="main-admin-container">   

<h1 className="text-in-admin1" >Pending Requests from NGOs</h1>
<hr></hr>


<div className="replies-main-div">

                    <div className="filter-area">
                        <h2 className="filter-heading">Filter Requests for:</h2>
                        <ul className="filter-options">
                       
                            <li id="pendingfiltertag" onClick={this.DonationReqHandler} ><a href="#">Asking Donations</a></li>
                            <li id="confirmedfiltertag" onClick={this.StoryReqHandler}><a href="#">Publishing Stories</a></li>
                                                     
                        </ul>
                    </div>
 </div>


          
<div className="replies-area" >
      
    <ul style={{ listStyleType: "none" }}>     

{this.state.arrayforcards.map(donation => (
          <div className="listofreplies">                                           
 
          <li>
            <Card2
            category={donation.category}
            title={donation.title}
            ngoname={donation.ngo[0].id}
            ngoname1={donation.ngo[0].name}
            description={donation.description}
            date={donation.created_at}
            update={this.updateList}
            itemImg1={donation.image[0].imageurl==='noimage.jpg'? null :`http://localhost:8000/storage/cover_images/${donation.image[0].imageurl}`}
            itemid={donation.requestedItem_id}
            ></Card2>
 {/*  <div className="card-body donor-reply-card-body">
    <h5 className="card-title donor-reply-card-title">{donation.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">USERNAME-DONOR</h6>
    <p className="card-text donor-reply-card-text">{donation.description}</p>
    <p className="card-text donor-reply-card-text">
        <b>Offering </b> 20 units
        |
        <b> Condition: </b> New/Used
    </p>
    <p className="card-text donor-reply-card-text"><b>Category: </b>{donation.category}</p>
    <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{donation.date}</h6>

    <div className="text-right">
        <button className="btn btn-primary .donor-reply-card-btn" style={{fontWeight:"bold", padding: "10px 1.25rem"}} 
                onClick={this.onOpenModal}>View Details </button>
                <Modal open={open} onClose={this.onCloseModal} 
                 center
                 classNames={{
                   overlay: 'customOverlay',
                   modal: 'customModal',
                 }}>
                    <h1>{donation.title}</h1>
                    <h6 className="">USERNAME-DONOR</h6>
                  <hr></hr>
                    <h5 className="small-text-admin">
                    <span className="small-b-i">Category: </span> {donation.category} 
                  <hr></hr>  
                    <p>{donation.description}</p>
                   <div className="donor-req-img-cont"><img src={donation.image} className="donor-req-img"></img></div>
                  <br></br>  
                    <span className="small-b-i">Condition: </span> New/Used
                  <br></br>
                    <span className="small-b-i">Offering: </span> X Units
                    </h5>
                    <div style={ {textAlign: "center" }}>
                    <button  className="btn btn-success btn-sm">Accept</button>
                    <button className="btn btn-danger btn-sm" style={ {marginLeft:"12%"}}>Decline</button>
                    </div>
                    
                </Modal>
    </div>
  </div> */} 
          </li>
          </div>
                        ) )}
</ul>

</div>



<hr></hr>
         
 </div>
  <Footer/>
     
      </div>
    );
  }
}

export default AdminPanelNGODonationReq;