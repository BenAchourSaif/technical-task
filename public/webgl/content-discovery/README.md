# WebGL build location — Task 2 (Search & Content Discovery)

This is the folder `Task2SearchComponent` expects (see
`src/app/pages/task2-search/task2-search.component.ts`) for the
`content-discovery-webgl` WebGL build.

Drop the output of a Unity WebGL build here (File > Build Settings > WebGL > Build),
i.e. a folder containing at least:

```
content-discovery/
├── index.html
├── Build/
│   ├── Build.loader.js
│   ├── Build.data(.gz)
│   ├── Build.framework.js(.gz)
│   └── Build.wasm(.gz)
└── TemplateData/
```

If the `.gz` files fail to load locally (the Angular dev server doesn't set the
`Content-Encoding: gzip` header), decompress them and drop the `.gz` suffix from the
three URLs in `index.html` (`dataUrl`/`frameworkUrl`/`codeUrl`) — that's exactly what
was done for the Task 1 build in `public/webgl/storyforge/`.

Until an `index.html` exists here, the Task 2 page automatically shows a "demo coming
soon" state instead of a broken iframe.
