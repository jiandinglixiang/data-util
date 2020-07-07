<template>
  <el-container class="page-container">
    <el-header height="auto">
      <el-dialog :visible.sync="dialogTableVisible" title="最近任务">
        <el-table :data="tableData" border>
          <el-table-column label="日期" property="date" width="150" />
          <el-table-column label="姓名" property="name" width="200" />
          <el-table-column label="地址" property="address" />
        </el-table>
      </el-dialog>
      <el-row justify="space-between" type="flex">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="沉默天数大于等于:">
            <el-input-number v-model="formInline.area" :max="10" :min="1" />
          </el-form-item>
          <el-form-item label="充值金额大于等于:">
            <el-input-number v-model="formInline.area" :max="10" :min="1" />
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="formInline.area">
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
        border
        height="calc(100vh - 245px)"
        style="width: 100%;"
      >
        <el-table-column label="用户" prop="date" width="100" />
        <el-table-column label="注册时间" prop="name" width="80" />
        <el-table-column label="沉默天数" prop="name" width="80" />
        <el-table-column label="充值金额" prop="name" width="80" />
        <el-table-column label="邮箱" prop="name" width="80" />
        <el-table-column label="手机" prop="name" width="80" />
        <el-table-column label="IDFA" prop="address" />
        <el-table-column label="AAID" prop="name" width="80" />
        <el-table-column label="回归状态" prop="name" width="80" />
      </el-table>
    </el-main>
    <el-footer>
      <el-divider content-position="right">
        <el-pagination
          :current-page="currentPage"
          :page-size="100"
          :page-sizes="[100, 200, 300, 400]"
          :total="400"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
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
        area: ''
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

<style lang="scss" scoped>
.tag-container {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.tag-list {
  span {
    margin-left: 5px;
  }
}
</style>
