export const navigation = [
  {
    panelHeading: 'Getting Started',
    panelIcon: '',
    openWhen: ['/gettingStarted/demo', '/gettingStarted/introduction', '/gettingStarted/installation', '/gettingStarted/basicUsage'],
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
        headingName: 'Basic Usage',
        headingIcon: '',
        highLightWhen: ['/gettingStarted/basicUsage'],
        route: '/gettingStarted/basicUsage'
      }
    ]
  }
];
