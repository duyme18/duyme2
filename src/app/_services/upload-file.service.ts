import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private readonly homeUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  upload(file: File | undefined): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    // @ts-ignore
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.homeUrl}upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.homeUrl}files`);
  }
}
