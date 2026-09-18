---
title: Crear herramientas personalizadas
sidebar_label: "Tutorial: crear herramientas personalizadas"
sidebar_position: 2
description: Guía paso a paso para crear herramientas personalizadas usando la documentación de la API, incluyendo mejores prácticas y consejos de resolución de problemas
---

import { AISparkleIcon } from '@site/src/components/Icons';

Esta guía completa te lleva a través de todo el proceso de creación de herramientas personalizadas para tus empleados de IA. Aprenderás a encontrar documentación de API, usar la función de importación cURL, trabajar con asistentes de IA y probar tus herramientas de manera efectiva.

:::info Antes de empezar
Si eres nuevo con los empleados de IA y las capacidades, comienza con la [Descripción general de IA](../../../ai/) para entender los conceptos generales antes de sumergirte en este tutorial.
:::

## Requisitos previos

Antes de comenzar, asegúrate de tener:
- Acceso a la documentación de la API del sistema externo
- Credenciales de API válidas o tokens de autenticación
- Una comprensión clara del proceso de negocio que quieres automatizar
- Familiaridad básica con conceptos de API (URLs, métodos, parámetros)

## Descripción general del proceso

Crear una herramienta personalizada implica estos pasos clave:

1. **Preparación**: Encontrar y entender la documentación de la API
2. **Usar principios clave**: Seguir las mejores prácticas para crear herramientas
3. **Importar con cURL**: Usar la función de importación cURL para acelerar la configuración
4. **Trabajar con IA**: Aprovechar los asistentes de IA para completar los detalles de la herramienta
5. **Prueba**: Verificar que tu herramienta funcione correctamente
6. **Resolución de problemas**: Resolver problemas comunes

Repasemos cada paso en detalle.

## Paso 1: preparación - encontrar y entender la documentación de la API

Antes de comenzar a crear tu herramienta, necesitas localizar y entender la documentación de la API del servicio que quieres integrar.

### Cómo localizar la documentación de la API

La mayoría de los servicios proporcionan documentación de API en uno de estos lugares:

- **Portal de desarrolladores**: Busca una sección «Developer» o «API» en el sitio web del servicio
- **Centro de documentación**: Muchos servicios tienen sitios de documentación dedicados (por ejemplo, `developers.service.com`)
- **Referencia de API**: Revisa el pie de página del sitio principal o la navegación para enlaces «API» o «Developers»
- **GitHub**: Algunos servicios alojan su documentación de API en repositorios de GitHub

:::tip
Si no puedes encontrar la documentación de la API, busca «[Nombre del servicio] API documentation» o «[Nombre del servicio] developer docs» en tu motor de búsqueda.
:::

### Leer la documentación de la API de manera efectiva

La documentación de la API puede ser abrumadora, pero enfocarte en estas secciones clave te ayudará:

**1. Sección de autenticación**
- Cómo obtener claves o tokens de API
- Dónde incluir la autenticación (encabezados, parámetros de consulta, etc.)
- Expiración de tokens y procesos de renovación

**2. Endpoints/recursos**
- Lista de endpoints de API disponibles
- Métodos HTTP (GET, POST, PUT, DELETE) para cada endpoint
- URL base y rutas de endpoints

**3. Ejemplos de solicitudes**
- Solicitudes de muestra que muestran los parámetros requeridos
- Ejemplos de comandos cURL
- Formatos del cuerpo de la solicitud (JSON, XML, etc.)

**4. Ejemplos de respuestas**
- Cómo se ven las respuestas exitosas
- Formatos de respuestas de error
- Códigos de estado y sus significados

### Identificar los endpoints correctos para tus necesidades

Al revisar la documentación de la API, pregúntate:

- **¿Qué acción necesito realizar?** (Crear, leer, actualizar, eliminar)
- **¿Qué datos necesito enviar?** (Información del cliente, detalles del pedido, etc.)
- **¿Qué datos necesito recibir?** (Confirmación, estado, detalles, etc.)

Relaciona tus necesidades con el endpoint apropiado:

| Tu necesidad | Busca |
|-----------|----------|
| Consultar información del cliente | Endpoint GET con ID del cliente |
| Crear un nuevo pedido | Endpoint POST para pedidos |
| Verificar el estado del pedido | Endpoint GET que devuelve detalles del pedido |
| Actualizar la hora de una cita | Endpoint PUT/PATCH para citas |

### Entender los requisitos de autenticación

La mayoría de las API requieren autenticación. Los métodos comunes incluyen:

**Autenticación por clave de API**
- Generalmente se envía como encabezado: `Authorization: Bearer YOUR_API_KEY`
- O como parámetro de consulta: `?api_key=YOUR_API_KEY`

**OAuth 2.0**
- Requiere obtener primero un token de acceso
- El token luego se envía en los encabezados: `Authorization: Bearer ACCESS_TOKEN`

**Autenticación básica**
- Nombre de usuario y contraseña codificados en el encabezado
- Formato: `Authorization: Basic base64(username:password)`

**Ejemplo de configuración de autenticación:**
```bash
# Clave de API en el encabezado
curl -X GET "https://api.example.com/customers" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Clave de API en el parámetro de consulta
curl -X GET "https://api.example.com/customers?api_key=YOUR_API_KEY"
```

:::warning
Mantén siempre tus claves de API seguras. Nunca las compartas en capturas de pantalla. Usa variables de entorno o almacenamiento seguro de credenciales.
:::

### Consejos para navegar formatos comunes de documentación de API

Diferentes servicios organizan su documentación de manera diferente:

**Documentación de API REST**
- Generalmente organizada por recurso (Users, Orders, Products)
- Endpoints agrupados bajo cada recurso
- Separación clara entre formatos de solicitud y respuesta

**Documentación OpenAPI/Swagger**
- Documentación interactiva con funciones «Try it out»
- A menudo incluye comandos cURL generados automáticamente
- Puede exportar ejemplos directamente

**Documentación GraphQL**
- Se enfoca en consultas y mutaciones
- Usa un explorador de esquemas para entender los campos disponibles
- Estructura diferente a las API REST

## Paso 2: principios clave para crear herramientas

Seguir estos principios te ayudará a crear herramientas confiables y efectivas:

### Aprovechar los asistentes de IA para ayudar

Los asistentes de IA como ChatGPT, Claude, o incluso el soporte de IA de Vendasta pueden ayudarte a:

- **Entender documentación de API compleja**
  - Pregunta: «Explica este endpoint de API en términos simples»
  - Obtén aclaraciones sobre métodos de autenticación
  - Entiende los requisitos de parámetros

- **Generar descripciones de parámetros**
  - Proporciona contexto sobre tu caso de uso
  - Pide descripciones específicas y accionables
  - Obtén ejemplos de buenas descripciones de parámetros

- **Convertir ejemplos de API a cURL**
  - Pega ejemplos de la documentación de la API
  - Pide a la IA que convierta al formato cURL
  - Obtén ayuda con los encabezados de autenticación

**Ejemplos de instrucciones para la IA:**
```
«Estoy creando una herramienta para verificar inventario. El endpoint de la API es 
GET /api/v1/products/{productId}/inventory. Ayúdame a escribir una 
descripción clara para el parámetro productId que le indique a la IA 
cómo extraerlo de los mensajes de los clientes.»
```

### Usar la función de importación cURL en Vendasta

La función de importación cURL completa automáticamente:
- El método HTTP (GET, POST, etc.)
- La URL del endpoint de la API
- Los encabezados (incluyendo autenticación)
- Los parámetros de consulta
- La estructura del cuerpo de la solicitud

Esto ahorra tiempo y reduce errores. Cubriremos esto en detalle en la siguiente sección.

### Revisar y escribir manualmente las descripciones (la parte más importante)

Si bien la importación cURL maneja la configuración técnica, **las descripciones de parámetros son críticas** para que la IA use tu herramienta correctamente.

**Lo que se completa automáticamente:**
- Nombres de parámetros
- Tipos de parámetros (String, Number, etc.)
- Ubicaciones de parámetros (Query, Body, Path)

**Lo que debes hacer manualmente:**
- Escribir descripciones claras para cada parámetro
- Especificar de dónde debe obtener la IA el valor (mensaje del usuario, contexto de la conversación, etc.)
- Agregar reglas de validación y requisitos de formato
- Definir qué hacer si falta información

**Ejemplo de una buena descripción de parámetro:**
```
Parámetro: order_number
Descripción: El número de pedido extraído del mensaje del cliente. 
Los números de pedido suelen tener 8-10 dígitos y pueden incluir letras. 
```

**Ejemplo de una descripción de parámetro que podría mejorarse:**
```
Parámetro: order_number
Descripción: El número de pedido
```

La primera descripción le indica a la IA exactamente qué es el parámetro; la segunda no proporciona suficiente orientación.

## Paso 3: usar la función de importación cURL

La función de importación cURL es una de las formas más rápidas de configurar una nueva herramienta. Extrae automáticamente la configuración de la API a partir de un comando cURL.

### ¿Qué es un comando cURL?

cURL (Client URL) es una herramienta de línea de comandos para realizar solicitudes HTTP. Se usa comúnmente para probar API y a menudo se proporciona en la documentación de la API como código de ejemplo.

**Ejemplo de comando cURL:**
```bash
curl -X POST "https://api.example.com/orders" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "12345",
    "quantity": 2,
    "customer_email": "customer@example.com"
  }'
```

Este comando:
- Realiza una solicitud POST al endpoint de pedidos
- Incluye un encabezado de autorización
- Envía datos JSON en el cuerpo de la solicitud

### Cómo obtener un cURL a partir de una URL de API usando IA

Si la documentación de la API no proporciona ejemplos de cURL, puedes pedirle a la IA que genere uno:

**Paso 1:** Proporciona los detalles de la documentación de la API:
```
«Necesito un comando cURL para este endpoint de API:
- Método: POST
- URL: https://api.example.com/appointments
- Encabezados: Authorization: Bearer TOKEN, Content-Type: application/json
- Cuerpo: { "date": "2024-01-15", "time": "14:00", "customer_id": "123" }»
```

**Paso 2:** La IA generará un comando cURL:
```bash
curl -X POST "https://api.example.com/appointments" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "time": "14:00",
    "customer_id": "123"
  }'
```

**Paso 3:** Copia el comando cURL generado y úsalo con `Generate from cURL` en Vendasta.

### Paso a paso: generar una herramienta a partir de un cURL en Vendasta

**1. Acceder a la configuración de la herramienta**
   - Navega a <AISparkleIcon /> `AI` → `Workforce` en tu panel de Business App
   - Selecciona el empleado de IA que quieres mejorar
   - Haz clic en `Configure` → `Capabilities`
   - Haz clic en `+ Add a capability`
   - Elige `+ New capability`

**2. Agregar una herramienta**
   - Haz clic en `+ New tool` dentro de tu capacidad
   - Selecciona `Generate from cURL`

**3. Pegar tu comando cURL**
   - Copia el comando cURL de la documentación de la API o el ejemplo generado por IA
   - Pégalo en el campo `Generate from cURL`
   - Reemplaza los valores de marcador de posición (como `YOUR_API_KEY`) con valores reales o variables

**4. Revisar los campos completados automáticamente**
   - El sistema extrae automáticamente:
     - Método HTTP (GET, POST, etc.)
     - URL/Endpoint
     - Encabezados
     - Parámetros de consulta
     - Parámetros y estructura del cuerpo

**5. Completar la configuración manual**
   - Completa el campo `Name` (nombre único, sin espacios)
   - Escribe una `Description` clara de cuándo usar esta herramienta
   - Revisa y mejora las descripciones de parámetros (¡paso crítico!)

### Qué se completa automáticamente y qué necesita trabajo manual

**Completado automáticamente (de la importación cURL):**
- ✅ Método HTTP
- ✅ URL/Endpoint
- ✅ Encabezados (incluyendo autenticación si se incluye)
- ✅ Nombres de parámetros
- ✅ Tipos de parámetros (String, Number, Object, etc.)
- ✅ Ubicaciones de parámetros (Query, Body, Path)

**Requiere trabajo manual:**
- ⚠️ **Nombre de la herramienta**: Elige un nombre descriptivo (sin espacios)
- ⚠️ **Descripción de la herramienta**: Explica cuándo la IA debe usar esta herramienta
- ⚠️ **Descripciones de parámetros**: ¡Crítico! Dile a la IA cómo completar cada parámetro
- ⚠️ **Campos requeridos**: Marca los parámetros como requeridos si la API los necesita
- ⚠️ **Valores fijos**: Establece valores estáticos para parámetros que no cambian
- ⚠️ **Valores Enum**: Define las opciones permitidas para parámetros de tipo Enum

**Ejemplo de lo que necesita trabajo manual:**
```
Parámetro completado automáticamente:
- Nombre: product_id
- Tipo: String
- Ubicación: Query

Mejora manual necesaria:
- Descripción: «Extrae el ID del producto del mensaje del cliente. 
  Los ID de producto suelen ser números de 5-6 dígitos. Si el cliente menciona 
  un nombre de producto en su lugar, pide una aclaración o busca el ID 
  del producto en tu base de conocimientos.»
- Requerido: ✓ (marca esta casilla)
```

### Problemas comunes y cómo resolverlos

**Problema: la importación cURL falla o muestra errores**

**Soluciones:**
- Verifica que el comando cURL esté completo y correctamente formateado
- Verifica que todas las comillas estén correctamente cerradas
- Asegúrate de que los caracteres de escape sean correctos (`\'` para comillas simples en JSON)
- Intenta generar un cURL nuevo usando IA o herramientas de prueba de API

**Problema: los encabezados no se importan correctamente**

**Soluciones:**
- Agrega manualmente los encabezados faltantes después de la importación
- Verifica que el formato del encabezado coincida con los requisitos de la API
- Revisa errores tipográficos en los nombres de los encabezados

**Problema: los parámetros del cuerpo no están estructurados correctamente**

**Soluciones:**
- Revisa la estructura JSON en el comando cURL
- Ajusta manualmente objetos o arreglos anidados si es necesario
- Verifica que los tipos de parámetros coincidan con las expectativas de la API

## Paso 4: trabajar con IA para completar las herramientas

Los asistentes de IA pueden acelerar significativamente la creación de herramientas al ayudarte a escribir descripciones de parámetros efectivas y entender requisitos de API complejos.

### Usar capturas de pantalla como contexto para la IA

Las capturas de pantalla son herramientas útiles para obtener asistencia de la IA:

**1. Capturar capturas de pantalla de la documentación de la API**
   - Toma capturas de pantalla de la documentación del endpoint
   - Incluye tablas de parámetros y ejemplos
   - Captura las instrucciones de configuración de autenticación

**2. Proporcionar contexto a la IA**
   - Sube capturas de pantalla junto con tus preguntas
   - Explica qué estás tratando de crear
   - Haz preguntas específicas sobre la documentación

**Ejemplo de instrucción con captura de pantalla:**
```
«Estoy creando una herramienta para verificar inventario. Aquí está la documentación de la API 
para el endpoint. Ayúdame a escribir descripciones de parámetros que le indiquen a la 
IA cómo extraer ID de productos de los mensajes de los clientes y manejar casos 
donde el producto no se encuentre.»
[Adjuntar captura de pantalla de la documentación de la API]
```

### Pedirle a la IA que ayude a escribir descripciones de parámetros

Las buenas descripciones de parámetros son críticas para que la IA use tu herramienta correctamente. La IA puede ayudarte a escribir descripciones efectivas.

**Proporciona contexto:**
- Qué representa el parámetro
- De dónde proviene el valor (mensaje del usuario, contexto de la conversación)
- Requisitos de formato (por ejemplo, «número de 8-10 dígitos»)
- Qué hacer si falta el valor

**Ejemplo de instrucción:**
```
«Ayúdame a escribir una descripción de parámetro para 'appointment_date'. 
La IA necesita extraer fechas de mensajes de clientes como 'el próximo martes' 
o '15 de enero'. Si el cliente no proporciona una fecha, la IA debe 
pedir aclaración. Las fechas deben formatearse como AAAA-MM-DD.»
```

**Descripción generada por IA:**
```
Extrae la fecha de la cita del mensaje del cliente. La fecha puede 
expresarse en varios formatos (por ejemplo, "el próximo martes", "15 de enero", "2024-01-15"). 
Convierte fechas relativas (como "el próximo martes") en fechas específicas. Si el cliente 
no proporciona una fecha, pregunta: "¿Qué fecha te vendría mejor?" Formatea la 
fecha final como AAAA-MM-DD antes de enviarla a la API.
```

### Refinamiento iterativo de descripciones

No esperes descripciones perfectas en el primer intento. Refínalas en función de:

**1. Resultados de pruebas**
   - Revisa cómo la IA usa la herramienta en las conversaciones
   - Verifica la función Explanation para ver los valores de los parámetros
   - Identifica dónde las descripciones necesitan más claridad

**2. Casos límite**
   - Pide a la IA que sugiera casos límite que podrías haber pasado por alto
   - Actualiza las descripciones para manejar escenarios inusuales
   - Agrega instrucciones de respaldo para información faltante

**3. Uso en el mundo real**
   - Monitorea las conversaciones reales con los clientes
   - Nota cuándo la herramienta no se activa correctamente
   - Refina las descripciones basándote en malentendidos comunes

**Ejemplo de proceso de refinamiento:**
```
Descripción inicial:
«Obtén la dirección de correo del cliente.»

Después de las pruebas, descripción refinada:
«Extrae la dirección de correo del cliente de su mensaje. Las direcciones de correo 
deben tener un formato válido (usuario@dominio.com). Si el cliente no 
proporciona un correo, pregunta: '¿Podrías compartir tu dirección de correo para que podamos enviarte 
una confirmación?'»
```

### Asegurar que la IA incluya opciones de variables específicas (no orientación genérica)

Los asistentes de IA a veces proporcionan consejos genéricos. Insiste en descripciones específicas y accionables.

**Genérico (no útil):**
```
«Obtén el ID del producto del usuario.»
```

**Específico (útil):**
```
«Extrae el ID del producto del mensaje del cliente. Los ID de producto son 
números de 5-6 dígitos que comienzan con 'PRD'. Si el cliente menciona un nombre 
de producto (por ejemplo, 'Widget azul'), primero pregunta: '¿Qué producto te interesa?' 
y proporciona opciones, o busca el ID del producto en tu base de conocimientos. 
Nunca adivines los ID de producto.»
```

**Consejos para obtener descripciones específicas:**
- Proporciona ejemplos de mensajes de clientes
- Especifica formatos exactos y reglas de validación
- Incluye instrucciones para información faltante
- Menciona casos límite y cómo manejarlos

### Mejores prácticas para la creación de herramientas asistida por IA

**1. Comenzar con contexto claro**
   - Explica tu caso de uso de negocio
   - Proporciona documentación de API relevante
   - Comparte ejemplos de interacciones con clientes

**2. Hacer preguntas específicas**
   - «¿Cómo debe la IA extraer el número de pedido?»
   - «¿Qué debe hacer la IA si falta la fecha?»
   - «¿Qué formato deben usar los números de teléfono?»

**3. Revisar y personalizar las sugerencias de la IA**
   - No uses las descripciones generadas por IA tal cual
   - Adáptalas a tus necesidades específicas
   - Agrega contexto específico de tu negocio

**4. Probar e iterar**
   - Usa las sugerencias de la IA como puntos de partida
   - Prueba con conversaciones reales
   - Refina en función de los resultados

## Paso 5: probar tus herramientas

Las pruebas exhaustivas aseguran que tus herramientas funcionen correctamente y brinden una buena experiencia al cliente.

### Cómo probar herramientas en conversaciones

**1. Iniciar una conversación de prueba**
   - Navega a la interfaz de chat de tu empleado de IA
   - Usa una sesión de navegador nueva (modo incógnito) para evitar el traspaso de contexto
   - Prueba diferentes formulaciones que deberían activar tu herramienta

**2. Probar varios escenarios**
   - **Camino ideal**: el cliente proporciona toda la información requerida
   - **Información faltante**: el cliente no proporciona los parámetros requeridos
   - **Formato incorrecto**: el cliente proporciona información en un formato inesperado
   - **Casos límite**: solicitudes inusuales o condiciones de error

**Ejemplos de escenarios de prueba:**
```
Prueba 1: «Verifica el estado del pedido 12345»
Esperado: la herramienta se activa, recupera el estado del pedido

Prueba 2: «¿Cuál es el estado de mi pedido?»
Esperado: la IA pide el número de pedido antes de usar la herramienta

Prueba 3: «Verifica el pedido abc123xyz»
Esperado: la IA maneja con elegancia un formato de número de pedido inválido
```

### Verificar el llenado correcto de parámetros

**1. Usar la función Explanation**
   - En Conversations, haz clic en `Explanation` debajo de un mensaje
   - Revisa el razonamiento de la IA para usar la herramienta
   - Verifica los valores de parámetros reales enviados a la API

**2. Verificar los valores de parámetros**
   - Verifica que los parámetros se extraigan correctamente de los mensajes de los clientes
   - Asegúrate de que los tipos de datos coincidan con los requisitos de la API
   - Verifica que los parámetros requeridos estén presentes

**3. Comparar con las expectativas de la API**
   - Revisa los parámetros reales de la llamada a la API
   - Compara con los requisitos de la documentación de la API
   - Asegúrate de que los encabezados y la autenticación sean correctos

### Depurar problemas comunes

**Problema: la herramienta no se activa**

**Pasos de depuración:**
1. Revisa la descripción de la herramienta: ¿es lo suficientemente específica?
2. Verifica que la capacidad esté habilitada para tu empleado de IA
3. Revisa la Explanation para ver si la IA consideró la herramienta
4. Prueba con diferentes formulaciones

**Problema: valores de parámetros incorrectos**

**Pasos de depuración:**
1. Revisa las descripciones de parámetros para mayor claridad
2. Verifica la Explanation para ver cómo la IA extrajo los valores
3. Prueba con valores conocidos para aislar el problema
4. Refina las descripciones de parámetros según los hallazgos

**Problema: la llamada a la API falla**

**Pasos de depuración:**
1. Revisa la Explanation para ver la llamada exacta a la API
2. Prueba la llamada a la API de forma independiente (Postman, cURL)
3. Verifica que los encabezados de autenticación sean correctos
4. Verifica si hay límites de tasa o errores de la API

### Iteración y mejora

**1. Documentar problemas**
   - Mantén notas sobre lo que no funciona
   - Registra los mensajes de los clientes que causan problemas
   - Anota los errores de la API y sus causas

**2. Hacer cambios incrementales**
   - Cambia una cosa a la vez
   - Prueba cada cambio antes de hacer otro
   - Revierte los cambios que no ayuden

**3. Monitorear el uso real**
   - Revisa las conversaciones donde se usó la herramienta
   - Busca patrones en las fallas
   - Identifica malentendidos comunes

**4. Refinamiento continuo**
   - Actualiza las descripciones de parámetros según el uso real
   - Ajusta las descripciones de herramientas para mejorar la activación
   - Refina el manejo de errores según los comentarios de los clientes

## Paso 6: resolución de problemas

Incluso con una planificación cuidadosa, podrías encontrar problemas. Así es como resolver los problemas comunes.

### Problemas comunes y soluciones

#### La herramienta nunca se activa

**Síntomas:**
- La IA no usa la herramienta cuando debería
- Las solicitudes de los clientes quedan sin atender

**Posibles causas y soluciones:**

**1. Descripción demasiado vaga**
   - **Solución:** Haz que la descripción de la herramienta sea más específica sobre cuándo usarla
   - **Ejemplo:** En lugar de «Verificar pedidos», usa «USA ESTA HERRAMIENTA SOLO cuando el cliente pregunte sobre el estado del pedido, seguimiento o confirmación de entrega»

**2. Capacidad no habilitada**
   - **Solución:** Verifica que la capacidad esté asignada a tu empleado de IA
   - Verifica: pestaña `Workforce` → `Configure` → `Capabilities`

**3. Capacidades en conflicto**
   - **Solución:** Revisa otras capacidades que podrían estar manejando la misma solicitud
   - Refina las condiciones de activación para que sean más específicas

**4. Falta contexto**
   - **Solución:** Asegúrate de que la información requerida esté disponible en la conversación
   - Verifica si la IA tiene acceso a los datos necesarios

#### La autenticación de la API falla

**Síntomas:**
- La API devuelve errores 401 (Unauthorized) o 403 (Forbidden)
- Las llamadas a la herramienta fallan con errores de autenticación

**Posibles causas y soluciones:**

**1. Clave de API inválida**
   - **Solución:** Verifica que tu clave de API sea correcta y esté activa
   - Verifica si la clave ha expirado o ha sido revocada
   - Genera una nueva clave si es necesario

**2. Formato de encabezado incorrecto**
   - **Solución:** Verifica que el formato del encabezado de autenticación coincida con los requisitos de la API
   - Formatos comunes:
     - `Authorization: Bearer YOUR_TOKEN`
     - `Authorization: Basic base64(username:password)`
     - `X-API-Key: YOUR_API_KEY`

**3. Autenticación faltante**
   - **Solución:** Asegúrate de que los encabezados de autenticación estén incluidos en la configuración de la herramienta
   - Verifica que los encabezados estén establecidos como valores fijos, no dinámicos

**4. Clave de API en la ubicación incorrecta**
   - **Solución:** Verifica si la API espera la clave en:
     - Encabezados (lo más común)
     - Parámetros de consulta (`?api_key=...`)
     - Cuerpo de la solicitud

#### Problemas de mapeo de parámetros

**Síntomas:**
- Valores incorrectos enviados a la API
- Parámetros faltantes o incorrectos
- La API devuelve errores sobre parámetros inválidos

**Posibles causas y soluciones:**

**1. Descripciones de parámetros poco claras**
   - **Solución:** Escribe descripciones más específicas
   - Incluye requisitos de formato y ejemplos
   - Especifica de dónde obtener el valor

**2. Discrepancia de tipo de parámetro**
   - **Solución:** Verifica que los tipos de parámetros coincidan con los requisitos de la API
   - Verifica si la API espera String vs Number
   - Asegúrate de que los arreglos/objetos estén estructurados correctamente

**3. Parámetros requeridos faltantes**
   - **Solución:** Marca los parámetros requeridos en la configuración de la herramienta
   - Actualiza las descripciones para asegurar que la IA recopile la información requerida
   - Agrega validación en las descripciones de parámetros

**4. Ubicación incorrecta del parámetro**
   - **Solución:** Verifica que los parámetros estén en la ubicación correcta:
     - Parámetros de consulta para solicitudes GET
     - Parámetros del cuerpo para solicitudes POST/PUT
     - Parámetros de ruta en la URL

#### La herramienta se activa incorrectamente

**Síntomas:**
- La herramienta se activa cuando no debería
- Falsos positivos en las conversaciones con clientes

**Posibles causas y soluciones:**

**1. Descripción demasiado amplia**
   - **Solución:** Agrega condiciones de activación más específicas
   - Usa lenguaje «SOLO» y «NO» para establecer límites
   - **Ejemplo:** «USAR SOLO cuando el cliente pregunte sobre el estado del pedido. NO usar para preguntas de productos o consultas generales.»

**2. Capacidades superpuestas**
   - **Solución:** Revisa y refina las descripciones de las capacidades
   - Haz que las condiciones de activación sean más distintas
   - Prioriza qué capacidad debe manejar solicitudes específicas

### Obtener ayuda y recursos

**1. Revisar la documentación**
   - Consulta esta guía y la documentación relacionada
   - Revisa la documentación de la API del servicio que estás integrando
   - Consulta [Descripción general de herramientas](./index.md) para una comprensión conceptual

**2. Usar asistentes de IA**
   - Pide a la IA que ayude a depurar problemas específicos
   - Comparte mensajes de error y respuestas de la API
   - Obtén sugerencias para descripciones de parámetros

**3. Probar de forma independiente**
   - Usa Postman o Insomnia para probar llamadas a la API directamente
   - Verifica que la API funcione fuera de Vendasta
   - Aísla si los problemas están en la herramienta o en la API

**4. Verificar la función Explanation**
   - Revisa el razonamiento de la IA para el uso de la herramienta
   - Examina las llamadas y respuestas reales de la API
   - Identifica patrones en las fallas

**5. Recursos de la comunidad**
   - Stack Overflow para preguntas específicas de API
   - Foros de desarrolladores específicos del servicio
   - Canales de soporte de Vendasta

## Resumen de mejores prácticas

Sigue estos principios a lo largo del proceso de creación de herramientas:

**1. Usar siempre documentación fuente**
   - No adivines endpoints o parámetros de la API
   - Consulta la documentación oficial de la API
   - Verifica los requisitos antes de crear

**2. Escribir descripciones claras y específicas**
   - Las descripciones de parámetros son la parte más importante
   - Dile a la IA exactamente qué hacer, no solo qué es el parámetro
   - Incluye requisitos de formato e instrucciones de respaldo

**3. Probar exhaustivamente**
   - Prueba con varias formulaciones y escenarios
   - Usa sesiones de navegador nuevas para evitar problemas de contexto
   - Revisa las explicaciones para entender el comportamiento de la IA

**4. Iterar según el uso real**
   - Monitorea las conversaciones reales con clientes
   - Refina las descripciones según las fallas
   - Haz mejoras incrementales

**5. Aprovechar la asistencia de IA estratégicamente**
   - Usa la IA para entender documentación compleja
   - Obtén ayuda para escribir descripciones de parámetros
   - No delegues decisiones de lógica de negocio

## Preguntas frecuentes (FAQ)

<details>
<summary>¿Necesito ser desarrollador para crear herramientas personalizadas?</summary>

No, no necesitas ser desarrollador. Si bien la familiaridad básica con conceptos de API ayuda, la función de importación cURL y los asistentes de IA hacen posible crear herramientas sin conocimientos técnicos profundos. La habilidad más importante es escribir descripciones de parámetros claras que le indiquen a la IA cómo usar la herramienta.

</details>

<details>
<summary>¿Qué pasa si no puedo encontrar documentación de API para el servicio que quiero integrar?</summary>

Si no puedes encontrar documentación oficial de la API, intenta:
- Buscar «[Nombre del servicio] API documentation» o «[Nombre del servicio] developer docs»
- Contactar al equipo de soporte del servicio para acceso a la API
- Verificar si tienen un portal de desarrolladores o foro comunitario

Si no existe una API, es posible que necesites usar un método de integración diferente o contactar al proveedor del servicio.

</details>

<details>
<summary>¿Puedo usar la misma herramienta para múltiples capacidades?</summary>

Sí, puedes usar la misma herramienta en múltiples capacidades. Sin embargo, cada capacidad debe tener su propia instrucción que defina cuándo y cómo usar la herramienta en ese contexto específico. Esto permite que el mismo endpoint de API sirva diferentes propósitos de negocio.

</details>

<details>
<summary>¿Qué pasa si mi clave de API expira o cambia?</summary>

Si tu clave de API expira o cambia, deberás actualizar el encabezado de autenticación en la configuración de tu herramienta. Ve a la configuración de la herramienta, busca el encabezado Authorization, y actualízalo con la nueva clave. La herramienta entonces funcionará con las nuevas credenciales.

</details>

<details>
<summary>¿Cómo sé si mis descripciones de parámetros son lo suficientemente buenas?</summary>

Prueba tu herramienta con varias formulaciones de clientes. Si la IA:
- Extrae correctamente los parámetros de los mensajes de los clientes
- Pide la información requerida faltante
- Usa la herramienta cuando es apropiado
- Maneja los casos límite con elegancia

Entonces tus descripciones están funcionando bien. Revisa la función Explanation para ver cómo la IA interpreta tus descripciones.

</details>

<details>
<summary>¿Puedo crear herramientas que usen múltiples endpoints de API?</summary>

Sí, puedes agregar múltiples herramientas a una sola capacidad. Cada herramienta puede llamar a un endpoint de API diferente. La IA usará la herramienta apropiada según la solicitud del cliente y las descripciones de herramientas que hayas escrito.

</details>

<details>
<summary>¿Qué debo hacer si la importación cURL no funciona?</summary>

Si la importación cURL falla:
- Verifica que el comando cURL esté completo y correctamente formateado
- Verifica que todas las comillas estén correctamente cerradas
- Intenta generar un cURL nuevo usando IA o herramientas de prueba de API como Postman
- Configura manualmente la herramienta si la importación sigue fallando

La opción de configuración manual te da control total sobre todos los ajustes de la herramienta.

</details>

<details>
<summary>¿Con qué frecuencia debo probar y refinar mis herramientas?</summary>

Prueba inmediatamente después de crear una herramienta, luego monitorea el uso real. Refina las herramientas según:
- Llamadas a la API fallidas o errores
- Confusión de los clientes o preguntas repetidas
- Herramientas que no se activan cuando deberían (o que se activan incorrectamente)
- Cambios en la API o servicio que estás integrando

El monitoreo regular ayuda a detectar problemas antes de que afecten demasiadas interacciones con los clientes.

</details>

<details>
<summary>¿Puedo compartir herramientas que he creado con otros empleados de IA?</summary>

Sí, las capacidades personalizadas (incluyendo sus herramientas) se pueden asignar a múltiples empleados de IA. Esto te permite reutilizar configuraciones de herramientas exitosas en diferentes empleados de IA sin reconstruirlas.

</details>

<details>
<summary>¿Cuál es la diferencia entre una herramienta y una capacidad?</summary>

Una **herramienta** es la implementación técnica de la API (el «cómo»): define el endpoint de la API, la autenticación y los parámetros. Una **capacidad** es la lógica de negocio (el «cuándo» y el «por qué»): incluye la instrucción que le dice a la IA cuándo usar la herramienta y cómo manejar las respuestas. Necesitas ambas: herramientas para la conexión a la API, y capacidades para el comportamiento de la IA.

</details>
