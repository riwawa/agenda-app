import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
  templateUrl: './contato.html',
  styleUrls: ['./contato.css']
})
export class ContatoComponent implements OnInit {
  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['id', 'nome', 'email', 'favorito'];

  totalElements = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10, 15, 20];

  constructor(
    private service: ContatoService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);
  }

  montarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  listarContatos(pagina = 0, tamanho = 10): void {
    this.service.list(pagina, tamanho).subscribe({
      next: (resposta: any) => {
        this.contatos = resposta.content;
        this.totalElements = resposta.totalElements;
        this.pagina = resposta.number;
        this.tamanho = resposta.size;
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao listar contatos', err)
    });
  }

  favoritar(contato: Contato): void {
    contato.favorito = !contato.favorito;

    this.service.favourite(contato).subscribe({
      next: (response: any) => {
        contato.favorito = response?.favorito ?? contato.favorito;
      },
      error: (err) => console.error('Erro ao favoritar contato', err)
    });
  }

  submit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formValues = this.formulario.value;
    const contato: Contato = new Contato(null, formValues.nome, formValues.email, false);

    this.service.save(contato).subscribe({
      next: (resposta) => {
        this.formulario.reset();
        this.contatos = [...this.contatos, resposta];
        this.cd.markForCheck();
      },
      error: (err) => console.error('Erro ao salvar contato', err)
    });
  }

  uploadFoto(event: any, contato: Contato): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const foto = files[0];
      const formData = new FormData();
      formData.append('foto', foto);

      const reader = new FileReader();
      reader.onload = () => (contato.foto = reader.result as string);
      reader.readAsDataURL(foto);

      this.service.upload(contato, formData).subscribe({
        next: () => this.listarContatos(),
        error: (err) => console.error('Erro ao enviar foto', err)
      });
    }
  }

  visualizarContato(contato: Contato): void {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    });
  }
}
