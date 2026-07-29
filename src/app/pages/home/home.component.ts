import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../core/site-config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  projects = PROJECTS;

  highlights = [
    {
      title: 'Layered architecture',
      body: 'Domain/Application with zero UnityEngine dependency, Infrastructure behind ports, a single Bootstrap composition root — consistent across both projects.',
    },
    {
      title: 'Firebase with no Unity SDK',
      body: 'The official Firebase SDK doesn’t support WebGL, so everything goes through Realtime Database’s REST API via UnityWebRequest and async/await.',
    },
    {
      title: 'Ref-counted LRU asset cache',
      body: 'Textures are reference-counted, retained in a bounded LRU tier once released, with prefetching and in-flight request coalescing to avoid redundant downloads.',
    },
    {
      title: 'Real-world data parsing',
      body: 'The CoverInfo field mixes `_`/`|` separators, missing fields, and Arabic text — extraction is fault-tolerant, with no per-entry special cases.',
    },
  ];

  process = [
    {
      step: '01',
      label: 'Architecture proposal',
      body: 'A design document written before implementation: layers, patterns, and open questions to resolve.',
      link: '/architecture',
      linkLabel: 'See the proposal →',
    },
    {
      step: '02',
      label: 'Implementation',
      body: 'Unity 2022.3 LTS / Unity 6, C# organized by testable layers, iterated in-Editor and then against a real WebGL build.',
      link: '/task-1-story-creation',
      linkLabel: 'See Task 1 live →',
    },
    {
      step: '03',
      label: 'Documented handover',
      body: 'Key decisions, trade-offs, and limitations spelled out — not just “it works”, but why it’s built this way.',
      link: '/architecture',
      linkLabel: 'Read the handover →',
    },
  ];
}
