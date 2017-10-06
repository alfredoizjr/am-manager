import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationService {

  constructor(private _service: NotificationsService) { }

success(message:string){
  this._service.success('Done!',message,{
    timeOut: 2000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 150,
    animate: "scale"
  });
}

error(error:string){
  this._service.error('Error!',error,{
    timeOut: 2000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 150,
    animate: "scale"
  });
}


}
