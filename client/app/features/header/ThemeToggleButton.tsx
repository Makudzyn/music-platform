'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@ui/switch';
import { Label } from '@ui/label';
import { Moon, Sun } from 'lucide-react';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CustomTooltip content="Toggle theme">
      <div className="flex items-center space-x-2 transition-all">
        <div className="relative">
          <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 opacity-0 transition-all dark:opacity-100 dark:rotate-0 dark:scale-100" />
        </div>
        <Switch
          id="theme-toggle"
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <Label htmlFor="theme-toggle" className="sr-only">
          Toggle theme
        </Label>
        <div className="relative">
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all opacity-100 dark:opacity-0 dark:rotate-90 dark:scale-0" />
        </div>
      </div>
    </CustomTooltip>
  );
}
