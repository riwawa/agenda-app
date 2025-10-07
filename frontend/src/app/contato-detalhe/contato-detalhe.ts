import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Contato } from '../contato/contato';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contato-detalhe',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './contato-detalhe.html',
  styleUrl: './contato-detalhe.css'
})
export class ContatoDetalheComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContatoDetalheComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato
  ) {}

  ngOnInit(): void {
  }

  fechar(){
    this.dialogRef.close();
  }
}
