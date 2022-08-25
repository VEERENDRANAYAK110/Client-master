import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseurl ='https://localhost:7070/api/';
  private currentuserSource = new ReplaySubject<User>(1);
  currentUser$=this.currentuserSource.asObservable();

  constructor(private http:HttpClient) { }

   login(model:any)
   {
    return this.http.post<User>(this.baseurl+'account/login',model).pipe(
      map((response:User)=>
      {
        const user=response;
        if(user)
        {
          localStorage.setItem('User',JSON.stringify(user));
          this.currentuserSource.next(user);
        }
      })
    )
   }
   register(model:any)
   {
    return this.http.post<User>(this.baseurl+'account/register',model).pipe(
      map((user:User)=>{
        if(user)
        {
          localStorage.setItem('User',JSON.stringify(user));
          this.currentuserSource.next(user);
        }
      })
    )
   }

   setCurrentUser(user:User)
   {
    this.currentuserSource.next(user);
   }

  logout()
  {
    localStorage.removeItem('User');
    this.currentuserSource.next(null);
  }


}
