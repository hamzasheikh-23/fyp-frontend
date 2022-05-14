import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelManageOrders.css'

const AdminPanelManageOrders = (props) => {

    const [sideOpen, setSideOpen] = useState(false)
    const [ngoRequests, setNgoRequests] = useState([])
    // const [statusFilter, setStatusFilter] = useState('pending')

    // const rows = [
    //     {
    //         "DonationId": 7,
    //         "DonorId": 2,
    //         "Title": "Warm Gloves",
    //         "Quantity": 1,
    //         "Weight": 0.2,
    //         "QuantityPerUnit": 2,
    //         "ExpiryDate": "2022-03-20T02:46:00",
    //         "PostedDate": "2022-03-18T05:02:00",
    //         "StatusId": 3,
    //         "Status": "Pending",
    //         "IsActive": "true",
    //         "Description": "Good Gloves",
    //         "Rating": 4,
    //         "ConditionId": 2,
    //         "Condition": "Used",
    //         "CategoryId": 3,
    //         "Category": "Medicine",
    //         "Address": null,
    //         "Image1base64": null,
    //         "Image2base64": null,
    //         "Image3base64": null,
    //         "Image1Name": null,
    //         "Image2Name": null,
    //         "Image3Name": null,
    //         "Image1": null,
    //         "Image2": null,
    //         "Image3": null
    //     },
    //     {
    //         "DonationId": 7,
    //         "DonorId": 2,
    //         "Title": "Warm Gloves",
    //         "Quantity": 1,
    //         "Weight": 0.2,
    //         "QuantityPerUnit": 2,
    //         "ExpiryDate": "2022-03-20T02:46:00",
    //         "PostedDate": "2022-03-18T05:02:00",
    //         "StatusId": 3,
    //         "Status": "Pending",
    //         "IsActive": "true",
    //         "Description": "Good Gloves",
    //         "Rating": 4,
    //         "ConditionId": 2,
    //         "Condition": "Used",
    //         "CategoryId": 3,
    //         "Category": "Medicine",
    //         "Address": null,
    //         "Image1base64": null,
    //         "Image2base64": null,
    //         "Image3base64": null,
    //         "Image1Name": null,
    //         "Image2Name": null,
    //         "Image3Name": null,
    //         "Image1": null,
    //         "Image2": null,
    //         "Image3": null
    //     },
    //     {
    //         "DonationId": 7,
    //         "DonorId": 2,
    //         "Title": "Warm Gloves",
    //         "Quantity": 1,
    //         "Weight": 0.2,
    //         "QuantityPerUnit": 2,
    //         "ExpiryDate": "2022-03-20T02:46:00",
    //         "PostedDate": "2022-03-18T05:02:00",
    //         "StatusId": 3,
    //         "Status": "Pending",
    //         "IsActive": "true",
    //         "Description": "Good Gloves",
    //         "Rating": 4,
    //         "ConditionId": 2,
    //         "Condition": "Used",
    //         "CategoryId": 3,
    //         "Category": "Medicine",
    //         "Address": null,
    //         "Image1base64": null,
    //         "Image2base64": null,
    //         "Image3base64": null,
    //         "Image1Name": null,
    //         "Image2Name": null,
    //         "Image3Name": null,
    //         "Image1": null,
    //         "Image2": null,
    //         "Image3": null
    //     }
    // ]

    const fetchData = async () => {
        await GetDonations('').then(res =>  {
            console.log('res',res)
            if(!res.noData){
                setNgoRequests(res.order)
            }
            else{
                setNgoRequests([])
            }
        }).catch(err => console.log(err))
    } 

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true}/>
            <SideDrawer about={true} show={sideOpen} />
            <h7 onClick={()=>props.history.goBack()} style={{padding:'16px', display:'inline-block', cursor:'pointer'}}>GO BACK</h7>
            <h1 className="page-heading-donation-requests">Manage NGO Orders</h1>
        
            <div className='table-donation-requests manage-order'>
                <Table responsive="md" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Case ID</th>
                            <th>NGO ID</th>
                            <th>NGO Name</th>
                            <th>Donation ID</th>
                            <th>Donor ID</th>
                            <th>Donor Name</th>
                            <th>Pickup Address</th>
                            <th>Delivery Address</th>
                            <th>Status</th>
                            <th>Date and Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow update={fetchData} rows={ngoRequests} />
                    </tbody>
                </Table>
            </div>
        </>
    )

}


export default AdminPanelManageOrders