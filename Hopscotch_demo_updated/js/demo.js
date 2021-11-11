/* globals hopscotch: false */

/* ============ */ 
/* EXAMPLE TOUR */
/* ============ */
var tour = {
  id: 'hello-hopscotch',
  steps: [
    {
      target: 'hopscotch-title',
      title: 'Welcome to Hopscotch!',
      content: 'Hey there! This is an example Hopscotch tour.',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: 'exmap',
      title: 'Route Map',
      content: 'Boulder to Missoula',
      placement: 'right',
    },
    {
      target: 'exmap',
      title: 'Interstate 25, Denver',
      content: 'You take I25 north all the way from Denver to Billings',
      placement: 'left',
      xOffset: 410,
      yOffset: 170,
    },
    {
      target: 'exmap',
      title: 'Interstate 90, Billings',
      content: 'Then get onto I90 east and that will take you into Missoula',
      placement: 'top',
      xOffset: 280,
      yOffset: 130,
    },
    {
      target: 'exchart',
      title: 'Barchart',
      content:'There should be a barchart here idk',
      placement: 'bottom',
      yOffset: -250,
    },
    {
      target: document.querySelectorAll('#general-use-desc code')[1],
      title: 'Where to begin',
      content: 'At the very least, you\'ll need to include these two files in your project to get started.',
      placement: 'right',
      yOffset: -20
    },
    {
      target: 'exmap',
      title: 'Back Up',
      content:'Oop here we are back up here',
      placement: 'right',
    },
    {
      target: 'my-first-tour-file',
      placement: 'top',
      title: 'Define and start your tour',
      content: 'Once you have Hopscotch on your page, you\'re ready to start making your tour! The biggest part of your tour definition will probably be the tour steps.'
    },
    {
      target: 'start-tour',
      placement: 'right',
      title: 'Starting your tour',
      content: 'After you\'ve created your tour, pass it in to the startTour() method to start it.',
      yOffset: -25
    },
    {
      target: 'basic-options',
      placement: 'right',
      title: 'Basic step options',
      content: 'These are the most basic step options: <b>target</b>, <b>title</b>, <b>content</b>, and <b>placement</b>. For some steps, they may be all you need.',
      arrowOffset: 100,
      yOffset: -80
    },
    {
      target: 'hopscotch-title',
      placement: 'bottom',
      title: 'You\'re all set!',
      content: 'Now go and build some great tours!',
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 100,
},

/* ========== */
/* TOUR SETUP */
/* ========== */
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