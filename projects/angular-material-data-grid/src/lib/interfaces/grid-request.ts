import GridFilterItemInterface from './grid-filter-item';

export default interface GridRequestInterface {
  entity?: any;
  page?: number;
  perPage?: number;
  filters?: GridFilterItemInterface[];
  sort?: null | '' | undefined | 'desc' | 'asc';
  sortField?: null | '' | undefined | string;
}
