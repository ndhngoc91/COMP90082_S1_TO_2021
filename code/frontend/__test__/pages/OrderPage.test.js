import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { StoreProvider } from 'easy-peasy';
import 'babel-polyfill';


// Components to test
import OrderPage from '../../src/pages/OrderPage';
import store from '../../src/store';

// A mock product (defined here to avoid duplication in tests)
const mockProduct = {
  "averageCost": null,
  "barcode": "933044000895",
  "barcodeInner": null,
  "brand": null,
  "categoryList": null,
  "depth": 0,
  "description1": "200ml Banana Boat Boat Baby Sunscreen SPF 30+",
  "description2": null,
  "description3": null,
  "description4": null,
  "drop": null,
  "height": 0,
  "id": 1,
  "imageList": [],
  "internalID": null,
  "isKitted": null,
  "isPriceTaxInclusive": null,
  "keyProductID": "21479231976900",
  "keySellUnitID": null,
  "keyTaxcodeID": "34333235303332303734313231",
  "kitProductsSetPrice": null,
  "name": null,
  "packQuantity": null,
  "price": 2.25,
  "priceList": null,
  "productCode": "00089",
  "productCondition": null,
  "productName": "200ml Banana Boat Boat Baby Sunscreen SPF 30+",
  "productSearchCode": null,
  "sellUnits": null,
  "sellUnitsIdList": null,
  "stockLowQuantity": 0,
  "stockQuantity": 0,
  "supplierOrganizationId": null,
  "volume": 0,
  "weight": 0,
  "width": 0
};


beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
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
    })),
  });
});

// Pretend that the user is logged in and has access to the authenticated pages
beforeEach(() => {
  sessionStorage.setItem('user', 'user');
});

// Unmount components
afterEach(cleanup);

// Empty the cart and reset axios mock, unauthenticate user
afterEach(() => {
  store.getActions().cart.emptyCart();
  sessionStorage.clear();
  mockAxios.reset();
});



describe('Testing <OrderPage />', () => {

  test('Submitting an order while cart is empty', async () => {
    const { getByText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </StoreProvider>
    );
  
    userEvent.click(getByText('Checkout'));
  
    await waitFor(() => {
      expect(getByText('Please add a product to your cart before submitting an order')).not.toBeNull();
    });
  });
  
  
  test('Product live search and autocomplete functionality', async () => {
    const { getByText, getByPlaceholderText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </StoreProvider>
    );
  
    getByPlaceholderText('Enter barcode');
    expect(getByPlaceholderText('Enter barcode').value).toBe('');
    userEvent.type(getByPlaceholderText('Enter barcode'), 'CFP-');
    expect(getByText('Product Code')).toBeInTheDocument();
    userEvent.click(getByText('Product Code'));
  
    // Emulate retrieving order history from backend with zero orders
    let responseData = {
      "identifiers": [
          { "productCode": "CFP-600-12-LPP-150" },
          { "productCode": "CFP-600-12-LPP-200" },
          { "productCode": "CFP-600-12-LPP-250" }
      ],
      "message": "Successfully retrieved similar barcodes or product codes",
      "status": "success"
    }
  
    mockAxios.get.mockResolvedValue({ data: responseData });

    await waitFor(() => {
      // Expect axios to have been called five times; 4 for 'CFP-', once
      // for switching from input type 'barcode' to 'product code'
      expect(mockAxios).toHaveBeenCalledTimes(5);
    });
  });


  test('Searching for a product with an invalid barcode', async () => {
    const { getByText, getByPlaceholderText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </StoreProvider>
    );
    
    // Emulate retrieving an invalid product, via barcode, from the backend
    let responseData = { data: null, status: "error", message: "No data found" };
    mockAxios.get.mockResolvedValue({ data: responseData });
      
    // Simulate searching for an invalid barcode
    getByPlaceholderText('Enter barcode');
    expect(getByPlaceholderText('Enter barcode').value).toBe('');
    userEvent.type(getByPlaceholderText('Enter barcode'), '12345');
    userEvent.type(getByPlaceholderText('Enter barcode'), '{enter}');

    // Test for presence of error message
    await waitFor(() => {
      expect(getByText('The barcode you have entered is invalid')).not.toBeNull();
    });
  });


  test('Searching for a product with a valid product code', async () => {
    const { getByText, getByPlaceholderText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </StoreProvider>
    );
    
    // Emulate retrieving an invalid product, via barcode, from the backend
    let responseData = {
      "data": mockProduct,
      "message": "successfully retrieved product",
      "status": "success"
    }
    mockAxios.get.mockResolvedValue({ data: responseData });
      
    // Simulate searching for a valid product code
    userEvent.click(getByText('Product Code'));
    expect(getByPlaceholderText('Enter product code')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter product code').value).toBe('');
    userEvent.type(getByPlaceholderText('Enter product code'), '00089');
    userEvent.type(getByPlaceholderText('Enter product code'), '{enter}');

    // Test for presence of success message
    await waitFor(() => {
      expect(getByText('Your product has been added')).not.toBeNull();
    });
  });


  test('Adding a duplicate product to the cart', async () => {
    const { getByText, getByPlaceholderText } = render(
      <StoreProvider store={store}>
        <MemoryRouter>
          <OrderPage />
        </MemoryRouter>
      </StoreProvider>
    );

    // Add mock product to the cart
    store.getActions().cart.addProduct(mockProduct);
    
    // Emulate retrieving a valid product from the backend
    let responseData = {
      "data": mockProduct,
      "message": "successfully retrieved product",
      "status": "success"
    }
    mockAxios.get.mockResolvedValue({ data: responseData });
      
    // Simulate searching for a valid product code
    userEvent.click(getByText('Product Code'));
    expect(getByPlaceholderText('Enter product code')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter product code').value).toBe('');
    userEvent.type(getByPlaceholderText('Enter product code'), '00089');
    userEvent.type(getByPlaceholderText('Enter product code'), '{enter}');

    // Test for presence of warning message
    await waitFor(() => {
      expect(getByText('You have already added this product')).not.toBeNull();
    });
  });
});
