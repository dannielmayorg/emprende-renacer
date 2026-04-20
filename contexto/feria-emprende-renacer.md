# Feria de Emprendimiento — Emprende Renacer

> Documento de planificación y referencia. Última actualización: abril 2026.

---

## 1. Identidad del evento

**Nombre:** Emprende Renacer  
**Edición:** Tercera  
**Fecha:** 1 de mayo de 2026  
**Lugar:** CLL 168 #52-38, 10 AM  
**Organiza:** Frente de Emprendimiento de la iglesia Renacer IBR  
**Contexto:** Evento presencial dentro de la comunidad de la iglesia

---

## 2. Misión

La Feria de Emprendimiento nace de una necesidad real: ayudar a los emprendedores de la comunidad a darse a conocer. Queremos ser de bendición a nuestros hermanos, potenciar sus negocios y darles un espacio dentro de la iglesia para crecer, despegar y conectar con otras personas entre iglesias.

---

## 3. Propósito

Esta feria **no es un evento de ventas**. Es un espacio para que emprendedores que son hermanos, empresarios y negociadores se presenten ante su comunidad.

Si alguien compra, es una bendición. Si alguien no compra pero te conoce mejor, también es una bendición. El Señor usa este espacio — no como vitrina de clientes, sino como punto de encuentro entre hermanos que emprenden.

---

## 4. Perfiles de participante

### 4.1 Emprendedor establecido

Tiene un emprendimiento activo con trayectoria comprobada.

**Requisitos:**
- Mínimo 1 año de antigüedad
- Debe demostrar que está activo: historial de ventas, actividad por temporadas, soporte visible
- Completar el formulario de aplicación

---

### 4.2 Emprendedor por necesidad

Está comenzando o necesita este espacio para lanzarse.

**Requisitos:**
- *(Por definir)*

---

### 4.3 Jóvenes y niños

Menores de edad que quieren aprender a emprender.

**Objetivo:** Aprender a manejar plata, hacer un presupuesto y gestionar un negocio desde jóvenes.

**Requisitos:**
- Autorización firmada por padre o madre
- Acompañamiento de un adulto responsable durante toda la feria

---

## 5. Cronograma del evento (actividades públicas)

| Hora | Actividad |
|------|-----------|
| 9:50 AM | Oración de apertura |
| 10:00 AM | Apertura oficial de la feria |
| 10:05 AM | Saludo y recomendaciones |
| 10:10 AM | Música + proyección de imágenes de los emprendedores |
| 10:30 AM | Mini-cata de Café — Benema Café |
| 11:00 AM | Anuncio de la Rifa y dinámica de sellos |
| 11:30 AM | Mini-taller de Lettering |
| 12:10 PM | Presentación musical de Manuela |
| 12:20 PM | Música + visita a stands y Venta de Garaje |
| 1:00 PM | Mini-taller de Maquillaje Express |
| 1:40 PM | Dinámica: Adivina el precio real |
| 2:00 PM | Música + recordatorio de rifa y sellos |
| 2:30 PM | Actividad especial en zona de comidas |
| 3:20 PM | Presentación musical — alumno Escuela de música |
| 4:30 PM | Cierre de ventas y sorteo final |
| 5:00 PM | Agradecimiento y despedida |

---

## 6. Formularios de inscripción

### Formulario de participación como emprendedor
Embed de Typeform en la landing. Campos sugeridos:
- Nombre del emprendimiento, tiempo activo, productos, categoría
- Motivación para participar
- Necesidades logísticas (toma eléctrica, pantalla, etc.)
- Contacto

### Formulario para talleres
Separado. Para quienes quieran dictar un taller el día del evento.

> Ambos se configuran en `data/config.json` → campos `typeform_aplicacion` y `typeform_talleres`.

---

## 7. Directorio de emprendimientos

**35 emprendimientos** confirmados para la edición 2025/2026:

5 nueces · A tu abrigo · ACADEMIA LATIN GOSPEL 40 · Aguacates en casa.com · Biblia Fest · BIKEWAY Ropa deportiva · Belleza Radiante · Bye Spot · CASA CREA · CREW · Ciudad gospel · DNC Studio Collectives · DULCE TENTACIÓN · Diana López - Catsitter · Diseño Divino · El alfarero creaciones · FIREWOOD VIBES · HacksGabs · Honney Poppy's pastelería · Instrumentos de gracia by Erika Beltran · Les Colors · Los postres de Majito · MiniDonedos · Misión Turquía · Misión wayu · NUDOS PELUDOS · Pétalos de Chenille · Plantas Greenlove · RENAWARE · SM Accesorios · SOMBRILLAS GO · Sabores de mi tierra · ancla firme decoración · la colmena artesanal · purifil

---

## 8. Landing page

**URL de inscripción (CTA):** [lu.ma/58rbu5xv](https://lu.ma/58rbu5xv)  
**Repo GitHub:** [github.com/dannielmayorg/emprende-renacer](https://github.com/dannielmayorg/emprende-renacer)  
**Hosting:** Vercel (deploy automático desde GitHub)  
**Imágenes:** Cloudflare R2

Ver `DEPLOY.md` para toda la guía técnica de conexiones y despliegue.

---

## 9. Pendientes

| # | Ítem | Estado |
|---|------|--------|
| 1 | Conectar repo a Vercel | ⏳ Instalar GitHub App en vercel.com/new |
| 2 | Configurar Typeform aplicación | ⏳ Agregar ID en `config.json` |
| 3 | Configurar Typeform talleres | ⏳ Agregar ID en `config.json` |
| 4 | Requisitos emprendedor por necesidad | ⏳ Por definir |
| 5 | Descripción e info de contacto de cada emprendimiento | ⏳ Pendiente del equipo |
