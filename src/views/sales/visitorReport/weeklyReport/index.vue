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
        <td class='csDc' colspan="4" rowspan="2">{{form.period}}</td>
        <td class='csTc' colspan="2">總銷戶數</td>
        <td class='csDc' colspan="2">{{form.totalHouse}}</td>
      </tr>
      <tr>
        <td class='csTc' colspan="2">總銷金額</td>
        <td class='csDc' colspan="2">{{form.totalAmt/100000000}}億</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">日期</td>
        <td class='csDc'>{{form.date1}}</td>
        <td class='csDc'>{{form.date2}}</td>
        <td class='csDc'>{{form.date3}}</td>
        <td class='csDc'>{{form.date4}}</td>
        <td class='csDc'>{{form.date5}}</td>
        <td class='csDc'>{{form.date6}}</td>
        <td class='csDc'>{{form.date7}}</td>
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
        <td class='csDc' style="width:80px;">{{form.actualHouse}}</td>
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
        <td class='csDc'>{{form.actualAmt/10000}}</td>
      </tr>
      <tr>
        <td class='csTc' colspan="2">總累計</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">來人</td>
        <td class='csDc'>{{form.personCnt1}}</td>
        <td class='csDc'>{{form.personCnt2}}</td>
        <td class='csDc'>{{form.personCnt3}}</td>
        <td class='csDc'>{{form.personCnt4}}</td>
        <td class='csDc'>{{form.personCnt5}}</td>
        <td class='csDc'>{{form.personCnt6}}</td>
        <td class='csDc'>{{form.personCnt7}}</td>
        <td class='csDc'>{{form.personCntWeek}}</td>
        <td class='csDc'>{{form.personCntWeekAcc}}</td>
        <td class='csDc'>{{form.personCntTotal}}</td>
        <td class='csDc'>組</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">來電</td>
        <td class='csDc'>{{form.telCnt1}}</td>
        <td class='csDc'>{{form.telCnt2}}</td>
        <td class='csDc'>{{form.telCnt3}}</td>
        <td class='csDc'>{{form.telCnt4}}</td>
        <td class='csDc'>{{form.telCnt5}}</td>
        <td class='csDc'>{{form.telCnt6}}</td>
        <td class='csDc'>{{form.telCnt7}}</td>
        <td class='csDc'>{{form.telCntWeek}}</td>
        <td class='csDc'>{{form.telCntWeekAcc}}</td>
        <td class='csDc'>{{form.telCntTotal}}</td>
        <td class='csDc'>通</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">回籠</td>
        <td class='csDc'>{{form.againCnt1}}</td>
        <td class='csDc'>{{form.againCnt2}}</td>
        <td class='csDc'>{{form.againCnt3}}</td>
        <td class='csDc'>{{form.againCnt4}}</td>
        <td class='csDc'>{{form.againCnt5}}</td>
        <td class='csDc'>{{form.againCnt6}}</td>
        <td class='csDc'>{{form.againCnt7}}</td>
        <td class='csDc'>{{form.againCntWeek}}</td>
        <td class='csDc'>{{form.againCntWeekAcc}}</td>
        <td class='csDc'>{{form.againCntTotal}}</td>
        <td class='csDc'>組</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="20" style="width:50px;">銷售紀錄</td>
        <td class='csTc' rowspan="4">成交</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.dealHouse1}}</td>
        <td class='csDc'>{{form.dealHouse2}}</td>
        <td class='csDc'>{{form.dealHouse3}}</td>
        <td class='csDc'>{{form.dealHouse4}}</td>
        <td class='csDc'>{{form.dealHouse5}}</td>
        <td class='csDc'>{{form.dealHouse6}}</td>
        <td class='csDc'>{{form.dealHouse7}}</td>
        <td class='csDc'>{{form.dealHouseWeek}}</td>
        <td class='csDc'>{{form.dealHouseWeekAcc}}</td>
        <td class='csDc'>{{form.dealHouseTotal}}</td>
        <td class='csDc'>{{form.dealHouseTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.dealAmt1}}</td>
        <td class='csDc'>{{form.dealAmt2}}</td>
        <td class='csDc'>{{form.dealAmt3}}</td>
        <td class='csDc'>{{form.dealAmt4}}</td>
        <td class='csDc'>{{form.dealAmt5}}</td>
        <td class='csDc'>{{form.dealAmt6}}</td>
        <td class='csDc'>{{form.dealAmt7}}</td>
        <td class='csDc'>{{form.dealAmtWeek}}</td>
        <td class='csDc'>{{form.dealAmtWeekAcc}}</td>
        <td class='csDc'>{{form.dealAmtTotal}}</td>
        <td class='csDc'>{{form.dealAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'>{{form.dealCar1}}</td>
        <td class='csDc'>{{form.dealCar2}}</td>
        <td class='csDc'>{{form.dealCar3}}</td>
        <td class='csDc'>{{form.dealCar4}}</td>
        <td class='csDc'>{{form.dealCar5}}</td>
        <td class='csDc'>{{form.dealCar6}}</td>
        <td class='csDc'>{{form.dealCar7}}</td>
        <td class='csDc'>{{form.dealCarWeek}}</td>
        <td class='csDc'>{{form.dealCarWeekAcc}}</td>
        <td class='csDc'>{{form.dealCarTotal}}</td>
        <td class='csDc'>{{form.dealCarTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.dealCarAmt1}}</td>
        <td class='csDc'>{{form.dealCarAmt2}}</td>
        <td class='csDc'>{{form.dealCarAmt3}}</td>
        <td class='csDc'>{{form.dealCarAmt4}}</td>
        <td class='csDc'>{{form.dealCarAmt5}}</td>
        <td class='csDc'>{{form.dealCarAmt6}}</td>
        <td class='csDc'>{{form.dealCarAmt7}}</td>
        <td class='csDc'>{{form.dealCarAmtWeek}}</td>
        <td class='csDc'>{{form.dealCarAmtWeekAcc}}</td>
        <td class='csDc'>{{form.dealCarAmtTotal}}</td>
        <td class='csDc'>{{form.dealCarAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">小訂</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.depositHouse1}}</td>
        <td class='csDc'>{{form.depositHouse2}}</td>
        <td class='csDc'>{{form.depositHouse3}}</td>
        <td class='csDc'>{{form.depositHouse4}}</td>
        <td class='csDc'>{{form.depositHouse5}}</td>
        <td class='csDc'>{{form.depositHouse6}}</td>
        <td class='csDc'>{{form.depositHouse7}}</td>
        <td class='csDc'>{{form.depositHouseWeek}}</td>
        <td class='csDc'>{{form.depositHouseWeekAcc}}</td>
        <td class='csDc'>{{form.depositHouseTotal}}</td>
        <td class='csDc'>{{form.depositHouseTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.depositAmt1}}</td>
        <td class='csDc'>{{form.depositAmt2}}</td>
        <td class='csDc'>{{form.depositAmt3}}</td>
        <td class='csDc'>{{form.depositAmt4}}</td>
        <td class='csDc'>{{form.depositAmt5}}</td>
        <td class='csDc'>{{form.depositAmt6}}</td>
        <td class='csDc'>{{form.depositAmt7}}</td>
        <td class='csDc'>{{form.depositAmtWeek}}</td>
        <td class='csDc'>{{form.depositAmtWeekAcc}}</td>
        <td class='csDc'>{{form.depositAmtTotal}}</td>
        <td class='csDc'>{{form.depositAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'>{{form.depositCar1}}</td>
        <td class='csDc'>{{form.depositCar2}}</td>
        <td class='csDc'>{{form.depositCar3}}</td>
        <td class='csDc'>{{form.depositCar4}}</td>
        <td class='csDc'>{{form.depositCar5}}</td>
        <td class='csDc'>{{form.depositCar6}}</td>
        <td class='csDc'>{{form.depositCar7}}</td>
        <td class='csDc'>{{form.depositCarWeek}}</td>
        <td class='csDc'>{{form.depositCarWeekAcc}}</td>
        <td class='csDc'>{{form.depositCarTotal}}</td>
        <td class='csDc'>{{form.depositCarTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.depositCarAmt1}}</td>
        <td class='csDc'>{{form.depositCarAmt2}}</td>
        <td class='csDc'>{{form.depositCarAmt3}}</td>
        <td class='csDc'>{{form.depositCarAmt4}}</td>
        <td class='csDc'>{{form.depositCarAmt5}}</td>
        <td class='csDc'>{{form.depositCarAmt6}}</td>
        <td class='csDc'>{{form.depositCarAmt7}}</td>
        <td class='csDc'>{{form.depositCarAmtWeek}}</td>
        <td class='csDc'>{{form.depositCarAmtWeekAcc}}</td>
        <td class='csDc'>{{form.depositCarAmtTotal}}</td>
        <td class='csDc'>{{form.depositCarAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">補足</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.fillHouse1}}</td>
        <td class='csDc'>{{form.fillHouse2}}</td>
        <td class='csDc'>{{form.fillHouse3}}</td>
        <td class='csDc'>{{form.fillHouse4}}</td>
        <td class='csDc'>{{form.fillHouse5}}</td>
        <td class='csDc'>{{form.fillHouse6}}</td>
        <td class='csDc'>{{form.fillHouse7}}</td>
        <td class='csDc'>{{form.fillHouseWeek}}</td>
        <td class='csDc'>{{form.fillHouseWeekAcc}}</td>
        <td class='csDc'>{{form.fillHouseTotal}}</td>
        <td class='csDc'>{{form.fillHouseTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.fillAmt1}}</td>
        <td class='csDc'>{{form.fillAmt2}}</td>
        <td class='csDc'>{{form.fillAmt3}}</td>
        <td class='csDc'>{{form.fillAmt4}}</td>
        <td class='csDc'>{{form.fillAmt5}}</td>
        <td class='csDc'>{{form.fillAmt6}}</td>
        <td class='csDc'>{{form.fillAmt7}}</td>
        <td class='csDc'>{{form.fillAmtWeek}}</td>
        <td class='csDc'>{{form.fillAmtWeekAcc}}</td>
        <td class='csDc'>{{form.fillAmtTotal}}</td>
        <td class='csDc'>{{form.fillAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'>{{form.fillCar1}}</td>
        <td class='csDc'>{{form.fillCar2}}</td>
        <td class='csDc'>{{form.fillCar3}}</td>
        <td class='csDc'>{{form.fillCar4}}</td>
        <td class='csDc'>{{form.fillCar5}}</td>
        <td class='csDc'>{{form.fillCar6}}</td>
        <td class='csDc'>{{form.fillCar7}}</td>
        <td class='csDc'>{{form.fillCarWeek}}</td>
        <td class='csDc'>{{form.fillCarWeekAcc}}</td>
        <td class='csDc'>{{form.fillCarTotal}}</td>
        <td class='csDc'>{{form.fillCarTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.fillCarAmt1}}</td>
        <td class='csDc'>{{form.fillCarAmt2}}</td>
        <td class='csDc'>{{form.fillCarAmt3}}</td>
        <td class='csDc'>{{form.fillCarAmt4}}</td>
        <td class='csDc'>{{form.fillCarAmt5}}</td>
        <td class='csDc'>{{form.fillCarAmt6}}</td>
        <td class='csDc'>{{form.fillCarAmt7}}</td>
        <td class='csDc'>{{form.fillCarAmtWeek}}</td>
        <td class='csDc'>{{form.fillCarAmtWeekAcc}}</td>
        <td class='csDc'>{{form.fillCarAmtTotal}}</td>
        <td class='csDc'>{{form.fillCarAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">簽約</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.orderHouse1}}</td>
        <td class='csDc'>{{form.orderHouse2}}</td>
        <td class='csDc'>{{form.orderHouse3}}</td>
        <td class='csDc'>{{form.orderHouse4}}</td>
        <td class='csDc'>{{form.orderHouse5}}</td>
        <td class='csDc'>{{form.orderHouse6}}</td>
        <td class='csDc'>{{form.orderHouse7}}</td>
        <td class='csDc'>{{form.orderHouseWeek}}</td>
        <td class='csDc'>{{form.orderHouseWeekAcc}}</td>
        <td class='csDc'>{{form.orderHouseTotal}}</td>
        <td class='csDc'>{{form.orderHouseTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.orderAmt1}}</td>
        <td class='csDc'>{{form.orderAmt2}}</td>
        <td class='csDc'>{{form.orderAmt3}}</td>
        <td class='csDc'>{{form.orderAmt4}}</td>
        <td class='csDc'>{{form.orderAmt5}}</td>
        <td class='csDc'>{{form.orderAmt6}}</td>
        <td class='csDc'>{{form.orderAmt7}}</td>
        <td class='csDc'>{{form.orderAmtWeek}}</td>
        <td class='csDc'>{{form.orderAmtWeekAcc}}</td>
        <td class='csDc'>{{form.orderAmtTotal}}</td>
        <td class='csDc'>{{form.orderAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'>{{form.orderCar1}}</td>
        <td class='csDc'>{{form.orderCar2}}</td>
        <td class='csDc'>{{form.orderCar3}}</td>
        <td class='csDc'>{{form.orderCar4}}</td>
        <td class='csDc'>{{form.orderCar5}}</td>
        <td class='csDc'>{{form.orderCar6}}</td>
        <td class='csDc'>{{form.orderCar7}}</td>
        <td class='csDc'>{{form.orderCarWeek}}</td>
        <td class='csDc'>{{form.orderCarWeekAcc}}</td>
        <td class='csDc'>{{form.orderCarTotal}}</td>
        <td class='csDc'>{{form.orderCarTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.orderCarAmt1}}</td>
        <td class='csDc'>{{form.orderCarAmt2}}</td>
        <td class='csDc'>{{form.orderCarAmt3}}</td>
        <td class='csDc'>{{form.orderCarAmt4}}</td>
        <td class='csDc'>{{form.orderCarAmt5}}</td>
        <td class='csDc'>{{form.orderCarAmt6}}</td>
        <td class='csDc'>{{form.orderCarAmt7}}</td>
        <td class='csDc'>{{form.orderCarAmtWeek}}</td>
        <td class='csDc'>{{form.orderCarAmtWeekAcc}}</td>
        <td class='csDc'>{{form.orderCarAmtTotal}}</td>
        <td class='csDc'>{{form.orderCarAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc' rowspan="4">退戶</td>
        <td class='csTc'>戶數</td>
        <td class='csDc'>{{form.cancelHouse1}}</td>
        <td class='csDc'>{{form.cancelHouse2}}</td>
        <td class='csDc'>{{form.cancelHouse3}}</td>
        <td class='csDc'>{{form.cancelHouse4}}</td>
        <td class='csDc'>{{form.cancelHouse5}}</td>
        <td class='csDc'>{{form.cancelHouse6}}</td>
        <td class='csDc'>{{form.cancelHouse7}}</td>
        <td class='csDc'>{{form.cancelHouseWeek}}</td>
        <td class='csDc'>{{form.cancelHouseWeekAcc}}</td>
        <td class='csDc'>{{form.cancelHouseTotal}}</td>
        <td class='csDc'>{{form.cancelHouseTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.cancelAmt1}}</td>
        <td class='csDc'>{{form.cancelAmt2}}</td>
        <td class='csDc'>{{form.cancelAmt3}}</td>
        <td class='csDc'>{{form.cancelAmt4}}</td>
        <td class='csDc'>{{form.cancelAmt5}}</td>
        <td class='csDc'>{{form.cancelAmt6}}</td>
        <td class='csDc'>{{form.cancelAmt7}}</td>
        <td class='csDc'>{{form.cancelAmtWeek}}</td>
        <td class='csDc'>{{form.cancelAmtWeekAcc}}</td>
        <td class='csDc'>{{form.cancelAmtTotal}}</td>
        <td class='csDc'>{{form.cancelAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>車數</td>
        <td class='csDc'>{{form.cancelCar1}}</td>
        <td class='csDc'>{{form.cancelCar2}}</td>
        <td class='csDc'>{{form.cancelCar3}}</td>
        <td class='csDc'>{{form.cancelCar4}}</td>
        <td class='csDc'>{{form.cancelCar5}}</td>
        <td class='csDc'>{{form.cancelCar6}}</td>
        <td class='csDc'>{{form.cancelCar7}}</td>
        <td class='csDc'>{{form.cancelCarWeek}}</td>
        <td class='csDc'>{{form.cancelCarWeekAcc}}</td>
        <td class='csDc'>{{form.cancelCarTotal}}</td>
        <td class='csDc'>{{form.cancelCarTTP}}</td>
      </tr>
      <tr>
        <td class='csTc'>金額</td>
        <td class='csDc'>{{form.cancelCarAmt1}}</td>
        <td class='csDc'>{{form.cancelCarAmt2}}</td>
        <td class='csDc'>{{form.cancelCarAmt3}}</td>
        <td class='csDc'>{{form.cancelCarAmt4}}</td>
        <td class='csDc'>{{form.cancelCarAmt5}}</td>
        <td class='csDc'>{{form.cancelCarAmt6}}</td>
        <td class='csDc'>{{form.cancelCarAmt7}}</td>
        <td class='csDc'>{{form.cancelCarAmtWeek}}</td>
        <td class='csDc'>{{form.cancelCarAmtWeekAcc}}</td>
        <td class='csDc'>{{form.cancelCarAmtTotal}}</td>
        <td class='csDc'>{{form.cancelCarAmtTTP}}</td>
      </tr>
      <tr>
        <td class='csTc' colspan="3">本週回籠</td>
        <td class='csDc'>{{form.weeklyAgain}}</td>
        <td class='csTc'>回籠成交</td>
        <td class='csDc'>{{form.weeklyDealAgain}}</td>
        <td class='csTc'>累計回籠</td>
        <td class='csDc'>{{form.accAgain}}</td>
        <td class='csTc'>累計成交</td>
        <td class='csDc'>{{form.accDeal}}</td>
        <td class='csTc'>累計退戶</td>
        <td class='csDc'>{{form.accCancel}}</td>
        <td class='csTc'>實際成交</td>
        <td class='csDc'>{{form.accActDeal}}</td>
      </tr>
      <tr>
        <td class='csTc'>順銷原因</td>
        <td class='csDc' colspan="7">{{form.wellSalesCause}}</td>
        <td class='csTc'>滯銷原因</td>
        <td class='csDc' colspan="5">{{form.badSalesCause}}</td>
      </tr>
      <tr>
        <td class='csTc'>建議對策</td>
        <td class='csDc' colspan="7">{{form.suggestion}}</td>
        <td class='csTc'>本週媒體</td>
        <td class='csDc' colspan="5">{{form.weeklyMedia}}</td>
      </tr>

    </table> 
    </div>
    
  </div>
</template>

<script src="./weeklyReport.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

