import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonajeService } from '../../service/personaje.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Personaje } from '../../interfaces/personajes.interface';

@Component({
  selector: 'app-update-pj',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-pj.component.html',
  styleUrl: './update-pj.component.css'
})
export class UpdatePjComponent implements OnInit {

  id: string | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      {
        next: (param) => {
          this.id = param.get('id')
          this.getPjById(this.id)
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

  fb = inject(FormBuilder)
  pjService = inject(PersonajeService)
  activatedRoute = inject(ActivatedRoute)
  route = inject(Router)

  form = this.fb.nonNullable.group(
    {
      id: [''],
      nombre: ['', Validators.required], 
      estilo_pelea: ['', Validators.required], 
      primera_aparicion: [0, Validators.required], 
      ultima_aparicion: [0, Validators.required], 
    }
  )

  getPjById(id: string | null) {
    this.pjService.getPjById(id).subscribe(
      {
        next: (pj: Personaje) => {
          this.form.controls['id'].setValue(pj.id)
          this.form.controls['nombre'].setValue(pj.nombre)
          this.form.controls['estilo_pelea'].setValue(pj.estilo_pelea)
          this.form.controls['primera_aparicion'].setValue(pj.primera_aparicion)
          this.form.controls['ultima_aparicion'].setValue(pj.ultima_aparicion)
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

  update() {
    if(this.form.invalid) return;

    const pj = this.form.getRawValue()

    this.pjService.putPj(pj,pj.id).subscribe(
      {
        next: () => {
          alert("Cambiado correctamente!")
          this.route.navigateByUrl('list')
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

}
