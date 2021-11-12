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

      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.occurDate}}
        </template>
      </el-table-column>
      <el-table-column label="客戶姓名" >
        <template slot-scope="scope">
          {{scope.row.customerName}}
        </template>
      </el-table-column>
      <el-table-column label="帶看戶別">
        <template slot-scope="scope">
          {{scope.row.houseNo}}
        </template>
      </el-table-column>
      <el-table-column label="未成交原因" >
        <template slot-scope="scope">
          {{scope.row.causeName}}
        </template>
      </el-table-column>
      <el-table-column label="銷售人員">
        <template slot-scope="scope">
          {{scope.row.salesName}}
        </template>
      </el-table-column>

    </el-table>

    
  </div>
</template>

<script src="./notDealAgain.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

