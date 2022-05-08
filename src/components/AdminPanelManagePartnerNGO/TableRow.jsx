import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import moment from 'moment'
import PutUpdateDonationStatus from './APIs/PutUpdateDonationStatus'
import './AdminPanelManagePartnerNGO.css'


const TableRow = (props) => {

    const updateDonationStatus = async (id, active) => {
        PutUpdateDonationStatus(id, active).then(res => {
            toast.success("Updated status succesfully!")
            props.update();
        }).catch(err => console.log("Something went wrong, please try again later."))
    }

    return (
        <>
            {props.rows.length > 0 && props.rows.map((row, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.NgoId}</td>
                        <td>{row.UserId}</td>
                        <td>{`${row.FirstName} ${row.LastName}`}</td>
                        <td>{row.Contact}</td>
                        <td>{row.SubscriptionPlan}</td>
                        {/* <td>{row.PaymentInfo}</td> */}
                        <td>{row. RegistrationDate ? moment(row.RegistrationDate).format("DD-MM-YYYY HH:MM A"): ""}</td>
                        <td>{row.Username}</td>
                        <td>{row.Email}</td>
                        {/* <td>{row.Password}</td> */}
                        <td>{row.SubscriptionEnd ? moment(row.SubscriptionEnd).format("DD-MM-YYYY"):""}</td>
                        <td>{row.IsActive ? 'Yes' : 'No'}</td>
                        <td>
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleCheck} onClick={() => updateDonationStatus(row.NgoId, 'true')} />
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={() => updateDonationStatus(row.NgoId, 'false')} />
                        </td>
                    </tr>
                )
            })}
        </>
    )

}


export default TableRow