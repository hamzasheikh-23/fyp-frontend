import React from 'react';
import DonationModal from './DonationModal';
// import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class Card1 extends React.Component{
  state = {
        open: false,
    };

    render(){
      let onClose=()=> {
        this.setState({open:false});
        this.props.update();
}
        
        // let images=[this.props.itemImg1,this.props.itemImg2,this.props.itemImg3];
        return(
           <div>
            <Card className="bg-dark text-white  basic-size" >
                                    
            <Card.Img src={this.props.image1} alt="Card image" className="img-in-card-admin cardimgsize" />
        <Card.ImgOverlay className="img-in-card-admin allowscroll" id="style-1" >
             <Card.Title>{this.props.title}</Card.Title>
             <br></br>
           
           <Button variant="primary" className="bold-text"   onClick={()=> this.setState({ open: true })}> View Details </Button>
            </Card.ImgOverlay> 
       </Card>




             
             
               
              
                {/* <div className="card-body donor-reply-card-body">
                      <h5 className="card-title donor-reply-card-title">{this.props.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">Category-{this.props.category}</h6>
                      <p className="card-text donor-reply-card-text">{this.props.description}</p>
                      <p className="card-text donor-reply-card-text">
                        <b>Rating : {this.props.rating} /5 </b>|
                        <b> Condition: </b> {this.props.condition}
                      </p>
                      <p className="card-text donor-reply-card-text"><b>Address: </b>{this.props.donationAddress}</p>
                      <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{this.props.created_at}</h6>

                      <div className="text-right">
                        <button className="btn btn-primary .donor-reply-card-btn" style={{ fontWeight: "bold", padding: "10px 1.25rem" }}
                          onClick={()=> this.setState({ open: true })}>View Details </button>

                      </div>
                </div> */}
          
                <DonationModal
                 ngoId={this.props.ngoId}
                 image={this.props.image1}
                 des={this.props.des}
                 sid={this.props.sid}
                  show={this.state.open}
                  date={this.props.date}
                  onHide={onClose}
              />
            </div>
       
        );
    }
}

export default Card1;