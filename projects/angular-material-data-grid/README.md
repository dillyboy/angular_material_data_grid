# Advanced Angular Material Data Grid System

#### Inspired by Kendo UI Grid

This is an advanced data grid which is free to use with features and customizability only available on paid data grids.

![Sample UI](https://angular-grid.onrender.com/assets/grid_background.png)

#### Features

- Easy to integrate server-side pagination (Tested with very large data sets)
- Built in virtual scrolling
- Advanced multi-filtering features
- Customizable theming
- Optional columns with re-ordering
- Master Detail Grid

The initial purpose of creating this data grid was to make it easy for developers to easily create highly advanced data grids with server-side pagination along with multiple filters and sorting with minimum effort and time. (Client Side Pagination is also present.) In order to make this possible a tight integration between the back-end data-source and the front-end component should be agreed upon. This gives the ability to stay focused on advanced functionality and the creation of data grids with only configurations while staying opinionated. Moreover, the solutions provided by reputed vendors were expensive which makes open-source software more attractive to many clients. This product is 100% open source. Check [Repository here](https://github.com/dillyboy/angular_material_data_grid).

Refer to the [Documentation](https://angular-grid.onrender.com/) page.

<hr />

#### Installation

1. Install Angular Material

   - `ng add @angular/material`

2. Install Angular Material Data Grid

   - `npm i angular-material-data-grid@0.6.1`\
     \
     or if your project uses Angular 14.0.0 and above

   - `npm i angular-material-data-grid`

3. Import Module

   - `import { AngularMaterialDataGridModule } from 'angular-material-data-grid';`

   - `imports: [ ..,   AngularMaterialDataGridModule]`

4. Usage (Basic)
   ###### HTML
   - <code><amdg-grid <br>
     &nbsp;&nbsp;&nbsp;&nbsp;[headings]="headings"<br>
     &nbsp;&nbsp;&nbsp;&nbsp;[url]="url"<br>
     &nbsp;&nbsp;&nbsp;&nbsp;[serverSidePagination]="true"<br>
     &nbsp;&nbsp;&nbsp;&nbsp;(responseEmit)="responseReceived($event)"><br>
     </amdg-grid></code>
   ###### TypeScript
   [Check here](https://angular-grid.onrender.com/gettingStarted/installation)
