import React from 'react';
import ReactDOM from 'react-dom';
import DonationModal from './DonationModal'
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Card from './Card';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import Footer from '../Footer/Footer';
import axios from 'axios';

import './AdminPanelDonorRequests.css'

class AdminPanelDonorRequests extends React.Component {
  componentDidMount() {
    // axios.get('/api/getAllDonatedItems').then(res=>console.log('data issue', res))
    axios.get(`/api/getDonatedItemsByStatus/Pending`)
      .then(res => {
        this.setState({ arrayforcards: [...res.data] })
   console.log('added', res.data)
      })
      .catch(err => console.log(err))
  }
  updateList=()=>{

    axios.get(`/api/getDonatedItemsByStatus/Pending`)
    .then(res => {
      this.setState({ arrayforcards: [...res.data] })
 
    })
    .catch(err => console.log(err))
  }

  constructor() {
    super();
    this.state = {
      open: false,


      //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***

      arrayforcards: [],

      //****THIS arrayforcards is for testing, its contents will be replaced by actual values from DATABASE***



    };
  }


  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { siderDrawerOpen: !prevState.siderDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ siderDrawerOpen: false });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  ///////////////

  render() {
    const { open } = this.state;
    let backdrop;
    if (this.state.siderDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
        <SideDrawer about={true} show={this.state.siderDrawerOpen} />
        {backdrop}

        <div className="main-admin-container">

          <h1 className="text-in-admin1" >Pending Donation Requests from Users</h1>
          <hr></hr>




          <div className="replies-area" style={{ display: "block" }}>

           {this.state.arrayforcards.map(item => {
             return(
             <Card 
             itemImg1={item.images[0].imageurl==='noimage.jpg'? null :`http://localhost:8000/storage/cover_images/${item.images[0].imageurl}`}
             itemImg2={item.images[1].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${item.images[1].imageurl}`}
             itemImg3={item.images[2].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${item.images[2].imageurl}`}
             title={item.donor[0].name}
             description={item.description}
             itemId={item.donatedItem_id}
             category={item.category}
             rating={item.rating}
             condition={item.condition}
             donationAddress={item.donationAddress}
             created_at={item.created_at}
             donatedItem_id={item.donatedItem_id}
             update={this.updateList}
             donor={item.donor_id}
             />
             );
           })}

              {/* {this.state.arrayforcards.map(donation => {
                return( 
                  <div>
                <div >


                    <div className="card-body donor-reply-card-body">
                      <h5 className="card-title donor-reply-card-title">{donation.donor_id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted donor-reply-card-subtitle">Category-{donation.category}</h6>
                      <p className="card-text donor-reply-card-text">{donation.description}</p>
                      <p className="card-text donor-reply-card-text">
                        <b>Rating out of 5: </b>{donation.rating}
                        <b> Condition: </b> {donation.condition}
                      </p>
                      <p className="card-text donor-reply-card-text"><b>Address: </b>{donation.donationAddress}</p>
                      <h6 className="reply-date card-subtitle mb-2 text-muted donor-reply-card-subtitle">{donation.created_at}</h6>

                      <div className="text-right">
                        <button className="btn btn-primary .donor-reply-card-btn" style={{ fontWeight: "bold", padding: "10px 1.25rem" }}
                          onClick={()=> this.setState({ open: true })}>View Details </button>

                      </div>
                    </div>
                 
                    <Modal open={open} onClose={this.onCloseModal}
                      center
                      classNames={{
                        overlay: 'customOverlay',
                        modal: 'customModal',
                      }}>
                      <h1>{donation.donor_id}</h1>
                      <h6 className="">USERNAME-DONOR</h6>
                      <hr></hr>
                      <h5 className="small-text-admin">
                        <span className="small-b-i">Category: </span> {donation.category}
                        <hr></hr>
                        <p>{donation.description}</p>
                        <div className="donor-req-img-cont"><img src={`http://localhost:8000/storage/cover_images/${donation.images[0].imageurl}`} className="donor-req-img"></img></div>
                        <br></br>
                        <span className="small-b-i">Condition: </span> {donation.category}
                        <br></br>
                        <span className="small-b-i">Rating: </span> {donation.rating}
                      </h5>
                      <div style={{ textAlign: "center" }}>
                        <button className="btn btn-success btn-sm">Accept</button>
                        <button className="btn btn-danger btn-sm" style={{ marginLeft: "12%" }}>Decline</button>
                      </div>

                    </Modal>
               
                </div>
                   <DonationModal
                   itemImage1={donation.images[0].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${donation.images[0].imageurl}`}
                   itemImage2={donation.images[1].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${donation.images[1].imageurl}`}
                   itemImage3={donation.images[2].imageurl==='noimage.jpg'? null : `http://localhost:8000/storage/cover_images/${donation.images[2].imageurl}`}
                  item={donation.donatedItem_id}
                  show={this.state.open}
                  onHide={this.onCloseModal}
              />
              </div>
                );
                  })} */}
            

          </div>



          <hr></hr>

        </div>
        <Footer />

      </div>
    );
  }
}

export default AdminPanelDonorRequests;