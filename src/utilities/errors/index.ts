import { AnyObject } from '../global-types';
import { ErrorCodeName, ErrorCode, ERROR_CODES } from './codes';

export class CError extends Error {
  _CERROR = true;
  code: ErrorCode;
  displayError?: string;
  meta?: AnyObject;

  constructor(message: string, meta?: AnyObject, code?: ErrorCodeName | ErrorCode) {
    super(message);
    this.meta = meta;
    if (!code) {
      this.code = 500;
    } else if (typeof code === 'string') {
      this.code = ERROR_CODES.find((error) => error[0] === code)?.[1] ?? 500;
    } else {
      this.code = code;
    }
  }
}
