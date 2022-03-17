import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';



import {FaUsers, FaRegHandshake,FaSlackHash} from 'react-icons/fa';

import './AdminPanel.css';
import CardsAdminPanel from '../CardsAdminPanel/CardsAdminPanel.js';
import axios from 'axios';





class AdminPanel extends React.Component {
  componentDidMount(){
    axios.get('/api/getNGOs/Approved')
        .then(res=>{
        //   console.log('ngos', res.data.ngos.length)
          let ngos=[res.data.ngos]
        
          axios.get('/api/getUsers/donor')
          .then(response=>{
            //   console.log('donor',response.data.users.length)
              let users=[...ngos,response.data.users]
            //   console.log('series',newSeries)
              this.setState({users:[...users], partners:[...ngos]})
          })
        //   this.setState({series:[]})
        //   this.setState({array:[...res.data.ngos]})
          // console.log(this.state)
      })
        .catch(err=>console.log('NGOs',err))
        axios.get('/api/getAllDonatedItems')
        .then(res=>this.setState({donations:[...res.data]}))
      }
  
    state = {
        users:[],
        partners:[],
        donations:[]
      };
    
      drawerToggleHandler = () => {
        this.setState(prevState => {
          return { siderDrawerOpen: !prevState.siderDrawerOpen };
        });
      };
    
      backdropClickHandler = () => {
        this.setState({ siderDrawerOpen: false });
      };

    render(){
        let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
        return(
            <div >
                 <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true}/>
                <SideDrawer about={true} show={this.state.siderDrawerOpen} />
                {backdrop}
                
                <div className="main-admin-container">
                  

                  <h1 className="text-in-admin1" >Welcome Admin!</h1>
                  <h5 className="text-in-admin2">&nbsp;What would you like to do today?</h5>
                  <hr></hr>



                  <CardsAdminPanel buttontext="View" />


                  <hr></hr>


<div class="container">
    <div class="row">
    <div class="col-md-4">
      <div class="card-counter primary">
      <i className="adminpageicon"><FaUsers/></i>
        <span class="count-numbers">{this.state.users.length}</span>
        <span class="count-name">Total Users</span>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card-counter success">
      <i className="adminpageicon"><FaRegHandshake/></i>
        <span class="count-numbers">{this.state.partners.length}</span>
        <span class="count-name">Our Partners</span>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card-counter info">
      <i className="adminpageicon"><FaSlackHash/></i>
        <span class="count-numbers">{this.state.donations.length}</span>
        <span class="count-name">Successful Donations</span>
      </div>
    </div>
  </div>
</div>               

                 <br></br><hr></hr>
                  
                  
                </div>
                 <Footer/>
            </div>
      
        );
    }
}

export default AdminPanel;