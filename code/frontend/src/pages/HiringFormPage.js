import React from 'react'
import HiringForm from '../components/HiringForm';
import styled from 'styled-components';

const HiringFormPage = () => {
    return (
        <Page>
            <div style={{height: "100%", width: "100%"}}>
                <PageHeader>
                    Customer Hiring Basket
                </PageHeader>
                <HiringForm/>
            </div>
        </Page>
    );
}

export default HiringFormPage;

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
`
const PageHeader = styled.div`
    margin: 30px;
    text-align: center;
    font-size: 30px;
`