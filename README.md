Tarea 7.0: Demo Práctica de Pipeline CI/CD
Autor: [Tu Nombre Completo Aquí]

Objetivo

El propósito de este repositorio es demostrar un ciclo CI/CD (Integración Continua / Despliegue Continuo) básico y funcional. El pipeline automatizado se encarga de:

Verificar el código mediante pruebas unitarias.

Construir un paquete (package) distribuible.

Publicar dicho paquete como un "artefacto" descargable del pipeline.

Estructura del Repositorio

Para que este proyecto funcione, los archivos deben estar organizados en la siguiente estructura. El contenido de cada archivo se detalla más abajo.

/
├── .github/workflows/   
│   └── main-pipeline.yml  
│
├── lib/                 
│   └── suma.js           
│
├── tests/               
│   └── suma.test.js      
│
├── .gitignore           
├── index.js             
├── package.json         
└── README.md            


Explicación del Ciclo CI/CD

Este pipeline sigue las fases fundamentales de CI/CD:

Trigger (Disparador): El ciclo se inicia automáticamente cada vez que se hace un push a la rama main o se abre un pull_request hacia ella.

CI: Integración Continua (El Job build-and-test)

Checkout: El "runner" (servidor virtual de GitHub) clona el repositorio.

Setup: Se configura el entorno de ejecución (en este caso, Node.js v18).

Install: Se instalan las dependencias del proyecto de forma limpia usando npm ci.

Test: Se ejecutan las pruebas unitarias (npm test). Si alguna prueba falla, el pipeline se detiene aquí.

Build (Construcción):

Package: Se ejecuta el script npm run build, que a su vez usa npm pack. Este comando comprime el proyecto en un archivo .tgz.

CD: Entrega Continua (Parcial)

Upload Artifact: El pipeline toma el archivo .tgz generado y lo sube como un "Artefacto" de GitHub Actions.

Contenido Completo de Todos los Archivos

Para replicar este proyecto, crea los siguientes archivos y carpetas, y copia el contenido exacto que se proporciona a continuación.

1. Archivo de Workflow (GitHub Actions)

Ruta: .github/workflows/main-pipeline.yml

# Nombre descriptivo que aparecerá en la pestaña "Actions" de GitHub
name: Tarea 7 CI/CD - Test & Package

# --- DISPARADORES (Triggers) ---
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# --- TRABAJOS (Jobs) ---
jobs:
  build-and-test:
    runs-on: ubuntu-latest

   # --- PASOS (Steps) ---
    steps:
      - name: 1. Checkout del Repositorio
        uses: actions/checkout@v4
      - name: 2. Configurar Node.js v18
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: 3. Instalar Dependencias (npm ci)
        run: npm ci
      - name: 4. Ejecutar Pruebas (npm test)
        run: npm test
      - name: 5. Construir Paquete (npm run build)
        run: npm run build
      - name: 6. Subir Artefacto (Package)
        uses: actions/upload-artifact@v4
        with:
          name: demo-package
          path: '*.tgz'


2. Configuración del Proyecto (NPM)

Ruta: package.json

{
  "name": "t7-demo-cicd",
  "version": "1.0.0",
  "description": "Tarea 7 - Demostración de un pipeline CI/CD con GitHub Actions, Jest y NPM",
  "main": "index.js",
  "author": "[REEMPLAZA CON TU NOMBRE]",
  "license": "ISC",
  "scripts": {
    "start": "node index.js",
    "test": "jest --runInBand --verbose",
    "build": "npm pack"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "repository": {
    "type": "git",
    "url": "git+[https://github.com/](https://github.com/)[TU_USUARIO]/[TU_REPO].git"
  }
}

3. Lógica de la Aplicación

Ruta: lib/suma.js

// Una función simple para demostrar la lógica de negocio
function sum(a, b) {
  return a + b;
}
module.exports = sum;


4. Pruebas Unitarias

Ruta: tests/suma.test.js

const sum = require('../lib/suma'); // Corregido para apuntar a 'suma.js'

// Suite de Pruebas para la función 'sum'
describe('Función de Suma', () => {

  test('Prueba de suma positiva: 2 + 3 debe ser 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('Prueba de suma con cero: 10 + 0 debe ser 10', () => {
    expect(sum(10, 0)).toBe(10);
  });

  test('Prueba de suma con negativos: -5 + 10 debe ser 5', () => {
    expect(sum(-5, 10)).toBe(5);
  });

});


5. Archivo de Ejecución Local (Opcional)

Ruta: index.js

const sum = require('./lib/suma'); // Corregido para apuntar a 'suma.js'

console.log('--- Demostración Local ---');
console.log('Calculando 2 + 3 =', sum(2, 3));
console.log('--------------------------');


6. Archivo para Ignorar (Git)

Ruta: .gitignore

# Dependencias
/node_modules

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Artefactos de Build (nuestro paquete)
*.tgz

# Sistema Operativo
.DS_Store
Thumbs.db


💻 Cómo Ejecutar Localmente

Antes de subir el proyecto a GitHub, puedes verificar que todo funcione en tu propia máquina.

1. Instalar Dependencias:
Este comando lee package.json e instala jest.

npm install


2. Ejecutar Pruebas (Criterio 3):
Este comando ejecuta el script "test" que corre Jest. Debería pasar sin errores.

npm test


3. Construir el Paquete (Criterio 4):
Este comando ejecuta el script "build" (npm pack) y crea el archivo .tgz.

npm run build


4. Ejecutar el Script Principal (Opcional):
Esto corre index.js para una prueba simple.

npm start


Verificación del "Package" (Artefacto)

Una vez que hayas creado todos los archivos en sus carpetas correctas y los hayas subido a tu repositorio de GitHub:

Ve a la pestaña "Actions" en tu repositorio.

Haz clic en el workflow más reciente (ej: "Tarea 7 CI/CD").

En la página de resumen, busca la sección "Artifacts".

Allí verás el artefacto demo-package listo para descargar.