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
        axios.get('/api/getAllDonatedItems')
        .then(res=>{
        res.data.map((item)=>{
           if(item.category==='Clothes'){
               clothes.push(item)
           }
           if(item.category==='Medicines'){
            medicines.push(item)
            }
            if(item.category==='Toys'){
                toys.push(item)
            }
            if(item.category==='Books'){
                books.push(item)
            }
        })
        this.setState({series:[clothes.length, books.length, toys.length, medicines.length]})
        // console.log('series', clothes.length, books.length, toys.length, medicines.length)
         

        //   let newSeries=[res.data.ngos.length]
        
        //   axios.get('/api/getUsers/donor')
        //   .then(response=>{
        //       console.log('donor',response.data.users.length)
        //       newSeries=[...newSeries,response.data.users.length]
        //       console.log('series',newSeries)
        //       this.setState({series:[...newSeries]})
        //   })

        //   this.setState({series:[]})
        //   this.setState({array:[...res.data.ngos]})
          // console.log(this.state)
      })
        .catch(err=>console.log('NGOs',err))
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