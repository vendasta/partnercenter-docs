---
title: Descripción general de capacidades de IA
sidebar_label: Capacidades de IA
description: Aprende cómo funcionan las capacidades de IA como habilidades especializadas que permiten a los empleados de IA manejar tareas de negocio específicas y automatizar las interacciones con los clientes.
tags: [ai-capabilities, capabilities, ai-employees, custom-capabilities, automation]
keywords: [AI capabilities, capabilities, custom capabilities, AI employees, automation, tools, integrations, lead capture, appointment booking]
---

import { GraduationCapIcon } from '@site/src/components/Icons';

Las capacidades de IA son habilidades especializadas que definen qué pueden hacer tus Empleados de IA y cómo se comportan al interactuar con los clientes. Piensa en las capacidades como bloques de construcción que transforman a un asistente de IA básico en un empleado capacitado que puede manejar tareas de negocio específicas.

## ¿Qué son las capacidades de IA?

Una **capacidad** es un conjunto discreto de instrucciones que puedes habilitar o deshabilitar para un Empleado de IA. En pocas palabras, una capacidad es una sección de prompt, junto con una herramienta opcional para llamar a una API.

Cada capacidad contiene instrucciones que guían a la IA sobre:

- Qué acciones tomar en situaciones específicas
- Qué resultados priorizar
- Cómo responder a distintos tipos de solicitudes

Varias capacidades pueden funcionar juntas para crear Empleados de IA capaces de manejar interacciones complejas de varios pasos, mientras se mantiene la coherencia con tus procesos de negocio. Cuando el Empleado de IA maneja una solicitud, combina todas las capacidades en el prompt que rige su comportamiento.

### Tipos de capacidades de IA

#### Capacidades integradas
La plataforma Vendasta ofrece capacidades preconfiguradas para funciones de negocio comunes. Algunos ejemplos incluyen:

- **Lead Capture**: recopila y califica automáticamente la información de los leads (nombre, correo electrónico, teléfono, presupuesto).
- **Appointment Booking**: programa reuniones usando tus sistemas de calendario conectados.
- **Transfer Call**: transfiere en vivo las llamadas a otros números según la intención y las reglas. Consulta [Transferir llamadas a otros números](../ai-workforce/ai-voice-receptionist.md#transfer-calls-to-other-numbers-from-your-ai-voice-receptionist).

#### Capacidades personalizadas
Para flujos de trabajo especializados, puedes crear tus propias capacidades personalizadas que:

- Simplemente agregan nuevas instrucciones para que las siga el Empleado de IA (sin necesidad de herramientas)
- Se conectan a sistemas externos a través de API (usando herramientas)
- Ejecutan lógica de negocio compleja
- Automatizan procesos únicos específicos de tu industria

## Cómo funcionan las capacidades con los Empleados de IA

### Asignación de capacidades
Cada Empleado de IA puede tener varias capacidades habilitadas al mismo tiempo. La IA decide de forma inteligente qué capacidades usar según las solicitudes del cliente y el contexto de la conversación.

### Activación contextual
Tu Empleado de IA evalúa las solicitudes entrantes y activa la capacidad más adecuada. Por ejemplo:
- Una pregunta sobre el horario de atención activa el acceso a la base de conocimiento
- Una solicitud de información de precios activa las capacidades de consulta de productos
- Un interés en los servicios activa la captura de leads y la reserva de citas

### Comportamiento adaptativo
Las capacidades se pueden configurar con prompts y parámetros específicos que modifican el comportamiento de la IA. Esto permite que la misma capacidad funcione de manera diferente en distintos Empleados de IA o contextos de negocio.

## Arquitectura de capacidades para Empleados de IA

### Prompts
Instrucciones escritas que le indican a la IA cuándo y cómo usar una capacidad. Los prompts definen:
- Las condiciones de activación
- La información requerida antes de proceder
- Las plantillas de respuesta y el tono
- Los procedimientos de manejo de errores

### Herramientas (capacidades personalizadas)
En el caso de las capacidades personalizadas, las herramientas definen la implementación técnica:
- Los endpoints de la API y la autenticación
- Los parámetros y formatos de datos
- Los flujos de trabajo de integración
- La lógica de procesamiento de respuestas

:::tip Más información sobre las herramientas
Las herramientas permiten que los Empleados de IA interactúen con sistemas externos y obtengan datos en tiempo real. Para entender los fundamentos de cómo funcionan las herramientas con las API, consulta la [Descripción general de herramientas e integraciones](./tools-overview). Para obtener una guía paso a paso sobre cómo crear herramientas personalizadas, consulta [Creación de herramientas personalizadas](./tools-overview/building-custom-tools).
:::

## Prueba y optimización de capacidades

Las capacidades efectivas requieren pruebas y ajustes iterativos. Usa estas estrategias para asegurarte de que tus capacidades funcionen según lo esperado:

### Prueba del rendimiento de las capacidades

**1. Prueba las condiciones de activación**
- Verifica que la capacidad se active cuando debería
- Asegúrate de que no se active cuando no debería
- Prueba varias formas de expresar las solicitudes para comprobar la coherencia

**2. Verifica la recopilación de información**
- Confirma que la IA solicite la información requerida antes de usar las herramientas
- Prueba qué sucede cuando los clientes proporcionan datos incompletos
- Asegúrate de que la IA maneje con elegancia los casos extremos

**3. Revisa las explicaciones de la IA**
- Revisa el razonamiento detrás de las decisiones de activación de capacidades
- Identifica cuándo la IA eligió una capacidad sobre otra
- Usa las explicaciones para refinar las condiciones de activación y los prompts

### Técnicas de optimización

**Más corto es mejor**
- Mantén los prompts de las capacidades concisos y enfocados
- Evita instrucciones redundantes o contradictorias
- Elimina detalles innecesarios que no afecten el comportamiento

**Usa ejemplos**
- Incluye ejemplos específicos de cuándo usar la capacidad
- Muestra ejemplos de los formatos de información requeridos
- Demuestra los patrones de respuesta deseados

**Da formato para mayor claridad**
- Usa encabezados de markdown para organizar las secciones
- Usa viñetas para las listas de condiciones o pasos
- Usa negrita para resaltar instrucciones críticas
- Estructura los prompts para que se puedan escanear fácilmente, tanto para personas como para la IA

**Pide ayuda a la IA**
- Copia el prompt de tu capacidad y pídele a una IA que sugiera mejoras
- Solicita ejemplos de casos extremos que deberías manejar
- Obtén retroalimentación sobre la claridad y la integridad

**Prueba e itera**
- Haz un cambio a la vez
- Prueba el escenario específico que intentas mejorar
- Supervisa las conversaciones reales para verificar las mejoras
- Prepárate para seguir refinando según los resultados

:::tip Supervisión del rendimiento
Usa la función de explicaciones en Conversations para entender:
- Qué capacidades se usan con más frecuencia
- Dónde entran en conflicto las capacidades entre sí
- Cuándo la IA decide no usar una capacidad y por qué
- Qué tan bien funcionan tus condiciones de activación en la práctica
:::

---

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    ¿Nuevo en cómo funcionan los Empleados de IA? Toma el curso <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> en Vendasta Learn — Principiante, 6 lecciones.
  </span>
</div>
