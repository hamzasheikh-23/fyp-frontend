import React from 'react';
import DonationDetailsModal from '../Modal/DonationDetailsModal';
import axios from 'axios';

class Card extends React.Component{
    state = {
        addDetailModalShow: false,
    };

    render(){
        let addDetailModalClose=()=> this.setState({addDetailModalShow:false});
        let badgeClass="badge";
        if(this.props.status==="Rejected"){
            badgeClass="badge badge-danger";
        }
        if(this.props.status==="Approved"){
            badgeClass="badge badge-success";
        }
        if(this.props.status==="Pending"){
            badgeClass="badge badge-warning";
        }
        let images=[this.props.itemImg1,this.props.itemImg2,this.props.itemImg3];
        return(
            <div>
                
                <div class="card">
                            {this.props.itemImg1 && <img src={this.props.itemImg1} alt=".." className="card-image"/>}
                            <div class="card-body">
                                <h5 class="card-title">{this.props.title} </h5>
                                {/* <span style={{marginBottom:'10px'}} class={badgeClass}>{this.props.status}</span>  */}
                                <p class="card-text" >{this.props.description}</p>
                                <p class="card-text" ><span style={{fontWeight:'bold'}}>Quantity</span> &nbsp; {this.props.quantity}</p>
                                <p class="card-text" ><span style={{fontWeight:'bold'}}>Quantity/Unit</span> &nbsp; {this.props.quantityPerUnit}</p>
                                <p class="card-text" ><span style={{fontWeight:'bold'}}>Weight</span> &nbsp; {this.props.weight}</p>
                                <p class="card-text" ><span style={{fontWeight:'bold'}}>Expiration Date</span> &nbsp; {this.props.date}</p>

                                <button href="#" onClick={()=>this.setState({addDetailModalShow:true})}  class="btn btn-primary view-detail">View Details</button>
                                {this.props.status==="Pending"? <button style={{marginLeft:"10px"}} href="#" onClick={()=>{this.props.delete(this.props.itemId)}}  class="btn btn-danger view-detail">Delete</button> : null }
                            </div>
                </div>
                <DonationDetailsModal
                itemImages={images}
                data={this.props}
                item={this.props.itemId}
                show={this.state.addDetailModalShow}
                onHide={addDetailModalClose}
            />
            </div>
       
        );
    }
}

export default Card;