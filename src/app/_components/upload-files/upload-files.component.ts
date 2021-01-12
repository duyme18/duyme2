import { IFile } from './../../models/file';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/_services/upload-file.service';

@Component({
  selector: 'duyme2-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  public bookId = 0;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  files: IFile[] = [];
  fileInfos?: Observable<any>;
  fileForm = new FormGroup({
    file: new FormControl(''),
    data: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
    private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.fileInfos = this.uploadService.getFiles();
  }

  // tslint:disable-next-line:typedef
  // selectFile(event: any) {
  //   this.selectedFiles = event.target.files;
  // }

  private getAllFilesByBook() {
    this.uploadService.getFilesByBook(this.bookId).subscribe((data) => {
      this.files = data;
      console.log(this.files)
    })
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          // @ts-ignore
          this.files.push(event.target.result);

          this.fileForm.patchValue({
            data: this.files
          });
          console.log(this.files)
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  upload() {
    this.progress = 0;

    // @ts-ignore
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.bookId, this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }
}
