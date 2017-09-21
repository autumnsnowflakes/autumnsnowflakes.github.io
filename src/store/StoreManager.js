const init = function () {
  let store = {};
  store.name = 'mithril';
  store.mode = 'landing'; // landing, project {id:}, resume, contact 
  store.sections = ['about', 'work', 'contact'];
  store.isSectionOpen = false;
  store.section = [];

  store.section.list = [{
      id: 1,
      name: 'about',
      title: 'About',
      menuList: [{
          text: "My Role",
          isAnchored: false,
          href: '#role'
        },
        {
          text: 'Research',
          isAnchored: false,
          href: '#research'
        },
        {
          text: 'Concepts',
          isAnchored: false,
          href: '#concepts'
        }, {
          text: 'Interaction Design',
          isAnchored: false,
          href: '#interaction'
        },
        {
          text: 'UI Design',
          isAnchored: false,
          href: "#ui-design"
        },
        {
          text: 'Learnings',
          isAnchored: false,
          href: '#learnings'
        }
      ]
    },
    {
      id: 2,
      name: 'work',
      title: 'Work',
      menuList: [{
          text: "My Role",
          isAnchored: false,
          href: '#role'
        },
        {
          text: 'Research',
          isAnchored: false,
          href: '#research'
        },
        {
          text: 'Ideation',
          isAnchored: false,
          href: '#ideation'
        }, {
          text: 'Concepts',
          isAnchored: false,
          href: '#concepts'
        },
        {
          text: 'Prototype',
          isAnchored: false,
          href: '#prototype'
        },
        {
          text: 'Learnings',
          isAnchored: false,
          href: '#learnings'
        }

      ]
    },
    {
      id: 3,
      name: 'contact',
      title: 'Contact',
      menuList: [{
          text: "My Role",
          isAnchored: false,
          href: '#role'
        },
        {
          text: 'Challenge',
          isAnchored: false,
          href: '#challenge'
        },
        {
          text: 'Research',
          isAnchored: false,
          href: '#research'
        }, {
          text: 'Interaction Design',
          isAnchored: false,
          href: '#interaction'
        },
        {
          text: 'UI Design',
          isAnchored: false,
          href: '#design'
        },
        {
          text: 'Learnings',
          isAnchored: false,
          href: '#learnings'
        }
      ]
    }
  ];


  store.isMobile = function () {
    return window.innerHeight > window.innerWidth;
  };
  store.isTab = function () {
    return window.innerHeight > window.innerWidth;
  };

  store.getCurrentSection = function (){
    this.sections[this.selectedSection];
  }



  return store;
}

export default init;