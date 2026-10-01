---
title: Cómo crear capacidades personalizadas
sidebar_label: Creación de capacidades personalizadas
sidebar_position: 3
description: Guía paso a paso para crear capacidades de IA personalizadas que conectan a los Empleados de IA con sistemas externos usando herramientas y API.
tags: [ai-capabilities, custom-capabilities, ai-workforce, integrations]
keywords: [custom capabilities, AI capabilities, tools, integrations, API, AI Employees, prompts, testing]
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Esta guía te lleva paso a paso por la creación de capacidades personalizadas que conectan a tus Empleados de IA con sistemas y API externos. Las capacidades personalizadas habilitan funciones de negocio especializadas, como la verificación de inventario, la reserva de citas y el seguimiento de pedidos.

## Requisitos previos

Antes de crear capacidades personalizadas, asegúrate de tener:
- Acceso a la documentación de la API del sistema externo
- Credenciales de API válidas o tokens de autenticación
- Una comprensión clara del proceso de negocio que quieres automatizar
- Familiaridad básica con los conceptos de API (URL, métodos, parámetros)

## Cuándo usar capacidades personalizadas

Crea capacidades personalizadas cuando tus Empleados de IA necesiten:
- Verificar el inventario en tiempo real y los detalles del producto
- Programar citas o reservas en sistemas externos
- Consultar el estado de un pedido en tu plataforma de comercio electrónico
- Generar cotizaciones o presupuestos personalizados
- Acceder a la información de la cuenta del cliente (puntos de lealtad, historial de compras)
- Buscar en bases de conocimiento internas o sistemas de preguntas frecuentes
- Crear tickets en sistemas de seguimiento de trabajos o soporte
- Automatizar flujos de trabajo repetitivos específicos de tu negocio

:::tip
Si una acción se puede realizar a través de una API, es probable que pueda convertirse en una capacidad personalizada.
:::

## Paso a paso: creación de una capacidad personalizada

### Paso 1: accede a la configuración de capacidades personalizadas

1. Ve a <AISparkleIcon /> `AI` → `Workforce` en el panel de tu Business App.
2. Selecciona el Empleado de IA que quieres mejorar (puede ser un Empleado de IA preconfigurado, como Chat Receptionist o Voice Receptionist, o un Empleado de IA personalizado que hayas creado).
3. Haz clic en `Configure` para abrir la página `Configure` del Empleado de IA.
4. Abre `Capabilities` para ver y administrar todas las capacidades disponibles.
5. Haz clic en `+ Add a capability`.
6. Elige `+ New capability` para empezar a crear una propia.

:::tip Las capacidades personalizadas funcionan en todos los Empleados de IA
Las capacidades personalizadas se pueden usar tanto con Empleados de IA preconfigurados (Chat Receptionist, Voice Receptionist) como con Empleados de IA personalizados que crees. Esto significa que puedes crear una capacidad personalizada una vez y usarla en varios Empleados de IA.
:::

### Creación de Empleados de IA personalizados

Puedes crear Empleados de IA completamente personalizados con capacidades especializadas. Los Empleados de IA personalizados usan el mismo marco de trabajo que los Empleados de IA preconfigurados, lo que te da control total sobre su configuración.

**Cuándo crear Empleados de IA personalizados:**
- Necesitas un Empleado de IA especializado para una función de negocio específica (por ejemplo, estimador de trabajos, gestor de proyectos)
- Los Empleados de IA preconfigurados no se ajustan exactamente a tu caso de uso
- Quieres control total sobre los flujos de conversación y las respuestas
- Necesitas conocimiento y capacidades específicos de tu industria

**Pasos básicos:**
1. En la página `Workforce`, haz clic en `Create`
2. Configura el perfil básico (nombre, avatar, propósito)
3. Configura los canales de comunicación (chat web, SMS, teléfono, etc.)
4. Agrega fuentes de conocimiento (sitio web, documentos, texto personalizado)
5. Agrega capacidades integradas y personalizadas
6. Prueba tu Empleado de IA personalizado antes de implementarlo

**Beneficios de los Empleados de IA personalizados:**
- Especializados para funciones de negocio específicas
- Flujos de conversación y respuestas adaptados
- Conocimiento y capacidades específicos de la industria
- Control total sobre el comportamiento y la apariencia
- Se pueden implementar en varios canales (chat web, chat dentro de la plataforma, automatizaciones)

**Uso de capacidades personalizadas con Empleados de IA personalizados:**
Las capacidades personalizadas funcionan sin problemas con los Empleados de IA personalizados. Puedes:
- Crear capacidades personalizadas específicamente para tu Empleado de IA personalizado
- Reutilizar capacidades personalizadas en varios Empleados de IA (tanto preconfigurados como personalizados)
- Crear flujos de trabajo especializados que combinen varias capacidades personalizadas

Para obtener orientación completa sobre la creación de Empleados de IA personalizados, consulta la [guía de Empleados de IA personalizados](../ai-workforce/custom-ai-employees.md).

### Paso 2: define la información básica de la capacidad

1. **Ingresa un nombre de capacidad**: usa un nombre claro y descriptivo (por ejemplo, `CheckInventory`, `BookAppointment`).
   - Evita los espacios en el nombre
   - Usa nombres descriptivos que indiquen el propósito de la capacidad
2. **Agrega una descripción**: escribe una breve explicación de lo que hace esta capacidad.
   - Ejemplo: "Verifica la disponibilidad del producto en el sistema de inventario en tiempo real"

### Paso 3: crea el prompt de la capacidad

1. En el campo **Prompt**, define cuándo y cómo debe usar la IA esta capacidad.
2. Puedes empezar con texto de marcador de posición ("TBD") y refinarlo después de configurar las herramientas.
3. Para obtener orientación detallada, consulta [Cómo escribir prompts de capacidad efectivos](#writing-effective-capability-prompts).

:::tip
Piensa en el prompt como las instrucciones que darías al contratar a un empleado. Sé específico sobre cuándo debe usar esta habilidad y cómo manejar los distintos escenarios.
:::

### Paso 4: configura las herramientas

1. Haz clic en `+ New tool` para definir la implementación técnica.
2. Elige cómo configurar la herramienta:
   - `Generate from cURL`: crea la herramienta a partir de una llamada de API que ya funciona
   - Configuración manual: completa tú mismo los campos de la llamada de API
3. Completa los campos requeridos de la herramienta (consulta la [Referencia de configuración de herramientas](#tool-configuration-reference)).
4. Agrega varias herramientas si tu capacidad requiere varias llamadas de API.

:::tip Guía detallada de creación de herramientas
Para obtener instrucciones detalladas paso a paso sobre cómo encontrar documentación de API, usar la importación de cURL, trabajar con asistentes de IA y probar herramientas, consulta [Creación de herramientas personalizadas](./tools-overview/building-custom-tools).
:::

### Paso 5: prueba y refina

1. Haz clic en **Save** para guardar la configuración de tu capacidad.
2. Prueba la capacidad chateando con tu Empleado de IA.
3. Prueba distintas formas de expresarlo que deberían activar la capacidad.
4. Supervisa las respuestas de la IA y refina el prompt según sea necesario.

### Paso 6: implementa y supervisa

1. Una vez que estés satisfecho con las pruebas, habilita la capacidad para interacciones en vivo.
2. Supervisa los registros de conversación para ver cómo se desempeña la capacidad.
3. Itera sobre los prompts y las configuraciones de herramientas según el uso real.

## Referencia de configuración de herramientas

#### Generate from cURL
cURL es una herramienta que los desarrolladores usan para probar API escribiendo comandos. Muchas documentaciones de API muestran comandos cURL de ejemplo. Al pegar aquí un comando cURL que funciona, se completa automáticamente la configuración de la herramienta, lo que ahorra tiempo y evita errores.

#### Name
Este es un nombre único para tu herramienta dentro de la configuración de tu IA. Elige algo simple y descriptivo, como `CheckInventory` o `BookAppointment`. No puedes usar espacios.

#### Description
Escribe una oración corta y clara que explique lo que hace esta herramienta. Esto ayuda a tu Empleado de IA a saber qué hace la herramienta y te ayuda a ti y a tu equipo a recordar su propósito más adelante
*Ejemplo:* "Verifica si un producto está en stock".

#### Method & URL
- **Method:** esta es la acción que tu IA le pedirá a la API que realice:
  - **GET** significa "dame información".
  - **POST** significa "crea o actualiza algo".
  - **PUT/PATCH** significa "cambia algo".
  - **DELETE** significa "elimina algo".
- **URL:** esta es la dirección web a la que tu IA se comunicará para realizar la acción. Piénsalo como el número de teléfono al que llama la IA.
*Ejemplo:* `GET https://api.yourbusiness.com/products`

#### Parameters
Los parámetros son detalles adicionales que tu IA envía para que la API sepa exactamente qué quieres. Vienen en distintos tipos:
- **Query parameters:** se agregan al final de una URL, como una pregunta. Ejemplo: `?product_id=123` significa "dime sobre el producto 123".
- **Path parameters:** son parte de la ruta de la URL, como una dirección. Ejemplo: `/products/123` significa "busca el producto 123".
- **Body parameters:** se envían dentro de la solicitud, generalmente para agregar o actualizar información (como los datos del cliente).
Cada parámetro tiene un nombre (como `product_id`), una descripción (qué significa), dónde va (query, path o body) y qué tipo de dato es (texto, número, etc.).

#### Headers
Los headers son información adicional que se envía con la solicitud a la API, a menudo por seguridad. Por ejemplo:
- `Authorization: Bearer YOUR_API_KEY` (permite que la IA acceda a los datos)
- `Content-Type: application/json` (le indica a la IA qué tipo de datos se envía)

#### No external processing needed
Marca esta casilla si tu herramienta en realidad no llama a una API externa, sino que funciona internamente, por ejemplo, dando formato a fechas o texto dentro de la IA. Esto evita llamadas de red innecesarias.

## Cómo escribir prompts de capacidad efectivos

Un prompt de capacidad bien escrito tiene cuatro partes clave. Piénsalo como instrucciones de capacitación para un nuevo empleado:

### 1. Cuándo usar esta capacidad
Especifica claramente las condiciones que la activan:
```
ONLY call CheckCustomerOrderStatus when the user asks about their order status, 
tracking, or delivery. Do NOT use this for general product questions.
```

### 2. Qué información necesitas primero
Enumera la información requerida antes de que la IA pueda actuar:
```
You MUST have the order_number before calling this tool.
If the customer doesn't provide it, ask: "Could you share your order number? 
You can find it in your confirmation email."
```

### 3. Cómo usar la respuesta
Guía a la IA sobre cómo presentar los resultados a los clientes:
```
If successful: "I found your order! It's currently [status] and expected to 
arrive on [date]."

If the order is delayed: Apologize and provide the new estimated delivery date.
```

### 4. Cómo manejar errores
Explica qué hacer cuando algo sale mal:
```
If the API returns no results: "I couldn't find an order with that number. 
Could you double-check it? Order numbers are typically 8-10 digits."

If the API fails: "I'm having trouble accessing order information right now. 
Would you like me to take your contact info so we can follow up?"
```

### Consejos de formato para obtener mejores resultados

Usa el formato markdown para que tus prompts sean claros tanto para las personas como para la IA:

- **Usa encabezados** (`#`, `##`) para organizar las distintas secciones
- **Usa viñetas** para enumerar varios elementos o pasos
- **Usa negrita** para resaltar instrucciones críticas o nombres de campos
- **Usa formato de código** para ejemplos específicos o nombres de campos de la API

**Ejemplo con buen formato:**
```markdown
# Order Status Lookup

## When to Use
- ONLY when customer asks about order status or tracking
- NOT for product availability or general questions

## Required information
Before calling the tool, you MUST have:
- **order_number** (8-10 digit number)
- Ask if missing: "What's your order number?"

## Response format
- Success: "Your order #[number] is [status]."
- Not found: "I couldn't locate that order. Please verify the number."
```

Esta estructura es más fácil de escanear y ayuda a la IA a entender exactamente qué hacer.

## Administración de capacidades personalizadas

- **Actualización:** los cambios guardados se aplican la próxima vez que la IA considere la capacidad durante un chat.
- **Deshabilitación:** eliminar herramientas aún no es compatible; para deshabilitar una herramienta, quítale la asignación al Empleado de IA.

## Prueba y solución de problemas de capacidades personalizadas

### Pasos básicos de prueba

1. Chatea con tu Empleado de IA y prueba distintas formas de expresarlo para activar la capacidad.
2. Verifica que la IA solicite cualquier información requerida y llame a la herramienta adecuada.
3. En *Conversations*, haz clic en **Explanation** debajo de un mensaje para ver el razonamiento de la IA y la llamada de API sin procesar.
4. Si la llamada a la API falla, pruébala por separado con herramientas como Postman, ajústala según sea necesario y vuelve a importar el comando cURL.

### Técnicas de prueba avanzadas

**Prueba con conversaciones nuevas**
- Usa ventanas de navegación de incógnito o privadas para sesiones de prueba limpias
- O borra las cookies entre pruebas para asegurarte de que no haya arrastre de contexto
- Esto ayuda a verificar que tu capacidad funcione de manera consistente para nuevos visitantes

**Prueba múltiples formas de expresarlo**
- Prueba distintas maneras en que los clientes podrían pedir lo mismo
- Prueba con solicitudes incompletas para ver cómo reúne la IA la información faltante
- Verifica que la capacidad no se active cuando no debería

**Revisa las explicaciones de la IA de forma sistemática**
- Verifica si la IA consideró tu capacidad y por qué la usó o no
- Examina los parámetros exactos de la llamada a la API para verificar la asignación correcta de datos
- Observa la respuesta de la API y cómo la interpretó la IA
- Compara varias conversaciones para identificar patrones de comportamiento

### Buenas prácticas de iteración

Al refinar capacidades personalizadas, sigue este enfoque sistemático:

**Paso 1: empieza de forma simple**
- Crea un prompt de capacidad mínimo con solo lo básico
- Prueba que la funcionalidad principal funcione
- Agrega complejidad de forma incremental

**Paso 2: identifica problemas específicos**
- Documenta exactamente qué salió mal (con ejemplos)
- Anota la entrada del cliente y la respuesta de la IA
- Revisa la explicación para entender la toma de decisiones de la IA

**Paso 3: haz un cambio a la vez**
- Ajusta solo un aspecto (redacción del prompt, parámetro de herramienta o plantilla de respuesta)
- Guarda y prueba de inmediato
- Si no funciona, revierte e intenta un enfoque diferente

**Paso 4: prueba el cambio**
- Usa la misma entrada del cliente que falló anteriormente
- Verifica que el problema se haya resuelto
- Prueba casos extremos para asegurarte de que no haya efectos secundarios no deseados

**Paso 5: documenta tus cambios**
- Mantén notas sobre qué cambiaste y por qué
- Registra qué cambios mejoraron el rendimiento
- Crea una referencia para futuras capacidades

:::tip Cuándo ajustar qué
- **Problemas de prompt**: la IA no sabe cuándo usar la capacidad o cómo manejar las respuestas
- **Problemas de configuración de herramientas**: las llamadas a la API fallan, se envían parámetros incorrectos o falla la autenticación
- **Problemas de conocimiento**: la IA necesita contexto que no tiene (agrégalo a la base de conocimiento, no a la capacidad)
- **Problemas de propósito**: el comportamiento general de la IA entra en conflicto con la capacidad (ajusta el propósito del Empleado de IA)

Empieza con la solución más específica (configuración de herramientas) antes de ajustar elementos más amplios (prompts o propósito).
:::

### Supervisión del rendimiento

Después de implementar capacidades personalizadas, supervisa su rendimiento:

**Sigue las tasas de éxito**
- Revisa las conversaciones en las que se usó la capacidad
- Identifica patrones de fallo comunes
- Busca escenarios que no probaste

**Supervisa el rendimiento de la API**
- Verifica los tiempos de respuesta de la API en las explicaciones
- Vigila los límites de tasa o problemas de tiempo de espera de la API
- Registra las tasas de error y los tipos de error comunes

**Indicadores de experiencia del cliente**
- Anota cuándo los clientes expresan frustración o confusión
- Busca preguntas aclaratorias repetidas
- Verifica si los clientes logran sus objetivos

**Señales de optimización**
- La IA pide con frecuencia la misma información faltante (agrégala al prompt)
- La capacidad se activa incorrectamente (refina las condiciones de activación)
- Los clientes reformulan sus solicitudes varias veces (mejora la claridad del prompt)
- Las llamadas a la API fallan con frecuencia (verifica la configuración de la herramienta o la estabilidad de la API)

## Ejemplo de capacidad personalizada: consulta de información de productos

### Ejemplo de configuración de herramienta

| Field       | Value                                              |
|-------------|----------------------------------------------------|
| **ID**      | `LookupProductDetails`                              |
| **Description** | Obtiene los detalles de un producto desde la base de datos de productos |
| **Method**  | `GET`                                              |
| **URL**     | `https://api.yourdatabase.com/products`            |

### Parameters

- `product_id` (string, *query*) – el identificador único del producto

### Headers

- `X-API-Key: YOUR_SECURE_API_KEY`

### Fragmento de prompt (anotado)

```markdown
# Product Lookup Assistant

## When to use
- ONLY call `LookupProductDetails` when the user asks about a product's 
  price, description, or features.
- Do NOT call this unless the user has provided a specific product name **or** ID.
```
👉 **Por qué funciona:** los límites claros evitan que la IA llame a la herramienta innecesariamente, lo que ahorra llamadas a la API y mejora la velocidad de respuesta.

```markdown
## Information needed
- Before calling the tool, you MUST identify `product_id`.
- If the user only gives a name, ask for the ID.
```
👉 **Por qué funciona:** los requisitos explícitos aseguran que la IA reúna la información necesaria antes de intentar la llamada a la API.

```markdown
## Tool parameters
- Set `product_id` to the user-provided ID.
```
👉 **Por qué funciona:** una asignación simple y directa entre los datos de la conversación y los parámetros de la API.

```markdown
## How to respond
- If successful: "I found **[Product Name]**. The price is **$[Price]**. 
  Description: **[Description]**."
- If not found: Apologize and suggest the user double-check the ID or browse 
  products online.
```
👉 **Por qué funciona:** proporcionar plantillas de respuesta exactas (con formato en negrita para las variables) garantiza una comunicación con el cliente consistente y profesional.

#### Comparación antes/después

**❌ Prompt vago:**
```
Look up products when customers ask about them.
```
**Problemas:** ¿cuándo debería consultar? ¿Qué información se necesita? ¿Cómo debería responder?

**✅ Prompt detallado (arriba):**
Condiciones de activación claras, información requerida, plantillas de respuesta y manejo de errores.

### Conversación de ejemplo

**Cliente:** "¿Puedes decirme el precio de los audífonos inalámbricos azules?"
**IA:** "¡Claro! Para asegurarme de tener el producto correcto, ¿puedes confirmar si te refieres a los *BlueWave Wireless Headphones*?"
**Cliente:** "Sí, esos son."
*(La IA llama a `LookupProductDetails` con `product_id` coincidente con BlueWave Wireless Headphones)*
**IA:** "¡Genial! Los *BlueWave Wireless Headphones* tienen un precio de **$89.99**. Ofrecen 20 horas de batería y vienen con una garantía de dos años."

### Variación: combina la consulta con la URL actual del visitante

Cuando un Empleado de IA responde en **Web Chat**, recibe la URL de la página en la que se encuentra el visitante con cada mensaje. Puedes combinar este contexto con una capacidad de consulta para que la IA responda preguntas vagas ("¿esto sigue disponible?", "¿cuál es el precio?") sin necesidad de preguntar a qué artículo se refiere el visitante.

Este patrón es especialmente potente para negocios con URL estructuradas: páginas de productos de comercio electrónico, inventario de vehículos, anuncios inmobiliarios, páginas de servicios, y así sucesivamente.

**Fragmento de prompt: extiende la capacidad de consulta con el análisis de URL:**

```markdown
## Using the Current Page URL
The product detail pages follow this URL pattern:
https://www.example.com/products/[slug]/[product_id]

The value at the end of the path is the `product_id`.

## When to use
- If the visitor's current URL matches the product detail pattern AND they ask a vague product question ("is this in stock", "how much", "any other colors"), parse the `product_id` from the URL and call `LookupProductDetails`.
- Confirm the product naturally in the first line of your reply so the visitor knows you understood.
- If the URL changes between turns, the visitor has navigated to a different product. Always use the URL from the most recent message.
- If the visitor explicitly names a different product than the one in the URL, follow what they said and ignore the URL.
- On non-product pages (homepage, /about, /contact), do not assume product context.
```

:::tip
Para el AI Chat Receptionist, consulta [Haz que las respuestas tengan en cuenta la página con la URL del visitante](../ai-workforce/ai-chat-receptionist/index.md#make-responses-page-aware-with-the-visitors-url) para conocer la funcionalidad completa.
:::

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    ¿Nuevo en cómo funcionan los Empleados de IA? Toma el curso <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> en Vendasta Learn — Principiante, 6 lecciones.
  </span>
</div>
