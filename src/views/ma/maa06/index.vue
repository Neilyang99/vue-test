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
        <el-col :span="24">
          工程案名稱: {{projectName}}
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="澆置日期">
        <template slot-scope="scope">
          {{scope.row.maa06004}}
        </template>
      </el-table-column>
      <el-table-column label="澆置位置">
        <template slot-scope="scope">
          {{scope.row.maa06003}}
        </template>
      </el-table-column>
      <el-table-column label="供料廠商">
        <template slot-scope="scope">
          {{scope.row.maa06005}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa06006}}
        </template>
      </el-table-column>
      <el-table-column label="試樣組數">
        <template slot-scope="scope">
          {{scope.row.maa06007}}
        </template>
      </el-table-column>
      <el-table-column label="試樣編號">
        <template slot-scope="scope">
          {{scope.row.maa06008}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子含量1">
        <template slot-scope="scope">
          {{scope.row.maa06009}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子含量2">
        <template slot-scope="scope">
          {{scope.row.maa06010}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子含量3">
        <template slot-scope="scope">
          {{scope.row.maa06011}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子含量平均">
        <template slot-scope="scope">
          {{scope.row.maa06012}}
        </template>
      </el-table-column>
      <el-table-column label="合格">
        <template slot-scope="scope">
          {{scope.row.maa06013}}
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
          <el-col :span="8">
            <el-form-item label="澆置位置" prop="maa06003" >
              <el-input v-model="form.maa06003" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="澆置日期" prop="maa06004" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa06004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="供料廠商" prop="maa06005" >
                <el-select  v-model="form.maa06005" placeholder="請選擇">
                  <el-option
                    v-for="item in maa06005List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="數量" prop="maa06006" >
              <el-input v-model="form.maa06006" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試樣組數" prop="maa06007" >
              <el-input v-model="form.maa06007" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試樣編號" prop="maa06008" >
              <el-input v-model="form.maa06008" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="氯離子檢測1" prop="maa06009" >
              <el-input v-model="form.maa06009" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="氯離子檢測2" prop="maa06010" >
              <el-input v-model="form.maa06010" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="氯離子檢測3" prop="maa06011" >
              <el-input v-model="form.maa06011" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="氯離子檢測平均" prop="maa06012" >
              <el-input v-model="form.maa06012" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="檢測結果" prop="maa06013" >
              <el-input v-model="form.maa06013" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa06014" >
              <el-input v-model="form.maa06014" maxlength="200"></el-input>
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

<script src="./maa06.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

