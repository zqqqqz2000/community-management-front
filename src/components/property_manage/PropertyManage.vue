<template>
    <div>
        <b-modal v-model="modalShow" :title="modal">
            {{ modalInfo }}
        </b-modal>
        <side-bar :child-tree="menu" />
        <div class="center-container">
            <router-view :alerter="alert"></router-view>
        </div>
    </div>
</template>

<script>
import SideBar from "../SideBar";
export default {
    name: "PropertyManage",
    components: {
        SideBar,
    },
    data: function () {
        return {
            modal: "",
            modalInfo: "",
            modalShow: false,
            menu: {
                title: "物业管理",
                key: "property_manage",
                childs: [
                    {
                        title: "住户管理",
                        key: "living_manage",
                        childs: [
                            {
                                title: "住户成员管理",
                                key: "parking_manage",
                                url: "/property-manage/resident-member-manage",
                            },
                            {
                                title: "车位管理",
                                key: "parking_spot_manage",
                                url: "/property-manage/parking-spot-manage",
                            },
                            {
                                title: "房屋管理",
                                key: "house_manage",
                                url: "/property-manage/house-manage",
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
};
</script>

<style scoped>
.center-container {
    height: 100vh;
    width: calc(100vw - 250px);
    float: left;
}
</style>