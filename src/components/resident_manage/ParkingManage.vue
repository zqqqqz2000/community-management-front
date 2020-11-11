<template>
    <div>
        <b-card
            title="车位管理"
            :sub-title="'拥有车位:' + parkingSpotsNumber + '个'"
        ></b-card>
        <b-row>
            <b-col lg="3" md="12">
                <b-card header-tag="header">
                    <template #header>
                        车位列表
                        <b-badge>{{ unpaiedNumber }}</b-badge>
                    </template>
                    <b-list-group style="max-width: 300px">
                        <b-list-group-item
                            class="d-flex align-items-center"
                            v-for="parkingSpot in parkingSpots"
                            :key="parkingSpot"
                        >
                            <span class="mr-auto">
                                停车位:
                                {{ parkingSpot.parking_spot_number }}
                                <b-badge variant="primary">
                                    {{ parkingSpot.license }}
                                </b-badge>
                            </span>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col lg="9" md="12">
                <b-card
                    title="车位缴费"
                    header-tag="header"
                    footer-tag="footer"
                >
                    <b-table
                        striped
                        hover
                        :items="table_liences"
                        :fields="[
                            'id',
                            'date',
                            'pay_date',
                            'pay_amount',
                            'handle_id',
                            'is_pay',
                            'actions',
                        ]"
                        sticky-header="calc(100vh - 270px)"
                    >
                        <template v-slot:cell(actions)="data">
                            <b-button
                                size="sm"
                                :disabled="data.item.is_pay !== '未缴费'"
                                variant="primary"
                                @click="pay(data.item.id)"
                            >
                                缴费
                            </b-button>
                        </template>
                    </b-table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "ParkingManage",
    props: ["alerter"],
    data: function () {
        return {
            table_liences: [],
            parkingSpots: [],
        };
    },
    methods: {
        loadingParkingSpots: function () {
            this.$axios({
                url: this.serverURL + "resident/get_parking_spots",
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
        loadingParkingSpotsPay: function () {
            this.$axios({
                url: this.serverURL + "resident/get_parking_spots_pay",
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
                    this.table_liences = data.parking_spots_pay;
                }
            });
        },
        pay: function (id) {
            this.$axios({
                url: this.serverURL + "resident/pay_parking_spot",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    bill_id: id,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.loadingParkingSpotsPay();
                }
            });
        },
    },
    created: function () {
        this.loadingParkingSpots();
        this.loadingParkingSpotsPay();
    },
    computed: {
        parkingSpotsNumber: function () {
            return this.parkingSpots.length;
        },
        unpaiedNumber: function () {
            let sum = 0;
            this.table_liences.map((item) => {
                if (item.is_pay === "未缴费") sum++;
            });
            return sum;
        },
    },
};
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
</style>
