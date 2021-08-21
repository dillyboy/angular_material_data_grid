import GridHeadingInterface from './grid-heading-type';

export default interface ChildGridConfigType {

    headings: GridHeadingInterface[];
    url: string;
    entity: any;
    serverSidePagination: boolean;
}
