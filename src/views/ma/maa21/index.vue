<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selmaa21003" size="mini" placeholder="請挑選工程案"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="listQuery.selmaa21004" size="mini" placeholder="請挑選請款公司"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="listQuery.selmaa21002" size="mini" placeholder="請輸入合約編號"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
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

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column label="合約編號">
        <template slot-scope="scope">
          {{scope.row.maa21002}}
        </template>
      </el-table-column>
      <el-table-column label="請款公司">
        <template slot-scope="scope">
          {{scope.row.maa21004Name}}
        </template>
      </el-table-column>
      <el-table-column label="版本">
        <template slot-scope="scope">
          {{scope.row.maa21004}}
        </template>
      </el-table-column>
      <el-table-column label="合約日期">
        <template slot-scope="scope">
          {{scope.row.maa21006}}
        </template>
      </el-table-column>
      <el-table-column label="合約金額">
        <template slot-scope="scope">
          {{scope.row.maa21015}}
        </template>
      </el-table-column>
      <el-table-column label="合約狀態">
        <template slot-scope="scope">
          {{scope.row.maa21020}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="view2nd(scope.row.id,scope.row.maa21003)">設定預算小類別</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="46%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="類別代號" prop="maa21002">
              <el-input v-model="form.maa21002" maxlength="20"></el-input>
              <el-button type="success" size="mini" icon="el-icon-plus" @click.native="selVendor">請款公司</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>   
          <el-col :span="16">
            <el-form-item label="類別名稱" prop="maa21003">
              <el-input v-model="form.maa21003" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="排序" prop="maa21004">
              <el-input v-model="form.maa21004"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog
      :title="Test"
      :visible.sync="formTest"
      width="26%">
      <div>This is Test</div>
      <el-button type="success" size="mini" icon="el-icon-plus" @click.native="formTest = false">XXX公司</el-button>
    </el-dialog>

    <el-pagination 
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        :current-page.sync="listQuery.page"
        @size-change="changeSize"
        @current-change="fetchPage"
        @prev-click="fetchPrev"
        @next-click="fetchNext">
    </el-pagination>
  </div>
</template>

<script src="./maa21.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

