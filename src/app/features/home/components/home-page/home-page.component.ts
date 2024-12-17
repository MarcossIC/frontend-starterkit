import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  title = 'frontend-starterkit';

  public getGradientPattern() {
    return {
      'background-image': `
            linear-gradient(to right, #2bffff1a 1px, transparent 1px),
            linear-gradient(to bottom, #2bffff1a 1px, transparent 1px)
          `,
      'background-size': '50px 50px',
    };
  }

  public getGradientOverlay() {
    return {
      background: `
            radial-gradient(circle at 50% -20%, rgba(43, 255, 255, 0.1) 0%, rgba(43, 255, 255, 0.05) 30%, transparent 70%),
            linear-gradient(180deg, rgba(43, 255, 255, 0.1) 0%, transparent 100%)
          `,
      filter: 'blur(80px)',
      'pointer-events': 'none',
    };
  }

  public getSecondGradientOverlay() {
    return {
      background: `radial-gradient(ellipse at 50% -150%, rgba(43, 255, 255, 0.15) 0%, rgba(43, 255, 255, 0.1) 40%, transparent 70%)`,
      filter: 'blur(100px)',
    };
  }
}

export default HomePageComponent;
