import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DonorRecords from './DonorRecords';
import NGORecords from './NGORecords';
import TotalUsers from './TotalUsers';
import TotalDonations from './TotalDonations';

class AdminPanelStatistics extends React.Component{
    render(){
        return (
        <div >
            <h1 style={{marginTop:'20px', marginBottom:"40px"}} className="blue-heading donation-heading">Application Statistics</h1>
            <Container>
            <Row>
                <Col lg={6} md={12}><TotalDonations/></Col><br/>
                <Col lg={6} md={12}><TotalUsers/></Col><br/>
            </Row>
            <br/>
            <br/>
            <Row>
                <Col lg={12} md={12}><NGORecords/></Col><br/><br/>
                <Col lg={12} md={12}><DonorRecords/></Col><br/>
            </Row>
            <br/>
            <br/>
            <br/>
            </Container>
        </div>
        );
    }
}

export default AdminPanelStatistics;