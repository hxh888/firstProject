//有效的手机号码
const validatePhone = (rule,value,callback) =>{
    let patter = new RegExp("^[1][3,4,5,7,8][0-9]{9}$") ;   
    if (!patter.test(value)) {
        return callback(new Error( i18n.t('Enter_phone_num') ));        //请输入正确格式的手机号！
    } else {
        callback();
    }
}

//输入汉字字符
const validateFont =(rule,value,callback) =>{
    let patter =new RegExp("^[\u4e00-\u9fa5]+$");
    if(!patter.test(value)){
        return callback(new Error( i18n.t('Enter_chinese') ));        //请输入汉字字符
    }else{
        callback();
    }
}
//输入数字字符
const validateNum =(rule,value,callback) =>{
    let patter =new RegExp("^[0-9]+$");
    if(!patter.test(value)){
        return callback(new Error( i18n.t('Enter_number') ));        //请输入数字字符
    }else{
        callback();
    }
}
//请输入18位由大写字母和数字组成的字符
const validate1 =(rule,value,callback) =>{
    let patter =/^(?=.*[A-Z])(?=.*\d)[A-Z\d]{18}$/;
    if (value) {
        if(!patter.test(value)){
            return callback(new Error( i18n.t('legalPerson.legalNum_format') ));        //请输入18位由大写字母和数字组成的字符
        }else{
            callback();
        }
    } else {
        callback();
    }
}
//请输入4位数字
const validate3 =(rule,value,callback) =>{
    let patter =new RegExp("^[0-9]{4}$");
    if(!patter.test(value)){
        return callback(new Error( i18n.t('Enter_four_number') ));        //请输入4位数字字符
    }else{
        callback();
    }
}
//校验身份证
const idValidate =(rule,value,callback) =>{
    let patter =/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if(!patter.test(value)){
        return callback(new Error( i18n.t('Enter_id_number') ));        //请输入正确的证件号码
    }else{
        callback();
    }
}
export default{
    //公共验证方法
    common:{ 
        mobilePhone:[
            {required: true, message: i18n.t('loanIncome.Mobile_phone_number_cannot_be_empty')}, // 手机号不能为空
            {validator: validatePhone}
        ]
    },
    // 消贷人工派件
    loanArtificialSent:{
        //分配审批用户
        loanArtSentUser:[
            {required: true, message: i18n.t('loanIncome.Please_choose_to_assign_approval_users')},// 请选择分配审批用户
        ],
    },
    // 五级分类
    fiveLevel:{
        //分类调整
        adjustClass:[
            {required: true, message: i18n.t('loanIncome.Choose_Category_Adjustment'),trigger: 'blur'},// 请选择分类调整
        ],
        //调整原因
        adjustReason:[
            {required: true, message: i18n.t('loanIncome.Reasons_for_adjustment'),trigger: 'blur'},// 调整原因
        ],
        //认定意见
        fiveAffirmState:[
            {required: true, message: i18n.t('loanIncome.Confirmation_that_opinions_cannot_be_empty'),trigger: 'blur'},// 认定意见不能为空
        ],
    },
   
    // 消贷人工审批岗
    approve:{
        //电话核查说明
        checkExplain:[
            {required: true, message: i18n.t('loanIncome.Telephone_verification_instructions_should_not_be_empty'),trigger: 'blur'},// 电话核查说明不能为空
        ],
        //审批结果
        handleResult:[
            {required: true, message: i18n.t('loanIncome.Please_select_the_approval_result'),trigger: 'blur' },// 请选择审批结果
        ],
        //拒绝码
        handleResultState:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_rejection_code'),trigger: 'change'},// 请选择拒绝码
        ],
        //审批说明
        handleDesc:[
            {required: true, message: i18n.t('loanIncome.Examination_and_approval_instructions_should_not_be_empty'),trigger: 'blur'},// 审批说明不能为空
        ]
    },
    // 法人管理
    legalPerson:{
        //社会统一信用代码
        legalPersonNum:[
            {required: true, message: i18n.t('legalPerson.legalNum_format2')}, //社会统一信用代码不能为空
            {validator: validate1}
        ],
        //公司名称 
        legalPersonName:[
            {required: true, message: i18n.t('legalPerson.legalNum_format3') }, //公司名称不能为空'
            {max: 20, message: i18n.t('legalPerson.legalNum_format4'), trigger: 'change' },  //长度不能超过20个字符
            {validator: validateFont}
        ],
        //状态
        legalPerState:[
            {required: true, message: i18n.t('legalPerson.legalNum_format5'), trigger: 'change' }  //请选择状态
        ],
    },
    // 机构管理
    organization:{
        //机构编号
        branchNum:[
            {required: true, message:  i18n.t('org.org_format1') }, //机构编号不能为空'
            // {max: true, message: '机构编号不能为空'},
            {validator: validateNum}
        ], 
        //机构名称
        branchName:[
            {required: true, message: i18n.t('org.org_format2') }, //机构名称不能为空'
            {max: 20, message: i18n.t('format20'), trigger: 'change' },  //长度不能超过20个字符
            {validator: validateFont}
        ], 
        //机构类型
        branchType:[
            {required: true, message:  i18n.t('org.org_format3') , trigger: 'change' } //请选择机构类型
        ],
        //状态
        branchState:[
            {required: true, message:  i18n.t('legalPerson.legalNum_format5'), trigger: 'change' } //请选择状态
        ],
        //上级机构编号
        parentBranchNum:[
            {required: true,message:  i18n.t('org.org_format4') }, //上级机构编号不能为空
            {validator: validateNum}
        ], 
        //并入机构编号
        mergeBranchNum:[
            {required: true, message: i18n.t('org.org_format5')}, //并入机构编号不能为空
            {validator: validateNum}
        ]
    },
    //岗位管理
    group:{
        //岗位编号
        postNum:[
            {required: true, message: i18n.t('group.Job_format1')}, //岗位编号不能为空
            {validator: validate3}
        ],
        //岗位名称
        postName:[
            {required: true, message: i18n.t('group.Job_format2')}, //岗位名称不能为空'
            {max: 20, message: i18n.t('format20'), trigger: 'change' },  //长度不能超过20个字符
            {validator: validateFont}
        ],
        //岗位类型
        postType:[
           { required: true, message: i18n.t('group.Job_format3'), trigger: 'change'} //请选择岗位类型
        ],
        //状态
        postState:[
            {required: true, message: i18n.t('legalPerson.legalNum_format5'), trigger: 'change' } //请选择状态
        ]
    },
    //功能管理
    // fun:{
    //     //功能编号
    //     funNum:[
    //         {required: true, message:'功能编号不能为空'},
    //         {validator: validate3}
    //     ],
    //     //功能名称
    //     funName:[
    //         {required: true, message:'功能名称不能为空'},
    //         {validator: validateFont}
    //     ],
    //     //状态
    //     funState:[
    //         {required: true, message: '请选择状态', trigger: 'change' }
    //     ],
       
    // },
    //消贷产品管理
    loan:{
        //关联审批流程
        linkWorkflowNum:[
          {required: true, message: i18n.t('loanIncome.Please_select_the_associated_approval_process'), trigger: 'change' }// 请选择关联审批流程
        ],
        //关联合同
        linkContractNum:[
            {required: true, message: i18n.t('loanIncome.Please_select_the_associated_contract'), trigger: 'change' }// 请选择关联合同
        ],
        //所属机构
        orgNos:[
            {required: true, message: i18n.t('loanIncome.Please_select_the_organization_to_which_you_belong'), trigger: 'change' }// 请选择所属机构
        ],
         //是否自动派件
        isAutoDistr:[
        	{required: true, message: i18n.t('loanIncome.Please_choose_whether_to_dispatch_automatically_or_not'), trigger: 'change' }// 请选择是否自动派件
        ]
    },
    //信用卡申请
    cardSq:{
        //客户姓名
        applyUserName:[
          {required: true, message: i18n.t('loanIncome.The_applicant_name_cannot_be_empty'), trigger: 'blur' }// 申请人不能为空
        ],
        //申请人性别
        applyUserSex:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_applicant_gender'), trigger: 'change' }// 请选择申请人性别
        ],
        //证件类型
        idCardType:[
            {required: true, message: i18n.t('loanIncome.Please_select_the_type_of_certificate'), trigger: 'change' }// 请选择证件类型
        ],
        //证件号码
        idCardNum:[
            {required: true, message: i18n.t('loanIncome.Certificate_number_cannot_be_empty'), trigger: 'blur' },// 证件号码不能为空
            {validator: idValidate}
        ],
        //手机号码
        applyUserPhoneNumber:[
            {required: true, message: i18n.t('loanIncome.Mobile_phone_number_cannot_be_empty'), trigger: 'blur' },// 手机号码不能为空
            {validator: validatePhone}
        ],
        //学历
        applyUserEducationId:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_highest_educational_background'), trigger: 'change' }// 请选择学历
        ],
        //家庭所在城市
        city1:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_city_where_your_family_lives'), trigger: 'change' }// 请选择家庭所在城市
        ],
        //家庭地址
        contactAddress1:[
            {required: true, message: i18n.t('loanIncome.Family_address_cannot_be_empty'), trigger: 'blur' }// 家庭地址不能为空
        ],
        //家庭地址邮编
        contactPostCode1:[
            {required: true, message: i18n.t('loanIncome.Home_Address_Zip_code_cannot_be_empty'), trigger: 'blur' }// 家庭地址邮编不能为空
        ],
         //家庭地址邮编
         contactPostCode1:[
            {required: true, message: i18n.t('loanIncome.Home_Address_Zip_code_cannot_be_empty'), trigger: 'blur' }// 家庭地址邮编不能为空
        ],
        //家庭电话
        contactMobilePhone1:[
            {required: true, message: i18n.t('loanIncome.Home_phone_cannot_be_empty'), trigger: 'blur' }// 家庭电话不能为空
        ],
        contactAddress2: [
            { required: true, message: i18n.t('loanIncome.Company_address_cannot_be_empty'), trigger: 'change' }, //公司地址不能为空
        ],
        contactPostCode2: [
            { required: true, message: i18n.t('loanIncome.Company_Address_Zip_code_cannot_be_empty'), trigger: 'change' }, //公司地址邮编不能为空
        ],
        contactMobilePhone2: [
            { required: true, message: i18n.t('loanIncome.The_company_telephone_cannot_be_empty'), trigger: 'change' }, //公司电话不能为空
        ],
        //币种名称
        currencycode:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_currency_name'), trigger: 'change' }// 请选择币种名称
        ],
        //主附标识
        applicationType:[
            {required: true, message: i18n.t('loanIncome.Please_select_the_main_attached_logo'), trigger: 'change' }// 请选择主附标识
        ],
        //附属卡申请人姓名
        supplementaryCardName:[
            {required: true, message: i18n.t('loanIncome.Subsidiary_Card_Applicant_Name_Cannot_Be_Empty'), trigger: 'blur' }// 附属卡申请人姓名不能为空
        ],
        //附属卡申请人证件类型
        supplementaryCardIdType:[
            {required: true, message: i18n.t('loanIncome.Please_choose_the_type_of_affiliated_card_applicant_certificate'), trigger: 'change' }// 请选择附属卡申请人证件类型
        ],
        //附属卡申请人证件号码
        supplementaryCardIdNum:[
            {required: true, message: i18n.t('loanIncome.Appendix_Card_Applicant_Certificate_Number_Cannot_Be_Empty'), trigger: 'blur' },// 附属卡申请人证件号码不能为空
            {validator: idValidate}
        ],
        //附属卡申请人手机号码
        supplementaryCardPhone:[
            {required: true, message: i18n.t('loanIncome.Subsidiary_Card_Applicant_Mobile_Phone_Number_Cannot_Be_Empty'), trigger: 'change' },// 附属卡申请人手机号码不能为空
            {validator: validatePhone}
        ],
        //与主卡申请人关系
        relationsWithMain:[
            {required: true, message: i18n.t('loanIncome.The_relationship_with_the_main_card_applicant_cannot_be_empty'), trigger: 'blur' }// 与主卡申请人关系不能为空
        ],
        //主证件类型
        supIdType:[
            {required: true, message:i18n.t('loanIncome.zzjlxbnwk'), trigger: 'change' }// 主证件类型不能为空
        ],
         //主证件号码
         supIdNumber:[
            {required: true, message:i18n.t('loanIncome.zzjhmbnwk'), trigger: 'blur' }// 主证件号码不能为空
        ],
         //机构编号
         branchNum:[
            {required: true, message:i18n.t('loanIncome.Institution_number_cannot_be_empty'), trigger: 'blur' }// 机构编号不能为空
        ],
         //机构名称
         branchName:[
            {required: true, message:i18n.t('loanIncome.Institution_name_cannot_be_empty'), trigger: 'blur' }// 机构名称不能为空
        ],
        //产品名称2
        productNum2:[
            {required: true, message:i18n.t('loanIncome.cpmc2buwk'), trigger: 'blur' }// 产品名称2不能为空
        ],
        embosserName1:[
            {required: true, message:i18n.t('loanIncome.Chinese_Pinyin_cannot_be_empty'), trigger: 'blur' }// 中文拼音不能为空
        ]
    }


}