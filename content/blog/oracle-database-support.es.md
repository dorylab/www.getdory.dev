---
title: "Dory ya admite Oracle"
description: "Dory ya admite Oracle Database, para que los equipos puedan conectar Oracle, explorar objetos, ejecutar SQL de Oracle y usar asistencia de IA con contexto de Oracle en un solo espacio de trabajo."
---

# Dory ya admite Oracle

Dory ya puede conectarse a Oracle Database.

Si tu equipo guarda datos clave del negocio, datos financieros, datos de ERP, sistemas de pedidos, sistemas de reporting o aplicaciones empresariales de larga vida en Oracle, ahora puedes conectarlo directamente a Dory y trabajar con esos datos desde el mismo espacio de trabajo moderno.

Esta versión no se limita a añadir otro tipo de conexión. Oracle ya forma parte del flujo principal de Dory: crear conexiones, resolver servicios de Oracle, navegar por schemas, inspeccionar tablas y vistas, explorar funciones y procedimientos, previsualizar datos, ejecutar SQL de Oracle y usar asistencia de IA con contexto específico de Oracle.

## Por qué importa el soporte para Oracle

Oracle sigue siendo una base de datos crítica para muchos sistemas empresariales. A menudo contiene datos de producción que llevan años funcionando de forma estable, y suele estar ligado a finanzas, cadena de suministro, gestión de clientes, operaciones internas, informes de auditoría y otros flujos de alto valor.

Pero trabajar con Oracle no siempre es ligero. Los analistas necesitan entender service names, schemas, mayúsculas y minúsculas en identificadores, y vistas del catálogo del sistema. Los ingenieros necesitan revisar tablas, vistas, índices, claves primarias, secuencias y procedimientos almacenados. Cuando una consulta falla, las diferencias del dialecto SQL de Oracle también importan.

Con soporte para Oracle, Dory lleva ese contexto a un espacio de trabajo unificado. No necesitas cambiar entre herramientas solo para encontrar el objeto correcto, ni tratar Oracle como una fuente SQL genérica y adivinar la sintaxis.

## Qué puedes hacer

### Conectarte a Oracle

Puedes crear una conexión de Oracle desde la página Connections de Dory.

Dory admite los datos de conexión que los usuarios de Oracle esperan:

- Host y puerto, con `1521` como puerto predeterminado
- Oracle service name, por ejemplo `ORCLPDB1`
- Entrada de host con estilo Easy Connect, como `oracle://db.example.com:1521/ORCLPDB1`
- Connect String opcional para configuraciones de listener o despliegues más complejos
- Usuario, contraseña y el flujo existente de Dory para probar y guardar conexiones

Después de guardar la conexión, Oracle aparece junto a tus otras fuentes de datos. Dory lo reconoce como un tipo de base de datos dedicado, no como si fuera Postgres, MySQL o SQL Server.

### Navegar por schemas, tablas, vistas, funciones y secuencias

Una vez conectado, Oracle queda disponible en Dory Explorer y en la barra lateral de SQL Console.

Puedes navegar por:

- Schemas
- Tables
- Views
- Functions
- Procedures
- Sequences

Dory filtra schemas comunes del sistema de Oracle para mantener el foco en los objetos de negocio mantenidos por usuarios. En una base de datos con muchas capas de objetos e historial acumulado, esto importa: al abrir una conexión deberías ver los datos con los que puedes trabajar, no perderlos entre objetos del sistema.

La barra lateral de SQL Console también prioriza el schema que coincide con la identidad de la conexión actual, para que llegues antes al contexto correcto de consulta.

### Inspeccionar detalles de tablas

Para tablas y vistas de Oracle, Dory puede mostrar información útil a nivel de objeto:

- Columnas y tipos de datos
- Expresiones por defecto
- Comentarios de columnas
- Claves primarias
- Comentarios de tabla o vista
- Tamaño de tabla y estimaciones de filas
- Índices
- Vista previa de datos
- DDL de tabla o vista

Esto te da el contexto necesario antes de escribir SQL. Puedes confirmar tipos de columna, claves primarias, índices y escala de la tabla antes de decidir cómo consultarla, en lugar de lanzar una consulta grande solo para descubrir su estructura.

Para la vista previa de datos, Dory usa la sintaxis de Oracle `FETCH FIRST n ROWS ONLY` y `OFFSET ... FETCH NEXT ...`, no el `LIMIT` de otras bases de datos.

### Explorar funciones y procedimientos

Muchas bases de datos Oracle guardan lógica de negocio importante en funciones y procedimientos almacenados. Dory ahora trata estos objetos como recursos explorables de la base de datos.

Al abrir una función o procedimiento, puedes ver:

- Schema propietario
- Tipo de objeto
- Parámetros
- Dirección de los parámetros
- Fechas de creación y modificación
- SQL de llamada de ejemplo

Para procedimientos, Dory genera una llamada de ejemplo con estilo `BEGIN ... END;`. Para funciones, genera una llamada de ejemplo desde `dual`. Estos detalles ayudan a entender la lógica existente y reducen el ensayo y error al invocarla.

### Ejecutar SQL de Oracle en SQL Console

SQL Console ahora trata Oracle como un dialecto SQL propio.

Esto permite que Dory maneje de forma más natural la sintaxis de Oracle, por ejemplo:

- Usar `FETCH FIRST n ROWS ONLY` o `ROWNUM` para limitar filas
- Evitar `LIMIT` en consultas de Oracle
- Admitir parámetros con nombre al estilo Oracle
- Usar `dual` cuando Oracle requiere una fuente de una sola fila
- Respetar las reglas de mayúsculas, minúsculas y comillas de identificadores de Oracle

Oracle y otras bases relacionales usan SQL, pero pequeñas diferencias de dialecto bastan para romper una consulta. Dory ahora trata Oracle como Oracle, no como una plantilla SQL genérica simplificada.

### Usar asistencia de IA con contexto de Oracle

La asistencia de IA de Dory ahora entiende las convenciones de consulta de Oracle.

Cuando pides a Dory que genere SQL, corrija SQL o explique una consulta, puede aplicar reglas específicas de Oracle:

- Usar sintaxis SQL de Oracle
- Usar `FETCH FIRST n ROWS ONLY` o `ROWNUM` para limitar resultados
- Preferir vistas de catálogo `ALL_*` y `USER_*` cuando se necesita metadata
- Consultar `dual` solo cuando Oracle requiere una fuente de una sola fila
- Evitar sintaxis específica de PostgreSQL, SQL Server y MySQL

Esto es clave en flujos reales. La IA no debería generar `LIMIT` para usuarios de Oracle, ni usar `pg_catalog` de PostgreSQL o vistas `sys` de SQL Server para inspeccionar metadata de Oracle.

## Un mejor espacio de trabajo para bases de datos empresariales

El soporte para Oracle hace que Dory encaje mejor en entornos reales con varias bases de datos.

Muchos equipos no usan una sola base de datos. Los sistemas de producción pueden estar en Oracle, los servicios analíticos en Postgres o ClickHouse, las herramientas internas en MySQL o SQL Server, y el análisis local puede depender de DuckDB, SQLite o datos en archivos.

Para analistas, esto significa encontrar datos de negocio en Oracle y empezar a analizarlos más rápido.  
Para ingenieros, significa ver con más claridad schemas, tablas, vistas, índices, funciones y procedimientos.  
Para equipos de datos y operaciones, significa que Oracle puede vivir en el mismo espacio de trabajo que las demás fuentes de datos.

El objetivo de Dory no es aplanar todas las bases de datos en una misma experiencia. Es respetar el comportamiento de cada base de datos dentro de un espacio de trabajo unificado.

## Cómo empezar

Puedes probarlo con estos pasos:

1. Abre Dory.
2. Ve a Connections.
3. Crea una nueva conexión de Oracle.
4. Introduce host, puerto, usuario, contraseña y service name.
5. Añade un Connect String si tu entorno lo necesita.
6. Prueba y guarda la conexión.
7. Abre Explorer o SQL Console y empieza a navegar o consultar datos de Oracle.

A partir de ahí, puedes navegar por schemas, inspeccionar tablas y vistas, previsualizar datos, explorar funciones y procedimientos, y pedir a Dory que te ayude a escribir o corregir SQL de Oracle.

## Qué viene después

El soporte para Oracle es un paso importante para que Dory cubra entornos reales de datos empresariales.

Seguiremos mejorando la exploración de schemas, la asistencia para consultas, la comprensión de objetos de base de datos y los flujos entre distintas fuentes para que los equipos puedan trabajar mejor con sistemas de datos complejos.

Si Oracle forma parte de tu stack de datos, Dory ya puede trabajar con él.
