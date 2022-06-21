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
      <el-table-column label="進料日期">
        <template slot-scope="scope">
          {{scope.row.maa10005}}
        </template>
      </el-table-column>
      <el-table-column label="供料廠商">
        <template slot-scope="scope">
          {{scope.row.maa10007}}
        </template>
      </el-table-column>
      <el-table-column label="項目">
        <template slot-scope="scope">
          {{scope.row.maa10006Name}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa10008}}
        </template>
      </el-table-column>
      <el-table-column label="單位">
        <template slot-scope="scope">
          {{scope.row.maa10010}}
        </template>
      </el-table-column>
      <el-table-column label="使用位置">
        <template slot-scope="scope">
          {{scope.row.maa10004}}
        </template>
      </el-table-column>
      <el-table-column label="單價">
        <template slot-scope="scope">
          {{scope.row.maa10009}}
        </template>
      </el-table-column>
      <el-table-column label="複價">
        <template slot-scope="scope">
          {{scope.row.maa10008*scope.row.maa10009}}
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
            <el-form-item label="使用位置" prop="maa10004" >
              <el-input v-model="form.maa10004" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="進料日期" prop="maa10005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa10005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="供料廠商" prop="maa10007" >
                <el-select  v-model="form.maa10007" placeholder="請選擇">
                  <el-option
                    v-for="item in maa10007List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="項目" prop="maa10006" >
                <el-select  v-model="form.maa10006" placeholder="請選擇">
                  <el-option
                    v-for="item in maa10006List"
                    :key="item.key"
                    :label="item.name"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="數量" prop="maa10008" >
              <el-input v-model="form.maa10008" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="單位" prop="maa10010" >
              <el-input v-model="form.maa10010" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="單價" prop="maa10009" >
              <el-input v-model="form.maa10009" maxlength="8"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa10012" >
              <el-input v-model="form.maa10012" maxlength="200"></el-input>
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

<script src="./maa10.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

