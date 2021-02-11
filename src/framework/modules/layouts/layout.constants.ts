export const Layouts = {
  L1: {
    name: '2 Column Layout(2:1)',
    panels: ['L1P1', 'L1P2'],
    panelConfig: {
      L1P1: {
        css: 'col-md'
      },
      L1P2: {
        css: 'col-md-auto'
      }
    }
  },
  L2: {
    name: '3 Column Layout(1:1:1)',
    panels: ['L2P1', 'L2P2', 'L2P3'],
    panelConfig: {
      L2P1: {
        css: 'col-md-4'
      },
      L2P2: {
        css: 'col-md-4'
      },
      L2P3: {
        css: 'col-md-4'
      }
    }
  },
  L3: {
    name: '2 Column Layout(1:1)',
    panels: ['L3P1', 'L3P2'],
    panelConfig: {
      L3P1: {
        css: 'col-md-6'
      },
      L3P2: {
        css: 'col-md-6'
      }
    }
  },
  L4: {
    name: 'Single Column Layout',
    panels: ['L4P1'],
    panelConfig: {
      L4P1: {
        css: 'col-12'
      }
    }
  },
  L5: {
    name: '3 Column Layout(1:2)',
    panels: ['L5P1', 'L5P2'],
    panelConfig: {
      L5P1: {
        css: 'col-md-4'
      },
      L5P2: {
        css: 'col-md-8'
      }
    }
  },
  L6: {
    name: '3 Column Layout(1:2:1)',
    panels: ['L6P1', 'L6P2', 'L6P3'],
    panelConfig: {
      L6P1: {
        css: 'col-md-3'
      },
      L6P2: {
        css: 'col-md-6'
      },
      L6P3: {
        css: 'col-md-3'
      }
    }
  },
  L7: {
    name: '2 Column Layout(3:1)',
    panels: ['L7P1', 'L7P2'],
    panelConfig: {
      L7P1: {
        css: 'col-md-9'
      },
      L7P2: {
        css: 'col-md-3'
      }
    }
  },
  L8: {
    name: '2 Column Layout(1:3)',
    panels: ['L8P1', 'L8P2'],
    panelConfig: {
      L8P1: {
        css: 'col-md-3'
      },
      L8P2: {
        css: 'col-md-9'
      }
    }
  },
  L9: {
    name: '3 Column Layout(1:1:2)',
    panels: ['L9P1', 'L9P2', 'L9P3'],
    panelConfig: {
      L9P1: {
        css: 'col-md-3'
      },
      L9P2: {
        css: 'col-md-3'
      },
      L9P3: {
        css: 'col-md-6'
      }
    }
  },
  L10: {
    name: '3 Column Layout(2:1:1)',
    panels: ['L10P1', 'L10P2', 'L10P3'],
    panelConfig: {
      L10P1: {
        css: 'col-md-6'
      },
      L10P2: {
        css: 'col-md-3'
      },
      L10P3: {
        css: 'col-md-3'
      }
    }
  },
  L11: {
    name: '4 Column Layout',
    panels: ['L11P1', 'L11P2', 'L11P3', 'L11P4'],
    panelConfig: {
      L11P1: {
        css: 'col-md-3'
      },
      L11P2: {
        css: 'col-md-3'
      },
      L11P3: {
        css: 'col-md-3'
      },
      L11P4: {
        css: 'col-md-3'
      }
    }
  }
};

export const ChangableLayouts = {
  list: ['L1', 'L6', 'L7', 'L8'],
  maps: {
    L1: {
      mapTo: 'L6',
      split: {
        from: 'L1P2',
        to: ['L6P1', 'L6P3']
      },
      copy: {
        from: 'L1P1',
        to: 'L6P2'
      }
    },
    L7: {
      mapTo: 'L6',
      split: {
        from: 'L7P2',
        to: ['L6P1', 'L6P3']
      },
      copy: {
        from: 'L7P1',
        to: 'L6P2'
      }
    },
    L8: {
      mapTo: 'L6',
      split: {
        from: 'L8P1',
        to: ['L6P1', 'L6P3']
      },
      copy: {
        from: 'L8P2',
        to: 'L6P2'
      }
    }
  }
};
