export class ContentRegister {
  title;
  description;
  public;
  hash_tag;
  image;
  content;

  constructor(title, description, public_status, hash_tag, image, content) {
    this.title = title;
    this.description = description;
    this.public = public_status;
    this.hash_tag = hash_tag;
    this.image = image;
    this.content = content;
  }
}
