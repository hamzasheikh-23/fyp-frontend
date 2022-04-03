import React from 'react';
import ProceedOrderModal from '../Modal/ProceedOrderModal';
import Card from 'react-bootstrap/Card'
import  ListGroupItem from 'react-bootstrap/ListGroupItem';
import ListGroup  from 'react-bootstrap/ListGroup';
import moment from 'moment';


class RequestCard extends React.Component{
    state = {
        addModalShow: false,
    };
    render() {
        let addModalClose=()=> this.setState({addModalShow:false});
        return(
        // <div >
        //     <div class="card-body ngo-request-card-body">
        //     <img width="200px" height="200px" style={{marginBottom:'10px', objectFit:'cover'}} src={this.props.image} alt="..."/>
        //         <div style={{backgroundColor:'red'}}>
        //         <h5 class="card-title ngo-request-card-title">{this.props.title}</h5>
        //         <h6 class="card-subtitle mb-2 text-muted ngo-request-card-subtitle">{this.props.ngoname}</h6>
        // <p class="card-text ngo-request-card-text">{this.props.des}</p>
        // <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{this.props.date}</h6>
        //         <div class="text-right"><button onClick={()=>this.setState({addModalShow:true})} class="btn btn-primary .ngo-request-card-btn" style={{fontWeight:"bold", padding: "10px 1.25rem"}}>Donate NOW</button></div>

        //         </div>
        //     </div>
            
        //     <ProceedOrderModal
        //         show={this.state.addModalShow}
        //         reqId={this.props.reqId}
        //         onHide={addModalClose}
        //     />
        // </div>
        <Card style={{ width: '18rem', margin:'1rem' }}>
  {/* <Card.Img variant="top" src={this.props.image} /> */}
  <Card.Body>
    <Card.Title>{this.props.caseTitle}</Card.Title>
    <Card.Text>
      {this.props.description}
    </Card.Text>
    <div style={{textAlign:'right', color:'gray', fontSize:'12px'}}>{moment(this.props.postedDate).format('LL')}</div>
  </Card.Body>
    
  <Card.Body>
  <div class="text-right"><button onClick={()=>this.setState({addModalShow:true})} class="btn btn-primary .ngo-request-card-btn" style={{fontWeight:"bold", padding: "10px 1.25rem"}}>Donate NOW</button></div>
  </Card.Body>
  
</Card>
        );

    }
}
export default RequestCard;