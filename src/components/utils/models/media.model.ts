export interface SagaAction {
    type: string,
    [type: string]: any
  }