// import {PublicContent} from "@/common/ContentCommon";

export class Content {
  id;
  title;
  description;
  // public: PublicContent;
  public;
  hash_tag;
  image;
  content;
  created_at;
  updated_at;
  user_created;

  constructor(id, title, description, public_status, hash_tag, image, content, created_at, updated_at, user_created) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.public = public_status;
    this.hash_tag = hash_tag;
    this.image = image;
    this.content = content;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_created = user_created;
  }
}
