import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import TableRow from "./TableRow";
import GetDonations from "./APIs/GetDonations";
import "./AdminPanelDonationRequests.css";
import Pagination from "../Pagination";
// import Pagination from '@material-ui/lab/Pagination';
import TablePagination from "../TablePagination/TablePagination";

const AdminPanelDonationRequests = (props) => {
  const [sideOpen, setSideOpen] = useState(false);
  const [donationRequests, setDonationRequests] = useState([]);
  const [donationRequestsDisplay, setDonationRequestsDisplay] = useState([]);

  // const [statusFilter, setStatusFilter] = useState('pending');

  const fetchData = async () => {
    await GetDonations("pending")
      .then((res) => {
        // console.log('res',res)
        setDonationRequests(res);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('outer', donationRequests)

  return (
    <>
      <Toolbar drawerClickHandler={() => setSideOpen(!sideOpen)} about={true} />
      <SideDrawer about={true} show={sideOpen} />
      <h7
        onClick={() => props.history.goBack()}
        style={{ padding: "16px", display: "inline-block", cursor: "pointer" }}
      >
        GO BACK
      </h7>
      <h1 className="page-heading-donation-requests">Donation Requests</h1>

        <div className="table-donation-requests outer manage-donation-request-donor">
      <TablePagination list={donationRequests} getData={data=>setDonationRequestsDisplay(data)}
      searchParam='Title' filterParam='Status' filterList={['','Deleted','Approved','Rejected']}>
          <Table responsive="md" bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Donor ID</th>
                <th>Donation Title</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>
                  <div className="dropdown">
                    <span type="button" data-toggle="dropdown">
                      Status
                      <span className="caret"></span>
                    </span>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="#">Pending</a>
                      </li>
                      <li>
                        <a href="#">Rejected</a>
                      </li>
                      <li>
                        <a href="#">Approved</a>
                      </li>
                    </ul>
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <TableRow update={fetchData} rows={donationRequestsDisplay} />
            </tbody>
          </Table>
          {/* <Pagination /> */}
      </TablePagination>
        </div>
    </>
  );
};

export default AdminPanelDonationRequests;
