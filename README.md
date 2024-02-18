# 👨‍💻 Desafío "Tienda de joyas"

En este desafío se ponen a prueba conocimientos de construcción
de API RESTful "Avanzados". En este caso se incluyen características
tales como: Respuesta con formato "HATEOAS" y filtros dinámicos.

Todos los requisitos de este desafío quedan expresados en [este archivo PDF](01_desafio_tienda_joyas.pdf) 
donde se pueden ver todos los requerimientos para aprobar o no.

## 📚 Servicios:
> Obtiene listado de Joyas en formato "HATEOAS".

```bash
GET /joyas?limits=3&page=2&order_by=stock_ASC
```

> Obtiene una joya por ID

```bash
GET /joyas/joya/1
```

> Obtiene joyas según filtros, puede ser uno o todos, estos son todos los permitidos.

```bash
GET /joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

## 🚀 Desplegar en local:
- Requisitos:
  - PostgreSQL 14 o superior.
  - Node.js 18 o superior.

1. Clonar el repositorio

```bash
git clone https://github.com/felipejoq/jewels-store.git
```

2. Navegar a la carpeta del proyecto

```bash
cd jewels-store
```

3. Instalar los módulos de node

```bash
npm install
```
4. Renombrar el archivo .env.example a .env y editar sus valores

```dotenv
PORT=3000
## Config default for pg package -> https://github.com/brianc/node-postgres
PGUSER=
PGHOST=
PGPASSWORD=
PGDATABASE=
PGPORT=5432
```

5. Ejecutar el proyecto:

```bash
npm run dev
```

