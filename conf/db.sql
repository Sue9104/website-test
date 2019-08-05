-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: translate_01
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Create database `translate_01`
--
CREATE DATABASE IF NOT EXISTS translate_01 default charset utf8mb4 COLLATE utf8mb4_general_ci;
USE translate_01;

--
-- Table structure for table `advices`
--
DROP TABLE IF EXISTS `advices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_app_id` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `version_id` varchar(40) DEFAULT NULL,
  `objection` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `export_version`
--

DROP TABLE IF EXISTS `export_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `export_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_appove_id` int(11) NOT NULL,
  `version_id` varchar(40) COLLATE utf8_bin NOT NULL,
  `product_id` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `user_name` varchar(20) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `import_log`
--

DROP TABLE IF EXISTS `import_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `import_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `nums` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lang_code`
--

DROP TABLE IF EXISTS `lang_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lang_code` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `language` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(100) DEFAULT NULL,
  `users_name` varchar(255) DEFAULT NULL,
  `lang` varchar(80) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `field_num` int(2) DEFAULT NULL,
  `import_head` longtext,
  `attribute` varchar(15) DEFAULT NULL,
  `priority` tinyint(1) DEFAULT '2',
  `translate_users` varchar(255) DEFAULT NULL,
  `approve_users` varchar(255) DEFAULT NULL,
  `viewed_users` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `product_desc` longtext,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) DEFAULT NULL,
  `permission` varchar(30) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `translate_approve`
--

DROP TABLE IF EXISTS `translate_approve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translate_approve` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `translate_id` int(11) NOT NULL,
  `translate_job_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `translate` longtext,
  `status` varchar(20) DEFAULT NULL,
  `lang` varchar(80) DEFAULT NULL,
  `tips` varchar(255) DEFAULT NULL,
  `conflict` int(1) NOT NULL DEFAULT '0',
  `objection` varchar(255) DEFAULT NULL,
  `advise_user` varchar(20) DEFAULT NULL,
  `translate_users_name` varchar(20) DEFAULT NULL,
  `allocate_users_name` varchar(20) DEFAULT NULL,
  `approve_users_name` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `translate_in`
--

DROP TABLE IF EXISTS `translate_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translate_in` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_name` varchar(50) DEFAULT NULL,
  `product_id` varchar(11) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `translate` longtext,
  `rowid` int(11) DEFAULT NULL,
  `import_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`product_id`,`key`)
) ENGINE=InnoDB AUTO_INCREMENT=43312 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `translate_job`
--

DROP TABLE IF EXISTS `translate_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translate_job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `translate_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `translate` longtext,
  `status` varchar(20) DEFAULT NULL,
  `lang` varchar(80) DEFAULT NULL,
  `translate_users_name` varchar(50) DEFAULT NULL,
  `allocate_users_name` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=576 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` int(20) DEFAULT NULL,
  `status` int(2) DEFAULT '1',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idcard` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `role` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_name_unique` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version_id` varchar(40) COLLATE utf8_bin NOT NULL,
  `version_name` varchar(20) COLLATE utf8_bin NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-05  2:04:56
--
-- Dumping data for table `lang_code`
--

LOCK TABLES `lang_code` WRITE;
/*!40000 ALTER TABLE `lang_code` DISABLE KEYS */;
INSERT INTO `lang_code` VALUES (1,'af','Afrikaans'),(2,'sq','Albanian'),(3,'am','Amharic'),(4,'ar','Arabic'),(5,'hy','Armenian'),(6,'az','Azerbaijani'),(7,'eu','Basque'),(8,'be','Belarusian'),(9,'bn','Bengali'),(10,'bs','Bosnian'),(11,'bg','Bulgarian'),(12,'ca','Catalan'),(13,'ce','Cebuano'),(14,'ny','Chichewa'),(15,'zh-CN','Chinese'),(16,'co','Corsican'),(17,'hr','Croatian'),(18,'cs','Czech'),(19,'da','Danish'),(20,'nl','Dutch'),(21,'en','English'),(22,'eo','Esperanto'),(23,'et','Estonian'),(24,'fo','Faroese'),(25,'tl','Filipino'),(26,'fi','Finnish'),(27,'fr','French'),(28,'fy','Frisian'),(29,'gl','Galician'),(30,'ka','Georgian'),(31,'de','German'),(32,'el','Greek'),(33,'gu','Gujarati'),(34,'ht','Haitian Creole'),(35,'ha','Hausa'),(36,'haw','Hawaiian'),(37,'he','Hebrew'),(38,'hi','Hindi'),(39,'hmn','Hmong'),(40,'hu','Hungarian'),(41,'is','Icelandic'),(42,'ig','Igbo'),(43,'id','Indonesian'),(44,'ga','Irish'),(45,'it','Italian'),(46,'ja','Japanese'),(47,'jv','Javanese'),(48,'kn','Kannada'),(49,'kk','Kazakh'),(50,'km','khmer'),(51,'ko','Korean'),(52,'ku','Kurdish'),(53,'ky','Kyrgyz'),(54,'lo','Lao'),(55,'la','Latin'),(56,'lv','Latvian'),(57,'lt','Lithuanian'),(58,'lb','Luxembourgish'),(59,'mk','Macedonian'),(60,'mg','Malagasy'),(61,'ms','Malay'),(62,'ml','Malayalam'),(63,'mt','Maltese'),(64,'mi','Maori'),(65,'mr','Marathi'),(66,'mn','Mongolian'),(67,'my','Myanmar'),(68,'ne','Nepali'),(69,'no','Norwegian'),(70,'ps','Pashto'),(71,'fa','Persian'),(72,'pl','Polish'),(73,'pt','Portuguese'),(74,'pa','Punjabi'),(75,'ro','Romanian'),(76,'ru','Russian'),(77,'sm','Samoan'),(78,'gd','Scots Gaelic'),(79,'sr','Serbian'),(80,'st','Sesotho'),(81,'sn','Shona'),(82,'sd','Sindhi'),(83,'si','Sinhala'),(84,'sk','Slovak'),(85,'sl','Slovenian'),(86,'so','Somali'),(87,'es','Spanish'),(88,'su','Sundanese'),(89,'sw','Swahili'),(90,'sv','Swedish'),(91,'tg','Tajik'),(92,'ta','Tamil'),(93,'te','Telugu'),(94,'th','Thai'),(95,'tr','Turkish'),(96,'uk','Ukrainian'),(97,'uz','Uzbek'),(98,'vi','Vietnamese'),(99,'cy','Welsh'),(100,'xh','Xhosa'),(101,'yi','Yiddish'),(102,'yo','Yoruba'),(103,'zu','Zulu');
/*!40000 ALTER TABLE `lang_code` ENABLE KEYS */;
UNLOCK TABLES;

-- insert administator root/123456

LOCK TABLES `users` WRITE;
INSERT INTO users (name, email, password, created_at, role) VALUES ('root', 'root', '$2y$10$5WV.eTXqNXzDIOtZkwak6eKgcmeOTJyhTePCDyv5Cf6Y8MBZJdaku', now(), 2);
UNLOCK TABLES;
