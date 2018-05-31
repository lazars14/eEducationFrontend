import { Injectable } from '@angular/core';
import { HttpService, ErrorHandlerService } from '../_core/index';
import { environment } from '../../environments/environment';
import { CourseLesson, Course } from '../_model/index';

@Injectable()
export class CourseLessonService {

  constructor(private httpService: HttpService, private errorHandlerService: ErrorHandlerService) {}

  apiUrl = environment.apiUrl;

  findAll(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/courseLessons')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  findById(courseId: number, courseLessonId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/courseLessons/' + courseLessonId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  create(courseId: number, courseLesson: CourseLesson) {
    return this.httpService.post(this.apiUrl + '/course/' + courseId + '/courseLessons/', courseLesson)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  update(courseId: number, courseLesson: CourseLesson) {
    return this.httpService.put(this.apiUrl + '/course/' + courseId +  '/courseLessons/' + courseLesson.id, courseLesson)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  delete(courseId: number, courseLessonId: number) {
    return this.httpService.delete(this.apiUrl + '/course/' + courseId + '/courseLessons/' + courseLessonId)
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }

  getByCourse(courseId: number) {
    return this.httpService.get(this.apiUrl + '/course/' + courseId + '/courseLessons/byCourse')
    .map((res) => res.json())
    .catch(err => this.errorHandlerService.handleError(err));
  }
}
