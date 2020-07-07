<template>
  <el-container class="page-container">
    <el-main>
      <h3 class="block-title">
        <span>本月增长</span>
        <el-popover
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget."
          title="说明"
          trigger="hover"
          width="200"
        >
          <span slot="reference" class="fixed-icon-tips">
            说明
            <i class="el-icon-question"></i>
          </span>
        </el-popover>
      </h3>

      <ul class="list-container">
        <li class="list-item">
          <p>DAU均值</p>
          <b>{{ viewData.month.daily_active_device }}</b>
          <p :class="formatPer(viewData.month.daily_active_device_MoM)">
            {{ viewData.month.daily_active_device_MoM | per('环比') }}
          </p>
          <p>
            较上月所需增速
            {{ viewData.month.daily_active_device_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>新增付费转化</p>
          <b>{{ viewData.month.new_paying_device_rate | per }}</b>
          <p :class="formatPer(viewData.month.new_paying_device_rate_MoM)">
            {{ viewData.month.new_paying_device_rate_MoM | per('环比') }}
          </p>
          <p>
            较上月所需增速
            {{ viewData.month.new_paying_device_rate_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>阅读时长均值（min）</p>
          <b>{{ viewData.month.daily_reading_time_per_device }}</b>
          <p :class="formatPer(viewData.month.daily_reading_time_per_device)">
            {{ viewData.month.daily_reading_time_per_device | per('环比') }}
          </p>
          <p>
            较上月所需增速
            {{ viewData.month.daily_reading_time_per_device_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>新增设备均值</p>
          <b>{{ viewData.month.daily_new_device }}</b>
          <p :class="formatPer(viewData.month.daily_new_device_MoM)">
            {{ viewData.month.daily_new_device_MoM | per('环比') }}
          </p>
        </li>
        <li class="list-item">
          <p>活跃arpu</p>
          <b>{{ viewData.month.average_revenue_per_device | money }}</b>
          <p :class="formatPer(viewData.month.average_revenue_per_device_MoM)">
            {{ viewData.month.average_revenue_per_device_MoM | per('环比') }}
          </p>
        </li>
        <li class="list-item">
          <p>活跃arppu</p>
          <b>{{ viewData.month.average_revenue_per_paying_device | money }}</b>
          <p
            :class="
              formatPer(viewData.month.average_revenue_per_paying_device_MoM)
            "
          >
            {{
              viewData.month.average_revenue_per_paying_device_MoM | per('环比')
            }}
          </p>
        </li>
      </ul>
      <h3 class="block-title">昨日新增</h3>
      <ul class="list-container">
        <li class="list-item">
          <p>新增设备</p>
          <b>{{ viewData.yesterday_new.device }}</b>
        </li>
        <li class="list-item">
          <p>当日注册率</p>
          <b>{{ viewData.yesterday_new.registered_device_rate | per }}</b>
          <p>{{ viewData.yesterday_new.registered_device }}</p>
        </li>
        <li class="list-item">
          <p>付费转化率</p>
          <b>{{ viewData.yesterday_new.paying_device_rate | per }}</b>
          <p>{{ viewData.yesterday_new.paying_device }}</p>
        </li>
        <li class="list-item">
          <p>订单完成率</p>
          <b>{{ viewData.yesterday_new.device_complete_order_rate | per }}</b>
          <p>{{ viewData.yesterday_new.device_complete_order }}</p>
        </li>
        <li class="list-item">
          <p>新增arpu</p>
          <b>{{ viewData.yesterday_new.average_revenue_per_device | money }}</b>
        </li>
        <li class="list-item">
          <p>新增arppu</p>
          <b>
            {{
              viewData.yesterday_new.average_revenue_per_paying_device | money
            }}
          </b>
        </li>
      </ul>
      <h3 class="block-title">昨日活跃</h3>
      <ul class="list-container">
        <li class="list-item">
          <p>活跃设备</p>
          <b>{{ viewData.yesterday_active.device }}</b>
        </li>
        <li class="list-item">
          <p>注册活跃数</p>
          <b>{{ viewData.yesterday_active.registered_device }}</b>
        </li>
        <li class="list-item">
          <p>付费转化率</p>
          <b>{{ viewData.yesterday_active.paying_device_rate | per }}</b>
        </li>
        <li class="list-item">
          <p>订单完成率</p>
          <b>
            {{ viewData.yesterday_active.device_complete_order_rate | per }}
          </b>
        </li>
        <li class="list-item">
          <p>活跃arpu</p>
          <b>
            {{ viewData.yesterday_active.average_revenue_per_device | money }}
          </b>
        </li>
        <li class="list-item">
          <p>活跃arppu</p>
          <b>
            {{
              viewData.yesterday_active.average_revenue_per_paying_device
                | money
            }}
          </b>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
import { getDashboard } from '@/api/dashboard'
import { numeral } from '@/utils/number'

export default {
  name: 'Dashboard',
  filters: {
    per(value, txt) {
      if (!value) return ''
      const str = numeral(value).format('(0.00%)')
      if (!txt) {
        return str
      }
      if (value > 0) {
        return `环比增幅${str}⬆`
      } else if (value < 0) {
        return `环比降幅${str}⬇`
      }
      return ''
    },
    money(value) {
      if (!value) return '-'
      return numeral(value).format('$0.00')
    }
  },
  data() {
    return {
      viewData: {
        month: {},
        yesterday_new: {},
        yesterday_active: {}
      }
    }
  },
  watch: {
    ['$store.state.project.currentDataPath'](val) {
      this.getDashboard(val)
    }
  },
  created() {
    this.getDashboard(this.$store.state.project.currentDataPath)
  },
  methods: {
    formatPer(value) {
      if (value > 0) {
        return 'go-up'
      }
      if (value < 0) {
        return 'go-down'
      }
      return ''
    },
    async getDashboard(params) {
      try {
        const data = await getDashboard(params)
        if (!data) {
          throw '获取到空数据'
        }
        this.viewData = {
          month: data.month ?? {},
          yesterday_active: data.yesterday_active ?? {},
          yesterday_new: data.yesterday_new ?? {}
        }
      } catch (e) {
        this.$message.error('数据加载失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block-title {
  border-left: 3px solid #409eff;
  margin: 10px 0;
  position: relative;
  text-indent: 0.5em;
}

.fixed-icon-tips {
  bottom: 0;
  color: #409eff;
  position: absolute;
  right: 0;
  top: 0;
}

.list-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.list-item {
  align-items: center;
  background-color: #fff;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  display: flex;
  flex: 0 0 15.6%;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: 1%;
  margin-right: 1%;
  min-height: 150px;
  min-width: 150px;
  overflow: hidden;
  padding: 10px;
  transition: 0.3s;
  text-align: center;
  /* user-select: none; */

  /* cursor: pointer; */
  b {
    font-size: 2em;
    margin: 10px 0;
  }
}

.list-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.go-up {
  color: red;
}

.go-down {
  color: green;
}
</style>
