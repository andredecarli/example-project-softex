import { Response } from 'express';

import { BadRequestError } from './badRequestError.js';
import { NotFoundError } from './notFoundError.js';
import { UnauthorizedError } from './unauthorizedError.js';

export function handleErrors(res: Response, error: Error) {
  if (error instanceof BadRequestError
    || error instanceof NotFoundError
    || error instanceof UnauthorizedError) {
    res.status(error.statusCode);
  } else {
    res.status(500);
  }
}
