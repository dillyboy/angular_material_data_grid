export interface ButtonConfigType {
    /**
     * display - Button Text
     */
    display: string;
    /**
     * icon - Button icon from the material icons list
     *        https://material.io/resources/icons
     */
    icon: string;
    /**
     * disableField - If there is a reason to disable a given button based on a certain calculation or a certain logic, a row's
     *                field can be given which will contain a boolean value. If it is true this button will get disabled.
     *                Eg: a user object may have a field called 'archived' which if true this button can be disabled.
     */
    disableField?: string;
}
