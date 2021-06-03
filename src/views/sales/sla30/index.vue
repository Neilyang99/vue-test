<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selSla30004" size="mini" placeholder="請輸入行政區"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
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

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column label="填寫日期">
        <template slot-scope="scope">
          {{scope.row.sla30002}}
        </template>
      </el-table-column>
      <el-table-column label="土地區分">
        <template slot-scope="scope">
          {{scope.row.sla30006}}
        </template>
      </el-table-column>
      <el-table-column label="投資興建">
        <template slot-scope="scope">
          {{scope.row.sla30007}}
        </template>
      </el-table-column>
      <el-table-column label="土地面積">
        <template slot-scope="scope">
          {{scope.row.sla30008}}
        </template>
      </el-table-column>
      <el-table-column label="推出日期">
        <template slot-scope="scope">
          {{scope.row.sla30013}}-{{scope.row.sla30014}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="填表日期" prop="sla30002">
              <div>{{form.sla30002 }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!--<el-form-item label="填寫人" prop="sla30003">
              <div>{{form.sla30003}}</div>
            </el-form-item>
            -->
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="行政區" prop="sla30005">
              <el-select  v-model="form.sla30005" placeholder="請選擇">
                  <el-option
                    v-for="item in sla30005List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" >
            <el-form-item label="推出日期" prop="">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30013" style="width: 136px;"></el-date-picker>~
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30014" style="width: 136px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地位置" prop="sla30025">
              <el-input v-model="form.sla30025" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="土地區分" prop="sla30006">
              <el-input v-model="form.sla30006" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公開日期" prop="">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30015" style="width: 136px;"></el-date-picker>
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30016" style="width: 136px;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="產品規劃" prop="">
              <el-input v-model="form.sla30026" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="投資興建" prop="sla30007">
              <el-input v-model="form.sla30007" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="樓層數" prop="">
              <el-input v-model="form.sla30017" maxlength="2" style="width:60px"></el-input>~<el-input v-model="form.sla30018" maxlength="2" style="width:60px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面臨道路" prop="">
              <el-input v-model="form.sla30027" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="土地面積" prop="sla30008">
              <el-input v-model="form.sla30008" maxlength="8" style="width:100px"></el-input>坪
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="總建坪" prop="">
              <el-input v-model="form.sla30019" maxlength="6" style="width:85px"></el-input>~<el-input v-model="form.sla30020" maxlength="6" style="width:85px"></el-input>坪
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建蔽率" prop="">
              <el-input v-model="form.sla30028" maxlength="5" style="width:70px"></el-input>%
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="總銷金額" prop="sla30009">
              <el-input v-model="form.sla30009" maxlength="8" style="width:100px"></el-input>~<el-input v-model="form.sla30010" maxlength="8" style="width:100px"></el-input>萬元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="土地價格" prop="">
              <el-input v-model="form.sla30021" maxlength="8" style="width:100px"></el-input>~<el-input v-model="form.sla30022" maxlength="8" style="width:100px"></el-input>萬元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公設比" prop="">
              <el-input v-model="form.sla30029" maxlength="5" style="width:70px"></el-input>%
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="廣企公司" prop="sla30011">
              <el-input v-model="form.sla30011" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="銷售公司" prop="">
              <el-input v-model="form.sla30023" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預計完工" prop="">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30030" style="width: 136px;"></el-date-picker>
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30031" style="width: 136px;"></el-date-picker>
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="建築規劃" prop="sla30012">
              <el-input v-model="form.sla30012" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承造人" prop="">
              <el-input v-model="form.sla30024" maxlength="60"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="景觀設計" prop="">
              <el-input v-model="form.sla30032" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle"><label>產品規劃</label></el-col>
        </el-row>

        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>店鋪</label></el-col>
          <el-col :span="21" >
            <el-checkbox label="1F" v-model="form.sla30033"></el-checkbox>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;坪數：</label>
            <el-input v-model="form.sla30034" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30035" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30036" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30037" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="1+2F" v-model="form.sla30038"></el-checkbox>
            <label>坪數：</label>
            <el-input v-model="form.sla30039" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30040" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30041" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30042" style="width:60px;" maxlength="3"></el-input>%
          </el-col>
        </el-row> 

        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="3" align="middle"><label>住宅</label></el-col>
          <el-col :span="21" >
            <el-checkbox label="套房" v-model="form.sla30043"></el-checkbox>
            <label>&nbsp;&nbsp;坪數：</label>
            <el-input v-model="form.sla30044" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30045" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30046" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30047" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="1+1房" v-model="form.sla30048"></el-checkbox>
            <label>坪數：</label>
            <el-input v-model="form.sla30049" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30050" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30051" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30052" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="2房" v-model="form.sla30053"></el-checkbox>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;坪數：</label>
            <el-input v-model="form.sla30054" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30055" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30056" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30057" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="2+1房" v-model="form.sla30058"></el-checkbox>
            <label>坪數：</label>
            <el-input v-model="form.sla30059" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30060" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30061" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30062" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="3房" v-model="form.sla30063"></el-checkbox>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;坪數：</label>
            <el-input v-model="form.sla30064" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30065" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30066" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30067" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="3+1房" v-model="form.sla30068"></el-checkbox>
            <label>坪數：</label>
            <el-input v-model="form.sla30069" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30070" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30071" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30072" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="4房" v-model="form.sla30073"></el-checkbox>
            <label>&nbsp;&nbsp;&nbsp;&nbsp;坪數：</label>
            <el-input v-model="form.sla30074" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30075" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30076" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30077" style="width:60px;" maxlength="3"></el-input>%
            <br>
            <el-checkbox label="4+1房" v-model="form.sla30078"></el-checkbox>
            <label>坪數：</label>
            <el-input v-model="form.sla30079" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30080" style="width:100px" maxlength="5"></el-input>坪
            <label>&nbsp;&nbsp;&nbsp;&nbsp;戶數：</label>
            <el-input v-model="form.sla30081" style="width:60px" maxlength="3"></el-input>戶
            <label>&nbsp;&nbsp;&nbsp;&nbsp;比例：</label>
            <el-input v-model="form.sla30082" style="width:60px;" maxlength="3"></el-input>%
           </el-col>
        </el-row>

        <el-row style="border: 1px solid black;" >
          <el-col :span="9" >
            <label>&nbsp;&nbsp;&nbsp;&nbsp;目前個案進度：</label>
            <el-select  v-model="form.sla30084" placeholder="請選擇">
                  <el-option
                    v-for="item in sla30084List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
          </el-col>
          <el-col :span="6" >
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <label>規劃總戶數：</label>&nbsp;<el-input v-model="form.sla30083" style="width:60px" ></el-input>戶
          </el-col>
          <el-col :span="9"></el-col>
        </el-row>
        <br>

        <el-row > 
          <el-col :span="24" style="border: 1px solid black;" justify="center" align="middle"><label>價位分析</label></el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="8" >
            <label>店鋪平均單價約</label>
            <el-input v-model="form.sla30085" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30086" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="8" >
            <label>主力坪數</label>
            <el-input v-model="form.sla30087" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30088" style="width:100px" maxlength="5"></el-input>坪
          </el-col>
          <el-col :span="8" >
            <label>主力總價</label>
            <el-input v-model="form.sla30089" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30090" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="8" >
            <label>住家平均單價約</label>
            <el-input v-model="form.sla30091" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30092" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="8" >
            <label>主力坪數</label>
            <el-input v-model="form.sla30093" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30094" style="width:100px" maxlength="5"></el-input>坪
          </el-col>
          <el-col :span="8">
            <label>主力總價</label>
            <el-input v-model="form.sla30095" style="width:100px" maxlength="5"></el-input>~<el-input v-model="form.sla30096" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="8" >
            <label>廣告戶透天單價</label>
            <el-input v-model="form.sla30098" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="8" >
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;總價</label>
            <el-input v-model="form.sla30097" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="8" >
            <label>議價空間</label>
            <el-input v-model="form.sla30099" style="width:100px" maxlength="3"></el-input>%
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="4" >
            <label>付款方式:</label>
          </el-col>
          <el-col :span="5" >
            <label>簽訂開</label>
            <el-input v-model="form.sla300100" style="width:100px" maxlength="3"></el-input>%
          </el-col>
          <el-col :span="5" >
            <label>期款</label>
            <el-input v-model="form.sla300101" style="width:100px" maxlength="3"></el-input>%
          </el-col>
          <el-col :span="5" >
            <label>貸款</label>
            <el-input v-model="form.sla300102" style="width:100px" maxlength="3"></el-input>%
          </el-col>
          <el-col :span="5" >
            <label>自備款</label>
            <el-input v-model="form.sla300103" style="width:100px" maxlength="3"></el-input>%
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="4" >
            <label>停車位:</label>
          </el-col>
          <el-col :span="5" >
            <label>平面</label>
            <el-input v-model="form.sla300104" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="5" >
            <label>機上</label>
            <el-input v-model="form.sla300105" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="5" >
            <label>機下</label>
            <el-input v-model="form.sla300106" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="5" ></el-col>
        </el-row>

        <br>
        <el-row >
          <el-col :span="24" style="border: 1px solid black;" ><label >公共設施</label>
            <el-input v-model="form.sla300107" type="textarea" :rows="3"></el-input>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24" style="border: 1px solid black;" ><label >媒體訴求</label>
            <el-input v-model="form.sla300108" type="textarea" :rows="3"></el-input>
          </el-col>
        </el-row>
        <el-row  style="border: 1px solid black;">
          <el-col :span="24" >
            <label>廣告媒體&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <el-checkbox label="接待中心" v-model="form.sla31002"></el-checkbox>
            <el-checkbox label="實、樣品屋" v-model="form.sla31003"></el-checkbox>
            <el-checkbox label="定點看板" v-model="form.sla31004"></el-checkbox>
            <el-checkbox label="DM" v-model="form.sla31005"></el-checkbox>
            <el-checkbox label="NP" v-model="form.sla31006"></el-checkbox>
            <el-checkbox label="派夾報" v-model="form.sla31007"></el-checkbox>
            <el-checkbox label="CF" v-model="form.sla31008"></el-checkbox>
            <el-checkbox label="RD" v-model="form.sla31009"></el-checkbox>
            <el-checkbox label="SP" v-model="form.sla31010"></el-checkbox>
            <el-checkbox label="其他" v-model="form.sla31027"></el-checkbox>
            <el-input v-model="form.sla31028" style="width:160px" maxlength="100"></el-input>
          </el-col>
        </el-row>
        <br>
        <el-row > 
          <el-col :span="24" style="border: 1px solid black;" justify="center" align="middle"><label>銷售狀況</label></el-col>
        </el-row>
        <el-row style="border: 1px solid black;">
          <el-col :span="4">
            <label>每周來客</label>
            <el-input v-model="form.sla300109" style="width:60px" maxlength="3"></el-input>人次
          </el-col>
          <el-col :span="4">
            <label>銷售較佳坪數</label>
            <el-input v-model="form.sla300110" style="width:60px" maxlength="5"></el-input>坪
          </el-col>
          <el-col :span="6">
            <label>銷售較佳價位</label>
            <el-input v-model="form.sla300111" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="7">
            <label>區域行情</label>
            <el-input v-model="form.sla300112" style="width:100px" maxlength="5"></el-input>~
            <el-input v-model="form.sla300113" style="width:100px" maxlength="5"></el-input>萬元
          </el-col>
          <el-col :span="3">
            <label>概估銷售率</label>
            <el-input v-model="form.sla300117" style="width:60px" maxlength="3"></el-input>%
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;">
          <el-col :span="24">
            <label>競爭個案</label>
            <el-input v-model="form.sla300114" style="width:90%" maxlength="200"></el-input>
          </el-col>
        </el-row>
         <br>
        <el-row > 
          <el-col :span="24" style="border: 1px solid black;" justify="center" align="middle"><label>來客區域</label></el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center"  align="middle">
          <el-col :span="2" ><label>台中市</label></el-col>
          <el-col :span="5">
            <el-checkbox label="中區" v-model="form.sla320010"></el-checkbox><br>
            <el-checkbox label="東區" v-model="form.sla320011"></el-checkbox><br>
            <el-checkbox label="南區" v-model="form.sla320012"></el-checkbox><br>
            <el-checkbox label="西區" v-model="form.sla320013"></el-checkbox><br>
            <el-checkbox label="北區" v-model="form.sla320014"></el-checkbox><br>
            <el-checkbox label="北屯區" v-model="form.sla320015"></el-checkbox><br>
            <el-checkbox label="西屯區" v-model="form.sla320016"></el-checkbox><br>
            <el-checkbox label="南屯區" v-model="form.sla320017"></el-checkbox>
          </el-col>
          <el-col :span="5">
            <el-checkbox label="太平區" v-model="form.sla320018"></el-checkbox><br>
            <el-checkbox label="大里區" v-model="form.sla320019"></el-checkbox><br>
            <el-checkbox label="霧峰區" v-model="form.sla320021"></el-checkbox><br>
            <el-checkbox label="烏日區" v-model="form.sla320022"></el-checkbox><br>
            <el-checkbox label="豐原區" v-model="form.sla320023"></el-checkbox><br>
            <el-checkbox label="后里區" v-model="form.sla320024"></el-checkbox><br>
            <el-checkbox label="石岡區" v-model="form.sla320025"></el-checkbox><br>
            <el-checkbox label="東勢區" v-model="form.sla320026"></el-checkbox>
          </el-col>
          <el-col :span="5">
            <el-checkbox label="和平區" v-model="form.sla320027"></el-checkbox><br>
            <el-checkbox label="新社區" v-model="form.sla320028"></el-checkbox><br>
            <el-checkbox label="潭子區" v-model="form.sla320029"></el-checkbox><br>
            <el-checkbox label="大雅區" v-model="form.sla320030"></el-checkbox><br>
            <el-checkbox label="神岡區" v-model="form.sla320031"></el-checkbox><br>
            <el-checkbox label="大肚區" v-model="form.sla320032"></el-checkbox><br>
            <el-checkbox label="沙鹿區" v-model="form.sla320033"></el-checkbox><br>
            <el-checkbox label="龍井區" v-model="form.sla320034"></el-checkbox>
          </el-col>
          <el-col :span="5" >
            <el-checkbox label="梧棲區" v-model="form.sla320035"></el-checkbox><br>
            <el-checkbox label="清水區" v-model="form.sla320036"></el-checkbox><br>
            <el-checkbox label="大甲區" v-model="form.sla320037"></el-checkbox><br>
            <el-checkbox label="外埔區" v-model="form.sla320038"></el-checkbox><br>
            <el-checkbox label="大安區" v-model="form.sla320039"></el-checkbox>
          </el-col>
        </el-row>
<!--
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle">
          <el-col :span="3" align="middle"><label>外縣市</label></el-col>
          <el-col :span="21">
            <el-checkbox label="臺北市" v-model="form.sla32001"></el-checkbox>
            
            <el-checkbox v-for="city in cityList" :key="city" v-model="city.checked">
              {{city.name}}
            </el-checkbox>
          </el-col>
        </el-row>
-->
        <br>
        <el-form-item align="middle">
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

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

<script src="./sla30.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

