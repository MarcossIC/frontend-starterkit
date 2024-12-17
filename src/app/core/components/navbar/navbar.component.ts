import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { NavLinkComponent } from '../app-link/app-link.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavLinkComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  // Eventos
  // Accesibilidad
  public ariaLabel = input<string>('');
  itle = input<string>('');

  // Atributos de enlace
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;

  // Estilo y estado
  customClass: string = '';
  disabled: boolean = false;

  public getMask() {
    return {
      maskImage: 'linear-gradient(to right, transparent, black, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
    };
  }

  public getLinks() {
    return [
      {
        id: 'homeid',
        label: 'Home',
        path: '/',
      },
      {
        id: 'kitid',
        label: 'Frontend Kit',
        path: 'kit',
      },
      {
        id: 'aboutid',
        label: 'About Us',
        path: '/about',
      },
      {
        id: 'customid',
        label: 'Customize',
        path: '/customize',
      },
    ];
  }
}
