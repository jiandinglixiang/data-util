<template>
  <el-container class="page-container">
    <el-header height="auto">
      <b>重要价值</b>
      <p style="margin-bottom: 10px;">用户数：888576 | 占比：18.53%</p>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="折线图">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分群周期">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="起止日期">
          <el-date-picker
            v-model="formInline.value2"
            :picker-options="pickerOptions"
            align="right"
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
          />
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <ve-line
        :data="chartData"
        :grid="status.grid"
        :settings="status.settings"
        height="250px"
      />
      <el-table
        :data="[...tableData, ...tableData]"
        border
        height="calc(100vh - 519px)"
        style="width: 100%;"
      >
        <el-table-column label="周期" prop="date" width="100" />
        <el-table-column label="活跃" prop="name" width="80" />
        <el-table-column label="付费率" prop="name" width="80" />
        <el-table-column label="人均单量" prop="name" width="80" />
        <el-table-column label="arpu" prop="name" width="80" />
        <el-table-column label="arppu" prop="name" width="80" />
        <el-table-column label="平均阅读时长" prop="address" />
        <el-table-column label="启动" prop="name" width="80" />
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
import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import 'v-charts/lib/style.css'

Vue.component(VeLine.name, VeLine)
export default {
  name: 'DaysDetail',
  data() {
    const columns = [
      '活跃',
      '付费率',
      '人均单量',
      'arpu',
      'arppu',
      '平均阅读时长（min）',
      '启动'
    ]

    return {
      currentPage: 1,
      formInline: {},
      options: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      chartData: {
        columns,
        rows: [
          {
            [columns[0]]: '1',
            [columns[1]]: 13,
            [columns[2]]: 193,
            [columns[3]]: 0.32213,
            [columns[4]]: 193,
            [columns[5]]: 193,
            [columns[6]]: 193
          },
          {
            [columns[0]]: '2',
            [columns[1]]: 139,
            [columns[2]]: 103,
            [columns[3]]: 0.32123,
            [columns[4]]: 193,
            [columns[5]]: 193,
            [columns[6]]: 193
          },
          {
            [columns[0]]: '3',
            [columns[1]]: 1393,
            [columns[2]]: 1093,
            [columns[3]]: 0.32123,
            [columns[4]]: 193,
            [columns[5]]: 193,
            [columns[6]]: 193
          },
          {
            [columns[0]]: '4',
            [columns[1]]: 133,
            [columns[2]]: 109,
            [columns[3]]: 0.3223,
            [columns[4]]: 193,
            [columns[5]]: 193,
            [columns[6]]: 193
          },
          {
            [columns[0]]: '5',
            [columns[1]]: 193,
            [columns[2]]: 93,
            [columns[3]]: 0.3243,
            [columns[4]]: 193,
            [columns[5]]: 193,
            [columns[6]]: 193
          }
        ]
      },
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
      status: {
        series: [],
        settings: {
          yAxisName: ['数值']
        },
        legend: {},
        grid: {
          bottom: 10,
          height: 200
        }
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

<style scoped></style>
