import { Component, OnInit } from '@angular/core';
import { CourseLesson, CourseFile } from '../_model/index';
import { CourseLessonService, CourseFileService } from '../_services/index';
import { SessionService } from './../_core/index';
import { Router } from '@angular/router';
import { roles } from './../_core/constants';
import { ToasterService } from 'angular2-toaster';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.css']
})
export class CourseLessonComponent implements OnInit {

  constructor(private courseLessonService: CourseLessonService, private router: Router,
    private sessionService: SessionService, private courseFileService: CourseFileService,
    private toasterService: ToasterService, private dialogService: DialogService) { }

  courseLesson: CourseLesson;
  courseLessonId: number;
  courseId: number;
  courseFiles = [];
  role: string;

  teacher = roles.teacher;

  ngOnInit() {
    this.courseLesson = new CourseLesson();
    this.role = this.sessionService.getUserRole(this.router.url);

    // get course lesson id
    const urlParts = this.router.url.split('/');
    this.courseId = Number(urlParts[4]);
    this.courseLessonId = Number(urlParts[6]);
    
    this.courseLessonService.findById(this.courseId, this.courseLessonId).subscribe(courseLesson => {
      this.courseLesson = courseLesson;

      // get files for lesson
      this.loadCourseFiles();

    }, error => {
      this.toasterService.pop({type: 'error', title: 'Find Course Lesson By Id', body: error.status + ' ' + error.statusText });
    });
  }

  loadCourseFiles() {
    this.courseFileService.getByCourseLesson(this.courseLessonId).subscribe(courseFiles => {
      this.courseFiles = courseFiles;
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Find Course Files By Lesson Id', body: error.status + ' ' + error.statusText });
    });
  }

  onChange(files: any) {
    if (files.length > 0) {
      const formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        formData.append('file', files[index]);
      }
      this.courseFileService.create(this.courseId, this.courseLessonId, formData).subscribe(status => {
        this.toasterService.pop({type: 'success', title: 'Added Files For Course Lesson', body: '' });
        this.loadCourseFiles();
      }, error => {
        this.toasterService.pop({type: 'error', title: 'Upload Course Files', body: error.status + ' ' + error.statusText });
      });
    }
  }

  delete(courseFileId: number) {
    let disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      header: 'Delete Course File', 
      text: 'Are you sure you want to delete this course file?'})
      .subscribe((isConfirmed)=>{
          //We get dialog result
          if(isConfirmed) {
            this.courseFileService.delete(courseFileId).subscribe(status => {
              this.toasterService.pop({type: 'success', title: 'Deleted Course Files', body: '' });
              this.loadCourseFiles();
            }, error => {
              this.toasterService.pop({type: 'error', title: 'Delete Course File By Id', body: error.status + ' ' + error.statusText });
            });
          }
          else {
            // do nothing, dialog closed
          }
      });
    
  }

  download(courseFile: CourseFile) {   
    this.courseFileService.download(this.courseId, courseFile.id).subscribe(file => {
      const blob = new Blob([file['_body']], { type: courseFile.mimeType });

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = courseFile.documentName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      this.toasterService.pop({type: 'error', title: 'Download Notification File By Id', body: error.status + ' ' + error.statusText });
    });
  }

}
