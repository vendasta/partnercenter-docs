---
title: Cómo configurar las capacidades de IA
sidebar_label: Configurar capacidades
sidebar_position: 2
---

import { AISparkleIcon, GraduationCapIcon } from '@site/src/components/Icons';

Esta guía te explica cómo habilitar y configurar las capacidades integradas de tus AI Employees. Sigue estos pasos para configurar capacidades que se encarguen de tareas comerciales comunes, como la captura de leads y la programación de citas.

## Requisitos previos

Antes de comenzar:
- Tienes un AI Employee creado en tu cuenta de Business App
- Tienes los permisos adecuados para configurar los ajustes de IA
- Entiendes qué capacidades se alinean con las necesidades de tu negocio

## Paso 1: Accede a la configuración del AI Employee

1. Ve a <AISparkleIcon /> `AI` → `Workforce` en el panel de tu Business App.
2. Ubica el AI Employee que quieres configurar.
3. Haz clic en el botón **Configure** junto al nombre del empleado.

:::tip
Si no ves el botón Configure, verifica que tengas los permisos necesarios para modificar la configuración del AI Employee.
:::

## Paso 2: Abre la sección de Capacidades

1. En la página `Configure` del AI Employee, desplázate hacia abajo hasta la sección `Capabilities`.
2. Haz clic para expandir la sección si está contraída.
3. Verás una lista de las capacidades ya agregadas al AI Employee.

## Paso 3: Agrega las capacidades que quieras

Las capacidades que aparecen en la sección Capabilities están activas. Para agregar una nueva:

1. Haz clic en **+ Add a capability**.
2. **Revisa la descripción de la capacidad** para entender qué hace.
3. **Agrega instrucciones específicas** (opcional) para personalizar cómo se comporta la capacidad.

Para quitar una capacidad, haz clic en el menú de tres puntos junto a ella y selecciona **Remove**.

### Configuraciones comunes de capacidades

#### Lead Capture
- **Qué hace**: Recopila automáticamente la información de contacto de clientes potenciales
- **Instrucciones recomendadas**: 
  ```
  Always ask for name, email, and phone number. 
  Qualify leads by asking about budget and timeline.
  Be friendly but persistent in gathering complete information.
  ```

#### Appointment Booking
- **Qué hace**: Programa reuniones usando tu calendario conectado
- **Requisitos previos**: Asegúrate de que tu calendario esté conectado en la configuración de tu Business App
- **Instrucciones recomendadas**:
  ```
  Check availability for the next 2 weeks.
  Confirm all details before booking: date, time, service type, duration.
  Send confirmation details to the customer.
  ```

#### Communication Style
- **Qué hace**: Mantiene un tono y una voz de marca consistentes
- **Instrucciones recomendadas**:
  ```
  Use a professional but friendly tone.
  Always end responses with "How else can I help you today?"
  Refer to our company as "we" and "our team."
  ```

## Paso 4: Agrega objetivos e instrucciones (opcional)

Para tener un control más preciso sobre el comportamiento de la capacidad:

1. **Haz clic en el enlace "Add Instructions"** debajo de cada capacidad habilitada.
2. **Escribe instrucciones claras y específicas** que definan:
   - Cuándo usar la capacidad
   - Qué información recopilar
   - Cómo responder en distintos escenarios
   - Qué hacer si algo sale mal

### Cómo escribir instrucciones efectivas

**Buen ejemplo:**
```
Lead Capture: Only collect contact information after the customer shows interest in our services. Always ask for name, email, and phone. If they're hesitant to share information, explain that it helps us provide better service.
```

**Mal ejemplo:**
```
Get contact info when needed.
```

:::tip Buenas prácticas para las instrucciones
- **Sé específico sobre las condiciones que activan la capacidad** - Dile a la IA exactamente cuándo actuar
- **Incluye pautas para el manejo de errores** - ¿Qué debería pasar si algo sale mal?
- **Usa un lenguaje claro y accionable** - Escribe como si estuvieras capacitando a un nuevo empleado
- **Muestra ejemplos, no solo reglas** - "Por ejemplo, di: 'Con gusto te ayudo con eso.'"
- **Sé conciso** - Las instrucciones cortas y específicas suelen funcionar mejor que los párrafos largos
- **Prueba e itera** - Prueba distintas formas de redactar y observa cuál da mejores resultados
:::

### Adaptar una capacidad a canales específicos

Tu AI Employee sabe en qué canal está respondiendo, por lo que las instrucciones de una capacidad pueden hacer referencia al canal por su nombre. Esto es útil cuando una tarea debe comportarse de manera diferente según el canal por el que te contacta el cliente, por ejemplo, recopilando menos datos para la captura de leads por SMS que por correo electrónico:

```
When capturing a lead on SMS, ask for name and phone number only, one question at a time, and keep each message short.
When capturing a lead by email, you can ask for name, email, phone, and preferred appointment time in a single reply.
```

Para obtener orientación sobre el comportamiento específico por canal en todo el AI Employee, consulta [Ajustar las respuestas por canal](../ai-workforce/index.mdx#adjust-responses-by-channel).

#### Por qué importan los ejemplos

Incluir ejemplos en tus instrucciones ayuda a que tu IA entienda exactamente lo que quieres:

**Sin ejemplos:**
```
Be friendly when greeting customers.
```

**Con ejemplos:**
```
Be friendly when greeting customers. For example: "Hi there! Thanks for reaching out. How can I help you today?"
```

La segunda versión le da a la IA un patrón concreto que seguir, lo que genera resultados más consistentes.

### Patrones de instrucciones que funcionan

Usa estos patrones probados al escribir instrucciones de capacidades:

#### Lógica condicional: "Si X, entonces Y"
```
If the customer asks about pricing: Share our standard rates and offer to send a detailed quote.
If they mention a competitor: Acknowledge their research and focus on our unique benefits.
```

#### Pasos secuenciales: "Primero... Luego... Finalmente..."
```
First, greet the customer warmly.
Then, ask what brings them to our site today.
Finally, based on their answer, offer relevant help or information.
```

#### Establecimiento de límites: "Solo... cuando..." / "Nunca... a menos que..."
```
Only ask for contact information when the customer shows clear buying interest.
Never transfer calls unless the customer specifically requests to speak with someone else.
```

#### Manejo de errores: "Si... no puede..."
```
If you can't find the answer in the knowledge base, say: "I don't have that specific information, but I'd be happy to connect you with someone who does."
```

## Paso 5: Guarda y prueba tu configuración

1. Haz clic en `Save Changes` al final de la página `Configure`.
2. **Prueba las capacidades** iniciando una conversación con tu AI Employee.
3. **Prueba distintos escenarios** para asegurarte de que las capacidades se activen correctamente:
   - Haz preguntas que deberían activar el acceso a la base de conocimientos
   - Expresa interés en los servicios para probar la captura de leads
   - Solicita una cita para probar la función de programación

### Lista de verificación de pruebas

- [ ] Las capacidades se activan en los momentos adecuados
- [ ] La información requerida se recopila antes de continuar
- [ ] La IA sigue tus instrucciones personalizadas
- [ ] Los escenarios de error se manejan correctamente
- [ ] La experiencia del cliente se siente natural y útil

## Paso 6: Supervisa y ajusta

Después de la configuración inicial:

1. **Revisa los registros de conversación** para ver cómo se desempeñan las capacidades en interacciones reales.
2. **Recopila comentarios de los clientes** sobre su experiencia.
3. **Ajusta las instrucciones** según lo que aprendas.
4. **Agrega o quita capacidades** a medida que evolucionen las necesidades de tu negocio.

## Solución de problemas comunes

### La capacidad no se activa
- **Revisa las condiciones de activación**: Asegúrate de que las solicitudes del cliente coincidan con los parámetros de la capacidad
- **Revisa las instrucciones**: Asegúrate de que los criterios de activación sean claros
- **Prueba con distintas formas de redactar**: Prueba distintas maneras en que los clientes podrían hacer solicitudes

### No se recopila la información
- **Verifica los campos requeridos**: Asegúrate de que la capacidad sepa qué información recopilar
- **Revisa la claridad de las instrucciones**: Haz explícitos los requisitos de recopilación
- **Prueba el flujo de la conversación**: Recorre el proceso como lo haría un cliente

### Las capacidades entran en conflicto
- **Revisa las prioridades de las capacidades**: Algunas capacidades pueden anular a otras
- **Aclara las instrucciones**: Haz más específicas las condiciones de activación
- **Quita las capacidades en conflicto**: Quita las capacidades que interfieren y vuelve a agregarlas una vez que las instrucciones estén ajustadas

## Consejos de configuración avanzada

### Combinación de capacidades
Habilita varias capacidades complementarias que trabajen juntas:
- Lead Capture + Appointment Booking para negocios de servicios
- Knowledge Base + Communication Style para escenarios de soporte
- Product Lookup + Lead Capture para interacciones de venta

### Implementación gradual
Comienza con las capacidades esenciales y agrega más con el tiempo:
1. **Semana 1**: Habilita el estilo de comunicación básico y la base de conocimientos
2. **Semana 2**: Agrega la captura de leads una vez que la IA responda bien
3. **Semana 3**: Incluye la programación de citas después de probar el flujo de leads
4. **Semana 4 en adelante**: Agrega capacidades personalizadas para necesidades especializadas

### Monitoreo de rendimiento
Haz seguimiento de las métricas clave para medir la efectividad de las capacidades:
- Tasa de activación (con qué frecuencia se activan las capacidades)
- Tasa de finalización (recopilación exitosa de información)
- Puntuaciones de satisfacción del cliente
- Tasas de conversión para la captura de leads

## Próximos pasos

- **Crea capacidades personalizadas**: [Aprende a crear capacidades personalizadas](./creating-custom-capabilities) para necesidades comerciales especializadas
- **Prompting avanzado**: Explora técnicas de ingeniería de prompts para mejorar el rendimiento de las capacidades
- **Configuración de integraciones**: Conecta sistemas externos para mejorar la funcionalidad de las capacidades

¿Necesitas ayuda con configuraciones de capacidades específicas? Consulta nuestra [guía de solución de problemas](#troubleshooting-common-issues) o contacta a soporte para obtener asistencia personalizada.

<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'rgba(60, 154, 99, 0.08)', border: '1px solid rgba(60, 154, 99, 0.35)', borderRadius: '8px', padding: '14px 18px', margin: '16px auto', width: 'fit-content', maxWidth: '100%', textAlign: 'center'}}>
  <span style={{flexShrink: 0}}><GraduationCapIcon size={26} /></span>
  <span style={{fontSize: '14px', color: 'var(--ifm-font-color-base)', textAlign: 'center'}}>
    ¿Nuevo en cómo funcionan los AI Employees? Toma el curso <a href="/learn/ai-foundations" style={{color: '#3C9A63', fontWeight: 600}}>AI foundations</a> en Vendasta Learn — Principiante, 6 lecciones.
  </span>
</div>

