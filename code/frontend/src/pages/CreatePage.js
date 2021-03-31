import React from "react";
import CreateForm from '../components/CreateForm'
import styled from 'styled-components';

const CreatePage = () => {
    return (
        <Page>
            <div style={{width: '90%'}}>
                <CreateForm/>
            </div>
        </Page>
    );
}

export default CreatePage;

const Page = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    -webkit-justify-content: center;
    background: #f1f1f3; // this is the color of the background of the login page
    height: 160%
`
