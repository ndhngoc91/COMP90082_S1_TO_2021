import React from 'react'
import ReactDOM from 'react-dom'
//import ImageViewer from './../../src/components/ImageViewer'
import {isTSAnyKeyword} from '@babel/types'
import TestRenderer from 'react-test-renderer';
import ImageViewer from '../../src/components/ImageViewer';
import { Tabs, Image, Divider } from 'antd';
const fallbackSrc = "data:image/png;base64,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";  
import ThreeDModelPresenter from '../../src/components/3DModel/ThreeDModelPresenter'
import modelIcon from '../assets/3dmodel.png';


import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
 

//afterEach(cleanup);

const imageList = [
    {
        fileName: "",
        id: 3622,
        is3DModelType: "N",
        largeImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
        mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
        productId: 3430,
        smallImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
        threeDModelLocation: ""
    }
    ,
    {
        fileName: "",
        id: 3623,
        is3DModelType: "N",
        largeImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
        mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
        productId: 3430,
        smallImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
        threeDModelLocation: ""
    }
    ,
    {
        fileName: "",
        id: 3624,
        is3DModelType: "N",
        largeImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
        mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
        productId: 3430,
        smallImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
        threeDModelLocation: ""
    }
    ,
    {
        fileName: null,
        id: 3689,
        is3DModelType: "Y",
        largeImageLocation: null,
        mediumImageLocation: null,
        productId: 3430,
        smallImageLocation: null,
        threeDModelLocation: "https://s3-ap-southeast-2.amazonaws.com/squizz-3d-images/3dModels/CFP-600-12-LPP.glb",
    }
];


test("Create fall back image when no source is provided",()=>{
    const {getAllByRole} = render ( <ImageViewer height={100} imageList={null}/> ); 
    
    const listOfImages = getAllByRole('img');
    
    // Check if Only 1 image is created (1 for button image + 1 for source image)
    expect(listOfImages.length).toBe(2);
    
    // Check the correct image is loaded on the button
    expect(listOfImages[0].src).toBe(fallbackSrc);

    // Check the correct image is loaded on the main panel
    expect(listOfImages[1].src).toBe(fallbackSrc);
})

// when 404
// when []

test("Load 2D Images on the Image Viewer",()=>{

    const imagesOnly = [
        {
            fileName: "",
            id: 3622,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2099.png?r=1333347722",
            threeDModelLocation: ""
        }
        ,
        {
            fileName: "",
            id: 3623,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2115.jpg?r=1334023288",
            threeDModelLocation: ""
        }
        ,
        {
            fileName: "",
            id: 3624,
            is3DModelType: "N",
            largeImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            mediumImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            productId: 3430,
            smallImageLocation: "https://attachments.holyoake.com/products/images_large/2116.jpg?r=1334023306",
            threeDModelLocation: ""
        }
    ];
    
    const {getAllByRole} = render ( <ImageViewer height={100} imageList={imagesOnly}/> ); 
    
    const listOfImages = getAllByRole('img');
    
    // Check if number of images are loaded correctly
    expect(listOfImages.length).toBe(4);
    
    // Check the correct small size image is loaded on the button
    expect(listOfImages[0].src).toBe(imagesOnly[0].smallImageLocation);

    // Check the correct large size image is loaded on the main panel
    expect(listOfImages[1].src).toBe(imagesOnly[1].largeImageLocation);
})


test("Load 3D Models on the Image Viewer",()=>{

    const modelsOnly = [
        {
            fileName: null,
            id: 3689,
            is3DModelType: "Y",
            largeImageLocation: null,
            mediumImageLocation: null,
            productId: 3430,
            smallImageLocation: null,
            threeDModelLocation: "https://s3-ap-southeast-2.amazonaws.com/squizz-3d-images/3dModels/CFP-600-12-LPP.glb",
        }
    ];
    
    
    const {getAllByRole} = render ( <ImageViewer height={100} imageList={modelsOnly}/> ); 
    const listOfImages = getAllByRole('img');
    
    // Check if the button image is loaded 
    // And no image is loaded (not even fallback image)
    expect(listOfImages.length).toBe(4);
    
    // Check if model icon on the button  is loaded correctly
    expect(listOfImages[0].src).toBe("http://localhost/"+modelIcon);

    // 3d model presenter is loaded
    expect(screen.getByText('Instructions')).not.toBeNull();

})