<template>
    <div>
        <b-card
            title="住户管理"
            :sub-title="'小区住户: ' + residentNumber + '个'"
        ></b-card>
        <!-- 搜索栏 -->
        <b-collapse id="my-collapse" class="searcher">
            <div>高级搜索</div>
            <b-form-input
                v-model="search.username"
                placeholder="用户名"
            ></b-form-input>
            <b-form-input
                v-model="search.name"
                placeholder="姓名"
            ></b-form-input>
            <b-form-input
                v-model="search.phone_number"
                placeholder="手机号"
            ></b-form-input>
            <b-form-input
                v-model="search.job"
                placeholder="职位"
            ></b-form-input>
            <b-button style="display: inline-block" @click="searchFunc()">
                搜索
            </b-button>
        </b-collapse>
        <div style="width: 100%; text-align: center">
            <b-button
                variant="light"
                size="sm"
                v-b-toggle.my-collapse
                style="
                    position: absolute;
                    height: 20px;
                    line-height: 20px;
                    z-index: 9;
                "
            >
                <b-icon icon="chevron-down"></b-icon>
            </b-button>
        </div>

        <b-table
            ref="residentTable"
            selectable
            hover
            class="resident-table"
            :items="resident_table"
            sticky-header="calc(100vh - 270px)"
            :fields="[
                'id',
                'username',
                'name',
                'phone_number',
                'job',
                'actions',
            ]"
            @row-selected="onRowSelected"
        >
            <template #cell(actions)="row">
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteResident(row.item.id)"
                >
                    &#128711;</b-button
                >
                <b-button
                    size="sm"
                    variant="info"
                    @click="parkingManage(row.item.username)"
                    >&#80;</b-button
                >
                <b-button
                    size="sm"
                    variant="success"
                    @click="houseManage(row.item.id)"
                    >&#127968;</b-button
                >
            </template>
        </b-table>
        <!-- 新增住户 -->
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

        <b-button-group>
            <b-button variant="success" v-b-modal.modal-new-resident>
                增加
            </b-button>
            <b-button variant="warning" @click="selectAll">全选</b-button>
            <b-button variant="info" @click="clearAll">清除</b-button>
            <b-button
                variant="danger"
                @click="
                    deleteResidents(
                        selected.map((i) => {
                            return i.id;
                        })
                    )
                "
                >批量删除</b-button
            >
        </b-button-group>

        <!-- 停车位管理 -->
        <b-modal
            :title="`住户${parkingSpotUsername}的停车位管理`"
            v-model="parkingManageShow"
        >
            <b-input-group>
                <b-input-group-prepend>
                    <b-button
                        variant="outline-info"
                        @click="addParkingSpotUser(parkingSpotUsername)"
                        >增加</b-button
                    >
                </b-input-group-prepend>
                <b-input-group-perpend>
                    <b-form-input
                        type="text"
                        placeholder="车位号"
                        v-model="parkingSpotNumber"
                    ></b-form-input>
                </b-input-group-perpend>
                <b-input-group-perpend>
                    <b-form-input
                        type="text"
                        placeholder="车牌号"
                        v-model="license"
                    ></b-form-input>
                </b-input-group-perpend>
            </b-input-group>
            <b-table
                :fields="['id', 'parking_spot_number', 'license', 'actions']"
                :items="parkingSpots"
            >
                <template #cell(actions)="row">
                    <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteParkingSpot(row.item.id)"
                    >
                        &#128711;</b-button
                    >
                </template>
            </b-table>
        </b-modal>
        <!-- 房屋管理 -->
        <b-modal title="房屋管理" v-model="houseManageShow" size="lg">
            <b-input-group>
                <b-input-group-prepend>
                    <b-button variant="outline-info" @click="addRH(currentRId)"
                        >增加</b-button
                    >
                </b-input-group-prepend>
                <b-input-group-perpend>
                    <b-form-input
                        type="text"
                        placeholder="楼号"
                        v-model="buildingNumber"
                    ></b-form-input>
                </b-input-group-perpend>
                <b-input-group-perpend>
                    <b-form-input
                        type="text"
                        placeholder="房号"
                        v-model="roomNumber"
                    ></b-form-input>
                </b-input-group-perpend>
            </b-input-group>
            <b-table
                :items="userHouses"
                :fields="[
                    'id',
                    'building_number',
                    'room_number',
                    'area',
                    'family_size',
                    'maintenance_balance',
                    'actions',
                ]"
            >
                <template #cell(actions)="row">
                    <b-button
                        variant="danger"
                        size="sm"
                        @click="deleteHouse(row.item.id)"
                    >
                        &#128711;</b-button
                    >
                </template>
            </b-table>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "ResidentManage",
    props: ["alerter"],
    data: function () {
        return {
            houseManageShow: false,
            resident_table: [],
            username: "",
            password: "",
            phone_number: "",
            name: "",
            job: "",
            modalInfo: "",
            modalTitle: "",
            modalShow: false,
            dismissCountDown: 0,
            selected: [],
            parkingSpots: [],
            parkingManageShow: false,
            parkingSpotUsername: "",
            license: "",
            parkingSpotNumber: "",
            currentRId: "",
            buildingNumber: null,
            roomNumber: null,
            userHouses: [],
            search: { token: this.$cookies.get("token") },
        };
    },
    methods: {
        searchFunc: function () {
            this.$axios({
                method: "post",
                url: this.serverURL + "property/query_resident",
                withCredentials: true,
                data: this.search,
            }).then((response) => {
                console.log(this.alerter);
                let data = response.data;
                if (data.success) {
                    this.resident_table = data.residents;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        refreshTable: function () {
            this.$axios({
                method: "post",
                url: this.serverURL + "property/get_all_resident",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                console.log(this.alerter);
                let data = response.data;
                if (data.success) {
                    this.resident_table = data.residents;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        houseManage: function (id) {
            this.houseManageShow = true;
            this.currentRId = id;
            this.getResHouses(id);
        },
        show_info: function () {
            this.dismissCountDown = 3;
        },
        deleteResident: function (id) {
            this.deleteResidents([id]);
        },
        deleteResidents: function (ids) {
            this.$axios({
                method: "post",
                url: this.serverURL + "property/delete_residents",
                withCredentials: true,
                data: {
                    residents_id: ids,
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.refreshTable();
                }
            });
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
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.refreshTable();
                }
            });
        },
        onRowSelected: function (items) {
            this.selected = items;
        },
        parkingManage: function (manageUsername) {
            this.parkingSpotUsername = manageUsername;
            this.getAllParkingSpot(manageUsername);
            this.parkingManageShow = true;
        },
        getAllParkingSpot: function (username) {
            this.$axios({
                method: "post",
                url: this.serverURL + "property/get_parking_spot",
                data: {
                    username,
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.parkingSpots = data.parking_spot;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        addParkingSpotUser(username) {
            this.$axios({
                url: this.serverURL + "property/add_parking_spot_user",
                method: "post",
                data: {
                    username,
                    token: this.$cookies.get("token"),
                    parking_spot_number: this.parkingSpotNumber,
                    license: this.license,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getAllParkingSpot(this.parkingSpotUsername);
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        deleteParkingSpot(id) {
            this.$axios({
                url: this.serverURL + "property/delete_parking_spot_pr",
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                    id,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getAllParkingSpot(this.parkingSpotUsername);
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        addRH(rid) {
            this.$axios({
                url: this.serverURL + "property/add_rh",
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                    rid,
                    building_number: this.buildingNumber,
                    room_number: this.roomNumber,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.alerter("成功", "为该住户增加房屋成功");
                    this.getResHouses(this.currentRId);
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        getResHouses(rid) {
            this.$axios({
                url: this.serverURL + "property/get_get_house_from_res",
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                    rid,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.userHouses = data.houses;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
        deleteHouse(rhid) {
            this.$axios({
                url: this.serverURL + "property/delete_rh",
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                    rhid,
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.getResHouses(this.currentRId);
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
    },
    computed: {
        residentNumber: function () {
            return this.resident_table.length;
        },
    },
    created: function () {
        this.refreshTable();
    },
};
</script>
<style scoped>
.resident-table button {
    margin-left: 3px;
}
.searcher input {
    width: 20%;
    display: inline-block;
    margin-right: 7px;
    vertical-align: middle;
}
</style>
