import React from 'react'
import HringForm from '../components/HiringForm';
import styled from 'styled-components';

const HiringFormPage = () => {
    return (
        <Page>
            <div style={{width: '90%'}}>
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
    min-height: 90vh;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
    height: 160%
`