import React, { Component } from 'react';
//import './AccountTypeButton.css';
import './DummyImage.css';

class DummyImage extends Component{
    render(){
    return(
        <div className="account-button">
             
                <div className="pic-container ">
                    <div className={this.props.picture}></div>
                    
                </div>
            
            </div>
        
    ); 
  }
}

export default DummyImage;