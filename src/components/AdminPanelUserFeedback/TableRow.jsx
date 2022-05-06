import React from 'react'
import './AdminPanelUserFeedback.css'


const TableRow = (props) => {

    return (
        <>
            {props.rows.length > 0 && props.rows.map((row, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{row.FeedbackId}</td>
                        <td>{row.UserId}</td>
                        <td>{row.Feedback}</td>
                    </tr>
                )
            })}
        </>
    )

}


export default TableRow