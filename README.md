## Instalación
```sh
  // correr los siguientes comandos para inicializar el proyecto
  // instalación de dependencias del proyecto
  npm install

  // script para agregar la información para probar en la base de datos
  // por medio de typeorm-seeder
  npm run seed

  // ejecuta tests
  npm run test

  // ejecutar el proyecto de modo desarrollador
  npm run start:dev
```

Se agregan variables de entorno


```

PORT=8000

// url para consumir el mock del api para obtener el codigo del state para los repositorios
MOCK_URL=https://6354015eccce2f8c02013566.mockapi.io/api

// url de conección a la base de datos de postgres https://www.cockroachlabs.com/.
DATABASE_URL=
```

  Se crearón instalaciones y configuraciones necesarias para el formato del codigo
asi como para la forma de hacer commits según las buenas practicas.

- eslint
- lint-staged
- husky
- commitlint

## Lint-staged & husky

Estas herramientas nos ayudan para la creación de hooks que se compilan, para ejecutar las evaluaciones del código según las reglas del eslint, para que estas no sean subidas a los cambios de versionamiento del código

```json
npm i -D lint-staged
```

Crear en la raíz del proyecto el archivo ****`.lintstagedrc` y agregar las siguientes lineas de codigo**

```json
{
	// en caso de tener algun otro script que se requiera, se agrega al arreglo
	"*.js": ["eslint --fix"]
}
```

Instalar y configurar Husky

```json
// instalación
npm install husky -D

// creacion de script en el package.json
npm set-script prepare "husky install"

// correr el script
npm run prepare

// comando para generar hook que ejecutara el lint-staged
npx husky add .husky/pre-commit "npx lint-staged"
```

 Con esta configuración podremos detectar antes de subir cambios, que estos estén dentro de los parametros.

### CommitLint

Commitlint es una herramienta que nos ayuda a estandarizar los commits de forma convencional para seguir los patrones y mejores practicas para el versionamiento del código

```json
// instalación
npm i -D @commitlint/cli @commitlint/config-conventional

// script para generar el archivo de configuración
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

// script para generar hook en hosky para detectar el formato de los mensajes
// en los commits
npx husky add .husky/commit-msg
```

cambiar el undefined por 

npx --no-install commitlint --edit $1

Esta herramienta nos ayudara para mantener mejores practicas en los commits usando commits convencionales como los siguientes:

### feat

```bash
⚡️feat: <mensaje>

Utilízalo para expresar que un nuevo feature para el usuario ha sido creado, 
nunca para un cambio en el tooling, como en un script.  Ej:

feat: create login, authentication and authorization
```

### fix

```bash
🔨 fix: <mensaje>

Sirve para indicar que se hizo una reparación para el usuario. 
No se usa expresar algún arreglo hecho al tooling. Ej:

fix: hover state of the CTA button in the product page
```

### docs

```bash
📝 docs: <mensaje>

Explica un cambio hecho a la documentación del proyecto. Ej:

docs: include FAQ section in the README
```

### style

```bash
✏️ style: <mensaje>

Se usa para explicar que se ha hecho un cambio de estilo en el código directamente.
No se utiliza para modificación en producción. Ej:

style: add a missing semi-colon
```

### refactor

```bash
👷‍♂️ refactor: <mensaje>

Sirve para explicar que se hizo una refactorización al código. Ej

refactor: rename css variables to match the convention
```

### test

```bash
🧪 test: <mensaje>

Indica que se ha hecho un cambio en los tests, pero no una modificación en código
de producción. Ej

test: fix E2E tests for the dashboard page
```

### chore

```bash
🪨 chore: <mensaje>

Explica cambios que se han hecho en los tools. Ej:

chore: update webpack version
```

### feat|fix|docs|style|refactor|test|chore

```bash
🤯 {feat|fix|docs|style|refactor|test|chore}(scope): <mensaje>

Si quisieras ser más explicito, puedes agregar el scope del cambio, 
básicamente la sección que se esta modificando. Ej:

feat(home): add new hero section
```