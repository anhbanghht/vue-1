import {Subject} from 'rxjs';
import {DialogParams} from '../models/DialogParams'

export class DialogService {
  // Subject<boolean>
  showLoader= new Subject();
  // Subject<DialogParams>
  showModalPopup = new Subject();

  // flag: boolean) {
  setLoaderVisible(flag) {
    this.showLoader.next(flag);
  }

  // message: string, buttonOk: string
  showSuccess(message, buttonOk) {
    return this.showMessage('success', false, null, message, null, buttonOk, null, null, null);
  }

  // message: string, buttonOk: string
  showError(message, buttonOk) {
    return this.showMessage('error', false, null, message, null, buttonOk, null, null, null);
  }
  // icon: string, closeButton: boolean, title: string | null, message: string, html: string | null, positiveButton: string,
  // negativeButton: string | null, size: string | null, otherButton: string| null
  showMessage(icon, closeButton, title, message, html, positiveButton, negativeButton, size, otherButton) {
    return this.showModal(icon, closeButton, title, message, html, positiveButton, negativeButton, null, {}, null, size, otherButton);
  }
  // icon: string, closeButton: boolean, title: string | null, message: string | null, html: string | null, positiveButton: string | null, negativeButton: string | null,
  // component: any, extraParams: any, type: string | null, size: string | null, otherButton?: string | null | undefined
  showModal(icon, closeButton, title, message, html, positiveButton, negativeButton, component, extraParams, type, size, otherButton) {
    // Subject<string>()
    const blank = new Subject();
    // Subject<DialogResult>
    const subject = new Subject();

    const dialog = new DialogParams(
      component,
      icon,
      closeButton,
      title,
      message,
      html,
      positiveButton,
      negativeButton,
      otherButton,
      subject,
      extraParams,
      type,
      size,
    );
    console.log(dialog);
    this.showModalPopup.next(dialog);

    blank.next('');
    blank.complete();
    return subject;
  }
}

const dialogService = new DialogService();
export default dialogService;
