import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import {Link} from 'react-router-dom';

import Card from 'react-bootstrap/Card'
// import {CardDeck} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'



import "./CardsAdminPanel.css";

import "bootstrap/dist/css/bootstrap.min.css";





class CardsAdminPanel extends Component{
    constructor() {
        super();
       
        this.state = {
           
//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
          arrayforcards : [
            {
              path: "/donation-requests",
              id:'1',
              title: 'Manage Requests from Donors',
              image: 'https://thumbs.dreamstime.com/b/clothes-donation-cute-hand-drawn-woman-girl-holding-boxes-vector-illustration-147311307.jpg',
              // description: 'we are new ngo and we managed to make 100 people happy with this platform thanks here is a pic'
            },
            {
              path:"/manage-ngo-requests",
              id:'2',
              title: 'Manage Cases from NGOs',
              image: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/27852537/original/c25b4307292b75a5e9c2db717c866801fae4c177/help-poor-peoples-of-azad-kashmir-with-your-donations.jpg',
              // description: 'my name is abc i recovered by your ddonations keep doanting thanks'
            },
            {
              id:'3',
              path:"/manage-partner-ngos",
              title: 'Manage Partner NGO',
              image: 'https://thumbs.dreamstime.com/b/multiracial-group-black-african-american-caucasian-asian-hands-holding-each-other-wrist-tolerance-unity-love-anti-135505973.jpg',
              // description: 'You saved a life. What is Lorem Ipsum it is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'4',
              path:"/manage-donors",
              title: 'Manage Donors',
              image: 'https://thumbs.dreamstime.com/b/multiracial-group-black-african-american-caucasian-asian-hands-holding-each-other-wrist-tolerance-unity-love-anti-135505973.jpg',
              // description: 'You saved a life. What is Lorem Ipsum it is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'5',
              path:"/manage-admin",
              title: 'Manage Admins',
              image: 'https://thumbs.dreamstime.com/b/multiracial-group-black-african-american-caucasian-asian-hands-holding-each-other-wrist-tolerance-unity-love-anti-135505973.jpg',
              // description: 'You saved a life. What is Lorem Ipsum it is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'7',
              path:"/manage-subscriptions",
              title: 'Manage Subscriptions',
              image: 'https://blackpinkupdate.com/wp-content/uploads/2018/07/cover-blackpink-update-youtube-statistic-3.jpg',
              // description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'8',
              path:"/manage-order-ngo",
              title: 'Manage Orders',
              image: 'https://blackpinkupdate.com/wp-content/uploads/2018/07/cover-blackpink-update-youtube-statistic-3.jpg',
              // description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'',
              title: 'Statistics',
              image: 'https://blackpinkupdate.com/wp-content/uploads/2018/07/cover-blackpink-update-youtube-statistic-3.jpg',
              path: "/adminPanelStatistics"
              // description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'',
              path:"/user-feedback",
              title: 'User Feedback',
              image: 'https://previews.123rf.com/images/makc76/makc761804/makc76180400013/98562149-rating-satisfaction-feedback-in-form-of-emotions-excellent-good-normal-bad-awful-vector-illustration.jpg',
              // description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
          ]

//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
        };
    }







    render(){
        return(
<div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                            {/* <Card className="carddeckclass"    > */}
                              {this.state.arrayforcards.map(data => (
                      
                              <div className="">                                             

                                    <Card className="bg-dark text-white  basic-size" >
                                    
                                      <Card.Img src={data.image} alt="Card image" className="img-in-card-admin cardimgsize" />
                                      <Card.ImgOverlay className="img-in-card-admin allowscroll" id="style-1" >
                                        <Card.Title>{data.title}</Card.Title>
                                        <br></br>
{/* 
                                        <Card.Text className="img-in-card-admin" style={{align : "justify"}} >
                                        {data.description}
                                            </Card.Text> */} 

                                      
                                      <Button variant="primary" className="bold-text" onClick={() => {
                                        this.props.history.push(data.path)
                                      }}> {this.props.buttontext} </Button>
                                            
                                      </Card.ImgOverlay>
                                  </Card>

                              </div>
                              ) )}
                              {/* </Card> */}
                              </div>

                              


         

            );
        }
    
    
    }
    
    
    
    
    
    export default CardsAdminPanel;
    
    
