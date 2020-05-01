<template>
  <div class="lwj-container">
    <a-row>
      <a-col :span="24">
        <a-card>
          <a-table
            :loading="loading"
            :rowKey="log => log.id"
            :columns="columns"
            :dataSource="logs"
          >
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import LogsApi from "../../api/Logs";
  const columns = [
    {
      title: '目标',
      ellipsis: true,
      dataIndex: 'target'
    },
    {
      title: '日志类型',
      ellipsis: true,
      dataIndex: 'type'
    },
    {
      title: '时间',
      ellipsis: true,
      dataIndex: 'time'
    }
  ]
  export default {
    name: "Logs",
    data() {
      return {
        loading: true,
        columns,
        logs: []
      }
    },
    created () {
      this.loadLogs()
    },
    methods: {
      async loadLogs() {
        LogsApi.loadLogs().then(res => {
          if (res.code === 1000) {
            this.logs = res.data.logs
            this.loading = false
          } else {
            this.$message.warning('加载系统日志信息失败')
          }
        }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>