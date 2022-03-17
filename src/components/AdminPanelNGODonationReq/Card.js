import React from 'react';
import DonationModal from './DonationModal';
// import axios from 'axios';

class Card2 extends React.Component{
    state = {
        open: false,
    };

    render(){
        let onClose=()=> {
            this.setState({open:false});
            this.props.update();
    }
        
        let images=[this.props.itemImg1];
        return(
            <div>
                
              
                <div className="card-body donor-reply-card-body">
                <img width="200px" height="200px" style={{marginBottom:'10px'}} src={this.props.itemImg1} style={{objectFit:'cover'}}  alt="..."/>
                      <h5 className="card-title donor-reply-card-title">{this.props.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">NGO: {this.props.ngoname1}</h6>
   
                      <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">Category-{this.props.category}</h6>
                      <p className="card-text donor-reply-card-text">{this.props.description}</p>
                      
                      <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{this.props.date}</h6>

                      <div className="text-right">
                        <button className="btn btn-primary .donor-reply-card-btn" style={{ fontWeight: "bold", padding: "10px 1.25rem" }}
                          onClick={()=> this.setState({ open: true })}>View Details </button>

                      </div>
                </div>
             
                <DonationModal

                ngo={this.props.ngoname}
                   itemImages={images}
                  item={this.props.itemid}
                  show={this.state.open}
                  onHide={onClose}
                  
              />
            </div>
       
        );
    }
}

export default Card2;