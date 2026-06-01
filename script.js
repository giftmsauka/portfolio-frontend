/* ========================
   PORTFOLIO SCRIPT.JS
   Frontend ↔ Backend Communication
   Cloud Computing Assignment
   ======================== */

// =============================================
// STEP 1: SET YOUR RENDER BACKEND URL HERE
// =============================================
const API_URL = "https://portfolio-backend-keyw.onrender.com";
// Replace the above with your actual Render URL e.g:
// const API_URL = "https://portfolio-gift.onrender.com";

// =============================================
// LOAD ALL DATA FROM BACKEND ON PAGE LOAD
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    fetchPortfolioData();
    initAnimations();
});

// ---- Main Fetch Function ----
async function fetchPortfolioData() {
    try {
        showLoadingState();

        const response = await fetch(`${API_URL}/portfolio`);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        populatePage(data);

    } catch (error) {
        console.error('Failed to fetch from backend:', error);
        showErrorState();
    }
}

// ---- Populate All Page Sections from Backend Data ----
function populatePage(data) {

    // --- Hero Section ---
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroDesc = document.getElementById('hero-desc');
    if (heroName) heroName.textContent = data.name;
    if (heroRole) heroRole.textContent = data.role;
    if (heroDesc) heroDesc.textContent = data.bio || '';

    // --- About Section ---
    const aboutName = document.getElementById('about-name');
    const aboutRole = document.getElementById('about-role');
    const aboutBio  = document.getElementById('about-bio');
    const aboutLocation = document.getElementById('about-location');
    if (aboutName) aboutName.textContent = data.name;
    if (aboutRole) aboutRole.textContent = data.role;
    if (aboutBio)  aboutBio.textContent  = data.bio || '';
    if (aboutLocation) aboutLocation.textContent = data.contact?.location || 'Tanzania';

    // --- Skills Section ---
    const skillsContainer = document.getElementById('skills-list');
    if (skillsContainer && data.skills) {
        skillsContainer.innerHTML = data.skills.map(skill => `
            <span class="badge">
                <i class="fas fa-check-circle"></i> ${skill}
            </span>
        `).join('');
    }

    // --- Projects Section ---
    const projectsContainer = document.getElementById('projects-list');
    if (projectsContainer && data.projects) {
        projectsContainer.innerHTML = data.projects.map(project => `
            <div class="project-card">
                <div class="proj-header">
                    <div class="proj-icon"><i class="fas fa-code"></i></div>
                    <div class="proj-links">
                        <a href="${project.link || '#'}" target="_blank" title="View Project">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                <h3 class="proj-title">${project.name}</h3>
                <p class="proj-desc">${project.description}</p>
                <div class="proj-tech">
                    ${(project.tech || []).map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // --- Contact Section ---
    const emailEl   = document.getElementById('contact-email');
    const phoneEl   = document.getElementById('contact-phone');
    const githubEl  = document.getElementById('contact-github');
    if (emailEl && data.contact?.email)       emailEl.textContent    = data.contact.email;
    if (phoneEl && data.contact?.phone)       phoneEl.textContent    = data.contact.phone;
    if (githubEl && data.contact?.github)     githubEl.textContent   = data.contact.github;

    // --- API Demo Output ---
    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) {
        typewriterJSON(JSON.stringify(data, null, 2));
    }

    // Trigger skill bar animations after data loads
    setTimeout(animateSkillBars, 300);
}

// ---- Loading State ----
function showLoadingState() {
    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) {
        apiOutput.textContent = '// Connecting to Render backend...\n// GET ' + API_URL + '/portfolio';
    }
}

// ---- Error State ----
function showErrorState() {
    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) {
        apiOutput.textContent = '// ❌ Could not connect to backend\n// Make sure your Render URL is correct in script.js\n// API_URL = "' + API_URL + '"';
    }
    // Fallback: show hardcoded data so page still looks good
    populatePage(fallbackData);
}

// ---- Fallback Data (shown if backend is down) ----
const fallbackData = {
    name: "GIFT GEORGE MSAUKA",
    role: "Cloud Computing Student",
    bio: "I am Gift George Msauka, studying at the EASTC Statistics Centre. I focus on Python, Machine Learning, and R for data analysis.",
    skills: ["Machine Learning", "R", "Python", "Data Analysis", "QGIS"],
    contact: {
        email: "msaukagift@email.com",
        phone: "+255 74976011",
        github: "github.com/giftmsauka",
        location: "Tanzania"
    },
    projects: [
        {
            name: "Personal Portfolio Website",
            description: "A responsive portfolio hosted on Vercel with a Node.js/Express backend API on Render.",
            tech: ["HTML", "CSS", "JavaScript", "Vercel", "Render"],
            link: "#"
        },
        {
            name: "Student Management System",
            description: "Web-based system for managing student records and course registrations.",
            tech: ["Node.js", "Express", "HTML", "CSS"],
            link: "#"
        },
        {
            name: "Cloud Deployment Project",
            description: "End-to-end cloud deployment demonstrating CI/CD workflows and automation.",
            tech: ["Vercel", "Render", "GitHub", "Node.js"],
            link: "#"
        }
    ]
};

// ---- Typewriter Effect for API Output ----
function typewriterJSON(text) {
    const apiOutput = document.getElementById('apiOutput');
    if (!apiOutput) return;
    apiOutput.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            apiOutput.textContent += text.charAt(index);
            index++;
            apiOutput.scrollTop = apiOutput.scrollHeight;
            setTimeout(type, 6);
        }
    }
    type();
}

// ---- Fetch Button (manual refresh) ----
const fetchBtn = document.getElementById('fetchApiBtn');
if (fetchBtn) {
    fetchBtn.addEventListener('click', () => {
        fetchBtn.classList.add('loading');
        fetch(`${API_URL}/portfolio`)
            .then(r => r.json())
            .then(data => {
                fetchBtn.classList.remove('loading');
                typewriterJSON(JSON.stringify(data, null, 2));
            })
            .catch(() => {
                fetchBtn.classList.remove('loading');
                const apiOutput = document.getElementById('apiOutput');
                if (apiOutput) apiOutput.textContent = '// ❌ Connection failed. Check your Render URL.';
            });
    });
}

// =============================================
// ALL OTHER ANIMATIONS & INTERACTIONS
// =============================================
function initAnimations() {

    // Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
        });
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks   = document.getElementById('navLinks');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll(
        '.section-header, .about-grid, .skill-group, .timeline-item, ' +
        '.project-card, .contact-card, .api-demo, .tech-badges'
    );
    revealEls.forEach(el => el.classList.add('reveal'));
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 80);
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObs.observe(el));

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = '#00d4ff';
                    }
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => navObs.observe(s));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project card tilt
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -4;
            const rotateY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  4;
            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Page fade in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
}

// ---- Skill Bar Animation ----
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => obs.observe(bar));
}
