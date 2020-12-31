import { Author } from "./author";

export interface Book {
    bookId?: string;
    bookName: string;
    translator: string;
    bookAmount: string;
    publishingYear: Date;
    rentConst: string;
    author?: Author;
}
