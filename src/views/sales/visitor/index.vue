<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="3">
          <el-input v-model="listQuery.sla10003" size="mini" placeholder="請輸入銷售案名稱"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.sla10006" size="mini" placeholder="請輸入客戶姓名"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.sla10010" size="mini" placeholder="請輸入行動電話"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.sla10009" size="mini" placeholder="請輸入電話"></el-input>
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
          {{scope.row.sla10003}}
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
      <el-table-column label="電話">
        <template slot-scope="scope">
          {{scope.row.sla10009}}
        </template>
      </el-table-column>
      <el-table-column label="填表日期">
        <template slot-scope="scope">
          {{scope.row.sla10013}}
        </template>
      </el-table-column>
      <el-table-column label="負責業務員">
        <template slot-scope="scope">
          {{scope.row.sla10015}}
        </template>
      </el-table-column>
      <el-table-column label="洽詢方式">
        <template slot-scope="scope">
          {{scope.row.sla10004Name}}
        </template>
      </el-table-column> 
      <el-table-column label="資料維護者">
        <template slot-scope="scope">
          {{scope.row.modifyName}}
        </template>
      </el-table-column>      
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="viewLog(scope.row.id,scope.row.sla10002)">查看訪談紀錄</el-button>
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
                <el-select  v-model="form.building" filterable placeholder="請選擇">
                  <el-option
                    v-for="item in buildingList"
                    :key="item.id"
                    :label="item.sla00003"
                    :value="item.sla00002">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="來人/來電" prop="sla10004">
              <el-select  v-model="form.sla10004" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10004List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别" prop="sla10007">
              <el-radio-group v-model="form.sla10007">
                <el-radio label="M">男</el-radio>
                <el-radio label="F">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="業務員" prop="sla10015">
              <el-input v-model="form.sla10015"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="填表日期" prop="sla10013">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla10013" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客戶姓名" prop="sla10006">
              <el-input v-model="form.sla10006"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="Email" prop="sla10012">
              <el-input v-model="form.sla10012" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="電話" prop="sla10009">
              <el-input v-model="form.sla10009" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行動電話" prop="sla10010">
              <el-input v-model="form.sla10010" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="連絡地址" prop="sla10011">
              <el-input v-model="form.sla10011" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="區域" prop="sla10016">
              <el-select  v-model="form.sla10016" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10016List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求產品" prop="sla10019">
              <el-select  v-model="form.sla10019" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10019List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="年齡區間" prop="sla10017">
              <el-select  v-model="form.sla10017" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10017List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="職業" prop="sla10018">
              <el-select  v-model="form.sla10018" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10018List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求價位" prop="sla10027">
              <el-select  v-model="form.sla10027" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10027List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="購買用途" prop="sla10020">
              <el-select  v-model="form.sla10020" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10020List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="現住狀況" prop="sla10021">
              <el-select  v-model="form.sla10021" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10021List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="車位需求" prop="sla10022">
              <el-select  v-model="form.sla10022" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10022List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="媒體分析" prop="sla10023">
              <el-select  v-model="form.sla10023" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10023List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="詢問重點" prop="sla10024">
              <el-select  v-model="form.sla10024" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10024List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求房數" prop="sla10025">
              <el-select  v-model="form.sla10025" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10025List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="已購原因" prop="sla10029">
              <el-select  v-model="form.sla10029" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10029List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="洽詢戶別" prop="sla10028">
              <el-input v-model="form.sla10028" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求坪數" prop="sla10026">
              <el-select  v-model="form.sla10026" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10026List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="8">
            <el-form-item label="未購原因" prop="sla10030">
              <el-select  v-model="form.sla10030" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10030List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="貸款需求" prop="sla10035">
              <el-select  v-model="form.sla10035" placeholder="請選擇">
                  <el-option
                    v-for="item in sla10035List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="備註" >
              <el-input v-model="form.sla10033" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="業績歸屬人1" prop="sla10041">
              <el-input v-model="form.sla10041" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人2" prop="sla10042">
              <el-input v-model="form.sla10042" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人3" prop="sla10043">
              <el-input v-model="form.sla10043" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人4" prop="sla10044">
              <el-input v-model="form.sla10044" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人5" prop="sla10045">
              <el-input v-model="form.sla10045" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="4">
            <el-form-item label="業績歸屬人6" prop="sla10046">
              <el-input v-model="form.sla10046" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人7" prop="sla10047">
              <el-input v-model="form.sla10047" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人8" prop="sla10048">
              <el-input v-model="form.sla10048" maxlength="10" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人9" prop="sla10049">
              <el-input v-model="form.sla10049" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="業績歸屬人10" prop="sla10050">
              <el-input v-model="form.sla10050" maxlength="10" ></el-input>
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

<script src="./visitor.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

