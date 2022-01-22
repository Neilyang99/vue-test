<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.sla20008" size="mini" placeholder="請輸入客戶姓名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <!--<el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>-->
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
          <el-button type="info" size="mini" icon="el-icon-money" @click.native="accountPayable">收款</el-button>
          <el-button type="info" size="mini" icon="el-icon-s-home" @click.native="checkHouse">驗屋</el-button>
        </el-col>
      </el-row>
    </div>


    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
    @current-change="handleCurrentChange">
      <el-table-column label="銷售案號">
        <template slot-scope="scope">
          {{scope.row.sla20039}}
        </template>
      </el-table-column>
      <el-table-column label="客戶姓名">
        <template slot-scope="scope">
          {{scope.row.sla20008}}
        </template>
      </el-table-column>
      <el-table-column label="行動電話">
        <template slot-scope="scope">
          {{scope.row.sla20016}}
        </template>
      </el-table-column>
      <el-table-column label="訂單日期">
        <template slot-scope="scope">
          {{scope.row.sla20004}}
        </template>
      </el-table-column>
      <el-table-column label="戶號">
        <template slot-scope="scope">
          {{scope.row.sla20042}}
        </template>
      </el-table-column>
      <el-table-column label="總價">
        <template slot-scope="scope">
          {{scope.row.sla20068}}
        </template>
      </el-table-column>
      <el-table-column label="訂單狀態" >
        <template slot-scope="scope">
          {{scope.row.sla20005Name}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-log" size="mini" @click.native="setClosed(scope.row.id)" v-if="scope.row.sla20005 != 'E0' " :disabled="scope.row.sla20005 != 'B5' ">結案確認</el-button>
          <el-button type="info" icon="el-icon-log" size="mini" @click.native="setOpen(scope.row.id)" v-if="scope.row.sla20005 === 'E0' ">取消結案</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="銷售案號"  >
                <el-select  v-model="form.sla20002" filterable placeholder="請選擇" :disabled="true">
                  <el-option
                    v-for="item in buildingList"
                    :key="item.id"
                    :label="item.sla00003"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="訂單日期" prop="sla20004">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla20004" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客戶姓名" prop="sla20008">
              <el-input v-model="form.sla20008" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="Email" prop="sla10018">
              <el-input v-model="form.sla20018" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="電話" prop="sla20015">
              <el-input v-model="form.sla20015" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行動電話" prop="sla20016">
              <el-input v-model="form.sla20016" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="連絡地址" prop="sla20017">
              <el-input v-model="form.sla20017" ></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="區別" >
              {{form.sla20040}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="棟別" >
              {{form.sla20041}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="戶號" >
              {{form.sla20042}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="地坪數" prop="sla20046">
              {{form.sla20046}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建坪數" prop="sla20047">
              {{form.sla20047}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公設建坪數" prop="sla20048">
              {{form.sla20048}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="地號" prop="sla20049">
              {{form.sla20049}}
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="地址" prop="sla20050">
              {{form.sla20050}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="成交總價" >
              <el-input v-model="form.sla20068" @change="calAmt()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仲人費" >
              <el-input v-model="form.sla20094"  @change="calAmt()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="贈送/雜項費" >
              <el-input v-model="form.sla20095"  @change="calAmt()"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="實際總價" >
              {{form.sla20096}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="業績歸屬人1" prop="sla20098">
              <el-input v-model="form.sla20098" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人2" prop="sla20099">
              <el-input v-model="form.sla20099" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人3" prop="sla20100">
              <el-input v-model="form.sla20100" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人4" prop="sla20101">
              <el-input v-model="form.sla20101" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人5" prop="sla20102">
              <el-input v-model="form.sla20102" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" >
              <el-input v-model="form.sla20087" type="textarea"></el-input>
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

<script src="./sla20.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

