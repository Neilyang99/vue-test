<template>
  <div class="app-container">
    <div class="block">
      
    </div>

    <div class="block">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row  >
          <el-col :span="8">
            <el-form-item label="外包商：" > {{this.vendorName}} </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="工程案：" > {{this.prjName}} </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合約編號：" prop="maa020087">
              <el-input v-model="form.maa020087" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保固金：" prop="maa02089">
              <el-input v-model="form.maa02089" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合約金額：" prop="maa02088">
              <el-input v-model="form.maa02088" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="text-align: center;">
          <el-form-item >
            <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
            <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
          </el-form-item>
        </div>
      </el-form>

      
    </div>


    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column type="selection"></el-table-column>

      <el-table-column label="大類別">
        <template slot-scope="scope">
          {{scope.row.maa01a010}}
        </template>
      </el-table-column>
      <el-table-column label="小類別">
        <template slot-scope="scope">
          {{scope.row.maa01a011}}
        </template>
      </el-table-column>
      <el-table-column label="項目" :min-width="150">
        <template slot-scope="scope">
          {{scope.row.maa01a013}}
        </template>
      </el-table-column>
      <el-table-column label="單位">
        <template slot-scope="scope">
          {{scope.row.maa01a014}}
        </template>
      </el-table-column>
      <el-table-column label="預計數量">
        <template slot-scope="scope">
          {{scope.row.maa01a015}}
        </template>
      </el-table-column>
      <el-table-column label="預計單價">
        <template slot-scope="scope">
          {{scope.row.maa01a016}}
        </template>
      </el-table-column>
      <el-table-column label="複價">
        <template slot-scope="scope">
          {{scope.row.maa01a017}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script src="./outsourcingItem.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

