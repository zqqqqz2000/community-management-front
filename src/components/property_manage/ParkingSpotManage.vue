<template>
    <div>
        <b-card
            title="停车位管理"
            :sub-title="'小区停车位: ' + parkingSpotNum + '个'"
        ></b-card>
        <b-table
            :items="parkingSpots"
            :fields="['id', 'parking_spot_number', 'license', 'actions']"
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
        <b-button variant="success" @click="addSpotModalShow = true"
            >增加</b-button
        >
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
</style>
