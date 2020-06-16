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
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="洽詢日期">
        <template slot-scope="scope">
          {{scope.row.sla11004}}
        </template>
      </el-table-column>
      <el-table-column label="洽詢類別">
        <template slot-scope="scope">
          {{scope.row.sla11003}}
        </template>
      </el-table-column>
      <el-table-column label="帶看戶別">
        <template slot-scope="scope">
          {{scope.row.sla11005}}
        </template>
      </el-table-column>
      <el-table-column label="事項紀錄">
        <template slot-scope="scope">
          {{scope.row.sla11006}}
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col>
            <el-form-item label="洽詢日期" prop="sla11004" >{{form.sla11004}}
              
            </el-form-item>
          </el-col>
          <el-form-item label="洽詢類別"  >
              <el-select  v-model="form.building" filterable placeholder="请选择">
                <el-option
                  v-for="item in buildingList"
                  :key="item.id"
                  :label="item.sla11003"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-col :span="20">
            <el-form-item label="洽詢紀錄" prop="sla11006" >
              <el-input v-model="form.sla11006" type="textarea"></el-input>
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
      :page-sizes="[10, 20, 50, 100,500]"
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

<script src="./visitorLog.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

