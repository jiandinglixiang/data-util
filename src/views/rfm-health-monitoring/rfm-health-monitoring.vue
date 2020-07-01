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
            :data="chartData"
            :grid="status.grid"
            :settings="status.settings"
            height="250px"
          />
          <el-table :data="tableData" border style="width: 100%;">
            <el-table-column label="周期" prop="date" width="100" />
            <el-table-column label="活跃" prop="name" width="80" />
            <el-table-column label="付费率" prop="name" width="80" />
            <el-table-column label="人均单量" prop="name" width="80" />
            <el-table-column label="arpu" prop="name" width="80" />
            <el-table-column label="arppu" prop="name" width="80" />
            <el-table-column label="平均阅读时长" prop="address" width="250" />
            <el-table-column label="启动" prop="name" width="80" />
          </el-table>
        </li>
        <li v-for="n in 11" :key="n" style="border: 1px solid #ddd;">
          <div class="line-table-item-header">
            <b>重要价值{{ n }}</b>
            <p>
              转入295 | 转出115
              <el-link type="primary">每日明细</el-link>
            </p>
          </div>
          <ve-line
            :data="chartData"
            :data-empty="true"
            :grid="status.grid"
            :settings="status.settings"
            height="250px"
          />
          <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="周期" prop="date" width="100" />
            <el-table-column label="活跃" prop="name" width="80" />
            <el-table-column label="付费率" prop="name" width="80" />
            <el-table-column label="人均单量" prop="name" width="80" />
            <el-table-column label="arpu" prop="name" width="80" />
            <el-table-column label="arppu" prop="name" width="80" />
            <el-table-column label="平均阅读时长" prop="address" width="250" />
            <el-table-column label="启动" prop="name" width="80" />
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

<style lang="scss" scoped>
.line-table-container {
  align-items: flex-start;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;

  > li {
    flex: 0 0 49.5%;
    margin-bottom: 1%;
    margin-right: 0.5%;
    width: 49.5%;
  }

  > li:nth-child(2n + 0) {
    margin-left: 0.5%;
    margin-right: 0;
  }
}

.line-table-item-header {
  padding: 10px 0;
  text-align: center;
}

.top-container {
  display: flex;
  flex-flow: row nowrap;

  > ul {
    display: flex;
    flex: 0 0 50%;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 50%;
  }
}

.right-grade {
  align-items: center;
  display: flex;
  flex: 0 0 49.5%;
  flex-flow: column nowrap;
  justify-content: center;
  margin-left: 0.5%;
  width: 49.5%;

  > div {
    flex: 0 1 50%;
    margin-bottom: 1%;
    width: 100%;
  }

  h5 {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 5px;
  }
}

.simple-table {
  border: 1px solid #ebeef5;
  border-right: 0;
  display: flex;
  flex-flow: row wrap;
  font-size: 14px;
  text-align: center;

  p:nth-last-child(1n + 4) {
    background-color: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    flex: 0 0 33.3%;
    padding: 5px;
    width: 0;
  }

  p:nth-child(1n + 4) {
    border-right: 1px solid #ebeef5;
    flex: 0 0 33.3%;
    padding: 5px;
    width: 0;
  }
}

.left-proportion-item {
  align-items: center;
  border: 1px solid #ccc;
  display: flex;
  flex: 0 0 24%;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: 1%;
  margin-right: 1%;
  min-height: 140px;
  min-width: 140px;
  padding: 1%;
  text-align: center;

  b {
    font-size: 1.5em;
    margin: 10px;
  }

  p {
    font-size: 13px;
  }
}

.block-title {
  border-left: 3px solid #409eff;
  margin: 10px 0;
  position: relative;
  text-indent: 0.5em;
}

.fixed-icon-tips {
  color: #409eff;
  position: absolute;
  right: 0;
  top: 0;
}

.go-up {
  color: red;

  &::after {
    content: '↑';
  }
}

.go-down {
  color: green;

  &::after {
    content: '↓';
  }
}
</style>
