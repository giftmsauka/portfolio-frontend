/* ========================
   PORTFOLIO SCRIPT.JS
   Frontend ↔ Backend Communication
   ======================== */

const API_URL = "https://portfolio-backend-keyw.onrender.com";

document.addEventListener('DOMContentLoaded', () => {
    fetchPortfolioData();
    initAnimations();
});

async function fetchPortfolioData() {
    try {
        showLoadingState();
        const response = await fetch(`${API_URL}/portfolio`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        populatePage(data);
    } catch (error) {
        console.error('Failed to fetch from backend:', error);
        showErrorState();
    }
}

function populatePage(data) {
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroDesc = document.getElementById('hero-desc');
    if (heroName) heroName.textContent = data.name;
    if (heroRole) heroRole.textContent = data.role;
    if (heroDesc) heroDesc.textContent = data.bio || '';

    const aboutName = document.getElementById('about-name');
    const aboutRole = document.getElementById('about-role');
    const aboutLocation = document.getElementById('about-location');
    if (aboutName) aboutName.textContent = data.name;
    if (aboutRole) aboutRole.textContent = data.role;
    if (aboutLocation) aboutLocation.textContent = data.contact?.location || 'Tanzania';

    const skillsContainer = document.getElementById('skills-list');
    if (skillsContainer && data.skills) {
        skillsContainer.innerHTML = data.skills.map(skill => `
            <span class="badge"><i class="fas fa-check-circle"></i> ${skill}</span>
        `).join('');
    }

    const projectsContainer = document.getElementById('projects-list');
    if (projectsContainer && data.projects) {
        projectsContainer.innerHTML = data.projects.map((project, i) => `
            <div class="project-card ${i === 0 ? 'featured' : ''}">
                <div class="proj-header">
                    <div class="proj-icon"><i class="fas fa-code"></i></div>
                    <div class="proj-links">
                        <a href="${project.link || '#'}" target="_blank" title="View Project">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                ${i === 0 ? '<div class="proj-badge">Featured</div>' : ''}
                <h3 class="proj-title">${project.name}</h3>
                <p class="proj-desc">${project.description}</p>
                <div class="proj-tech">
                    ${(project.tech || []).map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    const emailEl  = document.getElementById('contact-email');
    const phoneEl  = document.getElementById('contact-phone');
    const githubEl = document.getElementById('contact-github');
    if (emailEl && data.contact?.email)   emailEl.textContent  = data.contact.email;
    if (phoneEl && data.contact?.phone)   phoneEl.textContent  = data.contact.phone;
    if (githubEl && data.contact?.github) githubEl.textContent = data.contact.github;

    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) typewriterJSON(JSON.stringify(data, null, 2));

    setTimeout(animateSkillBars, 300);
}

function showLoadingState() {
    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) apiOutput.textContent = '// Connecting to Render backend...\n// GET ' + API_URL + '/portfolio';
}

function showErrorState() {
    const apiOutput = document.getElementById('apiOutput');
    if (apiOutput) apiOutput.textContent = '// ❌ Could not connect to backend\n// API_URL = "' + API_URL + '"';
    populatePage(fallbackData);
}

const fallbackData = {
    name: "GIFT GEORGE MSAUKA",
    role: "Data Science Student & Aspiring Data Analyst",
    bio: "Third-year Bachelor of Data Science student at EASTC, Dar es Salaam. Passionate about machine learning, statistical analysis, time series, spatial analysis, and transforming raw data into meaningful insights.",
    skills: [
        "Python", "R Programming", "Machine Learning", "Time Series Analysis",
        "Spatial Analysis", "Statistical Analysis", "Data Visualization",
        "SQL & MySQL", "JavaScript", "Node.js", "Git & GitHub", "QGIS",
        "Scikit-learn", "Pandas & NumPy"
    ],
    contact: {
        email: "msaukagift@email.com",
        phone: "+255 695 984 497",
        github: "github.com/giftmsauka",
        location: "Dar es Salaam, Tanzania"
    },
    projects: [
        {
            name: "Personal Portfolio Website",
            description: "A responsive personal portfolio with a Node.js/Express backend API deployed on Render and frontend hosted on Vercel. All content is fetched dynamically from the backend API on page load.",
            tech: ["HTML", "CSS", "JavaScript", "Node.js", "Vercel", "Render"],
            link: "https://portfolio-frontend-rose-psi.vercel.app"
        },
        {
            name: "Web-Based Expense Analysis System",
            description: "A data science capstone applying K-Means Clustering to segment student spending behaviour at EASTC. Features a Python Flask backend, MySQL database, and an interactive analytics dashboard.",
            tech: ["Python", "Flask", "K-Means Clustering", "MySQL", "JavaScript"],
            link: "#"
        },
        {
            name: "Student Management System",
            description: "A web-based system for managing student records, course registrations, and academic performance tracking with a clean administrative dashboard interface.",
            tech: ["Node.js", "Express", "HTML", "CSS"],
            link: "#"
        }
    ]
};

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

function initAnimations() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
        });
    }

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
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
    }, { threshold: 0.05 });
    revealEls.forEach(el => revealObs.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) link.style.color = '#f59e0b';
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => navObs.observe(s));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -4;
            const rotateY = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  4;
            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
}

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