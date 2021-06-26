<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selSlb10004" size="mini" placeholder="請輸入銷售案名稱"></el-input>
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
          <el-button type="info" size="mini" icon="el-icon-info" @click.native="deal">成交明細</el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click.native="again">回籠明細</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{scope.row.slb10002}}
        </template>
      </el-table-column>
      <el-table-column label="銷售案名稱">
        <template slot-scope="scope">
          {{scope.row.slb10005}}
        </template>
      </el-table-column>
      <el-table-column label="今日成交戶數">
        <template slot-scope="scope">
          {{scope.row.slb10013}}
        </template>
      </el-table-column>
      <el-table-column label="今日成交金額(萬)">
        <template slot-scope="scope">
          {{scope.row.slb10014/10000}}
        </template>
      </el-table-column>
      <el-table-column label="今日簽約戶數">
        <template slot-scope="scope">
          {{scope.row.slb10032}}
        </template>
      </el-table-column>
      <el-table-column label="今日簽約金額">
        <template slot-scope="scope">
          {{scope.row.slb10033}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="銷售案代號" prop="slb10004">
              <el-select  v-model="form.slb10004" placeholder="請選擇" style="width:80%">
                <el-option
                  v-for="item in slb10004List"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="天氣" prop="slb10003">
              <el-select  v-model="form.slb10003" placeholder="請選擇" >
                <el-option
                  v-for="item in slb10003List"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="24">
            <el-form-item label="媒體方向" prop="slb10008">
              <el-input v-model="form.slb10008" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="工地來人數" prop="slb10009">
              <el-input v-model="form.slb10009" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回籠" prop="slb10011">
              <el-input v-model="form.slb10011" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工地來電數" prop="slb10010">
              <el-input v-model="form.slb10010" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出勤" prop="slb10012">
              <el-select  v-model="form.slb10012" placeholder="請選擇" >
                <el-option
                  v-for="item in slb10012List"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
<!--
        <el-row > 
          <el-col :span="24"  style="border: 1px solid black;" justify="center" align="middle">
            <label>成交明細</label><br>
          </el-col>
        </el-row>
        <div v-for="(v,i) in form.dealList" :key="i">
        <el-row style="border: 1px solid black;" type="flex" justify="center" align="middle">
          <el-col :span="3">
            <label>&nbsp;&nbsp;編號{{i+1}}</label>
            <el-button type="text" class="delete-btn" icon="el-icon-delete" size="mini" @click="deleteDeal(v)"></el-button>
          </el-col>
          <el-col :span="7">
            <label>棟別</label>
            <el-select  v-model="v.slb11004" placeholder="請選擇" style="width:80%">
              <el-option
                v-for="item in slb11004List"
                :key="item.key"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="7">
            <label>總金額</label>
            <el-input v-model="v.slb11006" style="width:100px" maxlength="5"></el-input>萬
          </el-col>
          <el-col :span="7">
            <label>訂金</label>
            <el-input v-model="v.slb11007" style="width:100px" maxlength="5"></el-input>萬
          </el-col>
        </el-row>
        </div>
        <el-button class="add-btn btn" type="text" icon="el-icon-plus" @click="addDeal">增加成交明細輸入項</el-button>
-->        
        


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

<script src="./slb10.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

