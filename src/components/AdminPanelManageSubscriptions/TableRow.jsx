import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import UpdatePlanModal from "./UpdatePlanModal";
import PutUpdateDonationStatus from "./APIs/PutUpdateDonationStatus";
import "./AdminPanelManageSubscriptions.css";

const TableRow = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState({});

  const handleDetails = (row) => {
    setInfoModalData(row);
    setInfoModal(true);
  };

  const updateDonationStatus = async (donationId, status) => {
    PutUpdateDonationStatus(donationId, status)
      .then((res) => {
        toast.success("Updated status succesfully!",{position:"top-center"});
        props.update();
      })
      .catch((err) =>
        console.log("Something went wrong, please try again later.")
      );
  };

  return (
    <>
      {props.rows.length > 0 &&
        props.rows.map((row, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.PlanId}</td>
              <td>{row.PlanName}</td>
              <td>{"Rs " + row.Amount}</td>
              <td>{row.Description}</td>
              <td>{row.IsActive && JSON.parse(row.IsActive) ? "Yes" : "No"}</td>
              <td>
                <FontAwesomeIcon
                  className="action-icons-donation-requests"
                  icon={faPencil}
                  onClick={() => handleDetails(row)}
                />
                <FontAwesomeIcon
                  className="action-icons-donation-requests"
                  icon={faCircleCheck}
                  onClick={() => updateDonationStatus(row.PlanId, "true")}
                />
                <FontAwesomeIcon
                  className="action-icons-donation-requests"
                  icon={faCircleXmark}
                  onClick={() => updateDonationStatus(row.PlanId, "false")}
                />
              </td>
            </tr>
          );
        })}
      {infoModal && (
        <tr style={{ border: "none" }}>
          <td style={{ border: "none" }}>
            <UpdatePlanModal
                update={props.update}
              show={infoModal}
              onHide={() => setInfoModal(false)}
              data={infoModalData}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
