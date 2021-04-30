# SQUIZZ Web Ordering Application Backend

## Table Of Contents
1. **[Project Description](#Project-Description)**
2. **[Features](#Features)**
3. **[Documentation](#Documentation)**
4. **[System Requirements](#System-Requirements)**
5. **[Technologies Used](#Technologies-Used)**
6. **[AWS Deployment Guide](#AWS-Deployment-Guide)**
7. **[Setup Guide](#Setup-Guide)**
8. **[Unit Testing](#Unit-Testing)**
9. **[User Acceptance Tests](#User-Acceptance-Tests)**
10. **[Traceability Matrix](#Traceability-Matrix)**
11. **[Release History](#Release-History)**
12. **[Attribution](#Attribution)**

## Project Description
This repository contains the backend source code for the SQUIZZ Web Ordering Application. It also contains the entire documentation for the project, an AWS deployment guide, and unit tests.

The web ordering application is a B2B/B2C system that supports the product catalogues of Holyoake, and PJ SAS Trading. It allows users to procure orders for different products, and to view in-browser rendered 3D models for Holyoake swirl diffusers. It also supports dynamic customer-level pricing based on the current selected customer.

Please check out the [frontend repository](https://github.com/ansabkhaliq/frontend) for more details on the frontend client.

This project also integrates with our custom desktop utility that converts IFC files into 3D models. The repository for the utility can be found [here](https://github.com/ansabkhaliq/IFCConverto).

## Features
* Import products from the SQUIZZ API
* Import prices from the SQUIZZ API
* Import categories from the SQUIZZ API
* Import customer data form the SQUIZZ API
* Send order details to SQUIZZ API to create orders
* Sync customer pricing data when customer is switching
* Provides a method to import 3D model meta data from the desktop utility
* Provides a method to import 3D model URL from the desktop utility
* Authenticates the front end user
* Authenticates an organization and establish a session with SQUIZZ API
* Provide data for products search via barcode or product code
* Provide complete list of products along with their categories for the frontend

## Documentation
All of the process and product related documentation for the project can be found [here](./Docs) in the `Docs` directory.

## System Requirements
The backend can be run on any operating system.

Listed below are the requirements to run the application:
* [Python 3.8](https://www.python.org/) or above
* [Docker](https://www.docker.com/) (only if you want to run the backend using Docker) 

We recommend using [Visual Studio Code](https://code.visualstudio.com/download) or [PyCharm](https://www.jetbrains.com/pycharm/) for development.

## Technologies Used
* [Python 3.8](https://www.python.org/) as the programming language
* [FastAPI](https://fastapi.tiangolo.com/) for our backend framework
* [PyMySQL](https://pymysql.readthedocs.io/en/latest/) for a Python MySQL client library
* [Pytest](https://docs.pytest.org/en/6.2.x/) for testing

## AWS Deployment Guide
This repository includes a deployment guide and a Docker Compose file for deploying the entire application (including the frontend client and database) on AWS. These files can be found [here](./deployment).

## Setup Guide
There are two ways to deploy the backend and database, either locally or in production. You can run the backend by either setting up a virtual environment or using Docker.

### Using a Virtual Environment

#### Set up local database and its connection

1. Install MySQL Workbench and MySQL Server
     If you don't know how to do this, watch this [tutorial](https://www.youtube.com/watch?v=u96rVINbAUI)

2. Setup the database
. Run the script `FinalSqlDump.sql` in `backend/db/data` in MySQL Workbench to create the database and populate the tables

3. Modify database username & password fields in these files: 
`fast_api/database.py`
`fast_api/config.py`
to make sure the backend can link to your local database

#### Install the dependencies (Windows)

1. Set up a virtual environment
    ```
    $ python -m venv venv
    $ venv\Scripts\activate.bat
    $ pip install -r requirements.txt
    ```
    **Note:** These commands are for Windows. They are similar for Mac or Linux

#### Install the dependencies (Mac / Linux)

1. Install dependencies:
```
pip install fastapi
pip install uvicorn
pip install pipenv
```

2. Create an virtual environment

```
source venv/bin/activate
pipenv install -r requirements.txt
```

3. To activate the virtual environment, run `pipenv shell`.

4. To deactivate the virtual environment, run `deactivate`.


## Unit Testing
The unit tests are written in Python using [pytest](https://docs.pytest.org/en/stable/).

To install `pytest`:
```bash
$ pip install pytest
```
**Note**: Before you can run the tests, you need to start the backend server first.

To run the tests, first ensure that you are in the root directory of the backend. Then, run:
```bash
$ pytest
```

## User Acceptance Tests
The user acceptance tests can be found [here](https://github.com/ansabkhaliq/backend/blob/master/Test%20Cases%20Docs/Test%20Cases%20Report.pdf).


## Traceability Matrix
The traceability matrix can be found on the last page of the user acceptance tests document. Please refer to [User Acceptance Tests](#User-Acceptance-Tests).

## Release History
*Note:* The release history only contains features completed by SQ-Wombat
### Sprint 2
* 1.0.0 - Feature development from userstory *ID: 5; Name: Storing 3D models generated by utility* on [branch](https://github.com/ansabkhaliq/backend/tree/importModel)
* 1.0.0 - Feature development from userstory *ID: 8; Name: View the parameterized data for the 3D model(s)* on [pull request](https://github.com/ansabkhaliq/backend/pull/15)
* 1.0.0 - Enhancement to product details page to display product descriptions on [branch](https://github.com/ansabkhaliq/backend/tree/ProductDetailPage)
* 1.0.0 - Enhancement to product search by introducing product live search on [branch](https://github.com/ansabkhaliq/backend/tree/ProductLiveSearch)
* 1.0.0 - Enhancement to display calculated GST of order on [branch](https://github.com/ansabkhaliq/backend/tree/DisplayGST)
* 1.0.0 - Enhancement in the redesign the order history page on [branch](https://github.com/ansabkhaliq/backend/tree/OrderHistoryRedesign)
* 1.0.0 - Bugfix at userstory *ID: 7; Name: Display 3D model on cart page for product search bar* for searching the product via barcode on [branch](https://github.com/ansabkhaliq/backend/tree/BugfixProductCode)
* 1.0.0 - Bugfix at userstory *ID: 3 Name: View the 3D model(s) of the products on the product listing page* on [branch](https://github.com/ansabkhaliq/backend/tree/BugFixNoPrice)
* 1.0.0 - Bugfix at userstory *ID: 5; Name: Storing 3D models generated by utility* on [branch](https://github.com/ansabkhaliq/backend/tree/Update3DModelLinkBugFix)
* 1.0.0 - Bugfix for technical debt concurrency issues on [commit](https://github.com/ansabkhaliq/backend/commit/fa76e41113e9a83227d12f6260872d814c691b78)
* 1.0.0 - Unit testing for backend on [branch](https://github.com/ansabkhaliq/backend/tree/UnitTesting)
* 1.0.0 - Introducing Docker for the backend on [branch](https://github.com/ansabkhaliq/backend/tree/DockerizeBackend)
* 1.0.0 - Introduce AWS Deployment Guide on [branch](https://github.com/ansabkhaliq/backend/tree/DeploymentGuide)

### Sprint 1
* 1.0.0 - Feature development from userstory *ID: 2; Name: Display 3D model on product detail page* on [branch](https://github.com/ansabkhaliq/backend/tree/ProductDetailPage)
* 1.0.0 - Feature development from userstory *ID 7; Name: View the 3D model(s) of the product on the Cart Page* on [branch](https://github.com/ansabkhaliq/backend/tree/CartPage)
* 1.0.0 - Paid off technical debt by refactoring the backend on [pull request](https://github.com/ansabkhaliq/backend/pull/1)
* 1.0.0 - Paid off technical debt by redesigning database architecture on [pull request](https://github.com/ansabkhaliq/backend/pull/1)
* 1.0.0 - Fixed code for importing the data from the SQUIZZ API
* 1.0.0 - Import old PJ SAS product images data in to the new images table on [pull request](https://github.com/ansabkhaliq/backend/pull/3)

## Attribution
Created by SQ-Wombat and SQ-Koala.
