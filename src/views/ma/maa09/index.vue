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

      <el-table-column label="填表日期">
        <template slot-scope="scope">
          {{scope.row.maa09003}}
        </template>
      </el-table-column>
      <el-table-column label="填表人">
        <template slot-scope="scope">
          {{scope.row.maa09005}}
        </template>
      </el-table-column>
      <el-table-column label="區別">
        <template slot-scope="scope">
          {{scope.row.maa09004}}
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
            <el-form-item label="填表日期" prop="maa09003" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa09003" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="區別" prop="maa09004" >
              <el-input v-model="form.maa09004" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="24">
            <el-form-item label="工作memo" prop="maa09006" >
              <el-input v-model="form.maa09006" type='textarea' rows="5" maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>    
          <el-col :span="24">
            <el-form-item label="重要事項" prop="maa09007" >
              <el-input v-model="form.maa09007" type='textarea' rows="5" maxlength="500"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa09008" >
              <el-input v-model="form.maa09008" maxlength="200"></el-input>
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

<script src="./maa09.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

