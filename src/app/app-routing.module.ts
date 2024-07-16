import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './Components/edit/edit.component';
import { TableComponent } from './Components/table/table.component';
import { AddAuthorComponent } from './Components/add-author/add-author.component';
import { AllBooksComponent } from './Books/all-books/all-books.component';

const routes: Routes = [{ path: '', component: TableComponent },{ path: 'Authors', component: TableComponent },{ path: 'Edit/:id', component: EditComponent },{path:'Add',component:AddAuthorComponent},
  {path:'/Books',component:AllBooksComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
