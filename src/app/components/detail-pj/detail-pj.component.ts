import { routes } from './../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { PersonajeService } from '../../service/personaje.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Personaje } from '../../interfaces/personajes.interface';

@Component({
  selector: 'app-detail-pj',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-pj.component.html',
  styleUrl: './detail-pj.component.css'
})
export class DetailPjComponent implements OnInit {

  pj?: Personaje
  id?: string | null

  pjService = inject(PersonajeService)
  activatedRoute = inject(ActivatedRoute)
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next: (param) => {
          this.id = param.get('id')
          this.getPjById(this.id)
        }
      }
    )
  }

  getPjById(id: string | null) {
    this.pjService.getPjById(id).subscribe(
      {
        next: (pj: Personaje) => {
          this.pj = pj;
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

}
