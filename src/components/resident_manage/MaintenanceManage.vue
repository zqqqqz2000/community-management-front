<template>
    <div>
        <b-card
            title="维修申请"
            sub-title="申请维修后小区物业将尽快上门维修"
        ></b-card>
        <div class="row-contianer">
            <b-nav tabs>
                <b-nav-item
                    :active="currentTab == 'apply'"
                    @click="currentTab = 'apply'"
                >
                    报修
                </b-nav-item>
                <b-nav-item
                    :active="currentTab == 'history'"
                    @click="currentTab = 'history'"
                >
                    维修记录
                </b-nav-item>
            </b-nav>
            <div>
                <div v-if="currentTab == 'apply'">
                    <b-card title="报修" style="">
                        <b-progress
                            :value="duration"
                            animated
                            variant="success"
                        ></b-progress>
                        <div style="padding-top: 20px; padding-bottom: 20px">
                            <div
                                class="progress-container"
                                v-if="applyStep == 1"
                            >
                                <h5>选择报修房屋</h5>
                                <b-card
                                    v-for="house in houses"
                                    :key="house.id"
                                    border-variant="warning"
                                    header-border-variant="secondary"
                                    style="width: 130px; text-align: center"
                                    class="house"
                                    @click="
                                        apply.hid = house.id;
                                        applyStep = 2;
                                        duration += 33.3;
                                    "
                                >
                                    <b-icon
                                        font-scale="2"
                                        icon="house-fill"
                                    ></b-icon>
                                    <br />
                                    {{ house.building_number }}
                                    <br />
                                    <b-badge variant="primary">{{
                                        house.room_number
                                    }}</b-badge>
                                </b-card>
                            </div>
                            <div
                                class="progress-container"
                                v-if="applyStep == 2"
                            >
                                <b-form-group
                                    description="维修人员将在申报日期后挑选时间上门维修"
                                    label="申报日期"
                                >
                                    <b-form-datepicker
                                        id="example-datepicker"
                                        v-model="apply.apply_date"
                                        class="mb-2"
                                    ></b-form-datepicker>
                                </b-form-group>
                                <b-form-group label="支付方式">
                                    <b-form-radio-group
                                        v-model="apply.from_balance"
                                    >
                                        <b-form-radio value="0">
                                            上门面付
                                        </b-form-radio>
                                        <b-form-radio value="1">
                                            从维修基金中扣除
                                        </b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </div>
                            <div
                                class="progress-container"
                                v-if="applyStep == 3"
                            >
                                <b-form-group
                                    description="请详细填写维修备注，方便维修人员了解详情"
                                    label="维修备注"
                                >
                                    <b-form-textarea
                                        v-model="apply.comment"
                                        placeholder="请填写维修备注..."
                                        rows="9"
                                        max-rows="9"
                                    ></b-form-textarea>
                                </b-form-group>
                                <b-button
                                    variant="outline-primary"
                                    style="float: right"
                                    @click="submit()"
                                >
                                    提交
                                </b-button>
                            </div>
                            <div
                                class="progress-container"
                                v-if="applyStep == 4"
                                style="text-align: center; padding-top: 50px"
                            >
                                <h3>申请成功，等待物业处理...</h3>
                                <div style="font-size: 90px">&#128504;</div>
                            </div>
                        </div>

                        <b-button
                            variant="primary"
                            :disabled="applyStep == 1"
                            @click="
                                applyStep -= 1;
                                duration -= 33.3;
                            "
                        >
                            <b-icon icon="arrow-left"></b-icon>
                            上一步
                        </b-button>
                        <b-button
                            variant="primary"
                            :disabled="applyStep >= 3"
                            @click="
                                applyStep += 1;
                                duration += 33.3;
                            "
                            style="margin-left: 20px"
                        >
                            下一步
                            <b-icon icon="arrow-right"></b-icon>
                        </b-button>
                    </b-card>
                </div>
                <!-- 历史记录部分 -->
                <div v-if="currentTab == 'history'">
                    <b-card
                        title="报修/维修记录"
                        sub-title="点击条目查看详情，蓝色为未维修条目"
                    >
                        <b-table
                            selectable
                            select-mode="single"
                            @row-selected="onRowSelected"
                            selected-variant="null"
                            :fields="[
                                'id',
                                'building_num',
                                'room_number',
                                'apply_date',
                            ]"
                            :items="maintenances"
                        ></b-table>
                    </b-card>
                </div>
            </div>
            <b-modal title="报修详情" v-model="applyDetail">
                <div>房号: {{ currentMaintenance.room_number }}</div>
                <div>楼号: {{ currentMaintenance.building_num }}</div>
                <div>报修日期: {{ currentMaintenance.apply_date }}</div>
                <div v-if="currentMaintenance.status">
                    <div>维修日期: {{ currentMaintenance.fix_date }}</div>
                    <div>维修人员编号: {{ currentMaintenance.fix_number }}</div>
                    <div>支付金额: {{ currentMaintenance.pay_amount }}</div>
                    <div>
                        支付方式:
                        {{
                            currentMaintenance.from_balance
                                ? "维修基金"
                                : "当面支付"
                        }}
                    </div>
                </div>
                <div v-else>
                    维修状态: 未维修
                    <b-button size="sm" variant="danger">撤销申请</b-button>
                </div>
                <div>
                    报修细则:
                    <b-card
                        bg-variant="light"
                        class="text-left"
                        style="height: 200px"
                    >
                        <b-card-text>
                            {{ currentMaintenance.comment }}
                        </b-card-text>
                    </b-card>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
export default {
    name: "MaintenanceManage",
    props: ["alerter"],
    data() {
        return {
            currentTab: "apply",
            applyStep: 1,
            apply: { from_balance: 0 },
            applyDetail: false,
            houses: [],
            maintenances: [],
            selectedMaintenance: 0,
            duration: 0,
        };
    },
    computed: {
        currentMaintenance() {
            for (let i of this.maintenances) {
                if (this.selectedMaintenance === i.id) {
                    return i;
                }
            }
            return {};
        },
    },
    methods: {
        onRowSelected: function (item) {
            this.selectedMaintenance = item[0].id;
            this.applyDetail = true;
        },
        getMaintenance: function () {
            this.$axios({
                url: this.serverURL + "resident/get_maintenance",
                method: "post",
                withCredentials: true,
                data: {
                    token: this.$cookies.get("token"),
                },
            }).then((response) => {
                let data = response.data;
                if (data.success) {
                    for (let i of data.maintenance) {
                        if (i.status === 0) {
                            i._rowVariant = "info";
                        }
                    }
                    this.maintenances = data.maintenance;
                } else {
                    this.alerter("错误", data.info);
                }
            });
        },
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
        submit() {
            if (
                this.apply.hid === undefined ||
                this.apply.apply_date === undefined ||
                this.apply.comment === undefined
            ) {
                this.alerter("请完善信息", "信息未完善");
            } else {
                this.$axios({
                    url: this.serverURL + "resident/apply_maintenance",
                    method: "post",
                    withCredentials: true,
                    data: {
                        token: this.$cookies.get("token"),
                        apply: this.apply,
                    },
                }).then((response) => {
                    let data = response.data;
                    if (data.success) {
                        this.applyStep = 4;
                        this.duration = 100;
                        this.getMaintenance();
                    } else {
                        this.alerter("错误", data.info);
                    }
                });
            }
        },
    },
    created() {
        this.getHouses();
        this.getMaintenance();
    },
};
</script>

<style scoped>
.row-contianer {
    padding-left: 7px;
    padding-top: 7px;
}
.house:hover {
    background-color: #f4e4b5;
}
.house {
    transition: ease-in-out 0.1s;
    cursor: pointer;
    display: inline-block;
    margin-right: 7px;
    margin-bottom: 7px;
}
.progress-container {
    transition: 0.1s;
    height: calc(100vh - 350px);
}
</style>
