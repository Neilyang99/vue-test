<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="動機">
        <template slot-scope="scope">
          {{scope.row.itemName}}
        </template>
      </el-table-column>

      <el-table-column label="來人" align="center">
        <el-table-column label="本週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countWeeklyByVisitor}}
          </template>
        </el-table-column>
        <el-table-column label="本週%" align="right">
          <template slot-scope="scope" >
            {{scope.row.countPercentByVisitor}}
          </template>
        </el-table-column>
        <el-table-column label="累週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccByVisitor}}
          </template>
        </el-table-column>
        <el-table-column label="累週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccPercentByVisitor}}
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="來電" align="center">
        <el-table-column label="本週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countWeeklyByTel}}
          </template>
        </el-table-column>
        <el-table-column label="本週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countPercentByTel}}
          </template>
        </el-table-column>
        <el-table-column label="累週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccByTel}}
          </template>
        </el-table-column>
        <el-table-column label="累週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccPercentByTel}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="回籠" align="center">
        <el-table-column label="本週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countWeeklyByAgain}}
          </template>
        </el-table-column>
        <el-table-column label="本週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countPercentByAgain}}
          </template>
        </el-table-column>
        <el-table-column label="累週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccByAgain}}
          </template>
        </el-table-column>
        <el-table-column label="累週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccPercentByAgain}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="已購" align="center">
        <el-table-column label="本週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countWeeklyByOrder}}
          </template>
        </el-table-column>
        <el-table-column label="本週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countPercentByOrder}}
          </template>
        </el-table-column>
        <el-table-column label="累週組數" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccByOrder}}
          </template>
        </el-table-column>
        <el-table-column label="累週%" align="right">
          <template slot-scope="scope">
            {{scope.row.countAccPercentByOrder}}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script src="./age.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

