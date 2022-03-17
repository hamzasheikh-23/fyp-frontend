import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Field, reduxForm, reset} from 'redux-form';
import axios from 'axios';

import history from "../../assets/history";
import {withRouter} from "react-router-dom";
import {NGOStoryAdd} from '../../actions';


import {getCurrentDate} from '../../utils';

// import { FormInput } from "shards-react";
// import { FormTextarea } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";

import './SuccessStoryForm.css';
import './ImageUpload.css';






const initialsuccessState={
    storytitle:"",
    storytitleError:"",
    storyDescription:"",
    storyDescriptionError:"",
    file:'',
   // selectedFile:'',
    category:'null',
    imagePreviewUrl: '',
    storyimageError:'',
    storyDate:getCurrentDate(),
   
}

class SuccessStoryForm extends Component{
    constructor() {
        super();
     
        this.state = initialsuccessState;

     //   this.handleInputChange = this.handleInputChange.bind(this);
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



      SuccessStoryFormInputChange=(event, fieldName)=>{
        this.setState({[fieldName]: event.target.value });
        console.log(event.target.value);
    };

    

    Storyvalidation=(e)=>{
        let storyDescriptionError="";
        let storytitleError="";
        let storyimageError="";

        if(!this.state.storytitle){
            storytitleError='*required';
            }
        
        if(!this.state.storyDescription){
            storyDescriptionError='*required';
            }
           
        if(!this.state.file){
          storyimageError='*required';
          }
        
       

        if(storytitleError||storyDescriptionError|| storyimageError){
            this.setState({storytitleError,storyDescriptionError, storyimageError});
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
 
  ////////////// 
//   handleInputChange(event) {
//     this.setState({
//         selectedFile: event.target.files[0],
//       })
// }
 
  

   SuccessStoryFormSubmitHandler=(e,formValues, dispatch)=>{
        e.preventDefault();
          
        const isValid=this.Storyvalidation();
        if (isValid){
        
          const storyData={
               
                        ngo_id: localStorage.getItem('loginId'),
                        title:this.state.storytitle,
                        description:this.state.storyDescription,
                        image: this.state.file,
                        status: 'Pending',
                        imageurl: this.state.imagePreviewUrl,
                       // storyDate: this.state.storyDate,
                           }

      let data = new FormData();
        for(var key in storyData){
          data.set(key, storyData[key])
        }

        
      console.log("submittedData", storyData);
        axios({
          method: "post",
          data: data,
          url: '/api/storeStory',
          headers: {'Content-Type': 'multipart/form-data' } //to submit documents
        })
        //  axios.post('/api/storeStory',storyData)
        //.then(res=>console.log(res.data));  
        //clear form
            this.setState(initialsuccessState);
           
          }

          
     
        };

//*****OLD CODE FOR IMG UPLOAD//
/**for images */
/*     _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
      } */
 /////////////
 
 


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


                <form className="success-story-form" onSubmit={this.SuccessStoryFormSubmitHandler} noValidate>
                 
                
                <div className="form-group">
                        <label htmlFor="storytitle" className="my-story-label">Title:</label>
                        <input size="lg" placeholder="Add a title" name="storytitle" 
                                value={this.state.storytitle}  
                                onChange={event=> this.SuccessStoryFormInputChange(event, "storytitle")}  
                                id="storytitle" 
                                className="form-control" />
                                
                        <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.storytitleError}</div>
                </div> 
              

                <div className="form-group">
                        <label htmlFor="story-description" className="my-story-label">Description:</label>
                        
                        <textarea name="story-description" 
                                value={this.state.storyDescription}  
                                onChange={event=> this.SuccessStoryFormInputChange(event, "storyDescription")}  
                                id="story-description" 
                                placeholder={this.props.descplaceholder}
                                className="form-control" 
                                rows="4"/>
                        <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.storyDescriptionError}</div>
                 </div> 

                <div className="form-group">  

                        <div className="previewComponent">

                         <label htmlFor="story-image" className="my-story-label">Cover Image:</label>                                  
                        <input className="fileInput" id="fileInput" name="story-image"
                        type="file" 
                        onChange={(e)=>this._handleImageChange(e)} />
                        
                        <div className="imgPreview" id="imgPreview">
                        {$imagePreview}
                        </div>
                        </div>
                        
                      <div style={{fontSize:"12.8px", color:"#DC3545", marginLeft:"10px"}}>{this.state.storyimageError}</div>
             
                </div>


<hr></hr>
                <button className=" my-btn signup-btn" 
                        type="submit" 
                        onClick={this.SuccessStoryFormSubmitHandler}>
                
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


export default SuccessStoryForm;


// const formWrapped= reduxForm({
//   form:'storyForm'
// }) (SuccessStoryForm);
// const mapStateToProps=(state)=>{
//   return {}
// }
// export default connect(mapStateToProps)(formWrapped);



// const mapStateToProps=(state)=>{
//   return {data: state.story}
// }
// export default connect(mapStateToProps,{NGOStoryAdd})(SuccessStoryForm);