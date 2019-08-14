import {Injectable} from '@angular/core';
import {Message, MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {

  constructor(private messageService: MessageService) {
  }

  addSingle(err: { timestamp: string, status: number, error: string, message: string, path: string }) {
    this.messageService.add(this.composeErrorMessage(err));
  }

  addMultiple(errs: { timestamp: string, status: number, error: string, message: string, path: string }[]) {
    const messages = errs.map(err => this.composeErrorMessage(err));
    this.messageService.addAll(messages);
  }

  addSingleInfo() {
    this.messageService.add({severity: 'info', summary: 'There is no data', detail: 'Change search criteria'});
  }

  clear() {
    this.messageService.clear();
  }

  composeErrorMessage(err): Message {
    if (err.status >= 500) {
      return {severity: 'error', summary: err.error, detail: 'Oops ... something going wrong !'};
    } else if (err.status >= 400) {
      return {severity: 'error', summary: err.message, detail: err.path};
    } else if (err.status >= 300) {
      return {severity: 'warn', summary: err.error, detail: err.path};
    } else {
      return {severity: 'error', summary: 'Connection to back-end server refused !'};
    }
  }
}
