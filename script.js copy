if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.activeElement.blur();
}

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});