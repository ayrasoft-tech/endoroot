/* ===================================================
   ENDOROOT DENTAL CLINIC – Premium Script
   =================================================== */

/* ─── Navbar scroll effect ─────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── Hamburger / mobile nav ───────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ─── Smooth scroll for anchor links ──────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Scroll Reveal with Stagger ──────────────────── */
const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;

    // Apply stagger as CSS variable so the stylesheet picks it up
    if (delay) el.style.setProperty('--stagger', delay + 'ms');
    el.style.transitionDelay = delay + 'ms';

    // Small rAF ensures the delay is set before visible class fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('visible');
      });
    });

    revealObserver.unobserve(el);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll(revealSelectors).forEach(el => {
  revealObserver.observe(el);
});

/* ─── Active nav link highlight on scroll ─────────── */
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
    });
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ─── Cursor-parallel tilt on service cards ──────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Gallery lightbox-style hover caption ─────────── */
// (Caption fade is handled purely in CSS via .gallery-caption)

/* ─── Testimonial auto-shimmer on enter ─────────────── */
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.dataset.delay = String(i * 120);
    el.style.transitionDelay = (i * 120) + 'ms';
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    testimonialObserver.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.testimonial-card').forEach(card => {
  testimonialObserver.observe(card);
});

/* ─── Number counter animation (stat numbers) ───────── */
function animateCounter(el) {
  const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
  const suffix = el.textContent.replace(/[\d]/g, '');
  if (isNaN(target)) return;
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(interval);
  }, 40);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

document.querySelectorAll('.stat-num, .badge-num').forEach(el => {
  counterObserver.observe(el);
});

/* ─── Parallax on hero image ────────────────────────── */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
    }
  }, { passive: true });
}

/* ─── Pillar reveal stagger ─────────────────────────── */
const pillarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.pillar').forEach((pillar, i) => {
      pillar.style.opacity = '0';
      pillar.style.transform = 'translateX(-30px)';
      pillar.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => {
        pillar.style.opacity = '1';
        pillar.style.transform = 'translateX(0)';
      }, i * 160);
    });
    pillarObserver.unobserve(entry.target);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.why-pillars').forEach(el => pillarObserver.observe(el));

/* ─── Contact card stagger reveal ───────────────────── */
const contactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.contact-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-20px)';
      card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, i * 100);
    });
    contactObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.contact-info').forEach(el => contactObserver.observe(el));
