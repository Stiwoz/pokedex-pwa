import { Action } from 'redux';

/**
 * Redux-like action to be executed
 * @prop {string} type The type of the action
 * @prop {boolean} error If the caller had an error (i.e. rejected Promise)
 * @prop {any} payload Any data to pass to the reducer (by convention if error is true, this should be an Error object)
 * @prop {any} meta Any metadata that the reducer should be aware of
 */
export interface IPlabAction extends Action {
  type: string;
  error?: boolean;
  payload?: any;
  meta?: any;
}
