---
title: "Presentamos el soporte para SQL Server en Dory"
description: "Dory ahora admite Microsoft SQL Server, con exploracion de bases de datos, edicion SQL y analisis asistido por IA para equipos que trabajan con SQL Server."
---

# Presentamos el soporte para SQL Server en Dory

Dory ahora admite Microsoft SQL Server.

Si tu equipo guarda datos operativos, tablas de reporting, registros de clientes, datos financieros o logica interna de negocio en SQL Server, ahora puedes conectarlo a Dory y trabajar con esos datos desde el mismo espacio de trabajo moderno que ya usas para otras bases de datos.

Esta version no se limita a abrir una conexion. SQL Server ya funciona en todo el flujo de datos principal de Dory: crear una conexion, explorar bases de datos, revisar tablas y vistas, inspeccionar funciones y procedimientos, ejecutar T-SQL, previsualizar datos y usar asistencia de IA con contexto especifico de SQL Server.

## Por que importa el soporte para SQL Server

SQL Server sigue estando en el centro de muchos sistemas de produccion. A menudo sostiene partes del negocio de las que las personas dependen todos los dias: pedidos, facturacion, logistica, operaciones de ventas, herramientas internas, pipelines de reporting y aplicaciones empresariales.

Pero trabajar con datos de SQL Server todavia puede sentirse fragmentado. Se usa una herramienta para escribir SQL, otra para explorar esquemas, otra para compartir resultados y otra para hacer preguntas sobre los datos. Dory reune esos flujos de trabajo en un solo lugar.

Con soporte para SQL Server, Dory ayuda a los equipos a pasar de "primero tengo que encontrar el objeto correcto de la base de datos" a "puedo entender y consultar estos datos directamente".

## Que puedes hacer

### Conectarte a SQL Server

Puedes crear una conexion de SQL Server desde la pagina de conexiones de Dory usando el formulario de conexion estandar.

Dory admite los detalles de conexion que esperan los usuarios de SQL Server:

- Host y puerto, con `1433` como puerto predeterminado
- Seleccion de base de datos predeterminada
- Conexiones cifradas
- Opcion para confiar en el certificado en entornos que lo requieren
- URLs de conexion con estilo de SQL Server

Despues de guardar la conexion, aparece junto con tus otras fuentes de datos, con un icono dedicado de SQL Server para reconocerla facilmente en el espacio de trabajo.

### Explorar bases de datos, esquemas, tablas y vistas

Una vez conectado, SQL Server queda disponible en Dory Explorer.

Puedes explorar:

- Bases de datos
- Esquemas
- Tablas
- Vistas
- Funciones
- Procedimientos
- Secuencias

Esto facilita entender que existe dentro de una instancia de SQL Server antes de escribir una consulta. Puedes moverte por la estructura de la base de datos, inspeccionar objetos y encontrar el punto de partida correcto sin cambiar de herramienta.

### Inspeccionar detalles de tablas

Para las tablas de SQL Server, Dory puede mostrar detalles utiles a nivel de objeto, como:

- Columnas y tipos de datos
- Claves primarias
- Tamano de tabla
- Estimaciones de filas
- Indices
- Previsualizacion de tabla
- Definicion generada de la tabla

Esto da a analistas e ingenieros el contexto que necesitan antes de consultar datos de produccion. En lugar de adivinar que columnas existen o si una tabla es grande, puedes inspeccionar el objeto directamente.

### Explorar funciones y procedimientos

Las bases de datos SQL Server suelen contener logica de negocio importante en funciones y procedimientos almacenados. Dory ahora trata esos elementos como objetos de base de datos explorables.

Puedes abrir una funcion o un procedimiento y ver:

- Firma
- Parametros
- Tipo de retorno o columnas devueltas
- Definicion fuente
- Dependencias
- Objetos que dependen de el
- Una llamada de ejemplo

Tambien puedes copiar la llamada de ejemplo o abrirla en SQL Console. Esto es util cuando intentas entender logica heredada, auditar comportamiento de la base de datos o reutilizar de forma segura un procedimiento almacenado existente.

### Ejecutar T-SQL en SQL Console

SQL Console ahora entiende SQL Server como su propio dialecto SQL.

Eso significa que Dory puede manejar de forma mas natural la sintaxis especifica de SQL Server, incluidos los limites de filas con `TOP` y `OFFSET/FETCH` en lugar de `LIMIT`.

Esto importa porque SQL Server se parece lo suficiente a otras bases de datos SQL como para resultar familiar, pero tiene diferencias suficientes para que pequenos errores de sintaxis rompan un flujo de trabajo. Dory ahora trata SQL Server como SQL Server, no como una base de datos SQL generica.

### Usar asistencia de IA con contexto de SQL Server

La asistencia de IA de Dory ahora incluye instrucciones conscientes de SQL Server.

Cuando le pides a Dory que ayude a escribir o corregir una consulta, puede tener en cuenta las convenciones de SQL Server:

- Usar sintaxis T-SQL
- Usar `TOP` u `OFFSET/FETCH` para limites
- Usar vistas de catalogo de SQL Server e `INFORMATION_SCHEMA` cuando se necesita metadata
- Evitar sintaxis exclusiva de PostgreSQL o MySQL

Dory tambien pasa el contexto de errores SQL a Copilot cuando falla una consulta. En vez de ver solo que algo salio mal, el asistente puede usar el mensaje de error real de SQL Server para ayudar a revisar la consulta.

El resultado es un ciclo mas fluido: hacer una pregunta, ejecutar SQL, inspeccionar el resultado, corregir errores y continuar.

## Un mejor flujo de trabajo para equipos de SQL Server

El soporte para SQL Server hace que Dory sea mas util para equipos que trabajan con varios sistemas de bases de datos.

Para analistas, significa acceder mas rapido a los datos sin memorizar cada detalle del esquema.  
Para ingenieros, significa una forma mas clara de inspeccionar tablas, funciones, procedimientos y dependencias.  
Para equipos de operaciones y datos, significa que SQL Server puede convivir con Postgres, MySQL, DuckDB, ClickHouse, SQLite y datasets basados en archivos en un mismo espacio de trabajo.

El objetivo es simple: hacer que SQL Server se sienta nativo dentro de Dory.

## Como empezar

Para probarlo:

1. Abre Dory.
2. Ve a Connections.
3. Crea una nueva conexion de SQL Server.
4. Introduce host, puerto, credenciales y base de datos predeterminada.
5. Configura SSL si tu entorno lo requiere.
6. Prueba y guarda la conexion.
7. Abre Explorer o SQL Console para empezar a trabajar con tus datos.

Desde ahi, puedes explorar objetos de base de datos, previsualizar tablas, inspeccionar funciones y pedir a Dory que te ayude a escribir consultas T-SQL.

## Lo que sigue

El soporte para SQL Server es un paso hacia hacer de Dory un mejor espacio de trabajo para entornos de datos reales, donde los equipos rara vez usan una sola base de datos.

A medida que mas equipos conecten SQL Server a Dory, seguiremos mejorando la experiencia de exploracion de esquemas, asistencia para consultas, comprension de objetos de base de datos y flujos de trabajo entre bases de datos.

Si SQL Server forma parte de tu stack de datos, Dory ahora puede trabajar con el donde ya esta.
