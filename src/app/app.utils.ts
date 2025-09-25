// Developed by Nadun Bandara - 25/09/2025
//----------------------------------------------------------------------------------------
// Function to handle layout changes based on screen size and layout type
export function handleLayout(): void {
  const e = document.documentElement.clientWidth;
  const layout = document.documentElement.getAttribute('data-layout');

  // hamburger toggle
  if (e > 767) {
    const hamburger = document.querySelector('.hamburger-icon');
    if (hamburger) {
      hamburger.classList.toggle('open');
    }
  }

  // horizontal layout
  if (layout === 'horizontal') {
    if (document.body.classList.contains('menu')) {
      document.body.classList.remove('menu');
    } else {
      document.body.classList.add('menu');
    }
  }

  // vertical layout
  if (layout === 'vertical') {
    if (e <= 1025 && e > 767) {
      document.body.classList.remove('vertical-sidebar-enable');
      if (document.documentElement.getAttribute('data-sidebar-size') === 'sm') {
        document.documentElement.setAttribute('data-sidebar-size', '');
      } else {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      }
    } else if (e > 1025) {
      document.body.classList.remove('vertical-sidebar-enable');
      if (document.documentElement.getAttribute('data-sidebar-size') === 'lg') {
        document.documentElement.setAttribute('data-sidebar-size', 'sm');
      } else {
        document.documentElement.setAttribute('data-sidebar-size', 'lg');
      }
    } else if (e <= 767) {
      document.body.classList.add('vertical-sidebar-enable');
      document.documentElement.setAttribute('data-sidebar-size', 'lg');
    }
  }

  // semibox layout
  if (layout === 'semibox') {
    if (e > 767) {
      if (document.documentElement.getAttribute('data-sidebar-visibility') === 'show') {
        if (document.documentElement.getAttribute('data-sidebar-size') === 'lg') {
          document.documentElement.setAttribute('data-sidebar-size', 'sm');
        } else {
          document.documentElement.setAttribute('data-sidebar-size', 'lg');
        }
      } else {
        (document.getElementById('sidebar-visibility-show') as HTMLElement)?.click();
        document.documentElement.setAttribute(
          'data-sidebar-size',
          document.documentElement.getAttribute('data-sidebar-size') || ''
        );
      }
    } else if (e <= 767) {
      document.body.classList.add('vertical-sidebar-enable');
      document.documentElement.setAttribute('data-sidebar-size', 'lg');
    }
  }

  // twocolumn layout
  if (layout === 'twocolumn') {
    if (document.body.classList.contains('twocolumn-panel')) {
      document.body.classList.remove('twocolumn-panel');
    } else {
      document.body.classList.add('twocolumn-panel');
    }
  }
}
//----------------------------------------------------------------------------------------
// for toggle full screen
export function toggleFullScreen(event?: Event): void {
  event?.preventDefault();

  document.body.classList.toggle("fullscreen-enable");

  const doc: any = document;
  const docEl: any = document.documentElement;

  if (
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.webkitFullscreenElement
  ) {
    // Exit fullscreen
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    }
  } else {
    // Enter fullscreen
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen(undefined);
    }
  }
}
//----------------------------------------------------------------------------------------
// for toggle theme
export function toggleTheme(
  element: HTMLElement = document.documentElement,
  dispatchEventName: string = 'themeChange'
): void {
  if (element.hasAttribute('data-bs-theme') && element.getAttribute('data-bs-theme') === 'dark') {
    C('data-bs-theme', 'light', 'layout-mode-light', element);
  } else {
    C('data-bs-theme', 'dark', 'layout-mode-dark', element);
  }

  // trigger a custom event so listeners can react
  const event = new Event(dispatchEventName);
  window.dispatchEvent(event);
}

// mock of your C() function if you don’t have it defined yet
export function C(attr: string, value: string, className: string, element: HTMLElement) {
  element.setAttribute(attr, value);
  element.classList.remove('layout-mode-light', 'layout-mode-dark');
  element.classList.add(className);
}
//----------------------------------------------------------------------------------------
// Handle app settings change from radio buttons
export function updateHtmlAttributeFromRadio(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (!target) return;

  const attrName = target.name;
  const attrValue = target.value;

  if(attrName === '' || attrValue === '') return;

  if(attrName == 'data-bs-theme' && (attrValue === 'light' || attrValue === 'dark')) {
    if(attrValue == 'dark') {
      document.documentElement.classList.remove('layout-mode-light');
      document.documentElement.classList.add('layout-mode-dark');
    }else{
      document.documentElement.classList.remove('layout-mode-dark');
      document.documentElement.classList.add('layout-mode-light');
    }
  }

  // Update <html> element
  const htmlEl = document.documentElement;
  htmlEl.setAttribute(attrName, attrValue);

  // Save to sessionStorage
  sessionStorage.setItem(attrName, attrValue);
}
//----------------------------------------------------------------------------------------
// Restore HTML attributes from sessionStorage on page load
export function restoreHtmlAttributesFromSession(attrNames: string[], defaults: { [key: string]: string } = {}): void {
  const htmlEl = document.documentElement;

  attrNames.forEach((attrName) => {
    const storedValue = sessionStorage.getItem(attrName);
    if (storedValue) {
      htmlEl.setAttribute(attrName, storedValue);

      const radios = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${attrName}"][value="${storedValue}"]`);
      radios.forEach(radio => {
        radio.checked = true;
      });
    }else{
      // If no stored value, set to default if provided
      if (defaults[attrName]) {
        htmlEl.setAttribute(attrName, defaults[attrName]);
      }

      const defaultRadios = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${attrName}"][value="${defaults[attrName]}"]`);
      defaultRadios.forEach(radio => {
        radio.checked = true;
      });
    }
  });
}
//----------------------------------------------------------------------------------------