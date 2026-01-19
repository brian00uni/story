import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();
const themePath = path.join(repoRoot, 'src', 'theme', 'theme.ts');
const outPath = path.join(repoRoot, 'src', 'theme', 'mui.d.ts');

const themeSource = fs.readFileSync(themePath, 'utf8');

const componentVariantOverrides = [
  { component: 'MuiAlert', module: '@mui/material/Alert', iface: 'AlertPropsVariantOverrides' },
  { component: 'MuiAvatar', module: '@mui/material/Avatar', iface: 'AvatarPropsVariantOverrides' },
  { component: 'MuiAvatarGroup', module: '@mui/material/AvatarGroup', iface: 'AvatarGroupPropsVariantOverrides' },
  { component: 'MuiBadge', module: '@mui/material/Badge', iface: 'BadgePropsVariantOverrides' },
  { component: 'MuiButton', module: '@mui/material/Button', iface: 'ButtonPropsVariantOverrides' },
  {
    component: 'MuiButtonGroup',
    module: '@mui/material/ButtonGroup',
    iface: 'ButtonGroupPropsVariantOverrides',
  },
  { component: 'MuiChip', module: '@mui/material/Chip', iface: 'ChipPropsVariantOverrides' },
  {
    component: 'MuiCircularProgress',
    module: '@mui/material/CircularProgress',
    iface: 'CircularProgressPropsVariantOverrides',
  },
  { component: 'MuiDivider', module: '@mui/material/Divider', iface: 'DividerPropsVariantOverrides' },
  { component: 'MuiFab', module: '@mui/material/Fab', iface: 'FabPropsVariantOverrides' },
  {
    component: 'MuiFormHelperText',
    module: '@mui/material/FormHelperText',
    iface: 'FormHelperTextPropsVariantOverrides',
  },
  { component: 'MuiImageList', module: '@mui/material/ImageList', iface: 'ImageListPropsVariantOverrides' },
  {
    component: 'MuiLinearProgress',
    module: '@mui/material/LinearProgress',
    iface: 'LinearProgressPropsVariantOverrides',
  },
  {
    component: 'MuiPagination',
    module: '@mui/material/Pagination',
    iface: 'PaginationPropsVariantOverrides',
  },
  {
    component: 'MuiPaginationItem',
    module: '@mui/material/PaginationItem',
    iface: 'PaginationItemPropsVariantOverrides',
  },
  { component: 'MuiPaper', module: '@mui/material/Paper', iface: 'PaperPropsVariantOverrides' },
  { component: 'MuiSkeleton', module: '@mui/material/Skeleton', iface: 'SkeletonPropsVariantOverrides' },
  { component: 'MuiTableCell', module: '@mui/material/TableCell', iface: 'TableCellPropsVariantOverrides' },
  { component: 'MuiToolbar', module: '@mui/material/Toolbar', iface: 'ToolbarPropsVariantOverrides' },
  {
    component: 'MuiTypography',
    module: '@mui/material/Typography',
    iface: 'TypographyPropsVariantOverrides',
  },
];

const extractVariantsForComponent = (componentName) => {
  const componentBlockRegex = new RegExp(
    `${componentName}\\s*:\\s*\\{[\\s\\S]*?variants\\s*:\\s*\\[[\\s\\S]*?\\][\\s\\S]*?\\}`,
    'g',
  );
  const blockMatch = themeSource.match(componentBlockRegex);
  if (!blockMatch) {
    return [];
  }
  const variantRegex = /props:\s*\{\s*variant:\s*['"]([^'"]+)['"]\s*\}/g;
  const variants = new Set();
  for (const block of blockMatch) {
    let match = variantRegex.exec(block);
    while (match) {
      variants.add(match[1]);
      match = variantRegex.exec(block);
    }
  }
  return Array.from(variants).sort();
};

const lines = [];
for (const entry of componentVariantOverrides) {
  lines.push(`import type { ${entry.iface} } from '${entry.module}';`);
}
lines.push('');

for (const entry of componentVariantOverrides) {
  const variants = extractVariantsForComponent(entry.component);
  lines.push(`declare module '${entry.module}' {`);
  lines.push(`  interface ${entry.iface} {`);
  if (variants.length === 0) {
    lines.push(`    // No custom variants found in ${themePath.replace(/\\/g, '/')}`);
  } else {
    for (const name of variants) {
      lines.push(`    ${name}: true;`);
    }
  }
  lines.push('  }');
  lines.push('}');
  lines.push('');
}

fs.writeFileSync(outPath, lines.join('\n'));

console.log(`Updated ${path.relative(repoRoot, outPath)} for ${componentVariantOverrides.length} component(s).`);
