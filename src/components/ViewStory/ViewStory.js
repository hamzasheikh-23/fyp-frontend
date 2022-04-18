import React from 'react';
import Footer from '../Footer/Footer';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";
import BackDrop from "../BackDrop/BackDrop";
import axios from 'axios';
// import './NGORequests.css';
// import ProceedOrderModal from '../Modal/ProceedOrderModal';
import RequestCard from './RequestCard';

class ViewStory extends React.Component {
    componentDidMount(){
        console.log('worked')
        axios.get('https://localhost:44357/story/get')
        .then(res=>{
        //     axios.get('/api/getUsers/ngo')
        //     .then(list=>{
        //         // console.log('ngo list',list.data.users)
        //         this.setState({ngoList:[...list.data.users]})
        //         // console.log(this.state)
        // })
        //     .catch(error=>console.log(error));
     
            this.setState({stories: res.data.map(arr => {
                return {
                    name:arr.NGOId,
                    title:arr.StoryTitle,
                    description:arr.Description,
                    image: "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
                    date: arr.PostedDate
                }
            })})
            console.log('stories', res)
            // console.log('stories resconse',this.state)
    })
        .catch(err=>console.log(err));
        this.filteredContent()
    }
    state = {
        siderDrawerOpen: false,
        donor: true,
        stories:[],
        ngoList:[],
        selectedNgo: '',
        // addModalShow: false,
    };

    filteredContent=()=>{
        if(this.state.selectedNgo!==''){
            axios.get(`/api/getStoriesOfNgo/${this.state.selectedNgo}`)
            .then(res=>{
                // console.log(res.data)
                const newList= res.data.filter(item=>item.status==='Approved')
                this.setState({stories:[...newList]})
            })
            .catch(err=>console.log(err))
        }else{
            axios.get('/api/getApprovedStories')
            .then(res=>this.setState({stories:[...res.data]}))
            .catch(err=>console.log(err))
        }
    }

    drawerToggleHandler = () => {
        this.setState(prevState => {
            return { siderDrawerOpen: !prevState.siderDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ siderDrawerOpen: false });
    };
  
    render() {
        let backdrop;
        if (this.state.siderDrawerOpen) {
            backdrop = <BackDrop click={this.backdropClickHandler} />;
        }
        // let addModalClose=()=> this.setState({addModalShow:false});
        return (
            <div>
                <Toolbar drawerClickHandler={this.drawerToggleHandler} about={true} />
                <SideDrawer about={true} show={this.state.siderDrawerOpen} />
                {backdrop}
                <div className="ngo-main-div">
                    <div className="filter-area">
                        <h2 className="filter-heading">Filter Stories:</h2>
                        <ul className="filter-options">
                            {/* <li><a href="/">All</a></li>
                            <li><a href="/">Human Rights Organization </a></li>
                            <li><a href="/">Helping Hands</a></li>
                            <li><a href="/">Justice For You</a></li>
                            <li><a href="/">Little Care</a></li>
                            <li><a href="/">Speak For Change</a></li>
                            <li><a href="/">We Work Together</a></li> */}
                            <li><a
                            style={{backgroundColor: this.state.selectedNgo===''?'#579df8':'#4a89dc'}}
                            onClick={()=>{this.setState({selectedNgo:''},()=>this.filteredContent())}}>All</a></li>
                            {this.state.ngoList.map((ngo)=>{
                                return(
                 
                                    <li><a
                                    style={{backgroundColor: this.state.selectedNgo===ngo.id?'#579df8':'#4a89dc'}} onClick={()=>{
                                        this.setState({selectedNgo: ngo.id},()=>this.filteredContent())
                                        
                                
                                    }
                                    }>{ngo.name}</a></li>
                                );
                            })}
                            
                        </ul>
                    </div>
                    <div class="request-area">
                        <h3 className="request-area-heading">SUCCESS STORIES</h3>
                        

                        {/* { <RequestCard org="Helping Hands" title="From Beggary To School" 
                        image='http://localhost:8000/storage/cover_images/story1.jpg'
                        body1="A decade ago, we visited a small home in the village of Salehpat, Sindh. There, on a charpoy (woven bed), sat a shy little girl in her TCF School uniform and her feeble old grandmother. Five-year-old Madiha had just been brought into school by her Principal, Madam Saima Memon, who had seen her begging alongside her grandmother in the busy marketplace."
                        body2="Barefoot under the blazing sun, Madiha was wading through throngs of busy shoppers with a begging bowl in her hand when Ms. Saima saw her for the first time."
                        body3='“She held out the palm of her hand,” Ms. Saima recalls with a bright smile. “I saw a strange gleam of hope in her eyes when she looked at me. I took her little hand in mine and asked, ‘Dhee (daughter), would you like to be in school instead?’ Her face lit up instantly!”'
                        body4="Fast forward 10 years, we met Madiha again! This time we saw her as a confident young girl who was preparing for her Board Exams. “She is the brightest student in the class, with 100% attendance,” her teacher said."
                        body5="Madiha’s self-confidence was shining through. A little girl who was on the verge of losing her future to beggary was saved. “I want to end this social problem of beggary and do not want to see any boy or girl spending their childhood begging on the streets,” said Madiha, somberly."
                        body6="On this International Children’s Day, we urge you to take responsibility for supporting one child’s education. With your Donations, Zakat or Sadqah, you can keep a child in school. Please join the movement to turn lives around through the power of education."

                        />
                        <RequestCard org="We Work Together" title="The Power of a Fathers Dream" 
                        image='http://localhost:8000/storage/cover_images/story2.jpg'
                        body1='It’s 7:00 am. Amjad, while sitting cross legged on the floor, in a small room of his home in Korangi, is having breakfast with his wife and six daughters, all clustered around the food mat. It’s time for an animated family chat before everyone sets off for a long day. Amjad is a rickshaw driver who drives along the winding roads of the city, looking for passengers all day, barely making ends meet. “Work is tough these days. It’s hard to tell how many passengers I may get in a day,” he says.'
                        body2='While Amjad strives to make a living wage, his daughters, on the other hand have begun to follow their dreams, carving their own paths to a better future. After studying from TCF Schools, three of Amjad’s daughters are pursuing their tertiary education in some of the best institutions of the country. The eldest one, Amina is enrolled in the Pharmacy Programme at the Dow University of Health Sciences; second in line, Armina, is studying in the BBA Programme at Szabist (Shaheed Zulfikar Ali Bhutto Institute of Science and Technology), while the third one, Muskan made it to IBA, a premier institute of the country to study Computer Science.'
                        body3='The younger three include Mansha who studies at the TCF College while Jaweria and Alisha still attend their TCF School as first and eighth graders.'
                        body4='“What good would it do to educate your daughters? You should worry about their marriage and dowry instead.” Amjad recounts while sharing some hurtful comments that he is used to of hearing. Relentless in his pursuit to give his daughters the best education possible, Amjad pays little heed to them.'
                        body5='“I couldn’t complete my education, and it’s why I am still struggling to earn a living. But I don’t want the same for my daughters. They should have a firm standing in society,” says Amjad.'
                        body6='Muskan, who studies on a full scholarship at IBA, is absolutely proud of her father who remains as their pillar of strength. She can’t wait to complete her degree and support her parents financially.'
                        body7='“There came a time when we lost everything, including our home. That’s when I asked baba (father) to let me work and support the family. He instantly refused, reminding me that only education would change our lives so I must focus on that,” shares Muskan.'
                        body8='Amjad believes that better days are ahead. “I’m very proud of my daughters. I see them working so hard every day. I know that education will change their lives in many ways,” he reaffirms.'
                        
                        /> } */}
                        {this.state.stories.map((story)=>{
                            // var name;
                            // axios.get(`/api/getUserDetails/${story.ngo_id}`)
                            // .then(res=>{
                            //     console.log('donor data',res.data.name)
                            //      name=res.data.name
                            // })
                            // .catch(err=>console.log(err))
                            // console.log('donor data',name)

                            return(
                                <RequestCard org={story.name} title={story.title} 
                                image={story.image}
                                body1={story.description}
                                />

                            );
                        })}

<RequestCard org={'abc organisation'} title={'abc title'} 
                                image={`https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80`}
                                body1={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`}
                                />

<RequestCard org={'abc organisation'} title={'abc title'} 
                                image={`https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwY2F0fGVufDB8fDB8fA%3D%3D&w=1000&q=80`}
                                body1={'dhfsdnjcndvnsdvnsdijceiojdoiajcoasc'}
                                />

                        {/* <RequestCard org="We Work Together" category="Books" 
                        body=""
                        />
                        <RequestCard org="Little Care" category="Toys" /> */}
                       
                    </div>
                </div>
                <Footer/>
            </div>
        );
        }
}
export default ViewStory;