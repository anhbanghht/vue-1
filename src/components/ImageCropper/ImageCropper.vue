<template src="./ImageCropper.html" />

<script>
  import FaceIcon from '../FaceIcon/FaceIcon.vue';
  import $ from 'jquery';
  import {Subject} from 'rxjs';
  import Cropper from 'cropperjs';
  import {TypeImageCropper} from '../../common/ContentCommon';

  const MAX_SIZE = 5 * 1024 * 1024;

  export default {
    name: 'ImageCropper',
    props: ['imageCropperOptions', 'checkValidate', 'imageUrl'],
    components: {
      FaceIcon
    },
    data: () => ({
      TypeImageCropper,
      imagePath: '',
      dammyImagePath: {
        default: '/img/image-cropper-card-en-cn.png',
        over: '/img/image-cropper-card-over-en-cn.png'
      },
      btnsDisabledFlag: true,
      originName: '',
      windowURL: (window).URL || (window).webkitURL,
      imgData: '',
      mouseFlag: true,
      getCroppedCanvasOption: {},
      cropper: '',
      imageUrlCropper: ''
    }),
    created() {
      if (this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR) {
        this.dammyImagePath = {
          default: '/img/image-cropper-avatar-en.png',
          over: '/img/image-cropper-avatar-over-en.png'
        };
      } else {
        this.dammyImagePath = {
          default: '/img/image-cropper-card-en-cn.png',
          over: '/img/image-cropper-card-over-en-cn.png'
        };
      }
      this.imagePath = this.dammyImagePath.default;
      this.btnsDisabledFlag = true;
      this.getCroppedCanvasOption.fillColor = '#fff';
    },
    beforeUpdate() {
      if (this.checkValidate) {
        this.getImageUrl(this.imageCropperOptions.id);

        this.getImageUrl(this.imageCropperOptions.id).subscribe((res) => {
          this.$emit('imageContent', res);
        }, () => {
          this.$emit('imageContent', null);
        });
      }

      if (this.imageUrl && this.imageUrl !== this.imageUrlCropper) {
        this.imageUrlCropper = this.imageUrl;
        if($('.image-cropper-picture').attr('src')){
          this.loadImage(this.imageUrl, this.imageCropperOptions.id);
        }
      }
    },
    methods: {
      clickImport() {
        document.getElementById('fileInput').click();
        $('#fileInput').val('');
      },

      setOption() {
        const self = this;
        const aspectRatio = this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR ? 1 : (420/240);
        const minCropBoxWidth = this.imageCropperOptions.typeImageCropper === TypeImageCropper.AVATAR ? 120 : 200;

        // const aspectRatio = 420/240;
        // const minCropBoxWidth = 200;

        const configImage = {
          center: true,
          highlight: true,
          dragMode: 'move',
          zoomOnWheel: false,
          autoCropArea: 1,
          zoomable: true,
          rotatable: true,
          cropBoxResizable: false,
          autoCrop: true,
          aspectRatio: aspectRatio,
          minCropBoxHeight: 120,
          minCropBoxWidth: minCropBoxWidth,
          checkCrossOrigin: false,
          ready: function(e) {
            console.log(e.type);
          },
          cropstart: function(e) {
            console.log(e.type, e.detail.action);
          },
          cropmove: function(e) {
            console.log(e.type, e.detail.action);
          },
          cropend: function(e) {
            console.log(e.type, e.detail.action);
          },
          // crop: this.cropend,
          crop: function(e) {
            self.cropend(e);
          },
          zoom: function(e) {
            console.log(e.type, e.detail.ratio);
          },
          rotate: function(e) {
            console.log(e.type);
          },
        };

        return configImage;
      },

      // imageUrl: string, id: string
      loadImage(imageUrl, id) {
        if (imageUrl && id) {
          const $image = $('#' + id).find('.image-cropper-picture');
          this.cropper = new Cropper($image[0], this.setOption());
          this.cropper.replace(imageUrl);
          this.btnsDisabledFlag = null;
        }
      },

      // errorLoadImage(event) {
      //   // this.loadImage(this.noImage, this.imageCropperOptions.id, true);
      // }

      cropend(e) {
        // emit event
        const id = $(e.target).parents('.image-cropper-inner-wrap');
        let event;
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('imageChange', true, true, id);
        window.dispatchEvent(event);
      },

      getCropper(event) {
        const $cropper = $(event.target).parents('.image-cropper-inner-wrap');
        const $image = $cropper.find('.image-cropper-picture');
        const $file = $cropper.find('.image-cropper-upload');
        return {cropper: $cropper, image: $image, file: $file};
      },

      onMouseClick(event) {
        const obj = this.getCropper(event);
        this.mouseFlag = false;
        obj.file.click();
      },

      onMouseOver() {
        if (this.btnsDisabledFlag && this.mouseFlag) {
          this.imagePath = this.dammyImagePath.over;
        }
      },

      onMouseOut() {
        if (this.btnsDisabledFlag && this.mouseFlag) {
          this.imagePath = this.dammyImagePath.default;
        }
      },

      imageUpload(event) {
        const obj = this.getCropper(event);
        const files = obj.file[0].files[0];
        this.originName = files.name;
        if (files.size > MAX_SIZE) {
          // this.flagImgUpload.emit(false);
          this.$emit('flagImgUpload', false);
          return;
        } else {
          // this.flagImgUpload.emit(true);
          this.$emit('flagImgUpload', true);
        }
        const reader = new FileReader();
        const URL = (window).URL || (window).webkitURL;
        if (!(files.type && files.type.match(/^image\/(png|jpeg|gif)$/))) {
          return false;
        }
        if (URL) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(files);
          img.onload = () => {
            // this.setCropper(obj);
            // obj.image.cropper('replace', URL.createObjectURL(files));
            this.cropper = new Cropper(obj.image[0], this.setOption());
            this.cropper.replace(URL.createObjectURL(files));
            this.btnsDisabledFlag = null;
          };
          img.onerror = () => {
            return;
          };

        } else if (reader) {
          reader.readAsDataURL(files);
          reader.onload = () => {
            // this.setCropper(obj);
            // obj.image.cropper('replace', reader.result);
            const cropper = new Cropper(obj.image[0], this.setOption());
            cropper.replace(reader.result);
            this.btnsDisabledFlag = null;
          };
        }
      },

      transformValue(e) {
        if (e === 'none') {
          return false;
        }
        let values = e.split('(')[1];
        values = values.split(')')[0];
        values = values.split(', ');
        const matrix = {
          'scale-x': values[0],
          'rotate-p': values[1],
          'rotate-m': values[2],
          'scale-y': values[3],
          'transform-x': values[4],
          'transform-y': values[5]
        };
        return matrix;
      },

      // event: any, option: number
      imageRoundZoom(event, option) {
        const obj = this.getCropper(event);
        const _round = obj.cropper.find('.cropper-crop-box');
        const _width = _round.width() + Number(option);
        const _height = _round.height() + Number(option);
        const _matrix = this.transformValue(_round.css('transform'));
        const _left = Number(_matrix['transform-x']) - Number(option) / 2;
        const _top = (_matrix['transform-y']) ? Number(_matrix['transform-y']) - Number(option) / 2 : 0 - Number(option) / 2;
        this.cropper.setCropBoxData({ left: _left, top: _top , width: _width, height: _height });
      },

      imageZoomIn() {
        this.cropper.zoom(0.1);
      },

      imageZoomOut() {
        this.cropper.zoom(-0.1);
      },

      imageRotateLeft() {
        this.cropper.rotate(-15);
      },

      imageRotateRight() {
        this.cropper.rotate(15);
      },

      imageDelete(event) {
        this.mouseFlag = true;
        // this.$emit('flagImgUpload', true);
        // this.$emit('flagImgDestroy', true);
        const obj = this.getCropper(event);
        this.cropper.destroy();
        obj.file.val('');
        obj.image.attr('src', this.dammyImagePath.default);
        this.cropend(event);
        this.btnsDisabledFlag = true;
      },

      // id: string
      getImageUrl(id){
        let imageObj;
        imageObj = $('#' + id).find('.image-cropper-picture');
        if (!id) {
          imageObj = $('.image-cropper-inner-wrap').find('.image-cropper-picture');
        }
        const src = imageObj.attr('src');
        const subject = new Subject();
        if (imageObj.length <= 0 || this.btnsDisabledFlag != null || !this.cropper) {
          subject.next();
          subject.error('no image');

        } else {
          this.cropper.getCroppedCanvas(this.getCroppedCanvasOption)
            .toBlob((blob) => {

              if (this.imgData) {
                this.windowURL.revokeObjectURL(this.imgData);
              }
              blob['src'] = src;
              if (id) {
                blob['name'] = this.originName;
              }
              this.imgData = this.windowURL.createObjectURL(blob);
              blob['imgData'] = this.imgData;
              subject.next(blob);
              subject.complete();
            }, 'image/jpeg');
        }
        return subject;
      }
    },
  }
</script>

<style scoped lang="scss" src="./ImageCropper.scss"/>
