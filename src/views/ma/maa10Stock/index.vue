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
        <el-col :span="10">
          工程案名稱: {{projectName}}
        </el-col>
        <el-col :span="14">
          <label>材料入庫總表</label>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="料號">
        <template slot-scope="scope">
          {{scope.row.materialName}}
        </template>
      </el-table-column>
      <el-table-column label="累計金額">
        <template slot-scope="scope">
          {{scope.row.amount}}
        </template>
      </el-table-column>
      <el-table-column label="累計數量">
        <template slot-scope="scope">
          {{scope.row.qty}}
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script src="./maa10Stock.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

