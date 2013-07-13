-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июл 14 2013 г., 00:53
-- Версия сервера: 5.5.31
-- Версия PHP: 5.3.10-1ubuntu3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `webasyst_beta`
--

-- --------------------------------------------------------

--
-- Структура таблицы `menuShopSetting`
--

CREATE TABLE IF NOT EXISTS `menuShopSetting` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `setting` varchar(25) NOT NULL,
  `value` varchar(50) CHARACTER SET utf8 NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `menuShopSetting`
--

INSERT INTO `menuShopSetting` (`id`, `setting`, `value`) VALUES
(1, 'COLOR_DEFAULT', '#0011ff'),
(2, 'BOLD_DEFAULT', '1'),
(3, 'NAME_DEFAULT', 'Меню'),
(4, 'STYLE_FRONTEND', 'gray'),
(5, 'ORIENTATION', 'horizontal');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
