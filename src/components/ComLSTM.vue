
<template style="height:100%">
    <div style="height:100%">
        <el-container style="height:100%">
            <el-header class="title_s" style="color:#2e3255">
                  {{this.title}}
            </el-header>
            <el-container style="margin-left:150px;margin-right:150px;height:100%;padding-right:30px">
              <el-main id = 'main' style="height:100%;width:100%">
                <el-menu
                  background-color='#f3f3f4'
                  router:true
                  default-active="3-1"
                  active-text-color="#000000"
                  text-color="#eb5264"
                  class="el-menu-demo"
                  mode="horizontal"
                  style="display:flex;flex-direction:row;align-content:center;justify-content:space-around;margin-bottom:20px"
                  @select="handleSelect">
                  <el-menu-item index="1" width><router-link to="/"   style="text-decoration:none">历史记录展示</router-link></el-menu-item>
                  <el-submenu index="2" style="font-size:10px">
                    <template slot="title">股价预测展示</template>
                    <router-link to="/predict" style="text-decoration:none"><el-menu-item index="2-1"><i class="el-icon-menu"></i>LSTM(长短时记忆)</el-menu-item></router-link>
                    <router-link to="/preSVM" style="text-decoration:none"><el-menu-item index="2-2" ><i class="el-icon-menu"></i>SVM(支持向量机)</el-menu-item></router-link>
                    <router-link to="/preLR" style="text-decoration:none"><el-menu-item index="2-3" ><i class="el-icon-menu"></i>LR(逻辑回归)</el-menu-item></router-link>
                  </el-submenu>
                  <el-submenu index="3" style="font-size:14px">
                    <template slot="title">买卖点及回测展示</template>
                    <router-link to="/comLSTM" style="text-decoration:none"><el-menu-item index="3-1"><i class="el-icon-menu"></i>LSTM(长短时记忆)</el-menu-item></router-link>
                    <router-link to="/comSVM" style="text-decoration:none"><el-menu-item index="3-2"><i class="el-icon-menu"></i>SVM(支持向量机)</el-menu-item></router-link>
                    <router-link to="/comLR" style="text-decoration:none"><el-menu-item index="3-3"><i class="el-icon-menu"></i>LR(逻辑回归)</el-menu-item></router-link>
                  </el-submenu>
                  <el-menu-item index="5" width><router-link to="/kg" style="text-decoration:none">知识图谱展示</router-link></el-menu-item>
                </el-menu>
                <!--search-->
                <div style="width:100%;display:flex;flex-direction:row;margin:0 auto;justify-content:center">
                    <!-- 选择日期 -->
                    <div class="block">
                      <el-date-picker
                        v-model="formdate"
                        type="daterange"
                        align="right"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                    </div>
                    <el-button icon="el-icon-search" circle style="margin-left:20px" v-on:click="search"></el-button>
                </div>
                <!--结果图-->
                <div style="background:#EBEEF5;height:100%;margin-top:20px;margin-left:30px;margin-right:30px;margin-top:30px">
                  <img :src="imgsrc3" style="width:100%;height:100%" />
                </div>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
import Vue from 'vue';

export default {
  name: 'ComLSTM',
  data () {
    return {
      formdate:[],
      title:'股票量化分析系统',
      activeIndex: '1',
      activeIndex2: '1',
      code: '',
      placeholder:"请输入内容",
      imgsrc2:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585311256932&di=b8abc79bce1bbe9d58d21f358bbfa412&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw2048h1152%2F20180302%2Fc192-fwnpcnt0547061.jpg',
      imgsrc3:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589306848671&di=c82bd015275d8c38d408d495c0f54fca&imgtype=0&src=http%3A%2F%2Fwww.hhmat.com%2Fd%2Ffile%2Fbigpic%2F190817%2F17%2Fn220fpvsxu0.jpg',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    console.log(key, keyPath);
    },
    test(){
        console.log('---------------------------')
        console.log(this.formdate[0])
    },
    search(){
      fetch('http://127.0.0.1:5020/lstmcom?begin='+this.formdate[0]+'&end='+this.formdate[1],{
        method:'get',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.text()).then(data => {
        console.log('---------------------------')
        console.log(this.formdate[0])
        this.data = data.replace("\"","").replace("\"","");
        this.imgsrc3 = 'data:image/png;base64,'+this.data,
        //console.log(this.data)
        console.log('---------------------------')
        console.log(this.formdate[0])
      })
    }
  }
}


</script>

<style type="text/css" >
.title_s{
  font-family: "PingFang SC";
  font-size: 40px;
  color: #409EFF;
  margin-bottom: 30px
};
.container_s{
  background: rgb(0, 255, 234);
  width:100%;
  margin-left: 150px
};
.main{
  width:1000px;
  background: #409EFF;
};
.aside_s{
  width: 500px;
  margin-left:200px;
  margin-top:200px
};
.input{
  width:100px
}

</style>