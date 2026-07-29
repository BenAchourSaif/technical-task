import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebglEmbedComponent } from '../../shared/webgl-embed/webgl-embed.component';
import { VideoEmbedComponent } from '../../shared/video-embed/video-embed.component';
import { SITE } from '../../core/site-config';

@Component({
  selector: 'app-task2-search',
  standalone: true,
  imports: [WebglEmbedComponent, VideoEmbedComponent, RouterLink],
  templateUrl: './task2-search.component.html',
  styleUrl: './task2-search.component.scss',
})
export class Task2SearchComponent {
  site = SITE;

  rawSamples = [
    { key: '132CoverInfo', value: 'sssss_rrr_08/08/2023_Other' },
    { key: '71726852CoverInfo', value: 'الكسور_amna_13/04/2025_Education_Math|Three|Second_كسور' },
  ];

  challenges = [
    'Mixed separators: `_` most of the time, `|` inside a single segment.',
    'Variable field count — some entries have no date or an incomplete category.',
    'Bilingual text (Arabic/Latin), including inside the values themselves.',
    'No entry may be fixed at the source: parsing has to tolerate the data exactly as it is.',
  ];

  approach = [
    {
      title: 'A tolerant positional parser, not one regex per case',
      body: 'Splits on `_` first, then on `|` for sub-segments; every missing field falls back to an explicit default instead of throwing.',
    },
    {
      title: 'No entry-specific rules',
      body: 'The brief forbids hardcoding per ID — the same function has to handle both `132CoverInfo` and `71726852CoverInfo`.',
    },
    {
      title: 'Search by content name or author',
      body: 'Once Content Name / Author / Date are extracted, search compares the normalized query (case, diacritics) against both fields.',
    },
  ];

  textRendering = [
    {
      title: 'Content is bilingual, unpredictably',
      body: 'Real entries mix Arabic and Latin script — sometimes within the same field — so result cards can’t assume one alphabet or one text direction.',
    },
    {
      title: 'MultiScriptTextView picks the script per string',
      body: 'A shared view component scans each value for Arabic-range Unicode code points; if found, it shapes and reorders the text through a vendored RTL engine, right-aligns it, and swaps to the Arabic font — otherwise it renders as plain left-to-right Latin text.',
    },
    {
      title: 'One config asset, not per-prefab font picking',
      body: 'TextRenderingConfig (a single ScriptableObject registered once in Bootstrap) is the one source of truth for which font renders which script — swapping either font later touches one place, not every prefab.',
    },
  ];

  scalability = [
    {
      title: 'Today (1,000+ items)',
      body: 'A full fetch of the node + client-side parsing + linear scan is still fine — the volume fits in memory, and Realtime Database has no native full-text search anyway.',
    },
    {
      title: 'At 10,000+ items',
      body: 'Parse once on write (a Cloud Function) instead of on every read, maintain a denormalized index { contentName, author, dateSortable } queryable via orderByChild/startAt-endAt, and move text search to a dedicated service (Algolia/Typesense/Elasticsearch) kept in sync in the background rather than scanning client-side.',
    },
    {
      title: 'Pagination & debounce',
      body: 'Load in pages instead of the whole node at once, and debounce user input to avoid firing a query per keystroke.',
    },
  ];
}
