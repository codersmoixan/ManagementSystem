<template>
  <div class="zj-public-layout">
    <el-container>
      <el-header class="zj-header">
        <h2 class="zj-title">电商后台管理系统</h2>
      </el-header>
      <el-container class="zj-el-container">
        <el-aside width="220px" class="zj-el-aside">
          <nav-menu></nav-menu>
        </el-aside>
        <el-container>
          <el-main class="zj-el-main">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./childcomps/NavMenu";

export default {
  name: "publicLayout",
  data() {
    return {
        
    };
  },
  computed: {
    isOpen() {
        return this.$route.path !== '/' || this.$route.path !== '/login' ? true : false
    }
  },
  created() {
      this.isOpenFlag()
  },
  methods: {
      isOpenFlag() {
          this.$emit('isOpenLoginFlag', this.isOpen)
      }
  },
  components: {
    "nav-menu": NavMenu
  }
};
</script>
<style lang="less">
 .zj-el-container {
      min-height: calc(100vh - 60px);
      .zj-el-main {
          background-color: #eaedf1;
      }
      .zj-el-aside {
          min-height: 100%;
          background-color: #545c64;
      }
  }
</style>
<style lang="less" scoped>
.zj-public-layout {
  .zj-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;

    .zj-title {
      color: #fff;
      font-size: 22px;
      text-align: left;
      font-weight: 400;
    }
  }

  
}
</style>