<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.sla10006" size="mini" placeholder="请输入客戶姓名"></el-input>
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
      <el-table-column label="銷售案號">
        <template slot-scope="scope">
          {{scope.row.sla10002Name}}
        </template>
      </el-table-column>
      <el-table-column label="客戶姓名">
        <template slot-scope="scope">
          {{scope.row.sla10006}}
        </template>
      </el-table-column>
      <el-table-column label="行動電話">
        <template slot-scope="scope">
          {{scope.row.sla10010}}
        </template>
      </el-table-column>
      <el-table-column label="填表日期">
        <template slot-scope="scope">
          {{scope.row.sla10004}}
        </template>
      </el-table-column>

      <el-table-column label="負責業務員">
        <template slot-scope="scope">
          {{scope.row.sla10015}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="viewLog(scope.row.sla10001)">查看訪談紀錄</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-form-item label="銷售案號"  >
              <el-select  v-model="form.building" filterable placeholder="请选择">
                <el-option
                  v-for="item in buildingList"
                  :key="item.id"
                  :label="item.sla00003"
                  :value="item.sla00002">
                </el-option>
              </el-select>
          </el-form-item>
          <el-col :span="6">
            <el-form-item label="業務員" prop="sla10015">
              <el-input v-model="form.sla10015"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="填表日期" prop="sla10013">
              <el-input v-model="form.sla10013"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客戶姓名" prop="sla10006">
              <el-input v-model="form.sla10006"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别" prop="sla10007">
              <el-radio-group v-model="form.sla10007">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email" prop="sla10012">
              <el-input v-model="form.sla10012" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="電話" prop="sla10009">
              <el-input v-model="form.sla10009" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="行動電話" prop="sla10010">
              <el-input v-model="form.sla10010" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="連絡地址" prop="sla10011">
              <el-input v-model="form.sla10011" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="區域" prop="sla10016">
              <el-input v-model="form.sla10016" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求產品" prop="sla10019">
              <el-input v-model="form.sla10019" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="年齡" prop="sla10008">
              <el-input v-model="form.sla10008" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="職業" prop="sla10018">
              <el-input v-model="form.sla10018" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求價位" prop="sla10027">
              <el-input v-model="form.sla10027" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="購買用途" prop="sla10020">
              <el-input v-model="form.sla10020" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="現住狀況" prop="sla10021">
              <el-input v-model="form.sla10021" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="車位需求" prop="sla10022">
              <el-input v-model="form.sla10022" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="媒體分析" prop="sla10023">
              <el-input v-model="form.sla10023" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="詢問重點" prop="sla10024">
              <el-input v-model="form.sla10024" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求房數" prop="sla10025">
              <el-input v-model="form.sla10025" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已購原因" prop="sla10029">
              <el-input v-model="form.sla10029" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="洽詢戶別" prop="sla10028">
              <el-input v-model="form.sla10028" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求坪數" prop="sla10026">
              <el-input v-model="form.sla10026" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="未購原因" prop="sla10030">
              <el-input v-model="form.sla10030" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="備註" >
              <el-input v-model="form.sla10033" type="textarea"></el-input>
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

<script src="./visitor.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

