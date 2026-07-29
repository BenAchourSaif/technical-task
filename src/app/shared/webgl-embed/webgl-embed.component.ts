import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
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
export class WebglEmbedComponent implements OnInit, OnDestroy {
  /** Folder under /public, e.g. "webgl/storyforge/" — must contain an index.html. */
  @Input({ required: true }) basePath!: string;
  @Input() title = 'Unity WebGL build';
  @Input() missingLabel = 'Demo coming soon';
  @Input() missingHint = 'The WebGL build hasn’t been dropped into this folder yet.';

  @ViewChild('gameFrame') private gameFrame?: ElementRef<HTMLIFrameElement>;

  state = signal<EmbedState>('checking');
  isFullscreen = signal(false);
  safeUrl: SafeResourceUrl | null = null;

  private readonly onFullscreenChange = () => {
    this.isFullscreen.set(document.fullscreenElement === this.gameFrame?.nativeElement);
  };

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit() {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);

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

  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  onIframeLoad() {
    this.state.set('ready');
  }

  // Expands the iframe in place via the Fullscreen API instead of navigating to a
  // new tab, so the build keeps its Firebase-loaded state and the visitor never
  // leaves this page.
  toggleFullscreen() {
    const el = this.gameFrame?.nativeElement;
    if (!el) {
      return;
    }
    if (document.fullscreenElement === el) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }
}
