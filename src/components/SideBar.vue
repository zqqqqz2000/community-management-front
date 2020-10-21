<template>
    <div>
        <div id="menu" class="left-nav">
            <div class="bar-header">
                <h2>{{ childTree.title }}</h2>
            </div>
            <div v-for="column in childTree.childs" :key="column.key">
                <p>{{ column.title }}</p>
                <ul>
                    <li
                        v-for="child in column.childs"
                        :key="child.key"
                        :class="{ active: active_key === child.key }"
                    >
                        <router-link :to="child.url">
                            {{ child.title }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    props: ["childTree"],
    data: function () {
        return {
            active_key: "",
        };
    },
    beforeMount: function () {
        for (let column of this.childTree.childs) {
            for (let child of column.childs) {
                if (this.$route.path === child.url) {
                    this.active_key = child.key;
                }
            }
        }
    },
    watch: {
        $route: function (to) {
            for (let column of this.childTree.childs) {
                for (let child of column.childs) {
                    if (to.path === child.url) {
                        this.active_key = child.key;
                    }
                }
            }
        },
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}
#menu {
    position: relative;
    float: left;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    background-color: #1c2b36;
    z-index: 9999;
    padding-top: 20px;
}
#menu ul {
    border-bottom: #131e26 solid 2px;
    margin-bottom: 10px;
}
#menu p {
    display: inline-block;
    color: #5c798f;
    margin-left: 10px;
    margin-bottom: 5px;
}
#menu .bar-header > h1,
h2,
h3,
h4 {
    color: #dfe4ed;
}
#menu .bar-header {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
}
#menu a {
    padding-left: 30px;
}
#menu a:hover,
#menu a:focus {
    text-decoration: none;
}
.left-nav ul li a {
    font-weight: bold;
    color: #869fb1;
    display: block;
    padding: 1em 5%;
    transition: all 0.2s ease-out;
    cursor: pointer;
}
.active {
    background-color: #131e26;
    color: #ffffff;
}
.left-nav ul li a:hover {
    background-color: #131e26;
    color: #ffffff;
}
.show-nav {
    transform: translateX(0);
}
.hide-nav {
    transform: translateX(-220px);
} /*侧滑关键*/
.left-nav-taggle {
    height: 35px;
    line-height: 35px;
    width: 35px;
    background-color: #131e26;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
.nav.avbar-inverse {
    position: relative;
}
.nav-btn {
    position: absolute;
    right: 20px;
    top: 20px;
}
</style>