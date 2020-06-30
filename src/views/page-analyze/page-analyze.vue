<template>
  <el-container class="page-container">
    <el-header>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="分群">
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
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-form>
      <el-popover
        title="说明"
        width="200"
        trigger="hover"
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget."
      >
        <span slot="reference" class="fixed-icon-tips">
          说明
          <i class="el-icon-question"></i>
        </span>
      </el-popover>
    </el-header>
    <el-main>
      <ve-sankey
        height="calc(100vh - 150px)"
        :data="chartData"
        :settings="chartSettings"
      />
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import VeSankey from 'v-charts/lib/sankey.common'
// import 'v-charts/lib/style.css'

Vue.component(VeSankey.name, VeSankey)
export default {
  name: 'PageAnalyze',
  data() {
    this.chartSettings = {
      links: [
        { source: '首页', target: '列表页a', value: 0.5 },
        { source: '首页', target: '列表页b', value: 0.5 },
        { source: '列表页a', target: '内容页a-1', value: 0.1 },
        { source: '列表页a', target: '内容页a-2', value: 0.4 },
        { source: '列表页b', target: '内容页b-1', value: 0.2 },
        { source: '列表页b', target: '内容页b-2', value: 0.3 }
      ]
    }
    return {
      formInline: {},
      options: [],
      formModel: {},
      chartData: {
        columns: ['页面', '访问量'],
        rows: [
          { 页面: '首页', 访问量: 100000 },
          { 页面: '列表页a', 访问量: 20000 },
          { 页面: '列表页b', 访问量: 80000 },
          { 页面: '内容页a-1', 访问量: 10000 },
          { 页面: '内容页a-2', 访问量: 10000 },
          { 页面: '内容页b-1', 访问量: 60000 },
          { 页面: '内容页b-2', 访问量: 20000 }
        ]
      }
    }
  }
}
</script>

<style scoped>
.fixed-icon-tips {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #409eff;
}
</style>
