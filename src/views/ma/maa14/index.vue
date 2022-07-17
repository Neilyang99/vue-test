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

      <el-table-column label="出工日期">
        <template slot-scope="scope">
          {{scope.row.maa14004}}
        </template>
      </el-table-column>
      <el-table-column label="臨時工姓名">
        <template slot-scope="scope">
          {{scope.row.maa14003}}
        </template>
      </el-table-column>
      <el-table-column label="天數">
        <template slot-scope="scope">
          {{scope.row.maa14007}}
        </template>
      </el-table-column>
      <el-table-column label="備註">
        <template slot-scope="scope">
          {{scope.row.maa14009}}
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
            <el-form-item label="出工日期" prop="maa14004" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa14004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="天數" prop="maa14007" >
              <el-input v-model="form.maa14007" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="臨時工姓名" prop="maa14003" >
              <el-autocomplete
                v-model="form.maa14003"
                :fetch-suggestions="querySearch"
                size="small"
              ></el-autocomplete>  
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa14009" >
              <el-input v-model="form.maa14009" maxlength="200"></el-input>
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

<script src="./maa14.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

