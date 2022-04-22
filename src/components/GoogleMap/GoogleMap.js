import React, { Component } from 'react';
import Map from './Map';

class GoogleMap extends Component {
	constructor(props){
		super(props);
		this.state={
		//   latitude: 24.9332791,
		//   longitude: 67.0565477,
		latitude: 24.9331712,
		longitude: 67.0564352,
		}
	  }
	  UNSAFE_componentWillMount(){
		  this.getLocation();
		  console.log("result "+this.props);
	  }
	getLocation=()=>{
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(this.getCoordinates,this.handleLocationError);
		} else {
		  alert("Geolocation is not supported by this browser.");
		}
	  }
	  getCoordinates=(pos)=>{
		console.log(pos.coords);
		this.setState({
		  latitude: pos.coords.latitude,
		  longitude: pos.coords.longitude,
		})
	  }
	  handleLocationError=(error)=>{
		switch(error.code) {
		  case error.PERMISSION_DENIED:
			alert("User denied the request for Geolocation.");
			break;
		  case error.POSITION_UNAVAILABLE:
			alert("Location information is unavailable.");
			break;
		  case error.TIMEOUT:
			alert("The request to get user location timed out.");
			break;
		  case error.UNKNOWN_ERROR:
			alert("An unknown error occurred.");
			break;
		  default:
		  alert("An unknown error occurred.");
		}
	  }

	render() {
		return(
			<div className="container">
				<Map 
					donationId={this.props.location.state.donationId}
					isEdit={this.props.location.state.isEdit}
					redirect={this.props.history}
					donationDetails={this.props.location.state.data}
					google={this.props.google}
					center={{lat: this.state.latitude, lng: this.state.longitude}}
					height='650px'
					zoom={15}
				/>
			
			</div>
		);
	}
}

export default GoogleMap;