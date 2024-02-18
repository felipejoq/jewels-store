import {filterSchema} from "./filter.schema.js";

export class FiltersDto {
  constructor({filters, values}) {
    this.filters = filters;
    this.values = values;
  }

  static create({filtersQuery}) {

    let {
      precio_min = 0,
      precio_max = Number.MAX_SAFE_INTEGER,
      categoria = 'aros',
      metal = 'oro'
    } = filtersQuery;

    const result = filterSchema.validate({precio_min, precio_max, categoria, metal});

    if (result.error)
      return [result.error.message, null];

    const {filters, values} = this.activesFilters({filtersQuery});

    return [null, new FiltersDto({filters, values})];
  }

  static activesFilters({filtersQuery}) {
    const values = [];
    const filtersAllow = [
      {key: 'precio_min', sql: 'precio >= $1'},
      {key: 'precio_max', sql: 'precio <= $2'},
      {key: 'categoria', sql: 'categoria = $3'},
      {key: 'metal', sql: 'metal = $4'}
    ];

    // Inicializamos el contador de parámetros SQL
    let paramCounter = 1;

    const filters = filtersAllow.filter(filter => {
      if (filtersQuery[filter.key] !== undefined) {
        // Reemplazamos el número de parámetro SQL
        const sqlWithParam = filter.sql.replace(/\$\d+/, `$${paramCounter}`);
        values.push(filtersQuery[filter.key]);
        filter.sql = sqlWithParam;
        // Incrementamos el contador de parámetros SQL solo si se agrega un filtro
        paramCounter++;
        return true;
      }
    });

    return {
      filters,
      values,
    }
  }


}