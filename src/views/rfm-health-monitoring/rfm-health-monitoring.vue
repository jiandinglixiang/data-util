<template>
  <el-container class="page-container">
    <el-main>
      <h3 class="block-title">分布比例</h3>
      <div class="top-container">
        <ul>
          <li
            v-for="(val, key) in viewData.distribution"
            :key="key"
            class="left-proportion-item"
          >
            <h5>{{ state.distributionMap[key] }}</h5>
            <b>{{ val.percent | per }}</b>
            <p>{{ val.user_count }}</p>
          </li>
        </ul>
        <div class="right-grade">
          <div>
            <h5>各维度评分均值</h5>
            <div class="simple-table">
              <p>距离最近充值相隔天</p>
              <p>过去12个月充值次数</p>
              <p>过去12个月充值金额</p>
              <p>{{ viewData.scores.r || '-' }}</p>
              <p>{{ viewData.scores.f || '-' }}</p>
              <p>{{ viewData.scores.m || '-' }}</p>
            </div>
          </div>
          <div>
            <h5>各维度达到1的最低值</h5>
            <div class="simple-table">
              <p>距离最近充值相隔天数</p>
              <p>过去12个月充值次数</p>
              <p>过去12个月充值金额</p>
              <p>{{ viewData.scores.r_gte_1 || '-' }}</p>
              <p>{{ viewData.scores.f_gte_1 || '-' }}</p>
              <p>{{ viewData.scores.m_gte_1 || '-' }}</p>
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
        <li v-for="n in groups" :key="n.name">
          <div class="line-table-item-header">
            <b>{{ n.name }}</b>
            <p>
              <span>转入 {{ n.transfer_in }}</span>
              <el-divider direction="vertical" />
              <span>转出 {{ n.transfer_out }}</span>
              <el-divider direction="vertical" />
              <el-link type="primary">每日明细</el-link>
            </p>
          </div>
          <ve-line
            :data="n.chart"
            :grid="lineLayout.grid"
            :settings="lineLayout.settings"
            :legend-visible="false"
            :data-empty="!n.chart.rows.length"
            height="250px"
          />
          <el-table
            :data="n.tableData"
            :cell-style="initCellStyle"
            border
            style="width: 100%;"
          >
            <el-table-column
              label="周期"
              prop="scope"
              align="center"
              width="100"
            />
            <el-table-column
              label="活跃"
              prop="active_user.value"
              align="center"
              width="100"
            />
            <el-table-column
              label="付费率"
              prop="paid_user_rate.value"
              align="center"
              width="100"
            />
            <el-table-column
              label="人均单量"
              prop="paid_order_per_paid_user.value"
              align="center"
              width="100"
            />
            <el-table-column
              label="arpu"
              prop="average_revenue_per_user.value"
              align="center"
              width="100"
            />
            <el-table-column
              label="arppu"
              prop="average_revenue_per_paying_user.value"
              align="center"
              width="100"
            />
            <el-table-column
              label="平均阅读时长"
              prop="daily_reading_time.value"
              align="center"
              min-width="100"
            />
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
import { getRFMData } from '@/api/rfm'
import { numeral } from '@/utils/number'
import { moment } from '@/utils/moment'

Vue.component(VeLine.name, VeLine)

export default {
  name: 'RfmHealthMonitoring',
  filters: {
    per(value) {
      if (!value || !(value / 100)) return ''
      return numeral(value / 100).format('(0.00%)')
    }
  },
  data() {
    this.state = {
      distributionMap: {
        MVU: '重要价值',
        MDU: '重要发展',
        MKU: '重要保持',
        MRU: '重要挽留',
        GVU: '一般价值',
        GDU: '一般发展',
        GKU: '一般保持',
        GRU: '一般挽留'
      },
      rowName: {
        yesterday: '昨日',
        last_7_days: '近7日均值',
        this_month: '本月截至昨日',
        last_month: '上月均值'
      }
    }
    return {
      lineLayout: {
        settings: {
          yAxisName: ['数值']
        },
        grid: {
          top: 40,
          bottom: 10
        }
      },
      viewData: {
        distribution: {},
        scores: {},
        groups: {}
      }
    }
  },
  computed: {
    groups() {
      const distributionMap = this.state.distributionMap
      const groups = Object.entries(this.viewData.groups)
      return groups.map(arr => {
        const [key, value] = arr
        const rows = (value?.chart ?? []).map(function(value) {
          return {
            ...value,
            date: moment(value.date).format('MM-DD')
          }
        })
        const columns = Object.keys(rows?.[0] || {}).reduce(
          function(t, key) {
            if (key !== 'date') {
              t.push(key)
            }
            return t
          },
          ['date']
        )
        const details = (value?.details ?? []).map(this.formatterDetails)
        return {
          ...value,
          name: distributionMap[key],
          chart: {
            columns,
            rows
          },
          tableData: details
        }
      })
    }
  },
  watch: {
    ['$store.state.project.currentDataPath'](val) {
      this.getRFMData(val)
    }
  },
  created() {
    this.getRFMData(this.$store.state.project.currentDataPath)
  },
  methods: {
    initCellStyle({ row, column, columnIndex }) {
      if (!columnIndex) {
        return {}
      }
      const key = column.property.split('.')?.[0]
      if (!key) {
        return {}
      }
      return row?.[key]?.style ?? {}
    },
    formatterCellStatus(or, str) {
      const obj = {
        value: str
      }
      if (!or) return obj
      if (or > 0) {
        return {
          value: str + '⬆',
          style: {
            color: 'red'
          }
        }
      } else if (or < 0) {
        return {
          value: str + '⬇',
          style: {
            color: 'green'
          }
        }
      }
      return obj
    },
    formatterDetails(item) {
      const {
        scope,
        active_user,
        paid_user_rate,
        paid_order_per_paid_user,
        average_revenue_per_user,
        average_revenue_per_paying_user,
        daily_reading_time
      } = item

      return {
        scope: this.state.rowName[scope],
        active_user: this.formatterCellStatus(
          active_user,
          parseInt(active_user ?? 0)
        ),
        paid_user_rate: this.formatterCellStatus(
          paid_user_rate,
          numeral(paid_user_rate ?? 0).format('(0.00%)')
        ),
        paid_order_per_paid_user: this.formatterCellStatus(
          paid_order_per_paid_user,
          numeral(paid_order_per_paid_user ?? 0).format('0.00')
        ),
        average_revenue_per_user: this.formatterCellStatus(
          average_revenue_per_user,
          numeral(average_revenue_per_user ?? 0).format('$0.00')
        ),
        average_revenue_per_paying_user: this.formatterCellStatus(
          average_revenue_per_paying_user,
          numeral(average_revenue_per_paying_user ?? 0).format('$0.00')
        ),
        daily_reading_time: this.formatterCellStatus(
          daily_reading_time,
          parseInt(daily_reading_time ?? 0)
        )
      }
    },
    async getRFMData(params) {
      try {
        const data = await getRFMData(params)
        if (!data) {
          throw '获取到空数据'
        }
        this.viewData = {
          distribution: data.distribution ?? {},
          scores: data.scores ?? {},
          groups: data.groups ?? {}
        }
      } catch (e) {
        this.$message.error('数据获取失败')
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
    border: 1px solid #ddd;
  }

  > li:nth-child(2n + 0) {
    margin-left: 0.5%;
    margin-right: 0;
  }
}

.line-table-item-header {
  padding: 10px 0;
  text-align: center;

  p {
    font-size: 14px;
  }
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
  background-color: #fff;
  border: 1px solid #e6ebf5;
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
  transition: 0.3s;
  border-radius: 4px;

  b {
    font-size: 1.5em;
    margin: 10px;
  }

  p {
    font-size: 13px;
  }
}

.left-proportion-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
}

.go-down {
  color: green;
}
</style>
