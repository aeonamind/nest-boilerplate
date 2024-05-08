import { CatErrorCode } from '@core/constants';
import { IException } from '@core/exception';

export enum ErrorMessage {
  CatNotFound = 'Cat not found',
  CatNameExist = 'Cat name already exists',
}

export const catError = {
  catNotFound: {
    code: CatErrorCode.CAT_NOT_FOUND,
    message: ErrorMessage.CatNotFound,
  },
  catNameExist: {
    code: CatErrorCode.CAT_NAME_EXIST,
    message: ErrorMessage.CatNameExist,
  },
} satisfies { [key: string]: IException };
