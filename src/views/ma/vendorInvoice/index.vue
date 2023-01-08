<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">請選擇 工程案 : 
          <el-select v-model="listQuery.projectId" size="mini" placeholder="工程案名稱">
            <el-option
              v-for="item in projectList"
              :key="item.maa00002"
              :label="item.maa00004"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <!-- <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
          -->  
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" size="mini"  @click.native="invoiceList">廠商各期請款表</el-button>
          <el-button type="primary" size="mini"  @click.native="invoiceList">放款期別明細表</el-button>
          <el-button type="primary" size="mini"  @click.native="invoiceList">發票條件及代墊扣款</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column label="統一編號" :min-width="66">
        <template slot-scope="scope">
          {{scope.row.maa02022}}
        </template>
      </el-table-column>
      <el-table-column label="包商名稱">
        <template slot-scope="scope">
          {{scope.row.maa02015}}
        </template>
      </el-table-column>
      <el-table-column label="連絡人">
        <template slot-scope="scope">
          {{scope.row.maa02019}}
        </template>
      </el-table-column>
      <el-table-column label="連絡電話">
        <template slot-scope="scope">
          {{scope.row.maa02020}}
        </template>
      </el-table-column>
      <el-table-column label="開始放款日">
        <template slot-scope="scope">
          {{scope.row.maa02084}}
        </template>
      </el-table-column>
      <el-table-column label="最後放款日">
        <template slot-scope="scope">
          {{scope.row.maa02085}}
        </template>
      </el-table-column>
      <el-table-column label="尾款結清日">
        <template slot-scope="scope">
          {{scope.row.maa02086}}
        </template>
      </el-table-column>
      <el-table-column label="保固金">
        <template slot-scope="scope">
          {{scope.row.maa02089}}
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
        <el-button size="mini" @click.native="setInvoice(scope.row.id,scope.row.maa02015)">工程請款單</el-button>
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
            <el-form-item label="統一編號" prop="maa02011">
              <el-input v-model="form.maa02011" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包商編號" prop="maa02003">
              <el-input v-model="form.maa02003" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包商名稱" prop="maa02004">
              <el-input v-model="form.maa02004" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="連絡人" prop="maa02008">
              <el-input v-model="form.maa02008" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="連絡電話" prop="maa02009">
              <el-input v-model="form.maa02009" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行動電話" prop="maa02010">
              <el-input v-model="form.maa02010" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="負責人" prop="maa02005">
              <el-input v-model="form.maa02005" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="負責人電話" prop="maa02006">
              <el-input v-model="form.maa02006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="負責人行動電話" prop="maa02007">
              <el-input v-model="form.maa02007" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="公司地址" prop="maa02012">
              <el-input v-model="form.maa02012" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司電話1" prop="maa02013">
              <el-input v-model="form.maa02013" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="通訊地址" prop="maa02017">
              <el-input v-model="form.maa02017" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司電話2" prop="maa02014">
              <el-input v-model="form.maa02014" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="發票地址" prop="maa02018">
              <el-input v-model="form.maa02018" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司傳真" prop="maa02015">
              <el-input v-model="form.maa02015" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="24">
            <el-form-item label="備註" prop="maa02089">
              <el-input v-model="form.maa02089" maxlength="200"></el-input>
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

<script src="./vendorInvoice.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

