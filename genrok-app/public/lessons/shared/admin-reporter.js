// Admin Reporter for Interactive Lessons
// This script adds per-slide report buttons for admin users

(function() {
  'use strict';

  // Check if user is admin by checking localStorage or sending a message to parent
  let isAdmin = false;

  // Listen for admin status from parent window
  window.addEventListener('message', function(event) {
    if (event.data?.type === 'ADMIN_STATUS') {
      isAdmin = event.data.isAdmin;
      if (isAdmin) {
        addReportButtons();
      }
    }
  });

  // Request admin status from parent on load
  function requestAdminStatus() {
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'CHECK_ADMIN_STATUS' }, '*');
    }
  }

  // Create the report button SVG icon
  function createBugIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.innerHTML = `
      <path d="m8 2 1.88 1.88"/>
      <path d="M14.12 3.88 16 2"/>
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/>
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/>
      <path d="M12 20v-9"/>
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5"/>
      <path d="M6 13H2"/>
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4"/>
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/>
      <path d="M22 13h-4"/>
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
    `;
    return svg;
  }

  // Add report button to a slide element
  function addReportButtonToSlide(slideElement, slideIndex, slideType, lessonSlug) {
    // Check if button already exists
    if (slideElement.querySelector('.admin-report-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'admin-report-btn';
    btn.title = `Report issue on Slide ${slideIndex + 1} (${slideType})`;
    btn.appendChild(createBugIcon());

    // Style the button
    Object.assign(btn.style, {
      position: 'absolute',
      top: '12px',
      right: '12px',
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      opacity: '0.7',
      transition: 'opacity 0.2s, transform 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.opacity = '0.7';
      btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Send report request to parent window
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'ADMIN_REPORT_REQUEST',
          slideIndex: slideIndex,
          slideType: slideType,
          lessonSlug: lessonSlug,
          elementId: `${slideType}-${slideIndex}`
        }, '*');
      }
    });

    // Make sure slide has position relative
    const computedStyle = window.getComputedStyle(slideElement);
    if (computedStyle.position === 'static') {
      slideElement.style.position = 'relative';
    }

    slideElement.appendChild(btn);
  }

  // Get lesson slug from URL or config
  function getLessonSlug() {
    // Try to get from LESSON_CONFIG if available
    if (typeof LESSON_CONFIG !== 'undefined' && LESSON_CONFIG.id) {
      return LESSON_CONFIG.id;
    }
    // Fallback: extract from URL path
    const pathParts = window.location.pathname.split('/');
    const lessonsIndex = pathParts.indexOf('lessons');
    if (lessonsIndex !== -1 && pathParts[lessonsIndex + 1]) {
      return pathParts[lessonsIndex + 1];
    }
    return 'unknown';
  }

  // Add report buttons to all slides
  function addReportButtons() {
    if (!isAdmin) return;

    const lessonSlug = getLessonSlug();

    // Wait for slides to be rendered
    const checkForSlides = setInterval(() => {
      // Look for the main slide container
      const slideContainer = document.querySelector('[class*="slide"]') ||
                            document.querySelector('.h-full.w-full') ||
                            document.getElementById('root');

      if (slideContainer) {
        // Find current slide index from the app state
        // This requires hooking into the lesson's state
        observeSlideChanges(lessonSlug);
        clearInterval(checkForSlides);
      }
    }, 500);

    // Clear after 10 seconds if no slides found
    setTimeout(() => clearInterval(checkForSlides), 10000);
  }

  // Observe slide changes and add buttons dynamically
  function observeSlideChanges(lessonSlug) {
    // Use MutationObserver to detect when slides change
    const observer = new MutationObserver(() => {
      // Find the current visible slide
      const slides = document.querySelectorAll('[data-slide-index]');
      slides.forEach((slide) => {
        const slideIndex = parseInt(slide.getAttribute('data-slide-index'), 10);
        const slideType = slide.getAttribute('data-slide-type') || 'unknown';
        addReportButtonToSlide(slide, slideIndex, slideType, lessonSlug);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also try to add to any existing slides
    const existingSlides = document.querySelectorAll('[data-slide-index]');
    existingSlides.forEach((slide) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide-index'), 10);
      const slideType = slide.getAttribute('data-slide-type') || 'unknown';
      addReportButtonToSlide(slide, slideIndex, slideType, lessonSlug);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', requestAdminStatus);
  } else {
    requestAdminStatus();
  }

  // Also initialize after a delay to catch late-loading content
  setTimeout(requestAdminStatus, 1000);
})();
