import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Track } from "@/lib/defenitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export function formatDate(createdAt: Date): string {
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}


export function shuffleArray(array: Track[]): Track[] {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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
    return "about 1 hr";
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


