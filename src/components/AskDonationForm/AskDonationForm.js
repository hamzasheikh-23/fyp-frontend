import React, { Component } from 'react';
import {getCurrentDate} from '../../utils';

// import { FormInput } from "shards-react";
// import { FormTextarea } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import './AskDonationForm.css';
import '../SuccessStoryForm/SuccessStoryForm.css';
import '../SuccessStoryForm/ImageUpload.css';

import axios from 'axios';

const initialDonationFormState={
    donationTitle:"",
    donationTitleError:"",
    donationDescription:"",
    donationDescriptionError:"",
    donationCategoryError:"",
    file: '',
    imagePreviewUrl: '',
    donationImageError:'',
    askDonationDate:getCurrentDate(),
    categoryType:"",
   
}

class AskDonationForm extends Component{

    constructor() {
        super();
        this.state = initialDonationFormState;
      }
      
    state = {
      siderDrawerOpen: false,
  };

  drawerToggleHandler = () => {
    this.setState(prevState => {
        return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
};

backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
};

askDonationFormInputChange=(event, fieldName)=>{
        this.setState({[fieldName]: event.target.value });
        console.log(event.target.value);
    };

    

    donationValidation=(e)=>{
        let donationDescriptionError="";
        let donationTitleError="";
        let donationImageError="";
        let donationCategoryError="";

        if(!this.state.donationTitle){
            donationTitleError='*required';
            }
        
        if(!this.state.donationDescription){
            donationDescriptionError='*required';
            }
           
        if(!this.state.file){
            donationImageError='*required';
          }
        
        if(!this.state.categoryType){
            donationCategoryError='*required';
            }
       

        if(donationTitleError||donationDescriptionError|| donationImageError || donationCategoryError){
            this.setState({donationTitleError,donationDescriptionError, donationImageError, donationCategoryError});
            return false;
        }
        
        return true;
    };


    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];

  console.log(e.target.files[0]);
      reader.onloadend = () => {
        console.log("called ", file)
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }



    askDonationFormSubmitHandler=(e,formValues, dispatch)=>{
        e.preventDefault();
        
        const isValid=this.donationValidation();
        if (isValid){
            const askDonationData={
                ngo_id: localStorage.getItem('loginId'),
                title: this.state.donationTitle,
                description:this.state.donationDescription,
                image: this.state.file,
                category: this.state.categoryType,
                status: 'Pending',
            }
         
            console.log(askDonationData);

            
      let data = new FormData();
      for(var key in askDonationData){
        data.set(key, askDonationData[key])
      }

      
    console.log("submittedData", askDonationData);
      axios({
        method: "post",
        data: data,
        url: '/api/createRequestedItem',
        headers: {'Content-Type': 'multipart/form-data' } //to submit documents
      })

           // axios.post('/api/createRequestedItem',askDonationData)
            // .then(res=>console.log(res.data));  
            //clear form
               this.setState(initialDonationFormState);
               
              }
 
    };

   

    render(){

        let backdrop;
        if (this.state.siderDrawerOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />;
        }
  
  
   
          let {imagePreviewUrl} = this.state;
          let $imagePreview = null;
          if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} alt="No preview could be fetched" />);
          } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
          }

          return(

            <div>
            <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
            <SideDrawer about={true} show={this.state.siderDrawerOpen} />
            {backdrop}
  
  
              <div className={this.props.bgclass}>
              <div className="container" id="container">
               
              
             
          <h1 className="blue-heading success-main-heading">{this.props.formheading}</h1>
          
            {/* iconpicture */}
  
            <div className="imagecont" >
              <img src={this.props.iconimageurl} className="iconimage"></img>
            </div>
                         
            {/* iconpicture */}
  
                   <form className="success-story-form" onSubmit={this.askDonationFormSubmitHandler} noValidate> 
           <hr></hr>     
                <div className="form-group" id="categorydropdown">
                        <label htmlFor="categoryType" className="my-donation-label"></label>
                        <select name="categoryType" 
                                value={this.state.categoryType}  
                                onChange={event=> this.askDonationFormInputChange(event, "categoryType")}  
                                id="category" 
                                className="btn btn-primary ">
                            <option value="category" hidden>Category:</option>
                            <option className="dropdown-item">Clothes</option>
                            <option className="dropdown-item">Books</option>
                            <option className="dropdown-item">Toys</option>
                            <option className="dropdown-item">Medicines</option>
                        </select>

                        <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.donationCategoryError}</div>
                    </div> 



                  <div className="form-group">
                     <label htmlFor="donationTitle" className="my-story-label">Title:</label>
                          <input  placeholder="Add a title" name="donationTitle" 
                                  value={this.state.donationTitle}  
                                  onChange={event=> this.askDonationFormInputChange(event, "donationTitle")}  
                                  id="donationtitle" 
                                  className="form-control mb-2" />
                                  
                          <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.donationTitleError}</div>
                  </div> 
                
  
                  <div className="form-group">
                          <label htmlFor="donation-description" className="my-story-label">Description:</label>
                          
                          <textarea name="donation-description" 
                                  value={this.state.donationDescription}  
                                  onChange={event=> this.askDonationFormInputChange(event, "donationDescription")}  
                                  id="donation-description" 
                                  placeholder={this.props.descplaceholder}
                                  className="form-control" 
                                  rows="3"/>
                          <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.donationDescriptionError}</div>
                   </div> 



                  <div className="form-group">  
  
                          <div className="previewComponent">
  
                           <label htmlFor="donation-image" className="my-story-label">Cover Image:</label>                                  
                          <input className="fileInput" id="fileInput" name="donation-image"
                          type="file" 
                          onChange={(e)=>this._handleImageChange(e)} />
                          
                          <div className="imgPreview" id="imgPreview">
                          {$imagePreview}
                          </div>
                          </div>
                          
                        <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.donationImageError}</div>
               
                  </div>
  
  
  <hr></hr>
                  <button className=" my-btn signup-btn" 
                          type="submit" 
                          onClick={this.askDonationFormSubmitHandler}>
                  
                  {this.props.buttontext}
                          
                  </button>
                    
  
  
                   </form>
  
                   <br></br>
                   <br></br>
  
  
  
  
  
  
            </div>
            </div>
            </div>
          ); 
      }
  }
  
export default AskDonationForm;

