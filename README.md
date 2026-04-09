# ColorChooser — glad you're checking it out

Badges (text): Next.js, React, TypeScript, Tailwind CSS, ESLint

## Description

ColorChooser is a small web app for picking colors and copying the resulting CSS color string. It is aimed at developers and designers who need a quick, lightweight way to generate `hsla(...)` or `rgba(...)` values without opening a full design tool.

## Features

- Toggle between Pickers.
- Slider controls for channels and alpha/transparency
- Live color preview card
- One-click copy of the current CSS color string
- Animated ambient background effects

## Tech Stack

- TypeScript
- React 19
- Next.js 16
- Tailwind CSS v4 (via PostCSS integration)
- Lucide React (icons)
- ESLint

## Prerequisites

- Node.js (version not specified in the project)
- npm (lockfile present)
- Git (for cloning)

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Move into the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

```bash
# None
```

## Usage

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## Deployment

No deployment configuration is included. Use your standard Next.js hosting workflow for your chosen platform.

## Known Limitations / Assumptions

- Node.js and npm versions are not pinned in the repository; any compatible versions for the listed dependencies are assumed.
- No automated tests or CI configuration are present.
- No live demo or deployment details are provided.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make changes and verify locally with `npm run dev` and `npm run lint`.
4. Open a pull request describing the changes.

## License

MIT License.

** -- RITESH KHARAL -- **
