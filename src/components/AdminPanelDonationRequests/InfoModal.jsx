import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import './AdminPanelDonationRequests.css'

const InfoModal = (props) => {

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
                            <label className='infoLabels-donation-requests-modal'>Title:</label>
                            <p className='infoData-donation-requests-modal'>{props.data.Title}</p>
                        </div>
                        <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={props.closeModal} />
                    </div>
                    <div className='content-donation-requests-modal'>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Date:</td>
                                <td>{moment(props.data.PostedDate).format("DD-MM-YYYY")}</td>
                            </tr>
                            <tr>
                                <td>Time: </td>
                                <td>{moment(props.data.PostedDate).format("HH:MM A")}</td>
                            </tr>
                            <tr>
                                <td>Condition: </td>
                                <td>{props.data.Condition}</td>
                            </tr>
                            <tr>
                                <td>Category: </td>
                                <td>{props.data.Category}</td>
                            </tr>
                            <tr>
                                <td>Quantity:</td>
                                <td>{props.data.Quantity}</td>
                            </tr>
                            <tr>
                                <td>Quantity Per Unit:</td>
                                <td>{props.data.QuantityPerUnit}</td>
                            </tr>
                            <tr>
                                <td>Weight: </td>
                                <td>{props.data.Weight}</td>
                            </tr>
                            <tr>
                                <td>Description: </td>
                                <td>{props.data.Description}</td>
                            </tr>
                            <tr>
                                <td>Rating: </td>
                                <td>{props.data.Rating}</td>
                            </tr>
                            <tr>
                                <td>Status: </td>
                                <td>{props.data.Status}</td>
                            </tr>
                            <tr>
                                <td>Expiry Date:</td>
                                <td>{moment(props.data.ExpiryDate).format("DD-MM-YYYY")}</td>
                            </tr>
                            <tr>
                                <td>Pickup Address:</td>
                                <td>{props.data.Address}</td>
                            </tr>
                           
                        </tbody>
                    </table>
                        {/* <div className='divideContent-donation-requests-modal'>
                            <div className='budgetPostDetails-donation-requests-modal'>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Date: </label>
                                    <p className='infoData-donation-requests-modal'>{moment(props.data.PostedDate).format("DD-MM-YYYY")}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Time: </label>
                                    <p className='infoData-donation-requests-modal'>{moment(props.data.PostedDate).format("HH:MM A")}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Condition: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Condition}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Category: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Category}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Quantity:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Quantity}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Quantity Per Unit:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.QuantityPerUnit}</p>
                                </div>
                            </div>
                        </div>
                        <div className='divideContent-donation-requests-modal'>
                            <div className='budgetPostDetails-donation-requests-modal'>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Weight: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Weight}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Description: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Description}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Rating: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Rating}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Status: </label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Status}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Expiry Date:</label>
                                    <p className='infoData-donation-requests-modal'>{moment(props.data.ExpiryDate).format("DD-MM-YYYY")}</p>
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Pickup Address:</label>
                                    <p className='infoData-donation-requests-modal'>{props.data.Address}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className='imagesContainer-donation-requests-modal'>
                        {props.data.images.map((image, index) => {
                            return <img className='images-donation-requests-modal' key={index} src={image.src} alt={`sample-${index}`}/>
                        })}
                    </div> */}
                </div> 
            </div>
        </>
    )

}


export default InfoModal