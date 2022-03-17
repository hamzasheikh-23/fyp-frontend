import React from 'react';
import DonationModal from './DonationModal';
// import axios from 'axios';

class List extends React.Component{
    state = {
        open: false,
    };
    render(){
        let onClose=()=> {
            this.setState({open:false});
            this.props.update();
    }
    return(
        <div className="">                                             
                         
     
        <li> <div class="column-ngo org-name">{this.props.ngoname}</div>
           <div class="column-ngo">   <span>
                     <button className="btn btn-info btn-sm"  onClick={()=> this.setState({ open: true })}>View Details</button>
                     <br></br>
                 </span>
                 </div>
       </li>
       <DonationModal
                       ngoid={this.props.ngoid}
                       show={this.state.open}
                       onHide={onClose}
                   ></DonationModal>
       
       </div>
    );
    }
}
export default List;