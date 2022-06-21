<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row>
        <el-col :span="10">
          工程案名稱: {{projectName}}
        </el-col>
        <el-col :span="14">
          {{reportName}}
        </el-col>
      </el-row>
      
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="預進日期">
        <template slot-scope="scope">
          {{scope.row.maa12005}}
        </template>
      </el-table-column>
      <el-table-column label="施作位置">
        <template slot-scope="scope">
          {{scope.row.maa12009}}
        </template>
      </el-table-column>
      <el-table-column label="SD280預進量">
        <template slot-scope="scope">
          {{scope.row.maa12010}}
        </template>
      </el-table-column>
      <el-table-column label="SD280實進量">
        <template slot-scope="scope">
          {{scope.row.maa12011}}
        </template>
      </el-table-column>
      <el-table-column label="SD420預進量">
        <template slot-scope="scope">
          {{scope.row.maa12031}}
        </template>
      </el-table-column>
      <el-table-column label="SD420實進量">
        <template slot-scope="scope">
          {{scope.row.maa12032}}
        </template>
      </el-table-column>
      <el-table-column label="SD420W預進量">
        <template slot-scope="scope">
          {{scope.row.maa12073}}
        </template>
      </el-table-column>
      <el-table-column label="SD420W實進量">
        <template slot-scope="scope">
          {{scope.row.maa12074}}
        </template>
      </el-table-column>

      <el-table-column label="合計預進數量">
        <template slot-scope="scope">
          {{scope.row.maa12010}}
        </template>
      </el-table-column>
      <el-table-column label="合計實進數量">
        <template slot-scope="scope">
          {{scope.row.maa12011}}
        </template>
      </el-table-column>
      <el-table-column label="誤差情形">
        <template slot-scope="scope">
          {{scope.row.maa12114}}
        </template>
      </el-table-column>
      <el-table-column label="誤差比例">
        <template slot-scope="scope">
          {{scope.row.maa12115}}
        </template>
      </el-table-column>
      <el-table-column label="原因分析">
        <template slot-scope="scope">
          {{scope.row.maa12116}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工程案" >{{projectName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="施作位置" prop="maa12009" >
              <el-input v-model="form.maa12009" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預進日期" prop="maa12005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa12005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="實進日期" prop="maa12006" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa12006" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>鋼筋 SD-280</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>鋼筋號數</label></el-col>
          <el-col :span="21" >
            <label>#3&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12010" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12011" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#4&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12012" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12013" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#5&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12014" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12015" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>小計</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd280qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd280qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
          </el-col>
        </el-row> 

        <el-row >
          <el-col :span="24" >
            <label>&nbsp;</label>
          </el-col>
        </el-row >

        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>鋼筋 SD-420水粹</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>鋼筋號數</label></el-col>
          <el-col :span="21" >
            <label>#3&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12031" style="width:100px" maxlength="10" @change="calSum()"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12032" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#4&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12033" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12034" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#5&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12035" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12036" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#6&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12037" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12038" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#7&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12039" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12040" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#8&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12041" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12042" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#10&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12045" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12046" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>小計</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd420_1qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd420_1qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
          </el-col>
        </el-row> 

        <el-row >
          <el-col :span="24" >
            <label>&nbsp;</label>
          </el-col>
        </el-row >

        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>鋼筋 SD-420</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>鋼筋號數</label></el-col>
          <el-col :span="21" >
            <label>#3&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12052" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12053" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#4&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12054" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12055" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#5&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12056" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12057" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#6&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12058" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12059" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#7&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12060" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12061" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#8&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12062" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12063" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#10&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12066" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12067" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>小計</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd420qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd420qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
          </el-col>
        </el-row> 
        <el-row >
          <el-col :span="24" >
            <label>&nbsp;</label>
          </el-col>
        </el-row >

        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>鋼筋 SD-420W</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>鋼筋號數</label></el-col>
          <el-col :span="21" >
            <label>#3&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12073" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12074" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#4&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12075" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12076" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#5&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12077" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12078" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#6&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12079" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12080" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#7&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12081" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12082" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#8&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12083" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12084" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>#10&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.maa12087" style="width:100px" maxlength="10"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.maa12088" style="width:100px" maxlength="10"></el-input>
            <br>
            <label>小計</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd420Wqty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd420Wqty2" style="width:100px" maxlength="10" readonly="true"></el-input>
          </el-col>
        </el-row> 

        <el-row >
          <el-col :span="24" >
            <label>&nbsp;</label>
          </el-col>
        </el-row >

        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>鋼筋合計</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>鋼筋號數</label></el-col>
          <el-col :span="21" >
            <label>#3&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_3_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_3_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#4&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_4_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_4_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#5&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_5_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_5_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#6&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_6_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_6_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#7&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_7_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_7_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#8&nbsp;&nbsp;&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_8_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_8_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>#10&nbsp;</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sd_10_qty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sd_10_qty2" style="width:100px" maxlength="10" readonly="true"></el-input>
            <br>
            <label>總計</label>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;預定數量：</label>
            <el-input v-model="form.sdqty1" style="width:100px" maxlength="10" readonly="true"></el-input>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;實際數量：</label>
            <el-input v-model="form.sdqty2" style="width:100px" maxlength="10" readonly="true"></el-input>
          </el-col>
        </el-row> 

        <el-row >
          <el-col :span="24" >
            <label>&nbsp;</label>
          </el-col>
        </el-row >

        <el-row>
          <el-col :span="8">
            <el-form-item label="誤差情形" prop="maa12114" >
              <el-input v-model="form.maa12114" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="誤差比例" prop="maa12115" >
              <el-input v-model="form.maa12115" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="誤差＞2.5％原因分析" prop="maa12116" >
              <el-input v-model="form.maa12116" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./maa12.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

