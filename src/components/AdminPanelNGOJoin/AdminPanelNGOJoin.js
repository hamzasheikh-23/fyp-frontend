import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import DonationModal from './DonationModal';
import 'react-responsive-modal/styles.css';
import axios from 'axios'
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';

import '../AdminPanelNGORecords/AdminPanelNGORecords.css'
import './AdminPanelNGOJoin.css'

class AdminPanelNGOJoin extends React.Component {

  componentDidMount(){
 
    axios.get('/api/getNGOs/Pending')
    .then(res=>{
      // console.log('ngos', res.data.ngos)
      this.setState({array:[...res.data.ngos]})
      console.log(this.state)
  })
    .catch(err=>console.log('NGOs',err))
  }
  state = {
    open: false,



       //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
                
       array : [],

//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
};

updateList=()=>{

  axios.get('/api/getNGOs/Pending')
  .then(res=>{
    // console.log('ngos', res.data.ngos)
    this.setState({array:[...res.data.ngos]})
    // console.log(this.state)
})
  .catch(err=>console.log('NGOs',err))
}

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

///////////////

  render() {
    let onClose=()=> this.setState({open:false});

    const { open } = this.state; 
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

<h1 className="text-in-admin1" >Pending Join Requests from NGOs</h1>
<hr></hr>
    
<ul className="ngo-u-list" style={{width : "100%" } }>    




   <div class="row-ngo">
{this.state.array.map(data=>{
  return(
    <List
       ngoname={data.name}
       ngoid={data.id}
       update={this.updateList}
       />
  );
})}

</div>     

</ul>

<hr></hr>
         
 </div>
  <Footer/>
     
      </div>
    );
  }
}

export default AdminPanelNGOJoin;