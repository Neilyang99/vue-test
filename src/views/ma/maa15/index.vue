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
          <el-button type="info" size="mini"  @click.native="accountConfirm">會計確認</el-button>
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

      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.maa15003}}
        </template>
      </el-table-column>
      <el-table-column label="責任歸屬">
        <template slot-scope="scope">
          {{scope.row.maa15004}}
        </template>
      </el-table-column>
      <el-table-column label="扣款種類">
        <template slot-scope="scope">
          {{scope.row.maa15005}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa15006}}
        </template>
      </el-table-column>
      <el-table-column label="單位">
        <template slot-scope="scope">
          {{scope.row.maa15007}}
        </template>
      </el-table-column>
      <el-table-column label="單價">
        <template slot-scope="scope">
          {{scope.row.maa15009}}
        </template>
      </el-table-column>
      <el-table-column label="複價">
        <template slot-scope="scope">
          {{scope.row.maa15006*scope.row.maa15009}}
        </template>
      </el-table-column>
      <el-table-column label="未扣代墊款">
        <template slot-scope="scope" v-if="scope.row.maa15010==''">
          {{scope.row.maa15006*scope.row.maa15009}}
        </template>
      </el-table-column>
      <el-table-column label="扣回日期">
        <template slot-scope="scope">
          {{scope.row.maa15010}}
        </template>
      </el-table-column>
      <el-table-column label="會計確認否">
        <template slot-scope="scope" v-if="scope.row.maa15015 != ''">
          Y
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
            <el-form-item label="日期" prop="maa15003" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa15003" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="責任歸屬" prop="maa15004" >
              <el-input v-model="form.maa15004" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="扣款種類" prop="maa15005" >
              <el-input v-model="form.maa15005" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="數量" prop="maa15006" >
              <el-input v-model="form.maa15006" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="單價" prop="maa15009" >
              <el-input v-model="form.maa15009" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="複價"  >
              {{form.maa15009*form.maa15006}}
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="單位" prop="maa15007" >
              <el-input v-model="form.maa15007" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="8">
            <el-form-item label="扣回日期" prop="maa15010" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa15010" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未扣代墊款"  v-if="form.maa15010 != ''" >
              {{ 0 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未扣代墊款"  v-if="form.maa15010 == ''" >
              {{ form.maa15009*form.maa15006 }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="內容" prop="maa15008" >
              <el-input v-model="form.maa15008" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa15012" >
              <el-input v-model="form.maa15012" maxlength="200"></el-input>
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

<script src="./maa15.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

