import { Component, signal, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { handleLayout, toggleFullScreen, toggleTheme, 
  updateHtmlAttributeFromRadio, restoreHtmlAttributesFromSession
} from './app.utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('Velzon - Angular Admin & Dashboard Template - Nadun');

  // List of all HTML data attributes you want to persist
  htmlDataAttrs = [
    'data-layout',
    'data-topbar',
    'data-sidebar',
    'data-sidebar-size',
    'data-sidebar-image',
    'data-preloader',
    'data-theme',
    'data-theme-colors',
    'data-bs-theme',
    'data-layout-style',
    'data-layout-width',
    'data-layout-position'
  ];

  // Default values for the attributes
  defaultHtmlAttrs = {
    'data-layout': 'vertical',
    'data-topbar': 'light',
    'data-sidebar': 'dark',
    'data-sidebar-size': 'lg',
    'data-sidebar-image': 'none',
    'data-preloader': 'disable',
    'data-theme': 'material',
    'data-theme-colors': 'default',
    'data-bs-theme': 'dark',
    'data-layout-style': 'default',
    'data-layout-width': 'fluid',
    'data-layout-position': 'fixed'
  };

  ngAfterViewInit() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 350);
    }
  }

  ngOnInit() {
    restoreHtmlAttributesFromSession(this.htmlDataAttrs, this.defaultHtmlAttrs);
  }

  resetToDefaults() {
    this.htmlDataAttrs.forEach(attr => sessionStorage.removeItem(attr));
    restoreHtmlAttributesFromSession(this.htmlDataAttrs, this.defaultHtmlAttrs);
  }

  onHandleLayoutClick() {
    handleLayout();
  }

  onFullScreen(event: Event) {
    toggleFullScreen(event);
  }

  onThemeToggle() {
    toggleTheme();
  }

  onUpdateHtmlAttributeFromRadio(event: Event) {
    updateHtmlAttributeFromRadio(event);
  }
}
