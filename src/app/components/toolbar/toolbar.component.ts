import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  isDark = false

  toggleTheme() {
    if(!this.isDark) {
      if(!document.body.classList.contains('light')) {
        document.body.classList.add('light')
      } else {
        if (document.body.classList.contains('light')) {
          document.body.classList.remove('light')
        }
      }
    }
  }

  constructor(private router: Router) {}

  // Scroll to app component
  scrollTo(target: string) {
    const element = document.getElementById(target)
    element?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  // Menu 
  showMenuButton!: boolean ;
  // menu items
  menuItems: any[] = [
    { label: 'Home', link: './homepage', target: 'homepage' },
    { label: 'About Me', link: './about', target: 'about' },
    { label: 'Services', link: './services', target: 'services' },
    { label: 'Projects', link: './projects', target: 'projects' },
    { label: 'Contact', link: './contact', target: 'contact' },
  ];

 

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  checkScreenWidth() {
    this.showMenuButton = window.innerWidth < 666;
  }

  
}
