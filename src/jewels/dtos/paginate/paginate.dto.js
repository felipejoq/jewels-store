import {paginateSchema} from "./paginate.schema.js";

export class PaginationDto {

  constructor({page, limits, columnName, orderDirection}) {
    this.page = page;
    this.limits = limits;
    this.columnName = columnName;
    this.orderDirection = orderDirection;
  }

  static create({queryParams}) {

    let {page = 1, limits = 10, order_by = 'stock_ASC'} = queryParams;

    const result = paginateSchema.validate({page, limits, order_by});

    const columnName = order_by.split('_').at(0);
    const orderDirection = order_by.split('_').at(1);

    if (result.error)
      return [result.error.message, null];

    return [null, new PaginationDto({page, limits, columnName, orderDirection})];
  }

}