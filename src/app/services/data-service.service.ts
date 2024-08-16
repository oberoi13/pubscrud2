import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Author } from '../Components/table/table.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Books } from '../Books/all-books/all-books.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl:string= "http://localhost:3000/api/authors"
  private apiUrl2:string= "http://localhost:3000/api/Edit"
  private apiUrl3:string= "http://localhost:3000/api/Add"
  private apiUrl4:string= "http://localhost:3000/api/books"

  private apiUrl5:string= "http://localhost:3000/api/book"
  private apiUrl6:string= "http://localhost:3000/api"

  


  


  constructor(private http:HttpClient) { }
 
  
  getData(): Observable<Author[]> {
    console.log("Fetching authors...");
    return this.http.get<Author[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching authors:', error);
        return throwError('Error fetching authors. Please try again later.'); 
        // Customize error message as needed
      })
    );
  }

  deleteAuthor(authorId: string): Observable<any> {
    const url = `${this.apiUrl}/${authorId}`;
    return this.http.delete<any>(url).pipe(
      catchError((error) => {
        console.error('Delete request error:', error);
        return throwError('Error deleting author');
      })
    );
  }
  updateData(id: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.put<any>(url, updatedData, {
     
    });
  }
  async AddAuthor(Data:any ):Promise<Observable<any>>{
  const url =`${this.apiUrl3}`
    return  this.http.post<any>(url, Data,{});
}



getBooksData(): Observable<Books[]> {
  console.log("Fetching authors...");
  return this.http.get<Books[]>(this.apiUrl4).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error fetching authors:', error);
      return throwError('Error fetching authors. Please try again later.'); // Customize error message as needed
    })
  );
}
getSpecificBook(id:string):Observable<any[]>{
  const url= `${this.apiUrl5}/${id}`
  return this.http.get<any[]>(url).pipe(
  catchError((error:HttpErrorResponse)=>
    {console.log('Error',error);
      return throwError('');
    })
  
  );
}

DeleteBookAuthor(authorId:string,titleId:string):Observable<any[]>{
  const url = `${this.apiUrl6}/DelBookAuthor`;
    const body = { au_id: authorId, title_id: titleId };
    return this.http.delete<any>(url,  {body} ).pipe(
      catchError(this.handleError)
    );
}
AddBookAuthor(authorId:string,titleId:string){
  const url = `${this.apiUrl6}/AddAuthtoBooks`;
    const body = { au_id: authorId, title_id: titleId };
    console.log(body)
    return this.http.post<any>(url,  body ).pipe(
      catchError(this.handleError)
    );
}

EditBook(Bookid:string,updatedData:any):Observable<any>{
  const url=`${this.apiUrl6}/EditBook/${Bookid}`
  return this.http.put<any>(url,{updatedData})
}
DeleteBook(ID:string):Observable<any>{
const url=`${this.apiUrl6}/DelBook`
const body = {  title_id: ID };
return this.http.delete<any>(url,  {body} ).pipe(
  catchError(this.handleError)
);
}

AddBook(Data:any):Observable<any>{
  const url = `${this.apiUrl6}/AddBook`
  const body = { Data }
  return this.http.post<any>(url,body).pipe(
    catchError(this.handleError)
  );
}

// updateData(id: number, updatedData: any): Observable<any> {
//   const url = `${this.apiUrl2}/${id}`;
//   return this.http.put<any>(url, updatedData, {
   
//   });
// }
  // Handle errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Something went wrong, please try again later.');
  }
  
}
