import { InsertResult } from 'typeorm';

// RETURNING clause not supported by mysql so using this function to retrieve inserted data id for extra query to get actual data
export const getInsertedItemId = (insertResult: InsertResult) =>
  insertResult.identifiers[0].id;
