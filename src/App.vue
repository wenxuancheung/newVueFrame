<template>
  <div id="app">
    <Loading v-show="$store.state.showLoading"/>
    <Toast v-show="$store.state.showToast" v-on:close="close" v-on:confirm="confirm"/>
    <router-view/>
  </div>
</template>

<script>
  import Loading from './components/loading/Loading.vue'
	import Toast from './components/toast/Toast.vue'
  export default {
    name: 'App',
    data(){
      return{

      }
    },
    components:{
			Loading,
			Toast
    },
    methods:{
			close(){
				this.$store.dispatch('CLOSETOAST')
			},
			confirm(){
				this.$store.dispatch('CLOSETOAST')
			}
		},
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
