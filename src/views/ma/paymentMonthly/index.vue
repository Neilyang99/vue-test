<template>
  <div class="app-container">
    <!-- 
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
      <br>
    </div>
    -->
    <div class="block">
      <el-row>
        <el-col :span="10">
          工程案名稱: {{projectName}}
        </el-col>
        <el-col :span="8">
          廠 商 當 期 對 帳 表
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">放款日期 :
          <el-select v-model="listQuery.dateId" size="mini" placeholder="">
            <el-option
              v-for="item in payDateList"
              :key="item.payDate"
              :label="item.payDate"
              :value="item.payDate">
            </el-option>
          </el-select>
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange"
      :span-method="spanLogicMethod"
      :row-class-name="tableRowClassName"
       >

      <el-table-column label="廠商">
        <template slot-scope="scope">
          {{scope.row.vendorName}}
        </template>
      </el-table-column>
      <el-table-column label="放款日期">
        <template slot-scope="scope">
          {{scope.row.value1}}
        </template>
      </el-table-column>
      <el-table-column label="代墊扣款">
        <template slot-scope="scope">
          {{scope.row.value2}}
        </template>
      </el-table-column>
      <el-table-column label="本期請款">
        <template slot-scope="scope">
          {{scope.row.value3}}
        </template>
      </el-table-column>
      <el-table-column label="本期保留">
        <template slot-scope="scope">
          {{scope.row.value4}}
        </template>
      </el-table-column>
      <el-table-column label="發票條件">
        <template slot-scope="scope">
          {{scope.row.value5}}
        </template>
      </el-table-column>
      
      
    </el-table>

    
  </div>
</template>

<script src="./paymentMonthly.js"></script>

<style>   
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>



