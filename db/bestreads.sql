-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 15, 2020 at 04:45 AM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bestreads`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `s_provider` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `username`, `name`, `avatar`, `s_provider`) VALUES
(5, '40909549', 'AlirezaSoltaniNeshan', 'Alireza Soltani Neshan', 'https://avatars2.githubusercontent.com/u/40909549?v=4', ''),
(6, '117016481180181079438', 'Alireza Soltani Neshan', 'Alireza Soltani Neshan', 'https://lh3.googleusercontent.com/a-/AOh14GjJBqSlGSoL7dkCaWRH5d74-kQsko5dCsCPjI_ZpQ', 'google');

-- --------------------------------------------------------

--
-- Table structure for table `usersdidlike`
--

DROP TABLE IF EXISTS `usersdidlike`;
CREATE TABLE IF NOT EXISTS `usersdidlike` (
  `uid` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersdidlike`
--

INSERT INTO `usersdidlike` (`uid`, `title`) VALUES
('40909549', 'Middle Eastern'),
('40909549', 'Pizza'),
('40909549', 'Ramen'),
('117016481180181079438', 'Breakfast & Brunch'),
('117016481180181079438', 'Sushi Bars'),
('40909549', 'Korean');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
