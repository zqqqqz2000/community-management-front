<template>
    <div>
        <b-card title="个人信息管理" sub-title="小区住户"></b-card>
        <b-card header="我的信息" class="info-content">
            <b-form>
                <b-form-group
                    label="用户名:"
                    description="登录时确定的唯一用户名，不可修改"
                >
                    <b-form-input
                        type="text"
                        disabled
                        v-model="username"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="密码:">
                    <b-form-input
                        type="password"
                        v-model="password"
                        @focus="pass_focus()"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="电话号码:">
                    <b-form-input
                        type="number"
                        v-model="phone_number"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="姓名:">
                    <b-form-input type="text" v-model="name"></b-form-input>
                </b-form-group>
                <b-form-group label="工作单位:">
                    <b-form-input type="text" v-model="job"></b-form-input>
                </b-form-group>
                <b-button variant="primary" @click="submit_info()"
                    >修改</b-button
                >
            </b-form>
        </b-card>
    </div>
</template>

<script>
export default {
    name: "PersonalInformation",
    props: ["alerter"],
    data: function () {
        return {
            username: "",
            password: "do_not_change",
            pass_first_select: true,
            phone_number: "",
            name: "",
            job: "",
        };
    },
    methods: {
        pass_focus: function () {
            if (this.pass_first_select) {
                this.password = "";
                this.pass_first_select = false;
            }
        },
        init_infos: function () {
            this.$axios({
                url: this.serverURL + "resident/get_resident_info",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.username = data.u_info.username;
                    this.phone_number = data.u_info.phone_number;
                    this.name = data.u_info.name;
                    this.job = data.u_info.job;
                } else {
                    console.log(this);
                    this.alerter("错误", data.info);
                }
            });
        },
        submit_info: function () {
            this.$axios({
                url: this.serverURL + "resident/update_resident_info",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    username: this.username,
                    password: this.password,
                    phone_number: this.phone_number,
                    name: this.name,
                    job: this.job,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.alerter("成功", "个人信息修改成功");
                    this.init_infos();
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
    },
    created: function () {
        this.init_infos();
    },
};
</script>

<style scoped>
.info-content {
    width: 70%;
    min-width: 500px;
    margin-top: 10px;
}
</style>
