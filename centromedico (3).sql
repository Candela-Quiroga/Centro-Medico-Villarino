-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2024 at 11:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `centromedico`
--

-- Table structure for table `categoria_permiso`

CREATE TABLE `categoria_permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `categoria_permiso`

INSERT INTO `categoria_permiso` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Medico'),
(3, 'Secretaria'),
(4, 'Paciente');

-- Table structure for table `disponibilidad_medicos`

CREATE TABLE `disponibilidad_medicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL,
  `dia_semana` varchar(255) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `minutos_turno` time NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`id_medico`) REFERENCES `medicos`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `especialidades`

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_especialidad` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `especialidades`

INSERT INTO `especialidades` (`id`, `nombre_especialidad`) VALUES
(1, 'oftalmología'),
(2, 'neurocirugia'),
(3, 'cardiologia'),
(4, 'ginecologia'),
(5, 'Cirugía general'),
(6, 'Clínica médica'),
(7, 'Nutrición');

-- Table structure for table `medicos`

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id`),
  FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `medicos_obrassociales`

CREATE TABLE `medicos_obrassociales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL,
  `id_obraSocial` int(11) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`d_medico`) REFERENCES `medicos`(`id`),
  FOREIGN KEY (`id_obraSocial`) REFERENCES `obras_Sociales`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `obras_sociales`

CREATE TABLE `obras_sociales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `obras_sociales`

INSERT INTO `obras_sociales` (`id`, `nombre`) VALUES
(4, 'Avalian'),
(10, 'Galeno'),
(5, 'IOMA'),
(7, 'OSALARA'),
(2, 'OSDE'),
(8, 'OSMATA'),
(1, 'OSPE'),
(6, 'PAMI'),
(9, 'Sancor Salud'),
(3, 'SWISS Medical');

-- Table structure for table `pacientes`

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `id_obrasocial` int(11) NOT NULL,
  `nro_afiliado` int(255) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`id_obraSocial`) REFERENCES `obras_Sociales`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `turnos`

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`id_medico`) REFERENCES `medicos`(`id`),
  FOREIGN KEY (`id_paciente`) REFERENCES `pacientes`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `usuarios`

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_categoriaPermiso` int(11) NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`id_categoriaPermiso`) REFERENCES `categoria_permiso`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `id_categoriaPermiso`) VALUES
(4, 'Esteban Mazzaro', 'mazzaroesteban@gmail.com', '', 2),
(5, 'Gustavo Iralde', 'iraldegustavo@gmail.com', '', 2),
(6, 'Julio Sosa', 'sosajulio@gmail.com', '', 2),
(7, 'Rodrigo Zalabardo', 'zalabardorodrigo@gmail.com', '', 2),
(8, 'Jorge Biffis', 'biffisjorge@gmail.com', '', 2),
(9, 'Pablo Urga', 'urgapablo@gmail.com', '', 2),
(10, 'Magdalena Bauschen', 'bauschenmagdalena@gmail.com', '', 2),
(11, 'Junior Acuña', 'acuñajunior@gmail.com', '', 1),
(12, 'Camila Mazzaro', 'mazzarocamila@gmail.com', '', 3),
(13, 'Agustin Carrasco', 'carrascoagustin@gmail.com', '', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
