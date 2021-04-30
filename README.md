# COMP90082_S1_TO_2021

### User Story Tracking

| User Story ID | Branch | Comment |
|---------------|--------|---------|
| 1.1           |[feature-customer-list](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/account-management-v1.0)|Account Management|
| 2.1           |[feature-customer-list](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-customer-list)|Customers page consisting of a search bar and tabular view of customers|
| 2.4           |[feature-hiring-form](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-hiring-form)|Hiring form page consisting of the hiring form|
| 3.2           |[feature-package-management](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-package-management)|Package management page including features such as search, pagination, add a new package, edit an existing package         |
| 3.3           |[feature-calendar](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-package-management)|Calendar view showing the availability of every package on the system (waiting to integrate with 2.4)         |

To run the source code, please read deployment/Local_Deployment_Guide.pdf



### A typical top-level directory layout

    .
    ├── code                                        # Code
    │   ├── backend                                 # Backend Code (FastAPI)
    │   └── frontend                                # Frontend Code (ReactJS)
    ├── db_migration_scripts                        # MySQL migration scripts to import the database
    ├── deployment                                  # Deployment Guide (Local & Auto)
    │   ├── scripts                                 # Scripts to deploy (planning to do in week 10)
    │   ├── CICD Pipeline(planning to do).pdf       # The CI/CD pipeline we're implementing (it's expected to be completed by week 10)
    ├── diagrams                                    # Documents about the product architecutre
    ├── documents                                   # All other relevant docs
    ├── prototypes                                  # All the prototypes created for the application
    ├── LICENSE
    └── README.md
