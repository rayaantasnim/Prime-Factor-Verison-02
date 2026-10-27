        // --- 1. COUNTDOWN TICKER TO OCT 28, 2026 ---
        const targetDate = new Date('October 28, 2026 00:00:00 UTC').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                document.getElementById('days').innerText = String(days).padStart(2, '0');
                document.getElementById('hours').innerText = String(hours).padStart(2, '0');
                document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
                document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
            } else {
                document.getElementById('days').innerText = "00";
                document.getElementById('hours').innerText = "00";
                document.getElementById('minutes').innerText = "00";
                document.getElementById('seconds').innerText = "00";
            }
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();


        // --- 2. OVERLAY NAVIGATION DRAWER CONTROLS ---
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const closeNavBtn = document.getElementById('closeNavBtn');
        const navOverlay = document.getElementById('navOverlay');
        const navBackdrop = document.getElementById('navBackdrop');
        const navDrawer = document.getElementById('navDrawer');
        const navLinks = document.querySelectorAll('.nav-link');

        function openNav() {
            navOverlay.classList.remove('pointer-events-none');
            navBackdrop.classList.remove('opacity-0');
            navBackdrop.classList.add('opacity-100');
            navDrawer.classList.remove('translate-x-full');
            navDrawer.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        }

        function closeNav() {
            navBackdrop.classList.remove('opacity-100');
            navBackdrop.classList.add('opacity-0');
            navDrawer.classList.remove('translate-x-0');
            navDrawer.classList.add('translate-x-full');
            document.body.style.overflow = '';
            setTimeout(() => {
                navOverlay.classList.add('pointer-events-none');
            }, 300);
        }

        hamburgerBtn.addEventListener('click', openNav);
        closeNavBtn.addEventListener('click', closeNav);
        navBackdrop.addEventListener('click', closeNav);
        navLinks.forEach(link => link.addEventListener('click', closeNav));


        // --- 3. RIGHT OVERLAY LIFO AUDIT STACK & HOVER-ACTIVATED SCROLL ENGINE ---
        const lifoDrawerBtn = document.getElementById('lifoDrawerBtn');
        const closeLifoBtn = document.getElementById('closeLifoBtn');
        const lifoDrawer = document.getElementById('lifoDrawer');
        const lifoStackContainer = document.getElementById('lifoStackContainer');
        const clearLifoBtn = document.getElementById('clearLifoBtn');
        const lifoBadgeCount = document.getElementById('lifoBadgeCount');
        const scrollViewport = document.getElementById('scrollViewport');

        let lifoData = [
            { id: 6, text: "HMACSHA256 Token Session #1094 initialized", time: "Just now", status: "VERIFIED" },
            { id: 5, text: "Fermat Clue Blocker engaged (ELO 2100)", time: "1 min ago", status: "ACTIVE" },
            { id: 4, text: "Telemetry Latency Verified: 14ms", time: "3 mins ago", status: "OPTIMAL" },
            { id: 3, text: "HMAC Token #9928 verified", time: "5 mins ago", status: "VERIFIED" },
            { id: 2, text: "Rank updated: Tier 4 Cryptographer", time: "12 mins ago", status: "SUCCESS" },
            { id: 1, text: "Session Initialized on Mobile Edge Node", time: "18 mins ago", status: "SYSTEM" }
        ];

        function renderLifoStack() {
            lifoStackContainer.innerHTML = '';
            lifoBadgeCount.innerText = lifoData.length;

            if (lifoData.length === 0) {
                lifoStackContainer.innerHTML = `<div class="w-full text-xs text-slate-300 font-mono py-8 text-center font-bold">Stack empty. No active trace entries.</div>`;
                return;
            }

            lifoData.forEach((item, index) => {
                const el = document.createElement('div');
                el.className = `overlay-scroll-item shrink-0 w-[260px] xs:w-[280px] md:w-full p-4 rounded-xl opaque-overlay-card border-l-4 ${index === 0 ? 'border-cyberCyan neon-glow-cyan' : 'border-slate-600'} text-xs font-mono flex flex-col justify-between`;
                el.innerHTML = `
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-[10px] text-cyberCyan font-extrabold tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-cyberCyan/30">${item.status}</span>
                            <span class="text-[10px] text-slate-300 font-semibold">${item.time}</span>
                        </div>
                        <div class="text-white font-bold text-xs sm:text-sm leading-snug">${item.text}</div>
                    </div>
                    <div class="mt-3 pt-2 border-t border-slate-700 flex justify-between items-center text-[10px] text-slate-300 font-semibold">
                        <span>NODE ID: 0x${(item.id * 1024).toString(16)}</span>
                        <span>ENTRY #${item.id}</span>
                    </div>
                `;
                lifoStackContainer.appendChild(el);
            });
        }

        // Open LIFO Drawer
        lifoDrawerBtn.addEventListener('click', () => {
            renderLifoStack();
            lifoDrawer.classList.remove('translate-x-full');
        });

        // Close LIFO Drawer
        closeLifoBtn.addEventListener('click', () => {
            lifoDrawer.classList.add('translate-x-full');
        });

        // Pop Top Audit Entry (LIFO Operation)
        clearLifoBtn.addEventListener('click', () => {
            if (lifoData.length > 0) {
                lifoData.shift(); // Remove newest entry
                renderLifoStack();
            }
        });

        // --- HOVER-ACTIVATED HORIZONTAL SCROLL CONVERSION FOR DESKTOP & MOBILE SWIPE ---
        // Converts Vertical Mouse Wheel Scrolling into Horizontal Movement when hovering over the stack viewport
        scrollViewport.addEventListener('wheel', (evt) => {
            // Activate horizontal scrolling conversion on screens where horizontal layout is active
            if (window.innerWidth < 768 || scrollViewport.scrollWidth > scrollViewport.clientWidth) {
                if (evt.deltaY !== 0) {
                    evt.preventDefault();
                    scrollViewport.scrollLeft += evt.deltaY * 1.2;
                }
            }
        }, { passive: false });


        // --- 4. GSAP SCROLLTRIGGER ANIMATIONS ---
        gsap.registerPlugin(ScrollTrigger);

        window.addEventListener('load', () => {
            // Animate 3D Cards on Scroll
            gsap.utils.toArray('.card-3d').forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 25,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });
