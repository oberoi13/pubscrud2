import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Author } from 'src/app/Components/table/table.model';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit,OnDestroy {
  firstPanelOpen = true;
  secondPanelOpen = false;
  firstAccordionInput: string = '';
  isFirstAccordionCompleted = false;
selectedBook:any={}
SavedBook:any={}
addedAuthors: Set<string> = new Set();


//Second Accordion Variable
AllAuthors:Author[];
  SelectedAuths:any
  AuthorId:string
  titleId:string
  searchText: any;
  //End
  
  constructor(private dataService:DataServiceService,private router:Router,private snackBar: MatSnackBar){}
  ngOnDestroy(): void {
    this.firstPanelOpen=true
   this.secondPanelOpen=false
   this.firstAccordionInput=''
   this.isFirstAccordionCompleted=false
  }
  ngOnInit(): void {
   
  }

  async onSave() {
    const x= await this.getform()
    this.dataService.AddBook(x).subscribe(()=>{
      console.log("Book Added");      this.isFirstAccordionCompleted = true;
      this.snackBar.open('First accordion not completed!', 'Close', {
        duration: 2000,
        
      });

    },error=>{console.log(error);this.isFirstAccordionCompleted=false

      this.snackBar.open('First accordion not completed!', 'Close', {
        duration: 2000,
        
      });
    })

      

      this.firstPanelOpen = false;
    
  }

  checkFirstAccordionCompletion() {
    if (!this.isFirstAccordionCompleted) {
      this.snackBar.open('Please complete the first accordion first!', 'Close', {
        duration: 3000,
      });
      this.secondPanelOpen = false;
    }
    this.getAllAuthors()
  }

  getform(){

    this.SavedBook.title_id=this.selectedBook.title_id
    this.SavedBook.title=this.selectedBook.title
    this.SavedBook.type=this.selectedBook.type
    this.SavedBook.price=this.selectedBook.price
    this.SavedBook.sales=this.selectedBook.ytd_sales
    this.SavedBook.date=this.getFormattedDate(this.selectedBook.pubdate)
    console.log("selectedBook",this.selectedBook)
    console.log("Saved Book",this.SavedBook)
    return this.SavedBook

  }
  
goBack() {
this.router.navigate(['/Books'])
}


getFormattedDate(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return '';
  }
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}



//Second Accordion Code
getAllAuthors(){
  this.dataService.getData().subscribe(
    (data:Author[]) => {
      console.log('Data received:', data);
      this.AllAuthors = data; 
      console.log("AAuthor",this.AllAuthors)
      // let filteredAuthors = this.AllAuthors.filter(author => 
      //   !this.SelectedAuths.some(toRemove => toRemove.au_id === author.au_id)
      // );
      // this.AllAuthors=filteredAuthors
      console.log("filtered Authors",this.AllAuthors)
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );
}
AddAuthor(AuthID: string) {
  console.log(AuthID)
  console.log(this.selectedBook.title_id)
  this.dataService.AddBookAuthor(String(AuthID),String(this.selectedBook.title_id)).subscribe(()=>{console.log("Author added to book");    this.addedAuthors.add(AuthID);
  },error=>{console.log("Error",error)}); 
  }

  // called by ng for of table 
  get filteredAuthors() {
    if (!this.searchText) {
      return this.AllAuthors;
    }
    return this.AllAuthors.filter(author => 
      author.au_fname.toLowerCase().includes(this.searchText.toLowerCase()) || 
      author.au_lname.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  //checks if add i clicked then sends true to make the button disable and change text to added
  isAuthorAdded(authorId: any): boolean {
    return this.addedAuthors.has(authorId);
  }

}