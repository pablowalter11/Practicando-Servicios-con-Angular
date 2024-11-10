import { Routes } from '@angular/router';
import { FormPjComponent } from './components/form-pj/form-pj.component';
import { ListPjComponent } from './components/list-pj/list-pj.component';
import { UpdatePjPageComponent } from './pages/update-pj-page/update-pj-page.component';

export const routes: Routes = [
    { path: 'form', component: FormPjComponent },
    { path: 'list', component: ListPjComponent },
    { path: 'update/:id', component: UpdatePjPageComponent },
    { path: '**', redirectTo: '' }
];
