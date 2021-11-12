<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selSla00003" size="mini" placeholder="請輸入銷售案名稱"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange" style="width:100%">
      <el-table-column label="銷售案代號" >
        <template slot-scope="scope">
          {{scope.row.sla00002}}
        </template>
      </el-table-column>
      <el-table-column label="銷售案名稱">
        <template slot-scope="scope">
          {{scope.row.sla00003}}
        </template>
      </el-table-column>
      <el-table-column label="開始銷售日" >
        <template slot-scope="scope">
          {{scope.row.sla00008}}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="400">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="areaAnalysis(scope.row.sla00002)">區域分析</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="mdeiaAnalysis(scope.row.sla00002)">媒體分析</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="motivationAnalysis(scope.row.sla00002)">購買動機分析</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="ageAnalysis(scope.row.sla00002)">年齡分析</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="careerAnalysis(scope.row.sla00002)">職業分析</el-button>
        <br>
        <el-button icon="el-icon-log" size="mini" @click.native="notDealAgain(scope.row.sla00002)">回籠未成交原因</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="orderAnalysis(scope.row.id)">已購原因分析</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="saleStatus(scope.row.id)">銷況表</el-button>
        <el-button icon="el-icon-log" size="mini" @click.native="houseTypeAnalysis(scope.row.id)">格局去化分析</el-button>
        <el-button icon="el-icon-log" size="mini"  @click.native="notOrderAnalysis(scope.row.id)">未購原因分析</el-button>
        <el-button icon="el-icon-log" size="mini"  @click.native="weeklyReport(scope.row.id)">週報表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
      </el-form>
    </el-dialog>


    <el-pagination 
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        :current-page.sync="listQuery.page"
        @size-change="changeSize"
        @current-change="fetchPage"
        @prev-click="fetchPrev"
        @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./visitorReport.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

