import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  site = SITE;
  year = new Date().getFullYear();
}
