export const GET_JEWELS_BY_FILTERS = ({filters}) => {

  const clausulaWhere = filters.length > 0 ? 'WHERE ' + filters.map(filtro => filtro.sql).join(' AND ') : '';

  return `
        SELECT *
        FROM inventario
        ${clausulaWhere}
      `;
};

export const GET_JEWEL_BY_ID = () => `
SELECT * FROM inventario WHERE id = $1
`;

export const GET_JEWELS_PAGINATE_SORT = ({columnName, orderDirection}) => `
SELECT id, nombre, stock
FROM inventario
ORDER BY ${columnName} ${orderDirection}
OFFSET $1
LIMIT $2
`

export const GET_JEWELS_QUERY_HATEOAS = ({columnName, orderDirection}) => `
WITH sorted_results AS (
  SELECT id, nombre, stock
  FROM inventario
  ORDER BY ${columnName} ${orderDirection}
  OFFSET $1
  LIMIT $2
),
total_stock AS (
  SELECT SUM(stock) AS stockTotal
  FROM sorted_results
),
total_jewels AS (
  SELECT COUNT(*) AS totalJoyas
  FROM sorted_results
),
formatted_results AS (
  SELECT json_build_object(
             'name', nombre,
             'href', '/joyas/joya/' || id
         ) AS result
  FROM sorted_results
)
SELECT tj.totalJoyas, ts.stockTotal, json_agg(result) AS results
FROM formatted_results
CROSS JOIN total_stock ts
CROSS JOIN total_jewels tj
GROUP BY tj.totalJoyas, ts.stockTotal
`;