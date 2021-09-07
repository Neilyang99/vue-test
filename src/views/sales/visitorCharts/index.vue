<template>
  <div class="app-container" id = "dashboard">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input size="mini" placeholder="請輸入銷售案名稱"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="24">
        <v-chart :options="pieData" class="chart section" ref="pieChart"/>
      </el-col>
    </el-row>
  
  </div>
</template>

<script src="./visitorCharts.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

