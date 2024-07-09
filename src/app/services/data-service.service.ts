import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Author } from '../Components/table/table.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl:string= "http://localhost:3000/api/authors"
  private apiUrl2:string= "http://localhost:3000/api/Edit"
  private apiUrl3:string= "http://localhost:3000/api/Add"

  


  constructor(private http:HttpClient) { }
 
  
  getData(): Observable<Author[]> {
    console.log("Fetching authors...");
    return this.http.get<Author[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching authors:', error);
        return throwError('Error fetching authors. Please try again later.'); // Customize error message as needed
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
  // Handle errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Something went wrong, please try again later.');
  }
  
}
