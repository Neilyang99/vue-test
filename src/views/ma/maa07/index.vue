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
        <el-col :span="8">
          {{formTitle}}
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="收件日期">
        <template slot-scope="scope">
          {{scope.row.maa07005}}
        </template>
      </el-table-column>
      <el-table-column label="使用位置">
        <template slot-scope="scope">
          {{scope.row.maa07004}}
        </template>
      </el-table-column>
      <el-table-column label="供貨廠商">
        <template slot-scope="scope">
          {{scope.row.maa07007}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa07008}}
        </template>
      </el-table-column>
      <el-table-column label="試驗日期">
        <template slot-scope="scope">
          {{scope.row.maa07006}}
        </template>
      </el-table-column>
      <el-table-column label="降伏強度合格">
        <template slot-scope="scope">
          {{scope.row.maa07013}}
        </template>
      </el-table-column>
      <el-table-column label="抗拉強度合格">
        <template slot-scope="scope">
          {{scope.row.maa07015}}
        </template>
      </el-table-column>
      <el-table-column label="伸長率合格">
        <template slot-scope="scope">
          {{scope.row.maa07017}}
        </template>
      </el-table-column>
      <el-table-column label="外觀試驗合格">
        <template slot-scope="scope">
          {{scope.row.maa07019}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工程名稱" >{{projectName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="使用位置" prop="maa07004" >
              <el-input v-model="form.maa07004" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收件日期" prop="maa07005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa07005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="供貨廠商" prop="maa07007" >
                <el-select  v-model="form.maa07007" placeholder="請選擇">
                  <el-option
                    v-for="item in maa07007List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="數量" prop="maa07008" >
              <el-input v-model="form.maa07008" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="規格" prop="maa07010" >
              <el-input v-model="form.maa07010" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="直徑(mm)" prop="maa07011" >
              <el-input v-model="form.maa07011" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="試樣組數" prop="maa07009" >
              <el-input v-model="form.maa07009" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試驗日期" prop="maa07006" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa07006" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="降伏強度" prop="maa07012" >
              <el-input v-model="form.maa07012" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格判定" prop="maa07013" >
              <el-input v-model="form.maa07013" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="抗拉強度" prop="maa07014" >
              <el-input v-model="form.maa07014" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格判定" prop="maa07015" >
              <el-input v-model="form.maa07015" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="伸長率" prop="maa07016" >
              <el-input v-model="form.maa07016" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格判定" prop="maa07017" >
              <el-input v-model="form.maa07017" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="外觀試驗" prop="maa07018" >
              <el-input v-model="form.maa07018" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格判定" prop="maa07019" >
              <el-input v-model="form.maa07019" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa07020" >
              <el-input v-model="form.maa07020" maxlength="200"></el-input>
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

<script src="./maa07.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

