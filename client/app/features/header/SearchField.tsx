import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { searchTracks } from "@/app/services/tracksService";
import { debounce } from 'lodash';

export default function SearchField() {
  const [query, setQuery] = useState(''); // Состояние для поискового запроса
  const [results, setResults] = useState([]); // Состояние для результатов поиска
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Обработка кликов вне области меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current!.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Закрытие при клике вне меню
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearchChange = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length >= 2) {
        try {
          const tracks = await searchTracks(searchQuery);
          setResults(tracks);
          setIsDropdownOpen(tracks.length > 0); // Открываем только если есть результаты
        } catch (error) {
          setIsDropdownOpen(false);
          console.error('Search error:', error);
        }
      } else {
        setIsDropdownOpen(false);
      }
    }, 300), // 300 мс задержка
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearchChange(searchQuery);
  };

  return (
    <div className="relative w-64">
      <div className="relative">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 transform size-4 text-muted-foreground"/>
        <Input
          type="search"
          placeholder="Search songs, albums, artists"
          className="w-full pl-8"
          value={query}
          onChange={onChangeInput}
        />
      </div>
      {isDropdownOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-b-md border shadow-lg bg-popover border-border text-foreground"
        >
          <ul className="max-h-60 overflow-y-auto scroll-smooth custom-scrollbar py-1 text-sm">
            {results.length > 0 ? (
              results.map((track: any) => (
                <li
                  key={track._id}
                  className="cursor-pointer px-4 py-2 transition-all duration-150 group hover:bg-accent"
                  onClick={() => {
                    console.log(track);
                    setIsDropdownOpen(false); // Закрыть меню при выборе
                  }}
                >
                  <div className="font-medium text-primary group-hover:text-primary-foreground">{track.title}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground">
                    {track.artist} {track.album?.title}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-muted-foreground">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
