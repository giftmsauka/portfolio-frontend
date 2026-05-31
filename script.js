/* ========================
   PORTFOLIO SCRIPT.JS
   Cloud Computing Assignment
   ======================== */

// ---- Cursor Glow ----
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- Mobile Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ---- Scroll Reveal Animation ----
const revealElements = document.querySelectorAll(
    '.section-header, .about-grid, .skill-group, .timeline-item, ' +
    '.project-card, .contact-card, .api-demo, .tech-badges, .tl-card'
);

revealElements.forEach(el => {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- Skill Bar Animation ----
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            barObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
                const href = link.getAttribute('href');
                if (href === '#' + id) {
                    link.style.color = '#a78bfa';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ---- Live API Demo Button ----
const fetchBtn = document.getElementById('fetchApiBtn');
const apiOutput = document.getElementById('apiOutput');
const syncIcon = document.getElementById('syncIcon');

// Simulated portfolio data (mirrors your real Render API response)
const portfolioData = {
    name: "GIFT GEORGE MSAUKA",
    role: "Cloud Computing Student",
    skills: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Node.js",
        "Express.js",
        "Cloud Computing",
        "Git & GitHub",
        "Vercel",
        "Render"
    ],
    contact: {
        email: "msaukagift@email.com",
        phone: "+255 749760141",
        github: "github.com/johndoe"
    },
    projects: [
        "Personal Portfolio Website",
        "Student Management System",
        "Cloud Deployment Project"
    ]
};

if (fetchBtn) {
    fetchBtn.addEventListener('click', () => {
        // Show loading
        fetchBtn.classList.add('loading');
        apiOutput.textContent = '// Connecting to Render backend...\n// GET /portfolio';

        // Simulate API call delay (in real deployment, replace with actual fetch)
        setTimeout(() => {
            fetchBtn.classList.remove('loading');

            // Simulating a real fetch response — in deployment use:
            // fetch('https://your-api.onrender.com/portfolio')
            //   .then(r => r.json())
            //   .then(data => { apiOutput.textContent = JSON.stringify(data, null, 2); })

            typewriterJSON(JSON.stringify(portfolioData, null, 2));
        }, 1200);
    });
}

// Typewriter effect for JSON output
function typewriterJSON(text) {
    apiOutput.textContent = '';
    let index = 0;
    const speed = 8;

    function type() {
        if (index < text.length) {
            apiOutput.textContent += text.charAt(index);
            index++;
            apiOutput.scrollTop = apiOutput.scrollHeight;
            setTimeout(type, speed);
        }
    }
    type();
}

// ---- Smooth Active Scroll Highlight ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- Page Load Animation Init ----
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ---- Project Cards Hover Tilt ----
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});
