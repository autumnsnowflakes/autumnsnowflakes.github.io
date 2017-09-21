const init = function () {
  let store = {};
  store.name = 'mithril';
  store.mode = 'landing'; // landing, project {id:}, resume, contact 
  store.sections = ['about', 'work', 'contact'];
  store.isSectionOpen = false;
  store.section = [];
  store.isLoading = true;
  store.section.list = [{
      id: 1,
      name: 'about',
      title: 'About',
      menuList: [{
          text: "Basic",
          isAnchored: false,
          href: '#basic'
        },
        {
          text: 'Education',
          isAnchored: false,
          href: '#education'
        },
        {
          text: 'Skills',
          isAnchored: false,
          href: '#skills'
        }, {
          text: 'Research',
          isAnchored: false,
          href: '#research'
        }
      ]
    },
    {
      id: 2,
      name: 'work',
      title: 'Work',
      menuList: [{
          text: "Writing",
          isAnchored: false,
          href: '#writing'
        },
        {
          text: 'Employment',
          isAnchored: false,
          href: '#employment'
        },
        {
          text: 'Social Work',
          isAnchored: false,
          href: '#social'
        }
      ]
    },
    {
      id: 3,
      name: 'contact',
      title: 'Contact',
      menuList: [{
        text: "Contact",
        isAnchored: false,
        href: '#contact'
      }]
    }
  ];


  store.isMobile = function () {
    return window.innerHeight > window.innerWidth;
  };
  store.isTab = function () {
    return window.innerHeight > window.innerWidth;
  };

  store.getCurrentSection = function () {
    return this.sections[this.selectedSection - 1];
  }



  return store;
}

export default init;