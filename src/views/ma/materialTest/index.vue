<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selMaa00004" size="mini" placeholder="請輸入工程案名稱"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" size="mini"  @click.native="maa03">混凝土抽磅管制表</el-button>
          <el-button type="primary" size="mini"  @click.native="maa04">混凝土試體取樣管制表</el-button>
          <el-button type="info" size="mini"  @click.native="maa05_1">混凝土鑽心強度品質紀錄</el-button>
          <el-button type="info" size="mini"  @click.native="maa05_2">混凝土抗壓強度品質紀錄</el-button>
          <el-button type="success" size="mini"  @click.native="maa06">混凝土氯離子品質紀錄</el-button>
          <el-button type="warning" size="mini" @click.native="maa07_1">地下室_結構體鋼筋試驗</el-button>
          <el-button type="warning" size="mini" @click.native="maa07_2">地上_結構體鋼筋試驗</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column label="工程案編號">
        <template slot-scope="scope">
          {{scope.row.maa00002}}
        </template>
      </el-table-column>
      <el-table-column label="工程案名稱">
        <template slot-scope="scope">
          {{scope.row.maa00004}}
        </template>
      </el-table-column>
      <el-table-column label="預計開工日">
        <template slot-scope="scope">
          {{scope.row.maa00007}}
        </template>
      </el-table-column>
      <el-table-column label="實際開工日">
        <template slot-scope="scope">
          {{scope.row.maa00008}}
        </template>
      </el-table-column>
      <el-table-column label="預計完工日">
        <template slot-scope="scope">
          {{scope.row.maa00009}}
        </template>
      </el-table-column>
      <el-table-column label="實際完工日">
        <template slot-scope="scope">
          {{scope.row.maa00010}}
        </template>
      </el-table-column>
      <el-table-column label="工期(日)">
        <template slot-scope="scope">
          {{scope.row.maa00011}}
        </template>
      </el-table-column>
    </el-table>


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

<script src="./materialTest.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

