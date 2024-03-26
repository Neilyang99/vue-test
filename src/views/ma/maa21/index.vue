<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="5" >
          工程案:
          <el-select v-model="listQuery.selMaa21003"  placeholder="請挑選工程案" width="100%" >
            <el-option
              v-for="item in projectList"
              :key="item.maa00002"
              :label="item.maa00004"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="listQuery.selMaa21002"  placeholder="請輸入合約編號"></el-input>
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
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove" disabled>{{ $t('button.delete') }}</el-button>
          
        </el-col>
      </el-row>
    </div>
    
    <vendorSelection ref="vendorSelection" @children="parentVendor"></vendorSelection>
    <budgetSelection ref="budgetSelection" @children="parentBudget"></budgetSelection>
    

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange" :header-cell-style="{textAlign: 'center'}">
      <el-table-column label="合約編號" width="154px">
        <template slot-scope="scope">
          {{scope.row.maa21002}}
        </template>
      </el-table-column>
      <el-table-column label="請款公司">
        <template slot-scope="scope">
          {{scope.row.maa21004Name}}
        </template>
      </el-table-column>
      <el-table-column label="版本" align="center" width="50px">
        <template slot-scope="scope">
          {{scope.row.maa21006}}
        </template>
      </el-table-column>
      <el-table-column label="合約日期" align="center">
        <template slot-scope="scope">
          {{scope.row.maa21007}}
        </template>
      </el-table-column>
      <el-table-column label="保固金額" align="right">
        <template slot-scope="scope">
          {{scope.row.maa21015}}
        </template>
      </el-table-column>
      <el-table-column label="合約金額" align="right">
        <template slot-scope="scope">
          {{scope.row.maa21016}}
        </template>
      </el-table-column>
      <el-table-column label="工程項目">
        <template slot-scope="scope">
          {{scope.row.maa21023}}
        </template>
      </el-table-column>
      <!-- 
      <el-table-column label="合約狀態">
        <template slot-scope="scope">
          {{scope.row.maa21021}}
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="view2nd(scope.row.id,scope.row.maa21003)">設定</el-button>
        </template>
      </el-table-column>
      -->
    </el-table>

    <el-dialog
      :title="titleTxt"
      :visible.sync="formVisible"
      width="92%" align="center">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
      <div style="border: 1px solid; text-align: left;">
        <el-row>   
          <el-col :span="6">
            <el-form-item label="合約編號" prop="maa21002">
              <el-input v-model="form.maa21002" placeholder="A101-" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合約日期" prop="maa21007">
              <el-date-picker
                v-model="form.maa21007"
                type="date"
                placeholder=""
                :default-value="new Date()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款條件" prop="maa21022">
              <el-select v-model="form.maa21022" placeholder="">
                <el-option label="當月20日付款" :value=1 />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="單據日期" prop="">
              <el-input v-model="form.createTime" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="請款公司" prop="maa21004">
              <el-input v-model="form.maa21004" style="width:80%" readonly ></el-input>
              <el-button type="success" size="mini" icon="el-icon-search" @click.native="selectVendor('maa21004')"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="請款%" prop="maa21008">
              <el-input-number v-model="form.maa21008" :min="0" :max="100" @change="calAmt()" ></el-input-number >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="現金%" prop="maa21010">
              <el-input-number v-model="form.maa21010" :min="0" :max="100"></el-input-number >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合約狀態" prop="">
              <el-input v-model="formStatus" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="工程案" prop="maa21003">
              <el-select v-model="form.maa21003" placeholder="工程案名稱">
                <el-option
                  v-for="item in projectList"
                  :key="item.maa00002"
                  :label="item.maa00004"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="稅率%" prop="maa21009">
              <el-input-number v-model="form.maa21009" :min="0" :max="100"></el-input-number >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支票%" prop="maa21011">
              <el-input-number v-model="form.maa21011" :min="0" :max="100"></el-input-number >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保固金" prop="maa21017">
              <el-input v-model="form.maa21017" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="版本" prop="maa21006">
              <el-input v-model="form.maa21006" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="">
              
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="匯款%" prop="maa21012">
              <el-input-number v-model="form.maa21012" :min="0" :max="100"></el-input-number >
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合約金額" prop="maa21016">
              <el-input v-model="form.maa21016" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="付款公司" prop="maa21005">
              <el-input v-model="form.maa21005" style="width:80%" readonly></el-input>
              <el-button type="success" size="mini" icon="el-icon-search" @click.native="selectVendor('maa21005')"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="工程項目" prop="maa21023">
              <el-input v-model="form.maa21023" maxlength="200" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
      <br>
    <el-form ref="form1" :model="gridForm" :rules="tableRules" size="mini">
      <div style="border: 1px solid;">
        <el-table :data="maa22Grid" border @current-change="handleGrid" :header-cell-style="{textAlign: 'center'}">
          <el-table-column label="項次" width="54">
            <template slot-scope="scope">
              <el-form-item prop="">{{scope.row.maa22003}}</el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="預算項目" width="300" >
            <template slot-scope="scope" >
              <el-form-item prop="">
                <el-button type="success" size="mini" icon="el-icon-search"  @click="selectBudget(scope.row.maa22003)" ></el-button>
                {{scope.row.maa22005}}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="單位" width="64">
            <template slot-scope="scope">
              <el-form-item prop="">
                {{scope.row.maa22007}}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="預算數量" width="80" align="right">
            <template slot-scope="scope">
              <el-form-item prop=""> {{scope.row.maa22008}}</el-form-item>
              
            </template>
          </el-table-column>
          <el-table-column label="預算單價" width="80" align="right">
            <template slot-scope="scope">
              <el-form-item prop="">
              {{scope.row.maa22009}}
            </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="預算複價" width="140" align="right">
            <template slot-scope="scope">
              <el-form-item prop="" v-if="scope.row.maa22008*scope.row.maa22009>0">
                {{scope.row.maa22008*scope.row.maa22009}}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="現價?" width="60" align="left">
            <template slot-scope="scope">
              <el-form-item prop="">{{ scope.row.maa22010 }}
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="合約數量" width="150" align="center">
            <template slot-scope="scope">
              <el-form-item prop="">
              <el-input-number v-model="scope.row.maa22012" :min="1" :max="999999" @change="calAmt()" ></el-input-number>
            </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="合約單價" width="150" align="right">
            <template slot-scope="scope">
              <el-form-item prop="">
                <el-input-number v-model="scope.row.maa22013"  :min="0" :max="999999" @change="calAmt()"></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="合約複價" width="140" align="right">
            <template slot-scope="scope" v-if="scope.row.maa22012*scope.row.maa22013>0">
            <el-form-item> {{scope.row.maa22012*scope.row.maa22013}}</el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="備註" align="center" >
            <template slot-scope="scope" >
                <el-form-item prop="">
              <el-input v-model="scope.row.maa22015" maxlength="200"></el-input>
            </el-form-item>
            </template>
          </el-table-column>

        </el-table>
        </div>

        <div style="text-align: left">
          <el-button type="primary" @click="addGridRow" size="mini">+</el-button>
        </div>  
        
        <br/>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="save" disabled>{{ $t('button.submit') }}</el-button>
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

<script src="./maa21.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

