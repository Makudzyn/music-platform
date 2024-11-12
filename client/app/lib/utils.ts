import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DecodedToken, Track } from '@lib/defenitions';
import { createAsyncThunk } from '@reduxjs/toolkit';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Function for formatting seconds into 00:00 string format
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

//Function for formatting the date into the string format 00 Mmm, 0000
export function formatDate(createdAt: Date): string {
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

// Function to convert bitrate to kbps. Can convert numbers and strings with units (100 kbps/mbps/bps).
// Returns number or null
export function convertToKbps(bitrate: string | number): number | null {
  // If a number is transmitted, consider it to be bps
  if (typeof bitrate === 'number') {
    return Math.round(bitrate / 1000);
  }

  // Clear the string of spaces and convert to lower case
  const cleanBitrate = bitrate.toLowerCase().replace(/\s+/g, '');

  // Retrieve the number and unit of measure
  const match = /^(\d+\.?\d*)(kbps|mbps|bps)?$/.exec(cleanBitrate);
  if (!match) return null;

  const [, value, unit = 'bps'] = match;
  const numValue = parseFloat(value);

  if (isNaN(numValue)) return null;

  // Convert to kbps depending on the unit of measure
  switch (unit) {
    case 'kbps':
      return Math.round(numValue);
    case 'mbps':
      return Math.round(numValue * 1000);
    case 'bps':
      return Math.round(numValue / 1000);
    default:
      return null;
  }
}

//Function for comparing arrays of Track type for equality by _id.
export function areArraysEqualUnordered(
  tracks: Track[],
  queue: Track[],
): boolean {

  if (tracks.length !== queue.length) return false;

  const tracksIds = tracks.map((track) => track._id).sort();
  const queueIds = queue.map((track) => track._id).sort();

  for (let i = 0; i < tracksIds.length; i++) {
    if (tracksIds[i] !== queueIds[i]) {
      return false;
    }
  }

  return true;
}

//Function for shuffling tracks in an array.
export function shuffleArray(array: Track[]): Track[] {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

//Function to convert seconds to general format (00 min 00 sec; about 0 hr; about 0 hr 00 min)
//Used to calculate the total duration of tracks in the playlist
export function formatTotalDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const seconds = Math.floor(totalSeconds % 60);

  if (hours === 0) {
    // If the duration is less than an hour, show minutes and seconds exactly
    return `${minutes} min ${seconds} sec`;
  } else if (hours === 1 && remainingMinutes === 0) {
    // If it's exactly one hour, display "about 1 hr"
    return 'about 1 hr';
  } else if (hours === 1) {
    // If it's over one hour but less than two, show "about 1 hr, X min"
    return `about 1 hr ${remainingMinutes} min`;
  } else if (remainingMinutes === 0) {
    // If it's exactly a multiple of hours, display only hours
    return `about ${hours} hr`;
  } else {
    // If it's multiple hours and some minutes, show "about X hr, Y min"
    return `about ${hours} hr ${remainingMinutes} min`;
  }
}

//Function to check if the token has expired
export const isTokenExpired = (decodedToken: DecodedToken) => {
  return decodedToken.exp * 1000 < Date.now();
};

//Template of thunk function that is used in Redux requests
export const createLoadThunk = <T extends string>(
  type: string,
  fetchFunction: (id: T) => Promise<object[]>,
) =>
  createAsyncThunk<object[], T>(type, async (id: T) => {
    return await fetchFunction(id);
  });
