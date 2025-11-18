# Demo Práctica de Pipeline CI/CD

## Objetivo

El propósito de este repositorio es demostrar un ciclo CI/CD (Integración Continua / Despliegue Continuo) básico y funcional. El pipeline automatizado se encarga de:

- Verificar el código mediante pruebas unitarias.
- Construir un paquete (package) distribuible.
- Publicar dicho paquete como un artefacto descargable del pipeline.

## Estructura del Repositorio

```
/
├── .github/workflows/  
│   └── main-pipeline.yml  
├── lib/  
│   └── suma.js  
├── tests/  
│   └── suma.test.js  
├── .gitignore  
├── index.js  
├── package.json  
└── README.md  
```

## Explicación del Ciclo CI/CD

Este pipeline sigue las fases fundamentales de CI/CD.

### Trigger (Disparador):

El pipeline se inicia automáticamente cuando:

- Se hace push a la rama main.
- Se abre o actualiza un pull_request hacia la rama main.

### CI: Integración Continua (Job build-and-test)

- **Checkout**: El runner clona el repositorio.  
- **Setup**: Se configura Node.js v18.  
- **Install**: Se instalan dependencias con:

```
npm ci
```

- **Test**: Se ejecutan pruebas unitarias:

```
npm test
```

### Build (Construcción)

El build genera el paquete `.tgz` con:

```
npm run build
```

Esto ejecuta internamente:

```
npm pack
```

### CD: Entrega Continua

El pipeline sube el archivo `.tgz` como artefacto.

---

## Contenido Completo de los Archivos

### Archivo Workflow

**Ruta:** `.github/workflows/main-pipeline.yml`

```yaml
name: Tarea 7 CI/CD - Test & Package
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del Repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js v18
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Instalar Dependencias
        run: npm ci

      - name: Ejecutar Pruebas
        run: npm test

      - name: Construir Paquete
        run: npm run build

      - name: Subir Artefacto
        uses: actions/upload-artifact@v4
        with:
          name: demo-package
          path: '*.tgz'
```

---

### package.json

```json
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
    "url": "git+https://github.com/TU_USUARIO/TU_REPO.git"
  }
}
```

---

### lib/suma.js

```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

---

### tests/suma.test.js

```javascript
const sum = require('../lib/suma');

describe('Función de Suma', () => {
  test('2 + 3 debe ser 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('10 + 0 debe ser 10', () => {
    expect(sum(10, 0)).toBe(10);
  });

  test('-5 + 10 debe ser 5', () => {
    expect(sum(-5, 10)).toBe(5);
  });
});
```

---

### index.js

```javascript
const sum = require('./lib/suma');

console.log('--- Demostración Local ---');
console.log('Calculando 2 + 3 =', sum(2, 3));
console.log('--------------------------');
```

---

### .gitignore

```
/node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.tgz
.DS_Store
Thumbs.db
```

---

## Cómo Ejecutar Localmente

Instalar dependencias:

```
npm install
```

Ejecutar pruebas:

```
npm test
```

Construir el paquete:

```
npm run build
```

Ejecutar script principal:

```
npm start
```

---

## Verificación del Artefacto

Una vez ejecutado el pipeline:

1. Ve a **Actions**.
2. Abre el workflow ejecutado.
3. En **Artifacts**, descarga `demo-package`.

## Referencias o metodos de apendizaje que se hizo esto
1. https://docs.github.com/en/actions
2. https://docs.npmjs.com/cli/v10/commands/npm-pack