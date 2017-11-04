(function() {
  // Defining classnames.
  var sticky = 'sticky';
  var grow = 'grow';
  var hide = 'hide';
  var expandLogo = 'expand-logo';
  var collapseLogo = 'collapse-logo';
  var navbarActive = 'navbar-active';
  var isActive = 'is-active';
  var modalOpen = 'modal-open';

  // Grabbing DOM
  var body = document.getElementsByTagName('body')[0];
  var navbar = document.getElementById('navbar');
  var header = document.getElementsByTagName('header')[0];
  var logo = document.getElementById('nav-logo');

  var headerHeight = header.clientHeight;


  // Rig up mobile menu.
  initMenu();

  // Make sure we have copyright text on the site.
  copyright();

  // Make sure navbar behaves properly on refresh by running at least once.
  handleScroll();

  // Deal with scroll events
  window.addEventListener('scroll', handleScroll);

  function initMenu() {
    var button = document.getElementById('menu-button');

    button.addEventListener('click', handleMenuClick(navbar, button));
  }

  function handleScroll(e) {
    if (window.scrollY > headerHeight) {
      addClass(sticky, navbar);
      // Need to grow header to fill in space previously taken by navbar.
      addClass(grow, header);

      removeClass(hide, logo);
      changeClass(collapseLogo, expandLogo, logo);
    } else {
      removeClass(sticky, navbar);
      removeClass(grow, header);
      changeClass(expandLogo, collapseLogo, logo);
    }
  }

  function handleMenuClick(navbar, button) {
    return function(e) {
      var result = hasClass(navbarActive, navbar);
      if (result) {
        removeClass(isActive, button);
        removeClass(navbarActive, navbar);
        removeClass(modalOpen, body);
        return;
      }

      addClass(isActive, button);
      addClass(navbarActive, navbar);
      addClass(modalOpen, body);
    }
  }

  function displayType() {
    var mobile = 500;
    var tablet = 800;

    if (window.innerWidth <= mobile) {
      return "mobile";
    }

    if (window.innerWidth <= tablet) {
      return "tablet";
    }

    return "desktop";
  }

  // Class modification functions
  function addClass(name, element) {
    var classes = element.className.split(' ');
    var existing = classes.filter(function(c) {
      return c === name;
    });

    if (existing.length > 0) {
      return;
    }

    element.className += ' ' + name;
  }

  function removeClass(name, element) {
    var classes = element.className.split(' ');
    var newClasses = classes.filter(function(c) {
      return c !== name;
    });

    element.className = newClasses.join(' ');
  }

  function changeClass(prev, next, element) {
    var classes = element.className.split(' ');
    var found = false;

    var newClasses = classes.map(function(c) {
      if (c === prev) {
        found = true;
        return next;
      }

      return c;
    })

    // If existing class is not present, just add the new one.
    if (!found) {
      addClass(next, element);
      return;
    }

    element.className = newClasses.join(' ');
  }

  function hasClass(name, element) {
    var classes = element.className.split(' ');
    for(var i = 0; i < classes.length; i++) {
      if (classes[i] === name) {
        return true;
      }
    }

    return false;
  }

  // make sure we inject an up to date copyright
  function copyright() {
    var copyDOM = document.getElementById('copyright');
    copyDOM.innerHTML = 'Copyright &copy; ' + new Date().getFullYear() + ' The DIY Cottage';
  }
})();
