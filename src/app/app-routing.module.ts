import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent, children: [
    {path: 'homepage', component: HomepageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'services', component: ServicesComponent},
    // {path: 'projects', component: AboutComponent},
    // {path: 'contact', component: ContactComponent},
    // {path: 'freelance', component: FreelanceComponent},
  ]},
  {path: 'toolbar', component: ToolbarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
