<template>
  <div class="zj-page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.current_page"
      :page-sizes="pageParams.page_sizes"
      :page-size="pageParams.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageParams.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "zj-page",
  props: {
    pageParams: {
      type: Object,
      default() {
        return {
          current_page: 4,
          page_sizes: [100, 200, 300, 400],
          page_size: 100,
          total: 400
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
      handleSizeChange(data) {
          console.log(data)
      },
      handleCurrentChange() {
          console.log(data)
      }
  }
};
</script>

<style scoped lang="less">

</style>