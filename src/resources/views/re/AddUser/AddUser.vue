<template src="./AddUser.html" />

<script>
  import PageHeader from '../../../../components/PageHeader/PageHeader.vue'
  import LayoutDefault from '../../../layouts/LayoutDefault.vue'
  import RegistrationService from '../../../../services/registration.service'
  import DialogService from '../../../../services/dialog.service'
  import {UserRegister} from "../../../../models/re/UserRegister";

  import $ from 'jquery';
  import XLSX from 'xlsx';
  export default {
    name: 'AddUser',
    props: {
      msg: String
    },
    components:{
      PageHeader
    },
    data: () => ({
      listDepartment: [],
      listUser: [],
    }),
    created() {
      this.$emit('update:layout', LayoutDefault);
      this.getDepartments();
      this.addUser();
    },
    methods: {
      getDepartments() {
        const department = {id: '', departmentName: 'Select department', description: ''};
        DialogService.setLoaderVisible(true);
        RegistrationService.getDepartments().then((res) => {
          DialogService.setLoaderVisible(false);
          this.listDepartment = res['data']['departments'];
          this.listDepartment.unshift(department);
        }).catch(() => {
          DialogService.setLoaderVisible(false);
          this.listDepartment.unshift(department);
        });
      },

      clickBtnImport() {
        document.getElementById('fileInput').click();
        $('#fileInput').val('');
      },

      //vue-json-excel
      downloadCsv() {
        const data = [["User Name", "Email", "Department"]];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "users");
        XLSX.writeFile(wb, "addUser.xlsx");
      },

      // event: any
      onChangeFile(event) {

        DialogService.setLoaderVisible(true);
        const file = event.target.files[0];
        if (!(file.name.match(/.+(\.xlsx|\.csv|\.xls)$/))) {
          DialogService.setLoaderVisible(false);
          return false;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          const bstr= e.target;
          const result = bstr.result;
          const wb = XLSX.read(result, {type:'binary'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, {header:1});

          const listUser = [];

          for (let r = 1; r < data.length; r++) {
            if (data.length > 1000) {
              break;
            }

            const user = data[r];
            const department = user[2];

            let departmentId;
            if(department && this.listDepartment.filter(item =>item.departmentName.toLocaleLowerCase() === department.toLocaleLowerCase()).length === 1){
              departmentId = this.listDepartment.filter(item => item.departmentName.toLocaleLowerCase() === department.toLocaleLowerCase())[0].id;
            }else{
              departmentId = this.listDepartment[0].id;
            }

            const row = {
              userName: (user[0]) ? user[0] : '',
              email: (user[1]) ? user[1] : '',
              department: departmentId ? departmentId : ''
            };
            listUser.push(row);
          }

          this.listUser = listUser;
          DialogService.setLoaderVisible(false);
        };
      },

      // index: number
      deleteUser(index) {
        this.listUser.splice(index, 1);
      },

      addUser() {
        this.listUser.push(new UserRegister('', '', ''));
      },

      registerUser() {
        this.$validator.validateAll().then((re) => {
          // check validate success
          if (re) {

            // Todo check duplicate same
            const model = {users: this.listUser};
            DialogService.setLoaderVisible(true);
            RegistrationService.addUsers(model).then(() => {
              DialogService.setLoaderVisible(false);
              DialogService.showSuccess(this.$t('RE.ADD_USER.MSG.ADD_USER_SUCCESS'), this.$t('BTN.OK')).subscribe(
                () => {
                  this.listUser = [];
                  this.addUser();
                }
              );
            }).catch(() => {
              DialogService.setLoaderVisible(false);
              DialogService.showError(this.$t('MSG.ERROR'), this.$t('BTN.OK'));
            });
          }

        });
      },
    }
  }
</script>

<style scoped lang="scss" src="./AddUser.scss" />
