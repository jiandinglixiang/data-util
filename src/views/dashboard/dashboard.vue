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
          <b>{{ wd.month.daily_active_device }}</b>
          <p :class="formatClass(wd.month.daily_active_device_MoM)">
            环比增幅 {{ wd.month.daily_active_device_MoM }}%
          </p>
          <p>
            较上月所需增速 {{ wd.month.daily_active_device_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>新增付费转化</p>
          <b>{{ wd.month.new_paying_device_rate }}%</b>
          <p :class="formatClass(wd.month.new_paying_device_rate_MoM)">
            环比增幅{{ wd.month.new_paying_device_rate_MoM }}%
          </p>
          <p>
            较上月所需增速 {{ wd.month.new_paying_device_rate_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>阅读时长均值（min）</p>
          <b>{{ wd.month.daily_reading_time_per_device }}</b>
          <p :class="formatClass(wd.month.daily_reading_time_per_device)">
            环比增幅 {{ wd.month.daily_reading_time_per_device }}%
          </p>
          <p>
            较上月所需增速
            {{ wd.month.daily_reading_time_per_device_MoM_deficit }} /日
          </p>
        </li>
        <li class="list-item">
          <p>新增设备均值</p>
          <b>{{ wd.month.daily_new_device }}</b>
          <p :class="formatClass(wd.month.daily_new_device_MoM)">
            环比增幅 {{ wd.month.daily_new_device_MoM }}%
          </p>
        </li>
        <li class="list-item">
          <p>活跃arpu</p>
          <b>{{ wd.month.average_revenue_per_device }}</b>
          <p :class="formatClass(wd.month.average_revenue_per_device_MoM)">
            环比增幅 {{ wd.month.average_revenue_per_device_MoM }}%
          </p>
        </li>
        <li class="list-item">
          <p>活跃arppu</p>
          <b>{{ wd.month.average_revenue_per_paying_device }}</b>
          <p
            :class="formatClass(wd.month.average_revenue_per_paying_device_MoM)"
          >
            环比增幅 {{ wd.month.average_revenue_per_paying_device_MoM }}%
          </p>
        </li>
      </ul>
      <h3 class="block-title">昨日新增</h3>
      <ul class="list-container">
        <li class="list-item">
          <p>新增设备</p>
          <b>{{ wd.yesterday_new.device }}</b>
        </li>
        <li class="list-item">
          <p>当日注册率</p>
          <b>{{ wd.yesterday_new.registered_device_rate }}%</b>
          <p>{{ wd.yesterday_new.registered_device }}</p>
        </li>
        <li class="list-item">
          <p>付费转化率</p>
          <b>{{ wd.yesterday_new.paying_device_rate }}%</b>
          <p>{{ wd.yesterday_new.paying_device }}</p>
        </li>
        <li class="list-item">
          <p>订单完成率</p>
          <b>{{ wd.yesterday_new.device_complete_order_rate }}%</b>
          <p>{{ wd.yesterday_new.device_complete_order }}</p>
        </li>
        <li class="list-item">
          <p>新增arpu</p>
          <b>${{ wd.yesterday_new.average_revenue_per_device }}</b>
        </li>
        <li class="list-item">
          <p>新增arppu</p>
          <b>${{ wd.yesterday_new.average_revenue_per_paying_device }}</b>
        </li>
      </ul>
      <h3 class="block-title">昨日活跃</h3>
      <ul class="list-container">
        <li class="list-item">
          <p>活跃设备</p>
          <b>{{ wd.yesterday_active.device }}</b>
        </li>
        <li class="list-item">
          <p>注册活跃数</p>
          <b>{{ wd.yesterday_active.registered_device }}</b>
        </li>
        <li class="list-item">
          <p>付费转化率</p>
          <b>{{ wd.yesterday_active.paying_device_rate }}%</b>
        </li>
        <li class="list-item">
          <p>订单完成率</p>
          <b>{{ wd.yesterday_active.device_complete_order_rate }}%</b>
        </li>
        <li class="list-item">
          <p>活跃arpu</p>
          <b>${{ wd.yesterday_active.average_revenue_per_device }}</b>
        </li>
        <li class="list-item">
          <p>活跃arppu</p>
          <b>${{ wd.yesterday_active.average_revenue_per_paying_device }}</b>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      wd: {
        month: {
          daily_active_device: 59854, // DAD 设备
          daily_active_device_MoM: 0.2002, // 环比增幅
          daily_active_device_MoM_deficit: 0, // 环比缺口
          new_paying_device_rate: 0.05, // 新增付费转化
          new_paying_device_rate_MoM: -0.1, // 环比增幅
          new_paying_device_rate_MoM_deficit: 0, // 环比缺口
          daily_reading_time_per_device: 20.22, // 阅读时长均值
          daily_reading_time_per_device_MoM_deficit: 5556, // 环比缺口
          daily_new_device: 59854, // 新增设备均值
          daily_new_device_MoM: 0, // 环比增幅
          average_revenue_per_device: 1.2, // ARPU
          average_revenue_per_device_MoM: 0.2028, // 环比增幅
          average_revenue_per_paying_device: 1.2, // ARPPU
          average_revenue_per_paying_device_MoM: 0.2099 // 环比增幅
        },
        yesterday_new: {
          device: 59854, // 新增设备
          registered_device: 6658, // 注册设备
          registered_device_rate: 0.6, // 注册率
          paying_device: 6658, // 付费转化用户
          paying_device_rate: 0.05, // 付费转化率
          device_complete_order: 6658, // 新增设备的订单
          device_complete_order_rate: 0.3, // 新增设备的订单完成率
          average_revenue_per_device: 1.2, // ARPU
          average_revenue_per_paying_device: 6.2 // ARPPU
        },
        yesterday_active: {
          device: 59854, // 活跃用户
          registered_device: 40000, // 注册用户
          paying_device: 6658, // 付费转化
          paying_device_rate: 0.05, // 付费转化率
          device_complete_order: 6658, // 订单完成
          device_complete_order_rate: 0.3, // 订单完成率
          average_revenue_per_device: 1.2, // ARPU
          average_revenue_per_paying_device: 6.2 // ARPPU
        }
      }
    }
  },
  methods: {
    formatClass(value) {
      if (value > 0) {
        return 'go-up'
      }
      if (value < 0) {
        return 'go-down'
      }
      return ''
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

  &::after {
    content: '↑';
    vertical-align: top;
  }
}

.go-down {
  color: green;

  &::after {
    content: '↓';
    vertical-align: top;
  }
}
</style>
