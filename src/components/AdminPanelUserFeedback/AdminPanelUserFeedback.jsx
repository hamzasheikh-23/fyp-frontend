import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer'
import TableRow from './TableRow'
import GetDonations from './APIs/GetDonations'
import './AdminPanelUserFeedback.css'

const AdminPanelUserFeedback = (props) => {

    const [sideOpen, setSideOpen] = useState(false)
    const [userFeedbacks, setUserFeedbacks] = useState([])

    const rows = [
        {
            "FeedbackId": 7,
            "UserId": 2,
            "Feedback": "Warm Gloves",
        },
        {
            "FeedbackId": 7,
            "UserId": 2,
            "Feedback": "Warm Gloves",
        },
        {
            "FeedbackId": 7,
            "UserId": 2,
            "Feedback": "Warm Gloves",
        }
    ]

    const fetchData = async () => {
        await GetDonations('pending').then(res =>  {
            setUserFeedbacks(rows)
        }).catch(err => toast.error(err.response.data.message))
    } 

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true}/>
            <SideDrawer about={true} show={sideOpen} />
            <h7 onClick={()=>props.history.goBack()} style={{padding:'16px', display:'inline-block', cursor:'pointer'}}>GO BACK</h7>
            <h1 className="page-heading-donation-requests">User Feedback</h1>
        
            <div className='table-donation-requests'>
                <Table responsive="md" bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Feedback ID</th>
                            <th>User ID</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow rows={userFeedbacks} />
                    </tbody>
                </Table>
            </div>
        </>
    )

}


export default AdminPanelUserFeedback