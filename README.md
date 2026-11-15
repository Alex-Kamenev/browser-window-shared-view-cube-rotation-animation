# Browser Window Shared View

A CSS 3D cube whose rotation follows the same clock across browser windows. Its
screen-relative position updates as each window moves, producing a shared view.

Requires Node.js 20.9 on the 20.x release line, or Node.js 22 and newer (24 recommended).
Built with Next.js 16 and React 19.

```sh
git clone https://github.com/Alex-Kamenev/browser-window-shared-view-cube-rotation-animation.git
cd browser-window-shared-view-cube-rotation-animation
npm ci
npm run dev
```

Open http://localhost:3000 in two windows on the same screen. Browser chrome,
display scaling and multiple monitors can affect physical alignment. Rotation
uses `Date.now()` without transmitting data between windows. The cube is 300px;
the screen position adapts to the window rather than resizing the cube.

`npm run build` validates the production build; `npm start` serves that build.
Animation frame handles and pre-existing body styles are restored on unmount.
The page uses local/system typography and needs no build-time Google Fonts request.

`npm run lint` checks source and `npx tsc --noEmit` checks types. A temporary override
scoped to `@typescript-eslint/typescript-estree@8.72.2` selects minimatch 11.0.7:
the parser's declared 10.x range has no fix for
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
The selected version retains the parser's named matching API and includes the
[subsequent 11.x security fixes](https://github.com/isaacs/minimatch/releases/tag/v11.0.7).
Other ESLint consumers retain their compatible minimatch 3.x dependency. Revisit
this override when TypeScript ESLint updates its declared dependency.

Issues: https://github.com/Alex-Kamenev/browser-window-shared-view-cube-rotation-animation/issues
No license file is currently included; this README does not grant a new license.
