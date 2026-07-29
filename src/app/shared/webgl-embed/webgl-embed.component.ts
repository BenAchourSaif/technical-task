import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type EmbedState = 'checking' | 'loading' | 'ready' | 'missing';

@Component({
  selector: 'app-webgl-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webgl-embed.component.html',
  styleUrl: './webgl-embed.component.scss',
})
export class WebglEmbedComponent implements OnInit {
  /** Folder under /public, e.g. "/webgl/storyforge/" — must contain an index.html. */
  @Input({ required: true }) basePath!: string;
  @Input() title = 'Unity WebGL build';
  @Input() missingLabel = 'Demo coming soon';
  @Input() missingHint = 'The WebGL build hasn’t been dropped into this folder yet.';

  state = signal<EmbedState>('checking');
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    const indexUrl = this.basePath.endsWith('/') ? `${this.basePath}index.html` : `${this.basePath}/index.html`;
    try {
      const res = await fetch(indexUrl, { method: 'GET', cache: 'no-store' });
      // Angular's dev-server (and some static hosts) fall back to serving the
      // app shell with a 200 for any unmatched path, so a 200 alone doesn't
      // prove the Unity build exists — confirm it actually looks like a
      // Unity WebGL loader page before trusting it.
      const body = res.ok ? await res.text() : '';
      const looksLikeUnityBuild = /unity-canvas|createUnityInstance/i.test(body);
      if (!res.ok || !looksLikeUnityBuild) {
        this.state.set('missing');
        return;
      }
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(indexUrl);
      this.state.set('loading');
    } catch {
      this.state.set('missing');
    }
  }

  onIframeLoad() {
    this.state.set('ready');
  }

  openFullscreen() {
    const indexUrl = this.basePath.endsWith('/') ? `${this.basePath}index.html` : `${this.basePath}/index.html`;
    window.open(indexUrl, '_blank', 'noopener');
  }
}
