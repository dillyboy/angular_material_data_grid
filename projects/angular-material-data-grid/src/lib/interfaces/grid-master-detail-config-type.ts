import ChildGridConfigType from './child-grid-config-type';

export default interface GridMasterDetailConfigInterface {

    /**
     * type - Master detail grid type determines if the row is expanded the container will
     *        contain a custom template or a child grid.
     */
    type: 'table' | 'html' | 'breakdown';

    /**
     * multipleExpansion - This allows multiple rows to be expanded at a given time or not
     */
    multipleExpansion: boolean;

    /**
     * template - If the Master detail grid type is 'html' pass the template through here
     */
    template?: string;

    /**
     * template - If the Master detail grid type is 'table' pass the child table configuration through here
     */
    childGrid?: ChildGridConfigType;
}
