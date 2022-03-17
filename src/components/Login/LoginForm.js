import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './LoginForm.css';
import FaceImage from '../../images/peo.png';
import {FaAt} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const LoginInitialState={
    loginEmail:"",
    loginPassword:"",
    loginEmailError: "",
    loginPasswordError: "",
    loginErr: false
}

class LoginForm extends Component{
    constructor(){
        super();
        this.state=LoginInitialState;
    }
    LoginHandleInputChange=(event, fieldName)=>{
        this.setState({[fieldName]: event.target.value });
    };
    loginFormValidate=()=>{
        let loginEmailError= "";
        let loginPasswordError = "";
        const validEmail=/^([a-zA-z0-9_\-\.]+)@([a-zA-z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if(!this.state.loginEmail ){
            loginEmailError="you must enter an email";
        }else if(!validEmail.test(this.state.loginEmail)){
            loginEmailError="invalid email";
        }
        
        if(!this.state.loginPassword){
           loginPasswordError="you must enter password";
        } else if ((this.state.loginPassword.length<5) || (this.state.loginPassword.length>20)){
           loginPasswordError="Password must be between 6 to 20";
        }
        
        if(loginEmailError || loginPasswordError){
            this.setState({loginEmailError,loginPasswordError});
            return false;
        }
        return true;
    }
    LoginFormSubmitHandler=(e)=>{
        e.preventDefault();
        const isLoginFormValid=this.loginFormValidate();
        if (isLoginFormValid){
            console.log(this.state)
            if(this.state.loginEmail==='admin@gmail.com' && this.state.loginPassword==='admin123'){
                localStorage.setItem('admin',true)
                this.props.history.push('/adminPanelMain')
            }
            else{
                    const loginData={
                        email:this.state.loginEmail,
                        password:this.state.loginPassword,
                    }
                    axios.post('/api/login',loginData)
                    .then(res=>{
                        const userData=jwt_decode(res.data.token)
                        // console.log(userData.sub);
                        localStorage.setItem('loginToken', res.data.token);
                        localStorage.setItem('loginId', userData.sub);
                                    axios.get(`/api/getUserDetails/${userData.sub}`)
                                    .then(res=>{
                                        console.log(res.data)
                                
                                        if(res.data.type==='ngo'&& res.data.status==='Pending'){
                                            // console.log('pending ngo')
                                            localStorage.clear();
                                            this.props.history.push('/ngostatuspending');
                                        
                                        }else if(res.data.type==='ngo'&& res.data.status==='Rejected'){
                                            // console.log('to main page')
                                            localStorage.clear();
                                            this.props.history.push('/ngostatusrejected');
                                        }else{
                                            // console.log('donor to main page')
                                            localStorage.clear();
                                            if(res.data.code==='1'){
                                                localStorage.setItem('admin',true);
                                                localStorage.setItem('loginType', 'admin');
                                            }else{
                                                localStorage.setItem('admin',false)
                                                if(res.data.code==='2'){
                                                    //donor
                                                    localStorage.setItem('loginType', 'donor');
                                                }else if(res.data.code==='3'){
                                                    //ngo
                                                    localStorage.setItem('loginType', 'ngo');
                                                }
                                            }
                                            this.props.history.push('/');
                                        }
                                    
                                    })
                                    .catch(err=>console.log(err))
                        
                    }).catch(err=>{
                        this.setState({loginErr: true})
                        console.log('login error',err)
                    }); 
                }
        }   

    };

    render(){
        return(
            <div className="my-login-background">
            <div className="modal-dialog text-center">
                <div className="col-sm-12 main-section">
                    <div className="modal-content">
                    <div className="dark-border">
                        <div className="col-12 user-img">
                            <img src={FaceImage} alt="no img"/>
                        </div>
                        <div className="col-12 form-input">
                        <form className="my-login-form" onSubmit={this.LoginFormSubmitHandler} noValidate>
                        
                            <div className="form-group ">
                                <i><FaAt/></i>
                                    <input type="email" 
                                            className="form-control" 
                                            placeholder="Enter Email"
                                            name="email" 
                                            id="email"
                                            onChange={event=> this.LoginHandleInputChange(event, "loginEmail")} 
                                            value={this.state.loginEmail} 
                                            autoComplete="off"/>
                                    <div style={{fontSize:"12.8px", color:"#DC3545"}}>{this.state.loginEmailError}</div>
                            </div>
                            <div className="form-group">
                            <i><FaLock/></i>
                                <input type="password" 
                                        className="form-control" 
                                        placeholder="Enter Password"   
                                        name="password" 
                                        id="password"
                                        onChange={event=> this.LoginHandleInputChange(event, "loginPassword")} 
                                        value={this.state.loginPassword} 
                                        autoComplete="off"/>
                                <div style={{fontSize:"12.8px", color:"#DC3545"}}>{this.state.loginPasswordError}</div>
                            </div>
                            
                            <button type="submit" className="login-btn my-btn">Login</button>
                        </form>
                        </div>
                        <div className="col-12 forgot">
                            {this.state.loginErr? <p style={{fontSize:"18px", color:"#DC3545", fontWeight:'bold'}}>Login Unsuccessful</p>: null}
                            {/* <p><a href="/">Forgot Password?</a></p> */}
                            <p><Link to="/signup">Don't have an account?</Link></p>
                            <p id="backtohome"><Link to="/">Back to Home Page</Link></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

}

export default LoginForm;