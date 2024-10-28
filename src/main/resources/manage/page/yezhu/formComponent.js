Vue.component('yezhu-form', {
template:`
<template>
    <div>
        <el-dialog
                :visible.sync="formVisible"
                :title="formTitle"
                v-if="formVisible"
                custom-class="formModel"
                >
            <el-form class="formModel_form" ref="formRef" :model="form" :rules="rules" >
                <el-form-item label="业主账号" prop="yezhuzhanghao" class="input-item">
                    <el-input v-model="form.yezhuzhanghao"
                           placeholder="业主账号"
                           type="text"
                           :readonly="!isAdd||disabledForm.yezhuzhanghao?true:false"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="mima" class="input-item">
                    <el-input v-model="form.mima"
                           placeholder="密码"
                           type="password"
                           :readonly="!isAdd||disabledForm.mima?true:false"></el-input>
                </el-form-item>
                <el-form-item  label="业主姓名" prop="yezhuxingming" class="input-item">
                    <el-input v-model="form.yezhuxingming"
                       placeholder="业主姓名"
                       type="text"
                       :readonly="!isAdd||disabledForm.yezhuxingming?true:false" ></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="touxiang" v-if="formVisible" class="imgUpload-item">
                    <file-upload
                            :disabled="!isAdd||disabledForm.touxiang?true:false"
                            tip="点击上传头像"
                            action="file/upload"
                            :limit="3"
                            :multiple="true"
                            :file-urls="form.touxiang?form.touxiang:''"
                            @change="touxiangUploadSuccess"
                    ></file-upload>
                </el-form-item>
                <el-form-item label="性别" prop="xingbie" class="select-item">
                    <el-select
                        :disabled="!isAdd||disabledForm.xingbie?true:false"
                        v-model="form.xingbie"
                        placeholder="请选择性别"
                    >
                        <el-option v-for="(item,index) in xingbieLists" :label="item"
                               :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="手机号码" prop="shoujihaoma" class="input-item">
                    <el-input v-model="form.shoujihaoma"
                       placeholder="手机号码"
                       type="text"
                       :readonly="!isAdd||disabledForm.shoujihaoma?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="楼栋号" prop="loudonghao" class="input-item">
                    <el-input v-model="form.loudonghao"
                       placeholder="楼栋号"
                       type="text"
                       :readonly="!isAdd||disabledForm.loudonghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="房号" prop="fanghao" class="input-item">
                    <el-input v-model="form.fanghao"
                       placeholder="房号"
                       type="text"
                       :readonly="!isAdd||disabledForm.fanghao?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="身份证" prop="shenfenzheng" class="input-item">
                    <el-input v-model="form.shenfenzheng"
                       placeholder="身份证"
                       type="text"
                       :readonly="!isAdd||disabledForm.shenfenzheng?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="密保问题" prop="pquestion" class="input-item">
                    <el-input v-model="form.pquestion"
                       placeholder="密保问题"
                       type="text"
                       :readonly="!isAdd||disabledForm.pquestion?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="密保答案" prop="panswer" class="input-item">
                    <el-input v-model="form.panswer"
                       placeholder="密保答案"
                       type="text"
                       :readonly="!isAdd||disabledForm.panswer?true:false" ></el-input>
                </el-form-item>
                <el-form-item  label="邮箱" prop="email" class="input-item">
                    <el-input v-model="form.email"
                       placeholder="邮箱"
                       type="text"
                       :readonly="!isAdd||disabledForm.email?true:false" ></el-input>
                </el-form-item>
            </el-form>
            <div class="formModel-btns" v-if="isAdd||type=='reply'">
                <el-button class="formModel_cancel" @click="closeClick">取消</el-button>
                <el-button class="formModel_confirm" type="primary" @click="save"
                    >
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
`,
data() {
    return {
        formVisible:false,
        formTitle:'',
        id:0,
        form:{},
        type:'',
        formName:'业主',
        rules:{
            yezhuzhanghao: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            mima: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            yezhuxingming: [
                {required: true,message: '请输入',trigger: 'blur'},

            ],
            touxiang: [
            ],
            xingbie: [
            ],
            shoujihaoma: [
                { validator: toolUtil.fromValidate.mobile, trigger: 'blur' },
            ],
            loudonghao: [
            ],
            fanghao: [
            ],
            shenfenzheng: [
                { validator: toolUtil.fromValidate.idCard, trigger: 'blur' },
            ],
            pquestion: [
            ],
            panswer: [
            ],
            email: [
                { validator: toolUtil.fromValidate.email, trigger: 'blur' },
            ],
        },
        isAdd:false,
        disabledForm:{
            yezhuzhanghao : false,
            mima : false,
            yezhuxingming : false,
            touxiang : false,
            xingbie : false,
            shoujihaoma : false,
            loudonghao : false,
            fanghao : false,
            shenfenzheng : false,
            pquestion : false,
            panswer : false,
            email : false,
        },
        //性别列表
        xingbieLists:[],
        crossRow:'',
        crossTips:'',
        crossColumnName:'',
        crossColumnValue:'',
        userInfo:{},
        sessionTable:localStorage.getItem('admin_sessionTable'),
    }
},
watch:{
},
methods: {
    init(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null){
        this.resetForm()
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
                if(x=='mima'){
                    this.form.mima = row[x];
                    this.disabledForm.mima = true;
                    continue;
                }
                if(x=='yezhuxingming'){
                    this.form.yezhuxingming = row[x];
                    this.disabledForm.yezhuxingming = true;
                    continue;
                }
                if(x=='touxiang'){
                    this.form.touxiang = row[x];
                    this.disabledForm.touxiang = true;
                    continue;
                }
                if(x=='xingbie'){
                    this.form.xingbie = row[x];
                    this.disabledForm.xingbie = true;
                    continue;
                }
                if(x=='shoujihaoma'){
                    this.form.shoujihaoma = row[x];
                    this.disabledForm.shoujihaoma = true;
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
                if(x=='shenfenzheng'){
                    this.form.shenfenzheng = row[x];
                    this.disabledForm.shenfenzheng = true;
                    continue;
                }
                if(x=='pquestion'){
                    this.form.pquestion = row[x];
                    this.disabledForm.pquestion = true;
                    continue;
                }
                if(x=='panswer'){
                    this.form.panswer = row[x];
                    this.disabledForm.panswer = true;
                    continue;
                }
                if(x=='email'){
                    this.form.email = row[x];
                    this.disabledForm.email = true;
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
        this.xingbieLists = "男,女".split(',')
    },
    getInfo(){
        http.get(`yezhu/info/${this.id}`).then(res=>{
            let reg=new RegExp('../../../upload','g')
            this.form = res.data.data
            this.formVisible = true
        })
    },
    //重置表单
    resetForm(){
        Object.assign(this.$data,this.$options.data())
        this.form = {
            yezhuzhanghao: '',
            mima: '',
            yezhuxingming: '',
            touxiang: '',
            xingbie: '',
            shoujihaoma: '',
            loudonghao: '',
            fanghao: '',
            shenfenzheng: '',
            pquestion: '',
            panswer: '',
            email: '',
        }
    },




        //头像上传回调
    touxiangUploadSuccess(e){
        this.form.touxiang = e
    },








    //关闭
    closeClick(){
        this.formVisible = false
    },
    //提交
    save(){
        if(this.form.touxiang!=null) {
            this.form.touxiang = this.form.touxiang.replace(new RegExp(baseUrl,"g"),"");
        }
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
                http.get('yezhu/page',{
                    params:params
                }).then(res=>{
                    if(res.data.data.total>=crossOptNum){
                        return this.$message.error(this.crossTips)
                    }else{
                        http.post(`yezhu/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
                http.post(`yezhu/${!this.form.id ? "save" : "update"}`,this.form).then(res=>{
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
},
})
document.write(`<script src="../../components/FileUpload.js"></script>`)
