import React from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';

class AdminPanelUserFeedback extends React.Component {
  componentDidMount=()=>{
    axios.get('/api/getFeedback')
    .then(res=>this.setState({arrayforcards:[...res.data]}))
    .catch(err=>console.log(err))
  }

  constructor() {
    super();
    this.state = {
      
            //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
                
            arrayforcards : []
                  
    //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***



   };
}


  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  

///////////////

  render() {
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
        return(
        <div>
<Toolbar drawerClickHandler={this.drawerToggleHandler} about={true}/>
<SideDrawer about={true} show={this.state.siderDrawerOpen} />
{backdrop}

<div className="main-admin-container">   

<h1 className="text-in-admin1" >Feedback from Users</h1>
<hr></hr>
    


          
<div className="replies-area" style={{ display: "block" }}>
      
    <ul style={{ listStyleType: "none" }}>     

{this.state.arrayforcards.map(feedback => (
          <div className="listofreplies">                                           
 
          <li>
  <div className="card-body donor-reply-card-body">
<h5 className="card-title donor-reply-card-title">{feedback.user[0].name} -{feedback.user[0].type.toUpperCase()}</h5>
    <p className="card-text donor-reply-card-text">{feedback.comment}</p>
       <div style={{ display: "flow-root" }}>
       <h6 style={{ float: "right" }} className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{feedback.created_at}</h6>
       </div>
  </div> 
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

export default AdminPanelUserFeedback;