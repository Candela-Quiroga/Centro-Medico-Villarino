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

--
-- Estructura de tabla para la tabla `disponibilidad_medicos`
--

CREATE TABLE `disponibilidad_medicos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `dia_semana` varchar(255) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `minutos_turno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'oftalmología'),
(2, 'neurocirugia'),
(3, 'cardiologia'),
(4, 'ginecologia'),
(5, 'Cirugía general'),
(6, 'Clínica médica'),
(7, 'Nutrición');

--
-- Estructura de tabla para la tabla `medicos`
--

CREATE TABLE `medicos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `telefono` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicos`
--

INSERT INTO `medicos` (`id`, `id_usuario`, `id_especialidad`, `telefono`) VALUES
(1, 4, 1, '234600000'),
(2, 5, 3, '234600000'),
(3, 6, 2, '234600000'),
(4, 7, 4, '234600000'),
(5, 8, 5, '234600000'),
(6, 9, 6, '234600000'),
(7, 10, 7, '234600000');

--
-- Estructura de tabla para la tabla `medicos_obrassociales`
--

CREATE TABLE `medicos_obrassociales` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_obraSocial` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'OSPE'),
(2, 'OSDE'),
(3, 'SWISS Medical'),
(4, 'Avalian'),
(5, 'IOMA'),
(6, 'PAMI'),
(7, 'OSALARA'),
(8, 'OSMATA'),
(9, 'Sancor Salud'),
(10, 'Galeno'),
(11, 'Jerárquicos Salud'),
(12, 'Poder Judicial'),
(13, 'La Pequeña Familia'),
(14, 'Casa'),
(15, 'Ospepba'),
(16, 'Dasmi'),
(17, 'Osfatlyf'),
(18, 'Medifé'),
(19, 'Centro Médico Pueyrredón'),
(20, 'OSPF'),
(21, 'Comei'),
(22, 'OSPIP'),
(23, 'OSPTV'),
(24, 'Colegio de Escribanos'),
(25, 'Ospegype'),
(26, 'AMEBPBA'),
(27, 'OSDOP'),
(28, 'OSSEG'),
(29, 'Ospedyc');

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `id_obraSocial` int(11) NOT NULL,
  `nro_afiliado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

--
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_especialidad` (`id_especialidad`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_obraSocial` (`id_obraSocial`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_medico` (`id_medico`),
  ADD KEY `id_paciente` (`id_paciente`);

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
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `medicos_obrassociales`
--
ALTER TABLE `medicos_obrassociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `obras_sociales`
--
ALTER TABLE `obras_sociales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`id_obraSocial`) REFERENCES `obras_sociales` (`id`);

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
