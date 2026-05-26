---
title: "Dory presenta BYOK de IA a nivel de organizacion"
description: "Dory ahora admite BYOK de IA a nivel de organizacion, para que los equipos puedan elegir su propio proveedor, modelo y endpoint manteniendo un proveedor del sistema como fallback."
category: "AI Providers"
ogVariant: "ai-providers"
---

# Dory presenta BYOK de IA a nivel de organizacion

Dory ahora admite BYOK de IA a nivel de organizacion.

Los equipos pueden configurar un proveedor de IA para una organizacion concreta, elegir el modelo que quieren usar y enrutar los flujos de IA de Dory con sus propias credenciales de proveedor. El proveedor del sistema sigue disponible como fallback, de modo que los administradores pueden dar mas control a cada organizacion sin perder un valor predeterminado gestionado por el servidor.

Esto importa para equipos que usan Dory en distintos entornos, clientes, departamentos o limites de cumplimiento. Una organizacion puede querer OpenAI, otra puede usar Anthropic, otra puede enrutar por OpenRouter y otra puede apuntar Dory a un endpoint local compatible con OpenAI. Dory ahora puede representar eso a nivel de organizacion.

## Por que importa el BYOK a nivel de organizacion

La IA se esta convirtiendo en parte del flujo normal de trabajo con bases de datos. Las personas piden a la IA escribir SQL, corregir consultas fallidas, explicar esquemas, resumir resultados y ayudarles a pasar de una pregunta a una consulta util.

Pero la configuracion de IA rara vez sirve igual para todos.

Algunos equipos ya tienen cuentas de proveedor aprobadas. Otros tienen requisitos regionales. Otros pasan por un gateway interno. Otros quieren usar un modelo local o self-hosted detras de una API compatible con OpenAI. Incluso dentro del mismo workspace de Dory, distintas organizaciones pueden necesitar proveedores diferentes.

Antes del BYOK a nivel de organizacion, la configuracion de IA era principalmente gestionada por el servidor. Eso es util como valor predeterminado simple, pero es demasiado general para equipos que necesitan control por organizacion.

Ahora Dory admite un modelo mas claro:

- Un **System Provider** puede configurarse globalmente por el administrador del servidor.
- Un **Organization Provider** puede sobrescribir ese valor para una organizacion concreta.
- Un **Fallback** sigue visible cuando el proveedor de organizacion esta activo.

Esto da control donde hace falta, y conserva una base estable a nivel de sistema.

## Que puedes configurar

Los administradores de organizacion pueden agregar proveedores de IA desde la pagina de ajustes de IA.

Para cada proveedor de organizacion, Dory admite:

- Seleccion de proveedor
- Modelo predeterminado
- Base URL
- API key
- Prueba del proveedor antes de guardar
- Seleccion de proveedor predeterminado
- Flujos para habilitar, deshabilitar, editar y eliminar

El proveedor de organizacion solo pasa a estar activo cuando esta habilitado, configurado y permitido por el plan o licencia actual. Si el proveedor de organizacion esta deshabilitado, incompleto o no disponible para el entitlement actual, Dory vuelve al proveedor del sistema.

## Proveedores admitidos

El flujo BYOK de Dory a nivel de organizacion admite los proveedores que los equipos suelen pedir:

- OpenAI
- Anthropic
- Azure OpenAI
- OpenRouter
- Google Gemini
- Qwen
- xAI
- Meta
- OpenAI Compatible

La opcion OpenAI Compatible es importante para equipos que usan modelos locales, gateways internos o servicios de inferencia que exponen una API con estilo OpenAI. Para este proveedor, la Base URL es obligatoria y la API key puede ser opcional, segun el endpoint.

## Pensado para limites reales de equipo

El BYOK a nivel de organizacion esta disenado para workspaces con varias organizaciones.

En lugar de tratar la IA como un unico interruptor global, Dory ahora puede reflejar como operan realmente los equipos:

- Una organizacion orientada a clientes puede usar su proveedor aprobado.
- Un equipo de datos puede probar otro modelo sin cambiar todas las organizaciones.
- Un despliegue self-hosted puede conservar un proveedor del sistema y permitir que ciertas organizaciones lo sobrescriban.
- Un modelo local o privado puede conectarse mediante un endpoint compatible con OpenAI.

Esto resulta especialmente util cuando Dory es usado por equipos con presupuestos, politicas de datos, necesidades de latencia o preferencias de proveedor diferentes.

## Valores predeterminados mas seguros y fallbacks mas claros

El proveedor de organizacion es un override, no un reemplazo destructivo del proveedor del sistema.

Cuando el proveedor de organizacion esta activo, Dory sigue mostrando el proveedor del sistema como fallback. Si el proveedor de organizacion se deshabilita o deja de estar correctamente configurado, la ejecucion de IA puede volver al proveedor global en lugar de dejar a la organizacion en un estado ambiguo.

Los registros guardados de proveedores de organizacion tambien pueden quedar disponibles para reutilizarlos mas tarde. Volver al proveedor del sistema no tiene por que borrar detalles que un administrador podria querer usar de nuevo.

## Ejecucion directa con el proveedor

Cuando un proveedor de organizacion esta activo, Dory enruta la ejecucion de IA mediante ese proveedor y modelo, en lugar de usar la ruta de cloud proxy empleada para la IA gestionada por el sistema en la nube.

Esto hace que el BYOK a nivel de organizacion sea util para equipos que quieren que la IA siga su propia configuracion: su endpoint, su modelo y su cuenta de proveedor.

## Disponibilidad

El BYOK a nivel de organizacion esta disponible donde la gestion de proveedores de IA por organizacion esta habilitada:

- Dory Pro para entornos basados en cloud plan
- Dory Enterprise para entornos self-hosted basados en licencia

Las organizaciones sin acceso pueden seguir viendo el estado actual del proveedor del sistema, pero editar proveedores de organizacion requiere el plan o la licencia correspondiente.

## Como empezar

Para configurar BYOK a nivel de organizacion:

1. Abre Dory.
2. Ve a Settings de la organizacion.
3. Abre AI.
4. Agrega un Organization Provider.
5. Elige un proveedor y un modelo.
6. Introduce la Base URL y la API key cuando sean necesarias.
7. Prueba el proveedor.
8. Guardalo y establecelo como predeterminado para la organizacion.

Una vez activo, las funciones de IA de Dory usan el proveedor de organizacion para esa organizacion. El proveedor global del sistema permanece disponible como fallback.

## Que sigue

El BYOK a nivel de organizacion forma parte de una direccion mas amplia de Dory: hacer que la IA sea util dentro de flujos de datos reales sin obligar a todos los equipos a usar la misma configuracion de proveedor.

Los equipos de bases de datos necesitan IA que entienda su schema, dialecto SQL, errores de consulta y contexto de resultados. Tambien necesitan control de proveedor que coincida con la forma real en que trabaja su organizacion.

Con BYOK a nivel de organizacion, Dory puede admitir ambas cosas.
