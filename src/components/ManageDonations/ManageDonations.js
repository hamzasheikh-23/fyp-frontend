import React, { Component } from 'react';

import {Link} from 'react-router-dom';
import axios from 'axios';


import Footer from '../Footer/Footer';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import Card from 'react-bootstrap/Card'
// import {CardDeck} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import CardsGrid from '../CardsGrid/CardsGrid'

import "bootstrap/dist/css/bootstrap.min.css";

import './ManageDonations.css';


class ManageDonations extends Component{
    componentDidMount(){
        console.log(`/api/getRequestedItemsByNgoId/${localStorage.getItem('loginId')}`);
         axios.get(`/api/getRequestedItemsByNgoId/${localStorage.getItem('loginId')}`)
         .then(res=>{
          
          const stories= res.data.filter(story=>story.status==='Pending' || story.status==='Approved'  )
   
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
        
            ngo_id: localStorage.getItem('loginId'),
            siderDrawerOpen: false,
        
        
           };
    }


    state = {
        siderDrawerOpen: false,
    
    };
////
updateList=()=>{
    axios.get(`/api/getRequestedItemsByNgoId/${localStorage.getItem('loginId')}`)
    .then(res=>{
     
     const stories= res.data.filter(story=>story.status==='Pending' || story.status==='Approved'  )

      this.setState({arrayforcards:[...stories]})
  })
    .catch(err=>console.log('Requested Items',err))
  }
  //////

  ////

  deleteCard=(id)=>{
    console.log(id);
    // console.log('clicked',this.props.itemId)
    axios.delete('/api/deleteRequest/'+ id)
    .then(res=>{
        axios.get(`/api/getRequestedItemsByNgoId/${localStorage.getItem('loginId')}`)
        .then(res=>{
     
            const stories= res.data.filter(story=>story.status==='Pending' || story.status==='Approved'  )
     
             this.setState({arrayforcards:[...stories]})
         }).catch(err=>console.log(err)); 
    }).catch(err=>console.log(err)); 
}
 

///////  
    drawerToggleHandler = () => {
        this.setState(prevState => {
            return { siderDrawerOpen: !prevState.siderDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ siderDrawerOpen: false });
    };
    render() {
        let backdrop;
        if (this.state.siderDrawerOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />;
        }
        return (
            <div>
                <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
                <SideDrawer about={true} show={this.state.siderDrawerOpen} />
                {backdrop}
            <div className="my-background"  style={{height : "100%" } }>
                <div className="container">

                <hr></hr>
                  <h1 className="blue-heading success-main-heading">{this.props.pageheading}</h1>
 <br></br>
            <ul className="u-list">     
            <div className="divforbuttons">
            <Link to="/askdonation"  target="_blank" >
                <Button variant="outline-info" className="buttonlist">        
                      <li >
                      Ask for a new Donation
                      </li>
            </Button>
            </Link>

            <Link to="/donor-replies"  target="_blank" >
            <Button variant="outline-info" className="buttonlist">
                      <li>
                      View replies from Donors
                      </li>
            </Button>
            </Link>
            </div> 
<hr></hr>
                      <li>Previously Asked Donations:</li>
                                
                             
                           
                      
                      <Card className="carddeckclass"    >
                              {this.state.arrayforcards.map(data => (
                      
                              <div className="">                                             
                                     
                                    <Card className="bg-dark text-white  " >
                                  
                                      <Card.Img src= {`http://localhost:8000/storage/cover_images/${data.image[0].imageurl}`} alt="Card image" className="img-in-card cardimgsize" />
                                      <Card.ImgOverlay className="img-in-card allowscroll" id="style-1" >
                                        <Card.Title>{data.title}</Card.Title>

                                        <Card.Text className="img-in-card" style={{align : "justify"}} >
                                        {data.description}
                                            </Card.Text>
                                          
                                      </Card.ImgOverlay>
                              <Button variant="primary" className="bold-text" onClick={() => this.deleteCard(data.requestedItem_id) }>{"Delete Request"}</Button>
                                    </Card>

                              </div>
                              ) )}
                              </Card>

            </ul>

                </div>
            </div>
            <Footer/>
            </div>
        );
    }


}





export default ManageDonations;










    