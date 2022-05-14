import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelManagePartnerNGO.css'

const AdminPanelManagePartnerNGO = (props) => {

    const [sideOpen, setSideOpen] = useState(false)
    const [partnerNgos, setPartnerNgos] = useState([])

    // const rows = [
    //     {
    //         "NGOId": 7,
    //         "UserId": 4,
    //         "NGOName": 'Hamza Foundation',
    //         "ContactNumber": "+923001234567",
    //         "SubscriptionPlan": 'Premium',
    //         "PaymentInfo": '4242 4242 4242 4242',
    //         "RegistrationDT": '2022-03-20T02:46:00',
    //         "Username": 'Hamza Sheikh',
    //         "Email": 'hamzasheikh@gmail.com',
    //         "Password": '**************',
    //         "SubscriptionEnd": '2022-03-25T02:46:00',
    //         "IsActive": true
    //     },
    //     {
    //         "NGOId": 7,
    //         "UserId": 4,
    //         "NGOName": 'Hamza Foundation',
    //         "ContactNumber": "+923001234567",
    //         "SubscriptionPlan": 'Premium',
    //         "PaymentInfo": '4242 4242 4242 4242',
    //         "RegistrationDT": '2022-03-20T02:46:00',
    //         "Username": 'Hamza Sheikh',
    //         "Email": 'hamzasheikh@gmail.com',
    //         "Password": '**************',
    //         "SubscriptionEnd": '2022-03-25T02:46:00',
    //         "IsActive": true
    //     },
    //     {
    //         "NGOId": 7,
    //         "UserId": 4,
    //         "NGOName": 'Hamza Foundation',
    //         "ContactNumber": "+923001234567",
    //         "SubscriptionPlan": 'Premium',
    //         "PaymentInfo": '4242 4242 4242 4242',
    //         "RegistrationDT": '2022-03-20T02:46:00',
    //         "Username": 'Hamza Sheikh',
    //         "Email": 'hamzasheikh@gmail.com',
    //         "Password": '**************',
    //         "SubscriptionEnd": '2022-03-25T02:46:00',
    //         "IsActive": true
    //     }
    // ]

    const fetchData = async () => {
        await GetDonations(3).then(res =>  {
            console.log('res', res)
            if(!res.noData){
                setPartnerNgos(res.ngoList)
            }
            else{
                setPartnerNgos([])
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
            <h1 className="page-heading-donation-requests">Partner NGO Records</h1>
        
            <div className='table-donation-requests manage-partner-ngo'>
                <Table style={{overflowX: "auto !important"}} responsive bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>NGO ID</th>
                            <th>User ID</th>
                            <th>NGO Name</th>
                            <th>Contact Number</th>
                            <th>Subscription Plan</th>
                            {/* <th>Payment Info</th> */}
                            <th>Registration Date & Time</th>
                            <th>Username</th>
                            <th>Email</th>
                            {/* <th>Password</th> */}
                            {/* <th>Subscription End Date</th> */}
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow update={fetchData} rows={partnerNgos} />
                    </tbody>
                </Table>
            </div>
        </>
    )

}


export default AdminPanelManagePartnerNGO