## AWS Deployment Guide
This document is a guide to deploying and configuring all the AWS infrastructure needed to deploy and run the SQUIZZ Web Ordering Application.


## Requirements
Before you get started, you need to obtain the AWS account credentials from the client. They will provide you with an AWS IAM user with unlimited privileges, and the credentials that our team has used to deploy different components.

**Required credentials**:
1. AWS IAM User Email and Password
2. RSA Private Key (.pem file) (for SSHing onto the EC2 instance)
3. AWS RDS IAM User Credentials
4. AWS RDS Database Username and Password
5. AWS S3 Bucket Details
    * Bucket name
    * Access Key
    * Secret Key


## Deployment Overview
Here is a brief overview of the deployed infrastructure.

**AWS EC2 Instance**: An AWS EC2 instance hosts and runs the Dockerized frontend and backend microservices.

**AWS RDS Database**: A production-level AWS RDS MySQL database is used for storage of product and user data.

**AWS S3 Bucket**: An AWS S3 Bucket is used to store the `.glb` files for the 3D models.


## Deploying and configuring the EC2 Instance
### To view existing instance
1. First, log into the [AWS Management Console](https://aws.amazon.com/console/)
2. To view the (hopefully) existing EC2 Instance:
    1. Navigate to the EC2 Dashboard
    2. Click on `Instances` in the left sidebar


### To provision and configure a new EC2 instance
1. Click `Launch instances` button in the top right
2. Choose `Ubuntu Server 18.04 LTS (HVM), SSD Volume Type`, and select `64-bit (x86)`
3. Select the desired instance type, according to your needs. The current instance is of type `t3a.small`
4. Click `Next: Configure Instance Details`
5. Leave the default instance details as is. Uncheck `Unlimited` for the `Credit specification` setting
6. Click `Next: Add Storage` and leave the default settings
7. Click `Next: Add Tags` and leave the default settings
8. Click `Next: Configure Security Group`
9. Now, you need to configure security groups so that the application can be accessed externally. 

    You need to set inbound rules for ports 80, 22, and 5000 for all incoming TCP connections.
10. Click `Review and Launch` to launch the instance


**Note**: you also need to ensure that you create an SSH key for gaining remote access to the EC2 instance


### To install Docker and Docker Compose
1. First, you need to SSH onto the instance
    ```bash
    $ ssh -i squizz_aws_rsa.pem ubuntu@13.211.211.152
    ```

    **Note**: you may first need to change the file permissions for the RSA private key

    ```bash
    $ sudo chmod 600 squizz_rsa.pem
    ```


2. Then, install Docker on the instance by following Step 1 of this [guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04) by Digital Ocean

3. Next, install Docker Compose (see https://docs.docker.com/compose/install/)
    ```bash
    $ sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    $ sudo chmod +x /usr/local/bin/docker-compose
    ```


4. Once Docker Compose is installed, you can now deploy the application. Transfer the `docker-compose.yml` file found here to the instance. You can achieve this with `scp`

    ```bash
    $ scp -i squizz_aws_rsa.pem docker-compose.yml ubuntu@13.211.211.152:/home/ubuntu
    ```
5. Create an environment variable file called `.env.prod` and replace the `...` with the necessary AWS RDS credentials
    ```
    USER=...            # AWS RDS Database Username
    PASSWORD=...        # AWS RDS Database Password
    HOST=...            # AWS RDS Database Hostname
    DB_NAME=squizz_app
    ```
6. Use Docker compose to start the application
    ```bash
    $ sudo docker-compose up --build -d
    ```

7. Congratulations. The application should now be running on port 80 at the IP address of the instance

8. To view the logs:
    ```bash
    $ sudo docker-compose logs -f -t
    ```
    You can press `CTRL + C` to exit the logs

## Deploying the RDS MySQL Database
### To view existing RDS DB instance
1. Go to the AWS RDS Service
2. Click on `Databases` on the left sidebar
3. Click on `squizz-database`. Now, you should be able to see its details including database endpoint, port, class, and configured security groups


    **Note**: As mentioned above, the username and password for this database are to be provided by the client.


### To create and configure a new RDS MySQL Database
1. Go to the AWS RDS Service dashboard
2. Click `Create Database`
3. Select `Standard Create` as the database creation method
4. Select `MySQL Version 8.0.20` or above
5. In the **Templates** section, select `Dev/Test`
6. In the **Settings** pane, set the `DB instance identifier`. For our database, it is `squizz-database`
7. Define username and password credentials
8. For **DB Instance Size**, select the option that suits your needs. We went with `db.m5.large`
9. In the **Storage** section, untick `Enable storage autoscaling`
10. In **Availability & durability**, select `Do not create a standby instance`
11. In **Connectivity**, click `Additional connectivity configuration`. For `Public access`, select `Yes` and choose an existing VPC
12. In **Database authentication**, select `Password authentication`
13. Disable any other additional configurations, such as automatic backups, encryption, and performance insights (anything that adds additional unnecessary costs)
14. Now, click `Create Database`
15. Once the database is created, you can connect to it with a tool like [MySQL Workbench](https://www.mysql.com/products/workbench/) and run the [SQL script](https://github.com/ansabkhaliq/backend/blob/master/db/data/FinalSQLDump.sql) to dump the database


## Creating and configuring an S3 Bucket
### To view the existing S3 bucket
1. Go to the S3 service dashboard
2. Click on `squizz-3d-images`
3. You will see a folder called `3dModels` that contains all the Holyoake products 3D models

    **Note**: We created a separate IAM user called `S3BucketUser` with only `AmazonS3FullAccess` permissions, and programmatic access enabled. This is because S3 write access is needed by the utility. You can obtain the IAM user credentials from the client (or just create a new IAM user).


### To create and configure a new S3 bucket
1. Click `Create Bucket`
2. Give the bucket a name and select a region
3. In the next section, untick `Block all public access`
4. Disable bucket versioning
5. Leave the tags as empty
6. Leave server-side encryption disabled
7. In **Advanced settings**, disable object lock
8. Click `Create Bucket`
9. Lastly, you need to configure CORS so that anyone can read from the bucket. Click on the **Permissions** tab, and paste this JSON into the **Cross-origin resource sharing (CORS)** settings

    ```JSON
    [
        {
            "AllowedHeaders": [],
            "AllowedMethods": [
                "GET"
            ],
            "AllowedOrigins": [
                "*"
            ],
            "ExposeHeaders": []
        }
    ]
    ```
