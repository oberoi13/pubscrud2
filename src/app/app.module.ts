import { NgModule } from '@angular/core';
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


import { MatButtonModule } from '@angular/material/button';
import { AddAuthorComponent } from './Components/add-author/add-author.component'; // Import MatButtonModule for mat-raised-button
import { PhoneDirective } from './directives/PhoneDirective';
import { AuthIDDirective } from './directives/IdDirective';



@NgModule({
  declarations: [
    PhoneDirective,
    AuthIDDirective,
    AppComponent,
    TableComponent,
    EditComponent,
    AddAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
