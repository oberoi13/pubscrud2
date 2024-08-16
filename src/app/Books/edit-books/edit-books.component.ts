import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Books } from '../all-books/all-books.model';
import { MatDialog } from '@angular/material/dialog';
import { AddAuthorsDialogComponent } from '../add-authors-dialog/add-authors-dialog.component';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.css']
})
export class EditBooksComponent implements OnInit {
goBack() {
this.router.navigate(['/Books'])
}
  AllBooks: Books[];
  UpdatedBooks:any={};
  selectedBook:Books;
  Authors:any
  constructor(private Dataservice:DataServiceService,private router:Router,private ActiveRoute:ActivatedRoute,private dialog:MatDialog){}

  private Titlid:string

ngOnInit(): void {
 this.Titlid=this.ActiveRoute.snapshot.paramMap.get('id');
 this.getAllBooks()
 this.getBooksAuthors();
}

getAllBooks(){
  this.Dataservice.getBooksData().subscribe((data:Books[])=> {
    console.log("Books Data Received",data)
  this.AllBooks=data
  this.filterAuthors(this.Titlid);
  console.log(this.selectedBook);

  console.log(this.AllBooks);

  });
}

filterAuthors(id: string) {
  // console.log("Edit All Authors:", this.AllAuthors);
  
this.selectedBook=this.AllBooks.find(x=>x.title_id==id)
  console.log("Edit Selected Author:", this.selectedBook);

}



getBooksAuthors(){
  this.Dataservice.getSpecificBook(this.Titlid).subscribe((data:any)=>{
   console.log("Specific Book Received",data)
   this.Authors=data ? data:null;
  },error => {
    console.error("Error",error)
    return null
  });
}
RemoveAuthor(A:string,T:string){
  this.Dataservice.DeleteBookAuthor(A,T).subscribe( () => {
    console.log('Author deleted successfully');
    // Optionally, update UI or perform other actions upon successful deletion
    this.ngOnInit()
  },
  error => {
    console.error('Error deleting author:', error);
    // Handle error, display error message, etc.
  });
}

openAddAuthorDialog(TitleId:string): void {
  const dialogRef = this.dialog.open(AddAuthorsDialogComponent, {
    width: '400px',
    data: { Authors:this.Authors, titleId:TitleId }

  });

  dialogRef.afterClosed().subscribe(result => {
    
      this.ngOnInit()
    
  });
}
onSave(){
  this.UpdatedBooks.title=this.selectedBook.title;
  this.UpdatedBooks.type=this.selectedBook.type;
  this.UpdatedBooks.price=this.selectedBook.price
  this.UpdatedBooks.sale=this.selectedBook.ytd_sales;
  this.UpdatedBooks.date=this.selectedBook.pubdate;
  console.log(this.UpdatedBooks)

  this.Dataservice.EditBook(this.selectedBook.title_id,this.UpdatedBooks).subscribe(()=>
  {console.log("Book updtaed")},
error=>{console.log(error)});
}


}
