export class Contato {
  id: number | null;
  nome: string;
  email: string;
  favorito: boolean;
  foto: any;

  constructor(id: number | null, nome: string, email: string, favorito: boolean) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.favorito = favorito;
    this.foto = undefined;
  }
}
