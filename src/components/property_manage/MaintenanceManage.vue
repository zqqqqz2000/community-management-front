<template>
    <div>
        <b-card title="维修处理" sub-title="住户所有的维修申请处理"></b-card>
        <b-table
            :fields="['id', 'building_num', 'room_number', 'apply_date']"
            :items="maintenances"
        ></b-table>
    </div>
</template>

<script>
export default {
    name: "MaintenanceManageProp",
    data: function () {
        return {
            maintenances: [],
        };
    },
};
</script>

<style>
</style>
