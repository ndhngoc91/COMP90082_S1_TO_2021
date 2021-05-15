# COMP90082_S1_TO_2021
COMP90082_S1_TO_2021 is a subject project that is developed by 15 students from the University of Melbourne for Rocky Valley Bikes & Snow Sports collaborating with Squizz which is a universally connected commerce platform that allows people and organisations to connect, automate and trade, while seamlessly collaborating through trusted relationships.

At Rocky Valley we have plenty of activities to make your holiday fun. From Ski hire, including cross country, back country, downhill and snowboards in winter to bike hire, golf clubs and kayaks in summer. We also stock a large range of cycing ...



## User Story Tracking

| User Story ID | Branch | Comment |
|---------------|--------|---------|
| 1.1           |[feature-account-management](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-account)|Account Management|
| 2.1           |[feature-customer-list](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-customer-list)|Customers page consisting of a search bar and tabular view of customers|
| 2.4           |[feature-hiring-form](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-hiring-form)|Hiring form page consisting of the hiring form|
| 3.2           |[feature-package-management](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-package-management)|Package management page including features such as search, pagination, add a new package, edit an existing package         |
| 3.3           |[feature-calendar](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/tree/feature-calendar)|Calendar view showing the availability of every package on the system (waiting to integrate with 2.4)         |

To deploy the source code on your local side, please read *deployment/Local_Deployment_Guide.pdf*


## Folder structure

    .
    ├── code                                        # Code
    │   ├── backend                                 # Backend Code (FastAPI)
    |       ├── tests                               # Unit tests for the backend
    │       └── ...                                 # ...
    │   └── frontend                                # Frontend Code (ReactJS)
    |       ├── __mock__                            # Mock functions for unit tests
    |       ├── __test__                            # Unit tests for the frontend
    │       └── ...                                 # ...
    ├── db_migration_scripts                        # MySQL migration scripts to import the database
    ├── demo_screenshots                            # Some demo screenshots
    ├── deployment                                  # Deployment Guide (Local & Auto)
    │   ├── scripts                                 # Scripts to deploy (planning to do in week 10)
    │   ├── CICD Pipeline(planning to do).pdf       # The CI/CD pipeline we're implementing
    ├── diagrams                                    # Documents about the product architecutre
    ├── documents                                   # All other relevant docs
    ├── prototypes                                  # All the prototypes created for the application
    ├── test                                        # Test plans for the product
    ├── LICENSE
    └── README.md
    
## Deployment guide
  
Documented here: [Local Deployment Guide](https://github.com/ndhngoc91/COMP90082_S1_TO_2021/blob/master/deployment/Local%20Deployment%20Guide.pdf)

(NEW) Docker Deployment Guide (All components: Database(MySQL), Backend, Frontend are now Dockerized), note that the local or manual deployment is still usable and if anything bug/issue to arise, you can always go back to it.

Follow these steps to deploy with Docker

1. Stop your local MySQL server (it will occupied port 3306 which makes the MySQL inside Docker won't be able to use that port). (in case you want to go back to local deployment, simply re-open your local MySQL)
   
2. The database .sql schema file inside <pre>db_migration_scripts/deploydata/</pre> will be import and use, so throw the version you want to use inside (remember only 1 file/version at a time)
   
3. Go to <pre>code/backend/app/api</pre> make sure inside database.py the HOST is <pre>HOST="mysqldb"</pre>
(in case you want local deployment, change it back to HOST="localhost:3306")

4. Go to <pre>code/frontend/</pre> and inside the file "webpack.base.conf", make sure to set
   <pre>devServer: {
        host: '0.0.0.0',
        ...</pre> for Docker deployment. (incase you want to go back to local/manual deployment, simply change it back to 127.0.0.1)
    <pre>devServer: {
        host: '127.0.0.1',
        ...</pre> 

5. Navigate to "COMP90082_S1_TO_2021" folder/directory (or in the same folder with the docker-compose.yml file).

6. Run this command

        docker-compose up -d --build
   and voila!!!

IMPORTANT: Everytime you make change to the code, remember to run step 6 again. If any problem persists, please "DELETE" the current Container/Image and then re-run step 6 again. This can be done easily with Docker Desktop, Go to "Containers/Apps" and hit the "Trash Bin icon" to delete it (will cost a few secs).

## LICENSE
  [MIT](LICENSE)
