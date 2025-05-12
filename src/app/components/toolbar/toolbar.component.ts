import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  isDark = true

  toggleTheme() {
    this.isDark = !this.isDark;

    if (this.isDark) {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }

    this.api.setTheme(this.isDark);
  }

  constructor(private router: Router, private api: ApiService) {}

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
