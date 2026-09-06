// LENIS SMOOTH SCROLL INITIALIZATION
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
});

// GSAP SCROLL TRIGGER SETUP
gsap.registerPlugin(ScrollTrigger);

// RAF LOOP FOR LENIS
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// SYNC LENIS WITH SCROLL TRIGGER
lenis.on('scroll', ScrollTrigger.update);

// DETECT REDUCED MOTION
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// SCROLL VELOCITY TRACKING (FOR SKEW EFFECTS)
let proxy = { skew: 0, skewSetter: (x) => {
  gsap.to('body', { skewY: x, overwrite: 'auto', duration: 0.8, ease: 'power3' });
}, skewGetter: () => gsap.getProperty('body', 'skewY'), onUpdate: (self) => {
  let skew = Math.min(Math.abs(self.getVelocity() / 300), 10);
  proxy.skew !== skew && proxy.skewSetter(skew);
} };

gsap.set('body', { transformOrigin: 'center center', force3D: true });

// SCROLL TRIGGER WITH VELOCITY
ScrollTrigger.create({
  onUpdate: (self) => {
    proxy.onUpdate(self);
  }
});

gsap.set('body', { skewY: 0, overwrite: 'auto' }, 0);

// MOBILE MENU TOGGLE
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isVisible = mobileMenu.style.display !== 'none';
    mobileMenu.style.display = isVisible ? 'none' : 'flex';
    mobileMenuToggle.classList.toggle('active');
  });

  // CLOSE MENU WHEN LINK CLICKED
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      mobileMenuToggle.classList.remove('active');
    });
  });
}

// CTA BUTTON CLICK NAVIGATION
const ctaButtons = document.querySelectorAll('.cta-button[data-destination]');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const destination = button.getAttribute('data-destination');
    if (destination) {
      window.location.href = destination;
    }
  });
});

// ACCESSIBILITY: SKIP TO MAIN CONTENT
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--accent-gold);
  color: var(--white-primary);
  padding: 8px 12px;
  z-index: 100;
  text-decoration: none;
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});

document.body.prepend(skipLink);

// CONSOLE LOG: INITIALIZATION COMPLETE
console.log('✓ Lenis smooth scroll initialized');
console.log('✓ GSAP ScrollTrigger active');
console.log('✓ Mobile menu configured');
console.log(`✓ Reduced motion: ${prefersReducedMotion ? 'ON' : 'OFF'}`);