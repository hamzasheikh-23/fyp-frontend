import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import './AdminPanelManageRequestsFromNGO.css'

const CaseDetailModal = (props) => {

    const node = useRef()

    useEffect(() => {
        const handleClickOutside = event => {
            if (node.current && !node.current.contains(event.target)) {
                props.closeModal()
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [node, props])

    return (
        <>
            <div ref={node} className='modalContainer-donation-requests-modal'>
                <div className='campaignInfoPopup-donation-requests-modal'>
                    <div className='header-donation-requests-modal'>
                        <div className='headerTextLeft-donation-requests-modal'>
                            <label className='infoLabels-donation-requests-modal'>Case Title:</label>
                            <p className='infoData-donation-requests-modal'>{props.data.Title}</p>
                        </div>
                        <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={props.closeModal} />
                    </div>
                    <div className='content-donation-requests-modal'>
                        <div className='divideContent-donation-requests-modal'>
                            <div className='budgetPostDetails-donation-requests-modal'>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Date and Time: </label>
                                    <p className='infoData-donation-requests-modal'>{moment(props.data.PostedDate).format("DD-MM-YYYY HH:MM A")}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>NGO Name: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Condition}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Description: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Description}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Category: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Category}</p>
                                </div>
                            </div>
                        </div>
                        <div className='divideContent-donation-requests-modal'>
                            <div className='budgetPostDetails-donation-requests-modal'>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Quantity:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Quantity}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Unit:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.QuantityPerUnit}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Status: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Status}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Active:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.isActive}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='imagesContainer-donation-requests-modal'>
                        <img className='images-donation-requests-modal' src={props.data.image} alt='ngo'/>
                    </div>
                </div> 
            </div>
        </>
    )

}


export default CaseDetailModal