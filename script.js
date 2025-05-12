// Helper: Remove active class from all sidebar links
function clearActiveLinks() {
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.classList.remove('active');
  });
}

// Handle section navigation (About, Contact)
document.querySelectorAll('a[data-section]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = link.getAttribute('data-section');

    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(target).classList.remove('hidden');

    // Hide video player
    document.getElementById('video-player').classList.add('hidden');
    document.getElementById('videoFrame').src = '';

    // Set active link
    clearActiveLinks();
    link.classList.add('active');
  });
});

// Handle dropdown toggle logic
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  const submenu = toggle.nextElementSibling;

  toggle.addEventListener('click', e => {
    e.stopPropagation(); // Prevent triggering document click

    const isOpen = submenu.classList.contains('show');

    // Close all submenus
    document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));

    // Reopen if it was closed
    if (!isOpen) {
      submenu.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Enable Enter key for keyboard users
  toggle.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      toggle.click();
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    document.querySelectorAll('.submenu').forEach(menu => menu.classList.remove('show'));
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
  }
});

// Handle video and illustration link clicks
document.querySelectorAll('.movie-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const videoURL = link.getAttribute('data-video');
    const description = link.getAttribute('data-description') || '';

    const iframe = document.getElementById('videoFrame');
    const descContainer = document.getElementById('video-description');

    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.add('hidden');
    });

    // Show video player
    document.getElementById('video-player').classList.remove('hidden');
    iframe.src = videoURL;

    // Set description
    descContainer.textContent = description;

    // Set active link
    clearActiveLinks();
    link.classList.add('active');
  });
});
