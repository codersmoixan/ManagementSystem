<template>
  <div id="app">
    <public-layout v-if="!isOpen" @isOpenLoginFlag="isOpenLoginFlag"></public-layout>
    <router-view v-if="!isLoginOpen"></router-view>
  </div>
</template>

<script>
import PublicLayout from '@/components/common/publiclayout/PublicLayout'

export default {
  name: 'app',
  data() {
    return {
      isLoginOpen: this.isOpen
    }
  },
  computed: {
    isOpen() {      
      return this.$route.path === '/' || this.$route.path === '/login' ? true : false
    }
  }, 
  created() {
    // console.log(this.$route.path)
  },
  methods: {
    isOpenLoginFlag(flag) {
      this.isLoginOpen = flag
    }
  },
  components: {
    'public-layout': PublicLayout
  }
}
</script>
<style>
@import 'assets/css/base.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
