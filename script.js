document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.pageX + 'px';
            cursor.style.top = e.pageY + 'px';
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .gallery__title');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.7';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }
    
    // Gallery functionality
    function setupGallery(gallery) {
        const titles = gallery.querySelectorAll('.gallery__title');
        const viewer = gallery.querySelector('.gallery__viewer');
        
        if (!titles.length || !viewer) return;
        
        const mediaContainer = viewer.querySelector('.video-container, .image-container');
        const description = viewer.querySelector('.media-description p');
        const prevBtn = gallery.querySelector('.gallery__prev');
        const nextBtn = gallery.querySelector('.gallery__next');
        
        let currentIndex = Array.from(titles).findIndex(title => 
            title.classList.contains('active')
        );
        if (currentIndex === -1) currentIndex = 0;
        
        // Initialize with first item if none is active
        if (currentIndex >= 0) {
            updateViewer(titles[currentIndex]);
            updateDescription(titles[currentIndex]);
        }
        
        // Set up click handlers for titles
        titles.forEach((title, index) => {
            title.addEventListener('click', () => {
                setActiveTitle(index);
            });
        });
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + titles.length) % titles.length;
                setActiveTitle(currentIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % titles.length;
                setActiveTitle(currentIndex);
            });
        }
        
        function setActiveTitle(index) {
            // Remove active class from all titles
            titles.forEach(t => t.classList.remove('active'));
            
            // Add active class to selected title
            titles[index].classList.add('active');
            currentIndex = index;
            
            // Update viewer content
            updateViewer(titles[index]);
            updateDescription(titles[index]);
        }
        
        function updateViewer(title) {
            if (!title) return;
            
            const isVideoGallery = title.hasAttribute('data-video');
            const mediaUrl = isVideoGallery 
                ? title.getAttribute('data-video') 
                : title.getAttribute('data-image');
            
            if (isVideoGallery) {
                const videoContainer = viewer.querySelector('.video-container');
                if (videoContainer) {
                    videoContainer.innerHTML = `
                        <iframe src="${mediaUrl}" frameborder="0" 
                                allow="autoplay; fullscreen" 
                                allowfullscreen></iframe>
                    `;
                }
            } else {
                const imageContainer = viewer.querySelector('.image-container');
                if (imageContainer) {
                    imageContainer.innerHTML = `
                        <img src="${mediaUrl}" 
                             alt="${title.querySelector('h3')?.textContent || ''}">
                    `;
                }
            }
        }
        
        function updateDescription(title) {
            if (!description || !title) return;
            const desc = title.getAttribute('data-description');
            if (desc) {
                description.textContent = desc;
            }
        }
        
        // Horizontal scroll for titles
        const titlesContainer = gallery.querySelector('.gallery__titles');
        if (titlesContainer) {
            let isDown = false;
            let startX;
            let scrollLeft;
            
            titlesContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - titlesContainer.offsetLeft;
                scrollLeft = titlesContainer.scrollLeft;
                titlesContainer.style.cursor = 'grabbing';
            });
            
            titlesContainer.addEventListener('mouseleave', () => {
                isDown = false;
                titlesContainer.style.cursor = 'grab';
            });
            
            titlesContainer.addEventListener('mouseup', () => {
                isDown = false;
                titlesContainer.style.cursor = 'grab';
            });
            
            titlesContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - titlesContainer.offsetLeft;
                const walk = (x - startX) * 2;
                titlesContainer.scrollLeft = scrollLeft - walk;
            });
        }
    }
    
    // Initialize all galleries
    document.querySelectorAll('.gallery').forEach(gallery => {
        setupGallery(gallery);
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Intersection Observer for animations
    const sections = document.querySelectorAll('.section');
    
    if (sections.length > 0) {
        const observerOptions = {
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
});
// Illustration Lightbox
const illustrationItems = document.querySelectorAll('.illustration-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const captionTitle = document.querySelector('.caption-title');
const captionDescription = document.querySelector('.caption-description');
let currentIndex = 0;

function getIllustrationData() {
  return Array.from(illustrationItems).map(item => ({
    image: item.querySelector('img').src,
    title: item.querySelector('h3').textContent,
    description: item.querySelector('p').dataset.description,
    year: item.querySelector('p').textContent
  }));
}

function openLightbox(index) {
  const illustrations = getIllustrationData();
  currentIndex = index;
  const illustration = illustrations[currentIndex];
  
  lightboxImage.src = illustration.image;
  captionTitle.textContent = illustration.title;
  captionDescription.textContent = `${illustration.description} • ${illustration.year}`;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function navigate(direction) {
  const illustrations = getIllustrationData();
  currentIndex = (currentIndex + direction + illustrations.length) % illustrations.length;
  openLightbox(currentIndex);
}

// Event Listeners
illustrationItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

document.querySelector('.close-btn').addEventListener('click', closeLightbox);
document.querySelector('.prev-btn').addEventListener('click', () => navigate(-1));
document.querySelector('.next-btn').addEventListener('click', () => navigate(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }
});