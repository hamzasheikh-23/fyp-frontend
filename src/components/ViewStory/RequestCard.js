import React from "react";
// import ProceedOrderModal from '../Modal/ProceedOrderModal';

class RequestCard extends React.Component {
  // constructor(props){
  //     super(props);
  //     this.state = {
  //         addModalShow: false,
  //     };
  // }

  render() {
    // console.log('result',this.props.body7)
    // let addModalClose=()=> this.setState({addModalShow:false});
    return (
      <div>
        <div style={{display:'flex'}} class="card-body ngo-request-card-body">
            <div style={{widht:'200px', height:'200px', backgroundColor:'red'}}>
          <img
            width="100%"
            height="100%"
            style={{ marginBottom: "10px",  }}
            src={this.props.image}
            styles={{ objectFit: "contain" }}
            alt="..."
          />

            </div>
          <div style={{marginLeft:'1rem'}}>
            <h5 class="card-title ngo-request-card-title">
              NGO: {this.props.org}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted ngo-request-card-subtitle">
              Title: {this.props.title}
            </h6>
            {this.props.body1 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body1}</p>
            ) : null}
            {this.props.body2 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body2}</p>
            ) : null}
            {this.props.body3 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body3}</p>
            ) : null}
            {this.props.body4 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body4}</p>
            ) : null}
            {this.props.body5 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body5}</p>
            ) : null}
            {this.props.body6 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body6}</p>
            ) : null}
            {this.props.body7 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body7}</p>
            ) : null}
            {this.props.body8 !== undefined ? (
              <p class="card-text ngo-request-card-text">{this.props.body8}</p>
            ) : null}
          </div>
        </div>

        {/* <ProceedOrderModal
                show={this.state.addModalShow}
                onHide={addModalClose}
            /> */}
      </div>
    );
  }
}
export default RequestCard;
