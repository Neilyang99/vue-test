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
    
    <br>
    <div >
    <table class='TS' style="width:820px;">
      <tr>
        <td class='csTc' colspan="4" rowspan="2" style="width:100px;"></td>
        <td class='csTc' colspan="2" rowspan="2">銷售期間</td>
        <td class='csDc' colspan="4" rowspan="2"></td>
        <td class='csTc' colspan="2">總銷戶數</td>
        <td class='csDc' colspan="2"></td>
      </tr>
      <tr>
        <td class='csTc' colspan="2">總銷金額</td>
        <td class='csDc' colspan="2"></td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">日期</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csTc' rowspan="4" style="width:50px;">本週累計</td>
        <td class='csTc' rowspan="4" style="width:50px;">上週累計</td>
        <td class='csTc' colspan="2">實際銷售</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">星期</td>
        <td class='csDc' style="width:50px;">一</td>
        <td class='csDc' style="width:50px;">二</td>
        <td class='csDc' style="width:50px;">三</td>
        <td class='csDc' style="width:50px;">四</td>
        <td class='csDc' style="width:50px;">五</td>
        <td class='csDc' style="width:50px;">六</td>
        <td class='csDc' style="width:50px;">日</td>
        <td class='csTc' style="width:80px;">戶數</td>
        <td class='csDc' style="width:80px;"></td>
      </tr>
      <tr>
        <td class='csTc' colspan="3" rowspan="2">廣告媒體</td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csDc' rowspan="2"></td>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' colspan="2">總累計</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">來人</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'>組</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">來電</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'>通</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">回籠</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'>組</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="20" style="width:50px;">銷售紀錄</td>
        <td class='csTc' rowspan="4">成交</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">小訂</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">補足</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">簽約</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">退戶</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">本週回籠</td>
        <td class='csDc'></td>
        <td class='csTc'>回籠成交</td>
        <td class='csDc'></td>
        <td class='csTc'>累計回籠</td>
        <td class='csDc'></td>
        <td class='csTc'>累計成交</td>
        <td class='csDc'></td>
        <td class='csTc'>累計退戶</td>
        <td class='csDc'></td>
        <td class='csTc'>實際成交</td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>原因順銷</td>
        <td class='csDc' colspan="7"></td>
        <td class='csTc'>原因滯銷</td>
        <td class='csDc' colspan="5"></td>
      </tr>
      <tr>
        <td class='csTc'>對策建議</td>
        <td class='csDc' colspan="7"></td>
        <td class='csTc'>媒體本週</td>
        <td class='csDc' colspan="5"></td>
      </tr>

    </table> 
    </div>
    
  </div>
</template>

<script src="./weeklyReport.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

