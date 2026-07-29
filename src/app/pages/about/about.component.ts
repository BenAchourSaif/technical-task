import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BIO, SITE } from '../../core/site-config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  site = SITE;
  bio = BIO;
}
