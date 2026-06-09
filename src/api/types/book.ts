export interface Book {
    id: number;
    name: string;
    category: string;
    authorName: string;
    authorSurname: string;
    country: string;
    state: string;
    availableCopies: number;
}

export interface BookFormData {
    name: string;
    category: string;
    authorId: number;
    state: string;
    availableCopies: number;
}