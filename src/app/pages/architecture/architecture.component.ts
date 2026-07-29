import { Component } from '@angular/core';

@Component({
  selector: 'app-architecture',
  standalone: true,
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  patterns = [
    { name: 'MVC', body: 'Passive Views, pure-C# Controllers, engine-free Models.' },
    { name: 'Repository', body: 'IStoryRepository / IContentDiscoveryRepository hide Firebase behind a Domain interface.' },
    { name: 'Command', body: 'Every editor action (add, move, scale, delete) is a reversible Command in a CommandHistory.' },
    { name: 'Observer / Event Bus', body: 'Controllers and services communicate via typed events rather than direct references.' },
    { name: 'Strategy (cache)', body: 'Ref-counting + an LRU tier as the retention strategy, isolated behind IAssetProvider.' },
    { name: 'Factory', body: 'Domain/DTO object creation kept separate from orchestration logic.' },
  ];

  proposalVsDelivery = [
    {
      question: 'Firebase Storage vs. Addressables for assets?',
      decision: 'Firebase Hosting for static images, fetched via UnityWebRequestTexture — no Addressables; the catalog stays dynamic and driven entirely by the Firebase database itself.',
    },
    {
      question: 'Thumbnail: screenshot or RenderTexture?',
      decision: 'RenderTexture (ThumbnailRenderer) — a deterministic capture independent of whatever’s in the visible framebuffer, more reliable under WebGL.',
    },
    {
      question: 'DI framework or lightweight Service Locator?',
      decision: 'A hand-rolled ServiceLocator. A full DI framework would have been disproportionate for this project’s size; ServiceLocator + Bootstrap is enough to keep layers decoupled.',
    },
    {
      question: 'Which JSON serializer?',
      decision: 'Newtonsoft.Json, with small private DTOs using already-lowercase field names in FirebaseStoryRepository — no global camelCase convention, so each shape stays auditable against the real schema.',
    },
  ];

  decisions = [
    {
      title: 'One asmdef per layer, plus a separate Bootstrap assembly',
      body: 'Domain/Application physically cannot reach UnityEngine, which is what makes the EditMode tests (CommandHistoryTests) fast and deterministic, with no scene and no network. Bootstrap exists separately because Core can’t depend on Infrastructure without creating a cycle.',
    },
    {
      title: 'MVC with no DI framework',
      body: 'Views can’t construct their own Controller without leaking wiring logic into the “passive” layer. So each screen gets a minimal Installer that resolves dependencies from ServiceLocator in Start() — relying on Unity’s guarantee that every Awake() (where Bootstrap registers services) runs before any Start() in the same scene.',
    },
    {
      title: 'The folder is named ContentEditor, not Editor',
      body: 'Unity treats any folder literally named Editor under Assets as editor-only code and strips it from player builds — a trap that would have silently deleted the entire editor screen from every WebGL build.',
    },
    {
      title: 'Drag/scale gestures commit once, not per frame',
      body: 'ElementGestureHandler keeps the pre-gesture value and only calls CommandHistory.Do(...) on drag-end / per wheel notch — otherwise every frame of a drag would become its own undo step.',
    },
    {
      title: 'Concurrent asset loads are coalesced',
      body: 'Prefetching the next page while the current one is still in flight can request the same key twice; in-flight requests are now tracked and shared so the second caller awaits the first instead of starting a redundant download and risking a cache race.',
    },
    {
      title: 'Thumbnails match the editor’s design canvas, not raw pixels',
      body: 'ThumbnailRenderer scales each sprite against the same 1920×1080 design canvas and fixed element base size the editor uses, rather than the source texture’s own resolution — otherwise differently-sized source images would render at inconsistent scales in the saved thumbnail.',
    },
    {
      title: 'IL2CPP strips what the Editor never shows you',
      body: 'On both projects, the private Newtonsoft.Json DTOs behind Firebase reads deserialized fine in the Editor but came back empty in a real IL2CPP build — managed stripping doesn’t recognize Newtonsoft’s reflection-based construction as a usage, so it removed the constructors. Fixed with [Preserve] on each DTO. The kind of bug that only exists in the artifact you actually ship.',
    },
    {
      title: 'CORS is part of the architecture, not an afterthought',
      body: 'Textures loaded cross-origin into a WebGL canvas need Access-Control-Allow-Origin from the server, or the browser silently refuses them. Firebase Hosting is configured with that header on /assets/**, and the headless build (decompressionFallback + nameFilesAsHashes) is explicitly tuned for a host — this Angular site — whose exact header behavior isn’t guaranteed.',
    },
  ];

  aiUsage = [
    'Claude Code (Anthropic) and ChatGPT (OpenAI) were used as coding assistants throughout both projects.',
  ];
}
