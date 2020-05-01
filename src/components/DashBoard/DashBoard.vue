<template>
  <div class="lwj-container">
    <AnalysisCards :data="data"></AnalysisCards>
    <InfoTab :data="data"></InfoTab>
  </div>
</template>

<script>
  import AnalysisCards from "./components/AnalysisCards";
  import InfoTab from "./components/InfoTab";
  import DashBoardApi from "../../api/DashBoard";
  export default {
    name: "DashBoard",
    components: {
      AnalysisCards,
      InfoTab
    },
    data() {
      return {
        data: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      async getData() {
        DashBoardApi.get().then(res => {
          this.data = res.data
        }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>