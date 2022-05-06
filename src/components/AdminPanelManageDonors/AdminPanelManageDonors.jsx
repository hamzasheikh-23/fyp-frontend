import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelManageDonors.css'

const AdminPanelManageDonors = () => {

    const [sideOpen, setSideOpen] = useState(false)
    const [donors, setDonors] = useState([])

    const rows = [
        {
            "DonorId": 7,
            "UserId": 4,
            "DonorName": 'Hamza Sheikh',
            "Contact": "+923001234567",
            "Address": 'Model Colony',
            "City": 'Karachi',
            "State": 'Sindh',
            "Cnic": '42201-867-9908-0',
            "IsActive": true,
        },
        {
            "DonorId": 7,
            "UserId": 4,
            "DonorName": 'Hamza Sheikh',
            "Contact": "+923001234567",
            "Address": 'Model Colony',
            "City": 'Karachi',
            "State": 'Sindh',
            "Cnic": '42201-867-9908-0',
            "IsActive": true,
        },
        {
            "DonorId": 7,
            "UserId": 4,
            "DonorName": 'Hamza Sheikh',
            "Contact": "+923001234567",
            "Address": 'Model Colony',
            "City": 'Karachi',
            "State": 'Sindh',
            "Cnic": '42201-867-9908-0',
            "IsActive": true,
        }
    ]

    const fetchData = async () => {
        await GetDonations('pending').then(res =>  {
            setDonors(rows)
        }).catch(err => toast.error(err.response.data.message))
    } 

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true}/>
            <SideDrawer about={true} show={sideOpen} />
            <h1 className="page-heading-donation-requests">Donor Records</h1>
        
            <div className='table-donation-requests'>
                <Table responsive="md" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Donor ID</th>
                            <th>User ID</th>
                            <th>Donor Name</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>CNIC</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow rows={donors} />
                    </tbody>
                </Table>
            </div>
        </>
    )

}


export default AdminPanelManageDonors