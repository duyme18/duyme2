import { Book } from "./book";

export interface IFile {
    id: string;
    data: string;
    name: string;
    book: Book;
}
