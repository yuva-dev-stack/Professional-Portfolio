
    // Theme toggle with persistence
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){ root.setAttribute('data-theme', savedTheme); }
    const toggle = document.getElementById('themeToggle');
    toggle.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      toggle.innerHTML = current === 'light' ? '<i class="fa-solid fa-sun"></i><span>Theme</span>' : '<i class="fa-solid fa-moon"></i><span>Theme</span>';
    });

    // Typewriter effect
    const roles = [
      'building delightful software.',
      'Java • Swing • MySQL.',
      'clean UI + solid logic.',
      'crafting responsive websites.',
    ];
    const typeEl = document.getElementById('typewrite');
    let i=0, j=0, deleting=false;
    function type(){
      const text = roles[i];
      typeEl.textContent = deleting ? text.slice(0, j--) : text.slice(0, j++);
      if(!deleting && j === text.length + 1){ deleting = true; setTimeout(type, 1200); return; }
      if(deleting && j === 0){ deleting = false; i = (i+1)%roles.length; }
      setTimeout(type, deleting ? 35 : 70);
    }
    type();

    // Intersection reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show'); })
    }, { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Smooth active nav link
    const sections = ['projects','skills','about','contact'];
    const links = [...document.querySelectorAll('.nav-links a')];
    function onScroll(){
      const pos = window.scrollY + 120;
      for(const id of sections){
        const sec = document.getElementById(id);
        if(!sec) continue;
        if(pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight){
          links.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
      }
    }
    window.addEventListener('scroll', onScroll);

    // Simple contact form handler (no backend)
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if(!data.name || !data.email || !data.message){
        statusEl.textContent = 'Please fill in all fields.';
        return;
      }
      statusEl.textContent = 'Thanks! Your message is ready to send (demo mode).';
      form.reset();
    });

    // Dynamic year & CV placeholder
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('downloadCV').addEventListener('click', (e)=>{
      e.preventDefault();
      alert('Add your resume.pdf link here later.');
    });