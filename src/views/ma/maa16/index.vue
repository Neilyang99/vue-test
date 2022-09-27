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
          <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button> -->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
          <el-button type="info" size="mini"  @click.native="applyConfirm">請款確認</el-button>
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

      <el-table-column label="期別">
        <template slot-scope="scope">
          {{scope.row.maa16003}}
        </template>
      </el-table-column>
      <el-table-column label="收入合計">
        <template slot-scope="scope">
          {{scope.row.maa16005}}
        </template>
      </el-table-column>
      <el-table-column label="支出合計">
        <template slot-scope="scope">
          {{scope.row.maa16006}}
        </template>
      </el-table-column>
      <el-table-column label="餘額">
        <template slot-scope="scope">
          {{scope.row.maa16005-scope.row.maa16006}}
        </template>
      </el-table-column>
      <el-table-column label="申請日期">
        <template slot-scope="scope">
          {{scope.row.maa16014}}
        </template>
      </el-table-column>
      <el-table-column label="放款日期">
        <template slot-scope="scope">
          {{scope.row.maa16010}}
        </template>
      </el-table-column>
      
      <el-table-column label="請款確認否">
        <template slot-scope="scope" v-if="scope.row.maa16014 != ''">
          Y
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="viewDetail(scope.row.id, scope.row.maa16003)">明細紀錄</el-button>
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
            <el-form-item label="期別" prop="maa16003" >
              <el-input v-model="form.maa16003" maxlength="2" readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa16011" >
              <el-input v-model="form.maa16011" maxlength="200"></el-input>
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

<script src="./maa16.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

