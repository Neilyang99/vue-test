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
      <el-table-column label="大類別">
        <template slot-scope="scope">
          {{scope.row.maa01a010}}
        </template>
      </el-table-column>
      <el-table-column label="小類別">
        <template slot-scope="scope">
          {{scope.row.maa01a011}}
        </template>
      </el-table-column>
      <el-table-column label="項目">
        <template slot-scope="scope">
          {{scope.row.maa01a013}}
        </template>
      </el-table-column>
      <el-table-column label="單位">
        <template slot-scope="scope">
          {{scope.row.maa01a014}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa01a015}}
        </template>
      </el-table-column>
      <el-table-column label="單價">
        <template slot-scope="scope">
          {{scope.row.maa01a016}}
        </template>
      </el-table-column>
      <el-table-column label="複價">
        <template slot-scope="scope">
          {{scope.row.maa01a017}}
        </template>
      </el-table-column>
      <el-table-column label="排序">
        <template slot-scope="scope">
          {{scope.row.maa01a006}}
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
            <el-form-item label="大類別: ">
              <label>{{lv1Name}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="小類別: ">
              <label>{{lv2Name}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="項目"  >
              <el-select  v-model="form.maa01a005" filterable placeholder="請選擇">
                <el-option
                  v-for="item in budgetList"
                  :key="item.itemId"
                  :label="item.itemName"
                  :value="item.itemId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>   
          <el-col :span="8">
            <el-form-item label="數量" prop="maa01a015">
              <el-input v-model="form.maa01a015" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="單價" prop="maa01a016">
              <el-input v-model="form.maa01a016" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="複價" >
              {{form.maa01a015*form.maa01a016}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>   
          <el-col :span="8">
            <el-form-item label="單位" prop="maa01a014">
              <el-input v-model="form.maa01a014" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="排序" prop="maa01a006">
              <el-input v-model="form.maa01a006"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!-- 
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
-->
  </div>
</template>

<script src="./maa01a.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

