import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import InfoModal from './InfoModal'
import PutUpdateDonationStatus from './APIs/PutUpdateDonationStatus'
import './AdminPanelDonationRequests.css'


const TableRow = (props) => {

    const [infoModal, setInfoModal] = useState(false)
    const [infoModalData, setInfoModalData] = useState({})

    const handleDetails = (row) => {

        // for(let i = 1; i < 3; i++) {
        //     console.log("Hi")
        // }

        setInfoModalData(row)
        // setInfoModalData({
        //     title: 'Sample',
        //     condition: 'Sample',
        //     category: 'Sample',
        //     quantity: 5,
        //     quantityPerUnit: 5,
        //     weight: 50,
        //     description: 'Sample',
        //     rating: 5,
        //     status: 'Pending',
        //     date: Date(),
        //     expiryDate: Date(),
        //     pickupAddress: 'Sample',
        //     images: [
        //         { src: 'https://tinyurl.com/2smwpjcu' },
        //         { src: 'https://tinyurl.com/ypxhf5ct' },
        //         { src: 'https://tinyurl.com/bdzcce8w' }
        //     ]
        // })
        setInfoModal(true)
    }

    const updateDonationStatus = async (donationId, status) => {
        PutUpdateDonationStatus(donationId, status).then(res => {
            toast.success("Status updated succesfully!")
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
                        <td>{row.Title}</td>
                        <td>{row.Quantity}</td>
                        <td>{row.Category}</td>
                        <td>{row.Status}</td>
                        <td>
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleInfo} onClick={() => handleDetails(row)} />
                            {row.Status !=="Deleted" &&
                            <>
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleCheck} onClick={() => updateDonationStatus(row.DonationId, 'approved')} />
                            <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={() => updateDonationStatus(row.DonationId, 'rejected')} />
                            </>}                       
                        </td>
                    </tr>
                )
            })}
            {infoModal && <tr style={{ border: 'none' }}><td style={{ border: 'none' }}><InfoModal infoModal={infoModal} data={infoModalData} closeModal={() => setInfoModal(false)} /></td></tr>}
        </>
    )

}


export default TableRow