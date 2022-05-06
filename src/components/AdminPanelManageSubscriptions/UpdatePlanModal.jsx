import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import './AdminPanelManageSubscriptions.css'

const UpdatePlanModal = (props) => {

    const [planName, setPlanName] = useState(props.data.PlanName)
    const [amount, setAmount] = useState(props.data.Amount)
    const [description, setDescription] = useState(props.data.Description)

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
                            <label className='infoLabels-donation-requests-modal' style={{ width: 'auto' }}>Plan ID: {props.data.PlanId}</label>
                        </div>
                        <FontAwesomeIcon className='action-icons-donation-requests' icon={faCircleXmark} onClick={props.closeModal} />
                    </div>
                    <div className='content-donation-requests-modal'>
                        <div className='divideContent-donation-requests-modal'>
                            <div className='budgetPostDetails-donation-requests-modal'>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Plan Name: </label>
                                    <input className='infoData-donation-requests-modal' type='text' value={planName} onChange={e => setPlanName(e.target.value)} />
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Amount: </label>
                                    <input className='infoData-donation-requests-modal' type='number' value={amount} onChange={e => setAmount(e.target.value)} />
                                </div>
                                <div className='contentTile-donation-requests-modal'>
                                    <label className='infoLabels-donation-requests-modal'>Description: </label>
                                    <textarea className='infoData-donation-requests-modal' style={{ height: 150 }} type='text' value={description} onChange={e => setDescription(e.target.value)} />
                                </div>
                                <div className='contentTile-donation-requests-modal' style={{ justifyContent: 'flex-end' }}>
                                    <button className='btn-manage-subscriptions-modal'>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )

}


export default UpdatePlanModal