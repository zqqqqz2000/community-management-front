<template>
    <div>
        <b-card
            title="停车位管理"
            :sub-title="'小区停车位: ' + parkingSpotNum + '个'"
        ></b-card>
        <b-table
            :items="parkingSpots"
            :fields="['id', 'parking_spot_number', 'license', 'actions']"
            class="spot-table"
        >
            <template #cell(actions)="row">
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteParkingSpot(row.item.id)"
                >
                    &#128711;
                </b-button>
                <b-button
                    variant="success"
                    size="sm"
                    @click="clickHis(row.item.id)"
                >
                    &#128467;
                </b-button>
            </template>
        </b-table>
        <b-modal
            title="增加停车位"
            v-model="addSpotModalShow"
            @ok="addParkingSpot(parkingSpotNumber, license)"
        >
            <b-form-group
                label="车位号:"
                label-for="input-1"
                description="唯一的车位号，代表停车位置"
            >
                <b-form-input
                    type="text"
                    required
                    placeholder="车位号"
                    v-model="parkingSpotNumber"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                label="车牌号:"
                label-for="input-1"
                description="唯一的车牌号，代表该车位的可停车牌号"
            >
                <b-form-input
                    type="text"
                    required
                    placeholder="车牌号"
                    v-model="license"
                ></b-form-input>
            </b-form-group>
        </b-modal>
        <b-modal title="收费" v-model="new_pay" @ok="addParkingSpotPay()">
            <b-form-group label="收费金额:">
                <b-form-input
                    v-model="price"
                    type="text"
                    required
                    placeholder="金额"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group label="生效日期:">
                <b-calendar v-model="date"></b-calendar>
            </b-form-group>
        </b-modal>
        <b-modal title="收费历史" v-model="hisShow" size="lg">
            <b-table
                :fields="[
                    'id',
                    'date',
                    'pay_date',
                    'pay_amount',
                    'pay_username',
                ]"
                :items="payHis"
            ></b-table>
        </b-modal>
        <b-button-group>
            <b-button variant="success" @click="addSpotModalShow = true">
                增加
            </b-button>
            <b-button variant="warning" @click="new_pay = true">
                统一收费
            </b-button>
        </b-button-group>
    </div>
</template>


<script>
export default {
    name: "ParkingSpotManage",
    props: ["alerter"],
    data: function () {
        return {
            parkingSpots: [],
            addSpotModalShow: false,
            license: "",
            parkingSpotNumber: "",
            date: "",
            new_pay: false,
            price: "",
            selectBtnParkingSpotId: "",
            hisShow: false,
            payHis: [],
        };
    },
    methods: {
        deleteParkingSpot: function (id) {
            this.$axios({
                url: this.serverURL + "property/delete_parking_spot",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    id,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.refreshParkingSpot();
                }
            });
        },
        addParkingSpot: function (parkingSpotNumber, license) {
            this.$axios({
                url: this.serverURL + "property/add_parking_spot",
                method: "post",
                withCredentials: true,
                data: {
                    parking_spot_number: parkingSpotNumber,
                    license,
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.refreshParkingSpot();
                }
            });
        },
        refreshParkingSpot: function () {
            this.$axios({
                url: this.serverURL + "property/get_all_parking_spot",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.parkingSpots = data.parking_spots;
                }
            });
        },
        addParkingSpotPay: function () {
            this.$axios({
                url: this.serverURL + "property/add_parking_spot_pay",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    price: this.price,
                    date: this.date,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.alerter("成功", "成功发布本次收费");
                }
            });
        },
        clickHis: function (id) {
            this.selectBtnParkingSpotId = id;
            this.hisShow = true;
            this.hisTableRefresh();
        },
        hisTableRefresh() {
            this.$axios({
                url: this.serverURL + "property/get_parking_spot_pays",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    pid: this.selectBtnParkingSpotId,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.payHis = data.pay_his;
                }
            });
        },
    },
    created: function () {
        this.refreshParkingSpot();
    },
    computed: {
        parkingSpotNum: function () {
            return this.parkingSpots.length;
        },
    },
};
</script>

<style scoped>
.spot-table button {
    margin-left: 3px;
}
</style>
