<template>
    <div>
        <b-card title="住户管理" sub-title="小区住户: 5个"></b-card>
        <b-table ref="residentTable" selectable hover :items="resident_table">
            <template #cell(actions)="row">
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteResident(row.item.id)"
                    >-</b-button
                >
            </template>
        </b-table>
        <b-modal
            @ok="commitNewResident"
            id="modal-new-resident"
            title="新增住户"
        >
            <b-form-group label="*住户用户名:" description="此用户名用于登录">
                <b-form-input
                    type="text"
                    required
                    placeholder="用户名"
                    v-model="username"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="*住户密码:" description="住户登录密码">
                <b-form-input
                    type="password"
                    required
                    placeholder="密码"
                    v-model="password"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="联系电话:">
                <b-form-input
                    type="number"
                    placeholder="电话"
                    v-model="phone_number"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="姓名:">
                <b-form-input
                    type="text"
                    placeholder="姓名"
                    v-model="name"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="工作单位:">
                <b-form-input
                    type="text"
                    placeholder="单位"
                    v-model="job"
                ></b-form-input>
            </b-form-group>
            <b-alert
                variant="danger"
                dismissible
                :show="dismissCountDown"
                @dismissed="dismissCountDown = 0"
            >
                请将必填信息（有星号）填写完整
            </b-alert>
        </b-modal>
        <b-modal v-model="modalShow" :title="modalTitle">
            {{ modalInfo }}
        </b-modal>
        <b-button-group>
            <b-button variant="success" v-b-modal.modal-new-resident>
                增加
            </b-button>
            <b-button variant="warning" @click="selectAll">全选</b-button>
            <b-button variant="info" @click="clearAll">清除</b-button>
            <b-button variant="danger">批量删除</b-button>
        </b-button-group>
    </div>
</template>

<script>
export default {
    name: "ResidentManage",
    data: function () {
        return {
            resident_table: [
                {
                    id: 1,
                    name: "小明",
                    phone_number: 13795555555,
                    job: "保洁",
                    actions: null,
                },
                {
                    id: 2,
                    name: "小方",
                    phone_number: 13795555555,
                    job: "保洁",
                    actions: null,
                },
                {
                    id: 3,
                    name: "小明",
                    phone_number: 13795555555,
                    job: "保洁",
                    actions: null,
                },
                {
                    id: 4,
                    name: "小明",
                    phone_number: 13795555555,
                    job: "保洁",
                    actions: null,
                },
            ],
            username: "",
            password: "",
            phone_number: "",
            name: "",
            job: "",
            modalInfo: "",
            modalTitle: "",
            modalShow: false,
            dismissCountDown: 0,
        };
    },
    methods: {
        alert: function (title, info) {
            this.modal = title;
            this.modalInfo = info;
            this.modalShow = true;
        },
        show_info: function () {
            this.dismissCountDown = 3;
        },
        deleteResident: function (id) {
            console.log(id);
        },
        selectAll: function () {
            this.$refs.residentTable.selectAllRows();
        },
        clearAll: function () {
            this.$refs.residentTable.clearSelected();
        },
        commitNewResident: function (bvModalEvt) {
            if (!this.username || !this.password) {
                bvModalEvt.preventDefault();
                this.show_info();
            }
            this.$axios({
                method: "post",
                url: this.serverURL + "property/add_resident",
                withCredentials: true,
                data: {
                    username: this.username,
                    password: this.password,
                    phone_number: this.phone_number,
                    name: this.name,
                    job: this.job,
                    sessionid: this.$cookies.get("sessionid"),
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) this.alert("错误", data.info);
            });
        },
    },
};
</script>

<style scoped>
</style>
