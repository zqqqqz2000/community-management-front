<template>
    <div class="admin">
        <div
            class="floot-changer"
            ref="changer"
            @click="changerClick()"
            :style="changerStyle"
        >
            <strong> &#8644;</strong>
        </div>
        <div class="center-content">
            <float-bar
                ref="residentPanel"
                bgcolor="#FFFFFF"
                hdcolor="#ed2553"
                color="#ed2553"
                class="text-center"
                url="/resident-manage/personal-information"
                :login-api="serverURL + 'resident/login'"
                :error-func="showInfo"
                :btnStyle="{
                    color: 'rgba(0,0,0,.2)',
                    width: '220px',
                    height: '60px',
                    border: '3px solid rgba(0,0,0,.1)',
                    'border-radius': 0,
                }"
                :btnHoverStyle="{
                    color: '#ed2553',
                    width: '220px',
                    height: '60px',
                    border: '3px solid #ed2553',
                    'border-radius': 0,
                }"
            >
                <template v-slot:header>
                    <h1>
                        <strong>业主登录</strong>
                    </h1>
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
                v-if="!residentShow"
                ref="propertyPanel"
                bgcolor="#ed2553"
                color="#fff"
                hdcolor="#fff"
                class="text-center property"
                url="/property-manage/resident-member-manage"
                :login-api="serverURL + 'property/login'"
                :error-func="showInfo"
                activeColor="#fff"
                :btnStyle="{
                    background: '#fff',
                    width: '220px',
                    height: '60px',
                    border: '0',
                    color: '#ed2553',
                    'border-radius': 0,
                }"
                :btnHoverStyle="{
                    color: '#ed2553',
                    width: '220px',
                    height: '60px',
                    border: '3px solid #ed2553',
                    'border-radius': 0,
                }"
            >
                <template v-slot:header>
                    <h1 class="text-left"><strong>物业登录</strong></h1>
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
            changerStyle: [],
            inAna: false,
            residentShow: true,
        };
    },
    methods: {
        showInfo: function () {
            this.dismissCountDown = 3;
        },
        changerClick: function () {
            let changerEle = this.$refs.changer;
            let resident = this.$refs.residentPanel.$el;
            // let property = this.$refs.propertyPanel.$el;
            if (this.inAna) return;
            if (this.residentShow) {
                this.inAna = true;
                this.$anime
                    .timeline()
                    // 居中
                    .add({
                        targets: changerEle,
                        left: "-=250",
                        top: "+=140",
                        easing: "easeInOutQuad",
                        duration: 300,
                        "border-radius": "50%",
                    })
                    // 业主往后
                    .add({
                        targets: resident,
                        translateY: -50,
                        scaleX: "0.9",
                        scaleY: "0.9",
                        duration: 200,
                        easing: "easeInOutQuad",
                        opacity: 0.6,
                    })
                    // 覆盖
                    .add({
                        targets: changerEle,
                        left: "-=180px",
                        top: "-=180px",
                        width: "500px",
                        height: "500px",
                        "line-height": "500px",
                        "border-radius": "10px",
                        easing: "easeInOutQuad",
                        complete: () => {
                            this.residentShow = false;
                        },
                        duration: 200,
                    })
                    // 缩小
                    .add({
                        targets: changerEle,
                        duration: 100,
                        width: "50px",
                        height: "50px",
                        left: "+=225",
                        top: "+=225",
                        "line-height": "50px",
                        easing: "easeInOutQuad",
                    })
                    // 向上移动
                    .add({
                        targets: changerEle,
                        top: "-=215",
                        left: "+=215",
                        easing: "easeInOutQuad",
                        duration: 200,
                        complete: () => {
                            this.inAna = false;
                        },
                    });
            } else {
                this.$anime
                    .timeline()
                    // 居中
                    .add({
                        targets: changerEle,
                        left: "-=215",
                        top: "+=215",
                        easing: "easeInOutQuad",
                        duration: 200,
                        "border-radius": "50%",
                    })
                    // 覆盖
                    .add({
                        targets: changerEle,
                        left: "-=225px",
                        top: "-=225px",
                        width: "500px",
                        height: "500px",
                        "line-height": "500px",
                        "border-radius": "10px",
                        easing: "easeInOutQuad",
                        complete: () => {
                            this.residentShow = true;
                        },
                        duration: 200,
                    })
                    // 缩小
                    .add({
                        targets: changerEle,
                        height: "140px",
                        width: "140px",
                        left: "+=180",
                        top: "+=180",
                        "line-height": "140px",
                        "border-radius": "50%",
                        easing: "easeInOutQuad",
                        duration: 300,
                    })
                    // 右移
                    .add({
                        targets: changerEle,
                        left: "+=250",
                        top: "-=140",
                        easing: "easeInOutQuad",
                        duration: 200,
                    });
                this.$anime({
                    targets: resident,
                    translateY: 50 * 0.1 - 5,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200,
                    easing: "easeInOutQuad",
                    opacity: 1,
                    delay: 700,
                });
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center {
    width: 500px;
    height: 500px;
    position: relative;
}
.property {
    position: absolute;
    top: calc(50vh - 250px);
    left: calc(50vw - 250px);
}
.admin {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh;
}
.floot-changer {
    border-radius: 50%;
    height: 140px;
    width: 140px;
    line-height: 140px;
    vertical-align: middle;
    text-align: center;
    background-color: #ed2553;
    color: white;
    position: absolute;
    left: calc(50vw + 250px - 70px);
    top: calc(50vh - 250px - 70px + 110px);
    font-size: 40px;
    cursor: pointer;
    z-index: 10;
}
</style>
