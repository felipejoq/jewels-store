import Joi from 'joi';
// precio_min, precio_max, categoria, metal

export const filterSchema = Joi.object({
  precio_min: Joi.number().min(1)
    .error(new Error('precio_min debe ser un número mayor que cero')),
  precio_max: Joi.number().min(1)
    .error(new Error('precio_max debe ser un número mayor que cero')),
  categoria: Joi.string().min(1)
    .error(new Error('categoria should be string')),
  metal: Joi.string().min(1)
    .error(new Error('metal should be string')),
});