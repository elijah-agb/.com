// mobile nav toggle — runs on every page
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// terminal typing effect — only exists on the homepage, so this
// whole block safely does nothing on other pages
const termBody = document.getElementById('termBody');
if (termBody) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lines = [
    { p: '$ ', t: 'whoami' },
    { p: '', t: 'jordan-ade — full-stack developer' },
    { p: '', t: '' },
    { p: '$ ', t: 'status' },
    { p: '', t: 'open for new projects' }
  ];

  function renderStatic(){
    termBody.innerHTML = lines.map(l =>
      `<div class="terminal-line show">${l.p ? '<span class="prompt">'+l.p+'</span>' : ''}${l.t}</div>`
    ).join('');
  }

  if (reduceMotion) {
    renderStatic();
  } else {
    let i = 0;
    function typeNext(){
      if (i >= lines.length){ return; }
      const line = lines[i];
      const div = document.createElement('div');
      div.className = 'terminal-line show';
      termBody.appendChild(div);
      const full = line.t;
      let charIndex = 0;
      const prefix = line.p ? `<span class="prompt">${line.p}</span>` : '';
      const interval = setInterval(() => {
        charIndex++;
        div.innerHTML = prefix + full.slice(0, charIndex) + '<span class="caret"></span>';
        if (charIndex >= full.length){
          clearInterval(interval);
          div.innerHTML = prefix + full;
          i++;
          setTimeout(typeNext, 220);
        }
      }, 28);
    }
    typeNext();
  }
}
