import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from './file.model';

// const API_URL = 'http://api.openservice.in.th/';
const API_URL = 'https://api.aiforthai.in.th/ovmif/';

        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Accept': 'application/json',
        // 'X-Host': 'ovmif'        

const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'apikey': 'YuUFCUPPsGVkqeOHPxM0D3sTWKkzowlW',
    })
};

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }

    uploadFile(theFile): Observable<any> {
        return this.http.post<any>(
            API_URL, theFile, httpOptions);
    }
}
