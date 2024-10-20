import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { searchTracks } from "@/app/services/tracksService";
import { debounce } from 'lodash';
import { Track } from "@/lib/defenitions";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

type SearchResults = {
  tracks: Track[] | null;
  isLoading: boolean;
  error: Error | null;
};

export default function SearchField() {
  const [query, setQuery] = useState(''); // Состояние для поискового запроса
  const [{tracks, isLoading, error}, setResults] = useState<SearchResults>({
    tracks: null,
    isLoading: false,
    error: null
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
    debounce(async(searchQuery: string) => {
      if (searchQuery.trim().length >= 2) {
        setResults(prev => ({...prev, isLoading: true, error: null}));
        try {
          const tracks = await searchTracks(searchQuery);
          setResults({
            tracks,
            isLoading: false,
            error: null
          });
          setIsDropdownOpen(tracks.length > 0);
        } catch (error) {
          setResults({
            tracks: null,
            isLoading: false,
            error: error as Error
          });
          setIsDropdownOpen(false);
        }
      } else {
        setResults({
          tracks: null,
          isLoading: false,
          error: null
        });
        setIsDropdownOpen(false);
      }
    }, 300),
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
          aria-label="Search"
          aria-expanded={isDropdownOpen}
        />
      </div>

      {isLoading && (
        <div className="absolute z-50 mt-1 w-full rounded-md border p-2 text-center bg-popover">
          Loading...
        </div>
      )}

      {error && (
        <div
          className="absolute z-50 mt-1 w-full rounded-md border p-2 text-center bg-destructive text-destructive-foreground">
          {error.message}
        </div>
      )}

      {isDropdownOpen && tracks && tracks.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-b-md border shadow-lg bg-popover border-border text-foreground"
          role="listbox"
        >
          <ScrollArea className="h-60">
            <ul className="py-1 text-sm">
              {tracks.map((track: any) => (
                <li
                  key={track._id}
                  role="option"
                  className="cursor-pointer px-4 py-2 transition-all duration-150 group hover:bg-accent"
                  onClick={() => {
                    console.log(track);
                    setIsDropdownOpen(false); // Закрыть меню при выборе
                  }}
                >
                  <div className="font-medium text-primary group-hover:text-primary-foreground">
                    {track.title}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-foreground">
                    {track.artist.name} • {track.album?.title}
                  </div>
                </li>
              ))
              }
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
