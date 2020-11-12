<template>
    <div>
        <div class="input" :style="{ color: this.color }">
            <label
                class="placeholder"
                :for="name + randIdFoot"
                :style="inputStyle"
            >
                {{ placeholder }}
            </label>
            <input
                :type="type"
                :id="name + randIdFoot"
                :value="value"
                @input="$emit('input', $event.target.value)"
                @focus="inputHover = true"
                @blur="inputHover = false"
            />
            <span class="spin" :style="spanStyle"></span>
        </div>
    </div>
</template>


<script>
export default {
    name: "FInput",
    props: ["value", "placeholder", "name", "activeColor", "color", "type"],
    methods: {
        randomNum(minNum, maxNum) {
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        },
    },
    data: function () {
        return {
            inputHover: !!this.value,
            randIdFoot: "",
        };
    },
    computed: {
        inputStyle: function () {
            let res = {};
            if (this.inputHover || this.value) {
                res.top = "-1em";
                res.fontSize = "1em";
            } else {
                res.top = "10px";
                res.fontSize = "1.5em";
            }
            return res;
        },
        spanStyle: function () {
            let res = {};
            if (this.activeColor) {
                res = {
                    background: this.activeColor,
                };
            }
            if (this.inputHover) {
                res.width = "100%";
            }
            return res;
        },
    },
    created: function () {
        this.randIdFoot = this.randomNum(1000, 9999);
    },
};
</script>

<style scoped>
.placeholder {
    display: inline-block;
    width: 100%;
    font-size: 1.5em;
    position: absolute;
    font-weight: 300;
    vertical-align: middle;
    transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: text;
}
.input {
    display: inline-block;
    position: relative;
    width: 100%;
}
.input > input {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    outline: none;
    transition: 0.3s;
    line-height: 2em;
    font-size: 2em;
    top: 5px;
    display: inline-block;
    width: 100%;
}
.input::before {
    position: absolute;
    content: "";
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 3;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
}
.spin {
    position: absolute;
    height: 1px;
    background: #ed2553;
    z-index: 4;
    left: 0;
    bottom: 0;
    width: 0;
    transition: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border: 0;
    border-bottom: white 1px solid;
    outline: none;
    transition: 0.3s;
    line-height: 3em;
    transition: background-color 5000s ease-in-out 0s;
}
</style>
