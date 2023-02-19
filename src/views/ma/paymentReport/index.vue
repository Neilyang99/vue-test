<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
      <br>
    </div>
    <div class="block">
      <el-row>
        <el-col :span="24">
          工程案名稱: {{projectName}}
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="廠商代號">
        <template slot-scope="scope">
          {{scope.row.vendorCode}}
        </template>
      </el-table-column>
      <el-table-column label="廠商名稱">
        <template slot-scope="scope">
          {{scope.row.vendorName}}
        </template>
      </el-table-column>
      
      <template v-for="(item, index) in list">
        <el-table-column :label="item.payDate">
          <template slot-scope="scope">{{ item.detail[$index].payment }}</template>
        </el-table-column>
      </template>
      

      
    </el-table>

    
  </div>
</template>

<script src="./paymentReport.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

