import { Component, inject, OnInit } from '@angular/core';
import { Personaje } from '../../interfaces/personajes.interface';
import { PersonajeService } from '../../service/personaje.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-pj',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './list-pj.component.html',
  styleUrl: './list-pj.component.css'
})
export class ListPjComponent implements OnInit {

  ngOnInit(): void {
    this.listarPjs();
  }

  listaPjs: Personaje[] = [];

  pjService = inject(PersonajeService)

  recibirPj(pj: any) {
    this.listaPjs.push({...pj});
  }

  listarPjs() {
    this.pjService.getPj().subscribe(
      {
        next: (pjs: Personaje[]) => {
          this.listaPjs = pjs
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

  delete(id: any) {
    this.pjService.deletePjById(id).subscribe(
      {
        next: () => {
          console.log('Eliminado')
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }
}
