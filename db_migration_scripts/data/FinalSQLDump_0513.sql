CREATE DATABASE IF NOT EXISTS `squizz_app`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;

USE `squizz_app`;

-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: squizz_app
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `state` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `postcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_line` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `user_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_addresses_orders1_idx` (`order_id`),
  KEY `fk_addresses_users1_idx1` (`user_id`),
  CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,NULL,NULL,NULL,NULL,3,NULL),(2,NULL,NULL,NULL,NULL,4,14),(3,NULL,NULL,NULL,NULL,5,NULL),(4,NULL,NULL,NULL,NULL,6,15),(5,NULL,NULL,NULL,NULL,7,NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `age_groups`
--

DROP TABLE IF EXISTS `age_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `age_groups` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `age_groups`
--

LOCK TABLES `age_groups` WRITE;
/*!40000 ALTER TABLE `age_groups` DISABLE KEYS */;
INSERT INTO `age_groups` VALUES (1,'Child Under6'),(2,'Child 6 - 14'),(3,'Adult'),(4,'All ages');
/*!40000 ALTER TABLE `age_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Ski packages',NULL),(2,'Ski/board & bindings (own boots)',NULL),(3,'Ski/Snowboard boots only',NULL),(4,'Snowboard package',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `organization_desc` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nationality_code` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'THETASMANIANGIFTWR','Mr.','John','Wick','04414221','john.wick@gmail.com','NOTHING','CA'),(2,'ACEFROZENWOODPARK','Mrs.','Client','Z','6137708899','testemail@gmail.com','NOTHING','CN'),(3,'string','string','string','string','0','string','string','string'),(6,'string','string','string','string','0','string','string','string'),(10,'string','string','string','string','0','string','string','string'),(11,'string','string','string','string','0','string','string','string'),(12,'string','string','string','string','0','string','string','string'),(13,'string','string','string','string','0','string','string','string'),(14,'string','string','string','string','0','string','string','string'),(15,'string','string','string','string','0','string','string','string');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extra`
--

DROP TABLE IF EXISTS `extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extra` (
  `idextra` int NOT NULL,
  `extracol` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idextra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra`
--

LOCK TABLES `extra` WRITE;
/*!40000 ALTER TABLE `extra` DISABLE KEYS */;
INSERT INTO `extra` VALUES (1,'Pants or Parka Adult'),(2,'Pants and Parka Adult'),(3,'Pants or Parka U14'),(4,'Pants and Parka U14'),(5,'Pants or Parka U6'),(6,'Pants and Parka/suit U6'),(7,'Apres Boots Adults'),(8,'Apres Boots U14'),(9,'Helmet Adults'),(10,'Helmet U14');
/*!40000 ALTER TABLE `extra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extraprice`
--

DROP TABLE IF EXISTS `extraprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extraprice` (
  `idextra` int NOT NULL,
  `daynumber` int NOT NULL,
  `extraprice` float DEFAULT '0',
  PRIMARY KEY (`daynumber`,`idextra`),
  KEY `fk_extraprice_extra1_idx` (`idextra`),
  CONSTRAINT `fk_extraprice_extra1` FOREIGN KEY (`idextra`) REFERENCES `extra` (`idextra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extraprice`
--

LOCK TABLES `extraprice` WRITE;
/*!40000 ALTER TABLE `extraprice` DISABLE KEYS */;
INSERT INTO `extraprice` VALUES (1,1,20),(2,1,30),(3,1,18),(4,1,24),(5,1,14),(6,1,18),(7,1,10),(8,1,8),(9,1,10),(10,1,0),(1,2,30),(2,2,40),(3,2,23),(4,2,34),(5,2,19),(6,2,23),(7,2,15),(8,2,12),(9,2,15),(10,2,0),(1,3,35),(2,3,45),(3,3,27),(4,3,39),(5,3,23),(6,3,27),(7,3,20),(8,3,15),(9,3,20),(10,3,0),(1,4,40),(2,4,50),(3,4,31),(4,4,44),(5,4,27),(6,4,31),(7,4,25),(8,4,17),(9,4,23),(10,4,0),(1,5,45),(2,5,55),(3,5,35),(4,5,49),(5,5,31),(6,5,35),(7,5,30),(8,5,19),(9,5,26),(10,5,0),(1,6,50),(2,6,60),(3,6,39),(4,6,53),(5,6,35),(6,6,39),(7,6,35),(8,6,21),(9,6,29),(10,6,0),(1,7,55),(2,7,65),(3,7,43),(4,7,57),(5,7,39),(6,7,43),(7,7,35),(8,7,23),(9,7,31),(10,7,0);
/*!40000 ALTER TABLE `extraprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_id` int NOT NULL,
  `item_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `orderId` (`order_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (18,'orderdetails18'),(19,'orderdetails19');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_receipts`
--

DROP TABLE IF EXISTS `order_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_receipts` (
  `orders_id` int NOT NULL,
  `receipt` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  KEY `fk_orderreceipts_orders1_idx` (`orders_id`),
  CONSTRAINT `fk_orderreceipts_orders1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_receipts`
--

LOCK TABLES `order_receipts` WRITE;
/*!40000 ALTER TABLE `order_receipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `package_id` int NOT NULL,
  `is_drop_ship` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  `is_pending` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_orders_users1_idx` (`user_id`),
  KEY `fk_orders_package1_idx` (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (14,3,NULL,NULL,'this is the first order',1,'Y','Y'),(15,4,NULL,NULL,'this is the second order',2,'N','Y');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_id` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `api_organization_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `api_organization_password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `account_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `supplier_organization_id` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'11EA64D91C6E8F70A23EB6800B5BCB6D','3a62ea5aa2d8845a72dd030369dd571d5123567f70fa76b5bc3bcdf103e3307cc52b01030230c4f2807b44f88ce0052e91f3b7550341f38fe6544d02abfd7d87','Squizzunimelb!0','PJSAS','11EAF2251136B090BB69B6800B5BCB6D'),(2,'unimelb',NULL,NULL,NULL,NULL),(3,'google',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_product_group`
--

DROP TABLE IF EXISTS `package_product_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_product_group` (
  `package_id` int NOT NULL,
  `product_group_id` int NOT NULL,
  PRIMARY KEY (`package_id`,`product_group_id`),
  KEY `fk_to_product_group_idx` (`product_group_id`),
  CONSTRAINT `fk_to_package` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_to_product_group` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_product_group`
--

LOCK TABLES `package_product_group` WRITE;
/*!40000 ALTER TABLE `package_product_group` DISABLE KEYS */;
INSERT INTO `package_product_group` VALUES (1,1),(1,2),(2,13),(2,14);
/*!40000 ALTER TABLE `package_product_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_ttypes_pair`
--

DROP TABLE IF EXISTS `package_ttypes_pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_ttypes_pair` (
  `package_id` int NOT NULL,
  `trail_type_id` int NOT NULL,
  `sellcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`package_id`,`trail_type_id`),
  KEY `fk_package_has_type_type1_idx` (`trail_type_id`),
  KEY `fk_package_has_type_package1_idx` (`package_id`),
  CONSTRAINT `fk_package_has_type_package1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_package_has_type_type1` FOREIGN KEY (`trail_type_id`) REFERENCES `trail_types` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_ttypes_pair`
--

LOCK TABLES `package_ttypes_pair` WRITE;
/*!40000 ALTER TABLE `package_ttypes_pair` DISABLE KEYS */;
INSERT INTO `package_ttypes_pair` VALUES (1,1,NULL),(1,2,NULL),(1,3,NULL),(1,4,NULL),(2,1,NULL),(2,2,NULL),(3,1,NULL),(3,2,NULL),(4,1,NULL),(5,1,NULL),(5,6,NULL),(6,1,NULL),(6,2,NULL),(6,5,NULL),(6,6,NULL),(7,1,NULL),(7,2,NULL),(7,5,NULL),(8,1,NULL),(8,2,NULL),(8,5,NULL),(9,1,NULL),(9,5,NULL),(10,1,NULL),(10,6,NULL),(11,1,NULL),(11,2,NULL),(11,5,NULL),(12,1,NULL),(12,2,NULL),(12,5,NULL),(13,1,NULL),(13,2,NULL),(13,5,NULL),(14,1,NULL),(15,6,NULL),(16,5,NULL),(17,5,NULL);
/*!40000 ALTER TABLE `package_ttypes_pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `skill_level_id` int NOT NULL,
  `age_group_id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idpackage_UNIQUE` (`id`),
  KEY `fk_table2_category1_idx` (`category_id`),
  KEY `fk_table2_skilllevel1_idx` (`skill_level_id`),
  KEY `fk_table2_agegroup` (`age_group_id`),
  CONSTRAINT `fk_packages_agegroups` FOREIGN KEY (`age_group_id`) REFERENCES `age_groups` (`id`),
  CONSTRAINT `fk_packages_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_packages_skilllevels` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,1,1,3,'Beginner Package - Adult','description1'),(2,1,1,2,'Beginner Package - Child 6 - 14 yrs','description2'),(3,1,1,1,'Beginner Package - Child Under 6 yrs','description3'),(4,1,2,4,'Intermediate Package','description4'),(5,1,3,4,'Performance Package','description5'),(6,2,1,3,'Beginner - Adult','description6'),(7,2,1,2,'Beginner - Child 6 -14yrs','description7'),(8,2,1,1,'Beginner - Child U6','description8'),(9,2,2,4,'Intermediate Ski Only','description9'),(10,2,3,4,'Performance Ski Only','description10'),(11,3,1,3,'Beginner - Adult','description11'),(12,3,1,2,'Beginner - child 6 - 14yrs','description12'),(13,3,1,1,'Beginner - Child Under 6yrs','description13'),(14,3,2,4,'Intermediate Boot','description14'),(15,3,3,4,'Back Country Touring Boot','description15'),(16,4,1,3,'Beginner Package - Adult','description16'),(17,4,1,2,'Beginner Child 6-14yrs','description17');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_levels`
--

DROP TABLE IF EXISTS `price_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_levels` (
  `package_id` int NOT NULL,
  `number_of_days` int NOT NULL,
  `price` float DEFAULT '0',
  PRIMARY KEY (`package_id`,`number_of_days`),
  KEY `fk_price_package1_idx` (`package_id`),
  CONSTRAINT `fk_price_package1` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_levels`
--

LOCK TABLES `price_levels` WRITE;
/*!40000 ALTER TABLE `price_levels` DISABLE KEYS */;
INSERT INTO `price_levels` VALUES (1,1,50),(1,2,85),(1,3,100),(1,4,115),(1,5,125),(1,6,130),(1,7,135),(2,1,50),(2,2,85),(2,3,100),(2,4,115),(2,5,125),(2,6,130),(2,7,135),(3,1,93),(3,2,17),(3,3,74),(3,4,37),(3,5,52),(3,6,96),(3,7,7),(4,1,39),(4,2,2),(4,3,79),(4,4,5),(4,5,71),(4,6,47),(4,7,72),(5,1,19),(5,2,42),(5,3,77),(5,4,45),(5,5,73),(5,6,23),(5,7,71),(6,1,70),(6,2,73),(6,3,81),(6,4,13),(6,5,26),(6,6,22),(6,7,35),(7,1,89),(7,2,16),(7,3,71),(7,4,19),(7,5,44),(7,6,97),(7,7,83),(8,1,8),(8,2,1),(8,3,37),(8,4,96),(8,5,58),(8,6,86),(8,7,16),(9,1,59),(9,2,72),(9,3,53),(9,4,54),(9,5,90),(9,6,19),(9,7,89),(10,1,15),(10,2,64),(10,3,41),(10,4,94),(10,5,95),(10,6,85),(10,7,64),(11,1,31),(11,2,25),(11,3,6),(11,4,75),(11,5,3),(11,6,11),(11,7,46),(12,1,99),(12,2,80),(12,3,34),(12,4,28),(12,5,30),(12,6,98),(12,7,81),(13,1,31),(13,2,77),(13,3,76),(13,4,77),(13,5,91),(13,6,3),(13,7,63),(14,1,68),(14,2,33),(14,3,53),(14,4,13),(14,5,88),(14,6,3),(14,7,21),(15,1,43),(15,2,67),(15,3,28),(15,4,42),(15,5,48),(15,6,71),(15,7,34),(16,1,99),(16,2,54),(16,3,23),(16,4,67),(16,5,92),(16,6,29),(16,7,90),(17,1,15),(17,2,30),(17,3,60),(17,4,80),(17,5,90),(17,6,92),(17,7,68);
/*!40000 ALTER TABLE `price_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_groups`
--

DROP TABLE IF EXISTS `product_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_groups`
--

LOCK TABLES `product_groups` WRITE;
/*!40000 ALTER TABLE `product_groups` DISABLE KEYS */;
INSERT INTO `product_groups` VALUES (1,'helmet','something'),(2,'pole','something'),(12,'walkingboots','something'),(13,'jacket','something'),(14,'pants','something'),(15,'skiboard','something'),(16,'glove','something');
/*!40000 ALTER TABLE `product_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `idpackage` int NOT NULL DEFAULT '1',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `setting` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_products_package1_idx` (`idpackage`),
  KEY `group_id_idx` (`group_id`),
  CONSTRAINT `groups_id` FOREIGN KEY (`group_id`) REFERENCES `product_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'helmetP1',0,'something',250.00,1,'{\"size\":\"M\", \"skill_level\":\"DH\" }',1),(2,'helmetP2',0,'something',350.00,1,'{\"size\":\"L\", \"skill_level\":\"XC\" }',1),(3,'gloveG3',0,'something',0.00,1,'{\"size\":\"S\", \"brand\":\"fox\", \"width\":\"52\", \"skill_level\":\"DH\" }',16),(4,'Accelerator',0,'something',30.00,1,'{}',15),(5,'poleQ1',1,'something',40.00,1,'{}',2),(6,'poleQ2',1,'something',50.00,1,'{}',2),(7,'poleQ3',1,'something',100.00,1,'{}',2),(8,'gloveG4',1,'something',100.00,1,'{\"size\":\"M\", \"brand\":\"fox\", \"width\":\"52\", \"skill_level\":\"DH\" }',16),(10,'jacket',1,'something',80.00,1,'{\"size\":\"M\", \"length\":\"292\" }',13),(11,'skiboard',1,'something',110.00,1,'{\"brand\":\"fox\", \"length\":\"158\"}',15);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `session_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `user_id` int NOT NULL,
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (63,'868A09D4D61EC60F6DE75F09DCDFDD0F','2021-05-02 15:43:07',1,1),(64,'CB67B42623A1D67195CF9D86C43AA3EF','2021-05-02 15:53:17',1,1),(65,'4478461D6F30B3682F664E00BAE7988F','2021-05-02 16:39:28',1,1),(66,'EDEF6DA6CACC59DCED967C868537A133','2021-05-03 00:20:21',1,1),(67,'234F3E4D019A5198A0680CDD0F518A6E','2021-05-03 02:13:15',1,1),(68,'2561ED95753271688D4A50CA025918C6','2021-05-03 02:17:11',1,1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill_levels`
--

DROP TABLE IF EXISTS `skill_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill_levels` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill_levels`
--

LOCK TABLES `skill_levels` WRITE;
/*!40000 ALTER TABLE `skill_levels` DISABLE KEYS */;
INSERT INTO `skill_levels` VALUES (1,'Beginner'),(2,'Intermediate'),(3,'Performance');
/*!40000 ALTER TABLE `skill_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trail_types`
--

DROP TABLE IF EXISTS `trail_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trail_types` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trail_types`
--

LOCK TABLES `trail_types` WRITE;
/*!40000 ALTER TABLE `trail_types` DISABLE KEYS */;
INSERT INTO `trail_types` VALUES (1,'Downhill'),(2,'XC Classic'),(3,'BC Touring'),(4,'XC Skate'),(5,'Backcountry Touring'),(6,'Snowboard');
/*!40000 ALTER TABLE `trail_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `users` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `group_id_UNIQUE` (`group_id`),
  KEY `fk_user_groups_users` (`user_id`),
  CONSTRAINT `fk_user_groups_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` VALUES (1,'team avanger',NULL,NULL),(3,'team randy family',NULL,NULL),(4,'team squizz company',NULL,NULL);
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (1,'customer'),(2,'staff');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `foot_size` decimal(3,1) DEFAULT NULL,
  `first_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `din` decimal(5,2) DEFAULT NULL,
  `skill_level_id` int DEFAULT NULL,
  `organization_id` int DEFAULT NULL,
  `user_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `organizationId` (`organization_id`) USING BTREE,
  KEY `fk_users_user_type1_idx` (`user_type_id`),
  KEY `fk_users_skill_levels_idx` (`skill_level_id`),
  CONSTRAINT `fk_users_organizations` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`),
  CONSTRAINT `fk_users_skill_levels` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`),
  CONSTRAINT `fk_users_user_types` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','squizz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(3,'Randy','0000',170.00,66.00,42.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1),(4,'Andrea','0000',169.00,66.00,37.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1),(5,'Ruby','0000',168.00,55.00,41.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1),(6,'Kiet','0000',167.00,33.00,44.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,1),(7,'Kai','0000',165.00,78.00,38.0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-11  1:14:05
