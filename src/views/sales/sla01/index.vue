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
          {{scope.row.sla01003}}
        </template>
      </el-table-column>
      <el-table-column label="區別">
        <template slot-scope="scope">
          {{scope.row.sla01004}}
        </template>
      </el-table-column>
      <el-table-column label="棟別">
        <template slot-scope="scope">
          {{scope.row.sla01005}}
        </template>
      </el-table-column>
      <el-table-column label="戶號">
        <template slot-scope="scope">
          {{scope.row.sla01006}}
        </template>
      </el-table-column>
      <el-table-column label="屋型">
        <template slot-scope="scope">
          {{scope.row.sla01007Name}}
        </template>
      </el-table-column>
      <el-table-column label="格局">
        <template slot-scope="scope">
          {{scope.row.sla01008Name}}
        </template>
      </el-table-column>
      <el-table-column label="樓層數">
        <template slot-scope="scope">
          {{scope.row.sla01009}}
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
            <el-form-item label="房屋銷售案代號" prop="sla01003" >{{form.sla01003}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="區別" prop="sla01004" >
              <el-input v-model="form.sla01004" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="棟別" prop="sla01005" >
              <el-input v-model="form.sla01005" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="戶號" prop="sla01006" >
              <el-input v-model="form.sla01006" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="屋型"  >
                <el-select  v-model="form.sla01007" placeholder="請選擇">
                  <el-option
                    v-for="item in sla01007List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="格局"  >
                <el-select  v-model="form.sla01008" placeholder="請選擇">
                  <el-option
                    v-for="item in sla01008List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="樓層數" prop="sla01009" >
              <el-input v-model="form.sla01009" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="車位類別"  >
                <el-select  v-model="form.sla01015" placeholder="請選擇">
                  <el-option
                    v-for="item in sla01015List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="地坪數" prop="sla01010" >
              <el-input v-model="form.sla01010" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="建坪數" prop="sla01011" >
              <el-input v-model="form.sla01011" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公設建坪數" prop="sla01012" >
              <el-input v-model="form.sla01012" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地號" prop="sla01013" >
              <el-input v-model="form.sla01013" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址" prop="sla01014" >
              <el-input v-model="form.sla01014" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./sla01.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

