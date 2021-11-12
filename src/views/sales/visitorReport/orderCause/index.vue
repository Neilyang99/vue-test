<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="block">
      <el-row>
        <el-col :span="24">
          <h3 style="border-bottom: 1px solid black;" justify="center" align="middle">{{reportTitle}}</h3>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="原因">
        <template slot-scope="scope">
          {{scope.row.itemName}}
        </template>
      </el-table-column>
      <el-table-column label="本週組數" align="right">
        <template slot-scope="scope">
          {{scope.row.count1}}
        </template>
      </el-table-column>
      <el-table-column label="上週累計" align="right">
        <template slot-scope="scope">
          {{scope.row.count2}}
        </template>
      </el-table-column>
      <el-table-column label="總計" align="right">
        <template slot-scope="scope">
          {{scope.row.count3}}
        </template>
      </el-table-column>
      <el-table-column label="總計%" align="right">
        <template slot-scope="scope">
          {{scope.row.count4}}%
        </template>
      </el-table-column>

    </el-table>

    
  </div>
</template>

<script src="./orderCause.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

