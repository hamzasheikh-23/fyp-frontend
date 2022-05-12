import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCircleCheck,
  faCircleXmark,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { baseURL } from "../../baseURL";
import { toast } from "react-toastify";
import PutUpdateDonationStatus from "./APIs/PutUpdateDonationStatus";
import "./AdminPanelManageOrders.css";
import moment from "moment";
import axios from "axios";

const TableRow = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState({});

  const handleDetails = (row) => {
    // for(let i = 1; i < 3; i++) {
    //     console.log("Hi")
    // }

    setInfoModalData(row);
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
    setInfoModal(true);
  };

  const updateDonationStatus = async (OrderId, status) => {
    PutUpdateDonationStatus(OrderId, status)
      .then((res) => {
        toast.success("Updated status succesfully!");
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
              <td>{row.OrderId}</td>
              <td>{row.CaseId}</td>
              <td>{row.NGOId}</td>
              <td>{row.NGOName}</td>
              <td>{row.PickupAddress}</td>
              <td>{row.DeliveryAddress}</td>
              <td>{row.Status}</td>
              <td>{moment(row.OrderDateTime).format("DD-MM-YYYY")}</td>
              <td>
                {row.Status === "Approved" && (
                  <FontAwesomeIcon
                    className="action-icons-donation-requests"
                    icon={faFileInvoiceDollar}
                    onClick={() => {
                      axios
                        .post(
                          `${baseURL}/invoice/post`,
                          { OrderId: row.OrderId }
                        )
                        .then((res) => {
                          updateDonationStatus(row.OrderId, "Delivered");
                        })
                        .catch(console.log);
                    }}
                  />
                )}
                {row.Status !== "Delivered" && row.Status !== "Approved" && (
                  <>
                    <FontAwesomeIcon
                      className="action-icons-donation-requests"
                      icon={faCircleCheck}
                      onClick={() =>
                        updateDonationStatus(row.OrderId, "Approved")
                      }
                    />
                    <FontAwesomeIcon
                      className="action-icons-donation-requests"
                      icon={faCircleXmark}
                      onClick={() =>
                        updateDonationStatus(row.OrderId, "Rejected")
                      }
                    />
                  </>
                )}
              </td>
            </tr>
          );
        })}
      {/* {infoModal && <tr style={{ border: 'none' }}><td style={{ border: 'none' }}><CaseDetailModal infoModal={infoModal} data={infoModalData} closeModal={() => setInfoModal(false)} /></td></tr>} */}
    </>
  );
};

export default TableRow;
