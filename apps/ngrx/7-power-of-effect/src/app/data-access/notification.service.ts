import { PushService } from '@angular-challenges/power-of-effect/backend';
import {
  isSchool,
  isStudent,
  isTeacher,
  Push,
} from '@angular-challenges/power-of-effect/model';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { studentActions } from '../student/store/student.actions';
import { teacherActions } from '../teacher/store/teacher.actions';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private pushService = inject(PushService);
  private store = inject(Store);

  init() {
    this.pushService.notification$
      .pipe(filter(Boolean))
      .subscribe((notification: Push) => {
        if (isTeacher(notification)) {
          this.store.dispatch(
            teacherActions.addOneTeacher({ teacher: notification }),
          );
        }
        if (isStudent(notification)) {
          this.store.dispatch(
            studentActions.addOneStudent({ student: notification }),
          );
        }
        if (isSchool(notification)) {
          // SchoolStore is a ComponentStore.  We can't dispatch a school action here.
          // We are stuck.  We must have done something wrong and need to refactor...
        }
      });
  }
}
