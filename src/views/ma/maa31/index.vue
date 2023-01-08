<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <div>  
      <el-row  >
        <el-col :span="6">工程案： {{this.prjName}}
        </el-col>
      </el-row>
      <el-row  >
        <el-col :span="6">外包商： {{this.vendorName}}
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
          <el-button type="info" size="mini"  @click.native="">列印</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column label="放款期別" >
        <template slot-scope="scope">
          {{scope.row.maa31001}}
        </template>
      </el-table-column>
      <el-table-column label="估驗期別">
        <template slot-scope="scope">
          {{scope.row.maa31002}}
        </template>
      </el-table-column>
      <el-table-column label="請款金額">
        <template slot-scope="scope">
          {{scope.row.maa31003}}
        </template>
      </el-table-column>
      <el-table-column label="保留款">
        <template slot-scope="scope">
          {{scope.row.maa31004}}
        </template>
      </el-table-column>
      <el-table-column label="估驗金額">
        <template slot-scope="scope">
          {{scope.row.maa31005}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="95%">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="請款廠商：" >{{this.vendorName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="估驗次：" >3
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="申請日期：" >20221018
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="放款期別：" prop="">
              <el-input v-model="form.maa0200" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>請款明細</label><br>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black;"> 
          <el-col :span="1" style="border: 1px solid black; text-align: center;"><label>項次</label></el-col>
          <el-col :span="6" style="border: 1px solid black; text-align: center;" ><label>施作項目</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>合約數量</label></el-col>
          <el-col :span="1" style="border: 1px solid black; text-align: center;" ><label>單位</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>單價</label></el-col>
          <el-col :span="1" style="border: 1px solid black; text-align: center;" ><label>本期數量</label></el-col>
          <el-col :span="1" style="border: 1px solid black; text-align: center;" ><label>累積數量</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>追加金額</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>本期請領90%</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>累計請領</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>本期保留款</label></el-col>
          <el-col :span="2" style="border: 1px solid black; text-align: center;" ><label>累計保留款</label></el-col>
        </el-row>
        <div v-for="(v,i) in apList" :key="i">
          <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle">
            <el-col :span="1" style=" text-align: center;">{{v.maa31001}}</el-col>
            <el-col :span="6" style=" text-align: left;">{{v.maa31002}}</el-col>
            <el-col :span="2" style=" text-align: center;">{{v.maa31003}}</el-col>
            <el-col :span="1" style=" text-align: center;">EA</el-col>
            <el-col :span="2" style=" text-align: center;">{{v.price}}</el-col>
            <el-col :span="1" style=" text-align: center;"><el-input v-model="v.currencyQty" style="width:100%" maxlength="5" ></el-input></el-col>
            <el-col :span="1" style=" text-align: center;">{{v.currencyQty}}</el-col>
            <el-col :span="2" style=" text-align: center;"><el-input style="width:100%" maxlength="5" ></el-input></el-col>
            <el-col :span="2" style=" text-align: center;">{{v.currencyQty*v.price*0.9}}</el-col>
            <el-col :span="2" style=" text-align: center;">{{v.currencyQty*v.price*0.9}}</el-col>
            <el-col :span="2" style=" text-align: center;">{{v.currencyQty*v.price*0.1}}</el-col>
            <el-col :span="2" style=" text-align: center;">{{v.currencyQty*v.price*0.1}}</el-col>
          </el-row>
        
        </div>
        <br>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle">
          <el-col :span="16" style=" text-align: right; color: blueviolet;">退保留款金額</el-col>
          <el-col :span="2" style=" text-align: center;"><el-input style="width:100%" maxlength="5" v-model="form.value1"></el-input></el-col>
          <el-col :span="2" style=" text-align: center;"><el-input style="width:100%" maxlength="5" v-model="form.value2" ></el-input></el-col>
          <el-col :span="2" style=" text-align: center;"><el-input style="width:100%" maxlength="5" v-model="form.value3" ></el-input></el-col>
          <el-col :span="2" style=" text-align: center;"><el-input style="width:100%" maxlength="5" v-model="form.value4" ></el-input></el-col>
        </el-row>
        <el-row style="border: 1px solid black; height: 40px;" type="flex" justify="center" align="middle">
          <el-col :span="16" style=" text-align: right; color:darkgoldenrod; ">本期合計(A)</el-col>
          <el-col :span="2" style=" text-align: center;">729</el-col>
          <el-col :span="2" style=" text-align: center;"></el-col>
          <el-col :span="2" style=" text-align: center;"></el-col>
          <el-col :span="2" style=" text-align: center;"></el-col>
        </el-row>
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle"> 
          <el-col :span="1" style=" text-align: right;  color:brown;">扣款原因:</el-col>
          <el-col :span="13" style=" text-align: right;"><el-input style="width:100%" maxlength="20" v-model="form.value6"></el-input></el-col>
          <el-col :span="2" style=" text-align: right; color:brown; ">本期扣款(B)</el-col>
          <el-col :span="8"><el-input style="width:100%" maxlength="5" v-model="form.value5"></el-input>
          </el-col>
        </el-row>
        <el-row style="border: 1px solid black; height: 40px;" type="flex" justify="center" align="middle"> 
          <el-col :span="16" style=" text-align: right; color:dodgerblue ">本期核付(A-B)</el-col>
          <el-col :span="2" style=" text-align: center;">729</el-col>
          <el-col :span="6" style=" text-align: center;"></el-col>
        </el-row>
        <br>
        <el-row style="border: 1px solid black;"> 
          <el-col :span="24">
            <el-form-item label="請款項目說明" prop="">
              <el-input v-model="form.maa02" type="textarea" :rows="3" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div>
          <span>&nbsp;</span>
        <el-form-item align="center">
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
        </div>
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

<script src="./maa31.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

