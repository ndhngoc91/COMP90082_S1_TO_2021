import React from 'react'
import ReactDOM from 'react-dom'
import ThreeDModelPresenter from '../../src/components/3DModel/ThreeDModelPresenter'
//import DoesFileExist from './../../src/components/3DModel/ThreeDModelPresenter'
import LoadModel from '../../src/components/3DModel/ThreeDModelPresenter'
import {isTSAnyKeyword} from '@babel/types'
import '@testing-library/jest-dom/extend-expect'
import { getByTitle, render, screen, fireEvent, waitFor } from '@testing-library/react';

// Not finished

it("Renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ThreeDModelPresenter/>,div);
})

it("Load Model without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ThreeDModelPresenter modelUrl = {"https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/CFP-600-12-LPP.glb"}/>,div);
})

/*
it("Check If file exsit",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ThreeDModelPresenter modelUrl = {"https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/CFP-600-12-LPP.glb"}/>,div);
    expect(screen.debug()).toHaveAttribute(null);
})

it("Load Model",()=>{
    const component = render(<ThreeDModelPresenter modelUrl = {"https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/CFP-600-12-LPP.glb"}/>);
    expect(component.baseElement).toHaveAttribute(null);
    console.log(component);
})
*/
