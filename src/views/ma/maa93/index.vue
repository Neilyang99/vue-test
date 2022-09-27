<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selMaa93004" size="mini" placeholder="請輸入外包商名稱"></el-input>
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
      @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column label="統一編號" :min-width="66">
        <template slot-scope="scope">
          {{scope.row.maa93011}}
        </template>
      </el-table-column>
      <el-table-column label="包商編號">
        <template slot-scope="scope">
          {{scope.row.maa93003}}
        </template>
      </el-table-column>
      <el-table-column label="包商名稱">
        <template slot-scope="scope">
          {{scope.row.maa93004}}
        </template>
      </el-table-column>
      <el-table-column label="連絡人">
        <template slot-scope="scope">
          {{scope.row.maa93008}}
        </template>
      </el-table-column>
      <el-table-column label="連絡電話">
        <template slot-scope="scope">
          {{scope.row.maa93009}}
        </template>
      </el-table-column>
      <el-table-column label="通訊地址">
        <template slot-scope="scope">
          {{scope.row.maa93017}}
        </template>
      </el-table-column>
      <el-table-column label="建檔日期" :min-width="65">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="開始放款日">
        <template slot-scope="scope">
          {{scope.row.maa93081}}
        </template>
      </el-table-column>
      <el-table-column label="最後放款日">
        <template slot-scope="scope">
          {{scope.row.maa93082}}
        </template>
      </el-table-column>
      <el-table-column label="尾款結清日">
        <template slot-scope="scope">
          {{scope.row.maa93083}}
        </template>
      </el-table-column>
      <el-table-column label="保固金">
        <template slot-scope="scope">
          {{scope.row.maa93086}}
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="setBudget(scope.row.id,scope.row.maa93004)">設定承包項目</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="統一編號" prop="maa93011">
              <el-input v-model="form.maa93011" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包商編號" prop="maa93003">
              <el-input v-model="form.maa93003" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包商名稱" prop="maa93004">
              <el-input v-model="form.maa93004" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="連絡人" prop="maa93008">
              <el-input v-model="form.maa93008" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="連絡電話" prop="maa93009">
              <el-input v-model="form.maa93009" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行動電話" prop="maa93010">
              <el-input v-model="form.maa93010" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="負責人" prop="maa93005">
              <el-input v-model="form.maa93005" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="負責人電話" prop="maa93006">
              <el-input v-model="form.maa93006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="負責人行動電話" prop="maa93007">
              <el-input v-model="form.maa93007" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="公司地址" prop="maa93012">
              <el-input v-model="form.maa93012" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司電話1" prop="maa93013">
              <el-input v-model="form.maa93013" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="通訊地址" prop="maa93017">
              <el-input v-model="form.maa93017" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司電話2" prop="maa93014">
              <el-input v-model="form.maa93014" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="發票地址" prop="maa93018">
              <el-input v-model="form.maa93018" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司傳真" prop="maa93015">
              <el-input v-model="form.maa93015" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="24">
            <el-form-item label="備註" prop="maa93089">
              <el-input v-model="form.maa93089" maxlength="200"></el-input>
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

<script src="./maa93.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

