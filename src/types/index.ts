export interface address {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}
export interface dataItem {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  address: address;
}

export interface filterParamsTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface sortParams {
  type: string;
  orientation: string;
}

export type useFetchingReturn = [Function, boolean, string];

export type sorterParameters = string | undefined;
