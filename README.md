# Love & Relax Terapia

Landing page de una sola página para un servicio de masoterapia y estética
facial en Quilicura (RM, Chile). Sitio estático (HTML/CSS/JS, sin build),
pensado para campañas de Google Ads y Meta Ads: carga rápida, textos claros,
y un único objetivo de conversión — que la persona escriba por WhatsApp.

## Estructura

```
index.html      Contenido y estructura de la página
styles.css      Estilos (paleta, tipografía, animaciones de scroll)
script.js       Enlaces de WhatsApp, reveal al hacer scroll, nav, analítica opcional
favicon.svg     Ícono del sitio
site.webmanifest
robots.txt
sitemap.xml
vercel.json     Config de despliegue (headers, URLs limpias)
```

## Qué personalizar

- **Número de WhatsApp**: constante `WHATSAPP_NUMBER` en `script.js`.
- **Dominio real**: reemplazar `https://loveandrelax.cl/` en `index.html`,
  `robots.txt` y `sitemap.xml` una vez que se compre/conecte el dominio.
- **Google Ads / Meta Ads**: en `script.js`, completar `GA4_MEASUREMENT_ID`
  y/o `META_PIXEL_ID` cuando existan cuentas creadas. Mientras estén vacíos,
  no se carga ningún script de analítica (no se inventaron IDs).
- **Fotos y videos reales**: el diseño actual usa solo CSS/SVG (sin fotos de
  stock) para evitar un look genérico. Cuando lleguen las fotos/videos reales
  de la sesión, lo ideal es reemplazar `.hero__visual` en `index.html` por
  una imagen o video real (con buena compresión, formato `.webp`/`.mp4`).
- **Dirección exacta**: intencionalmente no está publicada (es el domicilio
  particular). Se menciona solo la comuna (Quilicura) y se indica que la
  dirección se confirma por WhatsApp al agendar.

## Despliegue

Proyecto estático, sin build step. En Vercel: framework preset "Other",
Root Directory = raíz del repo. Cualquier push a `main` despliega
automáticamente.

## Ideas para siguientes etapas

- Formulario simple de reserva (nombre + horario preferido) como alternativa
  a WhatsApp para quienes prefieren no escribir directo.
- Sección de testimonios reales una vez existan reseñas de clientas.
- Dominio propio + Google Business Profile para reforzar las campañas de Ads.
