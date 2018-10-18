<template>
    <div class="toast" @touchmove.prevent>
        <div class="toast-body">
            <div class="toast-body-top">
                <div class="toast-body-top-img"><img src="./img/title-icon.png" style="width:.5rem;heigth:.5rem" v-if="$store.state.toast.showImg"/></div>
                <div class="toast-body-top-title">提示</div>
                <div class="toast-body-top-close"><img src="./img/close.png" style="width:.5rem;height:.5rem;" v-if="$store.state.toast.showClose" @click="close"/></div>
            </div>
            <div class="toast-body-detail">
                {{$store.state.toast.content}}
            </div>
            <div class="toast-body-button">
                <div class="toast-body-button-right" :class="{border:!$store.state.toast.showLeftBtn}" @click="confirm">{{$store.state.toast.btnMsg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: ['toast'],
        components: {},

        computed: {},

        mounted() {
        },
        beforeDestroy(){
        },
        methods: {
            confirm(){
                //执行父组件方法
                this.$emit('confirm')              
            },
            //关闭窗口
            close(){
                this.$emit('close')
            }
        }
}

</script>
<style scoped>
    .toast{
        width: 100vw;
        height: 100vh;
        z-index: 199;
        position: fixed;
        top: 0;
        background-color:rgba(0,0,0,0.5) 
    }
    .toast-body{
        width: 6.9rem;
        height: 4.5rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 101;
        margin: auto;
        background: #f7f7f7;
        border-radius: .16rem;
    }
    .toast-body-top{
        width: cal(100%-.4rem);
        height: 1rem;
        font-size: .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
        /* border-bottom: #D7D7D7 solid .03rem */
    }
    .toast-body-top-img{
        width: .5rem;
        height: .5rem;
    }
    .toast-body-top-title{
        font-size: .34rem;
        font-weight: bold;
        color: #333;
    }
    .toast-body-top-close{
        width: .5rem;
        height: .5rem;
    }
    .toast-body-detail{
        font-size: .32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        padding: 0 .5rem;
    }
    .toast-body-button{
        width: 100%;
        font-size: .3rem;
        display: flex;
        justify-content: center
    }
    .toast-body-button-left{
        width: 50%;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #222;
        border-bottom-left-radius: .2rem;
    }
    .toast-body-button-right{
        width: 5.5rem;
        height: .9rem;
        /* padding: 0 .5rem; */
        /* margin-left: .5rem; */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fbb111;
        color: #fff;
        border-radius: .16rem;
        font-size: .34rem;
        /* margin-bottom: .4rem; */
    }
</style>