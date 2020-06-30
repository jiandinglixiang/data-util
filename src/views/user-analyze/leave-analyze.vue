<template>
  <el-container class="page-container">
    <el-header height="auto" style="position: relative">
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
        <el-form-item label="动作">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="事件">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="然后">
          <el-select v-model="formInline.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <br />
        <el-form-item label="起止日期">
          <el-date-picker
            v-model="formInline.value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
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
      <el-table
        class="custom-table"
        :data="tableData"
        border
        :cell-style="cellStyle"
      >
        <el-table-column prop="name" label="每日留存率">
          <div slot-scope="{ row, $index }" class="row-cell-first">
            <b :style="$index <= 2 ? 'color: #409eff;' : ''">
              {{ row.name }}{{ $index }}
            </b>
            <p class="user-sum-txt">{{ row.sum }}</p>
          </div>
        </el-table-column>
        <el-table-column prop="0" label="0" align="center" />
        <el-table-column prop="1" label="1" align="center" />
        <el-table-column prop="2" label="2" align="center" />
        <el-table-column prop="3" label="3" align="center" />
        <el-table-column prop="4" label="4" align="center" />
        <el-table-column prop="5" label="5" align="center" />
        <el-table-column prop="6" label="6" align="center" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LeaveAnalyze',
  data() {
    const tableData = new Array(8).fill([]).map((value, index) => {
      if (!index) {
        return {
          name: '权重平均值',
          sum: '1.8万位用户',
          ...new Array(7 - index).fill(100)
        }
      }
      return {
        name: index + '名\n字',
        sum: index + '.8万位用户',
        ...new Array(8 - index).fill(((10 - index) * 10).toFixed(2))
      }
    })
    return {
      formInline: {},
      options: [],
      tableData
    }
  },
  methods: {
    cellStyle({ row, rowIndex, columnIndex }) {
      if (!rowIndex || !columnIndex) {
        return {}
      }
      if (row?.[columnIndex - 1]) {
        return {
          color: '#fff',
          backgroundColor: `rgba(138, 43, 226, ${row[columnIndex - 1] / 100})`
        }
      }
      return {}
    }
  }
}
</script>

<style scoped>
.custom-table {
  width: 100%;
  max-height: calc(100vh - 163px);
}
.row-cell-first {
  /*line-height: 1.2;*/
}
.fixed-icon-tips {
  position: absolute;
  right: 20px;
  top: 20px;
  color: #409eff;
}
</style>
