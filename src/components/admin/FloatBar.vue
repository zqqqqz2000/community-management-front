<template>
    <div class="float-bar" :style="{ backgroundColor: bgcolor }">
        <div class="bar-inner" key="login">
            <div class="login-container">
                <div
                    class="login-header"
                    :style="{
                        'border-left': '5px solid ' + hdcolor,
                        color: hdcolor,
                    }"
                >
                    <slot name="header"></slot>
                </div>

                <div class="input-area">
                    <f-input
                        :color="color"
                        class="input"
                        name="username"
                        type="text"
                        placeholder="用户名"
                        v-model="username"
                        autocomplete="!off"
                        :activeColor="activeColor"
                    />
                </div>
                <div class="input-area">
                    <f-input
                        :color="color"
                        class="input"
                        name="password"
                        type="password"
                        placeholder="密码"
                        v-model="password"
                        autocomplete="!off"
                        :activeColor="activeColor"
                    />
                </div>
                <div class="login-btn">
                    <button
                        type="button"
                        class="btn btn-default sm-btn"
                        @click="login(url)"
                        :style="btnHover ? btnHoverStyle : btnStyle"
                        @mouseover="btnHover = true"
                        @mouseout="btnHover = false"
                    >
                        <strong> 登录 </strong>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Finput from "../FInput";
export default {
    name: "FloatBar",
    props: [
        "bgcolor",
        "color",
        "url",
        "loginApi",
        "errorFunc",
        "hdcolor",
        "btnStyle",
        "btnHoverStyle",
        "activeColor",
    ],
    methods: {
        login: function (url) {
            this.$axios({
                method: "post",
                url: this.loginApi,
                withCredentials: true,
                data: {
                    username: this.username,
                    password: this.password,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.$cookies.set("token", data.token);
                    this.$router.push(url);
                } else {
                    this.errorFunc();
                }
            });
        },
        filp: function () {
            this.side = !this.side;
        },
    },
    data: function () {
        return {
            side: true,
            username: "",
            password: "",
            btnHover: false,
        };
    },
    components: {
        "f-input": Finput,
    },
};
</script>

<style scoped>
.float-bar {
    padding: 50px;
    border-radius: 10px;
    text-align: left !important;
}
.login-header {
    position: static;
    left: 0;
    margin-left: -50px;
    padding-left: 50px;
    border: none;
}
.input-area {
    position: relative;
    margin-top: 50px;
}
.login-btn {
    text-align: center;
    width: 100%;
    margin-top: 50px;
}
.input {
    position: relative;
    width: 100%;
}
</style>
