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
    <table class='TS'>
      <tr>
        <td class='csTc'>底價總銷</td>
        <td class='csDc'>{{form.totalAmt_under/100000000}}億</td>
        <td class='csTc'>表價總銷</td>
        <td class='csDc'>{{form.totalAmt_form/100000000}}億</td>
        <td class='csTc'>售出戶數</td>
        <td class='csDc'>{{form.soldQty}}</td>
        <td class='csTc'>剩餘戶數</td>
        <td class='csDc'>{{form.remainQty}}</td>
      </tr>
    </table> 
    <br> 
    <table style="border-collapse: collapse;padding:2px; width:100%">
      <tr>
        <td class='csTc' colspan="2">項目</td>
        <td class='csTc'>售出</td>
        <td class='csTc'>退戶</td>
        <td class='csTc'>換戶</td>
        <td class='csTc'>實際成交</td>
        <td class='csTc'>簽約</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="2">本週</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc'>金額(萬)</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'></td>
      </tr>
      <tr>
        <td class='csTc' rowspan="2">累計</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.accSoldQty}}</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'>{{form.accDealQty}}</td>
        <td class='csDc'>{{form.accOrderQty}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額(萬)</td>
        <td class='csDc'>{{form.accSoldAmt/10000}}</td>
        <td class='csDc'></td>
        <td class='csDc'></td>
        <td class='csDc'>{{form.accDealAmt/10000}}</td>
        <td class='csDc'>{{form.accOrderAmt/10000}}</td>
      </tr>
    </table>
    
  </div>
</template>

<script src="./saleStatus.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

