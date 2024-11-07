import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CookieLogo from '@/app/features/logo/CookieLogo';
import CurrentIcon from '@/app/features/header/CurrentIcon';
import SearchField from '@/app/features/header/SearchField';
import ThemeToggleButton from '@/app/features/header/ThemeToggleButton';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface HeaderProps {
  isExpanded: boolean;
  toggleNavPanel: () => void;
}

export default function Header({ isExpanded, toggleNavPanel }: HeaderProps) {
  return (
    <header className="z-50 box-border flex h-16 w-full items-center justify-between border-b border-border bg-background">
      <CustomTooltip
        content={isExpanded ? 'Close side panel' : 'Expand side panel'}
      >
        <div className="flex items-center justify-center min-w-16 min-h-16 size-16">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNavPanel}
            className="box-border rounded-none border-b border-transparent size-full hover:border-border"
          >
            {isExpanded ? <X /> : <Menu />}
            <span className="sr-only">
              {' '}
              {isExpanded ? 'Collapse menu' : 'Expand menu'}
            </span>
          </Button>
        </div>
      </CustomTooltip>

      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <CookieLogo />
          <SearchField />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <CurrentIcon />
        </div>
      </div>
    </header>
  );
}
