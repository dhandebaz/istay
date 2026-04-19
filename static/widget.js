(function() {
  const BASE_URL = window.location.origin; // In production, this would be istay.space

  function initWidgets() {
    const widgets = document.querySelectorAll('.istay-widget:not([data-istay-initialized])');
    
    widgets.forEach(container => {
      const propId = container.getAttribute('data-prop-id');
      if (!propId) return;

      const iframe = document.createElement('iframe');
      iframe.src = `${BASE_URL}/widget/${propId}`;
      iframe.style.width = '100%';
      iframe.style.height = '600px'; // Initial height
      iframe.style.border = 'none';
      iframe.style.overflow = 'hidden';
      iframe.style.scrollWidth = 'none';
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('frameborder', '0');
      
      container.appendChild(iframe);
      container.setAttribute('data-istay-initialized', 'true');

      // Listen for resize messages
      window.addEventListener('message', (event) => {
        if (event.data.type === 'istay-widget-resize' && event.source === iframe.contentWindow) {
          iframe.style.height = event.data.height + 'px';
        }
      });
    });
  }

  // Run on load and also provide a global init function
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidgets);
  } else {
    initWidgets();
  }

  window.IStayWidget = {
    init: initWidgets
  };
})();
