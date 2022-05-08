import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

class TotalDonations extends React.Component{
    constructor(props){
        super(props);
        this.state={  
            options:{
                chart:{
                    background:'#f4f4f4',
                    foreColor: '#333',
                    type: 'pie',
                    margin: '0 auto',
                },
                labels: ["Clothes", "Books", "Toys", "Medicines"],
                // xaxis: {
                //     type: 'category'
                //   },
                plotOptions:{
                    bar:{
                        horizontal: false
                    }
                },
                // fill:{
                //     colors:['#f44336']
                // },
                dataLabels:{
                    enabled:false
                },
                title:{
                    text:'Total Donations',
                    align:'center',
                    margin:20,
                    offsetY:20,
                    offsetX:-20,
                    style:{
                        fontSize:'20px'
                    }
                },
            },
                series: [],
               
    
}
    }
    componentDidMount(){
        let clothes=[];
        let books=[];
        let medicines=[];
        let toys=[];
        let temp={};
        axios.get('https://localhost:44357/donation/category/get')
        .then(res1=>{
            res1.data.forEach(ele => {
                console.log('foreach',ele.DonationCategory)
                temp[ele.DonationCategory]=0;
            });
            axios.get('https://localhost:44357/donation/get')
        .then(res=>{
            console.log('res',res, res.data)
        res.data.forEach((item)=>{
            if(item.Category){
                temp[item.Category] = temp[item.Category]+1
            }
        
        })
        console.log('end', temp)
        this.setState({
            series: Object.values(temp),
            options: {...this.state.options, labels: Object.keys(temp)}
        })
       
      })
        .catch(err=>console.log('NGOs',err))
        })
        .catch(err=>console.log(err))
        
      }
    render(){
        return(
            <div>
            <div style={{margin:"0 auto", width:'80%'}}>
                <Chart 
                    style={{margin:"0 auto"}}
                    options={this.state.options}
                    series={
                        this.state.series.length? this.state.series : [0, 0,0,0]
                    }
                    type="pie"
                    height="450"
                    width="100%"
                />
            </div>
           
        </div>
        );
    }
} 
export default TotalDonations;