import React, { Children } from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import 'babel-polyfill';
import store from '../../src/store';
import { StoreProvider } from 'easy-peasy';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';


import ProductDetailsPage from '../../src/pages/ProductDetailsPage'

//jest.mock('axios')


// Prepare before loading the tests
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
  });

// Pretend that the user is logged in and has access to the authenticated pages
beforeEach(() => {
    sessionStorage.setItem('user', 'user');
});

// Unmount components
afterEach(cleanup);

// Reset axios mock, and unauthenticate the user
afterEach(() => {
    sessionStorage.clear();
    mockAxios.reset();
});

//  Mock data
const data = {
  IsHolyOakes: true,
  averageCost: null,
  barcode: null,
  barcodeInner: null,
  brand: null,
  categoryList: null,
  depth: 0,
  description1: "The Holyoake CFP range of square and round face Radial Induction Swirl  The CFP is available in a variety of sizes in both square & circular face plates.",
  description2: "ABC Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP. Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) ",
  description3: null,
  description4: null,
  drop: null,
  height: 0,
  id: 3430,
  internalID: null,
  isKitted: null,
  isPriceTaxInclusive: null,
  keyProductID: "CFP-600-12-LPP-250",
  keySellUnitID: null,
  keyTaxcodeID: "34333235303332303734313231",
  kitProductsSetPrice: null,
  name: null,
  packQuantity: null,
  price: 99.98,
  priceList: null,
  productCode: "CFP-600-12-LPP-250",
  productCondition: null,
  productName: "CFP - 600/12 Swirl Diffusers with Low Profile Plenum 250 Spigot",
  productSearchCode: null,
  quantity: 1,
  sellUnits: null,
  sellUnitsIdList: null,
  stockLowQuantity: 0,
  stockQuantity: 77,
}
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

data.imageList = imagesOnly;

const noDesctionData = {
    IsHolyOakes: true,
    averageCost: null,
    barcode: null,
    barcodeInner: null,
    brand: null,
    categoryList: null,
    depth: 0,
    description1: null,
    description2: null,
    description3: null,
    description4: null,
    drop: null,
    height: 0,
    id: 3430,
    internalID: null,
    isKitted: null,
    isPriceTaxInclusive: null,
    keyProductID: "CFP-600-12-LPP-250",
    keySellUnitID: null,
    keyTaxcodeID: "34333235303332303734313231",
    kitProductsSetPrice: null,
    name: null,
    packQuantity: null,
    price: 99.98,
    priceList: null,
    productCode: "CFP-600-12-LPP-250",
    productCondition: null,
    productName: "CFP - 600/12 Swirl Diffusers with Low Profile Plenum 250 Spigot",
    productSearchCode: null,
    quantity: 1,
    sellUnits: null,
    sellUnitsIdList: null,
    stockLowQuantity: 0,
    stockQuantity: 77,
}


describe('ProductDetailsPage', () => {
    
    it("Runs without crashing with API call",()=>{
        const hist = [];
        const {getByText} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:'CFP-600-12-LPP-250'}}} props={{history: hist}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        )

    });
    
    test("Check if correct Product is Loaded",async ()=>{

        // Mock Data
        const _productCode = "CFP-600-12-LPP-250";
        const productName =  "CFP - 600/12 Swirl Diffusers with Low Profile Plenum 250 Spigot"
       
        // Setting user session
        sessionStorage.setItem('user','user')
        
        // Loading the Product Detail Page
        const {getByText, getByTestId} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:_productCode}, dummyData:{data}}} props={{history: []}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        );

        // Mocked correct data resopnse.
        let responseData = {
            "data": data,
            "message": "successfully retrieved product",
            "status": "success"
        }
        
        // Emulating the API call
        mockAxios.get.mockResolvedValue({ data: responseData });

        // Check if the loaded data is correct.
        await waitFor(() => {
            expect(getByTestId("title").textContent).toBe(productName);
        });


    });

    test("Description and Specification in the product detail tabs",async ()=>{

        // Mock Data
        const _productCode = "CFP-600-12-LPP-250";
        
        // Setting user session
        sessionStorage.setItem('user','user')
        
        // Loading the Product Detail Page
        const {getByText, getByTestId} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:_productCode}, dummyData:{data}}} props={{history: []}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        );

        // Mocked correct data resopnse.
        let responseData = {
            "data": data,
            "message": "successfully retrieved product",
            "status": "success"
        }
        
        // Emulating the API call
        mockAxios.get.mockResolvedValue({ data: responseData });

        // Check if the product description is loaded is correctly.
        await waitFor(() => {
            expect(getByTestId("descriptionTab").textContent).toBe(data.description1);
        });

        // Check if the product specification is loaded is correctly.
        userEvent.click(getByText('Specification'));
        expect(getByTestId("specificationTab").textContent).toBe(data.description2);
        
    });

    test("No Description and Specification in the product detail tabs",async ()=>{

        // Mock Data
        const _productCode = "CFP-600-12-LPP-250";
        data.description1=null;
        data.descripiton2=null;

        // Setting user session
        sessionStorage.setItem('user','user')
        
        // Loading the Product Detail Page
        const {getByText, getByTestId} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:_productCode}}} props={{history: []}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        );

        // Mocked correct data resopnse.
        let responseData = {
            "data": noDesctionData,
            "message": "successfully retrieved product",
            "status": "success"
        }
        
        // Emulating the API call
        mockAxios.get.mockResolvedValue({ data: responseData });

        // Check if the product description is loaded is correctly.
        await waitFor(() => {
            expect(getByTestId("descriptionTab").textContent).toBe("Coming Soon");
        });
    });

    test("Adding Product to cart",async ()=>{

        // Mock Data
        const _productCode = "CFP-600-12-LPP-250";
        
        // Setting user session
        sessionStorage.setItem('user','user')
        
        // Loading the Product Detail Page
        const {getByText, getByTestId} = render (
            <StoreProvider store={store}>
                <MemoryRouter>
                    <ProductDetailsPage match={{params:{productCode:_productCode}, dummyData:{data}}} props={{history: []}} history={null}/>
                </MemoryRouter>
            </StoreProvider>
        );

        // Mocked correct data resopnse.
        let responseData = {
            "data": data,
            "message": "successfully retrieved product",
            "status": "success"
        }
        
        // Emulating the API call
        mockAxios.get.mockResolvedValue({ data: responseData });

        userEvent.click(getByText('Add to cart'));
        await waitFor(() => {
            expect(getByText('Product was successfully added to the cart')).not.toBeNull();
          });
    });

});