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

