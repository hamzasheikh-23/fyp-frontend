import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminRecord.css';
import TablePagination from "../TablePagination/TablePagination";

const AdminRecord = () => {

    const [sideOpen, setSideOpen] = useState(false)
    const [admins, setAdmins] = useState([])
    const [adminsDisplay, setAdminsDisplay] = useState([])


    // const rows = [
    //     {
    //         "UserId": 4,
    //         "AdminId": 4,
    //         "FirstName": 'Hamza Sheikh',
    //         "LastName": 'Hamza Sheikh',
    //         "UserName": 'Hamza Sheikh',
    //         "Email": "hamza@gmail.com",
    //         "Contact": "+923001234567",
    //         "IsActive": true,
    //     },
    //     {
    //         "UserId": 4,
    //         "AdminId": 4,
    //         "FirstName": 'Hamza Sheikh',
    //         "LastName": 'Hamza Sheikh',
    //         "UserName": 'Hamza Sheikh',
    //         "Email": "hamza@gmail.com",
    //         "Contact": "+923001234567",
    //         "IsActive": true,
    //     },
    //     {
    //         "UserId": 4,
    //         "AdminId": 4,
    //         "FirstName": 'Hamza Sheikh',
    //         "LastName": 'Hamza Sheikh',
    //         "UserName": 'Hamza Sheikh',
    //         "Email": "hamza@gmail.com",
    //         "Contact": "+923001234567",
    //         "IsActive": true,
    //     }
    // ]

    const fetchData = async () => {
        await GetDonations(1).then(res =>  {
            if(!res.noData){
                setAdmins(res.adminList)
            }
            else{
                setAdmins([])
            }
        })
        .catch(err => console.log(err))
        // setAdmins(rows)
    } 

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {/* <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true}/>
            <SideDrawer about={true} show={sideOpen} /> */}

            {/* <h1 className="page-heading-donation-requests">Admin Records</h1> */}
        
            <div className='table-donation-requests admin-manage'>
            <TablePagination
          list={admins}
          getData={(data) => setAdminsDisplay(data)}
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
                            <th>Admin ID</th>
                            <th>User ID</th>
                            <th>Admin Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow update={fetchData} rows={adminsDisplay} />
                    </tbody>
                </Table>
                </TablePagination>
            </div>
        </>
    )

}


export default AdminRecord