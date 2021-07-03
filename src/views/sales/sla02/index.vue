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

      <el-table-column label="銷售案代號">
        <template slot-scope="scope">
          {{scope.row.sla02003}}
        </template>
      </el-table-column>
      <el-table-column label="車位編號">
        <template slot-scope="scope">
          {{scope.row.sla02004}}
        </template>
      </el-table-column>
      <el-table-column label="車位類別">
        <template slot-scope="scope">
          {{scope.row.sla02005Name}}
        </template>
      </el-table-column>
      <el-table-column label="車位類型">
        <template slot-scope="scope">
          {{scope.row.sla02006Name}}
        </template>
      </el-table-column>
      <el-table-column label="樓層數">
        <template slot-scope="scope">
          {{scope.row.sla02007}}
        </template>
      </el-table-column>
      <el-table-column label="車位購買類別">
        <template slot-scope="scope">
          {{scope.row.sla02008Name}}
        </template>
      </el-table-column>
      <el-table-column label="狀態" v-if="false">
        <template slot-scope="scope">
          {{scope.row.sla02023}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="房屋銷售案代號" prop="sla02003" >{{form.sla02003}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="車位編號" prop="sla02004" >
              <el-input v-model="form.sla02004" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="車位類別"  >
                <el-select  v-model="form.sla02005" placeholder="請選擇">
                  <el-option
                    v-for="item in sla02005List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="車位類型"  >
                <el-select  v-model="form.sla02006" placeholder="請選擇">
                  <el-option
                    v-for="item in sla02006List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="樓層數" prop="sla02007" >
              <el-input v-model="form.sla02007" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="車位購買類別"  >
                <el-select  v-model="form.sla02008" placeholder="請選擇">
                  <el-option
                    v-for="item in sla02008List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地坪數" prop="sla02009" >
              <el-input v-model="form.sla02009" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地號" prop="sla02011" >
              <el-input v-model="form.sla02011" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="銷售表價" prop="sla02014" >
              <el-input v-model="form.sla02014" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="業務員底價" prop="sla02015" >
              <el-input v-model="form.sla02015" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="業務員超價" prop="sla02016" >
              <el-input v-model="form.sla02016" maxlength="5"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="特殊折扣底價" prop="sla02017" >
              <el-input v-model="form.sla02017" maxlength="5"></el-input>
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

<script src="./sla02.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

