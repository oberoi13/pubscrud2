import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Books } from './all-books.model';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})

export class AllBooksComponent implements OnInit {

  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;
  constructor(private Dataservice:DataServiceService,private router:Router,public dialog: MatDialog){}
  AllBooks:Books[]

  ngOnInit(): void {
    this.getAllBooks()
  }
  Addbook(){
    this.router.navigate(['/AddBook'])
  }

  getAllBooks(){
    this.Dataservice.getBooksData().subscribe((data:Books[])=> {
      console.log("Books Data Received",data)
    this.AllBooks=data

    console.log(this.AllBooks);

    });
  }
  Edit(id: any) {
    this.router.navigate(['/EditBook',id])

    }
    goBack() {
      this.router.navigate(['/Authors'])}

      DeleteBook(id: string) {
        this.dialogRef = this.dialog.open(this.confirmDialog);
    
        this.dialogRef.afterClosed().subscribe(async result => {
          if (result) {
            console.log('Book deleted:', id);
           const es= await this.Dataservice.DeleteBook(id).subscribe(()=>
            {console.log ("Book delted from table")},
          error=>{console.log("Error",error)})

            // Add your deletion logic here
          } else {
            console.log('Deletion cancelled');
          }
          this.ngOnInit();  
        });
      }
    
      onNoClick(): void {
        this.dialogRef.close(false);
      }
    
      onYesClick(): void {
        this.dialogRef.close(true);
        this.ngOnInit();
      }
}
