import { Contato } from "./contato/contato";
export class PaginaContato {
  content: Contato[];
  totalElements: number;
  size: number;
  number: number;

  constructor(content: Contato[], totalElements: number, size: number, number: number) {
    this.content = content;
    this.totalElements = totalElements;
    this.size = size;
    this.number = number;
  }
}   