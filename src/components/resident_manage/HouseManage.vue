<template>
    <div>
        <b-card
            title="房屋管理"
            :sub-title="'拥有房产:' + houseNumber + '套'"
        ></b-card>
        <b-row>
            <b-col lg="3" md="12">
                <b-card header-tag="header">
                    <template #header>
                        房产列表
                        <b-badge>{{ 1 }}</b-badge>
                    </template>
                    <b-list-group style="max-width: 300px">
                        <b-list-group-item
                            class="d-flex align-items-center"
                            v-for="house in houses"
                            :key="house"
                        >
                            <span class="mr-auto">
                                楼号:
                                {{ house.building_number }}
                                <b-badge variant="primary">
                                    {{ house.room_number }}
                                </b-badge>
                            </span>
                        </b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col lg="9" md="12">
                <b-card
                    title="物业费缴纳"
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
    name: "HouseManage",
    data: function () {
        return {
            houses: [],
        };
    },
    methods: {
        getHouses: function () {
            this.$axios({
                url: this.serverURL + "resident/get_houses",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    this.houses = data.houses;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
    },
    computed: {
        houseNumber: function () {
            return this.houses.length;
        },
    },
    created: function () {
        this.getHouses();
    },
};
</script>

<style scoped>
</style>
