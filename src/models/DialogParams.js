export class DialogParams {
  componentType;
  icon;
  closeButton;
  title;
  message;
  html;
  positiveButton;
  negativeButton;
  otherButton;
  subject;
  extraParams;
  type; // class name（'bootstrap'）or null(swal)
  size; // 'modal-lg' or 'modal-sm' or null


  constructor(componentType, icon, closeButton, title, message, html, positiveButton, negativeButton, otherButton, subject, extraParams, type, size) {
    this.componentType = componentType;
    this.icon = icon;
    this.closeButton = closeButton;
    this.title = title;
    this.message = message;
    this.html = html;
    this.positiveButton = positiveButton;
    this.negativeButton = negativeButton;
    this.otherButton = otherButton;
    this.subject = subject;
    this.extraParams = extraParams;
    this.type = type;
    this.size = size;
  }
}

export class DialogResult {
  buttonName;
  payload;

  constructor(buttonName, payload) {
    this.buttonName = buttonName;
    this.payload = payload;
  }

  isOk() {
    return this.buttonName === 'ok';
  }

  isCancel() {
    return this.buttonName === 'cancel';
  }

  isOther() {
    return this.buttonName === 'other';
  }
}
