import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebglEmbedComponent } from '../../shared/webgl-embed/webgl-embed.component';
import { VideoEmbedComponent } from '../../shared/video-embed/video-embed.component';
import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-task1-story',
  standalone: true,
  imports: [WebglEmbedComponent, VideoEmbedComponent, RouterLink],
  templateUrl: './task1-story.component.html',
  styleUrl: './task1-story.component.scss',
})
export class Task1StoryComponent {
  site = SITE;

  requirements = [
    'Main Menu: cards for saved stories, Create New, select to view',
    'Editor: background, assets (furniture, characters, animals…), drag & scale, multiple pages',
    'Save: generates a thumbnail, writes index + content to Firebase',
    'Playback: replays saved pages in read-only mode',
    'WebGL build targets 1920×1080, scales to any screen',
  ];

  decisions = [
    {
      title: 'IAssetHandle returns `object`, not Texture2D',
      body: 'The Domain port stays free of any UnityEngine dependency even though the concept it models (a loaded texture) is inherently engine-specific — the cast to Texture2D only happens in Presentation/Infrastructure.',
    },
    {
      title: 'index and content are separate nodes in Firebase',
      body: 'The Main Menu only needs the index (name, author, thumbnail) to render cards. A single node would have forced downloading every page of every story just to populate the library.',
    },
    {
      title: 'Pages/elements are maps, never JSON arrays',
      body: 'Firebase re-indexes an entire array on any single change. Keys like `p0`, `e0`… let a save touch just the one element that changed.',
    },
    {
      title: 'Concurrent asset requests are coalesced',
      body: 'Prefetching the next page while the current one is still loading can request the same key twice. Without de-duping, both calls would race two separate cache writes — leaking one texture and risking the other being evicted while still on screen. In-flight requests are now tracked and shared instead.',
    },
    {
      title: 'Playback guards against overlapping renders with a generation counter',
      body: 'Clicking Next/Prev quickly starts a new async page render before the previous one finishes. PlaybackController stamps each render with a generation number and drops the result if a newer one has since started — otherwise a slow render could finish last and paint over the page the user is actually looking at.',
    },
    {
      title: 'IL2CPP was silently stripping the Firebase DTOs’ constructors',
      body: 'The private Newtonsoft.Json DTOs (IndexWire, ContentWire, PageWire, ElementWire, CategoryWire, ItemWire) deserialized fine in the Editor but came back empty in a real IL2CPP build — managed stripping doesn’t see Newtonsoft’s reflection-based construction as a usage. Fixed with [Preserve] on each type; invisible until you actually run a stripped build, which is exactly why it’s worth calling out.',
    },
    {
      title: 'A headless build script, tuned for embedding rather than standalone hosting',
      body: 'Assets/Editor/WebGLBuildScript.cs runs via -batchmode -executeMethod, no Editor UI needed. It also sets decompressionFallback = true and nameFilesAsHashes = true — decisions made specifically because the eventual host (this Angular site) isn’t guaranteed to serve the right Content-Encoding headers, unlike a host you control end-to-end.',
    },
  ];

  cache = [
    'Ref-counting: a texture currently in use (ref > 0) can never be evicted.',
    'Bounded LRU tier (capacity 24): once released, a texture stays reusable via TryAcquire until eviction.',
    'Free prefetching: the first 6 items of every subcategory are loaded then immediately released — they stay warm in the LRU tier.',
    'Request coalescing: a second request for a key already in flight awaits the same download instead of starting a redundant one.',
    'Thumbnails load by URL directly (LoadFromUrlAsync): the asset palette already knows each item’s thumbnail URL from the catalog, so it skips the key→URL lookup a plain LoadAsync(key) would need.',
    'Known limit: LRU capacity is a texture count, not a memory budget — browsing many large images back-to-back can still exceed a byte-aware budget.',
    'No cross-session persistence: closing the tab clears the cache; only the browser’s own HTTP cache avoids an immediate re-download.',
  ];
}
