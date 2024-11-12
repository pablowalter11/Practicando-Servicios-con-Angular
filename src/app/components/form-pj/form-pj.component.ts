import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Personaje } from '../../interfaces/personajes.interface';
import { PersonajeService } from '../../service/personaje.service';

@Component({
  selector: 'app-form-pj',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-pj.component.html',
  styleUrl: './form-pj.component.css'
})
export class FormPjComponent {

  fb = inject(FormBuilder)
  pjService = inject(PersonajeService)

  form = this.fb.nonNullable.group(
    {
      id: ['', Validators.required],
      nombre: ['', [Validators.required]],
      estilo_pelea: ['', [Validators.required]],
      primera_aparicion: [0,[Validators.required]],
      ultima_aparicion: [0,[Validators.required]]
    }
  )

  addPj() {
    if(this.form.invalid) return;

    const pj = this.form.getRawValue()

    pj.id = this.generarCodigoAleatorio(4)

    this.addPjDB(pj)
  }

  addPjDB(pj: Personaje) {
    this.pjService.postPj(pj).subscribe(
      {
        next: (pj: Personaje) => {
          console.log(pj)
          alert('PJ Guardado!')
        },
        error: (e: Error) => {
          console.error(e.message)
        }
      }
    )
  }

  generarCodigoAleatorio(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres[indiceAleatorio];
    }
    
    return resultado;
  }
}
