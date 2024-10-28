Vue.component('weixiushenqing-form',{
    template: `
    <div>
        <el-dialog :fullscreen="false" width="80%" 
                   :visible.sync="formVisible"
                   :title="formTitle"
                   v-if="formVisible"
                   custom-class="formModel">
            <el-form ref="formRef" :model="form" class="formModel_form" :rules="rules" label-width="120px" >
                <el-form-item label="业主账号" prop="yezhuzhanghao" class="input-item">
                    <el-input v-model="form.yezhuzhanghao" placeholder="业主账号"
                              type="text"
                        :readonly="!isAdd||disabledForm.yezhuzhanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="业主姓名" prop="yezhuxingming" class="input-item">
                    <el-input v-model="form.yezhuxingming" placeholder="业主姓名"
                              type="text"
                        :readonly="!isAdd||disabledForm.yezhuxingming?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="楼栋号" prop="loudonghao" class="input-item">
                    <el-input v-model="form.loudonghao" placeholder="楼栋号"
                              type="text"
                        :readonly="!isAdd||disabledForm.loudonghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="房号" prop="fanghao" class="input-item">
                    <el-input v-model="form.fanghao" placeholder="房号"
                              type="text"
                        :readonly="!isAdd||disabledForm.fanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="维修类型" prop="weixiuleixing" class="select-item">
                    <el-select
                            :disabled="!isAdd||disabledForm.weixiuleixing?true:false"
                            v-model="form.weixiuleixing"
                            placeholder="请选择维修类型"
                    >
                    <el-option v-for="(item,index) in weixiuleixingLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报修时间" prop="baoxiushijian" class="date-item">
                    <el-date-picker
                            v-model="form.baoxiushijian"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :readonly="!isAdd||disabledForm.baoxiushijian?true:false"
                            placeholder="请选择报修时间" ></el-date-picker>
                </el-form-item>
                <el-form-item label="维修状态" prop="weixiuzhuangtai" class="select-item">
                    <el-select
                            :disabled="!isAdd||disabledForm.weixiuzhuangtai?true:false"
                            v-model="form.weixiuzhuangtai"
                            placeholder="请选择维修状态"
                    >
                    <el-option v-for="(item,index) in weixiuzhuangtaiLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报修内容" prop="baoxiuneirong" class="textarea-item">
                    <el-input v-model="form.baoxiuneirong"
                              placeholder="报修内容"
                              type="textarea"
                              :autosize="{ minRows: 5}"
                              :readonly="!isAdd||disabledForm.baoxiuneirong?true:false"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div v-if="isAdd||type=='reply'" class="formModel-btns">
                <el-button class="formModel_cancel" @click="closeClick">取消</el-button>
                <el-button class="formModel_confirm" type="primary" @click="save">
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
`,
    data(){
        return{
            sessionTable:localStorage.getItem('sessionTable'),
            tableName:'weixiushenqing',
            formName:'维修申请',
            formVisible:false,
            formTitle:'',
            form:{
                yezhuzhanghao: '',
                yezhuxingming: '',
                loudonghao: '',
                fanghao: '',
                weixiuleixing: '',
                baoxiuneirong: '',
                baoxiushijian: '',
                weixiuzhuangtai: '未维修',
            },
            id:0,
            type:'',
            disabledForm:{
                yezhuzhanghao : false,
                yezhuxingming : false,
                loudonghao : false,
                fanghao : false,
                weixiuleixing : false,
                baoxiuneirong : false,
                baoxiushijian : false,
                weixiuzhuangtai : false,
            },
            isAdd:false,
            rules:{
                yezhuzhanghao: [
                ],
                yezhuxingming: [
                ],
                loudonghao: [
                ],
                fanghao: [
                ],
                weixiuleixing: [
                ],
                baoxiuneirong: [
                ],
                baoxiushijian: [
                ],
                weixiuzhuangtai: [
                ],
            },
            //维修类型列表
                weixiuleixingLists:[],
            //维修状态列表
                weixiuzhuangtaiLists:[],
            crossRow:'',
            crossTable:'',
            crossTips:'',
            crossColumnName:'',
            crossColumnValue:'',
        }
    },
    watch:{
    },
    methods:{
        //获取唯一标识
        getUUID(){
            return new Date().getTime();
        },
        getInfo(){
            http.get(`${this.tableName}/info/${this.id}`).then(res=>{
                this.form = res.data.data
                this.formVisible = true
            })
        },
        init(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null){
            this.form.baoxiushijian = toolUtil.getCurDateTime()
            if(formId){
                this.id = formId
                this.type = formType
            }
            if(formType == 'add'){
                this.isAdd = true
                this.formTitle = '新增' + this.formName
                this.formVisible = true
            } else if(formType == 'info'){
                this.isAdd = false
                this.formTitle = '查看' + this.formName
                this.getInfo()
            } else if(formType == 'edit'){
                this.isAdd = true
                this.formTitle = '修改' + this.formName
                this.getInfo()
            } else if(formType == 'reply'){
                this.type = formType
                this.isAdd = true
                this.disabledForm.cpicture = true
                this.disabledForm.content = true
                this.formTitle = '回复'
                this.getInfo()
            } else if(formType == 'cross'){
                this.isAdd = true
                this.formTitle = formNames
                for(let x in row){
                    if(x=='yezhuzhanghao'){
                        this.form.yezhuzhanghao = row[x];
                        this.disabledForm.yezhuzhanghao = true;
                        continue;
                    }
                    if(x=='yezhuxingming'){
                        this.form.yezhuxingming = row[x];
                        this.disabledForm.yezhuxingming = true;
                        continue;
                    }
                    if(x=='loudonghao'){
                        this.form.loudonghao = row[x];
                        this.disabledForm.loudonghao = true;
                        continue;
                    }
                    if(x=='fanghao'){
                        this.form.fanghao = row[x];
                        this.disabledForm.fanghao = true;
                        continue;
                    }
                    if(x=='weixiuleixing'){
                        this.form.weixiuleixing = row[x];
                        this.disabledForm.weixiuleixing = true;
                        continue;
                    }
                    if(x=='baoxiuneirong'){
                        this.form.baoxiuneirong = row[x];
                        this.disabledForm.baoxiuneirong = true;
                        continue;
                    }
                    if(x=='baoxiushijian'){
                        this.form.baoxiushijian = row[x];
                        this.disabledForm.baoxiushijian = true;
                        continue;
                    }
                    if(x=='weixiuzhuangtai'){
                        this.form.weixiuzhuangtai = row[x];
                        this.disabledForm.weixiuzhuangtai = true;
                        continue;
                    }
                }
                if(row){
                    this.crossRow = row
                }
                if(table){
                    this.crossTable = table
                }
                if(tips){
                    this.crossTips = tips
                }
                if(statusColumnName){
                    this.crossColumnName = statusColumnName
                }
                if(statusColumnValue){
                    this.crossColumnValue = statusColumnValue
                }
                this.form.weixiuzhuangtai='未维修'
                this.formVisible = true
            }
            http.get(this.sessionTable+'/session').then(res=>{
                var json = res.data.data
                if((json.yezhuzhanghao || json.yezhuzhanghao==0) && toolUtil.storageGet("role")!="管理员"){
                    this.form.yezhuzhanghao = json.yezhuzhanghao
                    this.disabledForm.yezhuzhanghao = true;
                }
                if((json.yezhuxingming || json.yezhuxingming==0) && toolUtil.storageGet("role")!="管理员"){
                    this.form.yezhuxingming = json.yezhuxingming
                    this.disabledForm.yezhuxingming = true;
                }
                if((json.loudonghao || json.loudonghao==0) && toolUtil.storageGet("role")!="管理员"){
                    this.form.loudonghao = json.loudonghao
                    this.disabledForm.loudonghao = true;
                }
                if((json.fanghao || json.fanghao==0) && toolUtil.storageGet("role")!="管理员"){
                    this.form.fanghao = json.fanghao
                    this.disabledForm.fanghao = true;
                }
                if(toolUtil.storageGet("role")!="管理员") {
                    this.disabledForm.weixiuzhuangtai = true;
                }
            })
            http.get(`option/weixiuleixing/weixiuleixing`).then(res=>{
                this.weixiuleixingLists = res.data.data
            })
            this.weixiuzhuangtaiLists = "已维修,未维修".split(',')
        },
        //关闭
        closeClick(){
            this.formVisible = false
        },
        //提交
        save(){
            let objcross;
            let crossUserId = ''
            let crossRefId = ''
            let crossOptNum = ''
            if(this.type == 'cross'){
                objcross = JSON.parse(JSON.stringify(this.crossRow))
                if(this.crossColumnName!=''){
                    if(!this.crossColumnName.startsWith('[')){
                        for(let o in objcross){
                            if(o == this.crossColumnName){
                                objcross[o] = this.crossColumnValue
                            }
                        }
                    }else{
                        crossUserId = toolUtil.storageGet('userid')
                        crossRefId = objcross['id']
                        crossOptNum = this.crossColumnName.replace(/\[|\]/g,"")
                    }
                }
            }
            this.$refs.formRef.validate((valid)=>{
                if(!valid)return
                if(crossUserId&&crossRefId){
                    this.form.crossuserid = crossUserId
                    this.form.crossrefid = crossRefId
                    let params = {
                        page: 1,
                        limit: 1000,
                        crossuserid:this.form.crossuserid,
                        crossrefid:this.form.crossrefid,
                    }
                    http.get('weixiushenqing/page',{
                        params:params
                    }).then(res=>{
                        if(res.data.data.total>=crossOptNum){
                            return this.$message.error(this.crossTips)
                        }else{
                            http.post(`weixiushenqing/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
                                if(this.type == 'cross'){
                                    //修改跨表数据
                                    this.changeCrossData(objcross)
                                }
                                this.$message.success('操作成功')
                                this.formVisible = false
                                this.$emit('change')
                            })
                        }
                    })
                }else{
                    http.post(`weixiushenqing/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
                        if(this.type == 'cross'){
                            //修改跨表数据
                            this.changeCrossData(objcross)
                        }
                        this.$message.success('操作成功')
                        this.formVisible = false
                        this.$emit('change')
                    })
                }
            })
        },
        changeCrossData(data){
            http.post(`${this.crossTable}/update`,data)
        },
    }
})
document.write(`<script src="${baseUrl}client/static/modules/wangeditor/index.min.js"></script>`)
document.write(`<script src="../../components/myEditor.js"></script>`)
document.write(`<link rel="stylesheet" href="${baseUrl}client/static/modules/wangeditor/style.css"></link>`)
