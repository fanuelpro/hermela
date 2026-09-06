// CUSTOM CURSOR WITH MORPHING STATES
const cursor = document.getElementById('custom-cursor');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  cursor.style.display = 'none';
} else {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let cursorState = 'default'; // default, text, link, drag, button

  // TRACK MOUSE POSITION
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.display = 'block';
  });

  // LERP CURSOR POSITION
  function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = (cursorX - 8) + 'px';
    cursor.style.top = (cursorY - 8) + 'px';

    // UPDATE CURSOR STATE
    const element = document.elementFromPoint(mouseX, mouseY);
    
    if (element) {
      if (element.tagName === 'A' || element.classList.contains('nav-link')) {
        setCursorState('link');
      } else if (element.classList.contains('cta-button')) {
        setCursorState('button');
      } else if (element.classList.contains('drag-item')) {
        setCursorState('drag');
      } else if (element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'LI') {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    }

    requestAnimationFrame(updateCursor);
  }

  function setCursorState(state) {
    if (cursorState === state) return;
    
    cursorState = state;
    cursor.classList.remove('cursor-text', 'cursor-link', 'cursor-drag', 'cursor-button');
    
    switch (state) {
      case 'text':
        cursor.classList.add('cursor-text');
        cursor.style.width = '4px';
        cursor.style.height = '16px';
        cursor.style.borderRadius = '2px';
        cursor.style.opacity = '0.6';
        break;
      case 'link':
        cursor.classList.add('cursor-link');
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderRadius = '50%';
        cursor.style.opacity = '1';
        break;
      case 'drag':
        cursor.classList.add('cursor-drag');
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.borderRadius = '50%';
        cursor.style.opacity = '1';
        break;
      case 'button':
        cursor.classList.add('cursor-button');
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.borderRadius = '50%';
        cursor.style.opacity = '1';
        break;
      default:
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursor.style.borderRadius = '50%';
        cursor.style.opacity = '0.8';
    }
  }

  updateCursor();
}

// MAGNETIC BUTTON EFFECT
const magneticButtons = document.querySelectorAll('.cta-button');

magneticButtons.forEach(button => {
  if (prefersReducedMotion) return;

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    const maxDistance = 80;
    const distance = Math.sqrt(distX * distX + distY * distY);
    
    if (distance < maxDistance) {
      const moveX = (distX / maxDistance) * 15;
      const moveY = (distY / maxDistance) * 15;
      
      gsap.to(button, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        overwrite: 'auto'
      });
    }
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1.2, 0.5)',
      overwrite: 'auto'
    });
  });
});

console.log('✓ Custom cursor initialized');