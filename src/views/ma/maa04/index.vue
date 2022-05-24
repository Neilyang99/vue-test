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

      <el-table-column label="澆置位置">
        <template slot-scope="scope">
          {{scope.row.maa04003}}
        </template>
      </el-table-column>
      <el-table-column label="強度(PSI)">
        <template slot-scope="scope">
          {{scope.row.maa04005}}
        </template>
      </el-table-column>
      <el-table-column label="澆置日期">
        <template slot-scope="scope">
          {{scope.row.maa04004}}
        </template>
      </el-table-column>
      <el-table-column label="供料廠商">
        <template slot-scope="scope">
          {{scope.row.maa04006}}
        </template>
      </el-table-column>
      <el-table-column label="取樣車號">
        <template slot-scope="scope">
          {{scope.row.maa04007}}
        </template>
      </el-table-column>
      <el-table-column label="取樣組數">
        <template slot-scope="scope">
          {{scope.row.maa04010}}
        </template>
      </el-table-column>
      <el-table-column label="取樣時間">
        <template slot-scope="scope">
          {{scope.row.maa04008}}:{{scope.row.maa04009}}
        </template>
      </el-table-column>      
      <el-table-column label="出貨坍度(cm)">
        <template slot-scope="scope">
          {{scope.row.maa04011}}
        </template>
      </el-table-column>
      <el-table-column label="試驗坍度(cm)">
        <template slot-scope="scope">
          {{scope.row.maa04012}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子1">
        <template slot-scope="scope">
          {{scope.row.maa04013}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子2">
        <template slot-scope="scope">
          {{scope.row.maa04014}}
        </template>
      </el-table-column>
      <el-table-column label="氯離子3">
        <template slot-scope="scope">
          {{scope.row.maa04015}}
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
            <el-form-item label="澆置位置" prop="maa04003" >
              <el-input v-model="form.maa04003" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="澆置日期" prop="maa04004" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa04004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="強度(PSI)" prop="maa04005" >
              <el-input v-model="form.maa04005" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="供料廠商" prop="maa04006" >
                <el-select  v-model="form.maa04006" placeholder="請選擇">
                  <el-option
                    v-for="item in maa04006List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="取樣車號" prop="maa04007" >
              <el-input v-model="form.maa04007" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="取樣組數" prop="maa04010" >
              <el-input v-model="form.maa04010" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="取樣時間" prop="maa04008" >
              <el-input v-model="form.maa04008" maxlength="2" style="width:60px;"></el-input> ：
              <el-input v-model="form.maa04009" maxlength="2" style="width:60px;"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="出貨坍度(cm)" prop="maa04011" >
              <el-input v-model="form.maa04011" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="試驗坍度(cm)" prop="maa04012" >
              <el-input v-model="form.maa04012" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="氯離子檢測1" prop="maa04013" >
              <el-input v-model="form.maa04013" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="氯離子檢測2" prop="maa04014" >
              <el-input v-model="form.maa04014" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="氯離子檢測3" prop="maa04015" >
              <el-input v-model="form.maa04015" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa04018" >
              <el-input v-model="form.maa04017" maxlength="200"></el-input>
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

<script src="./maa04.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

