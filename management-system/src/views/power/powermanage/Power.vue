<template>
  <div class="zj-power-container">
      <h2>权限管理</h2>
  </div>
</template>

<script>
import { getPowerList } from '@/networks/power/power'

export default {
    name: 'zj-power',
    data() {
        return {
            powerData: []
        }
    },
    mounted() {
        this._getPowerList()
    },
    methods: {
        /**获取全部权限列表 */
        async _getPowerList() {
            this.powerData = []
            let res = await getPowerList()

            if(res.meta.status !== 200) return this.$message.warning(res.meta.msg)

            // 请求成功
            this.powerData.push(...res.data)
            this.$message.success(res.meta.msg)
            console.log(this.powerData)
        }
    }
}
</script>

<style scoped lang="less">

</style>