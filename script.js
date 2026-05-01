document.addEventListener("DOMContentLoaded", () => {
    // 1. Typewriter Animation
    const textElement = document.getElementById('typewriter');
    if (textElement) {
        const phrases = ["Cybersecurity Enthusiast", "Ethical Hacker", "Security Researcher"];
        let p = 0, c = 0, isDeleting = false;

        function type() {
            let current = phrases[p];
            textElement.innerHTML = isDeleting ? current.slice(0, c--) : current.slice(0, c++);
            
            if(!isDeleting && c > current.length) { 
                isDeleting = true; 
                setTimeout(type, 2000); 
            }
            else if(isDeleting && c < 0) { 
                isDeleting = false; 
                p = (p + 1) % phrases.length; 
                c = 0; 
                setTimeout(type, 500); 
            }
            else { 
                setTimeout(type, isDeleting ? 60 : 120); 
            }
        }
        type();
    }

    // 2. Scroll Animations (GSAP)
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".hero-left", { opacity: 0, x: -50, duration: 1, delay: 0.2 });
        gsap.from(".hero-right", { opacity: 0, scale: 0.8, duration: 1, delay: 0.4 });



        gsap.utils.toArray('.card-hover').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                opacity: 0,
                y: 50,
                duration: 0.8
            });
        });
    }
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll("section, footer");
    const navLinks = document.querySelectorAll(".nav-blur a");
    
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("text-indigo-600", "font-bold");
            link.classList.add("text-slate-500");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("text-indigo-600", "font-bold");
                link.classList.remove("text-slate-500");
            }
        });
    });

    // 3. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved user preference, if any, on load of the website
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else {
        document.documentElement.classList.remove('dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn && themeIcon) {
        themeToggleBtn.addEventListener('click', function() {
            // toggle icons
            if (themeIcon.classList.contains('fa-sun')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }

            // toggle dark mode on html element
            document.documentElement.classList.toggle('dark');

            // save to local storage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('color-theme', 'dark');
            } else {
                localStorage.setItem('color-theme', 'light');
            }
        });
    }
});
