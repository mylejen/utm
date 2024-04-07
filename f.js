document.documentElement.style.scrollBehavior = "smooth";

var fixedFooter = document.querySelector('.fixed-footer');

fixedFooter.style.position = 'fixed';
fixedFooter.style.bottom = '0';
fixedFooter.style.width = '100%';
fixedFooter.style.zIndex = '999';
fixedFooter.style.transition = 'opacity 1s ease';
fixedFooter.style.opacity = '0';


window.addEventListener('scroll', function() {

var scrollPercent = (document.documentElement.scrollTop + window.innerHeight) / document.documentElement.scrollHeight * 100;

if (scrollPercent >= 20 && scrollPercent <= 80) {
      document.querySelector('.fixed-footer').style.opacity = 1;
    } else {
      document.querySelector('.fixed-footer').style.opacity = 0;
    }
  });
