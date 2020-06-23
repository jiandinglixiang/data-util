<template>
  <el-container class="page-container">
    <el-header height="auto">
      <el-dialog title="最近任务" :visible.sync="dialogTableVisible">
        <el-table :data="tableData" border>
          <el-table-column property="date" label="日期" width="150" />
          <el-table-column property="name" label="姓名" width="200" />
          <el-table-column property="address" label="地址" />
        </el-table>
      </el-dialog>
      <el-row type="flex" justify="space-between">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="沉默天数大于等于:">
            <el-input-number v-model="formInline.region" :min="1" :max="10" />
          </el-form-item>
          <el-form-item label="充值金额大于等于:">
            <el-input-number v-model="formInline.region" :min="1" :max="10" />
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="formInline.region">
              <el-radio-button label="沉默7天以上" />
              <el-radio-button label="沉默15天以上" />
              <el-radio-button label="沉默30天以上" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <el-badge :value="3" class="item">
          <el-button @click="dialogTableVisible = !dialogTableVisible">
            任务列表
          </el-button>
        </el-badge>
      </el-row>
      <div class="tag-container">
        <div>
          <el-button type="danger">删除分组</el-button>
          <el-button type="primary">创建分组</el-button>
          <el-button type="primary">创建画像</el-button>
          <el-button type="primary">导出</el-button>
        </div>
        <div class="tag-list">
          <el-tag type="success">标签二</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">标签四</el-tag>
          <el-tag type="danger">标签五</el-tag>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-table
        :data="
          tableData.concat(
            tableData,
            tableData,
            tableData,
            tableData,
            tableData
          )
        "
        height="calc(100vh - 245px)"
        style="width: 100%;"
        border
      >
        <el-table-column prop="date" label="用户" width="100" />
        <el-table-column prop="name" label="注册时间" width="80" />
        <el-table-column prop="name" label="沉默天数" width="80" />
        <el-table-column prop="name" label="充值金额" width="80" />
        <el-table-column prop="name" label="邮箱" width="80" />
        <el-table-column prop="name" label="手机" width="80" />
        <el-table-column prop="address" label="IDFA" />
        <el-table-column prop="name" label="AAID" width="80" />
        <el-table-column prop="name" label="回归状态" width="80" />
      </el-table>
    </el-main>
    <el-footer>
      <el-divider content-position="right">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-divider>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'UserLoseMonitoring',
  data() {
    return {
      dialogTableVisible: false,
      currentPage: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="scss">
.tag-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.tag-list {
  span {
    margin-left: 5px;
  }
}
</style>
