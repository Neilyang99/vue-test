<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <h3  style="border-bottom: 1px solid black;" justify="center" align="middle">回 籠 明 細 表</h3>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add" :disabled="today != pDate">{{ $t('button.add') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit" :disabled="today != pDate">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove" :disabled="today != pDate">{{ $t('button.delete') }}</el-button>
          <span v-if="today != pDate? true:false">注意! 非今日報表不可修改。</span>
        </el-col>
      </el-row>
    </div>
    
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="銷售案名稱" >
        <template >
          {{projectName}}
        </template>
      </el-table-column>
      <el-table-column label="銷售案棟別id" v-if="false">
        <template slot-scope="scope">
          {{scope.row.slb12008}}
        </template>
      </el-table-column>
      <el-table-column label="棟別">
        <template slot-scope="scope">
          {{scope.row.slb12004}}
        </template>
      </el-table-column>
      <el-table-column label="戶號">
        <template slot-scope="scope">
          {{scope.row.slb12005}}
        </template>
      </el-table-column>
      <el-table-column label="備註">
        <template slot-scope="scope">
          {{scope.row.slb12006}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="棟別"  >
                <el-select  v-model="form.slb12004" placeholder="請選擇" >
                  <el-option
                    v-for="item in slb12004List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" v-if="isAdd==true?false:true">
            <el-form-item label="戶號" >
              {{form.slb12005}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="slb12006" >
              <el-input v-model="form.slb12006" maxlength="200"></el-input>
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

<script src="./slb12.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

