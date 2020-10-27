<template>
    <div>
        <b-card title="房屋管理" :sub-title="'小区住房'"></b-card>
        <b-table
            :fields="[
                'id',
                'building_number',
                'room_number',
                'area',
                'family_size',
                'maintenance_balance',
                'actions',
            ]"
            :items="houses"
            hover
        >
            <template #cell(actions)="row">
                <b-button
                    variant="danger"
                    size="sm"
                    @click="deleteParkingSpot(row.item.id)"
                >
                    &#128711;
                </b-button>
            </template>
        </b-table>
        <b-button variant="success" @click="addShow = true">增加</b-button>
        <b-modal title="增加房屋" v-model="addShow" @ok="addHouse()">
            <b-form-group label="楼号:" description="小区内楼房号">
                <b-form-input
                    type="text"
                    required
                    placeholder="小区楼号"
                    v-model="buildingNumber"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="房号:" description="门牌号，如B304">
                <b-form-input
                    type="text"
                    required
                    placeholder="房屋门号"
                    v-model="roomNumber"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="房屋面积(m²):">
                <b-form-input
                    type="text"
                    required
                    placeholder="面积"
                    v-model="area"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="家庭人数:">
                <b-form-input
                    type="number"
                    required
                    placeholder="人数"
                    v-model="familySize"
                ></b-form-input>
            </b-form-group>
        </b-modal>
    </div>
</template>


<script>
export default {
    name: "HouseManageP",
    props: ["alerter"],
    data: function () {
        return {
            houses: [],
            addShow: false,
            buildingNumber: "",
            roomNumber: "",
            area: "",
            familySize: "",
        };
    },
    methods: {
        refreshHouses: function () {
            this.$axios({
                url: this.serverURL + "property/get_houses",
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
                    this.houses = data.houses;
                }
            });
        },
        addHouse: function () {
            this.$axios({
                url: this.serverURL + "property/add_house",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    building_number: this.buildingNumber,
                    room_number: this.roomNumber,
                    area: this.area,
                    family_size: this.familySize,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.alerter("成功", "添加房屋成功");
                    this.refreshHouses();
                }
            });
        },
    },
    created: function () {
        this.refreshHouses();
    },
    computed: {},
};
</script>

<style scoped>
.spot-table button {
    margin-left: 3px;
}
</style>
