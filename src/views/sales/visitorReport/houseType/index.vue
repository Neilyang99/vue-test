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

      <el-table-column label="類別">
        <template slot-scope="scope">
          {{scope.row.houseType}}
        </template>
      </el-table-column>
      <el-table-column label="規劃" >
        <template slot-scope="scope">
          {{scope.row.planQty}}
        </template>
      </el-table-column>
      <el-table-column label="本週售出">
        <template slot-scope="scope">
          {{scope.row.weeklyQty}}
        </template>
      </el-table-column>
      <el-table-column label="售出累計" >
        <template slot-scope="scope">
          {{scope.row.accQty}}
        </template>
      </el-table-column>
      <el-table-column label="本週退戶">
        <template slot-scope="scope">
          {{scope.row.weeklyCancelQty}}
        </template>
      </el-table-column>
      <el-table-column label="退戶累計">
        <template slot-scope="scope">
          {{scope.row.weeklyCancelAccQty}}
        </template>
      </el-table-column>
      <el-table-column label="剩餘戶數">
        <template slot-scope="scope">
          {{scope.row.remainQty}}
        </template>
      </el-table-column>

    </el-table>

    
  </div>
</template>

<script src="./houseType.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

