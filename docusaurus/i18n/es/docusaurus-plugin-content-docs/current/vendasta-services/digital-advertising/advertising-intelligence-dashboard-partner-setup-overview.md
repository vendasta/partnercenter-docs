---
title: "Advertising Intelligence Dashboard"
sidebar_label: "Advertising Intelligence Dashboard"
description: "Descripción general de la configuración y el uso del Advertising Intelligence Dashboard: conectar cuentas, configurar métricas, hacer seguimiento de conversiones, y ver el rendimiento de la campaña."
---

Esta guía cubre la configuración y el uso del Advertising Intelligence Dashboard: conectar cuentas publicitarias, configurar métricas y conversiones, y ver el rendimiento de la campaña.

### 1. Conectar cuentas

*   Para comenzar, asegúrate de que las cuentas relevantes estén conectadas en la sección de configuración.
*   Una vez que una cuenta está conectada, puedes editar y ajustar las tarifas de gestión que se aplicarán al gasto publicitario.

:::note

Nuestro equipo de anuncios no actualiza las tarifas de gestión publicitaria. Estas deben ser actualizadas por un administrador del partner.

:::

#### Google Analytics

Se admiten propiedades estándar de GA4. Las subpropiedades de Google Analytics 360 no son compatibles y no se pueden conectar.

Una vez conectados, los datos de GA se extraen una vez al día de la columna Sessions (no Users). Los datos en Advertising Intelligence pueden retrasarse hasta 24 horas respecto al panel en vivo de GA. Se esperan pequeñas discrepancias entre GA y Advertising Intelligence.

#### CallRail

La conexión de CallRail requiere Advertising Intelligence Pro. Para conectar:

1. Ve a `Settings` → `Connections` → `CallRail`.
2. Ingresa tu clave de API de CallRail.
3. Selecciona una campaña.
4. Elige `Connect Account`.

Seleccionar una campaña es obligatorio. La conexión se quedará colgada si se omite este paso. Si no aparece ninguna lista de campañas, confirma que la cuenta esté en Advertising Intelligence Pro.

### 2. Control de métricas

*   Puedes personalizar las métricas que quieres mostrar en el panel.
*   Cada métrica proporciona una breve descripción cuando pasas el cursor sobre ella.
*   Puedes editar, agregar, o eliminar métricas según tu preferencia. Las seis métricas principales elegidas aparecerán en la página de resumen.
*   Las métricas predeterminadas en todas las cuentas también se pueden ajustar en `Partner Center` bajo `Marketplace` → [`Products`](https://partners.vendasta.com/marketplace/manage-products) → `Advertising Intelligence` → `Product Settings`.

### 3. Métricas de conversión

Las conversiones no se rastrean automáticamente: se requiere configuración tanto en la plataforma de anuncios como en la configuración de Advertising Intelligence.

:::info

Advanced Reporting debe estar habilitado antes de que las métricas de conversión estén disponibles. Ve a `Settings` → `Metrics` para confirmar. El seguimiento de conversiones requiere el nivel Pro/Advanced Reporting.

:::

*   Puedes designar ciertas acciones como conversiones. Por ejemplo, cualquier cosa marcada como cliente potencial se puede contar como una conversión.
*   Diferentes plataformas ofrecen métricas específicas. Por ejemplo, los píxeles de Facebook pueden hacer seguimiento de métricas de conversión, mientras que Google Ads puede hacer seguimiento de llamadas como una métrica separada.

#### Configurar conversiones para Google Ads

1. Define tus eventos de conversión en Google Ads Manager.
2. En Advertising Intelligence, ve a `Settings` → `Metrics`.
3. En `Conversion Source`, selecciona `Google Ads`.
4. En `Conversion Category`, selecciona los eventos de conversión que quieres rastrear.

**Por qué Advertising Intelligence puede mostrar menos conversiones que Google Ads**

Google Ads reporta dos cifras: *Conversions* y *All Conversions*. Advertising Intelligence solo extrae el valor de *Conversions*. Se espera una diferencia entre ambos.

#### Configurar conversiones para Facebook Ads, LocalAds, y TikTok

En Advertising Intelligence, ve a `Settings` → `Metrics` y selecciona las métricas de conversión que quieres rastrear para cada plataforma.

#### Informes de conversión de Meta Ads

Advertising Intelligence solo ingiere conversiones clasificadas como Lead de Meta. Un resultado de campaña se cuenta como una conversión cuando la campaña usa el objetivo `Lead Generation` (con un formulario instantáneo), o cuando el evento estándar Lead se rastrea a través de `Meta Pixel` o `Conversions API`.

Las campañas que usan otros objetivos, como Calls Placed, Link Clicks, o Engagement, mostrarán cero conversiones en Advertising Intelligence, incluso si Meta Ads Manager registra resultados para esas campañas.

:::note

Para campañas no optimizadas para Lead Generation, exporta los datos directamente desde Meta Ads Manager para complementar los informes de Advertising Intelligence.

:::

#### Solución de problemas: las conversiones siguen mostrando cero

Si las conversiones siguen mostrando cero después de completar la configuración:

1. Confirma que Advanced Reporting esté habilitado en `Settings` → `Metrics`.
2. Confirma que se hayan seleccionado un Conversion Source y una Category.
3. Borra la caché de tu navegador y actualiza el panel.

### 4. Cálculo de ROI

*   Esta función ayuda a estimar el retorno de la inversión.
*   El cálculo tiene en cuenta el valor promedio de venta y la tasa de cierre. Esto ayuda a los negocios a medir la efectividad de sus campañas.

### 5. Ver el panel

*   Si hay varias plataformas publicitarias conectadas, puedes ver los datos de cada plataforma por separado.
*   Puedes ajustar la vista de línea de tiempo y profundizar en métricas específicas para obtener información detallada.
*   Las métricas mostradas, como el gasto del cliente y el costo por clic, se ajustan según la tarifa de gestión previamente establecida.
*   Se enumeran todas las campañas. Para las campañas que se ejecutan en varias redes, puedes pasar el cursor para ver las redes. Al hacer clic en una campaña se proporciona información más detallada, incluido su estado actual (por ejemplo, si está activa o pausada).

## Preguntas frecuentes

<details>
<summary>¿Puedo extraer recibos de gasto publicitario de Advertising Intelligence?</summary>

No. Advertising Intelligence muestra datos de gasto publicitario extraídos de las plataformas conectadas pero no almacena ni proporciona recibos de facturación.

Para obtener recibos, inicia sesión en la sección de facturación de la plataforma publicitaria relevante (por ejemplo, Google Ads) o contacta directamente al equipo de soporte de la plataforma publicitaria.

Para ajustar cómo se muestra el gasto en el panel, ve a `Settings` → `Connections`, selecciona el menú de tres puntos junto a la conexión, y elige `Edit Management Fee`. Esto agrega un porcentaje de tarifa por encima de la cifra de gasto base.

</details>
