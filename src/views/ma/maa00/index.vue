<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selMaa00004" size="mini" placeholder="請輸入工程案名稱"></el-input>
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
      <el-table-column label="工程案編號">
        <template slot-scope="scope">
          {{scope.row.maa00002}}
        </template>
      </el-table-column>
      <el-table-column label="工程案名稱">
        <template slot-scope="scope">
          {{scope.row.maa00004}}
        </template>
      </el-table-column>
      <el-table-column label="預計開工日">
        <template slot-scope="scope">
          {{scope.row.maa00007}}
        </template>
      </el-table-column>
      <el-table-column label="實際開工日">
        <template slot-scope="scope">
          {{scope.row.maa00008}}
        </template>
      </el-table-column>
      <el-table-column label="預計完工日">
        <template slot-scope="scope">
          {{scope.row.maa00009}}
        </template>
      </el-table-column>
      <el-table-column label="實際完工日">
        <template slot-scope="scope">
          {{scope.row.maa00010}}
        </template>
      </el-table-column>
      <el-table-column label="工期(月)">
        <template slot-scope="scope">
          {{scope.row.maa00011}}
        </template>
      </el-table-column>
      <el-table-column label="預算總工程款">
        <template slot-scope="scope">
          {{scope.row.maa00027}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="setBudget(scope.row.id,scope.row.maa00004)">設定工程預算</el-button>
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
            <el-form-item label="工程案編號" prop="maa00002">
              <el-input v-model="form.maa00002" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="基地地號" prop="maa00006">
              <el-input v-model="form.maa00006" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="業主名稱" prop="maa00035">
              <el-input v-model="form.maa00035" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="地段" prop="maa00036">
              <el-input v-model="form.maa00036" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="工程案名稱" prop="maa00004">
              <el-input v-model="form.maa00004" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="會計科目" prop="maa00022">
              <el-input v-model="form.maa00022" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>    
          <el-col :span="8">
            <el-form-item label="預計開工日期" prop="maa00007">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa00007" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="實際開工日期" prop="maa00008">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa00008" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工期(日)" prop="maa00011">
              <el-input v-model="form.maa00011"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="預計完工日期" prop="maa00009">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa00009" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="實際完工日期" prop="maa00010">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa00010" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="施工天數" prop="maa00012">
              <el-input v-model="form.maa00012"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="工地主任" prop="maa00015">
              <el-input v-model="form.maa00015"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地主任電話" prop="maa00016">
              <el-input v-model="form.maa00016"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地主任行動電話" prop="maa00017">
              <el-input v-model="form.maa00017"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="工地助理" prop="maa00019">
              <el-input v-model="form.maa00019"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地助理電話" prop="maa00020">
              <el-input v-model="form.maa00020"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地助理行動電話" prop="maa00021">
              <el-input v-model="form.maa00021"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>    
          <el-col :span="8">
            <el-form-item label="建物構造" prop="maa00024">
              <el-input v-model="form.maa00024" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="總樓地板面積" prop="maa00025">
              <el-input v-model="form.maa00025"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>    
          <el-col :span="8">
            <el-form-item label="預算總工程款" prop="maa00027">
              <el-input v-model="form.maa00027"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="結算總工程款" prop="maa00028">
              <el-input v-model="form.maa00028"></el-input>
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

<script src="./maa00.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

