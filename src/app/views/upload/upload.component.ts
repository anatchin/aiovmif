import { Component, OnInit } from "@angular/core";
import { UploadService } from "../../_services/upload.service";
import { FileToUpload } from "../../_services/file.model";
import { Lightbox } from "ngx-lightbox";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { TokenStorageService } from "../../_services/token-storage.service";

// Maximum file size allowed to be uploaded = 10MB
const MAX_SIZE: number = 1048576 * 10;

@Component({
  selector: "app-upload",
  templateUrl: "upload.component.html",
  styleUrls: ["upload.component.css"],
})
export class UploadComponent implements OnInit {
  // files: any = [];
  theFiles: any[] = [];
  messages: string[] = [];
  imgs: FileToUpload[] = [];
  albums = [];
  loading: boolean = false;

  isLoggedIn = false;
  roles: string[] = [];

  constructor(
    private uploadService: UploadService,
    private _lightbox: Lightbox,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngAfterViewInit() {
    // console.log(this.albums);
  }

  onFileChange(event) {
    this.theFiles = [];

    // See if any file(s) have been selected from input
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let file = event.target.files[index];

        // Don't allow file sizes over 10MB
        if (file.size < MAX_SIZE) {
          // Set theFile property
          this.theFiles.push(file);
        } else {
          // Display error message
          this.messages.push("File: " + file.name + " is too large to upload.");
        }
      }
    }
  }

  private readAndUploadFile(theFile: any) {
    let file = new FileToUpload();

    // Set File Information
    file.fileName = theFile.name;
    // file.fileSize = theFile.size;
    // file.fileType = theFile.type;
    // file.lastModifiedTime = theFile.lastModified;
    // file.lastModifiedDate = theFile.lastModifiedDate;

    let reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result.toString();
      file.uploadfile = theFile;
      file.draw = 1;

      var formData = new FormData();
      formData.append("uploadfile", theFile);
      formData.append("draw", "1");

      // POST to server
      this.uploadService.uploadFile(formData).subscribe((resp) => {
        var image = new FileToUpload();
        image.fileAsBase64 = resp.base64img;
        image.fileName = file.fileName;
        this.imgs.push(image);
        this.messages.push(file.fileName + "- Upload complete");

        // Albums
        const album = {
          src: image.fileAsBase64,
          caption: image.fileName,
        };
        this.albums.push(album);

        if (this.imgs.length == this.theFiles.length) {
          this.loading = false;
        }
        console.log(this.loading);
      });
    };
    // Read the file
    reader.readAsDataURL(theFile);
  }

  uploadFile(event) {
    this.imgs = [];
    this.messages = [];
    this.loading = true;

    for (let index = 0; index < this.theFiles.length; index++) {
      this.readAndUploadFile(this.theFiles[index]);
    }
  }

  onSave() {

    // alert(JSON.stringify(this.imgs));
    // alert(JSON.stringify(this.albums));
    alert('บันทึกข้อมูลของคุณเสร็จเรียบร้อย');
    window.location.reload();
    // this.router.navigateByUrl('/upload');

  }

  open(index: number): void {
    this._lightbox.open(this.albums, index);
  }

  close(): void {
    this._lightbox.close();
  }
}
