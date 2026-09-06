// PER-CHARACTER STAGGER REVEAL UTILITY
function createCharacterReveal(element, delay = 0, staggerDelay = 0.03) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!element) return;

  const text = element.textContent;
  element.innerHTML = '';

  text.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    element.appendChild(span);

    if (!prefersReducedMotion) {
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: delay + (index * staggerDelay)
      });
    } else {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }
  });
}

// SCROLL TRIGGER STAGGER REVEAL
function createScrollStaggerReveal(selector, staggerAmount = 0.1) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el, index) => {
    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    } else {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            scrub: false,
            markers: false
          },
          delay: index * staggerAmount
        }
      );
    }
  });
}

// VARIABLE FONT WEIGHT ON SCROLL
function createVariableFontAnimation(element, property = 'wght', startValue = 400, endValue = 700) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!element || prefersReducedMotion) {
    element.style.fontVariationSettings = `"${property}" ${endValue}`;
    return;
  }

  gsap.fromTo(element, 
    { fontVariationSettings: `"${property}" ${startValue}` },
    {
      fontVariationSettings: `"${property}" ${endValue}`,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        markers: false
      }
    }
  );
}

// DEPTH PARALLAX (3-LAYER Z-DEPTH)
function createDepthParallax(containerSelector) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = document.querySelector(containerSelector);
  
  if (!container || prefersReducedMotion) return;

  const layers = container.querySelectorAll('.parallax-layer');
  
  if (layers.length < 3) return;

  gsap.to(layers[0], {
    y: (self) => -self.getVelocity() * 0.5,
    scrollTrigger: {
      trigger: container,
      onUpdate: (self) => {
        gsap.to(layers[0], { y: self.getVelocity() * 0.5, overwrite: 'auto' });
      }
    }
  });

  gsap.to(layers[1], {
    y: (self) => -self.getVelocity() * 0.3,
    scrollTrigger: {
      trigger: container,
      onUpdate: (self) => {
        gsap.to(layers[1], { y: self.getVelocity() * 0.3, overwrite: 'auto' });
      }
    }
  });
}

// SCROLL-DRIVEN ODOMETER EFFECT
function createOdometerCounter(element, targetValue, duration = 1.5) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    element.textContent = targetValue;
    return;
  }

  const counter = { val: 0 };
  
  gsap.to(counter, {
    val: targetValue,
    duration: duration,
    ease: 'power3.out',
    onUpdate: () => {
      element.textContent = Math.floor(counter.val).toLocaleString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    }
  });
}

// 3D PERSPECTIVE TILT CARD
function createPerspectiveTilt(cardSelector) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll(cardSelector);
  
  if (prefersReducedMotion) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((centerY - y) / centerY) * 15;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.6,
        ease: 'power2.out',
        transformStyle: 'preserve-3d'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

// CLIP-PATH CURTAIN TRANSITION
function createClipPathReveal(element, duration = 0.6) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    element.style.clipPath = 'circle(100% at 50% 50%)';
    return;
  }

  gsap.fromTo(element,
    { clipPath: 'circle(0% at 50% 50%)' },
    {
      clipPath: 'circle(100% at 50% 50%)',
      duration: duration,
      ease: 'expo.out'
    }
  );
}

// STICKY STACKING SECTIONS
function createStickyStack(containerSelector, sectionSelector) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const container = document.querySelector(containerSelector);
  const sections = document.querySelectorAll(sectionSelector);
  
  if (prefersReducedMotion || !container) return;

  sections.forEach((section, index) => {
    gsap.fromTo(section,
      { y: 0, scale: 1, opacity: 1 },
      {
        scrollTrigger: {
          trigger: container,
          start: `top+=${index * 400} top`,
          end: `top+=${(index + 1) * 400} top`,
          scrub: 1,
          markers: false
        }
      }
    );
  });
}

console.log('✓ Animation utilities loaded');