-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 12:51 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `categoria_permiso`
--

CREATE TABLE `categoria_permiso` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria_permiso`
--

INSERT INTO `categoria_permiso` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Medico'),
(3, 'Secretaria');

-- --------------------------------------------------------

--
-- Table structure for table `ciudades`
--

CREATE TABLE `ciudades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo_postal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ciudades`
--

INSERT INTO `ciudades` (`id`, `nombre`, `codigo_postal`) VALUES
(1, 'Chivilcoy', 6620),
(2, 'Suipacha', 6612),
(3, 'Roque Perez', 7245),
(4, 'Moquehua', 6625),
(5, 'Alberti', 6634);

-- --------------------------------------------------------

--
-- Table structure for table `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `nombre_especialidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `especialidades`
--

INSERT INTO `especialidades` (`id`, `nombre_especialidad`) VALUES
(1, 'Oftalmología'),
(2, 'Neurocirugía'),
(3, 'Cardiología'),
(4, 'Ginecología'),
(5, 'Cirugía General'),
(6, 'Clínica Médica'),
(7, 'Nutrición');

-- --------------------------------------------------------

--
-- Table structure for table `estado_turno`
--

CREATE TABLE `estado_turno` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estado_turno`
--

INSERT INTO `estado_turno` (`id`, `nombre`) VALUES
(1, 'libre'),
(2, 'en proceso'),
(3, 'reservado'),
(4, 'completado'),
(5, 'cancelado');

-- --------------------------------------------------------

--
-- Table structure for table `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `nro_afiliado` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `edad` int(11) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `antecedentes_personales` varchar(255) NOT NULL,
  `medicacion_actual` varchar(255) NOT NULL,
  `examen_clinico` varchar(255) NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `tratamiento` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `id_ciudad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historia_clinica`
--

INSERT INTO `historia_clinica` (`id`, `fecha`, `id_paciente`, `nro_afiliado`, `sexo`, `fecha_de_nacimiento`, `edad`, `motivo`, `antecedentes_personales`, `medicacion_actual`, `examen_clinico`, `diagnostico`, `tratamiento`, `direccion`, `id_ciudad`) VALUES
(1, '2024-10-07 08:16:41', 1, '321654', 'Masculino', '2003-03-15', 21, 'Fondo de Ojos', 'Asesino Serial', 'ibuprofeno 600', 'Ninguno', 'Re loco', 'En espera.', 'Inmigrantes 447', 2),
(2, '2024-10-07 10:36:09', 2, '654654', 'Femenino', '2002-09-26', 22, 'Quiropraxia', 'Prófuga', 'Ninguna', 'Se resiste', 'En espera', 'Ninguno', 'Biedma 529', 1),
(3, '2024-10-07 16:01:47', 3, '321321', 'Masculino', '2001-01-18', 23, 'Resonancia', 'Prófugo', 'ibuprofeno 600', 'Ninguno', 'Re loco', 'En espera.', 'Av. Villarino 1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo') NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `horarios`
--

INSERT INTO `horarios` (`id`, `id_medico`, `dia_semana`, `hora_inicio`, `hora_fin`) VALUES
(1, 1, 'Lunes', '10:00:00', '12:00:00'),
(2, 1, 'Lunes', '16:00:00', '19:00:00'),
(3, 1, 'Martes', '10:00:00', '12:00:00'),
(4, 1, 'Martes', '17:00:00', '19:00:00'),
(5, 1, 'Miércoles', '10:00:00', '12:00:00'),
(6, 1, 'Miércoles', '17:00:00', '19:00:00'),
(7, 1, 'Jueves', '10:00:00', '12:00:00'),
(8, 1, 'Jueves', '17:00:00', '19:00:00'),
(9, 1, 'Viernes', '10:00:00', '12:00:00'),
(10, 1, 'Viernes', '17:00:00', '19:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicos`
--

INSERT INTO `medicos` (`id`, `id_usuario`, `id_especialidad`, `telefono`, `foto`, `descripcion`) VALUES
(1, 1, 1, '2346 656140', '/public\\uploads\\1727930283779.png', 'Oftalmología y Guardia Oftalmológica'),
(2, 2, 3, '2346 536788', '/public\\uploads\\1727403408752.png', 'Cardiología y Electrofisiología, Colocación de Marcapasos y Holter'),
(3, 3, 2, '2346 456140', '/public\\uploads\\1727403449216.png', 'Neurocirugía y Tratamiento del Dolor'),
(4, 4, 4, '2346 778354', '/public\\uploads\\1727930326844.png', 'Cirugía Ginecológica y Mastología, Cirugía Videolaparoscópica e Histeroscopia'),
(5, 5, 5, '2346 954140', '/public\\uploads\\1727403561703.png', 'Cirugía General'),
(6, 6, 6, '2346 656140', '/public\\uploads\\1727403588528.png', 'Clínica Médica'),
(7, 7, 7, '2346 656140', '/public\\uploads\\1727403607008.png', 'Nutrición');

-- --------------------------------------------------------

--
-- Table structure for table `medicos_obrassociales`
--

CREATE TABLE `medicos_obrassociales` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_obraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicos_obrassociales`
--

INSERT INTO `medicos_obrassociales` (`id`, `id_medico`, `id_obraSocial`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17),
(18, 1, 18),
(19, 1, 19),
(20, 1, 20),
(21, 1, 21),
(22, 1, 22),
(23, 1, 23),
(24, 1, 24),
(25, 1, 25),
(26, 2, 1),
(27, 2, 2),
(28, 2, 3),
(29, 2, 4),
(30, 2, 5),
(31, 2, 6),
(32, 2, 7),
(33, 2, 8),
(34, 2, 9),
(35, 2, 10),
(36, 2, 11),
(37, 2, 12),
(38, 2, 13),
(39, 2, 14),
(40, 2, 15),
(41, 2, 16),
(42, 2, 17),
(43, 2, 18),
(44, 2, 19),
(45, 2, 20),
(46, 2, 21),
(47, 2, 22),
(48, 2, 23),
(49, 2, 24),
(50, 2, 25),
(51, 3, 8),
(52, 3, 9),
(53, 3, 10),
(54, 3, 11),
(55, 3, 12),
(56, 3, 13),
(57, 3, 14),
(58, 3, 15),
(59, 3, 16),
(60, 3, 17),
(61, 3, 18),
(62, 3, 19),
(63, 3, 20),
(64, 3, 21),
(65, 3, 22),
(66, 3, 23),
(67, 3, 24),
(68, 3, 25),
(69, 4, 8),
(70, 4, 9),
(71, 4, 10),
(72, 4, 11),
(73, 4, 12),
(74, 4, 13),
(75, 4, 14),
(76, 4, 15),
(77, 4, 16),
(78, 4, 17),
(79, 4, 18),
(80, 4, 19),
(81, 4, 20),
(82, 4, 21),
(83, 4, 22),
(84, 4, 23),
(85, 4, 24),
(86, 4, 25),
(87, 5, 8),
(88, 5, 9),
(89, 5, 10),
(90, 5, 11),
(91, 5, 12),
(92, 5, 13),
(93, 5, 14),
(94, 5, 15),
(95, 5, 16),
(96, 5, 17),
(97, 5, 18),
(98, 5, 19),
(99, 5, 20),
(100, 5, 21),
(101, 5, 22),
(102, 5, 23),
(103, 5, 24),
(104, 5, 25),
(105, 7, 10),
(106, 7, 12),
(107, 7, 13),
(108, 7, 15),
(109, 7, 26),
(110, 7, 22),
(111, 7, 18),
(112, 7, 7),
(113, 7, 27),
(114, 7, 16),
(115, 6, 10);

-- --------------------------------------------------------

--
-- Table structure for table `medicos_practicas`
--

CREATE TABLE `medicos_practicas` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_practicas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicos_practicas`
--

INSERT INTO `medicos_practicas` (`id`, `id_medico`, `id_practicas`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 2, 4),
(5, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `obras_sociales`
--

CREATE TABLE `obras_sociales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `obras_sociales`
--

INSERT INTO `obras_sociales` (`id`, `nombre`) VALUES
(1, 'Jerárquicos Salud'),
(2, 'Poder Judicial'),
(3, 'La Pequeña Familia'),
(4, 'Sancor Salud'),
(5, 'Casa'),
(6, 'Ospepba'),
(7, 'Dasmi'),
(8, 'IOMA'),
(9, 'Osfatlyf'),
(10, 'OSDE'),
(11, 'OSPE'),
(12, 'Swiss Medical'),
(13, 'Galeno'),
(14, 'Medifé'),
(15, 'Centro Médico Pueyrredón'),
(16, 'OSPF'),
(17, 'Comei'),
(18, 'OSPIP'),
(19, 'OSPTV'),
(20, 'Colegio de Escribanos'),
(21, 'Ospegype'),
(22, 'AMEBPBA'),
(23, 'OSDOP'),
(24, 'OSSEG'),
(25, 'Ospedyc'),
(26, 'SIS'),
(27, 'Osalara'),
(28, 'Ninguna de las anteriores');

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `id_obrasocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `dni`, `email`, `telefono`, `id_obrasocial`) VALUES
(1, 'Junior Acuña', 44222538, 'junioracuna@gmail.com', '2324652338', 28),
(2, 'Camila Mazzaro', 44555666, 'camimazzaro@gmail.com', '2346668765', 8),
(3, 'Cande Quiroga', 44951258, 'candeq@gmail.com', '2346652338', 2),
(4, 'Giuliana Raschia', 45444123, 'giuraschia@gmail.com', '2346652338', 7);

-- --------------------------------------------------------

--
-- Table structure for table `practicas`
--

CREATE TABLE `practicas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `practicas`
--

INSERT INTO `practicas` (`id`, `nombre`) VALUES
(1, 'Práctica ej 1'),
(2, 'Práctica ej 2'),
(3, 'Práctica ej 3'),
(4, 'Práctica ej 4'),
(5, 'Práctica ej 5');

-- --------------------------------------------------------

--
-- Table structure for table `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `id_estadoTurno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `turnos`
--

INSERT INTO `turnos` (`id`, `id_medico`, `id_paciente`, `fecha_hora`, `id_estadoTurno`) VALUES
(5, 1, NULL, '2024-10-05 15:34:04', 1),
(6, 2, NULL, '2024-10-05 15:34:04', 1),
(7, 3, NULL, '2024-10-05 15:34:04', 1),
(8, 4, NULL, '2024-10-05 15:34:04', 1),
(9, 5, NULL, '2024-10-05 15:34:04', 1),
(10, 6, NULL, '2024-10-05 15:34:04', 1),
(11, 7, NULL, '2024-10-05 15:34:04', 1),
(12, 4, 2, '2024-10-12 09:30:00', 1),
(13, 1, 1, '2024-11-15 10:45:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_categoriaPermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `id_categoriaPermiso`) VALUES
(1, 'Esteban Mazzaro', 'mazzaroesteban@gmail.com', '$2b$10$HH.mUh3mOy4a0dkmoqjv7u6Ujl3vSadrp4iRAlSQBpzP9828x8IAG', 2),
(2, 'Gustavo Iralde', 'iraldegustavo@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(3, 'Julio Sosa', 'sosajulio@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(4, 'Rodrigo Zalabardo', 'zalabardorodrigo@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(5, 'Jorge Biffis', 'biffisjorge@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(6, 'Pablo Urga', 'urgapablo@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(7, 'Magdalena Bauschen', 'bauschenmagdalena@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 2),
(8, 'Junior Acuña', 'acuñajunior@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 1),
(9, 'Camila Mazzaro', 'camilamazzaro90@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 1),
(10, 'Giuliana Raschia', 'giulianaraschia@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 1),
(11, 'Candela Quiroga', 'candelaquiroga@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 1),
(12, 'Jane Doe', 'janedoe@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 3),
(13, 'Analía López', 'analíalopez@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 3),
(14, 'Luciana', 'luchyrodini@gmail.com', '$2b$10$zjt.Mnfti1FSKoxhgG986O/e7Uxb7MLoOoHPnqN04eZ9nBiI14MRO', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estado_turno`
--
ALTER TABLE `estado_turno`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_ciudad` (`id_ciudad`);

--
-- Indexes for table `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indexes for table `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indexes for table `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_obraSocial` (`id_obraSocial`);

--
-- Indexes for table `medicos_practicas`
--
ALTER TABLE `medicos_practicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_practicas` (`id_practicas`);

--
-- Indexes for table `obras_sociales`
--
ALTER TABLE `obras_sociales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obrasocial` (`id_obrasocial`);

--
-- Indexes for table `practicas`
--
ALTER TABLE `practicas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_estadoTurno` (`id_estadoTurno`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoriaPermiso` (`id_categoriaPermiso`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `obras_sociales`
--
ALTER TABLE `obras_sociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historia_clinica`
--
ALTER TABLE `historia_clinica`
  ADD CONSTRAINT `historia_clinica_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `historia_clinica_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`);

--
-- Constraints for table `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `medicos_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id`);

--
-- Constraints for table `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  ADD CONSTRAINT `medicos_obrassociales_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`),
  ADD CONSTRAINT `medicos_obrassociales_ibfk_2` FOREIGN KEY (`id_obraSocial`) REFERENCES `obras_sociales` (`id`);

--
-- Constraints for table `medicos_practicas`
--
ALTER TABLE `medicos_practicas`
  ADD CONSTRAINT `medicos_practicas_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`),
  ADD CONSTRAINT `medicos_practicas_ibfk_2` FOREIGN KEY (`id_practicas`) REFERENCES `practicas` (`id`);

--
-- Constraints for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_obrasocial`) REFERENCES `obras_sociales` (`id`);

--
-- Constraints for table `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`),
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`),
  ADD CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`id_estadoTurno`) REFERENCES `estado_turno` (`id`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_categoriaPermiso`) REFERENCES `categoria_permiso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
