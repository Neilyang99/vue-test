<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
      </el-col>
    </el-row>
    <br>
    <div class="block">
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
      <el-table-column label="工程案">
        <template >
          {{prjName}}
        </template>
      </el-table-column>
      <el-table-column label="大類別名稱">
        <template slot-scope="scope">
          {{scope.row.maa01010}}
        </template>
      </el-table-column>
      <el-table-column label="小類別名稱">
        <template slot-scope="scope">
          {{scope.row.maa01011}}
        </template>
      </el-table-column>
      <el-table-column label="預算金額">
        <template slot-scope="scope">
          {{scope.row.maa01012}}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{scope.row.maa01017}}
        </template>
      </el-table-column>
      <el-table-column label="啟用">
        <template slot-scope="scope">
          {{scope.row.maa01018}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="setBudget(scope.row.maa01003,scope.row.maa01004,scope.row.maa01010,scope.row.maa01011)">預算細項</el-button>
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
            <el-form-item label="工程案: ">
              <label>{{prjName}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="預算類別"  >
              <el-select  v-model="form.maa01004" filterable placeholder="請選擇">
                <el-option
                  v-for="item in budgetList"
                  :key="item.secId"
                  :label="item.secName"
                  :value="item.secId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>   
          <el-col :span="16">
            <el-form-item label="預算金額" prop="maa01012">
              {{ form.maa01012 }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="16">
            <el-form-item label="排序" prop="maa01017">
              <el-input v-model="form.maa01017"></el-input>
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

<script src="./maa01.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

