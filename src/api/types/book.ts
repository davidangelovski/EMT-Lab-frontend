import type { Author } from './author';

export interface Book {
    id: number;
    name: string;
    category: string;
    author: Author;
    state: string;
    available_copies: number;
}

