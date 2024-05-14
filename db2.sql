/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `items_user_id_foreign` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `items` (`id`, `uuid`, `name`, `description`, `status`, `image`, `category`, `user_id`, `created_at`, `updated_at`) VALUES
	(22, 'b7e71d3f-7709-4f4f-97d9-cfe24085c6c9', 'Laptop', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare accumsan urna sollicitudin efficitur. Etiam porta, ante at dignissim placerat, velit massa rhoncus felis, non rutrum nulla libero id dolor. Donec sed turpis sed orci ultricies venenatis sit amet in diam. Vivamus et tempus nunc. Quisque lacinia faucibus dui sit amet dignissim. Sed dapibus ac felis in congue. Praesent accumsan ligula eget vulputate elementum. Donec convallis tellus ac justo varius, sed laoreet sapien molestie.', 'Active', '1715159595578-laptop.jpeg', 'Electronics', 3, '2024-05-08 09:13:15', '2024-05-08 09:13:15'),
	(23, '27b1511a-4e5c-4233-b3d8-755acae8fe88', 'TEST 1', 'TEST 1', 'Lost', '1715623177473-camera.jpeg', 'Clothing and Accessories', 7, '2024-05-13 17:59:37', '2024-05-13 18:00:26'),
	(24, '7a52429c-c0f8-4307-9f3e-30c63aee1e9f', 'TEST 2', 'TEST 2', 'Active', '1715623189822-laptop.jpeg', 'Sports Equipment', 7, '2024-05-13 17:59:49', '2024-05-13 17:59:49'),
	(25, '3e6b550d-fb6a-425e-b066-a2e2a1614b30', 'TEST 3', 'TEST 3', 'Found', '1715623217887-wallet.jpeg', 'Home and Kitchen', 7, '2024-05-13 18:00:17', '2024-05-13 18:01:30');

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
	(2, 'Foulen Fouleni', 'foulen@mail.com', '$2b$10$/zz4lHe.sOMxIEmmgfTRMuHnpSELSFfYP./4GwTv.rEOB2BeOdJ4i', 'USER', '2024-05-06 23:59:48', '2024-05-06 23:59:48'),
	(3, 'Test User', 'test@test.com', '$2b$10$k9O63wUNAJgXcc7rsqr6LeakLuYJrQzUfrAzHPD5XKHM3xSVU4GHC', 'USER', '2024-05-07 03:08:08', '2024-05-07 03:08:08'),
	(4, 'Amna Kouki', 'amna@test.com', '$2b$10$cooL1NJoyflM4pJJ0HKg.OD2.1qUIAkVn4cos8gJQF.27LcUmLF1C', 'USER', '2024-05-08 08:36:26', '2024-05-08 08:36:26'),
	(5, 'Oumaima Ouelahzi', 'adem@test.com', '$2b$10$0T38rp7ZPO8bQ6rf6wB1a.P/SR2YvxDnVhnCWVK9J1JhjvHz.VKpO', 'USER', '2024-05-08 08:37:51', '2024-05-08 08:37:51'),
	(6, 'Haifa Rajhi', 'haifa@test.com', '$2b$10$266VHBTAdTxfcBAZzB5RD./5nEgyd8V2mNbByWG78lTvdxFQRFd5m', 'USER', '2024-05-08 08:38:31', '2024-05-08 08:38:31'),
	(7, 'Foulena Fouleniya', 'foulena@test.com', '$2b$10$y/HpViH4MZMqCZjyWFkAm.nUYnjCdTfjoxD/cz11XUxEv3AcI88M.', 'USER', '2024-05-13 17:42:48', '2024-05-13 17:42:48');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
