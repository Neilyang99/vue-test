<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
      </el-col>
    </el-row>
    <br>
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.name" size="mini" placeholder="請輸入項目名稱"></el-input>
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
      <el-table-column label="大類別">
        <template >
          {{firstTypeName}}
        </template>
      </el-table-column>
      <el-table-column label="小類別">
        <template >
          {{secTypeName}}
        </template>
      </el-table-column>
      <el-table-column label="項目代號">
        <template slot-scope="scope">
          {{scope.row.maa92006}}
        </template>
      </el-table-column>
      <el-table-column label="項目名稱">
        <template slot-scope="scope">
          {{scope.row.maa92007}}
        </template>
      </el-table-column>
      <el-table-column label="單位">
        <template slot-scope="scope">
          {{scope.row.maa92008}}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{scope.row.maa92012}}
        </template>
      </el-table-column>
      <el-table-column label="啟用">
        <template slot-scope="scope">
          {{scope.row.maa92013}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="65%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="大類別名稱: ">
              <label>{{firstTypeName}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="小類別名稱: ">
              <label>{{secTypeName}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="項目代號" prop="maa92006">
              <el-input v-model="form.maa92006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>   
          <el-col :span="16">
            <el-form-item label="項目名稱" prop="maa92007">
              <el-input v-model="form.maa92007" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="單位" prop="maa92008">
              <el-input v-model="form.maa92008"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預設數量" prop="maa92009">
              <el-input v-model="form.maa92009"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預設單價" prop="maa92010">
              <el-input v-model="form.maa92010"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="備註" prop="maa92011">
              <el-input v-model="form.maa92011"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="排序" prop="maa92012">
              <el-input v-model="form.maa92012"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
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

<script src="./maa92.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

