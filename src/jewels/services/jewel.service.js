import {query} from "../../database/db.js";
import {
  GET_JEWEL_BY_ID,
  GET_JEWELS_BY_FILTERS,
  GET_JEWELS_PAGINATE_SORT,
} from "../../database/queries/jewels.queries.js";
import {CustomError} from "../../config/errors/custom.errors.js";

export class JewelService {

  constructor() {
  }

  async getJewels({page, limits, columnName, orderDirection}) {

    const [results] = await Promise.all([
      query(GET_JEWELS_PAGINATE_SORT({columnName, orderDirection}), [(page - 1) * limits, limits]),
    ]);

    const jewels = results?.rows;

    return this.hateoasResponse({jewels});
  }

  async getJewelsByFilters({filters, values = []}) {

    const [result] = await Promise.all([
      query(GET_JEWELS_BY_FILTERS({filters}), values),
    ]);

    return result?.rows;
  }

  async getJewelById({jewelId}) {

    const [results] = await Promise.all([
      query(GET_JEWEL_BY_ID(), [jewelId])
    ]);

    const jewel = results?.rows.at(0);

    if (!jewel)
      throw CustomError.notFound(`No existe una joya con el id ${jewelId}`);

    return jewel;
  }

  hateoasResponse({jewels}) {
    let stockTotal = 0;

    const result = jewels.map(({id, nombre, stock}) => {
      stockTotal += stock;
      return {
        name: nombre,
        href: `/joyas/joya/${id}`
      }
    })

    return {
      totalJoyas: jewels.length,
      stockTotal,
      result,
    }
  }

}