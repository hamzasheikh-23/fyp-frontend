import React from 'react';
import ReactDOM from 'react-dom';
import Card1 from './Card';
import axios from 'axios';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';
import AdminPanelNGODonationReq from '../AdminPanelNGODonationReq/AdminPanelNGODonationReq'



import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import "bootstrap/dist/css/bootstrap.min.css";

import '../ManageDonations/ManageDonations.css';



class AdminPanelNGOStoryReq extends React.Component {
  componentDidMount(){
   
    axios.get('/api/getAllStories')
    .then(res=>{
     
     const stories= res.data.filter(story=>story.status==='Pending')
    //  console.log('abhi',stories)
      this.setState({arrayforcards:[...stories]})
  })
    .catch(err=>console.log('Requested Items',err))
  }
 
  constructor() {
    super();
    this.state = {
    open: false,
    showDonation: false,
    showStory:true,    
    

      
            //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
                
            arrayforcards : [],
    
    //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***



   };
}
updateList=()=>{
  axios.get('/api/getAllStories')
    .then(res=>{
     
     const stories= res.data.filter(story=>story.status==='Pending')
     console.log('abhi',stories)
      this.setState({arrayforcards:[...stories]})
  })
    .catch(err=>console.log('Requested Items',err))
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

    //
    
 if(this.state.showDonation===true){

    return <AdminPanelNGODonationReq></AdminPanelNGODonationReq>
}

else return(
        <div>
<Toolbar drawerClickHandler={this.drawerToggleHandler} about={true}/>
<SideDrawer about={true} show={this.state.siderDrawerOpen} />
{backdrop}

<div className="main-admin-container">   

<h1 className="text-in-admin1" >Pending Requests from NGOs</h1>
<hr></hr>

<div className="replies-main-div"  style={ {verticalAlign:"top"}}>

                    <div className="filter-area" >
                        <h2 className="filter-heading">Filter Requests for:</h2>
                        <ul className="filter-options">
                       
                            <li id="pendingfiltertag" onClick={this.DonationReqHandler} ><a href="#">Asking Donations</a></li>
                            <li id="confirmedfiltertag" onClick={this.StoryReqHandler}><a href="#">Publishing Stories</a></li>
                                                        
                        </ul>
                    </div>
 </div>


          
<div className="replies-area" >

 <Card className="carddeckclass"    > 

                              {this.state.arrayforcards.map(data => (
                      
                              <div className="">                                             
                                    <br></br>
                               <Card1
                               sid={data.story_id}
                               update={this.updateList}
                               date={data.created_at}
                               des={data.description}
                               ngoId={data.ngo_id}
                               title={data.title}
                               image1={data.image==='noimage.jpg'? null :`http://localhost:8000/storage/cover_images/${data.image}`}
                               >     
                                 {/*      <Card className="bg-dark text-white  basic-size" >
                                    
                                       <Card.Img src={data.image} alt="Card image" className="img-in-card-admin cardimgsize" />
                                   <Card.ImgOverlay className="img-in-card-admin allowscroll" id="style-1" >
                                        <Card.Title>{data.title}</Card.Title>
                                        <br></br>
                                      
                                      <Button variant="primary" className="bold-text" onClick={this.onOpenModal}> View Details </Button>
                                      <Modal open={open} onClose={this.onCloseModal} 
                 center
                 classNames={{
                   overlay: 'customOverlay',
                   modal: 'customModal',
                 }}>
                    <h1>NGO Name</h1>
                  <hr></hr>
                    <h5 className="small-text-admin">
                    <span className="small-b-i">Date Posted: </span> {data.date}
                    <br></br><br></br>
                    <p>{data.description}</p>
                    </h5>
                    <div style={ {textAlign: "center" }}>
                    <button  className="btn btn-success btn-sm">Accept</button>
                    <button className="btn btn-danger btn-sm" style={ {marginLeft:"12%"}}>Decline</button>
                    </div>
                </Modal>
                                      </Card.ImgOverlay> 
                                  </Card>*/}
 </Card1>
                              </div>
                              ) )}
                             
                              </Card>
</div>

<hr></hr>
         
 </div>
  <Footer/>
     
      </div>
    );
  }
}

export default AdminPanelNGOStoryReq;