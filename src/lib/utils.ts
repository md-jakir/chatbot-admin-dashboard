import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomId = () => uuidv4();

