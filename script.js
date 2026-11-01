function easeInOutQuint(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function smoothScrollTo(targetY, duration) {
  var startY = window.pageYOffset;
  var diff = targetY - startY;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var p = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutQuint(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

var overlay = document.createElement('div');
overlay.className = 'page-overlay';
document.body.appendChild(overlay);

var isTransitioning = false;

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#' || id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (isTransitioning) return;
    isTransitioning = true;
    var offset = 64;
    var targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
    overlay.classList.add('active');
    document.body.classList.add('is-transitioning');
    setTimeout(function () {
      smoothScrollTo(targetY, 900);
      setTimeout(function () {
        overlay.classList.remove('active');
        document.body.classList.remove('is-transitioning');
        target.classList.add('section-arrived');
        setTimeout(function () { target.classList.remove('section-arrived'); }, 1400);
        isTransitioning = false;
      }, 900);
    }, 280);
  });
});

document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height) * 2;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 900);
    btn.classList.add('btn-clicked');
    setTimeout(function () { btn.classList.remove('btn-clicked'); }, 450);
  });
});

var revealEls = document.querySelectorAll('.section, .hero-grid > div, .service, .master, .step, .review, .usp-item');
revealEls.forEach(function (el) { el.classList.add('reveal'); });
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(function (el) { io.observe(el); });

var counters = document.querySelectorAll('.trust strong');
counters.forEach(function (el) {
  var text = el.textContent.trim();
  var match = text.match(/^([\d.]+)(.*)$/);
  if (!match) return;
  var target = parseFloat(match[1]);
  var suffix = match[2] || '';
  var isFloat = text.indexOf('.') > -1;
  var duration = 1400;
  var startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    var p = Math.min((ts - startTime) / duration, 1);
    var eased = easeInOutQuint(p);
    el.textContent = (target * eased).toFixed(isFloat ? 1 : 0) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

document.querySelectorAll('.faq-item').forEach(function (item) {
  item.addEventListener('toggle', function () {
    if (item.open) {
      item.animate(
        [{ opacity: 0.5, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 350, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
    }
  });
});

document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = this.querySelector('button[type="submit"]');
  var form = this;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Заявка отправлена (демо)';
  btn.disabled = true;
  btn.classList.add('btn-success');
  form.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
    { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' }
  );
  setTimeout(function () {
    btn.innerHTML = '<i class="fa-regular fa-calendar-check"></i> Записаться';
    btn.disabled = false;
    btn.classList.remove('btn-success');
    form.reset();
  }, 3000);
});