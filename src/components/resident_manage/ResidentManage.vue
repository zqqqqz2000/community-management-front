<template>
    <div>
        <side-bar :child-tree="menu" />
        <div class="center-container">
            <router-view :alerter="alert"></router-view>
        </div>
        <b-modal v-model="modalShow" :title="modal">
            {{ modalInfo }}
        </b-modal>
    </div>
</template>

<script>
import SideBar from "../SideBar";
export default {
    name: "ResidentManage",
    components: {
        SideBar,
    },
    data: function () {
        return {
            modal: "",
            modalInfo: "",
            modalShow: false,
            menu: {
                title: "业主管理",
                key: "resident_manage",
                childs: [
                    {
                        title: "住户管理",
                        key: "living_manage",
                        childs: [
                            {
                                title: "停车位管理",
                                key: "parking_manage",
                                url: "/resident-manage/parking-manage",
                            },
                            {
                                title: "房屋管理",
                                key: "house_manage",
                                url: "/resident-manage/house-manage",
                            },
                            {
                                title: "报修",
                                key: "maintenance_manage",
                                url: "/resident-manage/maintenance-manage",
                            },
                        ],
                    },
                    {
                        title: "账号管理",
                        key: "account_manage",
                        childs: [
                            {
                                title: "个人信息",
                                key: "personal_information",
                                url: "/resident-manage/personal-information",
                            },
                            {
                                title: "登出",
                                key: "logout",
                                url: "/",
                            },
                        ],
                    },
                ],
            },
        };
    },
    methods: {
        alert: function (title, info) {
            this.modal = title;
            this.modalInfo = info;
            this.modalShow = true;
        },
    },
    beforeCreate: function () {
        document
            .querySelector("body")
            .setAttribute("style", "margin: 0; background-color: #f0f3f4");
    },
};
</script>

<style scoped>
.center-container {
    height: 100vh;
    width: calc(100vw - 250px);
    float: left;
}
</style>