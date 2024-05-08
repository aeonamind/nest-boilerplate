export enum ApiErrorMessage {
  BadRequest = 'Please enter a valid input',
  NotFound = 'Item can not be found',
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
  InternalServerError = 'Internal server error',
}

export enum ApiSuccessMessage {
  Ok = 'Get Successfully',
  Created = 'Create successfully',
  Updated = 'Update successfully',
  Deleted = 'Delete successfully',
}

export enum BadRequestMessage {
  Page = 'Page param must be valid number',
  Limit = 'Limit param must be valid number',
  ExceedArrayLength = 'Query Array is over the limit',
}
