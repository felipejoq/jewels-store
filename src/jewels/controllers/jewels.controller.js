import {PaginationDto} from "../dtos/paginate/paginate.dto.js";
import {handleError} from "../../config/errors/handle.errors.js";
import {FiltersDto} from "../dtos/filters/filter.dto.js";
import {CustomError} from "../../config/errors/custom.errors.js";

export class JewelsController {
  constructor(jewelService) {
    this.jewelService = jewelService;
  }

  getJewels = (req, res) => {

    const queryParams = req.query;

    const [error, paginateDto] = PaginationDto.create({queryParams})

    if (error) return res.status(400).json({error});

    this.jewelService.getJewels({...paginateDto})
      .then(data => res.json(data))
      .catch(error => handleError(error, res));
  }

  getJewelById = (req, res) => {
    const {jewelId} = req.params;

    if (isNaN(jewelId) || jewelId < 1)
      return res.status(400).json({error: 'El id debe ser un número mayor que cero'});

    this.jewelService.getJewelById({jewelId})
      .then(data => res.json(data))
      .catch(error => handleError(error, res));
  }

  getJewelsByFilters = (req, res) => {

    if (Object.keys(req.query).length === 0)
      return handleError(CustomError.badRequest('Debe incluir al menos un filtro'), res);

    const filtersQuery = req.query;

    const [error, filtersDto] = FiltersDto.create({filtersQuery});

    if (error)
      return handleError(CustomError.badRequest(error), res)

    const {filters, values} = filtersDto;

    this.jewelService.getJewelsByFilters({filters, values})
      .then(data => res.json(data))
      .catch(error => handleError(error, res));
  }

}