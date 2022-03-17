import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import Card from 'react-bootstrap/Card'
// import {CardDeck} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'



import "./CardsGrid.css";

import "bootstrap/dist/css/bootstrap.min.css";







class CardsGrid extends Component{
    constructor() {
        super();
       
        this.state = {

          
//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
          arrayforcards : [
            {
              id:'1',
              title: 'Donation Request 1',
              image: 'https://i.pinimg.com/originals/5d/b4/19/5db4194390eb77b2b0400066f5fb3bc2.jpg',
              description: 'You saved a life. What is Lorem Ipsum it is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has. In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.'
            },
            {
              id:'2',
              title: 'SuccessStory 2',
              image: 'https://live.staticflickr.com/8374/8415723372_c595df3247_b.jpg',
              description: 'We made people happy'
            },
            {
              id:'3',
              title: 'Donation Request 3',
              image: 'https://i.pinimg.com/originals/5d/b4/19/5db4194390eb77b2b0400066f5fb3bc2.jpg',
              description: 'You saved a life'
            },
            // {
            //   id:'4',
            //   title: 'SuccessStory 4',
            //   image: 'https://live.staticflickr.com/8374/8415723372_c595df3247_b.jpg',
            //   description: 'We made people happy'
            // }
          ]

//****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***
        };
    }


  
    deleteCard(id) {
      console.log(id);
      
      const updatedList = this.state.arrayforcards.filter(data => data.id !== id);
  
      //update state
      this.setState({ arrayforcards: updatedList });
      console.log(updatedList);
      console.log(this.state.arrayforcards);
    }
   



    render(){



        return(





                            <Card className="carddeckclass"    >
                              {this.state.arrayforcards.map(data => (
                      
                              <div className="">                                             

                                    <Card className="bg-dark text-white  " >
                                    
                                      <Card.Img src={data.image} alt="Card image" className="img-in-card cardimgsize" />
                                      <Card.ImgOverlay className="img-in-card allowscroll" id="style-1" >
                                        <Card.Title>{data.title}</Card.Title>

                                        <Card.Text className="img-in-card" style={{align : "justify"}} >
                                        {data.description}
                                            </Card.Text>
                                          
                                      </Card.ImgOverlay>
                              <Button variant="primary" className="bold-text" onClick={() => this.deleteCard(data.id) }>{this.props.buttontext}</Button>
                                    </Card>

                              </div>
                              ) )}
                              </Card>

                              


         

            );
        }
    
    
    }
    
    
    
    
    
    export default CardsGrid;
    
