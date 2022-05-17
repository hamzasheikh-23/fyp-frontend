import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import PutUpdateDonationStatus from './APIs/PutUpdateDonationStatus'
import './AdminPanelManageDonors.css'


const TableRow = (props) => {

    const updateDonationStatus = async (donorId, active) => {
        PutUpdateDonationStatus(donorId, active).then(res => {
            console.log('res',res)
            toast.success("Updated status succesfully!")
            props.update()
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
                        <td>{`${row.FirstName} ${row.LastName}`}</td>
                        <td>{row.Username}</td>
                        <td>{row.Contact}</td>
                        <td>{row.Address}</td>
                        {/* <td>{row.City}</td>
                        <td>{row.State}</td> */}
                        <td>{row.CNIC}</td>
                        <td>{row.IsActive && JSON.parse(row.IsActive) ? 'Yes' : 'No'}</td>
                        <td>
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleCheck} onClick={() => updateDonationStatus(row.DonorId, 'true')} />
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={() => updateDonationStatus(row.DonorId, 'false')} />
                        </td>
                    </tr>
                )
            })}
        </>
    )

}


export default TableRow