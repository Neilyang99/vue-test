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
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.maa11005}}
        </template>
      </el-table-column>
      <el-table-column label="澆置位置">
        <template slot-scope="scope">
          {{scope.row.maa11004}}
        </template>
      </el-table-column>
      <el-table-column label="混凝土強度（psi）">
        <template slot-scope="scope">
          {{scope.row.maa11006}}
        </template>
      </el-table-column>
      <el-table-column label="供料廠商">
        <template slot-scope="scope">
          {{scope.row.maa11007}}
        </template>
      </el-table-column>
      
      <el-table-column label="實際使用量">
        <template slot-scope="scope">
          {{scope.row.maa11008}}
        </template>
      </el-table-column>
      <el-table-column label="實際使用量累計">
        <template slot-scope="scope">
          {{scope.row.maa11008}}
        </template>
      </el-table-column>
      <el-table-column label="預進數量">
        <template slot-scope="scope">
          {{scope.row.maa11009}}
        </template>
      </el-table-column>
      <el-table-column label="誤差情形">
        <template slot-scope="scope">
          {{scope.row.maa11010}}
        </template>
      </el-table-column>
      <el-table-column label="誤差比例">
        <template slot-scope="scope">
          {{scope.row.maa11011}}
        </template>
      </el-table-column>
      <el-table-column label="原因分析">
        <template slot-scope="scope">
          {{scope.row.maa11012}}
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
            <el-form-item label="澆置位置" prop="maa11004" >
              <el-input v-model="form.maa11004" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期" prop="maa11005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa11005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="供料廠商" prop="maa11007" >
                <el-select  v-model="form.maa11007" placeholder="請選擇">
                  <el-option
                    v-for="item in maa11007List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="混凝土強度（psi）" prop="maa11006" >
              <el-input v-model="form.maa11006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="實際使用量" prop="maa11008" >
              <el-input v-model="form.maa11008" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預進數量" prop="maa11009" >
              <el-input v-model="form.maa11009" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="誤差情形" prop="maa11010" >
              <el-input v-model="form.maa11010" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="誤差比例" prop="maa11011" >
              <el-input v-model="form.maa11011" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="誤差＞2.5％原因分析" prop="maa11012" >
              <el-input v-model="form.maa11012" maxlength="200"></el-input>
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

<script src="./maa11.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

