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
      <el-row>
        <el-col :span="24">
          期別: {{period}}
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row>
        <el-col :span="24">******* 收入 *******
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange" :show-summary="true" :summary-method="getTotal">

      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.maa17004}}
        </template>
      </el-table-column>
      <el-table-column label="來源">
        <template slot-scope="scope">
          {{scope.row.maa17006Name}}
        </template>
      </el-table-column>
      <el-table-column label="金額" prop="num">
        <template slot-scope="scope">
          {{scope.row.maa17005}}
        </template>
      </el-table-column>
      <el-table-column label="備註">
        <template slot-scope="scope">
          {{scope.row.maa17007}}
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="block">
      <el-row>
        <el-col :span="24">******* 支出 *******
        </el-col>
      </el-row>
    </div>
    <el-table :data="list2" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange" :show-summary="true" :summary-method="getTotal">

      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.maa17004}}
        </template>
      </el-table-column>
      <el-table-column label="證明">
        <template slot-scope="scope">
          {{scope.row.maa17006Name}}
        </template>
      </el-table-column>
      <el-table-column label="支出金額" prop="num">
        <template slot-scope="scope">
          {{scope.row.maa17005}}
        </template>
      </el-table-column>
      <el-table-column label="內容說明">
        <template slot-scope="scope">
          {{scope.row.maa17007}}
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
            <el-form-item label="日期" prop="maa17004" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa17004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="來源/證明" prop="maa17006" >
              <el-select  v-model="form.maa17006" placeholder="請選擇">
                  <el-option
                    v-for="item in maa17006List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金額" prop="maa17005" >
              <el-input v-model="form.maa17005" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa17007" >
              <el-input v-model="form.maa17007" maxlength="200"></el-input>
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

<script src="./maa17.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

