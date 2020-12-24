export const navigation = [
  {
    panelHeading: 'Getting Started',
    panelIcon: '',
    openWhen: [
      '/gettingStarted/demo',
      '/gettingStarted/introduction',
      '/gettingStarted/installation',
      '/gettingStarted/propertiesAndEvents'
    ],
    children: [
      {
        headingName: 'Demo',
        headingIcon: '',
        highLightWhen: ['/gettingStarted/demo'],
        route: '/gettingStarted/demo'
      },
      {
        headingName: 'Introduction',
        headingIcon: '',
        highLightWhen: ['/gettingStarted/introduction'],
        route: '/gettingStarted/introduction'
      },
      {
        headingName: 'Installation',
        headingIcon: '',
        highLightWhen: ['/gettingStarted/installation'],
        route: '/gettingStarted/installation'
      },
      {
        headingName: 'Properties & Events',
        headingIcon: '',
        highLightWhen: ['/gettingStarted/propertiesAndEvents'],
        route: '/gettingStarted/propertiesAndEvents'
      }
    ]
  },
  {
    panelHeading: 'Columns & Filters',
    panelIcon: '',
    openWhen: [
      '/columnsAndFilters/overview',
      '/columnsAndFilters/stringFilter',
      '/columnsAndFilters/multiSelectFilter',
      '/columnsAndFilters/tagFilter',
      '/columnsAndFilters/numericFilter',
      '/columnsAndFilters/dateRangeFilter',
      '/columnsAndFilters/urlBuilder',
      '/columnsAndFilters/buttonGroupBuilder'
    ],
    children: [
      {
        headingName: 'Overview',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/overview'],
        route: '/columnsAndFilters/overview'
      },
      {
        headingName: 'String Filter',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/stringFilter'],
        route: '/columnsAndFilters/stringFilter'
      },
      {
        headingName: 'Multi Select Filter',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/multiSelectFilter'],
        route: '/columnsAndFilters/multiSelectFilter'
      },
      {
        headingName: 'Tag Filter',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/tagFilter'],
        route: '/columnsAndFilters/tagFilter'
      },
      {
        headingName: 'Numeric Filter',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/numericFilter'],
        route: '/columnsAndFilters/numericFilter'
      },
      {
        headingName: 'Date Range Filter',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/dateRangeFilter'],
        route: '/columnsAndFilters/dateRangeFilter'
      },
      {
        headingName: 'URL Builder',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/urlBuilder'],
        route: '/columnsAndFilters/urlBuilder'
      },
      {
        headingName: 'Button Group Builder',
        headingIcon: '',
        highLightWhen: ['/columnsAndFilters/buttonGroupBuilder'],
        route: '/columnsAndFilters/buttonGroupBuilder'
      }
    ]
  },
  {
    panelHeading: 'Grid Features',
    panelIcon: '',
    openWhen: [
      '/features/columnControl',
      '/features/itemSelection',
      '/features/theming',
      '/features/fixedHeader',
      '/features/virtualScrolling'
    ],
    children: [
      {
        headingName: 'Column Control',
        headingIcon: '',
        highLightWhen: ['/features/columnControl'],
        route: '/features/columnControl'
      },
      {
        headingName: 'Item Selection',
        headingIcon: '',
        highLightWhen: ['/features/itemSelection'],
        route: '/features/itemSelection'
      },
      {
        headingName: 'Theming',
        headingIcon: '',
        highLightWhen: ['/features/theming'],
        route: '/features/theming'
      },
      {
        headingName: 'Fixed Header',
        headingIcon: '',
        highLightWhen: ['/features/fixedHeader'],
        route: '/features/fixedHeader'
      },
      {
        headingName: 'Virtual Scrolling',
        headingIcon: '',
        highLightWhen: ['/features/virtualScrolling'],
        route: '/features/virtualScrolling'
      }
    ]
  },
  {
    panelHeading: 'Examples',
    panelIcon: '',
    openWhen: [
      '/examples/serverBindGrid',
      '/examples/clientSidePagination',
      '/examples/reinitializeGrid',
      '/examples/preconfiguredFilters'
    ],
    children: [
      {
        headingName: 'Client Side Pagination',
        headingIcon: '',
        highLightWhen: ['/examples/clientSidePagination'],
        route: '/examples/clientSidePagination'
      },
      {
        headingName: 'Server Side Pagination',
        headingIcon: '',
        highLightWhen: ['/examples/serverBindGrid'],
        route: '/examples/serverBindGrid'
      },
      {
        headingName: 'Reinitialize Grid',
        headingIcon: '',
        highLightWhen: ['/examples/reinitializeGrid'],
        route: '/examples/reinitializeGrid'
      },
      {
        headingName: 'Preconfigured Filters',
        headingIcon: '',
        highLightWhen: ['/examples/preconfiguredFilters'],
        route: '/examples/preconfiguredFilters'
      }
    ]
  },
];
