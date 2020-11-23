<template>
    <div>
        <b-card title="信息面板" sub-title="小区信息统计" />
        <div style="max-height: 100vh; overflow-y: auto; width: 100%">
            <b-card
                style="display: inline-block"
                title="车位缴费情况"
                sub-title="车位缴费折线图"
            >
                <div style="text-align: center">总共/未缴费</div>
                <v-chart :options="parking" ref="parkingChart" />
            </b-card>
            <b-card
                style="display: inline-block"
                title="物业费缴费情况"
                sub-title="物业费缴费折线图"
            >
                <div style="text-align: center">总共/未缴费</div>
                <v-chart :options="property" />
            </b-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "PropertyInformation",
    props: ["alerter"],
    data() {
        return {
            parking: {
                axisLabel: {
                    interval: 0,
                    rotate: 40,
                },
                title: {
                    text: "堆叠区域图",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
                legend: {
                    data: ["全部", "未缴费"],
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true,
                        },
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                    },
                ],
                series: [
                    {
                        name: "全部",
                        type: "line",
                        stack: "总量",
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: "未缴费",
                        type: "line",
                        stack: "总量",
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                ],
            },
            property: {
                title: {
                    text: "堆叠区域图",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
                legend: {
                    data: ["全部", "未缴费"],
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: [],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                    },
                ],
                series: [
                    {
                        name: "全部",
                        type: "line",
                        stack: "总量",
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: "未缴费",
                        type: "line",
                        stack: "总量",
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                ],
            },
        };
    },
    methods: {
        statistics() {
            this.$axios({
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                },
                url: this.serverURL + "property/get_parking_fee_statistics",
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    let x = [];
                    let unpay = [];
                    let total = [];
                    for (let date in data.statistics.total) {
                        x.push(date);
                        total.push(data.statistics.total[date]);
                        unpay.push(data.statistics.unpay[date]);
                    }
                    this.parking.xAxis[0].data = x;
                    this.parking.series[0].data = total;
                    this.parking.series[1].data = unpay;
                }
            });
            this.$axios({
                method: "post",
                data: {
                    token: this.$cookies.get("token"),
                },
                url: this.serverURL + "property/get_property_fee_statistics",
            }).then((response) => {
                let data = response.data;
                if (!data.success) {
                    this.alerter("错误", data.info);
                } else {
                    let x = [];
                    let unpay = [];
                    let total = [];
                    for (let date in data.statistics.total) {
                        x.push(date);
                        total.push(data.statistics.total[date]);
                        unpay.push(data.statistics.unpay[date]);
                    }
                    this.property.xAxis[0].data = x;
                    this.property.series[0].data = total;
                    this.property.series[1].data = unpay;
                }
            });
        },
    },
    created() {
        this.statistics();
    },
};
</script>

<style>
</style>