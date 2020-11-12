<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    beforeCreate: function () {
        document
            .querySelector("body")
            .setAttribute("style", "margin: 0; background-color: #1e1e1e");
    },
};
</script>

<style>
#app {
    margin: 0;
    padding: 0;
}
</style>
