import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './Components/table/table.component';
import {  HttpClientModule } from '@angular/common/http';
import { EditComponent } from './Components/edit/edit.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Ensure BrowserAnimationsModule is imported if not already
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { AddAuthorComponent } from './Components/add-author/add-author.component'; // Import MatButtonModule for mat-raised-button
import { PhoneDirective } from './directives/PhoneDirective';
import { AuthIDDirective } from './directives/IdDirective';
import { AllBooksComponent } from './Books/all-books/all-books.component';
import { EditBooksComponent } from './Books/edit-books/edit-books.component';
import { AddAuthorsDialogComponent } from './Books/add-authors-dialog/add-authors-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBookComponent } from './Books/add-book/add-book.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    PhoneDirective,
    AuthIDDirective,
    AppComponent,
    TableComponent,
    EditComponent,
    AddAuthorComponent,
    AllBooksComponent,
    EditBooksComponent,
    AddAuthorsDialogComponent,
    AddAuthorsDialogComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    DatePipe,MatPaginatorModule,MatTableModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }