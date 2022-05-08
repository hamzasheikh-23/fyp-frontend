import React from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

class DonorRecords extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        
          series:[],
          options: {
            title:{
                text:'Donors Record',
                align:'center',
                margin:20,
                offsetY:20,
                style:{
                    fontSize:'20px'
                }
            },
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'Categories'
              }
            },
            fill: {
              opacity: 1
            },
            // tooltip: {
            //   y: {
            //     formatter: function (val) {
            //       return "$ " + val + " thousands"
            //     }
            //   }
            // }
          },
        
        
        };
      }
      fetchCategories=async()=>{
        let newCategories=[];
        let clothes=[];
        let books=[];
        let medicines=[];
        let toys=[];
        let newSeries=[];
        let donors=[];
        let cat={};
        let s=[];
        const result= await  axios.get('https://localhost:44357/donation/get')
        console.log('result donor',result.data)
        result.data.forEach(donor=>{
          if(!donors.includes(donor.DonorName)){
            donors.push(donor.DonorName)
          }
        })
        result.data.forEach(item=>{
          if(item.Category){
            if(!cat[item.Category]){
              cat[item.Category] = Array(donors.length).fill(0)
            }
            donors.forEach((ele,i)=>{
              if(item.DonorName===ele){
                cat[item.Category][i]= cat[item.Category][i]+1
              }
            })
          }
          
        })
        for (const key in cat) {
          s.push({
            name: key,
            data: cat[key]
          })
        }
        console.log('apiiiii donor', donors, cat, s)



        // result.data.map((user)=>{
        //   newCategories.push([user.name,`id: ${user.user_id}`])
        //   clothes.push(0)
        //   books.push(0)
        //   medicines.push(0)
        //   toys.push(0)
        //  })
        //  for(let i=0;i<result.data.length;i++){
        //    for(let j=0;j<result.data[i].donatedItems.length;j++){
        //     if(result.data[i].donatedItems[j].category==='Clothes'){
        //       clothes[i]=clothes[i]+1;
        //     }
        //     if(result.data[i].donatedItems[j].category==='Medicines'){
        //       medicines[i]=medicines[i]+1;
        //     }
        //     if(result.data[i].donatedItems[j].category==='Toys'){
        //       toys[i]=toys[i]+1;
        //     }
        //     if(result.data[i].donatedItems[j].category==='Books'){
        //       books[i]=books[i]+1;
        //     }
        //    }
          
        // }
        // newSeries.push({   
        //   name: 'Clothes',
        //   data: [...clothes]  
        // })
        // newSeries.push({   
        //   name: 'Books',
        //   data: [...books]  
        // })
        // newSeries.push({   
        //   name: 'Medicines',
        //   data: [...medicines]  
        // })
        // newSeries.push({   
        //   name: 'Toys',
        //   data: [...toys]  
        // })
        this.setState({options:{...this.state.options, xaxis:{...this.state.xaxis,categories:[...donors]}}})
        this.setState({series:[...s]})
      }
      componentDidMount(){
        this.fetchCategories();
 
       }
    render(){
        return(
            <>
             <Chart
          options={this.state.options} series={
          this.state.series 
          } type="bar" height={550}
            />
           
            </>
        );
    }
}
export default DonorRecords;