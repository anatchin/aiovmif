import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router : Router
  ){}

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}
