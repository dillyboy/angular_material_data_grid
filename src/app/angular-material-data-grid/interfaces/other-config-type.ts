import { ButtonConfigType } from './button-list-config-type';
import { MultiSelectOptionsType } from './multi-select-options-type';

export interface OtherConfigType {
    /**
     * URL BUILDER
     * urlTemplate - This refers to the internal route (url) of the angular application. Eg: '/detail/:uid'. If the character ':' is
     *               used within the url provided the word next to it will be treated as a variable which will be replaced by the
     *               data retrieved. For example '/detail/:uid' will be replaced with '/detail/1' or '/detail/2' depending on the
     *               uid value
     */
    urlTemplate?: string;
    /**
     * URL BUILDER
     * queryParams - This is an optional object that can be provided to build query params. Eg: {userEmail: 'email'}
     *               The url may end like this '?userEmail=fzute0@reverbnation.com'
     */
    queryParams?: object;
    /**
     * URL BUILDER
     * openTab - An optional feature which determines if there is an open tab icon next to the url which will open the url in a
     *           separate tab in the browser (if clicked)
     */
    openTab?: boolean;



    /**
     * MULTI-SELECT CONFIGURATION
     * selectionMode - Multi-select can be configured to have a single selection or multiple selection of filter values
     */
    selectionMode?: 'single' | 'multiple';
    /**
     * MULTI-SELECT CONFIGURATION
     * source - Multi-select source can either be internal or external. If the source is internal;
     *          url, key and value fields are not needed. However, optionsObject is essential when the source is internal
     */
    source?: 'internal' | 'external';
    /**
     * MULTI-SELECT CONFIGURATION
     * optionsObject - This contains the filter values and their display names which is essential when source is internal
     */
    optionsObject?: MultiSelectOptionsType[];
    /**
     * MULTI-SELECT CONFIGURATION
     * url - The url is needed if the source is external
     */
    url?: string;
    /**
     * MULTI-SELECT CONFIGURATION
     * key - The key is needed if the source is external, this refers to the display name of the filter value
     */
    key?: string;
    /**
     * MULTI-SELECT CONFIGURATION
     * value - The value is needed if the source is external, this refers to the actual filter value
     */
    value?: string;




    /**
     * GRID ACTION BUTTONS CONFIGURATION
     * mainButton - if buttons array has more than one object (button) this is essential, This refers to to the menu button which will
     *              contain the buttons if there are more than one button. It uses MatMenu for this purpose
     */
    mainButton?: ButtonConfigType;
    /**
     * GRID ACTION BUTTONS CONFIGURATION
     * buttons - This array contains the button elements. If one button is there it will be displayed in the column, if multiple are
     *           there it will be inside the mat menu.
     */
    buttons?: ButtonConfigType[];
}
