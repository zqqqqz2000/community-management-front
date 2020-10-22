<template>
    <div class="admin">
        <div class="center-content">
            <float-bar
                bgcolor="rgba(220, 108, 122, 0.97)"
                color="#FFFFFF"
                class="text-center"
                url="/resident-manage/personal-information"
                :login-api="serverURL + 'resident/login'"
                :error-func="show_info"
            >
                <template v-slot:header>
                    <h1 class="text-left"><strong>我是业主</strong></h1>
                </template>
                <template v-slot:content>
                    <ul>
                        <li>住房信息</li>
                        <li>车位缴费</li>
                        <li>缴纳物业费</li>
                        <li>我要报修</li>
                    </ul>
                </template>
            </float-bar>
            <float-bar
                bgcolor="rgba(45, 48, 53, 0.97)"
                color="#FFFFFF"
                class="text-center"
                url="/property-manage/resident-member-manage"
                :login-api="serverURL + 'property/login'"
                :error-func="show_info"
            >
                <template v-slot:header>
                    <h1 class="text-left"><strong>我是物业</strong></h1>
                </template>
                <template v-slot:content>
                    <ul>
                        <li>住户管理</li>
                        <li>住房管理</li>
                        <li>车位管理</li>
                        <li>报修管理</li>
                    </ul>
                </template>
            </float-bar>
        </div>
        <div class="pop-layer">
            <b-alert
                dismissible
                :show="dismissCountDown"
                @dismissed="dismissCountDown = 0"
                variant="danger"
                >用户名或密码错误</b-alert
            >
        </div>
    </div>
</template>

<script>
import FloatBar from "./FloatBar";
export default {
    name: "Admin",
    components: {
        FloatBar,
    },
    data: function () {
        return {
            dismissCountDown: 0,
        };
    },
    methods: {
        show_info: function () {
            this.dismissCountDown = 3;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/admin/bg1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.center-content {
    position: absolute;
    text-align: center;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 100vh;
}

li {
    list-style-type: none;
    font-size: 25px;
    margin-top: 23px;
    text-align: left;
}
</style>
