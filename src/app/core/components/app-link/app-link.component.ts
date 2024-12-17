import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterModule, NgClass],
  template: `
    <a
      [routerLink]="href()"
      routerLinkActive="active"
      [routerLinkActiveOptions]="{ exact: exact() }"
      [attr.aria-label]="ariaLabel() || label()"
      [attr.title]="title()"
      [attr.target]="target()"
      [attr.rel]="rel()"
      [attr.aria-disabled]="disabled()"
      (click)="onClick($event)"
      [ngClass]="['nav-link', customClass()]">
      {{ label() }}
    </a>
  `,
  styles: [
    `
      .nav-link {
        text-decoration: none;
        color: #fff;
      }
      .active {
        font-weight: bold;
        color: #007bff;
      }
    `,
  ],
})
export class NavLinkComponent {
  public href = input.required<string>();
  public label = input<string>('');
  public exact = input<boolean>(false);

  public ariaLabel = input<string>('');
  public title = input<string>('');

  // Atributos de enlace
  public target = input<'_blank' | '_self' | '_parent' | '_top'>('_self');
  public rel = input<string>('');

  // Estilo y estado
  public customClass = input<string>('');
  public disabled = input<boolean>(false);

  // Eventos
  public linkClick = output<MouseEvent>();

  constructor(private router: Router) {}

  onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }

    this.linkClick.emit(event);
  }
}
