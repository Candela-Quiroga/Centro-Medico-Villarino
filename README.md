# Centro-Medico-Villarino
-Enunciado-
El Centro Médico Villarino necesita desarrollar una página web que permita a los pacientes gestionar de manera eficiente su atención médica. Esta plataforma deberá incluir las siguientes funcionalidades:
• Reserva de turnos online: Los pacientes podrán seleccionar y reservar citas con los médicos del centro de forma sencilla e intuitiva.
• Consulta de información: Acceso a información detallada sobre los servicios que ofrece el centro, así como los perfiles de los profesionales y detalles sobre las instalaciones.
• Secciones interactivas: La página contará con un carrusel de fotos, un blog con noticias de salud, testimonios de pacientes y un formulario de contacto.

El personal administrativo, específicamente las secretarias, será responsable de gestionar la disponibilidad de turnos y mantener actualizada la información de los profesionales.
Por su parte, los médicos del consultorio tendrán acceso a una ficha médica colaborativa, compartida entre los profesionales del centro. Esta ficha contendrá el historial clínico del paciente, segmentado por áreas de atención, lo que facilitará el seguimiento integral de su salud. Además, los pacientes tendrán derecho a solicitar este historial en caso de ser requerido por un médico externo al centro.
La plataforma también permitirá que los médicos coordinen sus horarios junto con las secretarias, optimizando la gestión del consultorio.

Objetivos principales:
Facilitar la reserva de turnos para los pacientes de manera intuitiva.
Proporcionar a los profesionales del centro acceso al historial clínico de los pacientes para mejorar la atención.
Optimizar la organización del consultorio, brindando una experiencia cómoda tanto para los pacientes como para el personal y los profesionales.
Garantizar la seguridad y confidencialidad de la información manejada por el centro.
-----
- Roles y Permisos -
Secretarias
Permisos:
Gestión de Turnos: Pueden visualizar, añadir, modificar y cancelar turnos en el sistema. Esto incluye gestionar la disponibilidad de los médicos.
Acceso a Información de Pacientes: Pueden acceder a los datos de contacto y detalles relevantes de las citas, pero no al historial médico completo del paciente (solo acceso a información necesaria para la gestión de citas).
Actualización de Perfiles de Médicos: Pueden actualizar o modificar información no sensible sobre los médicos (por ejemplo, horarios de atención y especialidades).
Gestión de Mensajes: Acceso al formulario de contacto y a la comunicación con los pacientes (responder consultas y solicitudes).
Restricciones:
Sin Acceso a Historial Clínico: No pueden acceder ni modificar las fichas médicas de los pacientes.
Sin Permisos de Administración Técnica: No pueden realizar cambios en la configuración técnica del sitio ni en la seguridad.

Médicos
Permisos:
Acceso Completo a Fichas Médicas: Pueden ver y editar la ficha médica colaborativa del paciente en su área de atención. Esto incluye agregar notas, actualizar diagnósticos y tratamientos, y revisar el historial completo.
Gestión de Horarios: Pueden modificar su propia disponibilidad de horarios en coordinación con las secretarias.
Acceso a Información de Pacientes: Pueden visualizar la información general y de contacto de sus pacientes, así como la información relevante para su atención médica.
Consulta de Turnos: Pueden ver la lista de sus citas programadas y la información relacionada con los turnos.
Restricciones:
Sin Permisos para Modificar Turnos de Otros Médicos: No pueden gestionar ni modificar los turnos de otros médicos.
Sin Permisos Administrativos: No tienen acceso para modificar la configuración técnica del sitio ni para gestionar contenidos no médicos.

Administrador Técnico (externo o asignado)
Permisos:
Acceso Completo a la Configuración del Sistema: Puede gestionar la infraestructura técnica, como servidores, bases de datos, y aspectos de seguridad.
Gestión de Usuarios y Permisos: Puede crear, modificar y eliminar cuentas de usuarios, así como asignar roles y permisos.
Monitoreo de Seguridad: Tiene acceso para implementar y monitorear medidas de seguridad, así como responder a posibles amenazas.
Restricciones:
Sin Acceso a Datos Médicos de Pacientes: No tiene acceso directo a la información médica de los pacientes, excepto cuando sea necesario para solucionar problemas técnicos relacionados con los datos.

