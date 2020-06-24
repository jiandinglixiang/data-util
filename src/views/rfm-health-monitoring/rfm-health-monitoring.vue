<template>
  <el-container class="page-container">
    <el-main>
      <h3 class="block-title">分布比例</h3>
      <div class="top-container">
        <ul>
          <li v-for="n in 8" :key="n" class="left-proportion-item">
            <h5>重要价值</h5>
            <b>18.53%</b>
            <p>888576</p>
          </li>
        </ul>
        <div class="right-grade">
          <div>
            <h5>各维度评分均值</h5>
            <div class="simple-table">
              <p>距离最近充值相隔天数</p>
              <p>过去12个月充值次数</p>
              <p>过去12个月充值金额</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
            </div>
          </div>
          <div>
            <h5>各维度达到1的最低值</h5>
            <div class="simple-table">
              <p>距离最近充值相隔天数</p>
              <p>过去12个月充值次数</p>
              <p>过去12个月充值金额</p>
              <p>123</p>
              <p>123</p>
              <p>123</p>
            </div>
          </div>
        </div>
      </div>
      <h3 class="block-title">
        分群数据
        <span class="fixed-icon-tips">
          说明
          <i class="el-icon-question"></i>
        </span>
      </h3>
      <ul class="line-table-container">
        <li style="border: 1px solid #ddd;">
          <div class="line-table-item-header">
            <b>重要价值0</b>
            <p>
              转入295 | 转出115
              <el-link
                type="primary"
                @click="$router.push({ name: 'DaysDetail' })"
              >
                每日明细
              </el-link>
            </p>
          </div>
          <ve-line
            height="250px"
            :data="chartData"
            :settings="status.settings"
            :grid="status.grid"
          />
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="周期" width="100" />
            <el-table-column prop="name" label="活跃" width="80" />
            <el-table-column prop="name" label="付费率" width="80" />
            <el-table-column prop="name" label="人均单量" width="80" />
            <el-table-column prop="name" label="arpu" width="80" />
            <el-table-column prop="name" label="arppu" width="80" />
            <el-table-column prop="address" label="平均阅读时长" width="250" />
            <el-table-column prop="name" label="启动" width="80" />
          </el-table>
        </li>
        <li v-for="n in 11" :key="n" style="border: 1px solid #ddd">
          <div class="line-table-item-header">
            <b>重要价值{{ n }}</b>
            <p>
              转入295 | 转出115
              <el-link type="primary">每日明细</el-link>
            </p>
          </div>
          <ve-line
            height="250px"
            :data="chartData"
            :settings="status.settings"
            :grid="status.grid"
            :data-empty="true"
          />
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="周期" width="100" />
            <el-table-column prop="name" label="活跃" width="80" />
            <el-table-column prop="name" label="付费率" width="80" />
            <el-table-column prop="name" label="人均单量" width="80" />
            <el-table-column prop="name" label="arpu" width="80" />
            <el-table-column prop="name" label="arppu" width="80" />
            <el-table-column prop="address" label="平均阅读时长" width="250" />
            <el-table-column prop="name" label="启动" width="80" />
          </el-table>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import VeLine from 'v-charts/lib/line.common'
import 'v-charts/lib/style.css'

Vue.component(VeLine.name, VeLine)

export default {
  name: 'RfmHealthMonitoring',
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
  }
}
</script>

<style scoped lang="scss">
.line-table-container {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  > li {
    width: 49.5%;
    flex: 0 0 49.5%;
    margin-right: 0.5%;
    margin-bottom: 1%;
  }
  > li:nth-child(2n + 0) {
    margin-left: 0.5%;
    margin-right: 0;
  }
}
.line-table-item-header {
  text-align: center;
  padding: 10px 0;
}

.top-container {
  display: flex;
  flex-flow: row nowrap;
  > ul {
    width: 50%;
    flex: 0 0 50%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
}
.right-grade {
  width: 49.5%;
  flex: 0 0 49.5%;
  margin-left: 0.5%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  > div {
    width: 100%;
    flex: 0 1 50%;
    margin-bottom: 1%;
  }

  h5 {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 20px;
  }
}
.simple-table {
  display: flex;
  flex-flow: row wrap;
  border: 1px solid #ebeef5;
  border-right: 0;
  text-align: center;
  font-size: 14px;
  p:nth-last-child(1n + 4) {
    width: 0;
    flex: 0 0 33.3%;
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    padding: 5px;
  }
  p:nth-child(1n + 4) {
    width: 0;
    flex: 0 0 33.3%;
    border-right: 1px solid #ebeef5;
    padding: 5px;
  }
}
.left-proportion-item {
  min-width: 140px;
  min-height: 140px;
  padding: 1%;
  flex: 0 0 24%;
  margin-right: 1%;
  margin-bottom: 1%;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  b {
    font-size: 1.5em;
    margin: 10px;
  }
  p {
    font-size: 13px;
  }
}
.block-title {
  margin: 10px 0;
  border-left: 3px solid #409eff;
  text-indent: 0.5em;
  position: relative;
}
.fixed-icon-tips {
  position: absolute;
  right: 0;
  top: 0;
  color: #409eff;
}
.go-up {
  color: red;
  &:after {
    content: '↑';
  }
}

.go-down {
  color: green;
  &:after {
    content: '↓';
  }
}
</style>
