-- MySQL dump 10.13  Distrib 8.0.24, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: squizz_app
-- ------------------------------------------------------
-- Server version	8.0.24

create DATABASE if not EXISTS `squizz_app`;
USE `squizz_app` ;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `users_id` bigint NOT NULL,
  `country_code` varchar(10) NOT NULL,
  `post_code` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `orders_id` int DEFAULT NULL,
  PRIMARY KEY (`users_id`),
  KEY `fk_addresses_orders1_idx` (`orders_id`),
  KEY `fk_addresses_users1_idx1` (`users_id`),
  CONSTRAINT `fk_addresses_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (3,'80275','802','address address address',NULL),(4,'20775','803','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',14),(5,'44253','804','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL),(6,'75822','805','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',15),(7,'68552','806','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agegroup`
--

DROP TABLE IF EXISTS `agegroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agegroup` (
  `idagegroup` int NOT NULL,
  `agegroupcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idagegroup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agegroup`
--

LOCK TABLES `agegroup` WRITE;
/*!40000 ALTER TABLE `agegroup` DISABLE KEYS */;
INSERT INTO `agegroup` VALUES (1,'Child Under6'),(2,'Child 6 - 14'),(3,'Adult'),(4,'All ages');
/*!40000 ALTER TABLE `agegroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `idcategory` int NOT NULL,
  `categorycol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcategory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
insert into category(idcategory,categorycol) values
(1,'Ski packages'),(2,'Ski/board & bindings (own boots)'),(3,'Ski/Snowboard boots only'),(4,'Snowboard package');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extra`
--

DROP TABLE IF EXISTS `extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extra` (
  `idextra` int NOT NULL,
  `extracol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idextra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extra`
--

LOCK TABLES `extra` WRITE;
/*!40000 ALTER TABLE `extra` DISABLE KEYS */;
insert into extra(idextra,extracol) values
(1,'item1'),(2,'item2'),(3,'item3'),(4,'item4'),(5,'item5'),(6,'item6'),(7,'item7'),(8,'item8');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extraprice`
--

LOCK TABLES `extraprice` WRITE;
/*!40000 ALTER TABLE `extraprice` DISABLE KEYS */;
/*!40000 ALTER TABLE `extraprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_of_product`
--

DROP TABLE IF EXISTS `group_of_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_of_product` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `description` varchar(80) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `id_UNIQUE` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_of_product`
--

LOCK TABLES `group_of_product` WRITE;
/*!40000 ALTER TABLE `group_of_product` DISABLE KEYS */;
INSERT INTO `group_of_product` VALUES (1,'Bike equipment','hadlebar, helmet, gloves'),(2,'Ski equipment','boots, poles, helmet');
/*!40000 ALTER TABLE `group_of_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups_of_user`
--

DROP TABLE IF EXISTS `groups_of_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups_of_user` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `group_id_UNIQUE` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups_of_user`
--

LOCK TABLES `groups_of_user` WRITE;
/*!40000 ALTER TABLE `groups_of_user` DISABLE KEYS */;
INSERT INTO `groups_of_user` VALUES (1,'team avanger'),(3,'team randy family'),(4,'team squizz company');
/*!40000 ALTER TABLE `groups_of_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderId` bigint NOT NULL,
  `orderdetailscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `orderId` (`orderId`) USING BTREE,
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (18,'orderdetails18'),(19,'orderdetails19');
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderreceipts`
--

DROP TABLE IF EXISTS `orderreceipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderreceipts` (
  `orders_id` bigint NOT NULL,
  `receipt` varchar(45) DEFAULT NULL,
  KEY `fk_orderreceipts_orders1_idx` (`orders_id`),
  CONSTRAINT `fk_orderreceipts_orders1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderreceipts`
--

LOCK TABLES `orderreceipts` WRITE;
/*!40000 ALTER TABLE `orderreceipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderreceipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `users_id` bigint NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `description` text,
  `idpackage` INT NOT NULL,
  `is_drop_ship` enum('Y','N') NOT NULL DEFAULT 'N',
  `is_pending` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_orders_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_orders_package1_idx` (`idpackage` ASC) VISIBLE,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`),
  CONSTRAINT `fk_orders_package1`
    FOREIGN KEY (`idpackage`)
    REFERENCES `package` (`idpackage`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (2,'squizz'),(3,'unimelb'),(4,'google');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `idpackage` int NOT NULL,
  `idcategory` int NOT NULL,
  `idskilllevel` int NOT NULL,
  `idagegroup` int NOT NULL,
  `packagename` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `sellcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idpackage`),
  UNIQUE KEY `idpackage_UNIQUE` (`idpackage`),
  KEY `fk_table2_category1_idx` (`idcategory`),
  KEY `fk_table2_skilllevel1_idx` (`idskilllevel`),
  KEY `fk_table2_agegroup` (`idagegroup`),
  CONSTRAINT `fk_table2_agegroup` FOREIGN KEY (`idagegroup`) REFERENCES `agegroup` (`idagegroup`),
  CONSTRAINT `fk_table2_category1` FOREIGN KEY (`idcategory`) REFERENCES `category` (`idcategory`),
  CONSTRAINT `fk_table2_skilllevel1` FOREIGN KEY (`idskilllevel`) REFERENCES `skilllevel` (`idskilllevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
insert into package(idpackage,idcategory,idskilllevel,idagegroup,packagename,description,sellcode) values
(1,1,1,3,'Beginner Package - Adult','description1','sellcode1'),
(2,1,1,2,'Beginner Package - Child 6 - 14 yrs','description2','sellcode2'),
(3,1,1,1,'Beginner Package - Child Under 6 yrs','description3','sellcode3'),
(4,1,2,4,'Intermediate Package','description4','sellcode4'),
(5,1,3,4,'Performance Package','description5','sellcode5'),
(6,2,1,3,'Beginner - Adult','description6','sellcode6'),
(7,2,1,2,'Beginner - Child 6 -14yrs','description7','sellcode7'),
(8,2,1,1,'Beginner - Child U6','description8','sellcode8'),
(9,2,2,4,'Intermediate Ski Only','description9','sellcode9'),
(10,2,3,4,'Performance Ski Only','description10','sellcode10'),
(11,3,1,3,'Beginner - Adult','description11','sellcode11'),
(12,3,1,2,'Beginner - child 6 - 14yrs','description12','sellcode12'),
(13,3,1,1,'Beginner - Child Under 6yrs','description13','sellcode13'),
(14,3,2,4,'Intermediate Boot','description14','sellcode14'),
(15,3,3,4,'Back Country Touring Boot','description15','sellcode15'),
(16,4,1,3,'Beginner Package - Adult','description16','sellcode16'),
(17,4,1,2,'Beginner Child 6-14yrs','description17','sellcode17');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_type`
--

DROP TABLE IF EXISTS `package_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_type` (
  `idpackage` int NOT NULL,
  `idtype` int NOT NULL,
  PRIMARY KEY (`idpackage`,`idtype`),
  KEY `fk_package_has_type_type1_idx` (`idtype`),
  KEY `fk_package_has_type_package1_idx` (`idpackage`),
  CONSTRAINT `fk_package_has_type_package1` FOREIGN KEY (`idpackage`) REFERENCES `package` (`idpackage`),
  CONSTRAINT `fk_package_has_type_type1` FOREIGN KEY (`idtype`) REFERENCES `type` (`idtype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_type`
--

LOCK TABLES `package_type` WRITE;
/*!40000 ALTER TABLE `package_type` DISABLE KEYS */;
insert into package_type(idpackage,idtype) values
(1,1),(1,2),(1,3),(1,4),
(2,1),(2,2),
(3,1),(3,2),
(4,1),
(5,1),(5,6),
(6,1),(6,5),(6,2),(6,6),
(7,1),(7,5),(7,2),
(8,1),(8,5),(8,2),
(9,1),(9,5),
(10,1),(10,6),
(11,1),(11,5),(11,2),
(12,1),(12,5),(12,2),
(13,1),(13,5),(13,2),
(14,1),
(15,6),
(16,5),
(17,5);
/*!40000 ALTER TABLE `package_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `idpackage` int NOT NULL,
  `daynumber` int NOT NULL,
  `price` float DEFAULT '0',
  PRIMARY KEY (`idpackage`,`daynumber`),
  KEY `fk_price_package1_idx` (`idpackage`),
  CONSTRAINT `fk_price_package1` FOREIGN KEY (`idpackage`) REFERENCES `package` (`idpackage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
insert into price(idpackage,daynumber,price) values
(1,1,50),(1,2,85),(1,3,100),(1,4,115),(1,5,125),(1,6,130),(1,7,135),
(2,1,50),(2,2,85),(2,3,100),(2,4,115),(2,5,125),(2,6,130),(2,7,135),
(3,1,93),(3,2,17),(3,3,74),(3,4,37),(3,5,52),(3,6,96),(3,7,7),
(4,1,39),(4,2,2),(4,3,79),(4,4,5),(4,5,71),(4,6,47),(4,7,72),
(5,1,19),(5,2,42),(5,3,77),(5,4,45),(5,5,73),(5,6,23),(5,7,71),
(6,1,70),(6,2,73),(6,3,81),(6,4,13),(6,5,26),(6,6,22),(6,7,35),
(7,1,89),(7,2,16),(7,3,71),(7,4,19),(7,5,44),(7,6,97),(7,7,83),
(8,1,8),(8,2,1),(8,3,37),(8,4,96),(8,5,58),(8,6,86),(8,7,16),
(9,1,59),(9,2,72),(9,3,53),(9,4,54),(9,5,90),(9,6,19),(9,7,89),
(10,1,15),(10,2,64),(10,3,41),(10,4,94),(10,5,95),(10,6,85),(10,7,64),
(11,1,31),(11,2,25),(11,3,6),(11,4,75),(11,5,3),(11,6,11),(11,7,46),
(12,1,99),(12,2,80),(12,3,34),(12,4,28),(12,5,30),(12,6,98),(12,7,81),
(13,1,31),(13,2,77),(13,3,76),(13,4,77),(13,5,91),(13,6,3),(13,7,63),
(14,1,68),(14,2,33),(14,3,53),(14,4,13),(14,5,88),(14,6,3),(14,7,21),
(15,1,43),(15,2,67),(15,3,28),(15,4,42),(15,5,48),(15,6,71),(15,7,34),
(16,1,99),(16,2,54),(16,3,23),(16,4,67),(16,5,92),(16,6,29),(16,7,90),
(17,1,15),(17,2,30),(17,3,60),(17,4,80),(17,5,90),(17,6,92),(17,7,68);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_group_pair`
--

DROP TABLE IF EXISTS `product_group_pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_group_pair` (
  `group_id` int NOT NULL,
  `products_id` int NOT NULL,
  PRIMARY KEY (`group_id`,`products_id`),
  KEY `fk_product_group_pair_group_of_product1_idx` (`group_id`),
  KEY `fk_product_group_pair_products1_idx` (`products_id`),
  CONSTRAINT `fk_group_of_product1` FOREIGN KEY (`group_id`) REFERENCES `group_of_product` (`group_id`),
  CONSTRAINT `fk_product1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_group_pair`
--

LOCK TABLES `product_group_pair` WRITE;
/*!40000 ALTER TABLE `product_group_pair` DISABLE KEYS */;
INSERT INTO `product_group_pair` VALUES (1,2);
/*!40000 ALTER TABLE `product_group_pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `idpackage` int NOT NULL default 1,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `items_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_products_package1_idx` (`idpackage`),
  CONSTRAINT `fk_products_package1` FOREIGN KEY (`idpackage`) REFERENCES `package` (`idpackage`)
) ENGINE=InnoDB AUTO_INCREMENT=499151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'helmet','stylehelmet1',250.00,NULL,NULL),(2,'helmet','stylehelmet2',350.00,NULL,NULL),(3,'glove','brandglove',80.00,NULL,5),(499150,'handlebar','titanbrand',90.00,3,5);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sessionKey` varchar(100) NOT NULL,
  `dateTime` datetime NOT NULL,
  `userId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId` (`userId`) USING BTREE,
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skilllevel`
--

DROP TABLE IF EXISTS `skilllevel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skilllevel` (
  `idskilllevel` int NOT NULL,
  `skilllevelcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idskilllevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skilllevel`
--

LOCK TABLES `skilllevel` WRITE;
/*!40000 ALTER TABLE `skilllevel` DISABLE KEYS */;
INSERT INTO `skilllevel` VALUES (1,'Beginner'),(2,'Intermediate'),(3,'Performance');
/*!40000 ALTER TABLE `skilllevel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `idtype` int NOT NULL,
  `typecol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtype`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
insert into type(idtype,typecol) values
(1,'Downhill'),(2,'XC Classic'),(3,'BC Touring'),(4,'XC Skate'),(5,'Backcountry Touring'),(6,'Snowboard');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group_pair`
--

DROP TABLE IF EXISTS `user_group_pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group_pair` (
  `users_id` bigint NOT NULL,
  `groups_of_user_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`groups_of_user_id`),
  KEY `fk_user_group_users1_idx` (`users_id`),
  KEY `fk_user_group_groups1_idx` (`groups_of_user_id`),
  CONSTRAINT `fk_user_group_groups1` FOREIGN KEY (`groups_of_user_id`) REFERENCES `groups_of_user` (`group_id`),
  CONSTRAINT `fk_user_group_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_pair`
--

LOCK TABLES `user_group_pair` WRITE;
/*!40000 ALTER TABLE `user_group_pair` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_group_pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'customer'),(2,'staff');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `foot_size` decimal(3,1) DEFAULT NULL,
  `organizationId` int DEFAULT NULL,
  `user_type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizationId` (`organizationId`) USING BTREE,
  KEY `fk_users_user_type1_idx` (`user_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Randy','0000',170.00,66.00,42.0,2,NULL),(4,'Andrea','0000',169.00,66.00,37.0,NULL,1),(5,'Ruby','0000',168.00,55.00,41.0,3,NULL),(6,'Kiet','0000',167.00,33.00,44.0,NULL,NULL),(7,'Kai','0000',165.00,78.00,38.0,4,1);
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

-- Dump completed on 2021-04-30 11:00:49
