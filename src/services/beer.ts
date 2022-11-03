import httpStatus from 'http-status-codes';

import Beer, { BeerPayload, BeerSchema } from '../models/beer';
import ErrorFormatter from '../utils/ErrorHandler';

/**
 * Fetch all beers.
 *
 * @param {string} email
 * @returns {Promise<UserInfo>}
 */
export async function fetchAll(): Promise<BeerSchema> {
  try {
    const beers = await Beer.getAll();

    return beers;
  } catch (err) {
    const error = new ErrorFormatter({
      code: 'InternalServerError',
      message: 'OOPS! Something went wrong'
    }).construct();

    throw { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };
  }
}

export async function insertBeer(beerPayload: BeerPayload) {
  try {
    const [beer] = await Beer.insertData(beerPayload);

    return beer;
  } catch (err) {
    const error = new ErrorFormatter({
      code: 'InternalServerError',
      message: 'OOPS! Something went wrong'
    }).construct();

    throw { statusCode: httpStatus.INTERNAL_SERVER_ERROR, error };
  }
}
