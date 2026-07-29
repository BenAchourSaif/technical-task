import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  standalone: true,
  templateUrl: './video-embed.component.html',
  styleUrl: './video-embed.component.scss',
})
export class VideoEmbedComponent implements OnChanges {
  @Input() videoUrl: string | null = null;
  @Input() title = 'Demo video';
  @Input() missingLabel = 'Demo video coming soon';
  @Input() missingHint = 'A recorded walkthrough of this build will go here.';

  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.safeUrl = this.videoUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl) : null;
  }
}
