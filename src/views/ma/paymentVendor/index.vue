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
          廠 商 各 期 請 款 表
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">廠 商 :
          <el-select v-model="listQuery.vendorId" size="mini" placeholder="廠商名稱">
            <el-option
              v-for="item in vendorList"
              :key="item.maa93003"
              :label="item.maa93004"
              :value="item.id">
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

      <el-table-column label="期別">
        <template slot-scope="scope">
          {{scope.row.itemName}}
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

<script src="./paymentVendor.js"></script>

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



