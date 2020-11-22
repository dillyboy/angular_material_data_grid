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
      '/columnsAndFilters/dateRangeFilter'
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
      }
    ]
  }
];
