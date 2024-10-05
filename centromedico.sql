-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-10-2024 a las 00:23:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `centromedico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_permiso`
--

CREATE TABLE `categoria_permiso` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_permiso`
--

INSERT INTO `categoria_permiso` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Medico'),
(3, 'Secretaria'),
(4, 'Paciente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disponibilidad_medicos`
--

CREATE TABLE `disponibilidad_medicos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `dia_semana` varchar(255) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `minutos_turno` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `nombre_especialidad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidades`
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
-- Estructura de tabla para la tabla `estado_turno`
--

CREATE TABLE `estado_turno` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_turno`
--

INSERT INTO `estado_turno` (`id`, `nombre`) VALUES
(1, 'libre'),
(2, 'en proceso'),
(3, 'reservado'),
(4, 'completado'),
(5, 'cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia_clinica`
--

CREATE TABLE `historia_clinica` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `nro_afiliado` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `fecha_de_nacimiento` date NOT NULL,
  `edad` int(11) NOT NULL,
  `domicilio` varchar(255) NOT NULL,
  `id_turno` int(11) NOT NULL,
  `antecedentes_personales` varchar(255) NOT NULL,
  `medicacion_actual` varchar(255) NOT NULL,
  `examen_clinico` varchar(255) NOT NULL,
  `diagnostico` varchar(255) NOT NULL,
  `tratamiento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_medicoPracticas` int(11) NOT NULL,
  `id_horarios` int (11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
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
-- Estructura de tabla para la tabla `medicos_obrassociales`
--

CREATE TABLE `medicos_obrassociales` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_obraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos_obrassociales`
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
-- Estructura de tabla para la tabla `medicos_practicas`
--

CREATE TABLE `medicos_practicas` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_practicas` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos_practicas`
--

INSERT INTO `medicos_practicas` (`id`, `id_medico`, `id_practicas`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 2, 4),
(5, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras_sociales`
--

CREATE TABLE `obras_sociales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obras_sociales`
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
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `dni` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `id_obrasocial` int(11) NOT NULL,
  `id_historiaClinica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombre`, `dni`, `edad`, `email`, `telefono`, `id_obrasocial`) VALUES
(1, 'Junior Alexander', 94222538, 21, 'junioracuna@gmail.com', '2324652338', 28),
(2, 'Camila Mazzaro', 44555666, 22, 'camimazzaro@gmail.com', '23246687656', 8),
(3, 'agus', 11, 45, 'agus@gmail.com', '2324652338', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `practicas`
--

CREATE TABLE `practicas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `practicas`
--

INSERT INTO `practicas` (`id`, `nombre`) VALUES
(1, 'Práctica ej 1'),
(2, 'Práctica ej 2'),
(3, 'Práctica ej 3'),
(4, 'Práctica ej 4'),
(5, 'Práctica ej 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `id_estadoTurno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id`, `id_medico`, `id_paciente`, `fecha_hora`, `motivo`, `id_estadoTurno`) VALUES
(1, 1, 1, '0000-00-00 00:00:00', 'Dolor de pata', 4),
(2, 5, 2, '0000-00-00 00:00:00', 'Dolor de cabeza', 2),
(3, 3, 1, '0000-00-00 00:00:00', 'Malestar estomacal', 3),
(4, 7, 3, '0000-00-00 00:00:00', 'Mareos', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_categoriaPermiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `id_categoriaPermiso`) VALUES
(1, 'Esteban Mazzaro', 'mazzaroesteban@gmail.com', '1234', 2),
(2, 'Gustavo Iralde', 'iraldegustavo@gmail.com', '1234', 2),
(3, 'Julio Sosa', 'sosajulio@gmail.com', '1234', 2),
(4, 'Rodrigo Zalabardo', 'zalabardorodrigo@gmail.com', '1234', 2),
(5, 'Jorge Biffis', 'biffisjorge@gmail.com', '1234', 2),
(6, 'Pablo Urga', 'urgapablo@gmail.com', '1234', 2),
(7, 'Magdalena Bauschen', 'bauschenmagdalena@gmail.com', '1234', 2),
(8, 'Junior Acuña', 'acuñajunior@gmail.com', '1234', 1),
(9, 'Camila Mazzaro', 'camilamazzaro90@gmail.com', '1234', 1),
(10, 'Giuliana Raschia', 'giulianaraschia@gmail.com', '1234', 1),
(11, 'Candela Quiroga', 'candelaquiroga@gmail.com', '1234', 1),
(12, 'Jane Doe', 'janedoe@gmail.com', '1234', 3),
(13, 'Analía López', 'analíalopez@gmail.com', '1234', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `medicos_practicas`
--
ALTER TABLE `medicos_practicas`
ADD KEY `id_medico` (`id_medico`),
ADD KEY `id_practicas` (`id_practicas`);

--
-- Indices de la tabla `practicas`
--
ALTER TABLE `practicas`
ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `disponibilidad_medicos`
--
ALTER TABLE `disponibilidad_medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_turno`
--
ALTER TABLE `estado_turno`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_medicoPracticas` (`id_medicoPracticas`),
  ADD KEY `id_horarios` (`id_horarios`);

--
-- Indices de la tabla `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_obraSocial` (`id_obraSocial`);


--
-- Indices de la tabla `obras_sociales`
--
ALTER TABLE `obras_sociales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obrasocial` (`id_obrasocial`),
  ADD KEY `id_historiaClinica` (`id_historiaClinica`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_estadoTurno` (`id_estadoTurno`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoriaPermiso` (`id_categoriaPermiso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria_permiso`
--
ALTER TABLE `categoria_permiso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `disponibilidad_medicos`
--
ALTER TABLE `disponibilidad_medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT de la tabla `obras_sociales`
--
ALTER TABLE `obras_sociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `disponibilidad_medicos`
--
ALTER TABLE `disponibilidad_medicos`
  ADD CONSTRAINT `disponibilidad_medicos_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`);

--
-- Filtros para la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `medicos_ibfk_2` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id`);

--
-- Filtros para la tabla `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  ADD CONSTRAINT `medicos_obrassociales_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`),
  ADD CONSTRAINT `medicos_obrassociales_ibfk_2` FOREIGN KEY (`id_obraSocial`) REFERENCES `obras_sociales` (`id`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_obrasocial`) REFERENCES `obras_sociales` (`id`);

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`),
  ADD CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_categoriaPermiso`) REFERENCES `categoria_permiso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;