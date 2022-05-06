import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import PutUpdateDonationStatus from './APIs/PutUpdateDonationStatus'
import './AdminPanelManageDonors.css'


const TableRow = (props) => {

    const updateDonationStatus = async (donationId, status) => {
        PutUpdateDonationStatus(donationId, status).then(res => {
            toast.success("Updated status succesfully!")
        }).catch(err => console.log("Something went wrong, please try again later."))
    }

    return (
        <>
            {props.rows.length > 0 && props.rows.map((row, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.DonorId}</td>
                        <td>{row.UserId}</td>
                        <td>{row.DonorName}</td>
                        <td>{row.Contact}</td>
                        <td>{row.Address}</td>
                        <td>{row.City}</td>
                        <td>{row.State}</td>
                        <td>{row.Cnic}</td>
                        <td>{row.IsActive ? 'Yes' : 'No'}</td>
                        <td>
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleCheck} onClick={() => updateDonationStatus(row.DonationId, 'approved')} />
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={() => updateDonationStatus(row.DonationId, 'rejected')} />
                        </td>
                    </tr>
                )
            })}
        </>
    )

}


export default TableRow