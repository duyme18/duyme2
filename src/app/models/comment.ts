import { Book } from "./book";
import { User } from "./user";

export interface Comment {
    id: string;
    content?: string;
    commentDate?: Date;
    isEdit?: Boolean;
    book?: Book;
    user?: User;
}
