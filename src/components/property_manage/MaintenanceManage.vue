<template>
    <div>
        <b-card title="维修处理" sub-title="住户所有的维修申请处理"></b-card>
        <b-table
            sticky-header="calc(100vh - 150px)"
            :fields="[
                'id',
                'building_num',
                'room_number',
                'apply_date',
                'actions',
            ]"
            :items="maintenances"
        >
            <template #cell(actions)="row">
                <b-button
                    v-if="row.item.status === 0"
                    variant="success"
                    size="sm"
                    @click="
                        optShow = true;
                        currentId = row.item.id;
                    "
                >
                    &#128296;
                </b-button>
            </template>
        </b-table>
        <b-modal title="报修结算" v-model="optShow">
            <div class="left">
                <b-form-group label="维修人编号">
                    <b-form-input
                        v-model="form.fix_number"
                        type="text"
                        required
                        placeholder="编号"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group label="维修金额">
                    <b-form-input
                        v-model="form.pay_amount"
                        type="text"
                        required
                        placeholder="金额"
                    >
                    </b-form-input>
                </b-form-group>
                <b-form-group label="维修日期" description="上门维修具体时间">
                    <b-calendar v-model="form.fix_date"></b-calendar>
                </b-form-group>
            </div>
            <div class="right">
                <b-form-group label="维修备注: ">
                    {{ currentComment }}
                </b-form-group>
            </div>
            <template #modal-footer>
                <div>
                    <b-button
                        variant="danger"
                        size="sm"
                        class="float-btn"
                        @click="payMaintenance()"
                    >
                        结算
                    </b-button>
                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-btn"
                        @click="optShow = false"
                    >
                        关闭
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "MaintenanceManageProp",
    props: ["alerter"],
    data: function () {
        return {
            maintenances: [],
            optShow: false,
            currentId: -1,
            form: { token: this.$cookies.get("token") },
        };
    },
    methods: {
        payMaintenance() {
            this.form.id = this.currentId;
            this.$axios({
                url: this.serverURL + "property/pay_maintenance",
                method: "post",
                withCredentials: true,
                data: this.form,
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.alerter("注意", data.info);
                    this.optShow = false;
                    this.getMaintenances();
                } else this.alerter("error", data.info);
            });
        },
        getMaintenances() {
            this.$axios({
                url: this.serverURL + "property/get_maintenance",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    for (let i of data.maintenance) {
                        console.log(i);
                        if (i.status === 0) {
                            i._rowVariant = "info";
                        }
                    }
                    this.maintenances = data.maintenance;
                } else this.alerter("error", data.info);
            });
        },
    },
    computed: {
        currentComment() {
            for (let item of this.maintenances) {
                if (this.currentId === item.id) return item.comment;
            }
            return "无";
        },
    },
    created() {
        this.getMaintenances();
    },
};
</script>

<style>
.left,
.right {
    width: calc(50% - 14px);
    float: left;
    margin-right: 7px;
}
.float-btn {
    margin-right: 7px;
}
</style>
