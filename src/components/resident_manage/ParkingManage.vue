<template>
    <div>
        <div>
            <b-card
                title="车位管理"
                :sub-title="'拥有车位:' + parkingSpotsNumber + '个'"
            ></b-card>
            <b-row>
                <b-col lg="3" md="12">
                    <b-card header="车位列表" header-tag="header">
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
                                <b-badge>1</b-badge>
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
                        <b-table striped hover :items="table_liences">
                            <template v-slot:cell(pay)="data">
                                <span v-html="data.value"></span>
                            </template>
                        </b-table>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "ParkingManage",
    props: ["alerter"],
    data: function () {
        return {
            table_liences: [
                {
                    id: "1",
                    date: "2020年5月12日",
                    license: "鄂J88888",
                    parking_spot: "B103C",
                    pay_date: "未支付",
                    payer: "未支付",
                    total_amount: "50.00元",
                    pay: "<button>支付</button>",
                },
            ],
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
    },
    created: function () {
        this.loadingParkingSpots();
    },
    computed: {
        parkingSpotsNumber: function () {
            return this.parkingSpots.length;
        },
    },
};
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
</style>
