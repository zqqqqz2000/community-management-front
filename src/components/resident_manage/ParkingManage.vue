<template>
    <div>
        <div>
            <b-card title="车位管理" sub-title="拥有车位: 5个"></b-card>
            <b-row>
                <b-col lg="3" md="12">
                    <b-card header="车位列表" header-tag="header">
                        <b-list-group style="max-width: 300px">
                            <b-list-group-item
                                class="d-flex align-items-center"
                            >
                                <span class="mr-auto">B103C</span>
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
        };
    },
};
</script>

<style scoped>
.card {
    margin-bottom: 20px;
}
</style>
