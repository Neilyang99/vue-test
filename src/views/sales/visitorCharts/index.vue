<template>
  <div class="app-container" id = "visitorCharts">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input size="mini" placeholder="請輸入銷售案名稱"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="listQuery.chartType" size="mini" placeholder="圖表類別">
            <el-option
              v-for="item in chartList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <v-chart :options="chartData" class="chart section" ref="chart"/>
      </el-col>
    </el-row>

  
  </div>
</template>

<script src="./visitorCharts2.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

