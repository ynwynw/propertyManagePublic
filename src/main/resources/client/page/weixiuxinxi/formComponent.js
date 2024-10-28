Vue.component('weixiuxinxi-form',{
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
                <el-form-item label="维修类型" prop="weixiuleixing" class="input-item">
                    <el-input v-model="form.weixiuleixing" placeholder="维修类型"
                              type="text"
                        :readonly="!isAdd||disabledForm.weixiuleixing?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="报修时间" prop="baoxiushijian" class="input-item">
                    <el-input v-model="form.baoxiushijian" placeholder="报修时间"
                              type="text"
                        :readonly="!isAdd||disabledForm.baoxiushijian?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="维修人员" prop="weixiurenyuan" class="input-item">
                    <el-input v-model="form.weixiurenyuan" placeholder="维修人员"
                              type="text"
                        :readonly="!isAdd||disabledForm.weixiurenyuan?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="维修时间" prop="weixiushijian" class="date-item">
                    <el-date-picker
                            v-model="form.weixiushijian"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :readonly="!isAdd||disabledForm.weixiushijian?true:false"
                            placeholder="请选择维修时间" ></el-date-picker>
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
            tableName:'weixiuxinxi',
            formName:'维修信息',
            formVisible:false,
            formTitle:'',
            form:{
                yezhuzhanghao: '',
                yezhuxingming: '',
                loudonghao: '',
                fanghao: '',
                weixiuleixing: '',
                baoxiushijian: '',
                weixiurenyuan: '',
                weixiushijian: '',
            },
            id:0,
            type:'',
            disabledForm:{
                yezhuzhanghao : false,
                yezhuxingming : false,
                loudonghao : false,
                fanghao : false,
                weixiuleixing : false,
                baoxiushijian : false,
                weixiurenyuan : false,
                weixiushijian : false,
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
                baoxiushijian: [
                ],
                weixiurenyuan: [
                ],
                weixiushijian: [
                ],
            },
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
            this.form.weixiushijian = toolUtil.getCurDateTime()
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
                    if(x=='baoxiushijian'){
                        this.form.baoxiushijian = row[x];
                        this.disabledForm.baoxiushijian = true;
                        continue;
                    }
                    if(x=='weixiurenyuan'){
                        this.form.weixiurenyuan = row[x];
                        this.disabledForm.weixiurenyuan = true;
                        continue;
                    }
                    if(x=='weixiushijian'){
                        this.form.weixiushijian = row[x];
                        this.disabledForm.weixiushijian = true;
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
                this.formVisible = true
            }
            http.get(this.sessionTable+'/session').then(res=>{
                var json = res.data.data
            })
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
                    http.get('weixiuxinxi/page',{
                        params:params
                    }).then(res=>{
                        if(res.data.data.total>=crossOptNum){
                            return this.$message.error(this.crossTips)
                        }else{
                            http.post(`weixiuxinxi/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                    http.post(`weixiuxinxi/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
