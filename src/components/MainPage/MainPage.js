import React, {Component} from 'react';
import './MainPage.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import BackDrop from '../BackDrop/BackDrop';
import {Link} from 'react-router-dom';

class MainPage extends Component{

    state={
        siderDrawerOpen: false,
        donor:true
    };

    drawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {siderDrawerOpen: !prevState.siderDrawerOpen}
        });
    };

    backdropClickHandler=()=>{
        this.setState({siderDrawerOpen:false});
    };

    render(){
        let backdrop;
        if(this.state.siderDrawerOpen){
            backdrop=<BackDrop click={this.backdropClickHandler}/>
        }

        return (
            <div style={{height:'100%'}}>
                  <Toolbar drawerClickHandler={this.drawerToggleHandler} />
                  <SideDrawer show={this.state.siderDrawerOpen} />
                 {backdrop}
                 <main >
                    <div className="display-pic">
                        <div className="display_holderImage"></div>
                            <div className="fade-content">
                                <h1>Little Deeds</h1>
                                <p className="color-highlight">-that make big difference!</p>
                                <hr/>
                                <p>"Little Deeds" is built with love and care for all you who believe that giving to those in need will bring more joy than money could ever buy.</p>
                                {/* <a href="/">Next</a> */}
                                <Link to="/login">
                                <button className="my-btn" >NEXT</button>
                                </Link>
                            </div>
                    </div>
                 </main>
            </div>
        );
    }
}

export default MainPage;