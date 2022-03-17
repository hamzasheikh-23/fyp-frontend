import React, { Component } from 'react';
import './AccountTypeButton.css';
import { FaCertificate } from 'react-icons/fa';

class AccountTypeButton extends Component{
    render(){
    return(
        <button className="account-button" onClick={this.props.AccountHandler}>
             <div className="pic-border">
                <div className="pic-container ">
                    <div className={this.props.picture}></div>
                    <h3 className="tag">{this.props.tagname}</h3>
                </div>
               {this.props.checked ? <i><FaCertificate/></i> : null}
            </div>
        </button>
    ); 
  }
}

export default AccountTypeButton;