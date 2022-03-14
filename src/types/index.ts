export interface address {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}
export interface dataItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  address: address;
}

export type useFetchingReturn = string | boolean | Function;
