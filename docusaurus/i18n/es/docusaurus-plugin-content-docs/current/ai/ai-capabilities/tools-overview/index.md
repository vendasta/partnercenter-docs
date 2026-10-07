---
title: Herramientas de IA  
sidebar_label: Herramientas de IA 
sidebar_position: 1
description: Las herramientas permiten a los empleados de IA interactuar con sistemas externos, recuperar información en tiempo real y automatizar flujos de trabajo en diferentes plataformas. Aprende cómo funcionan las herramientas, sus componentes y cuándo crear herramientas personalizadas para ampliar las capacidades de tu IA.
keywords:
  - AI Tools
  - Tool Components
  - Custom Tools
  - API Integration
tags:
  - AI Tools
  - Capabilities
  - Integrations
---

import { GraduationCapIcon } from '@site/src/components/Icons';

Las herramientas permiten que tus empleados de IA interactúen con sistemas externos, recuperen información en tiempo real y automaticen flujos de trabajo en diferentes plataformas. Entender cómo funcionan las herramientas es esencial para crear capacidades de IA potentes que van más allá de una simple conversación.

## ¿Qué son las herramientas?

Una **herramienta** es una función o API que un empleado de IA puede usar. Las herramientas conectan la IA con sistemas de software para:

- Recuperación de datos en tiempo real
- Acciones automatizadas en diferentes plataformas
- Respuestas dinámicas basadas en información externa

:::note Ejemplo
Un recepcionista de IA para una empresa de servicios de mantenimiento usa una herramienta de API meteorológica al reservar una «limpieza de canaletas en cualquier momento esta semana» para verificar si las condiciones exteriores son adecuadas antes de confirmar las citas.
:::


### API y herramientas

Las herramientas y las API trabajan juntas para permitir que los empleados de IA interactúen con sistemas de software. Mientras que las API proporcionan la funcionalidad básica para conectar sistemas, las herramientas proporcionan la capa de inteligencia que le indica a la IA cuándo y cómo usar esas API de manera efectiva.

Las **API** proporcionan funcionalidad; las **herramientas** indican a la IA cómo usar las API definiendo:
- Cuándo usar la API
- Cómo dar formato a las solicitudes
- El manejo de la autenticación

## Componentes de una herramienta

Cada herramienta consta de cuatro componentes clave que le indican al empleado de IA cómo usar la API. Estos componentes *no* requieren un conocimiento extenso de código, pero deberás consultar la documentación de la API para completarlos correctamente.

<img src={require('./img/main-tool-components.png').default} alt="The four main tool components" style={{width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Descripción

La descripción es una frase corta que le indica a la IA cuándo usar la herramienta y qué logra. Al ser específico sobre los disparadores y los resultados de negocio, ayudas a la IA a entender cuándo usar la herramienta y qué esperar en la respuesta.

:::note Ejemplo
«Usar antes de reservar citas al aire libre para verificar las condiciones climáticas por seguridad.»
:::

<img src={require('./img/tool-description-example.png').default} alt="Tool description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Método y URL

El endpoint específico de la API (dirección web) y el método HTTP que le indica a la API qué acción realizar. 

<img src={require('./img/tool-method-url-example.png').default} alt="Tool method and URL example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Método | Propósito estándar | Ejemplo de caso de uso |
|--------|----------------|------------------|
| **GET** | Recuperar recursos | Consultar información del cliente |
| **POST** | Crear nuevos recursos | Crear un nuevo cliente |
| **PUT/PATCH** | Actualizar recursos existentes | Actualizar información del cliente |
| **DELETE** | Eliminar recursos | Eliminar un cliente |

:::info
El método y la URL que uses los determina el creador de la API. Si bien conocer los métodos comunes y sus propósitos te ayudará a entender cómo configurar una herramienta y confirmar que esté configurada correctamente, deberás consultar la documentación de la API para el método y la URL específicos a usar.
:::

### Encabezados

Los encabezados proporcionan metadatos esenciales para las solicitudes de API, incluyendo la autenticación e información sobre el tipo de contenido. Se envían con cada llamada a la API y garantizan una comunicación segura y con el formato correcto.

**Los encabezados comunes incluyen:**
- `Authorization: Bearer YOUR_API_KEY`: prueba tu identidad y permisos
- `Content-Type: application/json`: especifica el formato de los datos que se envían

<img src={require('./img/tool-header-example.png').default} alt="Tool headers example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

### Parámetros

Los parámetros definen los datos específicos que se envían a la API. Hay varios campos que deberás completar para configurar un parámetro de modo que la IA pueda usarlo correctamente, pero muchos de ellos no requieren un conocimiento extenso de código.

<img src={require('./img/tool-parameter-example.png').default} alt="Tool parameters example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Ubicación del parámetro

Las herramientas admiten el envío de datos a la API en dos ubicaciones: **Body** (cuerpo) y **Query** (consulta). Elige la ubicación que coincida con la documentación de la API. 

| Ubicación | Qué significa | Uso típico | Ejemplo |
|----------|----------------|-------------|---------|
| **Body** | Incluido en el cuerpo de la solicitud | La mayoría de las solicitudes POST/PUT/PATCH | Cuerpo JSON como `{ "email": "user@example.com" }` |
| **Query** | Agregado a la URL como cadena de consulta | Filtrado, paginación, búsqueda | `/contacts?limit=25&sort=createdAt` |

#### Tipo de parámetro 

El tipo de parámetro es el tipo de dato esperado para el parámetro. Esto ayuda a garantizar que el valor enviado a la API tenga el formato correcto y que la IA pueda completarlo correctamente. Las herramientas admiten los principales tipos de datos fundamentales en las API REST o basadas en JSON modernas, como se ve en la tabla a continuación.

| Tipo | Qué espera la API | Valor de ejemplo | Notas |
|------|----------------------|---------------|-------|
| **String** | Texto | `"hello world"` | |
| **Number** | Decimal/flotante | `12.5` | Para precios, medidas |
| **Integer** | Número entero | `42` | Para conteos, IDs cuando son numéricos |
| **Boolean** | Verdadero/falso | `true` | Indicadores de funciones, alternancias |
| **Enum** | Una de las cadenas permitidas | `"open"` | Define las opciones permitidas |
| **Object** | Estructura clave/valor | `{ "id": "123", "name": "Acme" }` | Agrega campos debajo del parámetro |
| **Array** | Lista ordenada | `["a", "b"]` o `[{...},{...}]` | Elige el tipo de elemento (String, Object, etc.) |

:::note Completar parámetros de tipo Object y Array
Para objetos y arreglos, se te pedirá que definas la estructura interna para que la IA pueda completar cada campo correctamente. Los campos dentro del objeto o arreglo se completan de manera similar a un parámetro normal.

<img src={require('./img/tool-nested-object-fields.png').default} alt="Object and array parameter example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::

#### Casilla «Requerido» del parámetro

La casilla `Required` se usa para indicar si el parámetro es necesario para que la API funcione correctamente. Si el parámetro **es** requerido, la IA siempre usará esta herramienta con un valor completado. 

Algunas API requieren que ciertos parámetros se completen para funcionar correctamente. Siempre verifica la documentación de la API para confirmar si un parámetro es requerido, así podrás configurarlo correctamente.


:::tip Requerir parámetros para un comportamiento consistente
Aunque un parámetro puede **no** ser requerido para que la API funcione correctamente, puedes hacerlo requerido para un comportamiento consistente en tu empleado de IA. 
:::

:::info Parámetros requeridos en objetos y arreglos
Aunque los objetos y arreglos podrían no ser requeridos por la API, si están presentes, ellos mismos podrían tener campos requeridos. Por ejemplo, un pedido podría no requerir incluir un cliente, pero el objeto cliente en sí podría requerir campos como un nombre o dirección de correo electrónico.

Este comportamiento se admite dejando el «Object» o «Array» marcado como no requerido, pero marcando los campos requeridos en sí como requeridos.

<img src={require('./img/tool-object-requirements.png').default} alt="Object and array parameter example showing required fields" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
:::


#### Descripción del parámetro

La descripción del parámetro le indica a la IA qué es el parámetro y cómo completarlo. Esto puede incluir:
- de dónde proviene el valor (mensaje del usuario, contexto de la conversación, etc.)
- reglas de validación y requisitos de formato (por ejemplo, «debe ser una dirección de correo válida», «debe ser un número entre 1 y 100», etc.)
- instrucciones de respaldo para información faltante

Un ejemplo de una descripción de parámetro detallada podría ser:
``` 
«La fecha de la cita solicitada por el usuario. Debe estar en formato AAAA-MM-DD. Es posible que debas pedirle la fecha al usuario si no se proporciona.»
```
<img src={require('./img/tool-parameter-description-example.png').default} alt="Parameter description example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

#### Casilla «Definido por IA» del parámetro

Si bien a menudo querrás que la IA complete el valor del parámetro dinámicamente según el contexto de la conversación, hay ocasiones en las que querrás establecer un valor fijo. Puedes hacerlo desactivando la casilla `Set by AI`.

Con `Set by AI` desactivado, deberás completar el campo `Value` con el valor fijo que deseas usar.

<img src={require('./img/tool-set-by-ai-example.png').default} alt="Parameter set by AI checkbox example" style={{width: '70%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />

| Tipo | Descripción | Ejemplo |
|------|--------------|----------|
| Set by AI | Valores dinámicos que provienen del usuario o del contexto de la conversación | «La fecha de la cita solicitada por el usuario. Debe estar en formato AAAA-MM-DD. Es posible que debas pedirle la fecha al usuario si no se proporciona.» |
| Fixed value | Constantes requeridas por la API, interruptores de funciones o modos predeterminados | `"2025-01-01"` |

## Cuándo crear herramientas personalizadas

Crea herramientas personalizadas cuando los empleados de IA necesiten:
- Verificar el inventario o la disponibilidad de productos en tiempo real
- Programar citas en calendarios externos
- Consultar el estado de pedidos desde plataformas de comercio electrónico
- Acceder a la información de la cuenta del cliente
- Integrarse con sistemas comerciales especializados
- Automatizar flujos de trabajo específicos de tu industria

:::tip ¿Listo para crear?
Ahora que entiendes qué son las herramientas y cómo funcionan, sigue nuestro tutorial paso a paso para crear tu primera herramienta personalizada: [Crear herramientas personalizadas](./building-custom-tools)
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    ¿Eres nuevo en la contratación y gestión de un empleado de IA? Toma el curso <a href="/learn/ai-workforce" style={{color: '#3C9A63', fontWeight: 600}}>Contrata a tu primer empleado de IA</a> en Vendasta Learn — Principiante a intermedio, 7 lecciones.
  </span>
</div>
