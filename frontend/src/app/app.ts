import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ContatoComponent } from './contato/contato.component';
import { ContatoService } from './contato.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    ContatoComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  providers: [ContatoService]
})
export class App {
  protected readonly title = signal('agenda-app');
}
