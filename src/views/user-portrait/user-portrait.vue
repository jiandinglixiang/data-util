<template>
  <el-container class="page-container">
    <el-main>
      <div class="select-area">
        <b>分群:</b>
        <el-select v-model="formModel.area" placeholder="选择地区">
          <el-option label="群1" value="shanghai" />
          <el-option label="群2" value="beijing" />
        </el-select>
      </div>
      <h3 class="block-title">基本属性</h3>
      <div>
        <template v-for="item in state.dateBtn">
          <el-divider :key="item" direction="vertical" />
          <el-button :key="item" type="text">{{ item }}</el-button>
        </template>
      </div>
      <div class="pie-container">
        <ve-pie
          :legend-visible="false"
          :series="series"
          :title="title"
          height="230px"
        />
      </div>
      <div class="select-area">
        <b>起止日期:</b>
        <el-date-picker
          v-model="formModel.interval"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <h3 class="block-title">活跃时段趋势</h3>
      <ve-line
        :data="chartData"
        :grid="status.grid"
        :settings="status.settings"
        height="250px"
      />
      <h3 class="block-title">充值人数趋势</h3>
      <ve-line
        :data="chartData"
        :grid="status.grid"
        :settings="status.settings"
        height="250px"
      />
      <h3 class="block-title">消耗人数趋势</h3>
      <ve-line
        :data="chartData"
        :grid="status.grid"
        :settings="status.settings"
        height="250px"
      />
      <h3 class="block-title">书币/书券存量趋势</h3>
      <ve-line
        :data="chartData"
        :grid="status.grid"
        :settings="status.settings"
        height="250px"
      />
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import VePie from 'v-charts/lib/pie.common.js'
import 'echarts/lib/component/title'
import VeLine from 'v-charts/lib/line.common'
import 'v-charts/lib/style.css'

Vue.component(VeLine.name, VeLine)
Vue.component(VePie.name, VePie)
export default {
  name: 'UserPortrait',
  data() {
    this.state = {
      dateBtn: [
        '昨天',
        '前天',
        '最近7天',
        '最近15天',
        '最近30天',
        '最近90天',
        '全部'
      ]
    }
    const data = [
      {
        name: '装备制造',
        value: 54
      },
      {
        name: '现代材料',
        value: 44
      },
      {
        name: '新能源',
        value: 35
      },
      {
        name: '新一代信息技术',
        value: 30
      },
      {
        name: '商贸物流',
        value: 20
      }
    ]
    const colors = [
      [
        '#7eacea',
        '#e15777',
        '#95ea71',
        '#ea9b4f',
        '#7577df',
        '#be72d8',
        '#fff'
      ],
      [
        '#7eacea',
        '#e15777',
        '#95ea71',
        '#ea9b4f',
        '#7577df',
        '#be72d8',
        '#fff'
      ],
      [
        '#7eacea',
        '#e15777',
        '#95ea71',
        '#ea9b4f',
        '#7577df',
        '#be72d8',
        '#fff'
      ],
      [
        '#7eacea',
        '#e15777',
        '#95ea71',
        '#ea9b4f',
        '#7577df',
        '#be72d8',
        '#fff'
      ],
      ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff']
    ]
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
      radio1: '',
      formModel: {},
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
      },
      title: data.map((item, index) => ({
        show: true,
        text: item.name,
        top: '5%',
        left: index * 20 + 10 + '%',
        textAlign: 'center',
        textStyle: {
          fontSize: '15',
          color: '#409eff'
        }
      })),
      series: data.map(function(item, index) {
        return {
          name: '图表' + index,
          type: 'pie',
          tooltip: {
            formatter: '{a0}: {b0}<br />{c0}: {d0}'
          },
          itemStyle: {
            labelLine: {
              show: false
            }
          },
          center: [index * 20 + 10 + '%', '57.5%'],
          radius: [0, '75%'],
          data: data.map((item2, index2) => {
            return {
              name: index2,
              value: item2.value,
              label: {
                show: true,
                position: 'inside',
                formatter(params) {
                  return `男\n${params.value}%`
                },
                textStyle: {
                  fontSize: '12',
                  color: '#fff'
                }
              },
              itemStyle: {
                color: colors[index][index2]
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-title {
  border-left: 3px solid #409eff;
  margin: 10px 0;
  text-indent: 0.5em;
}

.pie-container {
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  margin-bottom: 30px;
  margin-top: 10px;
  min-height: 230px;
  min-width: 863px;
}

.select-area {
  margin-bottom: 30px;

  b {
    padding-right: 12px;
  }
}

::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>
