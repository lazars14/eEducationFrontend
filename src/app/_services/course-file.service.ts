import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { CourseFile } from '../_model/index';

@Injectable()
export class CourseFileService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll() {
    return this.httpService.get(this.apiUrl + '/courseFiles')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(courseId: number, courseFileId: number) {
    return this.httpService.get(this.apiUrl + '/courseFiles/' + courseFileId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(courseId: number, courseFile: CourseFile) {
    return this.httpService.post(this.apiUrl + '/courseFiles/', courseFile)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(courseId: number, courseFile: CourseFile) {
    return this.httpService.put(this.apiUrl + '/courseFiles/' + courseFile.id, courseFile)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(courseId: number, courseFileId: number) {
    return this.httpService.delete(this.apiUrl + '/courseFiles/' + courseFileId)
    .map((res) => res.status)
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourseLesson(lessonId: number) {
    return this.httpService.get(this.apiUrl + '/courseFiles/courseLessons/' + lessonId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getCourseNotificationFiles(courseId: number) {
    return this.httpService.get(this.apiUrl + '/courseFiles/courses/' + courseId + '/notifications')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
