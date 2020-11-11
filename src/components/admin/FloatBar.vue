<template>
    <div class="float-bar">
        <transition name="bar-flip" mode="out-in">
            <div
                class="bar-inner"
                :style="{
                    'background-color': this.bgcolor,
                    color: this.color,
                    height: '100%',
                }"
                v-if="side"
                key="show"
                @click="filp()"
            >
                <div class="inner-header">
                    <slot name="header"></slot>
                </div>
                <div class="inner-content">
                    <slot name="content"></slot>
                </div>
            </div>
            <div
                class="bar-inner"
                :style="{
                    'background-color': this.bgcolor,
                    color: this.color,
                    height: '100%',
                }"
                v-else
                key="login"
                @click.self="filp()"
            >
                <div class="login-container">
                    <div class="login-header">
                        <slot name="header"></slot>
                    </div>

                    <div class="input-area">
                        <label for="username">用户名</label>
                        <input
                            name="username"
                            type="text"
                            placeholder="请输入用户名"
                            v-model="username"
                            autocomplete="!off"
                        />
                    </div>
                    <div class="input-area">
                        <label for="password">密码</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="请输入密码"
                            v-model="password"
                            autocomplete="!off"
                        />
                    </div>
                    <b-button
                        type="button"
                        class="btn btn-default sm-btn"
                        @click="login(url)"
                        >登录</b-button
                    >
                    <div class="input-area">
                        <br />
                        <b-button
                            type="button"
                            class="btn btn-default"
                            @click="login(url)"
                            >登录</b-button
                        >
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "FloatBar",
    props: ["bgcolor", "color", "url", "loginApi", "errorFunc"],
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
        };
    },
};
</script>

<style scoped>
button {
    background-color: white;
    color: black;
}
.login-container {
    text-align: left;
}
.sm-btn {
    display: none;
    vertical-align: bottom;
    margin-left: 8px;
}
.float-bar {
    display: inline-block;
    width: 700px;
    height: 500px;
    line-height: 100%;
    text-align: left;
    vertical-align: middle;
    transition: 0.2s;
    cursor: grab;
}

.bar-inner {
    padding-left: 30px;
    padding-top: 20px;
}

.float-bar:hover {
    transform: scale(1.02);
}

.input-area {
    display: block;
}

.input-area input {
    display: block;
}

@media (max-width: 1400px) {
    .float-bar {
        width: 350px;
        height: 250px;
    }
    .login-header {
        display: none;
    }

    .input-area {
        margin-bottom: 0;
        margin-top: 1em;
    }

    .input-area > label {
        display: none;
    }
}

@media (max-width: 700px) {
    .float-bar {
        width: 275px;
        height: 125px;
    }
    .inner-content {
        display: none;
    }
    .input-area input {
        display: inline;
    }
    .input-area {
        margin: 0;
        margin-top: -10px;
        display: inline !important;
        line-height: 1em;
    }
    .input-area > button {
        display: none;
    }
    .sm-btn {
        display: inline;
        width: 50px;
        height: 30px;
        font-size: 0.7px;
    }
}

@media (max-width: 560px) {
    .float-bar {
        position: relative;
        display: block;
        margin: auto;
        top: calc(50vh - 125px);
    }
    .inner-content {
        display: none;
    }
}

.input-area {
    margin-bottom: 10px;
    line-height: 2em;
}
.bar-flip-enter-active,
.bar-flip-leave-active {
    transition: 0.3s ease;
    transform: rotateY(0deg);
}
.bar-flip-enter,
.bar-flip-leave-to {
    transform: rotateY(-90deg);
}

input[type="text"],
input[type="password"] {
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    border-bottom: white 1px solid;
    outline: none;
    transition: 0.3s;
    line-height: 3em;
}

input:focus {
    border-bottom: gray 1px solid;
}

input::-webkit-input-placeholder {
    transition: 0.5s ease;
}

input:focus::-webkit-input-placeholder {
    color: white;
    position: relative;
    transform: translateY(-1em) scale(0.9);
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border: 0;
    border-bottom: white 1px solid;
    outline: none;
    transition: 0.3s;
    line-height: 3em;
    transition: background-color 5000s ease-in-out 0s;
}
</style>
