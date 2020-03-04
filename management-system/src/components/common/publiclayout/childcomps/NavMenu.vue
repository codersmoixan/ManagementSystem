<template>
  <div class="zj-nav-menu">
    <el-row>
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
        >
          <el-submenu
            :index="item.index"
            v-for="item in systemName"
            :key="item.index"
            class="zj-el-submenu"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item2.index"
                v-for="item2 in item.children"
                :key="item2.index"
                @click="switchRouter(item2.path)"
              >
                <i :class="item2.icon"></i>
                {{item2.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "zj-nav-menu",
  data() {
    return {
      systemName: [
        {
          name: "用户管理",
          icon: "el-icon-s-custom",
          index: "1",
          children: [
            {
              index: "1-1",
              name: "用户列表",
              path: "/user/list",
              icon: "el-icon-menu"
            }
          ]
        },
        {
          name: "权限管理",
          icon: "el-icon-first-aid-kit",
          index: "2",
          children: [
            { index: "2-1", name: "角色列表", path: "/power/role", icon: "el-icon-menu" },
            { index: "2-2", name: "权限列表", path: "/power/manage", icon: "el-icon-menu" }
          ]
        },
        {
          name: "商品管理",
          icon: "el-icon-shopping-bag-1",
          index: "3",
          children: [
            { index: "3-1", name: "商品列表", path: "", icon: "el-icon-menu" },
            { index: "3-2", name: "分类参数", path: "", icon: "el-icon-menu" },
            { index: "3-3", name: "商品分类", path: "", icon: "el-icon-menu" }
          ]
        },
        {
          name: "销售管理",
          icon: "el-icon-document-copy",
          index: "4",
          children: [
            { index: "4-1", name: "产品管理", path: "", icon: "el-icon-menu" },
            { index: "4-2", name: "订单明细", path: "", icon: "el-icon-menu" },
            { index: "4-3", name: "市场调研", path: "", icon: "el-icon-menu" },
            { index: "4-4", name: "活动列表", path: "", icon: "el-icon-menu" },
            { index: "4-5", name: "组管理", path: "", icon: "el-icon-menu" }
          ]
        },
        {
          name: "财务管理",
          icon: "el-icon-finished",
          index: "5",
          children: [
            { index: "5-1", name: "账目列表", path: "", icon: "el-icon-menu" },
            { index: "5-2", name: "工资管理", path: "", icon: "el-icon-menu" },
            { index: "5-3", name: "福利保险", path: "", icon: "el-icon-menu" },
            { index: "5-4", name: "报销管理", path: "", icon: "el-icon-menu" },
            { index: "5-5", name: "固定资产", path: "", icon: "el-icon-menu" },
            { index: "5-6", name: "组管理", path: "", icon: "el-icon-menu" }
          ]
        },
        {
          name: "订单管理",
          icon: "el-icon-document-copy",
          index: "6",
          children: [
            { index: "6-1", name: "订单列表", path: "", icon: "el-icon-menu" }
          ]
        },
        {
          name: "数据统计",
          icon: "el-icon-data-analysis",
          index: "7",
          children: [
            { index: "7-1", name: "数据报表", path: "", icon: "el-icon-menu" }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    /**跳转路由 */
    switchRouter(path) {
      this.$route.path !== path && this.$router.replace(path);
    }
  }
};
</script>
<style lang="less">
.zj-nav-menu {
  .el-menu-item,
  .el-submenu__title {
    font-size: 13px;
    text-align: left;
  }
}
</style>
<style scoped lang='less'>
</style>