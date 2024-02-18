import Joi from 'joi';
// let { title, description, price, active, user, files } = body;

export const paginateSchema = Joi.object({
  page: Joi.number().min(1)
    .error(new Error('Page must be a number greater than zero')),
  limits: Joi.number().min(1)
    .error(new Error('Limit must be a number greater than zero')),
  order_by: Joi.string().valid('stock_ASC', 'stock_DESC')
    .error(new Error('Order_by should be either stock_ASC or stock_DESC'))
});