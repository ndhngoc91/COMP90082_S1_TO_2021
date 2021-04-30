# API Document

## 0. Pagination

The APIs having 'page' parameter support paging

-  **200 Response**

  ```json
  {
      "total_pages": 11,
      "total_items": 210,
      "page_num": 10,
      "page_items": 20,
      "items": [
          "item goes here"
      ]
  }
  ```

  > ***page_num*** *stands for the current page, **page_items** stands for the number of items in current page.*

- **404 Response**

  ```json
  {
      "message": "Page number out of bounds for listing XXXX",
      "total_pages": 11
  }
  ```

  > ***XXXX*** *is model name*

## 1. Customer API

### 1.0 List Customer Codes

- **Request**

  Send **GET** to `/api/customer_codes`

  | Params | Description                                 | Example | Optional |
  | ------ | ------------------------------------------- | ------- | -------- |
  | used   | To get used (1) or unused (0) customer code | used=1  | T        |
  |        |                                             |         |          |

  > *Return all codes if 'used' is not set.*

- **Response**

  ```json
  ["TESTDEBTOR", "ALLUNEED", ...]
  ```

- **Status Code**

  - **200: OK**

### 1.1 List Customers

- **Request** 

  Send **GET** to `/api/customers`

- **Response**

  ```JSON
  [
      {
          "id": 1,
          "customer_code": "TESTDEBTOR",
          "title": "Miss",
          "first_name": "Junlu",
          "last_name": "zzzzzzzz",
          "phone": "0987654321",
          "email": "aaa@bbb.xyz",
          "nationality_code": "CN",
          "organization_desc": "HolySAS"
      }, {
          ...
      }
  ]
  ```

- **Status Code**

  - **200: OK**

### 1.2 Create Customer

- **Request** 

  - Send **POST** to `/api/customers`

  ```json
  // address is optional
  {
      "customer": {
          "customer_code": "TESTDEBTOR",
          "title": "Mr",
          "first_name": "Eric",
          "last_name": "Z",
          "phone": "0123456789",
          "email": "xxzz@xxx.xyz",
          "nationality_code": "CN",
          "organization_desc": "HolySAS",
      },
      "address": {
          "contact": "9876543210",
          "address_line1": "xxxx",
          "address_line2": "yyyy",
          "postcode": "VIC3000",
          "region": "",
          "country": ""
      }
  }
  ```

- **Response**

  ```json
  {
      "customer": {
          "customer_obj"
      },
      "address": {
          "address_obj"
      }
  }
  ```

- **Status code**

  - **201: Create successfully**
  - **404: Customer code not found**
  - **409: Customer code already used**
  - **400: Bad request eg. Lack of necessary data**

### 1.3 Get Customer

- **Request**

  Send **GET** to `/api/customer/<customer_id>`

- **Response**

  ```json
  {
  	"customer_code": "TESTDEBTOR",
  	"title": "Mr",
  	"first_name": "Eric",
  	"last_name": "Z",
  	"phone": "0123456789",
  	"email": "xxzz@xxx.xyz",
  	"nationality_code": "CN",
  	"organization_desc": "HolySAS",
  }
  ```

- **Status Code**

  - **200: OK**
  - **404: Customer Not Found**

### 1.4 Update Customer

- **Request**

  Send **PUT** to `/api/customer/<customer_id>`

  ```json
  // Example PUT /api/customer/11
  {
      "first_name": "Petra",
      "title": "Mrs"
  }
  ```

- **Response**

  ```json
  {
      "id": 11,
      "customer_code": "ALLUNEED",
      "title": "Mrs",
      "first_name": "Petra",
      "last_name": "S",
      "phone": "0123456789",
      "email": "233456@123.com",
      "nationality_code": "AUS",
      "organization_desc": "holySAS"
  }
  ```

  

### 1.5 Delete Customer

- **Request**

  Send **DELETE** to `/api/customer/<customer_id>`

- **Response**

  ```json
  {
  	"message": "Customer XX deleted."
  }
  ```

- **Status Code**

  - **200: OK**
  - **404: Customer Not Found**

### 1.6 Switch Customer

- POST current customer **(Slow API approx 10 seconds)**

  - **POST** /api/switch_customer

  - **Request**

    ```json
    { "customer_id": 11 }
    ```

  - **Response**

    ```json
    {"message": "Switch to XXXXX successful"}
    ```

  - **Status Code**

    - **200: OK**
    - **404: Customer Code does not exist or match any customers**
    - **400: Bad request lack of customer_code**

### 1.7 List Addresses

- **Request**

  Send **GET** to `/api/customer/<customer_id>/addresses`

- **Response**

  ```json
  [
      {
          "id": 1,
          "customer_id": 1,
          "contact": "9876543210",
          "address_line1": "xxxx",
          "address_line2": "yyyy",
          "address_line3": "",
          "postcode": "VIC3000",
          "fax": "",
          "email": "",
          "region": "",
          "country": ""
      }, {
          ...
      }
  ]
  ```

- **Status Code**

  - **200: OK**
  - **404: Customer Not Found**

### 1.8 Create Address

- **Request**

  Send **POST** t0 `/api/customer/<customer_id>/addresses`

  ```json
  {
  	"contact": "9876543210",
  	"address_line1": "xxxx",
  	"address_line2": "yyyy",
  	"postcode": "VIC3000",
  	"region": "Victoria",
  	"country": "AUS"
  }
  ```

- **Response**

  ```json
  {
      "id": 19,
      "customer_id": 19,
      "contact": "9876543210",
      "address_line1": "xxxx",
      "address_line2": "yyyy",
      "address_line4": "",
      "postcode": "VIC3000",
      "region": "Victoria",
      "country": "AUS",
      "email": "",
      "fax": ""
  }
  ```

- **Status Code**

  - **201: Create Address for customer successful**
  - **404: Customer Not Found**

### 1.9 Update Address

- **Request**

  Send **PUT** to `/api/customer/<customer_id>/address/<address_id>`

  ```json
  // Example PUT /api/customer/11/address/22
  {
      "postcode": "QLD1111",
      "email": "petra2333@gmail.com"
  }
  ```

- **Response**

  ```json
  {
      "id": 22,
      "customer_id": 11,
      "contact": "9876541230",
      "organization": null,
      "email": "petra2333@gmail.com",
      "fax": null,
      "address_line1": "No.12",
      "address_line2": "Murry St, Xet, QLD",
      "address_line3": null,
      "postcode": "QLD1111",
      "region": "QLD",
      "country": "Australia"
  }
  ```

### 1.10 Delete Address

- **Request**

  Send **DELETE** to `/api/customer/<customer_id>/address/<address_id>`

  Example `/api/customer/14/address/39`

- **Response**

  ```json
  {
      "message": "Address 39 deleted"
  }
  ```

- **Status Code**

  - **200: OK**
  - **404: Customer or Address Not Found**

## 2. Category API

### 2.1 List Categories

- **Request**

  Send **GET** to `/api/categories`

- **Response**

  ```json
  [
      {
          "categoryCode": "Baby",
          "description1": null,
          "description2": null,
          "description3": null,
          "description4": null,
          "id": 2036,
          "internalID": "11EAF256D8E35DB2A1626AF3476460FC",
          "keyCategoryID": "Baby",
          "keyCategoryParentID": null,
          "keyProductIDs": null,
          "metaDescription": null,
          "metaKeywords": null,
          "name": "Baby",
          "ordering": 2,
          "Children": [
              {
                  "categoryCode": "Accessories-Baby",
                  "description1": null,
                  "description2": null,
                  "description3": null,
                  "description4": null,
                  "id": 2028,
                  "internalID": "11EAF256D8E384D4A1626AF3476460FC",
                  "keyCategoryID": "Accessories-Baby",
                  "keyCategoryParentID": "Baby",
                  "keyProductIDs": null,
                  "metaDescription": null,
                  "metaKeywords": null,
                  "name": "Accessories",
                  "ordering": 6
              }
          ]
      }
  ]
  ```

- **Status Code**

  - **200: OK**

## 3. Product API

### 3.0 Sync Data from Squizz

These are the APIs to sync data from squizz platform

#### 3.0.1 Sync Categories

- **Request**

  Send **GET** to `/updateCategories`

- **Response**

  ```json
  {
      "message": "Category data Updated",
      "status": "Success"
  }
  ```


#### 3.0.2 Sync Products

- **Request** 

  - Before retrieve data from squizz api, you should log in first 
  - Send **GET** to `/updateProducts`

- **Response**  

  ```JSON
   {
    "data": {
        "failed": []
    },
    "message": "successfully updated products",
    "status": "success"
  }
  ```

#### 3.0.3 Sync Product Price

- **Request** 
  Before retrieve data from squizz api, you should log in first 
  Send **GET** to `/updateProducts`

- **Response**  

  ```JSON
  {
    "data": {
        "failed": []
    },
    "message": "successfully stored product prices",
    "status": "success"
  }
  ```

### 3.1 List Products

- **Request**

  Send **GET** to `/api/products`

  | Params | Description                           | Example   | Optional |
  | ------ | ------------------------------------- | --------- | -------- |
  | page   | Pagination, page size = 20            | page=1    | F        |
  | cate   | Retrieve product in specific category | cate=2079 | T        |
  |        |                                       |           |          |

- **Response**

  ```json
  {
      "items": [
          {
              "barcode": "9326243152575",
              "id": 372,
              "image": "https://attachments....",
              "name": "Book Sudoku 96pg A4",
              "price": 0.86,
              "productCode": "152575"
          },
          {
              "barcode": "9326243170319",
              "id": 566,
              "image": null,
              "name": "Book Sudoku 496pg A5",
              "price": 3.08,
              "productCode": "170319"
          },{
              ...
          }
      ],
      "page_items": 14,
      "page_num": 1,
      "total_items": 14,
      "total_pages": 1
  }
  ```


### 3.2 Get product by product barcode

- **Request** 
    - Send **GET** to `/api/barcode`
    - Take **barcode** as parameter e.g. `/api/barcode?barcode=933044000895`

- **Response**

  ```JSON
  {
    "data": {
        "averageCost": null,
        "barcode": "933044000895",
        "barcodeInner": null,
        "brand": null,
        "categoryList": null,
        "depth": 0,
        "description1": null,
        "description2": null,
        "description3": null,
        "description4": null,
        "drop": null,
        "height": 0,
        "id": 1,
        "imageList": null,
        "internalID": null,
        "isKitted": null,
        "isPriceTaxInclusive": null,
        "keyProductID": "21479231976900",
        "keySellUnitID": null,
        "keyTaxcodeID": null,
        "kitProductsSetPrice": null,
        "name": null,
        "packQuantity": null,
        "priceList": null,
        "productCode": "00089",
        "productCondition": null,
        "productSearchCode": null,
        "sellUnits": null,
        "sellUnitsIdList": null,
        "stockLowQuantity": 0,
        "stockQuantity": 0,
        "supplierOrganizationId": null,
        "volume": 0,
        "weight": 0,
        "width": 0
    },
    "Message": "successfully retrieved product",
    "status": "success"
  }
  ```

### 3.3 Get product by product code

- **Request** 

   - Send **GET** to `/api/product`
   - Take **productCode** as parameter e.g. `/api/product?productCode=CFP-600-20`

- **Response**
  
  ```JSON
  {
    "data": {
        "averageCost": null,
        "barcode": "933044000895",
        "barcodeInner": null,
        "brand": null,
        "categoryList": null,
        "depth": 0,
        "description1": null,
        "description2": null,
        "description3": null,
        "description4": null,
        "drop": null,
        "height": 0,
        "id": 1,
        "imageList": null,
        "internalID": null,
        "isKitted": null,
        "isPriceTaxInclusive": null,
        "keyProductID": "21479231976900",
        "keySellUnitID": null,
        "keyTaxcodeID": null,
        "kitProductsSetPrice": null,
        "name": null,
        "packQuantity": null,
        "priceList": null,
        "productCode": "00089",
        "productCondition": null,
        "productSearchCode": null,
        "sellUnits": null,
        "sellUnitsIdList": null,
        "stockLowQuantity": 0,
        "stockQuantity": 0,
        "supplierOrganizationId": null,
        "volume": 0,
        "weight": 0,
        "width": 0
    },
    "Message": "successfully retrieved product",
    "status": "success"
  }
  ```
```
  
### 3.3 Retrieve product metadata by product code
    
- **Request** 

    - Send **GET** to `/api/metadata/get`
    - Take **productCode** as parameter e.g. `/api/metadata/get?productCode=CFP-600-12`

- **Response**
    ```JSON
    {
    "found": true,
    "json_data": {
        "Diffuser Width (Length Millimeters)": "595.000000000000",
        "Flow Nom (Hvac Air Flow Liters Per Second)": "112.500000000000",
        "Holyoake Product Range": "Holyoake Swirl Diffusers.",
        "Inlet Spigot Diameter (Length Millimeters)": "250.000000000000",
        "Manufacturer": "Holyoake",
       ...
    }
}
```

### 3.4 Search for product codes or barcodes similar to a given identifier
This endpoint is used for live product search in the frontend `OrderPage` component
- **Request** 
    - Send **GET** to `/api/products/search`
    - Take **identifier** and **identifierType** as parameters, where `identifierType` is either `barcode` or `productCode`
    
      e.g. `/api/products/search?identifier=CFP-600-12&identifierType=productCode`

- **Response**
  ```JSON
  {
    "identifiers": [
        {
            "productCode": "CFP-600-12-LPP-150"
        },
        {
            "productCode": "CFP-600-12-LPP-200"
        },
        ...
        {
            "productCode": "CFP-600-12-LPP-250"
        }
    ],
    "message": "Successfully retrieved similar barcodes or product codes",
    "status": "success"
  }
  ```

### 3.5 Retrieve product from squizz api
  **This is not a api that front end can assess.  These are supposed to be called by the Postman or another similar tool thatallow you to make calls to the REST API.**
   **This method is repsonbile for getting the latest products from SQUIZZ platform and updating the table in the local database**

- **Request** 
    - Before retrieve data from squizz api, you should log in first 
    - Send **GET** to `/retrieveProduct`
  
- **Response**  
  ```JSON
  {
    "data": {
        "failed": []
    },
    "message": "successfully stored products",
    "status": "success"
  }
  ```
  ### 3.6 Retrieve product price from squizz api
  **This is not a api that front end can access.  These are supposed to be called by the Postman or another similar tool thatallow you to make calls to the REST API.**
  **This method is repsonbile for getting the latest price from SQUIZZ platform and updating the table in the local database**
- **Request** 
    Before retrieve data from squizz api, you should log in first 
    Send **GET** to `/retrievePrices`
   
- **Response**  
  ```JSON
  {
    "data": {
        "failed": []
    },
    "message": "successfully stored product prices",
    "status": "success"
  }
  ```
### 3.7 Update product from squizz api
  **This is not a api that front end can access.  These are supposed to be called by the Postman or another similar tool thatallow you to make calls to the REST API.**
  **This method is repsonbile for getting the latest products from SQUIZZ platform and updating the table in the local database**
- **Request** 
   - Before retrieve data from squizz api, you should log in first 
   - Send **GET** to `/updateProducts`
   
- **Response**  
  ```JSON
   {
    "data": {
        "failed": []
    },
    "message": "successfully updated products",
    "status": "success"
  }
  ```

  ### 3.8 Update product price from squizz api
  **This is not a api that front end can access.  These are supposed to be called by the Postman or another similar tool thatallow you to make calls to the REST API.**
  **This method is repsonbile for getting the latest products from SQUIZZ platform and updating the table in the local database**
- **Request** 
    Before retrieve data from squizz api, you should log in first 
    Send **GET** to `/updateProducts`
   
- **Response**  
  ```JSON
  {
    "data": {
        "failed": []
    },
    "message": "successfully stored product prices",
    "status": "success"
  }
  ```

### 3.9 import metadata
  **This is not a api that front end can access.  These are supposed to be called by the Postman or another similar tool that allow you to make calls to the REST API.**
  **This method is repsonbile for getting the latest  3d model's metadata**
- **Request** 
 
   - Send **POST** to `/metadata/import`

    - Request Header:
    ```JSON
    {"Content-Type":"application/json"}
    ```
    - Request body:
    ``` JSON
        {
        "Username": "user1",
        "Password": "squizz",
        "Products": [
            {
                "Code": "CFP-600-12",
                "ProductParameters": [{
                    "Key": "Name",
                    "Value": "CFP - 600/12 Swirl Diffusers  with  Low Profile Plenum 250 Spigot"
                }, {
                  ...
                },
                ]
            },{
            ...
            }
          ]
        }
    ```
- **Response**  
  ```JSON
  {
    "message": "import success",
    "status": "success"
  }
  ```

  
  ### 3.10 import threedmodel
  **This is not a api that front end can access.  These are supposed to be called by the Postman or another similar tool that allow you to make calls to the REST API.**
  **After uploading the 3D model into server you should use this API to record the location of model in server **
- **Request** 
   - Send **POST** to `/threedmodel/import`
    - Request Header:
    ```JSON
    {"Content-Type":"application/json"}
    ```
    - Request body:
    ```JSON
        {"Username": "user1",
            "Password": "squizz",
            "Products": [{
                "Code": "CFP-600-20-LPP",
                "ProductParameters": null,
                "ModelURL": "https://s3-ap-southeast-2.amazonaws.com/awstest.project/3dModels/600_20_low Profile.glb"
            },{
            ...
            }]
            }
    ```
- **Response**  
  ```JSON
  {
    "message": "import success",
    "status": "success"
  }
  ```
  
### 3.11 get model's metadata 
 - **Request** 
   - Send **GET** to `/api/metadata/get`   
     the parameter is the productCode e.g`/api/metadata/get?productCode=CFP-600-12-LPP-200`
 - **Response**  
  ```JSON
{
    "found": true,
    "json_data": {
        "Description": "Radial Swirl Diffusers, Ceiling Fixed Pattern shall be Holyoake Model CFP-600/12.  Ceiling Radial Swirl Diffusers shall be designed for use in Variable Air Volume (VAV) systems with Highly Turbulent Radial  Air Flow Pattern and shall be suitable for ceiling heights of 2.4 to 4m. Ceiling Radial Swirl Diffusers shall maintain a COANDA effect at reduced air volumes and provide uniform temperature gradients throughout the occupied space. Diffusers shall be finished in powder coat and fitted with accessories and dampers where indicated as manufactured by Holyoake",
        "Diffuser Width (Length Millimeters)": "595.000000000000",
        "Flow Nom (Hvac Air Flow Liters Per Second)": "112.500000000000",
        "Holyoake Product Range": "Holyoake Swirl Diffusers.",
        "Inlet Spigot Diameter (Length Millimeters)": "250.000000000000",
        "Manufacturer": "Holyoake",
        "Material - Face": "Holyoake White",
        "Material Body": "Holyoake-Aluminium",
        "Max Flow (Hvac Air Flow Liters Per Second)": "200.000000000000",
        "Min Flow (Hvac Air Flow Liters Per Second)": "25.000000000000",
        "Model": "CFP-600/12 Low Profile complete with low profile plenum.",
        "Name": "CFP - 600/12  Swirl Diffusers  with Low Profile Plenum 200 Spigot",
        "Noise Level NC Max": "32NC",
        "Noise Level NC Min": "5 NC",
        "Plenum Box Height (Length Millimeters)": "250.000000000000",
        "Plenum Box Width (Length Millimeters)": "570.000000000000",
        "Static Pressure Max": "28 Pa",
        "Static Pressure Min": "2 Pa",
        "Type Comments": "Holyoake Swirl Diffuser CFP-600/12 c/w Low Profile Plenum.",
        "URL": "http://www.holyoake.com",
        "d_r (Length Millimeters)": "125.000000000000"
    }
}
  ```
     
## 4. Order API
 
   ### 4.1 get history order

- **Request** 
  - Send **GET** to `/api/history`
  - Take session_id as parameter e.g: `/api/history?session_id=785BC1EC135931064EC38E81A0D85952`
  
  - **Response**
    ``` JSON
    {
    "message": "Successfully retrieved order history",
    "orders": [
        {
            "billStatus": "SERVER_SUCCESS",
            "id": 33,
            "instructions": "Leave goods at the back entrance",
            "isDropship": "N",
            "lines": [
                {
                    "id": 30,
                    "keyProductId": "CRA350",
                    "orderId": 33,
                    "productCode": "CRA350",
                    "productId": 3504,
                    "productName": "Circular Louvred Diffuser",
                    "quantity": 1.00,
                    "totalPrice": 29.99,
                    "totalPriceExTax": 29.99,
                    "totalPriceIncTax": null,
                    "unitPrice": 29.99
                },
                {
                ...
                }
            ],
            "organizationId": 1,
            "supplierOrganizationId": "11EAF2251136B090BB69B6800B5BCB6D"
        },
       {
       ...
       }
    ],
    "status": "success"
}
    ```
    
  

### 4.2 Create Order

- **Request**

  - Send **POST** to `/api/orders`

    ```json
    {
    	"customer_id": 11,
    	"delivery_addr_id": 22,
    	"billing_addr_id": 22,
    	"lines": [
            {
    		    "product_id": 21,
    		    "quantity": 7
    	    }, {
    		    "product_id": 40,
    		    "quantity": 5
    	    }
        ],
    	"session_key": "F85F9E3320A47B776AF3C1D293A1B87E",
    	"instructions": "Place it infront the gate"
    }
    ```

- **Response**

  ```json
  {
      "id": 26,
      "keyPurchaseOrderID": null,
      "organizationId": 1,
      "keySupplierAccountID": null,
      "supplierOrgId": "11EAF2251136B090BB69B6800B5BCB6D",
      "createdDate": [
          "2020-10-25  19:06:42"
      ],
      "instructions": "Place it infront the gate",
      "deliveryOrgName": null,
      "deliveryContact": "9876541230",
      "deliveryEmail": "petra2333@gmail.com",
      "deliveryAddress1": "No.12",
      "deliveryAddress2": "Murry St, Xet, QLD",
      "deliveryAddress3": null,
      "deliveryRegionName": "QLD",
      "deliveryCountryName": "Australia",
      "deliveryPostcode": "QLD1131",
      "billingContact": "9876541230",
      "billingOrgName": null,
      "billingEmail": "petra2333@gmail.com",
      "billingAddress1": "No.12",
      "billingAddress2": "Murry St, Xet, QLD",
      "billingAddress3": null,
      "billingRegionName": "QLD",
      "billingCountryName": "Australia",
      "billingPostcode": "QLD1131",
      "isDropship": null,
      "lines": [
          {
              "id": 24,
              "lineType": "PRODUCT",
              "keyProductID": "21479231996799",
              "productName": "Disposable Tableware Plastic Tray Serving 210mm x 300mm 4pk",
              "quantity": 7,
              "unitPrice": 1.52,
              "totalPrice": 11.704,
              "priceTotalIncTax": 11.704,
              "priceTotalExTax": 10.64,
              "productCode": "100941",
              "productId": 21,
              "orderId": 26
          },
          {
              "id": 25,
              "lineType": "PRODUCT",
              "keyProductID": "21479232016715",
              "productName": "Bags Sandwich 6cm x 15cm 60pk",
              "quantity": 5,
              "unitPrice": 1.25,
              "totalPrice": 6.875,
              "priceTotalIncTax": 6.875,
              "priceTotalExTax": 6.25,
              "productCode": "104307",
              "productId": 40,
              "orderId": 26
          }
      ],
      "session_id": null,
      "billStatus": "purchased",
      "customer_id": 11
  }
  ```

  ### 4.3 Get Order

  - **Request**

    Send **GET** to `/api/order/<order_id>`

  - **Response**

    ```json
    {
        "id": 20,
        "keyPurchaseOrderID": null,
        "organizationId": 1,
        "keySupplierAccountID": null,
        "supplierOrgId": "11EA64D91C6E8F70A23EB6800B5BCB6D",
        "createdDate": "2020-10-25  18:39:47",
        "instructions": "Place it infront the gate",
        "deliveryOrgName": null,
        "deliveryContact": "9876541230",
        "deliveryEmail": "petra2333@gmail.com",
        "deliveryAddress1": "No.12",
        "deliveryAddress2": "Murry St, Xet, QLD",
        "deliveryAddress3": null,
        "deliveryRegionName": "QLD",
        "deliveryCountryName": "Australia",
        "deliveryPostcode": null,
        "billingContact": "9876541230",
        "billingOrgName": null,
        "billingEmail": "petra2333@gmail.com",
        "billingAddress1": "No.12",
        "billingAddress2": "Murry St, Xet, QLD",
        "billingAddress3": null,
        "billingRegionName": "QLD",
        "billingCountryName": "Australia",
        "billingPostcode": null,
        "isDropship": null,
        "lines": [
            {
                "id": 12,
                "lineType": null,
                "keyProductID": "21479231996639",
                "productName": "Disposable Tableware Plate Oval 230mm x 300mm 10pk",
                "quantity": 7.0,
                "unitPrice": 1.74,
                "totalPrice": 13.4,
                "priceTotalIncTax": 13.4,
                "priceTotalExTax": 12.18,
                "productCode": "100934",
                "productId": 20,
                "orderId": 20
            },
            {
                "id": 13,
                "lineType": null,
                "keyProductID": "21479231998906",
                "productName": "Fishing Line 100m",
                "quantity": 5.0,
                "unitPrice": 1.6,
                "totalPrice": 8.8,
                "priceTotalIncTax": 8.8,
                "priceTotalExTax": 8.0,
                "productCode": "101290",
                "productId": 24,
                "orderId": 20
            }
        ],
        "session_id": null,
        "billStatus": "purchased",
        "customer_id": 11
    }
    ```

    