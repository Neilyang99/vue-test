<template>
  <div class="dashboard-container" id="dashboard">
    <div class="dashboard-text">歡迎光臨:{{name}}</div>
  
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg-icon  icon-class="documentation" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.document') }}</div>
            <div class="card-panel-num">
              Document
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg-icon  icon-class="user" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.newUser') }}</div>
            <div class="card-panel-num"></div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg-icon  icon-class="message" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.message') }}</div>
            <div class="card-panel-num"></div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg-icon  icon-class="money" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.income') }}</div>
            <div class="card-panel-num"></div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>


    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="銷售案" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.sla10003 }}
        </template>
      </el-table-column>
      <el-table-column label="客戶" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.sla10006}}
        </template>
      </el-table-column>
      <el-table-column label="客戶電話" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.sla10010}}
        </template>
      </el-table-column>
      <el-table-column label="最近洽詢日期" min-width="10">
        <template slot-scope="scope">
          {{ scope.row.sla11004}}
        </template>
      </el-table-column>
      <el-table-column label="洽詢事項紀錄" min-width="20">
        <template slot-scope="scope">
          {{ scope.row.sla11006}}
        </template>
      </el-table-column>
      <el-table-column label="上次更新資料日期" min-width="20">
        <template slot-scope="scope">
          {{ scope.row.modify_time}}
        </template>
      </el-table-column>
      <el-table-column label="已超過天數未處理" min-width="15">
        <template slot-scope="scope">
          {{ scope.row.dt}}
        </template>
      </el-table-column>
  </el-table>  
  

  </div>
</template>


<script src="./dashboard.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.dashboard {

  &-container {
    padding: 15px;
    background-color: #f0f2f5;
  }
  &-text {
    font-size: 14px;
    line-height: 22px;
    padding-bottom:15px;
  }
}
.echarts{
  width: 100%;
  height: 100%;
}
.box-card{
  height:108px;
}
  .chart{
    height: 350px;
  }
  .section{
    padding:20px;
    background-color: white;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .box-card > div >div > .svg-icon {
    width: 4em;
    height: 4em;
    color:#34bfa3;
  }
  .card-panel-text{
    padding-top:10px;
    font-size:16px;
    color:gray;
  }
  .card-panel-num{
    padding-top:10px;
    font-size:20px;
    font-weight: bold;
  }
</style>
