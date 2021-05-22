CREATE DATABASE  IF NOT EXISTS `squizz_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `squizz_app`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: squizz_app
-- ------------------------------------------------------
-- Server version	8.0.22

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'VIC','Melbourne','3053','125 Swanston st',1,NULL),(27,'VIC','Melbourne','3053','126 Swanston st',1,NULL),(28,'VIC','Melbourne','3053','127 Swanston st',1,NULL);
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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `age_group_id` int NOT NULL,
  `base_price` int NOT NULL,
  `price_levels` text NOT NULL,
  `sell_code` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_table2_agegroup` (`age_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra`
--

LOCK TABLES `extra` WRITE;
/*!40000 ALTER TABLE `extra` DISABLE KEYS */;
INSERT INTO `extra` VALUES (1,'Pants Adult',3,20,'0,10,15,20,25,30,35','P'),(2,'Pants and Parka Adult',3,30,'0,10,15,20,25,30,35','PP'),(3,'Apres Boots Adults',3,10,'0,5,10,15,20,25,25','A'),(4,'Helmet',3,10,'0,5,10,13,16,19,21','H'),(5,'Pants or Parka U14',2,18,'0,5,9,13,17,21,25','PY'),(6,'Pants and Parka U14',2,24,'0,10,15,20,25,29,33','PPY'),(7,'Apres Boots U14',2,8,'0,4,7,9,11,13,15','AK'),(8,'Helmet kids',2,0,'0,0,0,0,0,0,0','HK'),(9,'Pants and Parka/suit U6',1,18,'0,5,9,13,17,21,25','PPK'),(10,'Pants or Parka U6',1,14,'0,5,9,13,17,21,25','PK'),(11,'Apres Boots U14',1,8,'0,4,7,9,11,13,15','AK'),(12,'Helmet kids',1,0,'0,0,0,0,0,0,0','HK'),(13,'Pants Adult',4,20,'0,10,15,20,25,30,35','P'),(14,'Pants and Parka Adult',4,30,'0,10,15,20,25,30,35','PP'),(15,'Apres Boots Adults',4,10,'0,5,10,15,20,25,25','A'),(16,'Helmet',4,10,'0,5,10,13,16,19,21','H');
/*!40000 ALTER TABLE `extra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `foot_size` int DEFAULT NULL,
  `first_name` varchar(127) DEFAULT NULL,
  `last_name` varchar(127) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `din` decimal(5,2) DEFAULT NULL,
  `skill_level_id` int DEFAULT NULL,
  `user_group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_guests_user_groups_idx` (`user_group_id`),
  KEY `fk_guests_skill_levels_idx` (`skill_level_id`),
  CONSTRAINT `fk_guests_skill_levels` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`),
  CONSTRAINT `fk_guests_user_groups` FOREIGN KEY (`user_group_id`) REFERENCES `user_groups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `package_id` int NOT NULL,
  `trail_id` int NOT NULL,
  `package_cost` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orderdetails_orders1_idx` (`order_id`),
  KEY `fk_orderdetails_recipients1_idx` (`recipient_id`),
  KEY `package_id_idx` (`package_id`),
  KEY `trail_id_idx` (`trail_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `package_id` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `recipient_id` FOREIGN KEY (`recipient_id`) REFERENCES `recipients` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `trail_id` FOREIGN KEY (`trail_id`) REFERENCES `trail_types` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (13,14,4,1,1,40.00),(14,14,3,1,2,30.00),(15,15,2,1,1,40.00),(16,15,1,2,1,50.00),(17,17,3,1,1,50.00),(18,18,4,3,1,25.00),(19,19,5,1,1,50.00),(20,19,6,1,2,50.00);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_extras`
--

DROP TABLE IF EXISTS `order_extras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_extras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_details_id` int NOT NULL,
  `extra_id` int NOT NULL,
  `cost` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orderextras_orderpackages1_idx` (`order_details_id`),
  KEY `fk_orderextras_extra1_idx` (`extra_id`),
  CONSTRAINT `extra_id` FOREIGN KEY (`extra_id`) REFERENCES `extra` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `order_details_id` FOREIGN KEY (`order_details_id`) REFERENCES `order_details` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_extras`
--

LOCK TABLES `order_extras` WRITE;
/*!40000 ALTER TABLE `order_extras` DISABLE KEYS */;
INSERT INTO `order_extras` VALUES (18,14,1,20.00),(19,15,1,20.00),(20,15,2,40.00),(21,15,3,0.00),(22,17,1,20.00),(23,17,2,30.00),(24,18,9,18.00),(25,19,1,20.00),(26,19,2,30.00),(27,20,2,30.00);
/*!40000 ALTER TABLE `order_extras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_receipts`
--

DROP TABLE IF EXISTS `order_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_receipts` (
  `orders_id` int NOT NULL,
  `receipt` varchar(45) DEFAULT NULL,
  KEY `fk_orderreceipts_orders1_idx` (`orders_id`),
  CONSTRAINT `fk_orderreceipts_orders1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_receipts`
--

LOCK TABLES `order_receipts` WRITE;
/*!40000 ALTER TABLE `order_receipts` DISABLE KEYS */;
INSERT INTO `order_receipts` VALUES (14,'this is a link to recerpts -14'),(15,'this is a link to recerpts -15');
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
  `description` text,
  `status` enum('New','Handling','Done','Cancelled','Executing') NOT NULL DEFAULT 'New',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_orders_users1_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (14,3,'2021-05-20 00:00:00','2021-05-21 00:00:00','this is the first order','New'),(15,4,'2021-05-20 00:00:00','2021-05-21 00:00:00','this is the second order','Done'),(16,3,'2021-05-20 00:00:00','2021-05-21 00:00:00','this is the third order','Cancelled'),(17,1,'2021-05-20 00:00:00','2021-05-21 00:00:00','... some descriptions','New'),(18,1,'2021-05-20 00:00:00','2021-05-21 00:00:00','... some descriptions','New'),(19,1,'2021-05-20 00:00:00','2021-05-21 00:00:00','... some descriptions','New');
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
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `product_group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_package_idx` (`package_id`),
  KEY `fk_product_groups_idx` (`product_group_id`),
  CONSTRAINT `fk_package` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`),
  CONSTRAINT `fk_product_groups` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_product_group`
--

LOCK TABLES `package_product_group` WRITE;
/*!40000 ALTER TABLE `package_product_group` DISABLE KEYS */;
INSERT INTO `package_product_group` VALUES (1,1,1),(2,1,2),(3,2,12),(4,2,15),(5,2,1);
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
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `image_key` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `base_price` int NOT NULL,
  `price_levels` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
INSERT INTO `packages` VALUES (1,1,1,3,'Beginner Package - Adult','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/1.png',50,'0,35,50,65,75,80,85'),(2,1,1,2,'Beginner Package - Child 6 - 14 yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/2.png',40,'0,28,40,52,60,64,68'),(3,1,1,1,'Beginner Package - Child Under 6 yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/3.png',25,'0,17,25,33,38,40,43'),(4,1,2,4,'Intermediate Package','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/4.png',70,'0,40,60,70,80,90,95'),(5,1,3,4,'Performance Package','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/5.png',85,'0,45,65,80,85,95,105'),(6,2,1,3,'Beginner - Adult','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/6.png',40,'0,35,50,65,75,80,85'),(7,2,1,2,'Beginner - Child 6 -14 yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/7.png',32,'0,28,40,52,60,64,68'),(8,2,1,1,'Beginner - Child U6','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/8.png',20,'0,17,25,32,37,40,43'),(9,2,2,4,'Intermediate Ski Only','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/9.png',60,'0,40,60,75,85,95,105'),(10,2,3,4,'Performance Ski Only','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/10.png',70,'0,40,60,70,80,90,95'),(11,3,1,3,'Beginner - Adult','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/11.png',20,'0,15,25,30,35,40,45'),(12,3,1,2,'Beginner - Child 6 - 14yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/12.png',15,'0,10,15,20,25,30,35'),(13,3,1,1,'Beginner - Child Under 6yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/13.png',10,'0,5,10,15,20,25,30'),(14,3,2,4,'Intermediate Boot','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/14.png',30,'0,10,20,25,30,35,40'),(15,3,3,4,'Back Country Touring Boot','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/15.png',35,'0,20,35,45,55,65,75'),(16,4,1,3,'Beginner Package - Adult','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/16.png',50,'0,35,50,65,75,80,85'),(17,4,1,2,'Beginner Child 6-14 yrs','Ski Package includes Ski\'s, Boots and Poles, for Downhill, XC Classic, or BC skiing./Skis and Boards are perfect for the novice skier./Downhill Boots range from rear entry to buckle./XC Boots and bindings use NNN System./BC Boots are 75mm and binding are cable binding.','package-photos/17.png',40,'0,35,50,65,75,80,85');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_groups`
--

LOCK TABLES `product_groups` WRITE;
/*!40000 ALTER TABLE `product_groups` DISABLE KEYS */;
INSERT INTO `product_groups` VALUES (1,'helmet','helmet'),(2,'pole','pole'),(3,'carve','carve'),(4,'snowshoes','snowshoes'),(12,'boot','boot'),(13,'jacket','jacket'),(14,'pants','pants'),(15,'ski','ski'),(16,'glove','glove'),(17,'hire','hire'),(18,'goggles','goggles'),(19,'snowboard','snowboard'),(20,'other','other');
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
  `key_product_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `key_taxcode_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `key_sell_unit_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_price_tax_inclusive` tinyint(1) DEFAULT NULL,
  `is_kitted` tinyint(1) DEFAULT NULL,
  `internal_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `product_group_id` int DEFAULT NULL,
  `status` enum('AVAILABLE','HIRED','RESERVED') COLLATE utf8mb4_general_ci DEFAULT 'AVAILABLE',
  `unavailable_from` datetime DEFAULT NULL,
  `unavailable_to` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `group_id_idx` (`product_group_id`),
  CONSTRAINT `fk_products_product_groups` FOREIGN KEY (`product_group_id`) REFERENCES `product_groups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=521 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(2,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(3,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(4,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(5,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(6,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(7,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(8,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(9,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(10,'0','0','4325032074121','DH Budget skis, boots, poles','DH Beg','1',1,0,'11EBB7AB0C0D4920987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(11,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(12,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(13,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(14,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(15,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(16,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(17,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(18,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(19,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(20,'A','A','4325032074121','Apres Boots Adults','Apres','1',1,0,'11EBB7AB0C0D9756987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(21,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(22,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(23,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(24,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(25,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(26,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(27,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(28,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(29,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(30,'AK','AK','4325032074121','Apres Boots U14','ApresK','1',1,0,'11EBB7AB0C0D9758987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(31,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(32,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(33,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(34,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(35,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(36,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(37,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(38,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(39,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(40,'B','B','4325032074121','BC Budget Skis, boots, poles','BC Bud','1',1,0,'11EBB7AB0C0D7049987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(41,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(42,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(43,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(44,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(45,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(46,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(47,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(48,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(49,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(50,'BK','BK','4325032074121','Boot only Under 14','Bootu14','1',1,0,'11EBB7AB0C0DBE52987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(51,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(52,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(53,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(54,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(55,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(56,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(57,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(58,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(59,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(60,'boot','boot','4325032074121','Ski/SB or BC boots only','Boots','1',1,0,'11EBB7AB0C0D9740987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(61,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(62,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(63,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(64,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(65,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(66,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(67,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(68,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(69,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(70,'BP','BP','4325032074121','BC Perf, skis, boots, poles','BC Per','1',1,0,'11EBB7AB0C0D704C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(71,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(72,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(73,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(74,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(75,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(76,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(77,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(78,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(79,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(80,'BPB','BPB','4325032074121','Backcountry Garmont/Scarpa Boot','Garmon','1',1,0,'11EBB7AB0C0D9770987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(81,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(82,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(83,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(84,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(85,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(86,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(87,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(88,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(89,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(90,'BPS','BPS','4325032074121','Boot only Under 6','Boot u6','1',1,0,'11EBB7AB0C0DBE54987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(91,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(92,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(93,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(94,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(95,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(96,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(97,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(98,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(99,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(100,'CD','CD','4325032074121','Diamond Chain Hire','Diamond','1',1,0,'11EBB7AB0C0D9768987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(101,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(102,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(103,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(104,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(105,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(106,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(107,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(108,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(109,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(110,'DI','DI','4325032074121','DH Inter skis, boots, poles','DH Int','1',1,0,'11EBB7AB0C0D7031987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(111,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(112,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(113,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(114,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(115,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(116,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(117,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(118,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(119,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(120,'DK','DK','4325032074121','DH U15 skis, boots, poles','DH U14','1',1,0,'11EBB7AB0C0D7035987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(121,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(122,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(123,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(124,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(125,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(126,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(127,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(128,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(129,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(130,'DP','DP','4325032074121','DH Perf skis, boots, poles','DH Per','1',1,0,'11EBB7AB0C0D7033987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(131,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(132,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(133,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(134,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(135,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(136,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(137,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(138,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(139,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(140,'DPS','DPS','4325032074121','DH U5 skis, boots, poles','DH U6','1',1,0,'11EAF25675CE3928A1626AF3476460FC',2,'AVAILABLE',NULL,NULL),(141,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(142,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(143,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(144,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(145,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(146,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(147,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(148,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(149,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(150,'G','G','4325032074121','Goggles','Goggle','1',1,0,'11EBB7AB0C0D9760987A6AF3476460FC',18,'AVAILABLE',NULL,NULL),(151,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(152,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(153,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(154,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(155,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(156,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(157,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(158,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(159,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(160,'H','H','4325032074121','Helmet','Helmet','1',1,0,'11EBB7AB0C0D975A987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(161,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(162,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(163,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(164,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(165,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(166,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(167,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(168,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(169,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(170,'HG','HG','4325032074121','Helmet & Goggles','Helm/gogg','1',1,0,'11EBB7AB0C0D9764987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(171,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(172,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(173,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(174,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(175,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(176,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(177,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(178,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(179,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(180,'HK','HK','4325032074121','Helmet kids','Helm U14','1',1,0,'11EBB7AB0C0D975C987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(181,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(182,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(183,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(184,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(185,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(186,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(187,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(188,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(189,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(190,'HWG','HWG','4325032074121','Helmet & WG','Helm/WG','1',1,0,'11EBB7AB0C0D9766987A6AF3476460FC',1,'AVAILABLE',NULL,NULL),(191,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(192,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(193,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(194,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(195,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(196,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(197,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(198,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(199,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(200,'IB','IB','4325032074121','Intermediate Boot only','Int Boot','1',1,0,'11EBB7AB0C0DBE5A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(201,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(202,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(203,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(204,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(205,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(206,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(207,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(208,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(209,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(210,'ISKI','ISKI','4325032074121','Intermediiate ski only','Int ski','1',1,0,'11EBB7AB0C0DBE58987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(211,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(212,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(213,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(214,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(215,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(216,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(217,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(218,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(219,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(220,'J','J','4325032074121','Jacket Adults','Jacket','1',1,0,'11EBB7AB0C0DBE5E987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(221,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(222,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(223,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(224,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(225,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(226,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(227,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(228,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(229,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(230,'JK','JK','4325032074121','Jacket U6','Jacket U6','1',1,0,'11EBB7AB0C0DBE60987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(231,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(232,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(233,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(234,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(235,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(236,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(237,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(238,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(239,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(240,'JY','JY','4325032074121','Jacket U15','Jacket U15','1',1,0,'11EBB7AB0C0DBE62987A6AF3476460FC',13,'AVAILABLE',NULL,NULL),(241,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(242,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(243,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(244,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(245,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(246,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(247,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(248,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(249,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(250,'LC','LC','4325032074121','Ladder Chain Hire','Ladder','1',1,0,'11EBB7AB0C0D976A987A6AF3476460FC',17,'AVAILABLE',NULL,NULL),(251,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(252,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(253,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(254,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(255,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(256,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(257,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(258,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(259,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(260,'P','P','4325032074121','Pants Adult','P or P','1',1,0,'11EBB7AB0C0D9744987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(261,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(262,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(263,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(264,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(265,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(266,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(267,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(268,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(269,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(270,'PB','PB','4325032074121','Performance Boot Only','Per Boot','1',1,0,'11EBB7AB0C0DBE64987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(271,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(272,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(273,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(274,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(275,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(276,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(277,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(278,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(279,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(280,'PK','PK','4325032074121','Pants or Parka U6','PorPK','1',1,0,'11EBB7AB0C0D974D987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(281,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(282,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(283,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(284,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(285,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(286,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(287,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(288,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(289,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(290,'Poles','Poles','4325032074121','Poles Only','Poles','1',1,0,'11EBB7AB0C0D9762987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(291,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(292,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(293,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(294,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(295,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(296,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(297,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(298,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(299,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(300,'PP','PP','4325032074121','Pants and Parka Adult','P&P','1',1,0,'11EBB7AB0C0D9747987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(301,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(302,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(303,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(304,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(305,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(306,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(307,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(308,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(309,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(310,'PPK','PPK','4325032074121','Pants and Parka/suit U6','P&PK','1',1,0,'11EBB7AB0C0D974A987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(311,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(312,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(313,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(314,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(315,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(316,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(317,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(318,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(319,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(320,'PPY','PPY','4325032074121','Pants and Parka U14','P&PY','1',1,0,'11EBB7AB0C0D9753987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(321,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(322,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(323,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(324,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(325,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(326,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(327,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(328,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(329,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(330,'PSKI','PSKI','4325032074121','Performance ski only','Per ski','1',1,0,'11EBB7AB0C0DBE56987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(331,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(332,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(333,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(334,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(335,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(336,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(337,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(338,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(339,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(340,'PY','PY','4325032074121','Pants or Parka U14','PorPY','1',1,0,'11EBB7AB0C0D9750987A6AF3476460FC',14,'AVAILABLE',NULL,NULL),(341,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(342,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(343,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(344,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(345,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(346,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(347,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(348,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(349,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(350,'SB','SB','4325032074121','SB & Boots - Budget','SB Beg','1',1,0,'11EAF2567780CB26A1626AF3476460FC',12,'AVAILABLE',NULL,NULL),(351,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(352,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(353,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(354,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(355,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(356,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(357,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(358,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(359,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(360,'SBO','SBO','4325032074121','Snowboard Only','SB Only','1',1,0,'11EBB7AB0C0D7043987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(361,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(362,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(363,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(364,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(365,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(366,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(367,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(368,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(369,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(370,'SI','SI','4325032074121','SB & Boots Interm','SB Inter','1',1,0,'11EBB7AB0C0DBE5C987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(371,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(372,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(373,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(374,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(375,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(376,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(377,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(378,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(379,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(380,'SIO','SIO','4325032074121','Snowboard only - Inter','Per brd','1',1,0,'11EBB7AB0C0D7045987A6AF3476460FC',19,'AVAILABLE',NULL,NULL),(381,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(382,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(383,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(384,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(385,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(386,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(387,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(388,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(389,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(390,'SK','SK','4325032074121','SB and Boots U15','SB U14','1',1,0,'11EBB7AB0C0D7047987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(391,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(392,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(393,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(394,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(395,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(396,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(397,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(398,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(399,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(400,'ski','ski','4325032074121','DH skis/poles no boots','Beg ski','1',1,0,'11EBB7AB0C0D9742987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(401,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(402,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(403,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(404,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(405,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(406,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(407,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(408,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(409,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(410,'SKIK','SKIK','4325032074121','Ski only under 15','ski u14','1',1,0,'11EBB7AB0C0D9772987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(411,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(412,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(413,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(414,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(415,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(416,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(417,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(418,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(419,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(420,'SKIPS','SKIPS','4325032074121','Ski Only under 6','ski u6','1',1,0,'11EBB7AB0C0DBE50987A6AF3476460FC',15,'AVAILABLE',NULL,NULL),(421,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(422,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(423,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(424,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(425,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(426,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(427,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(428,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(429,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(430,'SP','SP','4325032074121','SB Perf board and Boots','SB Perf','1',1,0,'11EBB7AB0C0D703A987A6AF3476460FC',12,'AVAILABLE',NULL,NULL),(431,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(432,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(433,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(434,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(435,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(436,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(437,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(438,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(439,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(440,'TC','TC','4325032074121','Toboggan Carve','Tob Carve','1',1,0,'11EBB7AB0C0D976E987A6AF3476460FC',3,'AVAILABLE',NULL,NULL),(441,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(442,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(443,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(444,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(445,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(446,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(447,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(448,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(449,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(450,'TeleP','TeleP','4325032074121','Telemark skis, boots, poles','Tele','1',1,0,'11EBB7AB0C0D704E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(451,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(452,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(453,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(454,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(455,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(456,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(457,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(458,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(459,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(460,'TS','TS','4325032074121','Toboggan','Toboggan','1',1,0,'11EBB7AB0C0D976C987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(461,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(462,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(463,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(464,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(465,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(466,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(467,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(468,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(469,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(470,'WG','WG','4325032074121','Wrist Guard','Wrist G','1',1,0,'11EBB7AB0C0D975E987A6AF3476460FC',20,'AVAILABLE',NULL,NULL),(471,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(472,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(473,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(474,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(475,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(476,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(477,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(478,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(479,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(480,'X','X','4325032074121','XC Classic Ski, Boots, poles','XC Cla','1',1,0,'11EBB7AB0C0D7038987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(481,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(482,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(483,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(484,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(485,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(486,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(487,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(488,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(489,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(490,'XCP','XCP','4325032074121','XC U5, skis boots, poles','XC U6','1',1,0,'11EBB7AB0C0D7040987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(491,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(492,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(493,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(494,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(495,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(496,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(497,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(498,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(499,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(500,'XK','XK','4325032074121','XC U15, skis, boots, poles','XC U14','1',1,0,'11EBB7AB0C0D703E987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(501,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(502,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(503,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(504,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(505,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(506,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(507,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(508,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(509,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(510,'XS','XS','4325032074121','XC Skate, skis, boots, poles','XC Ska','1',1,0,'11EBB7AB0C0D703C987A6AF3476460FC',2,'AVAILABLE',NULL,NULL),(511,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(512,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(513,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(514,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(515,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(516,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(517,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(518,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(519,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL),(520,'Y','Y','4325032074121','Yowies/snowshoes','Yowies','1',1,0,'11EBB7AB0C0D7050987A6AF3476460FC',4,'AVAILABLE',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipients`
--

DROP TABLE IF EXISTS `recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `foot_size` int DEFAULT NULL,
  `first_name` varchar(127) DEFAULT NULL,
  `last_name` varchar(127) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `din` decimal(5,2) DEFAULT NULL,
  `skill_level_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_recipients_skill_levels_idx` (`skill_level_id`),
  CONSTRAINT `fk_recipients_skill_levels` FOREIGN KEY (`skill_level_id`) REFERENCES `skill_levels` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipients`
--

LOCK TABLES `recipients` WRITE;
/*!40000 ALTER TABLE `recipients` DISABLE KEYS */;
INSERT INTO `recipients` VALUES (1,180.00,80.00,300,'Alice','Hack',NULL,4.00,1),(2,170.00,60.00,270,'Bob','Ni',NULL,3.50,2),(3,170.00,60.00,30,'Ruby','Nguyen','2021-05-21',NULL,1),(4,170.00,60.00,30,'ABC','XYZ','2021-05-21',NULL,1),(5,170.00,60.00,30,'Ngoc','Nguyen','2021-05-21',NULL,1),(6,170.00,60.00,30,'Duy','Nguyen','2021-05-18',NULL,1);
/*!40000 ALTER TABLE `recipients` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (63,'868A09D4D61EC60F6DE75F09DCDFDD0F','2021-05-02 15:43:07',1,1),(64,'CB67B42623A1D67195CF9D86C43AA3EF','2021-05-02 15:53:17',1,1),(65,'4478461D6F30B3682F664E00BAE7988F','2021-05-02 16:39:28',1,1),(66,'EDEF6DA6CACC59DCED967C868537A133','2021-05-03 00:20:21',1,1),(67,'234F3E4D019A5198A0680CDD0F518A6E','2021-05-03 02:13:15',1,1),(68,'2561ED95753271688D4A50CA025918C6','2021-05-03 02:17:11',1,1),(69,'5AE58E7118FED4C4A132F372DBEFDABA','2021-05-11 23:08:57',1,1),(70,'4EFDFA590CF814484EF9D5C130E3F113','2021-05-11 23:09:17',1,1),(71,'CAD3F9C8CEB523503168A2BD94B63955','2021-05-11 23:32:13',1,1),(72,'FBFFE3617941FF0C612F4615E4CE28A9','2021-05-11 23:34:21',1,1),(73,'1A6F53F6B0AC024D477E183B6A446CE7','2021-05-11 23:35:00',1,1),(74,'D1938D12501D0ADAC117113E2EEB873D','2021-05-11 23:35:13',1,1),(75,'84D8CA59DCD4451D99F517AFEC156C39','2021-05-11 23:36:27',1,1),(76,'3A76E4A18016A5DFFF8102A6950D7B85','2021-05-11 23:39:15',1,1),(77,'52175266C4169B798C6A9CF37C0E458A','2021-05-12 02:48:56',1,1),(78,'97DD686559CAE524972E906AAA247C56','2021-05-12 19:54:46',1,1),(79,'EBE81A5AC082EA3535295E075BAEBFAC','2021-05-12 19:59:28',1,1),(80,'4FC4AA92DE1AEE3110941700E46DFF9D','2021-05-12 19:59:48',1,1),(81,'C24A4F0E1313F7453D28009349890E6A','2021-05-12 20:00:28',1,1),(82,'4EBCBF6E2E766FE95FD7BF54C48594DA','2021-05-12 20:00:40',1,1),(83,'427C5BBB2EEC9F4C26D85FE7623D7753','2021-05-12 20:01:18',1,1),(84,'F5A7C15B0CCA417BE36EA1F711873723','2021-05-12 20:02:30',1,1),(85,'D810F81FE6ADB6D74D743809F3E33DC3','2021-05-12 20:03:08',1,1),(86,'C9F3189AAA522AC1C4883E1EA55A485E','2021-05-12 20:03:11',1,1),(87,'45F157B518B5CB9561DCF961ED350688','2021-05-12 20:03:16',1,1),(88,'B87B3EAFB5956FB8EA5033C267C4A42D','2021-05-12 20:03:31',1,1),(89,'3094B81A98FF196637BC519099D24571','2021-05-12 20:03:49',1,1),(90,'7B97AD56B943BAA0F584E7CD0D93FFDD','2021-05-12 20:04:05',1,1),(91,'79DFCEB4B487E9F6DEEFCEF738131AF3','2021-05-12 20:05:20',1,1),(92,'876F8D269CF9342B88964D1E3E98D7A9','2021-05-12 20:05:33',1,1),(93,'D3EDA706325A5DBD5A260DC35A9B3850','2021-05-12 20:07:54',1,1),(94,'FC42091B1197F4CEC1011090AD346746','2021-05-12 20:08:14',1,1),(95,'F583CF5A499E1E30E29394F6D4318263','2021-05-12 20:08:47',1,1),(96,'90C4D32CD3C455A5A2A12A188BAE390B','2021-05-12 20:09:24',1,1),(97,'A9A922E6BD92BB3C917B8C67FC0D80BD','2021-05-12 20:09:52',1,1),(98,'3D40E3DE559951508D01BA9B0C623BE0','2021-05-12 20:10:16',1,1),(99,'D614BCC5F0D64DF7E779A70DEB3C5C53','2021-05-12 20:10:37',1,1),(100,'52DA97AFC60BFE59501BA6ADD57CDD90','2021-05-12 20:10:42',1,1),(101,'D0A58A71B691DC5B03362FD28F67AD00','2021-05-12 20:12:02',1,1),(102,'FD348922E37D1E4F9E5BAE4603E3CF51','2021-05-12 20:12:50',1,1),(103,'CCDA463EBF02797E2979B16F22DCD608','2021-05-12 20:13:35',1,1),(104,'91652EB117C12071B8C541CEAFEADC4D','2021-05-12 20:13:49',1,1),(105,'8396B1768E2BDD9D74F23829BE822D5A','2021-05-12 20:14:16',1,1),(106,'14CA1790ED2A869011C02B7BC6636C5F','2021-05-12 20:14:25',1,1),(107,'ABA87711A516219C8C44AF58E5FC6457','2021-05-12 20:14:34',1,1),(108,'D501F4992474AA0BF7630E4EDFF1806D','2021-05-12 20:14:36',1,1),(109,'A5023D4D95364D39B3F15CC50DB17643','2021-05-12 20:14:42',1,1),(110,'4F5CFD22C62C693C824B1BE85392BDA1','2021-05-12 20:17:59',1,1),(111,'8F429851741659CF9B4C2040490B04FE','2021-05-12 20:19:52',1,1),(112,'2CC5224A994A756133E3E5B216901E62','2021-05-12 20:20:47',1,1),(113,'A177AE27D313113B370B1C76DF4BB243','2021-05-12 20:22:23',1,1),(114,'409E7EA6EC64E1E249F20D65996E7840','2021-05-12 20:22:53',1,1),(115,'187DA9CB6DB8E4F75CB5EE574764B8E9','2021-05-12 20:26:48',1,1),(116,'877D2C4F650AC6AE8D8277EB7B19DAE0','2021-05-12 20:28:00',1,1),(117,'1DEA519D9F0B4E82C023C69D91C0B557','2021-05-12 20:28:37',1,1),(118,'0D947FFC5CA58A28B31823807A96FC1B','2021-05-12 20:28:50',1,1),(119,'3F371D1F53D55D4E8385C88543509B7E','2021-05-12 20:36:49',1,1),(120,'046A129A60ED8DCB72EFFC3BF4A6119A','2021-05-12 20:49:12',1,1),(121,'FA469A2E5F616F09BBC2EEE36A5AE3B9','2021-05-13 00:00:28',1,1),(122,'7268191D609AD4843DAC268987FE41B1','2021-05-13 01:44:01',1,1),(123,'4CA463109FB6251D26802B65D95AE89B','2021-05-13 02:06:07',1,1),(124,'45D287B89EEC909A60A5B5822065CD44','2021-05-13 15:01:52',1,1),(125,'7DC43868D308A32C85CEC7009EBC4732','2021-05-13 18:10:44',1,1),(126,'88EB88CACF4B42C86C2AE4E2889E59C4','2021-05-13 18:11:07',1,1),(127,'3CCBB7D39CE844F4F2A2498928A2C292','2021-05-13 18:13:35',1,1),(128,'2AE4B1861A235A37A9BD3EA8FA703DB2','2021-05-13 18:13:51',1,1),(129,'A8D651A5A9C67BD399AA2802F27C403E','2021-05-13 20:48:36',1,1),(130,'5C872D93189AC17A75BDA062813F2BE5','2021-05-13 21:04:58',1,1),(131,'7839D6206BC598C18D4473B9C8C82C31','2021-05-13 21:05:47',1,1),(132,'1C9460EB2D99B026A85FDC4CC6D0A17F','2021-05-13 21:10:52',4,1),(133,'BE3D750183BDD8344855A378E6452E82','2021-05-13 21:13:12',4,1),(134,'9EC9ECFF257D47232D372C4DA48BD7DB','2021-05-13 21:14:58',1,1),(135,'F740FE6C724BA9C44F15ECE6D540AF07','2021-05-13 22:02:21',1,1),(136,'729BEA1513B739107EAE792C1B32C989','2021-05-13 23:47:45',4,1),(137,'4323BFBB44D67C89F3682F7F019C2786','2021-05-13 23:48:11',1,1),(138,'73E709DBE8AB3FD4A43D08D2D0DAADCC','2021-05-14 01:02:16',4,1),(139,'1D4A0616D855B94DDAEFB0E4341ED68F','2021-05-14 01:11:25',1,1),(140,'4895417636D96E714D7AFC9314CB99A8','2021-05-14 01:11:37',4,1),(141,'8A72E51BCC2288B0C9D76486B50A05EA','2021-05-14 01:12:38',4,1),(142,'8846A2D7009F3A230B58629AF9F55241','2021-05-14 01:17:05',4,1),(143,'A6D121F5FF93F7DDC08F80C42709D795','2021-05-14 01:33:30',4,1),(144,'00DE596867FC14C936980D3B3BD04ED7','2021-05-14 01:36:33',4,1),(145,'8430B6EBE4DC6A474A2248770FF43D97','2021-05-14 01:42:57',1,1),(146,'E1178E7D1D2A0A2D3F59F8EAAD8CD41C','2021-05-14 10:11:47',1,1),(147,'B191FE532687391C1006DBFE4DAD1C97','2021-05-16 19:10:27',1,1),(148,'A8AD402A793F423D1F7501A353F9E85C','2021-05-16 19:10:57',1,1),(149,'9303B1541D3B964C5E0DD59B4B658076','2021-05-16 20:38:00',1,1),(150,'26BE00C5D9B8B66AE4E4245C867D3D14','2021-05-16 20:38:33',1,1),(151,'969A62C3A91A1C0AE028B67D4DCCB226','2021-05-18 00:53:56',1,1),(152,'58DFBFC30AF5230767981DB7EB1A2461','2021-05-22 12:13:24',1,1),(153,'CF0AD744AD84D67385020B553AA64178','2021-05-22 12:16:51',1,1),(154,'67E97562492F0D89BF91353EAA9078D0','2021-05-22 12:21:27',1,1),(155,'9B8AAEF1AF752F686B2A9F95D2EFBAC3','2021-05-22 12:45:45',1,1),(156,'8329973ABB549DB1775A6D5793C39143','2021-05-22 12:59:08',4,1),(157,'30C0A5ABBE8DA11807C6C005D1A32D52','2021-05-22 15:48:54',1,1),(158,'0752409683B77D5DBE859F65AF27D1EB','2021-05-22 16:02:08',4,1);
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
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id_UNIQUE` (`id`),
  KEY `fk_user_groups_users` (`user_id`),
  CONSTRAINT `fk_user_groups_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` VALUES (1,'Family',1),(2,'Close Friends',1);
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
INSERT INTO `user_types` VALUES (1,'CUSTOMER'),(2,'STAFF');
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
  `foot_size` int DEFAULT NULL,
  `first_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `last_name` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `din` decimal(5,2) DEFAULT NULL,
  `is_enabled` tinyint DEFAULT '1',
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',170.00,75.00,310,'Ruby','Nguyen 1','Male','1995-05-28','0434117998','ruby.nguyen@gmail.com',0.01,1,1,1,1),(2,'randy','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',170.00,66.00,330,'Randy','Tsai','Male','1995-05-05','0434117998','mail1@gmail.com',0.01,1,1,2,1),(3,'andrea','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',169.00,66.00,300,'Andrea','Law','Female','1995-05-05','0434117998','mail2@gmail.com',0.01,1,1,2,1),(4,'ruby','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',168.00,55.00,270,'Ruby','Nguyen','Male','1995-05-05','0434117998','mail3@gmail.com',0.01,1,1,3,2),(5,'kiet','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',167.00,33.00,250,'Kiet','To','Male','1995-05-05','0434117998','mail4@gmail.com',0.01,1,1,2,1),(6,'kai','$2b$12$lMSWuh14CuqoWpScrZe14.YCj3z9lrS1tJR8VzEhYfaNPwVSBkLwS',165.00,78.00,290,'Kai','Jin','Male','1995-05-05','0434117998','mail5@gmail.com',0.01,1,1,3,1);
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

-- Dump completed on 2021-05-22 22:00:16
