import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date string from MM/DD/YYYY to YYYY-MM-DD format
 * @param dateString The date string in MM/DD/YYYY format
 * @returns The formatted date string in YYYY-MM-DD format
 */
export function formatDateToIsoString(dateString: string): string {
    // Parse the date string (assuming MM/DD/YYYY format)
    const dateParts = dateString.split('/');

    if (dateParts.length !== 3) {
        throw new Error('Invalid date format. Expected MM/DD/YYYY');
    }

    const month = dateParts[0].padStart(2, '0');
    const day = dateParts[1].padStart(2, '0');
    const year = dateParts[2];

    // Format to "yyyy-MM-dd"
    return `${year}-${month}-${day}`;
}
