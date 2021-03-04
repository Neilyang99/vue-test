<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selSla30004" size="mini" placeholder="請輸入行政區"></el-input>
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
      <el-table-column label="行政區">
        <template slot-scope="scope">
          {{scope.row.sla30004}}
        </template>
      </el-table-column>
      <el-table-column label="土地區分">
        <template slot-scope="scope">
          {{scope.row.sla30006}}
        </template>
      </el-table-column>
      <el-table-column label="投資興建">
        <template slot-scope="scope">
          {{scope.row.sla30007}}
        </template>
      </el-table-column>
      <el-table-column label="土地面積">
        <template slot-scope="scope">
          {{scope.row.sla30008}}
        </template>
      </el-table-column>
      <el-table-column label="推出日期">
        <template slot-scope="scope">
          {{scope.row.sla30013}}-{{scope.row.sla30014}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="填表日期" prop="sla30002">
              <el-input v-model="form.sla30002"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="填寫人" prop="sla30003">
              <el-input v-model="form.sla30003"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="行政區" prop="sla30004">
              <el-input v-model="form.sla30004"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="推出日期" prop="sla00013">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla30013" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工地位置" prop="sla30025">
              <el-input v-model="form.sla30025"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="土地區分" prop="">
              <el-input v-model="form.sla30006"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公開日期" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="產品規劃" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="投資興建" prop="">
              <el-input v-model="form.sla30007"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="樓層數" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="面臨道路" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="土地面積" prop="">
              <el-input v-model="form.sla30008"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="總建坪" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建蔽率" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="總銷金額" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="土地價格" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公設比" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="廣企公司" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="銷售公司" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="預計完工" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="8">
            <el-form-item label="建築規劃" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承造人" prop="">
              <el-input v-model="form.sla30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="景觀設計" prop="">
              <el-input v-model="form.sla30"></el-input>
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

<script src="./sla30.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

