//Content
var tour = {
    id: 'hello-hopscotch',
    steps: [
      {
        target: 'hopscotch-title',
        title: 'Welcome to Hopscotch!',
        content: 'Hey there! This is an example Hopscotch tour',
        placement: 'left',
        arrowOffset: 60
      },
      {
        target: 'exmap',
        title: 'Route Map',
        content: 'Here how I get to my sisters house',
        placement: 'right',
        yOffset: -20
      }
    ],
    showPrevButton: true,
    scrollTopMargin: 100
};

//Tour Setup
addClickListener = function(el, fn) {
    if (el.addEventListener) {
      el.addEventListener('click', fn, false);
    }
    else {
      el.attachEvent('onclick', fn);
    }
  },
  
  init = function() {
    var startBtnId = 'startTourBtn',
        calloutId = 'startTourCallout',
        mgr = hopscotch.getCalloutManager(),
        state = hopscotch.getState();
  
    if (state && state.indexOf('hello-hopscotch:') === 0) {
      // Already started the tour at some point!
      hopscotch.startTour(tour);
    }
    else {
      // Looking at the page for the first(?) time.
      setTimeout(function() {
        mgr.createCallout({
          id: calloutId,
          target: startBtnId,
          placement: 'right',
          title: 'Take an example tour',
          content: 'Start by taking an example tour to see Hopscotch in action!',
          yOffset: -25,
          arrowOffset: 20,
          width: 240
        });
      }, 100);
    }
  
    addClickListener(document.getElementById(startBtnId), function() {
      if (!hopscotch.isActive) {
          mgr.removeAllCallouts();
          hopscotch.startTour(tour);
      }
    });
  };
  
  init();