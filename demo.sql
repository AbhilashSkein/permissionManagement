-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: signup_app
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdetails` (
  `userDetail_id` int NOT NULL AUTO_INCREMENT,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `reason` varchar(50) DEFAULT NULL,
  `user_Id` int DEFAULT NULL,
  PRIMARY KEY (`userDetail_id`),
  KEY `user_Id` (`user_Id`),
  CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,'09:00:00','10:00:00','2012-12-12','2012-12-12','false','2012-12-12','jajsas',1),(2,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','jajsas',1),(3,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','jajsas',1),(4,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','helo world',1),(5,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','helo world',1),(6,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','helo world',1),(7,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','helo world',1),(8,'09:00:00','10:00:00',NULL,NULL,NULL,'2012-12-12','helo world',1);
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_Id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_Id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'abhi@gmail.com','kajskajs','abhii','m'),(2,'abhsdadi@gmail.com','kajsdsskajs','abhii','m'),(3,'tony@gmail.com','cat','billy','kuttha'),(4,'abhisdfdgfsdfg@gmail.com','asasas','abhi','abhilashm'),(6,'abhilashtow@gmail.com','RjqKwwG8','abhi','abhilashm'),(7,'abhilashtow7@gmail.com','asasas','abhi','abhilashm'),(8,'abhilashtow77@gmail.com','asasas','abhi','abhilashm'),(9,'abhilashtow777@gmail.com','asasas','abhi','abhilashm'),(12,'abhilashtow7777@gmail.com','asasas','abhi','abhilashm'),(18,'shree@gmail.com','asasas','abhi','abhilashm'),(23,'shreee@gmail.com','asasas','abhi','abhilashm'),(24,'shreeejj@gmail.com','asasas','abhi','abhilashm');
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

-- Dump completed on 2023-09-20 14:38:25
