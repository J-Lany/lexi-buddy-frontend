import type { QaCategory } from './qa-data';

export const QA_DATA_ES: QaCategory[] = [
  {
    category: 'Primeros pasos',
    icon: '🚀',
    items: [
      {
        q: '¿Cómo me registro en Lexi Buddy?',
        a: 'Ve a https://lexi-buddy.com/ y regístrate con tu correo electrónico. Una vez registrado, llegarás al panel de alumnos y podrás empezar a añadirlos de inmediato.',
      },
      {
        q: '¿Mis alumnos necesitan hacer algo antes de que yo pueda añadirlos?',
        a: 'Sí — tu alumno debe primero encontrar el bot de Telegram de Lexi Buddy (@lexi_buddy_bot) e iniciarlo. Una vez que complete el registro allí, podrás encontrarlo por su nombre de usuario de Telegram en la sección «+ Añadir un alumno» y enviarle una invitación.',
      },
      {
        q: '¿Cómo es mi panel principal?',
        a: 'La barra lateral izquierda tiene cuatro secciones: Alumnos, Lecciones, Configuración y Preguntas frecuentes. Alumnos es tu página de inicio — muestra tu lista completa de alumnos con sus usuarios de Telegram, grupos y niveles de un vistazo.',
      },
    ],
  },
  {
    category: 'Gestión de alumnos',
    icon: '👩‍🎓',
    items: [
      {
        q: '¿Cómo añado a un nuevo alumno?',
        a: 'Haz clic en «+ Añadir un alumno» en la parte superior derecha de la página de Alumnos. Busca al alumno por su nombre de usuario de Telegram (escribe al menos 2 caracteres), opcionalmente escribe un mensaje personal y luego pulsa «Enviar solicitud». El alumno recibe una invitación en el bot y, una vez que la acepte, aparecerá en tu lista. NOTA: el alumno debe estar registrado en el bot de Telegram de Lexi Buddy (@lexi_buddy_bot) antes de que puedas encontrarlo.',
      },
      {
        q: '¿Puedo añadir a un alumno que todavía no ha iniciado el bot?',
        a: 'No. El alumno ya debe haber iniciado el bot de Telegram de Lexi Buddy (@lexi_buddy_bot). Pide a tu alumno que abra Telegram, busque el bot de Lexi Buddy y pulse Iniciar.',
      },
      {
        q: '¿Puedo cambiar el nombre visible de mi alumno?',
        a: 'Sí. Abre el perfil del alumno y haz clic en el icono de lápiz junto a su nombre. El nombre que establezcas solo es visible para ti — el alumno ve su propio nombre de Telegram en el bot.',
      },
      {
        q: '¿Qué información del perfil puedo editar para un alumno?',
        a: 'Puedes editar el nombre visible del alumno (solo para el profesor), su nivel de inglés (de A1 a C2) y su grupo de edad (Niño, Adolescente o Adulto). El usuario de Telegram y la foto se obtienen de Telegram y no se pueden cambiar.',
      },
      {
        q: '¿Qué me muestra la página del perfil del alumno?',
        a: 'El panel izquierdo «Acerca de» muestra el nivel, el grupo de edad, el usuario de Telegram y la última visita. El panel derecho «Actividad» muestra el total de lecciones asignadas, las tareas completadas vs. el total, la puntuación media, la fecha de última entrega y el porcentaje de progreso general. Debajo de ambos paneles hay una tabla con todas las lecciones asignadas a ese alumno.',
      },
      {
        q: '¿Puedo eliminar a un alumno de mi lista?',
        a: 'La eliminación de alumnos se gestiona a través de la configuración de tu cuenta. Si necesitas eliminar a un alumno, consulta la sección de Configuración o contacta con el soporte.',
      },
    ],
  },
  {
    category: 'Grupos',
    icon: '👥',
    items: [
      {
        q: '¿Cómo creo un grupo?',
        a: 'Ve a Alumnos → pestaña Grupos → haz clic en «+ Crear nuevo grupo». Aparece un modal de dos pasos. En el paso 1, introduce un título de grupo, selecciona un nivel y añade una descripción opcional. En el paso 2, elige qué alumnos añadir. Pulsa Siguiente para moverte entre los pasos.',
      },
      {
        q: '¿Por qué usar grupos en lugar de asignaciones individuales?',
        a: 'Los grupos ahorran tiempo cuando enseñas a varios alumnos del mismo nivel y quieres asignarles las mismas lecciones. Al asignar una lección a un grupo se notifica a todos los alumnos a la vez y puedes hacer un seguimiento de su progreso colectivamente.',
      },
      {
        q: '¿Un alumno puede pertenecer a más de un grupo?',
        a: 'Sí, un alumno puede pertenecer a varios grupos al mismo tiempo.',
      },
      {
        q: '¿Puedo editar un grupo después de crearlo?',
        a: 'Sí. Haz clic en el grupo desde la pestaña Grupos para abrirlo y actualizar el título, la descripción, el nivel o la lista de alumnos.',
      },
    ],
  },
  {
    category: 'Creación de lecciones',
    icon: '📚',
    items: [
      {
        q: '¿Cómo creo una nueva lección?',
        a: 'Ve a la página de Lecciones y haz clic en «+ Nueva lección». Seguirás un asistente de 4 pasos: (1) Detalles de la lección, (2) Vocabulario, (3) Tareas, (4) Asignar a alumnos o grupos.',
      },
      {
        q: '¿Qué completo en el paso de Detalles de la lección?',
        a: 'Introduce un nombre de lección, elige un nivel de idioma (A1–C2), selecciona un grupo de edad (Niño/Adolescente/Adulto) y escribe un tema o descripción de la fuente. Todos los campos (excepto el Nombre de la lección) ayudan a la IA a generar tareas contextualmente apropiadas.',
      },
      {
        q: '¿Cómo introduzco la lista de vocabulario?',
        a: 'En el paso 2 (Vocabulario), escribe tus palabras o frases separadas por puntos — por ejemplo: «boiled. scramble. meat. fried». Puedes introducir hasta 15 elementos. Luego haz clic en «Obtener traducciones y definiciones» y la IA genera una traducción y hasta 3 sinónimos para cada elemento.',
      },
      {
        q: '¿Puedo editar las traducciones y sinónimos generados por la IA?',
        a: 'Sí. Después de que la IA genere las tarjetas de vocabulario, todos los campos son editables — puedes cambiar el término, reescribir la traducción, editar sinónimos o eliminar sinónimos individuales con el botón ×. También puedes eliminar un término completo con el icono de papelera.',
      },
      {
        q: '¿Cuáles son los cuatro tipos de tareas?',
        a: 'Cuestionario de definición — los alumnos eligen el significado correcto entre 3 opciones. Rellenar espacios — los alumnos completan una frase con la palabra correcta. Error de frase — los alumnos identifican qué oración usa una palabra incorrectamente. Comprobación de colocaciones — los alumnos eligen la palabra que encaja correctamente en varias oraciones.',
      },
      {
        q: '¿Tengo que generar los cuatro tipos de tareas?',
        a: 'No. Puedes generar entre 1 y 4 tipos de tareas.',
      },
      {
        q: '¿Cómo genero las tareas?',
        a: 'En el paso 3 (Tareas), haz clic en «Generar» junto a cada tipo de tarea que quieras. La IA crea preguntas, opciones de respuesta y explicaciones. Haz clic en «Mostrar» para revisar el contenido. Haz clic en «Regenerar» en cualquier momento para obtener un nuevo conjunto.',
      },
      {
        q: '¿Puedo editar las tareas generadas?',
        a: 'Sí. Después de hacer clic en «Mostrar», cada campo de pregunta, opción de respuesta y explicación es totalmente editable directamente en el modal.',
      },
      {
        q: '¿Qué significa el número junto a un tipo de tarea?',
        a: 'Muestra cuántas preguntas se generaron para ese tipo de tarea (por ejemplo, «4» significa cuatro preguntas).',
      },
      {
        q: '¿Puedo guardar una lección sin asignarla?',
        a: 'Sí. En el paso 4, haz clic en «Omitir y terminar» para guardar la lección en tu biblioteca y asignarla más tarde.',
      },
      {
        q: '¿Cuántas palabras puedo añadir por lección?',
        a: 'Hasta 15 palabras o frases por lección.',
      },
    ],
  },
  {
    category: 'Asignación de lecciones',
    icon: '📬',
    items: [
      {
        q: '¿Cómo asigno una lección?',
        a: 'En el paso 4 de la creación de la lección, o desde la página de detalle de la lección usando el botón «Asignar», selecciona alumnos individuales del panel izquierdo y/o grupos del panel derecho. Los alumnos seleccionados recibirán inmediatamente una notificación en Telegram.',
      },
      {
        q: '¿Puedo asignar a alumnos y grupos al mismo tiempo?',
        a: 'Sí. La pantalla de asignación muestra Alumnos y Grupos uno al lado del otro — puedes seleccionar cualquier combinación.',
      },
      {
        q: '¿Qué ocurre después de asignar una lección?',
        a: 'Cada alumno asignado recibe una notificación del bot de Telegram indicándole que hay una nueva lección lista. Pueden abrirla y completar todas las tareas interactivas directamente en Telegram.',
      },
      {
        q: '¿Puedo asignar una lección a más personas después de haberla creado?',
        a: 'Sí. Abre la lección desde tu lista de Lecciones y haz clic en el botón «Asignar» en la página de detalle de la lección para añadir más alumnos o grupos en cualquier momento.',
      },
    ],
  },
  {
    category: 'Seguimiento del progreso',
    icon: '📊',
    items: [
      {
        q: '¿Dónde puedo ver cómo le va a un alumno en general?',
        a: 'Abre el perfil del alumno desde la lista de Alumnos. El panel «Actividad» muestra el total de lecciones, las tareas completadas vs. el total, la puntuación media, la fecha de última entrega y un porcentaje de progreso general.',
      },
      {
        q: '¿Dónde puedo ver el progreso de una lección específica?',
        a: 'Abre la lección desde la lista de Lecciones. La sección Asignados muestra a todos los alumnos con una etiqueta de estado: No iniciado, En progreso o Completado. Haz clic en la fila de un alumno para ver sus resultados por tipo de tarea.',
      },
      {
        q: '¿Qué muestra la página de resultados de la lección por alumno?',
        a: 'Muestra el total de tareas realizadas, la puntuación media y la marca de tiempo de la última actividad. Los resultados están desglosados por tipo de tarea (Cuestionario de definición, Rellenar espacios, Error de frase, Comprobación de colocaciones) — cambia entre pestañas para ver el historial de intentos de cada uno.',
      },
      {
        q: '¿Qué significan las etiquetas de estado?',
        a: '«No iniciado» — el alumno todavía no ha abierto la lección. «En progreso» — ha completado al menos un tipo de tarea. «Completado» — se han intentado todos los tipos de tareas asignados.',
      },
      {
        q: '¿Qué significa el porcentaje de progreso en el perfil de un alumno?',
        a: 'Refleja la proporción de todas las tareas asignadas que el alumno ha completado en todas sus lecciones.',
      },
    ],
  },
  {
    category: 'El bot de Telegram',
    icon: '🤖',
    items: [
      {
        q: '¿Qué hace el bot de Telegram para los alumnos?',
        a: 'El bot es la parte de Lexi Buddy orientada al alumno. Los alumnos reciben allí las notificaciones de asignación de lecciones y completan los cuatro tipos de tareas de forma interactiva dentro de Telegram — sin necesidad de visitar un sitio web.',
      },
      {
        q: '¿Puedo usar el bot de Telegram como profesor?',
        a: 'El sitio web de la plataforma es la herramienta principal para los profesores — la creación de lecciones, la gestión de alumnos y el seguimiento del progreso se realizan allí. El bot está diseñado principalmente para la experiencia del alumno.',
      },
      {
        q: '¿Qué pasa si un alumno cambia su nombre de usuario de Telegram?',
        a: 'Tendrás que volver a invitarle con su nuevo nombre de usuario. Contacta con el soporte si tienes problemas con los registros de alumnos existentes.',
      },
    ],
  },
  {
    category: 'Biblioteca de lecciones',
    icon: '🗂️',
    items: [
      {
        q: '¿Puedo reutilizar una lección para varios alumnos o clases?',
        a: 'Sí. Las lecciones permanecen en tu biblioteca de forma permanente. Abre cualquier lección y usa el botón «Asignar» para enviarla a nuevos alumnos o grupos cuando lo necesites.',
      },
      {
        q: '¿Puedo buscar una lección?',
        a: 'Sí. La página de Lecciones tiene una barra de búsqueda en la parte superior — escribe cualquier parte del nombre de la lección para filtrar tu lista.',
      },
      {
        q: '¿Puedo editar una lección después de haberla creado?',
        a: 'Puedes ver todo el vocabulario y las tareas desde la página de detalle de la lección. Para obtener capacidades de edición completas, consulta la sección de Configuración o contacta con el soporte.',
      },
    ],
  },
];
