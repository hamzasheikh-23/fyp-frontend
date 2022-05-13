import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelManageSubscriptions.css'

const AdminPanelManageSubscriptions = () => {

    const [sideOpen, setSideOpen] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])

    // const rows = [
    //     {
    //         "PlanId": 7,
    //         "PlanName": "Warm Gloves",
    //         "Amount": 1000,
    //         "Description": "Good Gloves",
    //         "IsActive": true,
    //     },
    //     {
    //         "PlanId": 7,
    //         "PlanName": "Warm Gloves",
    //         "Amount": 1000,
    //         "Description": "Good Gloves",
    //         "IsActive": true,
    //     },
    //     {
    //         "PlanId": 7,
    //         "PlanName": "Warm Gloves",
    //         "Amount": 1000,
    //         "Description": "Good Gloves",
    //         "IsActive": false,
    //     }
    // ]

    const fetchData = async () => {
        await GetDonations('pending').then(res =>  {
            setSubscriptions(res)
        }).catch(err => toast.error(err.response.data.message))
    } 

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true}/>
            <SideDrawer about={true} show={sideOpen} />
            <h1 className="page-heading-donation-requests">Manage Subscriptions</h1>
        
            <div className='table-donation-requests'>
                <Table responsive="md" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Plan ID</th>
                            <th>Plan Name</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow update={fetchData} rows={subscriptions} />
                    </tbody>
                </Table>
            </div>
        </>
    )

}


export default AdminPanelManageSubscriptions