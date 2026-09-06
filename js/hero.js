// HERO PAGE ANIMATIONS
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// WORDMARK REVEAL
function initHeroWordmark() {
  const wordmark = document.getElementById('wordmark');
  const subtitle = document.getElementById('subtitle');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  if (!wordmark) return;

  if (prefersReducedMotion) {
    wordmark.style.opacity = '1';
    wordmark.style.transform = 'scale(1)';
    subtitle.style.opacity = '1';
    scrollIndicator.style.opacity = '1';
  } else {
    // WORDMARK ENTRANCE
    gsap.fromTo(wordmark,
      { opacity: 0, scale: 0.8, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      }
    );

    // TAGLINE PER-CHARACTER REVEAL
    const taglineContainer = document.getElementById('tagline-container');
    if (taglineContainer) {
      createCharacterReveal(taglineContainer.querySelector('#tagline'), 0.4, 0.05);
    }

    // SUBTITLE FADE-IN
    gsap.fromTo(subtitle,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.2
      }
    );

    // SCROLL INDICATOR
    gsap.fromTo(scrollIndicator,
      { opacity: 0, y: -10 },
      {
        opacity: 0.7,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.6
      }
    );
  }
}

// PARALLAX SCROLL EFFECT ON HERO BACKGROUND
function initHeroParallax() {
  if (prefersReducedMotion) return;

  const layers = document.querySelectorAll('.parallax-layer');
  
  layers.forEach((layer, index) => {
    const speed = 0.5 - (index * 0.15);
    
    gsap.to(layer, {
      y: () => window.innerHeight * speed,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false
      }
    });
  });
}

// CTA BUTTON ANIMATION
function initHeroCtaButton() {
  const ctaButton = document.getElementById('cta-hero');
  
  if (!ctaButton || prefersReducedMotion) return;

  gsap.fromTo(ctaButton,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.5)',
      delay: 1.4
    }
  );
}

// SCROLL VELOCITY SKEW (ALREADY IN MAIN.JS, BUT CAN ENHANCE HERE)
function enhanceHeroSkew() {
  if (prefersReducedMotion) return;

  gsap.set('body', { transformOrigin: 'center center' });
  
  ScrollTrigger.create({
    onUpdate: (self) => {
      gsap.to('body', {
        skewY: Math.min(Math.abs(self.getVelocity() / 300), 10),
        overwrite: 'auto',
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  });
}

// INITIALIZE ALL HERO ANIMATIONS ON PAGE LOAD
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initHeroWordmark();
    initHeroParallax();
    initHeroCtaButton();
    enhanceHeroSkew();
    console.log('✓ Hero animations initialized');
  });
} else {
  initHeroWordmark();
  initHeroParallax();
  initHeroCtaButton();
  enhanceHeroSkew();
  console.log('✓ Hero animations initialized');
}