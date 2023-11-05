export enum SagasActions {
  LOAD_ALL_SERVICES = "LOAD_ALL_SERVICES",
  LOAD_SERVICE = "LOAD_SERVICE",
}

export function loadAllServices() {
  return {
    type: SagasActions.LOAD_ALL_SERVICES,
  };
}

export function loadService(id: string) {
  return {
    type: SagasActions.LOAD_SERVICE,
    payload: id,
  };
}
