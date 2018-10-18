<template>
    <div class="main"  @touchmove.prevent>
        <img src="./img/200px.svg" class="main-body"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },

        components: {},

        computed: {},

        mounted() {
        },
        beforeDestroy(){
        },
        methods: {}
}

</script>

<style scoped>
    .main{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100000;
        position: fixed;
        top: 0;
    }
    .main-body{
        width: 1.5rem;
        height: 1.5rem;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 999999;
        margin: auto;
        background-color: #fff;
        border-radius: .15rem;
    }
</style>