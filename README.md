# Dashboard inicial para GitHub Pages

Esta es una **plantilla con datos 100 % ficticios**. Aún **no está conectada a SharePoint**.

## Archivos
- `index.html`: página principal
- `estilos.css`: diseño adaptable a celular y computadora
- `app.js`: indicadores, filtros, gráficos y exportación CSV
- `datos/ejemplo.json`: 12 registros de demostración

## Publicación en GitHub Pages
1. Crea una cuenta en https://github.com si no tienes una.
2. Crea un repositorio público llamado `mi-dashboard`.
3. Sube **el contenido de esta carpeta** (no la carpeta contenedora), de modo que `index.html` quede en la raíz.
4. En el repositorio, entra a **Settings > Pages > Build and deployment > Source: Deploy from a branch**.
5. Selecciona **main** y **/(root)**; guarda los cambios.
6. Abre la URL que GitHub Pages muestre, normalmente `https://TU_USUARIO.github.io/mi-dashboard/`.

## Datos reales en SharePoint / OneDrive
**No** subas a GitHub el Excel privado, JSON que contenga datos confidenciales, nombres de pacientes, claves, tokens o información personal. GitHub Pages publica contenido web accesible al público.

Hay dos arquitecturas posibles:
- **Microsoft Graph + MSAL**: el navegador autentica al usuario con Microsoft Entra ID y solo después solicita datos a Graph con los permisos concedidos. Requiere registrar una SPA con URL de redirección HTTPS, permisos delegados apropiados y, si aplica, autorización del administrador del tenant. La implementación dependerá de la estructura del Excel y de las políticas de tu organización.
- **Power Automate + publicación de datos no sensibles**: un flujo lee una tabla del Excel y genera datos agregados, anonimizados y expresamente aptos para público. Solo esos datos aprobados se publican. Publicar JSON en GitHub **no** protege su contenido.

La conexión no está implementada en esta primera versión: primero hay que inspeccionar nombres de hojas/columnas y acordar el modelo de acceso.

## Prueba local
La lectura de `datos/ejemplo.json` usa `fetch`, así que abrir `index.html` con doble clic puede fallar. Puedes ejecutarlo con un servidor local (por ejemplo, `python -m http.server 8000` en esta carpeta) y visitar `http://localhost:8000`, o directamente usar GitHub Pages.

Se utiliza Chart.js por CDN, por lo que la visualización de gráficos requiere conexión a Internet.
