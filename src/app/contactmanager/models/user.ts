import {Note} from './note';

export class User {
  id: number;
  birthdate: Date;
  name: string;
  avatar: string;
  bio: string;
  note: Note[] = [];
}
