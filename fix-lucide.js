const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) walkDir(dirPath, callback);
    else callback(dirPath);
  });
}

walkDir('src/app', filePath => {
  if (filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Fix imports
    const importRegex = /import\s*\{\s*LucideAngularComponent,?\s*([^}]*)\s*\}\s*from\s*'@lucide\/angular';/g;
    content = content.replace(importRegex, (match, p1) => {
      changed = true;
      const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
      const newIcons = icons.map(i => `Lucide${i}`);
      return `import { ${newIcons.join(', ')} } from '@lucide/angular';`;
    });

    const importRegex2 = /import\s*\{\s*([^}]*)\s*\}\s*from\s*'@lucide\/angular';/g;
    content = content.replace(importRegex2, (match, p1) => {
        if (!match.includes('LucideAngularComponent') && !p1.includes('Lucide')) {
            changed = true;
            const icons = p1.split(',').map(s => s.trim()).filter(Boolean);
            const newIcons = icons.map(i => `Lucide${i}`);
            return `import { ${newIcons.join(', ')} } from '@lucide/angular';`;
        }
        return match;
    });

    // 2. Fix @Component imports array (replace LucideAngularComponent with the specific icons)
    const componentRegex = /imports\s*:\s*\[([^\]]*)\]/g;
    content = content.replace(componentRegex, (match, p1) => {
      if (p1.includes('LucideAngularComponent')) {
        changed = true;
        // find what icons are imported in this file
        const allImports = [...content.matchAll(/import\s*\{\s*([^}]*)\s*\}\s*from\s*'@lucide\/angular';/g)];
        let lucideIcons = [];
        for (const imp of allImports) {
            lucideIcons = lucideIcons.concat(imp[1].split(',').map(s => s.trim()).filter(Boolean));
        }
        const replaced = p1.replace('LucideAngularComponent', lucideIcons.join(', ')).replace(/,\s*,/g, ',');
        return `imports: [${replaced}]`;
      }
      return match;
    });

    // 3. Remove readonly icon properties from class like `readonly Plus = Plus;`
    content = content.replace(/readonly\s+\w+\s*=\s*\w+;/g, match => {
       // if both match (like `readonly Plus = Plus;`)
       const parts = match.match(/readonly\s+(\w+)\s*=\s*(\w+);/);
       if (parts && parts[1] === parts[2]) {
           changed = true;
           return '';
       }
       return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated TS: ${filePath}`);
    }
  }

  if (filePath.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix HTML templates
    // <lucide-icon [img]="Plus" [size]="14" class="search-wrap__icon"></lucide-icon>
    const lucideRegex = /<lucide-icon\s+\[img\]="([^"]+)"([^>]*)><\/lucide-icon>/g;
    content = content.replace(lucideRegex, (match, iconName, rest) => {
      changed = true;
      const directive = `lucide${iconName}`; // e.g., lucidePlus
      // cleanup rest attributes, some might be [size], [class] etc.
      // just pass rest directly
      return `<svg ${directive}${rest}></svg>`;
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated HTML: ${filePath}`);
    }
  }
});
