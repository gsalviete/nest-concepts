export class ResponseRecadoDto{
  id: number;
  texto: string;
  de: { id: number };
  para: { id: number };
  lido: boolean;
  data: Date;
  createdAt?: Date;
  updatedAt?: Date;
}