import { User } from './user';
import { Book } from './book';

export interface Comment {
    commentId: number;
    content?: string;
    commentDate?: Date;
    isEdit?: Boolean;
    book?: Book;
    user?: User;
}
