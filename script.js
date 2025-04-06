if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.activeElement.blur();
}

document.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });