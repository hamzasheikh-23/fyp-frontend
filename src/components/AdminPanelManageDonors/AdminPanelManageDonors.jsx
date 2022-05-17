import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelManageDonors.css';
import TablePagination from "../TablePagination/TablePagination";

const AdminPanelManageDonors = (props) => {

    const [sideOpen, setSideOpen] = useState(false)
    const [donors, setDonors] = useState([])
    const [donorsDisplay, setDonorsDisplay] = useState([])


    // const rows = [
    //     {
    //         "DonorId": 7,
    //         "UserId": 4,
    //         "DonorName": 'Hamza Sheikh',
    //         "Contact": "+923001234567",
    //         "Address": 'Model Colony',
    //         "City": 'Karachi',
    //         "State": 'Sindh',
    //         "Cnic": '42201-867-9908-0',
    //         "IsActive": true,
    //     },
    //     {
    //         "DonorId": 7,
    //         "UserId": 4,
    //         "DonorName": 'Hamza Sheikh',
    //         "Contact": "+923001234567",
    //         "Address": 'Model Colony',
    //         "City": 'Karachi',
    //         "State": 'Sindh',
    //         "Cnic": '42201-867-9908-0',
    //         "IsActive": true,
    //     },
    //     {
    //         "DonorId": 7,
    //         "UserId": 4,
    //         "DonorName": 'Hamza Sheikh',
    //         "Contact": "+923001234567",
    //         "Address": 'Model Colony',
    //         "City": 'Karachi',
    //         "State": 'Sindh',
    //         "Cnic": '42201-867-9908-0',
    //         "IsActive": true,
    //     }
    // ]

    const fetchData = async () => {
        await GetDonations(2).then(res =>  {
            if(!res.noData){
                setDonors(res.donorList)
            }
            else{
                setDonors([])
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
            <h1 className="page-heading-donation-requests">Donor Records</h1>
        
            <div className='table-donation-requests'>
            <TablePagination
          list={donors}
          getData={(data) => setDonorsDisplay(data)}
          searchParam="Username"
          searchText="User Name"
          filterParam="IsActive"
          filterText="Active Status"
          filterList={[{name:"", value:""},{name:"Yes", value:"true"},{name:"No", value:"false"}]}
        >
                <Table responsive="md" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Donor ID</th>
                            <th>User ID</th>
                            <th>Donor Name</th>
                            <th>User Name</th>
                            <th>Contact</th>
                            <th>Address</th>
                            {/* <th>City</th>
                            <th>State</th> */}
                            <th>CNIC</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow update={fetchData} rows={donorsDisplay} />
                    </tbody>
                </Table>
                </TablePagination>
            </div>
        </>
    )

}


export default AdminPanelManageDonors