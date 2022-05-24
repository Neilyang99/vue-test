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
          {{scope.row.maa03003}}
        </template>
      </el-table-column>
      <el-table-column label="澆置日期">
        <template slot-scope="scope">
          {{scope.row.maa03004}}
        </template>
      </el-table-column>
      <el-table-column label="供料廠商">
        <template slot-scope="scope">
          {{scope.row.maa03005}}
        </template>
      </el-table-column>
      <el-table-column label="抽磅車號">
        <template slot-scope="scope">
          {{scope.row.maa03006}}
        </template>
      </el-table-column>
      <el-table-column label="抽磅時間">
        <template slot-scope="scope">
          {{scope.row.maa03007}}:{{scope.row.maa03008}}
        </template>
      </el-table-column>
      <el-table-column label="供料完成時間">
        <template slot-scope="scope">
          {{scope.row.maa03009}}:{{scope.row.maa03010}}
        </template>
      </el-table-column>
      <el-table-column label="總重(KG)">
        <template slot-scope="scope">
          {{scope.row.maa03011}}
        </template>
      </el-table-column>
      <el-table-column label="空車(KG)">
        <template slot-scope="scope">
          {{scope.row.maa03012}}
        </template>
      </el-table-column>
      <el-table-column label="實重(KG)">
        <template slot-scope="scope">
          {{scope.row.maa03013}}
        </template>
      </el-table-column>
      <el-table-column label="出貨量(m3)">
        <template slot-scope="scope">
          {{scope.row.maa03014}}
        </template>
      </el-table-column>
      <el-table-column label="檢驗標準(KG)">
        <template slot-scope="scope">
          {{scope.row.maa03015}}
        </template>
      </el-table-column>
      <el-table-column label="判定結果">
        <template slot-scope="scope">
          {{scope.row.maa03016}}
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
            <el-form-item label="工程案" >{{projectName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="澆置位置" prop="maa03003" >
              <el-input v-model="form.maa03003" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="澆置日期" prop="maa03004" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa03004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抽磅車號" prop="maa03006" >
              <el-input v-model="form.maa03006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="供料廠商" prop="maa03005" >
                <el-select  v-model="form.maa03005" placeholder="請選擇">
                  <el-option
                    v-for="item in maa03005List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="抽磅時間" prop="maa03007" >
              <el-input v-model="form.maa03007" maxlength="2" style="width:60px;"></el-input> ：
              <el-input v-model="form.maa03008" maxlength="2" style="width:60px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供料完成時間" prop="maa03009" >
              <el-input v-model="form.maa03009" maxlength="2" style="width:60px;"></el-input> ：
              <el-input v-model="form.maa03010" maxlength="2" style="width:60px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="總重量(KG)" prop="maa03011" >
              <el-input v-model="form.maa03011" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="空車重(KG)" prop="maa03012" >
              <el-input v-model="form.maa03012" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="實際重量(KG)" prop="maa03013" >
              <el-input v-model="form.maa03013" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="該車出貨量(m3)" prop="maa03014" >
              <el-input v-model="form.maa03014" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="檢驗標準值(KG)" prop="maa03015" >
              <el-input v-model="form.maa03015" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="檢驗結果" prop="maa03016" >
              <el-input v-model="form.maa03016" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa03017" >
              <el-input v-model="form.maa03017" maxlength="200"></el-input>
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

<script src="./maa03.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

