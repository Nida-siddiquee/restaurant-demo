export interface Postcode {
  code: string;
  label: string;
}

export interface PostcodesState {
  items: Postcode[];
  loading: boolean;
  error: string | null;
}
