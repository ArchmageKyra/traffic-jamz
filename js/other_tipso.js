jQuery(document).ready(function() {
  // Position Tipso
  jQuery('.right').tipso({
    position: 'right',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    useTitle: false,
  });
  jQuery('.left').tipso({
    position: 'left',
    background: 'tomato',
    useTitle: false,
  });
  jQuery('.bottom').tipso({
    position: 'bottom',
    background: '#2574A9',
    useTitle: false,
  });
  jQuery('.top, .destroy, .update, .update-tipso-content').tipso({
    position: 'top',
    background: '#F62459',
    useTitle: false,
    width: '',
    maxWidth: 300
  });
  jQuery('.hover-tipso-tooltip').tipso({
    position: 'top',
    background: '#000',
    useTitle: false,
    width: false,
    maxWidth: 300,
    tooltipHover: true,
    content: function() {
      return 'You can <a href="javascript:;">CLICK ME</a> now!';
    }
  });

  jQuery('.top-right').tipso({
    position: 'top-right',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    titleContent: 'Some title',
    useTitle: false,
    tooltipHover: true
  });

  jQuery('.top-left').tipso({
    position: 'top-left',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    titleContent: 'Some title',
    useTitle: false,
    tooltipHover: true
  });

  jQuery('.bottom-right').tipso({
    position: 'bottom-right',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    titleContent: 'Some title',
    useTitle: false,
    tooltipHover: true
  });

  jQuery('.bottom-left').tipso({
    position: 'bottom-left',
    background: 'rgba(0,0,0,0.8)',
    titleBackground: 'tomato',
    titleContent: 'Some title',
    useTitle: false,
    tooltipHover: true
  });

  // Use Title For Tipso Content
  jQuery('.title-tipso').tipso({
    useTitle: true
  });
  // Tipso for Image
  jQuery('.img-tipso').tipso({
    useTitle: false,
    background: 'rgba(0,0,0,0.8)',
    position: 'top-left'
  });
  // Show - Hide Tipso on Click
  jQuery('.show-hide').tipso({
    background: 'tomato',
    useTitle: false
  });
  jQuery('.show-hide-tipso').on('click', function(e) {
    if (jQuery(this).hasClass('clicked')) {
      jQuery(this).removeClass('clicked');
      jQuery('.show-hide').tipso('hide');
    } else {
      jQuery(this).addClass('clicked');
      jQuery('.show-hide').tipso('show');
    }
    e.preventDefault();
  });
  // Before show
  jQuery('.beforeShow').tipso({
    background: 'tomato',
    useTitle: false,
    onBeforeShow: function(element, tips) {
      element.tipso('update', 'content', 'the title is a random number');
      element.tipso('update', 'titleContent', Math.random());
    }
  });
  jQuery('.beforeShow-tipso').on('click', function(e) {
    if (jQuery(this).hasClass('clicked')) {
      jQuery(this).removeClass('clicked');
      jQuery('.beforeShow').tipso('hide');
    } else {
      jQuery(this).addClass('clicked');
      jQuery('.beforeShow').tipso('show');
    }
    e.preventDefault();
  });
  //Ajax
  jQuery('.ajax').tipso({
    background: 'tomato',
    useTitle: false,
    ajaxContentUrl: 'ajax.html',
    ajaxContentBuffer: 5000
  });
  // Destroy Tipso
  jQuery('.destroy-tipso').on('click', function(e) {
    jQuery('.destroy').tipso('destroy');
    e.preventDefault();
  });
  // Update Tipso Content
  jQuery('.update-tipso').on('click', function(e) {
    jQuery('.update').tipso('update', 'content', 'this is updated tipso');
    e.preventDefault();
  });
  // Update Tipso Content from input field
  jQuery('.update-tipso-input').on('click', function(e) {
    var content = jQuery('.tipso-content').val();
    jQuery('.update-tipso-content').tipso('update', 'content', content);
    e.preventDefault();
  });
  // Calback Tipso
  jQuery('.callback-tipso').tipso({
    useTitle: true,
    onShow: function() {
      alert('Tipso Showed');
    },
    onHide: function() {
      alert('Tipso Hidden');
    }
  });

  jQuery('.template-content').tipso({
    position: 'top',
    background: '#55b555',
    color: '#eee',
    useTitle: false,
    size: 'small',
    contentElementId: 'template_sample',
    templateEngineFunc: function(content) {
      var compiled = _.template(content);
      var names = ['moa', 'sara', 'james', 'hugo', 'mehr'];
      return compiled({
        name: _.sample(names)
      });
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores velit, animi necessitatibus? Odio repudiandae vero',
    onBeforeShow: function(ele, tipso) {
      ele.tipso('update', 'content', '');
    }
  });

  jQuery('.tiny').tipso({
    size: 'tiny'
  });
  jQuery('.small').tipso({
    size: 'small'
  });
  jQuery('.default').tipso({
    size: 'default'
  });
  jQuery('.large').tipso({
    size: 'large'
  });

  jQuery('.page-load').tipso({
    position: 'bottom',
    background: '#55b555',
    color: '#eee',
    useTitle: false,
    content: 'This one loads on page load',
  });
  // Animate Tipso
  jQuery('.animate').tipso({
    animationIn: 'bounceIn',
    animationOut: 'bounceOut',
    useTitle: false,
  });
  jQuery('.animationIn').on('change', function(e) {
    var $this = jQuery(this);
    jQuery('.animate').tipso('update', 'animationIn', $this.val());
  });
  jQuery('.animationOut').on('change', function(e) {
    var $this = jQuery(this);
    jQuery('.animate').tipso('update', 'animationOut', $this.val());
  });

});
jQuery(window).load(function() {
  // Show Tipso on Load
  jQuery('.page-load').tipso('show');
});