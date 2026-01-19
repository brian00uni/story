# material-dashboard

React + TypeScript + Vite with Material UI and SCSS.

## Requirements
- Node.js
- Yarn (classic)

## Install
```bash
yarn
```

## Run
```bash
yarn dev
```

## Material UI
Installed packages:
- `@mui/material`
- `@emotion/react`
- `@emotion/styled`

Example usage:
```tsx
import { Button, Stack, Typography } from '@mui/material';

export default function Example() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Hello MUI</Typography>
      <Button variant="contained">Action</Button>
    </Stack>
  );
}
```

## Formatting
Prettier scripts:
```bash
yarn format
yarn format:check
```

VS Code settings enable format on save and organize imports in `.vscode/settings.json`.

## SCSS
Global styles are loaded from `src/assets/scss/style.scss` in `src/main.tsx`.
