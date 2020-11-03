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
                    @click="deleteHouses([row.item.id])"
                >
                    &#128711;
                </b-button>
                <b-button
                    variant="success"
                    size="sm"
                    @click="propertyFeeShowRefreshFunc(row.item.id)"
                >
                    &#128467;
                </b-button>
            </template>
        </b-table>
        <b-button-group>
            <b-button variant="success" @click="addShow = true">
                增加
            </b-button>
            <b-button variant="warning" @click="newPay = true">
                统一收费
            </b-button>
        </b-button-group>
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
        <b-modal v-model="newPay" title="物业费征收" @ok="propertyFeeAdd()">
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
        <b-modal title="收费记录" v-model="propertyFeeShow" size="lg">
            <b-table
                :items="propertyFeeHis"
                :fields="[
                    'id',
                    'building_number',
                    'room_number',
                    'date',
                    'pay_date',
                    'is_pay',
                    'order_number',
                ]"
            ></b-table>
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
            newPay: false,
            date: "",
            price: "",
            propertyFeeShow: false,
            propertyFeeHis: [],
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
        deleteHouses: function (ids) {
            this.$axios({
                url: this.serverURL + "property/delete_houses",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    houses: ids,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.refreshHouses();
                }
            });
        },
        propertyFeeAdd: function () {
            this.$axios({
                url: this.serverURL + "property/add_property_fee",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    date: this.date,
                    price: this.price,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.alerter("成功", "发布本次收费成功");
                }
            });
        },
        propertyFeeShowRefreshFunc: function (hid) {
            this.propertyFeeShow = true;
            this.$axios({
                url: this.serverURL + "property/get_property_fee",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                    hid,
                },
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    this.propertyFeeHis = data.property_fees;
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
