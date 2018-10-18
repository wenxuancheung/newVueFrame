<template>
    <div>
        11111111111111
    </div>
</template>

<script>
    export default {
        name:'index',
        data(){
            return{
                toast:{}
            }
        },
        created(){
            window['sendToken'] = (res)=>{
                //全局保存TOKEN
                this.$store.dispatch('GETTOKEN',res.ACCESS_TOKEN)
            }
            this.appAction('getToken')
            window['refreshTokenError'] = ()=> {
                this.toast.content = 'TokenError'
                this.$store.dispatch('SETTOAST',this.toast)
            }
        }
    }
</script>

<style scoped>

</style>