import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

class TotalUsers extends React.Component{
    constructor(props){
        super(props);
        this.state={
            options:{
                chart:{
                    background:'#f4f4f4',
                    foreColor: '#333',
                    type: 'pie',
                },
                labels: ["NGOS", "DONORS"],
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
                    text:'Total Users',
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
 
        axios.get('/api/getNGOs/Approved')
        .then(res=>{
        //   console.log('ngos', res.data.ngos.length)
          let newSeries=[res.data.ngos.length]
        
          axios.get('/api/getUsers/donor')
          .then(response=>{
            //   console.log('donor',response.data.users.length)
              newSeries=[...newSeries,response.data.users.length]
            //   console.log('series',newSeries)
              this.setState({series:[...newSeries]})
          })
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
                            this.state.series.length? this.state.series : [1, 1]
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
export default TotalUsers;