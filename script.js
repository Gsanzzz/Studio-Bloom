// Studio Bloom - Link Tree Interactions
document.addEventListener('DOMContentLoaded', () => {
  // Stagger animation for link cards
  const cards = document.querySelectorAll('.link-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 800 + (index * 150));
  });

  // Touch ripple effect on link cards
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(219, 186, 227, 0.4);
        left: ${x}px;
        top: ${y}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 2;
      `;
      
      card.appendChild(ripple);
      
      ripple.animate([
        { width: '0px', height: '0px', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => ripple.remove();
    });
  });

  // Random sparkle generation
  function createRandomSparkle() {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✦';
    sparkle.style.cssText = `
      position: fixed;
      color: #dbbae3;
      font-size: ${6 + Math.random() * 10}px;
      left: ${10 + Math.random() * 80}%;
      top: ${5 + Math.random() * 40}%;
      opacity: 0;
      pointer-events: none;
      z-index: 0;
    `;
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
      { opacity: 0, transform: 'scale(0) rotate(0deg)' },
      { opacity: 0.6, transform: 'scale(1) rotate(180deg)' },
      { opacity: 0, transform: 'scale(0) rotate(360deg)' }
    ], {
      duration: 2000 + Math.random() * 2000,
      easing: 'ease-in-out'
    }).onfinish = () => sparkle.remove();
  }

  // Spawn a new sparkle every few seconds
  setInterval(createRandomSparkle, 3000);
});
