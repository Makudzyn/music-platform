'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { searchTracks } from '@/app/services/tracksService';
import { debounce } from 'lodash';
import { Artist, Playlist, Track } from '@/lib/defenitions';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import TrackSearchItem from '@/app/features/tracks/TrackSearchItem';
import ArtistSearchItem from '@/app/features/artists/ArtistSearchItem';
import PlaylistSearchItem from '@/app/features/playlists/PlaylistSearchItem';

interface SearchResults {
  tracks: Track[];
  artists: Artist[];
  playlists: Playlist[];
}

export default function SearchField() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    tracks: [],
    artists: [],
    playlists: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handling clicks outside the menu area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Closing when clicked outside the menu
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      setIsLoading(false);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleClose = useCallback(() => {
    setIsDropdownOpen(false);
    setQuery('');
  }, []);

  //Search with debounce
  const handleSearchChange = useCallback(
    debounce(async (searchQuery: string) => {
      //Start search if there are at least two characters, not counting spaces.
      if (searchQuery.trim().length >= 2) {
        setIsLoading(true);
        try {
          const searchResults = await searchTracks(searchQuery);
          setResults(searchResults);
          const ifArraysNotEmpty =
            searchResults.tracks.length > 0 ||
            searchResults.artists.length > 0 ||
            searchResults.playlists.length > 0;
          setIsDropdownOpen(ifArraysNotEmpty);
        } catch (error) {
          setError(error.message);
          setIsDropdownOpen(false);
        }
      } else {
        setResults({ tracks: [], artists: [], playlists: [] });
        setIsDropdownOpen(false);
      }
    }, 400),
    [],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleSearchChange(searchQuery);
  };

  return (
    <div className="relative w-64">
      <div className="relative">
        <Search className="absolute top-1/2 left-2 -translate-y-1/2 transform transition-all size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search songs, albums, artists"
          className={cn(
            'w-full pl-8 transition-all border-border',
            isDropdownOpen && 'rounded-b-none',
          )}
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
        <div className="absolute z-50 mt-1 w-full rounded-md border p-2 text-center bg-destructive text-destructive-foreground">
          {error}
        </div>
      )}

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full rounded-b-md border shadow-lg bg-popover border-border text-foreground"
          role="listbox"
        >
          <ScrollArea className="h-96">
            {results.tracks.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                  Tracks
                </div>
                <ul className="pb-2">
                  {results.tracks.map((track) => (
                    <Fragment key={track._id}>
                      <TrackSearchItem track={track} onSelect={handleClose} />
                    </Fragment>
                  ))}
                </ul>
              </>
            )}

            {results.artists.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                  Artists
                </div>
                <ul className="pb-2">
                  {results.artists.map((artist) => (
                    <Fragment key={artist._id}>
                      <ArtistSearchItem
                        artist={artist}
                        onSelect={handleClose}
                      />
                    </Fragment>
                  ))}
                </ul>
              </>
            )}

            {results.playlists.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                  Albums & Playlists
                </div>
                <ul className="pb-2">
                  {results.playlists.map((playlist) => (
                    <Fragment key={playlist._id}>
                      <PlaylistSearchItem
                        playlist={playlist}
                        onSelect={handleClose}
                      />
                    </Fragment>
                  ))}
                </ul>
              </>
            )}
            <ScrollBar className="w-3" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
