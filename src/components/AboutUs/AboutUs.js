import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import handHeart from '../../images/hand-heart.jpg';
import classRoom from '../../images/class.jpg';
import ngo from '../../images/helping.jpg';
import speak from '../../images/speak-for-change.jpg';
import together from '../../images/together.png';
import yourRight from '../../images/your-right.jpg';
import hope from '../../images/hope.png';
import humanRight from '../../images/humanRight.jpg';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';
// import kid from '../../images/grayscale-kid.jpg';
import './AboutUs.css';

class AboutUs extends React.Component {
    state = {
        siderDrawerOpen: false,
        donor: true
      };
    
      drawerToggleHandler = () => {
        this.setState(prevState => {
          return { siderDrawerOpen: !prevState.siderDrawerOpen };
        });
      };
    
      backdropClickHandler = () => {
        this.setState({ siderDrawerOpen: false });
      };
    render(){
        let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
        return(
            <div className="about-page" style={{ height: "100%" }}>
                 <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true}/>
                <SideDrawer about={true} show={this.state.siderDrawerOpen} />
                {backdrop}
                <div className="about-cover-container">
                    <div className="about-cover"></div>
                </div>

                <div style={{ margin: "0 auto"}}>
                <section className="row about-detail-section1">
                    <div className="col-md-7 grid "  >
                        <div className="side-content">
                            <h2 className="blue-heading">Our Story</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Consequuntur sunt excepturi dictaConsequuntur sunt excepturi dicta ex, placeat ab esse, iure harum eaque 
                            fuga asperiores distinctio amet temporibus enim illum molestiae neque ad 
                            similique possimus repellendus velit! Quaer ex, placeat ab esse, iure harum eaque 
                            fuga asperiores distinctio amet temporibus enim illum molestiae neque ad 
                            similique possimus repellendus velit! Quaerat nihil nemo, aliquam consectetur 
                            debitis illum. Excepturi cum, quaerat minus odit dolorem recusandae, debitis reprehenderit 
                            voluptate?</p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Nostrum suscipit placeat amet vel esse soluta dolorum nesciunt 
                            dolores, possimus sint.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 grid">
                        <div className="about-small-img remove-pic-space">
                            <img src={handHeart} alt="no" className="about-set-img-in-div" />
                        </div>
                    
                    </div>
                </section>
                

                
                <section className="row about-detail-section2">
                    <div className="col-md-7 grid" >
                        <div className="side-content section2 remove-space">
                            <h2 className="blue-heading">Our Mission</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Consequuntur sunt excepturi dicta ex, placeat ab esse, iure harum eaque 
                            fuga asperiores distinctio amet temporibus enim illum molestiae neque ad 
                            similique possimus repellendus velit! QuaerConsequuntur sunt excepturi dicta ex, placeat ab esse, iure harum eaque 
                            fuga asperiores distinctio amet temporibus enim illum molestiae neque ad 
                            similique possimus repellendus velit! Quaerat nihil nemo, aliquam consectetur 
                            debitis illum. Excepturi cum, quaerat minus odit dolorem recusandae, debitis reprehenderit 
                            voluptate?</p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Nostrum suscipit placeat amet vel esse soluta dolorum nesciunt 
                            dolores, possimus sint.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5 grid">
                        <div className="about-small-img section2 remove-pic-space">
                            <img src={classRoom} alt="no" className="about-set-img-in-div" />
                        </div>
                    
                    </div>
                </section>
                <section >
                        <h1 className="blue-heading remove-partner-space">Our Partners</h1>
                        <div className=" about-partners">
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={humanRight} alt="no" className="about-set-img-in-div"/>
                                </div>
                                <h6 className="partner-title">Human Rights Organization</h6>
                            </div>
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={ngo} alt="no" className="about-set-img-in-div"/>
                                </div>
                                <h6 className="partner-title">Helping Hands</h6>
                            </div>
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={yourRight} alt="no" className="about-set-img-in-div" />
                                </div>
                                <h6 className="partner-title">Justice For You</h6>
                            </div>
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={hope} alt="no" className="about-set-img-in-div" />
                                </div>
                                <h6 className="partner-title">Little Care</h6>
                            </div>
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={speak} alt="no"  className="about-set-img-in-div"/>
                                </div>
                                <h6 className="partner-title">Speak For Change</h6>
                            </div>
                            <div className="partner-card">
                                <div className="partner-img">
                                    <img src={together} alt="no" className="about-set-img-in-div" />
                                </div>
                                <h6 className="partner-title">We Work Together</h6>
                            </div>
                       
                        </div>
                    </section>
                    {/* <section className="success-story-section">

                    </section> */}
                    <Footer/>
            
            </div>
        </div>
        );
    }
}

export default AboutUs;