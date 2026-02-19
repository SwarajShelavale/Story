// Love Story Website JavaScript
class LoveStory {
    constructor() {
        this.init();
        this.bindEvents();
        this.createHearts();
        this.initMusic();
    }

    init() {
        // Get DOM elements
        this.timelineContainer = document.getElementById('timelineContainer');
        this.overlay = document.getElementById('overlay');
        this.popup = document.getElementById('popup');
        this.closePopup = document.getElementById('closePopup');
        this.timelinePoints = document.querySelectorAll('.timeline-point');
        this.clock = document.getElementById('clock');
        this.celebrateBtn = document.getElementById('celebrateBtn');
        this.fireworksContainer = document.getElementById('fireworksContainer');
        
        // State
        this.clockInterval = null;
        }

    bindEvents() {
        // Timeline points
        this.timelinePoints.forEach(point => {
            point.addEventListener('click', (e) => this.showTimelinePopup(e));
        });

        // Popup controls
        if (this.closePopup) {
            this.closePopup.addEventListener('click', () => this.closePopupHandler());
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closePopupHandler());
        }

        // Celebration button (always bind if exists)
        if (this.celebrateBtn) {
            this.celebrateBtn.addEventListener('click', () => this.handleCelebrate());
        }

        // Clock animation observer
        this.setupClockObserver();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
    }

    createHearts() {
        const container = document.querySelector('.floating-hearts');
        if (!container) return;

        const heartSymbols = ['❤️', '💕', '💖', '💗', '💝'];
        const heartCount = 15;

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 6 + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            container.appendChild(heart);
        }
    }

    
    showTimelinePopup(event) {
        const point = event.currentTarget;
        const date = point.dataset.date;
        const message = point.dataset.popup;
        
        if (this.popup) {
            this.popup.querySelector('h3').textContent = date;
            this.popup.querySelector('p').textContent = message;
            this.popup.classList.add('active');
            this.overlay.classList.add('active');
            
            // Add a small celebration effect for each memory
            this.createMiniFireworks(3);
        }
    }

    closePopupHandler() {
        if (this.popup) {
            this.popup.classList.remove('active');
        }
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
    }

    setupClockObserver() {
        if (!this.clock) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateClock();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(this.clock.parentElement);
    }

    animateClock() {
        let minutes = 10;
        let seconds = 0;
        
        this.clockInterval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }
            
            if (minutes === 11 && seconds === 11) {
                this.clock.textContent = '11:11';
                clearInterval(this.clockInterval);
                this.createMiniFireworks(10);
                return;
            }
            
            this.clock.textContent = `11:${minutes.toString().padStart(2, '0')}`;
        }, 100);
    }

    handleCelebrate() {
        console.log('Celebrate button clicked!');
        
        // Create massive celebration
        this.createMassiveFireworks();
        this.showYesAnimation();
        this.playSuccessSound();
        this.createFloatingHearts();
        this.showSuccessMessages();
        
        // Transform the celebrate button
        this.celebrateBtn.innerHTML = '<span class="flex items-center"><i class="fas fa-heart mr-3"></i>CELEBRATING FOREVER 💕<i class="fas fa-heart ml-3"></i></span>';
        this.celebrateBtn.classList.add('bg-gradient-to-r', 'from-yellow-400', 'to-yellow-600', 'animate-bounce');
        
        // Disable button after celebration
        this.celebrateBtn.disabled = true;
        
        // Show after proposal section after delay
        setTimeout(() => {
            const afterProposal = document.getElementById('afterProposal');
            if (afterProposal) {
                afterProposal.classList.remove('hidden');
                afterProposal.classList.add('animate-fade-in');
            }
        }, 2000);
        
        // Open celebration popup after 3 seconds
        setTimeout(() => {
            this.openCelebrationPopup();
        }, 3000);
    }

    openCelebrationPopup() {
        const popup = window.open('celebration-popup.html', 'celebration', 'width=800,height=600,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no');
        if (!popup) {
            // If popup is blocked, redirect to celebration page
            window.location.href = 'celebration-popup.html';
        }
    }

    createFireworks() {
        const fireworkCount = 50;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
                firework.style.setProperty('--x', (Math.random() - 0.5) * 400 + 'px');
                firework.style.setProperty('--y', (Math.random() - 0.5) * 400 + 'px');
                this.fireworksContainer.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1000);
            }, i * 50);
        }
    }

    createMiniFireworks(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
                firework.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
                firework.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
                this.fireworksContainer.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1000);
            }, i * 100);
        }
    }

    showYesAnimation() {
        const yesDiv = document.createElement('div');
        yesDiv.className = 'yes-animation fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
        yesDiv.innerHTML = 'YES! 💕<br>I Love You!';
        yesDiv.style.textAlign = 'center';
        document.body.appendChild(yesDiv);
        
        setTimeout(() => yesDiv.remove(), 5000);
        
        // Show additional message
        setTimeout(() => {
            this.showTemporaryMessage('This is the beginning of forever! 🌟');
        }, 2000);
    }

    showTemporaryMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded-full z-50 fade-in-text';
        msgDiv.textContent = message;
        document.body.appendChild(msgDiv);
        
        setTimeout(() => msgDiv.remove(), 3000);
    }

    createMassiveFireworks() {
        const fireworkCount = 100;
        
        for (let i = 0; i < fireworkCount; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
                firework.style.setProperty('--x', (Math.random() - 0.5) * 600 + 'px');
                firework.style.setProperty('--y', (Math.random() - 0.5) * 600 + 'px');
                firework.style.width = '6px';
                firework.style.height = '6px';
                this.fireworksContainer.appendChild(firework);
                
                setTimeout(() => firework.remove(), 1500);
            }, i * 30);
        }
    }

    createFloatingHearts() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
                heart.style.position = 'fixed';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = window.innerHeight + 'px';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.zIndex = '1000';
                heart.style.animation = 'floatUp 4s ease-out forwards';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 4000);
            }, i * 100);
        }
    }

    showSuccessMessages() {
        const messages = [
            'YES! YES! YES! 💕',
            'I\'M THE HAPPIEST PERSON! 🎉',
            'FOREVER STARTS NOW! 🌟',
            'I LOVE YOU MORE THAN WORDS! ❤️'
        ];
        
        messages.forEach((msg, index) => {
            setTimeout(() => {
                this.showTemporaryMessage(msg);
            }, index * 1500);
        });
    }

    playSuccessSound() {
        // Create a simple success sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }

    setupSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Add keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopupHandler();
            }
        });
    }

    // Add touch support for mobile
    setupTouchSupport() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            
            // Swipe up to close popup
            if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
                this.closePopupHandler();
            }
        });
    }
}

    initMusic() {
        // Music elements
        this.musicToggle = document.getElementById('musicToggle');
        this.romanticMusic = document.getElementById('romanticMusic');
        this.isPlaying = false;
        
        if (this.musicToggle && this.romanticMusic) {
            // Try to autoplay music (may be blocked by browser)
            this.romanticMusic.volume = 0.3;
            
            // Music toggle event
            this.musicToggle.addEventListener('click', () => this.toggleMusic());
            
            // Try to play music on first user interaction
            const startMusic = () => {
                if (!this.isPlaying && this.romanticMusic.paused) {
                    this.playMusic();
                }
            };
            
            document.addEventListener('click', startMusic, { once: true });
            document.addEventListener('keydown', startMusic, { once: true });
        }
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }

    playMusic() {
        if (this.romanticMusic) {
            this.romanticMusic.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updateMusicButton();
                })
                .catch(error => {
                    console.log('Music autoplay prevented:', error);
                });
        }
    }

    pauseMusic() {
        if (this.romanticMusic) {
            this.romanticMusic.pause();
            this.isPlaying = false;
            this.updateMusicButton();
        }
    }

    updateMusicButton() {
        if (this.musicToggle) {
            const icon = this.musicToggle.querySelector('i');
            if (this.isPlaying) {
                icon.className = 'fas fa-pause';
                this.musicToggle.classList.add('bg-purple-600');
                this.musicToggle.classList.remove('bg-white', 'bg-opacity-80');
            } else {
                icon.className = 'fas fa-music';
                this.musicToggle.classList.remove('bg-purple-600');
                this.musicToggle.classList.add('bg-white', 'bg-opacity-80');
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoveStory();
});

// Add some extra interactivity
document.addEventListener('mousemove', (e) => {
    const hearts = document.querySelectorAll('.heart');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    hearts.forEach((heart, index) => {
        const speed = (index + 1) * 0.01;
        heart.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
    });
});

// Parallax effect for timeline section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const timeline = document.querySelector('.timeline-gradient');
    
    if (timeline) {
        const rect = timeline.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.5;
            timeline.style.transform = `translateY(${scrolled * speed}px)`;
        }
    }
});
