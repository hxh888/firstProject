<template>
	<div class="content_box" id="contract_content">
		<!--ffdffdf-->
		<div class="headTab">
			<el-row>
          		<el-col :span="5" :class="num>=1 ? 'active':''">1.基本信息</el-col>
          		<el-col :span="5" :class="num>=2 ? 'active':''">2.联系人信息</el-col>
          		<el-col :span="5" :class="num>=3 ? 'active':''">3.账户信息</el-col>
          		<el-col :span="5" :class="num>=4 ? 'active':''">4.客户相关资料</el-col>
          		<el-col :span="4" :class="num>=5 ? 'active':''">5.流程审批</el-col>
          	</el-row>
		</div>
		<div class="basicInformation bg" v-if="num==1">
			<el-form :model="basic" ref="basic" :label-position="$store.state.lang == 'en' ? 'top' : 'right'" :rules="rules" label-width="170px" class="demo-ruleForm clearfix" size="small" >
				<el-col :span="24" class="title">企业主要信息</el-col>
				<div class="clearfix" style="padding-bottom:10px;">
					<el-col :span="8">
			            <el-form-item label="客户名称" prop="enterprise.khmc"> 
			                <el-input v-model="basic.enterprise.khmc"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="借贷人/担保人" prop="enterprise.jdrdbr"> 
			                <el-select v-model="basic.enterprise.jdrdbr" >
				                <el-option label="全部" value="" ></el-option><!-- 全部 -->
				                <el-option label="借贷人" value="借贷人" ></el-option><!-- 借贷人 -->
				                <el-option label="担保人" value="担保人" ></el-option><!-- 担保人 -->
				                <el-option label="借贷人/担保人" value="借贷人/担保人" ></el-option><!-- 借贷人/担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="证件类型" prop="enterprise.zjlx"> 
			                <el-select v-model="basic.enterprise.zjlx" >
				                <el-option label="全部" value="0" ></el-option><!-- 全部 -->
				                <el-option label="身份证" value="1" ></el-option><!-- 借贷人 -->
				                <el-option label="护照" value="2" ></el-option><!-- 担保人 -->
				                <el-option label="军官证" value="3" ></el-option><!-- 借贷人/担保人 -->
				                <el-option label="其他" value="4" ></el-option><!-- 借贷人/担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="证件号码" prop="enterprise.zjhm"> 
			                <el-input v-model="basic.enterprise.zjhm"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="客户类型"> 
			                <el-select v-model="basic.enterprise.khlx" >
				                <el-option label="城镇居民" value="身份证" ></el-option><!-- 借贷人 -->
				                <el-option label="个体工商户" value="护照" ></el-option><!-- 担保人 -->
				                <el-option label="农户" value="军官证" ></el-option><!-- 借贷人/担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="客户来源" > 
			                <el-select v-model="basic.enterprise.khly">
				                <el-option label="门店" value="身份证" ></el-option><!-- 借贷人 -->
				                <el-option label="广告" value="护照" ></el-option><!-- 担保人 -->
				                <el-option label="直销" value="军官证" ></el-option><!-- 借贷人/担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="客户经理" prop="enterprise.khjl"> 
			                <el-input v-model="basic.enterprise.khjl"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-button type="primary" size="mini" class="btnChose">客户经理</el-button>
		        </div>
		        <el-col :span="24" class="title">基本信息</el-col>
				<div  class="clearfix" style="padding-bottom:10px;">
					<el-col :span="8">
			            <el-form-item label="性别" prop="bas.sex"> 
			                <el-select v-model="basic.bas.sex">
				                <el-option label="男" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="女" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="出生日期" prop="bas.csrq"> 
			                <el-input v-model="basic.bas.csrq"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="民族" prop="bas.mz"> 
			                <el-select v-model="basic.bas.mz">
				                <el-option label="汉族" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="壮族" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="婚姻状况" prop="bas.hyzk"> 
			                <el-select v-model="basic.bas.hyzk">
				                <el-option label="未婚" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="已婚" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="最高学历" > 
			                <el-select v-model="basic.bas.zgxl">
				                <el-option label="博士" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="硕士" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="最高学位" > 
			                <el-select v-model="basic.bas.zgxw">
				                <el-option label="博士" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="名誉博士" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="社会保障号码" > 
			                <el-input v-model="basic.bas.shbzhm"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="健康状况" prop="bas.jkzk"> 
			                <el-select v-model="basic.bas.jkzk">
				                <el-option label="良好" value="0" ></el-option><!-- 借贷人 -->
				                <el-option label="特别健康" value="1" ></el-option><!-- 担保人 -->
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="通讯地址邮编" prop="bas.txdzyb"> 
			                <el-input v-model="basic.bas.txdzyb"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="户籍所在地邮编" prop="bas.hjszdyb"> 
			                <el-input v-model="basic.bas.hjszdyb"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="邮箱" prop="bas.yx"> 
			                <el-input v-model="basic.bas.yx"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="qq"> 
			                <el-input v-model="basic.bas.qq"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="8">
			            <el-form-item label="手机号" prop="bas.sjh"> 
			                <el-input v-model="basic.bas.sjh"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="24">
			            <el-form-item label="选择通讯地址" >
				            <el-select v-model="basic.bas.province" @change="choseProvince" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.bas.city" @change="choseCity" style="width:150px">
				            	<el-option v-for="item in basic.bas.allCity" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.bas.area" style="width:150px">
				            	<el-option v-for="(item,index) in basic.bas.allArea" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="24">
			            <el-form-item label="详细通讯地址" prop="bas.xxtxdz"> 
			                <el-input v-model="basic.bas.xxtxdz" style="width:460px"></el-input>
			            </el-form-item>
			        </el-col>
			        <el-col :span="24">
			            <el-form-item label="选择户籍地址">
				            <el-select v-model="basic.bas.provinceA" @change="choseProvinceA" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.bas.cityA" @change="choseCityA" style="width:150px">
				            	<el-option v-for="item in basic.bas.allCityA" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.bas.areaA" style="width:150px">
				            	<el-option v-for="(item,index) in basic.bas.allAreaA" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
			            </el-form-item>
			        </el-col>
			        <el-col :span="24">
			            <el-form-item label="户籍地址" prop="bas.hjdz"> 
			                <el-input v-model="basic.bas.hjdz" style="width:460px"></el-input>
			            </el-form-item>
			        </el-col>
				</div>
				<el-col :span="24" class="title">配偶基本信息</el-col>
				<div class="clearfix" style="padding-bottom:10px;" >
					<el-col :span="8">
						<el-form-item label="配偶姓名" prop="spouse.poxm"> 
			                <el-input v-model="basic.spouse.poxm"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶性别" prop="spouse.poxb"> 
							<el-select v-model="basic.spouse.poxb">
				                <el-option label="男" value="0" ></el-option>
				                <el-option label="女" value="1" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶婚姻状况" prop="spouse.pohyzk"> 
							<el-select v-model="basic.spouse.pohyzk">
				                <el-option label="已婚" value="0" ></el-option>
				                <el-option label="初婚" value="1" ></el-option>
				                <el-option label="再婚" value="2" ></el-option>
				                <el-option label="复婚" value="3" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶民族" prop="spouse.pomz"> 
							<el-select v-model="basic.spouse.pomz">
				                <el-option label="汉族" value="0" ></el-option>
				                <el-option label="满足" value="1" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶客户类型" prop="spouse.pokhlx"> 
							<el-select v-model="basic.spouse.pokhlx">
				                <el-option label="个体工商户" value="0" ></el-option>
				                <el-option label="城镇居民" value="1" ></el-option>
				                <el-option label="农户" value="2" ></el-option>
				                <el-option label="企业实际控制人" value="2" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶借贷人/担保人" prop="spouse.pojdr"> 
							<el-select v-model="basic.spouse.pojdr">
				                <el-option label="借贷人" value="0" ></el-option>
				                <el-option label="担保人" value="1" ></el-option>
				                <el-option label="借贷人/担保人" value="2" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶证件类型" prop="spouse.pozjlx"> 
							<el-select v-model="basic.spouse.pozjlx">
				                <el-option label="身份证" value="0" ></el-option>
				                <el-option label="军官证" value="1" ></el-option>
				                <el-option label="其他证件" value="2" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶证件号码" prop="spouse.pozjhm"> 
							<el-input v-model="basic.spouse.pozjhm"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶出生日期" prop="spouse.pocsrq"> 
							<!--<el-input type="date" v-model="basic.spouse.pocsrq"></el-input>-->
							<el-date-picker
						        v-model="basic.spouse.pocsrq"
						        type="date"
						        placeholder="选择日期"  style="width:100%">
						    </el-date-picker>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶手机号" prop="spouse.posjh"> 
							<el-input v-model="basic.spouse.posjh"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶工作单位"> 
							<el-input v-model="basic.spouse.pogzdw"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶单位电话"> 
							<el-input v-model="basic.spouse.podwdh"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶户籍所在地邮编" prop="spouse.pohjszdyb"> 
							<el-input v-model="basic.spouse.pohjszdyb"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="配偶单位地址邮编" prop="spouse.podwdzyb"> 
							<el-input v-model="basic.spouse.podwdzyb"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="选择配偶户籍地址">
							<el-select v-model="basic.spouse.provinceD" @change="choseProvinceD" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.spouse.cityD" @change="choseCityD" style="width:150px">
				            	<el-option v-for="item in basic.spouse.allCityD" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.spouse.areaD" style="width:150px">
				            	<el-option v-for="(item,index) in basic.spouse.allAreaD" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="配偶户籍详细地址" prop="spouse.pohjxxdz"> 
							<el-input v-model="basic.spouse.pohjxxdz" style="width:460px;"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="选择配偶单位地址">
							<el-select v-model="basic.spouse.provinceE" @change="choseProvinceE" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.spouse.cityE" @change="choseCityE" style="width:150px">
				            	<el-option v-for="item in basic.spouse.allCityE" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.spouse.areaE" style="width:150px">
				            	<el-option v-for="(item,index) in basic.spouse.allAreaE" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="配偶单位详细地址" prop="spouse.podwxxdz"> 
							<el-input v-model="basic.spouse.podwxxdz" style="width:460px;"></el-input>
			            </el-form-item>
					</el-col>
				</div>
				<el-col :span="24" class="title">经济状况</el-col>
				<div class="clearfix" style="padding-bottom:10px;" >
					<el-col :span="8">
						<el-form-item label="年收入(元)" prop="economics.nsr"> 
			                <el-input v-model="basic.economics.nsr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="本人月收入(元)" prop="economics.brysr"> 
			                <el-input v-model="basic.economics.brysr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="奖金等其他收入(元)"> 
			                <el-input v-model="basic.economics.jjdqtsr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="本人实际月收入(元)" prop="economics.brsjysr"> 
			                <el-input v-model="basic.economics.brsjysr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭月收入(元)" > 
			                <el-input v-model="basic.economics.jtysr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭实际月收入" prop="economics.jtsjysr"> 
			                <el-input v-model="basic.economics.jtsjysr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭人均月收入(元)"> 
			                <el-input v-model="basic.economics.jtrjysr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭月均总收入(元)"> 
			                <el-input v-model="basic.economics.jtyjzsr"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭月均总支出(元)" > 
			                <el-input v-model="basic.economics.jtyjzzc"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="供养人数" prop="economics.gyrs"> 
			                <el-input v-model="basic.economics.gyrs"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="主要经济来源" prop="economics.zyjjly"> 
			                <el-input v-model="basic.economics.zyjjly"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="其他经济来源" prop="economics.qtjjly"> 
			                <el-input v-model="basic.economics.qtjjly"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭总资产(元)" prop="economics.jtzzc"> 
			                <el-input v-model="basic.economics.jtzzc"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭对外担保"> 
			                <el-input v-model="basic.economics.jtdwdb"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭总负债(元)"> 
			                <el-input v-model="basic.economics.jtzfz"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭负债率(%)" prop="economics.jtfzl"> 
			                <el-input v-model="basic.economics.jtfzl"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="经济情况备注"> 
			                <el-input v-model="basic.economics.jjqkbz"></el-input>
			            </el-form-item>
					</el-col>
				</div>
				<el-col :span="24" class="title">住房信息</el-col>
				<div class="clearfix" style="padding-bottom:10px;" >
					<el-col :span="8">
						<el-form-item label="本地居住起始时间" prop="housing.bdjzqssj"> 
			                <el-date-picker
						        v-model="basic.housing.bdjzqssj"
						        type="date"
						        placeholder="选择日期" style="width:100%">
						    </el-date-picker>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭电话"> 
			                <el-input v-model="basic.housing.jtdh"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="居住状况" prop="housing.jzzk"> 
			                <el-select v-model="basic.housing.jzzk">
				                <el-option label="亲属楼" value="0" ></el-option>
				                <el-option label="自置" value="1" ></el-option>
				                <el-option label="按揭" value="2" ></el-option>
				                <el-option label="租房" value="3" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="位置" > 
			                <el-input v-model="basic.housing.wz"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="面积(平方米)" > 
			                <el-input v-model="basic.housing.mj"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="现值(元)" > 
			                <el-input v-model="basic.housing.xz"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="原价(元)" > 
			                <el-input v-model="basic.housing.yj"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="月均还款金额(元)" > 
			                <el-input v-model="basic.housing.yjhkje"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="月均可支配收入总额(元)" > 
			                <el-input v-model="basic.housing.yjkzpsrze"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="月均其他费用(元)" > 
			                <el-input v-model="basic.housing.yjqtfy"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="选择家庭详细地址" > 
			                <el-select v-model="basic.housing.provinceB" @change="choseProvinceB" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.housing.cityB" @change="choseCityB" style="width:150px">
				            	<el-option v-for="item in basic.housing.allCityB" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.housing.areaB" style="width:150px">
				            	<el-option v-for="(item,index) in basic.housing.allAreaB" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="家庭详细住址" prop="housing.jtxxzz"> 
			                <el-input v-model="basic.housing.jtxxzz" style="width:460px"></el-input>
			            </el-form-item>
					</el-col>
				</div>
				<el-col :span="24" class="title">工作资料</el-col>
				<div class="clearfix" style="padding-bottom:10px;" >
					<el-col :span="8">
						<el-form-item label="工作单位" prop="work.gzdw" > 
			                <el-input v-model="basic.work.gzdw"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位类型" prop="work.dwlx"> 
							<el-select v-model="basic.work.dwlx">
				                <el-option label="国有企业" value="0" ></el-option>
				                <el-option label="国有控股企业" value="1" ></el-option>
				                <el-option label="外资企业" value="2" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="所属行业" prop="work.sshy" > 
			                <el-input v-model="basic.work.sshy"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位地址邮编" > 
			                <el-input v-model="basic.work.dwdzyb"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职业"> 
							<el-select v-model="basic.work.dwlx">
				                <el-option label="专业技术人员" value="0" ></el-option>
				                <el-option label="军人" value="1" ></el-option>
				                <el-option label="未知" value="2" ></el-option>
				            </el-select>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职务" > 
			                <el-input v-model="basic.work.zw"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="职称" > 
							<el-select v-model="basic.work.zc">
				                <el-option label="无" value="0" ></el-option>
				                <el-option label="高级" value="1" ></el-option>
				                <el-option label="中级" value="2" ></el-option>
				                <el-option label="初级" value="2" ></el-option>
				                <el-option label="未知" value="2" ></el-option>
				            </el-select>
			           </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="开始工作时间" prop="work.ksgzsj"> 
			                <!--<el-input type="date" v-model="basic.work.ksgzsj"></el-input>-->
			                <el-date-picker
						        v-model="basic.work.ksgzsj"
						        type="date"
						        placeholder="选择日期"  style="width:100%">
						    </el-date-picker>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位电话"> 
			                <el-input v-model="basic.work.dwdh"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="单位传真"> 
			                <el-input v-model="basic.work.dwcz"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="选择单位详细地址">
							<el-select v-model="basic.work.provinceC" @change="choseProvinceC" style="width:150px">
				            	<el-option v-for="item in mapJson" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.work.cityC" @change="choseCityC" style="width:150px">
				            	<el-option v-for="item in basic.work.allCityC" :key="item.name" :label="item.name" :value="item.name"></el-option>
				            </el-select>
				            <el-select v-model="basic.work.areaC" style="width:150px">
				            	<el-option v-for="(item,index) in basic.work.allAreaC" :key="index" :label="item" :value="item"></el-option>
				            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="单位详细地址"> 
			                <el-input v-model="basic.work.dwxxdz" style="width:460px;"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="概况备注" > 
			                <el-input v-model="basic.work.gkbz" style="width:460px;"></el-input>
			            </el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="工作资料备注"> 
			                <el-input v-model="basic.work.gzzlbz" style="width:460px;"></el-input>
			            </el-form-item>
					</el-col>
				</div>
				<div style="padding-bottom:20px; text-align: center;">
					<el-button @click="nextBasic('basic')">下一步</el-button>
					<el-button @click="backIndex">返回</el-button>
				</div>
			</el-form>
		</div>
		<div class="contactInformation" v-if="num==2">
			<div class="edit_module">
	            <div class="edit_module_btn clearfix" style="margin-top: 10px;">
	              	<el-button type="primary" icon="el-icon-plus" @click="addContacts" size="small">{{$t("Add")}}</el-button>
	            </div>
          	</div>
          	<div class="list_module">
		      	<div class="table_body">
		        	<h4>联系人信息</h4><!-- 客户列表 -->
			        <el-table :data="tableContacts" border style="width: 100%" size="small" :empty-text="$t('noData')">
			          	<el-table-column prop="lxrmc" label="联系人姓名" align="center" min-width="145px"></el-table-column>
			          	<!--联系人姓名-->
			          	
				        <el-table-column prop="ydkrgxlx" label="与贷款人关系" align="center" min-width="145px"></el-table-column>
				        <!--与贷款人关系-->
			          
			          	<el-table-column prop="zjlx" label="证件类型" align="center" min-width="145px"></el-table-column>
			          	<!--证件类型-->
			          
			          	<el-table-column prop="zjhm" label="证件号码" align="center" min-width="145px"></el-table-column>
			          	<!--证件号码-->
			          
			          	<el-table-column prop="sjhm" label="手机号码" align="center" min-width="145px"></el-table-column>
			         	<!--手机号码-->
			          
			          	<el-table-column :label="$t('Operation')"  align="center" min-width="100px" ><!--操作	--><!--v-if="funList.indexOf('查看')>-1"-->
				            <template slot-scope="scope">
				            	<el-button size="mini" class="edit-btn" @click="deleteItem(scope.row)">
									<i class="el-icon-delete"></i>
									<span class="text">{{$t('Delete')}}</span><!--删除	--><!-- v-if="funList.indexOf('编辑') > -1" -->
								</el-button>
				              	<el-button size="mini" class="edit-btn" @click="editItem(scope.row,scope.$index)">
									<i class="el-icon-edit"></i>
									<span class="text">{{$t('Edit')}}</span><!--编辑	--><!-- v-if="funList.indexOf('编辑') > -1" -->
								</el-button>
				            </template>
			          	</el-table-column>
			        </el-table>
			        <div style=" padding:20px 0; text-align: center;">
			        	<el-button @click="prveContacts">上一步</el-button>
						<el-button @click="nextContacts">下一步</el-button>
						<el-button>取消</el-button>
					</div>
		      	</div>
		    </div>
		    <!--新增弹框页面开始-->
		    <el-dialog :title="contactsTitle" :visible.sync="addUserDialog"   :close-on-click-modal="false">
		      	<el-form :model="contacts" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="contacts" :rules="rules" label-width="150px" class="demo-ruleForm" size="small">
					<el-row class="edit_module_search">
			          	<el-col :span="12">
			            	<!-- 联系人名称 -->
			              	<el-form-item label="联系人名称" prop="lxrmc"> 
			                		<el-input v-model="contacts.lxrmc" ></el-input>
			              	</el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
				            <el-form-item label="证件类型" prop="zjlx"> 
				                <el-select v-model="contacts.zjlx" >
					                <el-option label="身份证" value="身份证" ></el-option>
					                <el-option label="军官证" value="军官证" ></el-option>
					                <el-option label="士兵证" value="士兵证" ></el-option>
					                <el-option label="其他证件" value="其他证件" ></el-option>
					            </el-select>
				            </el-form-item>
				        </el-col>
			          	<el-col :span="12">
			            	<!-- 证件号码 -->
			                <el-form-item label="证件号码" prop="zjhm">   
			                  	<el-input type="text"  v-model="contacts.zjhm"></el-input >
			                </el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
				            <el-form-item label="与贷款人关系类型" prop="ydkrgxlx"> 
				                <el-select v-model="contacts.ydkrgxlx" >
					                <el-option label="身份证" value="身份证" ></el-option>
					                <el-option label="军官证" value="军官证" ></el-option>
					                <el-option label="士兵证" value="士兵证" ></el-option>
					                <el-option label="其他证件" value="其他证件" ></el-option>
					            </el-select>
				            </el-form-item>
				        </el-col>
				        <el-col :span="12">
			            	<!-- 手机号码 -->
			                <el-form-item label="手机号码" prop="sjhm">   
			                  	<el-input type="text"  v-model="contacts.sjhm"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 户籍所在地详细地址 -->
			                <el-form-item label="户籍所在地详细地址" prop="hjszdxxdz">   
			                  	<el-input type="text"  v-model="contacts.hjszdxxdz"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 工作单位 -->
			                <el-form-item label="工作单位">   
			                  	<el-input type="text"  v-model="contacts.gzdw"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 单位电话 -->
			                <el-form-item label="单位电话" prop="dwdh">   
			                  	<el-input type="text"  v-model="contacts.dwdh"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 单位地址 -->
			                <el-form-item label="单位地址" prop="dwdz">   
			                  	<el-input type="text"  v-model="contacts.dwdz"></el-input >
			                </el-form-item>
			          	</el-col>
			        </el-row> 
		      	</el-form>
		          <div slot="footer" class="dialog-footer">
		            <el-button @click="resetForm('contacts')" v-if="addUserDialog && !contacts.edit && !contacts.flag">{{$t('Reset')}}</el-button>
		            
		            <el-button type="primary" @click="sureContacts('contacts')" v-if="!contactsEdit">{{$t('Save')}}</el-button>
		            <el-button type="primary" @click="sureEdit('contacts')" v-if="contactsEdit">{{$t('Save')}}</el-button><!--编辑的保存-->
		          </div>
		    </el-dialog>
    		<!--新增弹框页面结束-->
		</div>
		<div class="accountInformation" v-if="num==3">
			<!--账户信息-->
			<div class="edit_module">
	            <div class="edit_module_btn clearfix" style="margin-top: 10px;">
	              	<el-button type="primary" icon="el-icon-plus" @click="addAccount" size="small">{{$t("Add")}}</el-button>
	            </div>
          	</div>
          	<div class="list_module">
		      	<div class="table_body">
		        	<h4>账户信息</h4><!-- 客户列表 -->
			        <el-table :data="tableAccount" border style="width: 100%" size="small" :empty-text="$t('noData')">
			          	<el-table-column prop="zh" label="账号" align="center" min-width="145px"></el-table-column>
			          	<!--账号-->
			          	
				        <el-table-column prop="zhmc" label="账户名称" align="center" min-width="145px"></el-table-column>
				        <!--账户名称-->
			          
			          	<el-table-column prop="khyhhm" label="开户银行行名" align="center" min-width="145px"></el-table-column>
			          	<!--开户银行行名-->
			          
			          	<el-table-column prop="zhlx" label="账户类型" align="center" min-width="145px"></el-table-column>
			          	<!--账户类型-->
			          
			          	<el-table-column prop="zhzylx" label="账户作用类型" align="center" min-width="145px"></el-table-column>
			         	<!--账户作用类型-->
			         	
			         	<el-table-column prop="sfbzjzh" label="是否保证金账户" align="center" min-width="145px"></el-table-column>
			         	<!--是否保证金账户-->
			          
			          	<el-table-column :label="$t('Operation')"  align="center" min-width="100px" ><!--操作	--><!--v-if="funList.indexOf('查看')>-1"-->
				            <template slot-scope="scope">
				            	<el-button size="mini" class="edit-btn" @click="deleteItem(scope.row)">
									<i class="el-icon-delete"></i>
									<span class="text">{{$t('Delete')}}</span><!--删除	--><!-- v-if="funList.indexOf('编辑') > -1" -->
								</el-button>
				              	<el-button size="mini" class="edit-btn" @click="editItem(scope.row,scope.$index)">
									<i class="el-icon-edit"></i>
									<span class="text">{{$t('Edit')}}</span><!--编辑	--><!-- v-if="funList.indexOf('编辑') > -1" -->
								</el-button>
				            </template>
			          	</el-table-column>
			        </el-table>
			        <div style=" padding:20px 0; text-align: center;">
			        	<el-button @click="prveContacts">上一步</el-button>
						<el-button @click="nextContacts">下一步</el-button>
						<el-button>取消</el-button>
					</div>
		      	</div>
		    </div>
		    <!--新增弹框页面开始-->
		    <el-dialog :title="contactsTitle" :visible.sync="addUserDialog1"   :close-on-click-modal="false">
		      	<el-form :model="account" :label-position="$store.state.lang == 'en' ? 'top' : 'right'"  ref="account" :rules="rules" label-width="150px" class="demo-ruleForm" size="small">
					<el-row class="edit_module_search">
			          	<el-col :span="12">
			            	<!-- 账号 -->
			              	<el-form-item label="账号" prop="zh"> 
			                		<el-input v-model="account.zh" ></el-input>
			              	</el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
			            	<!-- 账户名称 -->
			              	<el-form-item label="账户名称" prop="zhmc"> 
			                		<el-input v-model="account.lxrmc" ></el-input>
			              	</el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
			            	<!-- 开户银行行名 -->
			              	<el-form-item label="开户银行行名" prop="zhmc"> 
			                		<el-input v-model="account.khyhhm" ></el-input>
			              	</el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
				            <el-form-item label="账户类型" prop="zjlx"> 
				                <el-select v-model="contacts.zjlx" >
					                <el-option label="身份" value="身份证" ></el-option>
					                <el-option label="军官证" value="军官证" ></el-option>
					                <el-option label="士兵证" value="士兵证" ></el-option>
					                <el-option label="其他证件" value="其他证件" ></el-option>
					            </el-select>
				            </el-form-item>
				        </el-col>
			          	<el-col :span="12">
			            	<!-- 证件号码 -->
			                <el-form-item label="证件号码" prop="zjhm">   
			                  	<el-input type="text"  v-model="contacts.zjhm"></el-input >
			                </el-form-item>
			          	</el-col>	
			          	<el-col :span="12">
				            <el-form-item label="与贷款人关系类型" prop="ydkrgxlx"> 
				                <el-select v-model="contacts.ydkrgxlx" >
					                <el-option label="身份证" value="身份证" ></el-option>
					                <el-option label="军官证" value="军官证" ></el-option>
					                <el-option label="士兵证" value="士兵证" ></el-option>
					                <el-option label="其他证件" value="其他证件" ></el-option>
					            </el-select>
				            </el-form-item>
				        </el-col>
				        <el-col :span="12">
			            	<!-- 手机号码 -->
			                <el-form-item label="手机号码" prop="sjhm">   
			                  	<el-input type="text"  v-model="contacts.sjhm"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 户籍所在地详细地址 -->
			                <el-form-item label="户籍所在地详细地址" prop="hjszdxxdz">   
			                  	<el-input type="text"  v-model="contacts.hjszdxxdz"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 工作单位 -->
			                <el-form-item label="工作单位">   
			                  	<el-input type="text"  v-model="contacts.gzdw"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 单位电话 -->
			                <el-form-item label="单位电话" prop="dwdh">   
			                  	<el-input type="text"  v-model="contacts.dwdh"></el-input >
			                </el-form-item>
			          	</el-col>
			          	<el-col :span="12">
			            	<!-- 单位地址 -->
			                <el-form-item label="单位地址" prop="dwdz">   
			                  	<el-input type="text"  v-model="contacts.dwdz"></el-input >
			                </el-form-item>
			          	</el-col>
			        </el-row> 
		      	</el-form>
		          <div slot="footer" class="dialog-footer">
		            <el-button @click="resetForm('contacts')" v-if="addUserDialog && !contacts.edit && !contacts.flag">{{$t('Reset')}}</el-button>
		            
		            <el-button type="primary" @click="sureContacts('contacts')" v-if="!contactsEdit">{{$t('Save')}}</el-button>
		            <el-button type="primary" @click="sureEdit('contacts')" v-if="contactsEdit">{{$t('Save')}}</el-button><!--编辑的保存-->
		          </div>
		    </el-dialog>
    		<!--新增弹框页面结束-->
		</div>
		<!--<div class="custiomerInformation" v-if="num==4">
			客户相关资料
		</div>
		<div class="approval" v-if="num==5">
			流程审批
		</div>-->
	</div>
</template>

<script>
	import bus from '../../../assets/bus.js'
	import mapJson from '../../../assets/json/map.json'
	export default {
		data() {
		    return {
		    	num:1,
		    	mapJson:mapJson,
		    	basic:{
		    		sss:'',
		    		enterprise:{//企业主要信息
		    			khmc:'张德',//客户名称
		    			jdrdbr:'1',//借贷人/担保人
		    			zjlx:'4',//证件类型
		    			zjhm:'343345342378',//证件号码
		    			khlx:'',//客户类型
		    			khly:'',//客户来源
		    			khjl:'admin1'//客户经理
		    		},
		    		bas:{//基本信息
		    			sex:'0',//性别
		    			csrq:'2000-01-20',//出生日期
		    			mz:'0',//民族
		    			hyzk:'0',//婚姻状况
		    			zgxl:'',//最高学历
		    			zgxw:'',//最高学位
		    			shbzhm:'',//社会保障号码
		    			jkzk:'1',//健康状况
		    			txdzyb:'234234',//通讯地址邮编
		    			hjszdyb:'456523',//户籍所在地邮编
		    			yx:'123@com.cn',//邮箱
		    			qq:'',//qq
		    			sjh:'18309492888',//手机号
		    			xxtxdz:"河南省",//详细通讯地址
		    			hjdz:'河南省',//户籍地址
		    			province:"",//选择通讯地址省
		    			city:"",//选择通讯地址市
		    			area:"",//选择通讯地址区
		    			allCity:[],//选择通讯地址选中省时的市，
		    			allArea:[],//选择通讯地址选中市时的区
		    			provinceA:"",//选择户籍地址省
		    			cityA:"",//选择户籍地址市
		    			areaA:"",//选择户籍地址区
		    			allCityA:[],//选择户籍地址选中省时的市，
		    			allAreaA:[],//选择户籍地址选中市时的区
		    		},
					spouse:{//配偶基本呢信息
						poxm:"张蓝",//配偶姓名
						poxb:"1",//配偶性别
						pohyzk:"1",//配偶婚姻状况
						pomz:"1",//配偶民族
						pokhlx:"1",//配偶客户类型
						pojdr:"1",//配偶接待人/担保人
						pozjlx:"1",//配偶证件类型
						pozjhm:"298793465918793",//配偶证件号码
						pocsrq:"2000-01-10",//配偶出生日期
						posjh:"18304982777",//配偶手机号
						pogzdw:"",//配偶工作单位
						podwdh:"",//配偶单位电话
						pohjszdyb:"345453",//配偶户籍所在地邮编
						podwdzyb:"657656",//配偶单位地址邮编
						provinceD:"",//配偶户籍地省
						cityD:"",//配偶户籍地市
						areaD:"",//配偶户籍地区
						allCityD:[],//
						allAreaD:[],//
						pohjxxdz:"河南省",//配偶户籍详细地址
						provinceE:"",//配偶单位地省
						cityE:"",//配偶单位地市
						areaE:"",//配偶单位地区
						allCityE:[],//
						allAreaE:[],//
						podwxxdz:"河南省",//配偶单位详细地址
					},
		    		economics:{//经济状况
		    			nsr:"3000",//年收入()元
		    			brysr:"1000",//本人月收入
		    			jjdqtsr:"",//奖金等其他收入
		    			brsjysr:"1000",//本人实际月收入
		    			jtysr:"",//家庭收入
		    			jtsjysr:"1000",//家庭实际月收入
		    			jtrjysr:"",//家庭人均月收入
		    			jtyjzsr:"",//家庭月均总收入
		    			jtyjzzc:"",//家庭月均总支出
		    			gyrs:"2",//供养人数
		    			zyjjly:"0",//主要经济来源
		    			qtjjly:"收废品",//其他经济来源
		    			jtzzc:"1000",//家庭总资产
		    			jtdwdb:"",//家庭对外担保
		    			jtzfz:"",//家庭总负债
		    			jtfzl:"80%",//家庭负载率
		    			jjqkbz:"",//经济情况备注
		    		},
		    		housing:{//住房信息
		    			bdjzqssj:"1994-06-24",//本地居住起始时间
		    			jtdh:"",//家庭电话	
		    			jzzk:"1",//居住状况
		    			wz:"",//位置
		    			mj:"",//面积(平方米)
		    			xz:"",//现值(元)
		    			yj:"",//原价(元
		    			yjhkje:"",//月均还款金额(元)
		    			yjkzpsrze:"",//月均可支配收入总额(元)
		    			yjqtfy:"",//月均其他费用(元)
		    			provinceB:"",//省
		    			cityB:"",//市
		    			areaB:"",//区
		    			jtxxzz:"河南省",//家庭详细住址
		    			allCityB:[],//省里所有市
		    			allAreaB:[],//市中所有区
		    		},
		    		work:{//工作资料
		    			gzdw:"天阳",//工作单位
		    			dwlx:"1",//单位类型
		    			sshy:"金融",//所属行业
		    			dwdzyb:"",//单位地址邮编
		    			zy:"",//职业
		    			zw:"",//职务
		    			zc:"",//职称
		    			ksgzsj:"2016-02-16",//开始工作时间
		    			dwdh:"",//单位电话
		    			dwcz:"",//单位传真
		    			dwxxdz:"",//单位详细地址
		    			gkbz:"",//概况备注
		    			gzzlbz:"",//工作资料备注
		    			provinceC:"",//省
		    			cityC:"",//市
		    			areaC:"",//区
		    			allCityC:"",//省里所有市
		    			allAreaC:"",//市里所有区
		    		}
		    	},
		    	tableContacts:[],//联系人信息列表
		    	contacts:{//联系人信息新增
		    		lxrmc:"",//联系人名称
		    		zjlx:"",//证件类型
		    		zjhm:"",//证件号码
		    		ydkrgxlx:"",//与贷款人关系类型
		    		sjhm:"",//手机号码
		    		hjszdxxdz:"",//户籍所在地详细地址
		    		gzdw:"",//工作单位
		    		dwdh:"",//单位电话
		    		dwdz:"",//单位地址
		    		
		    	},
		    	tableAccount:[],//账户信息列表
		    	account:{//账户信息新增
		    		
		    	},
		    	contactsTitle:"联系人新增",//
		    	contactsEdit:false,//编辑标示
		    	addUserDialog:false,//联系人信息弹框
		    	addUserDialog1:false,//账户信息弹框
		    	rules:{
		    		'enterprise.khmc':[
			          	{ required: true, message:'客户名称不能为空', trigger: 'blur' }
			        ],
			        'enterprise.jdrdbr':[
			          	{ required: true, message:'借贷人/担保人不能为空', trigger: 'change' }
			        ],
			        'enterprise.zjlx':[
			          	{ required: true, message:'证件类型不能为空', trigger: 'change' }
			        ],
			        'enterprise.zjhm':[
			          	{ required: true, message:'证件号码不能为空', trigger: 'blur' }
			        ],
			        'enterprise.khjl':[
			          	{ required: true, message:'客户经理不能为空', trigger: 'blur' }
			        ],
			        'bas.sex':[
			          	{ required: true, message:'性别不能为空', trigger: 'blur' }
			        ],
			        'bas.csrq':[
			          	{ required: true, message:' 出生日期不能为空', trigger: 'blur' }
			        ],
			        'bas.mz':[
			          	{ required: true, message:'民族不能为空', trigger: 'change' }
			        ],
			        'bas.hyzk':[
			          	{ required: true, message:'婚姻状况不能为空', trigger: 'change' }
			        ],
			        'bas.jkzk':[
			          	{ required: true, message:'健康状况不能为空', trigger: 'change' }
			        ],
			        'bas.txdzyb':[
			          	{ required: true, message:'通讯地址邮编不能为空', trigger: 'blur' }
			        ],
			        'bas.hjszdyb':[
			          	{ required: true, message:'户籍所在地邮编不能为空', trigger: 'blur' }
			        ],
			        'bas.yx':[
			          	{ required: true, message:'邮箱不能为空', trigger: 'blur' }
			        ],
			        'bas.sjh':[
			          	{ required: true, message:'手机号不能为空', trigger: 'blur' }
			        ],
			        'bas.xxtxdz':[
			          	{ required: true, message:'详细通讯地址不能为空', trigger: 'blur' }
			        ],
			        'bas.hjdz':[
			          	{ required: true, message:'户籍地址不能为空', trigger: 'blur' }
			        ],
			        'spouse.poxm':[
			        	{ required: true, message:'配偶姓名不能为空', trigger: 'blur' }
			        ],
			        'spouse.poxb':[
			        	{ required: true, message:'配偶性别不能为空', trigger: 'change' }
			        ],
			        'spouse.pohyzk':[
			        	{ required: true, message:'配偶婚姻状况不能为空', trigger: 'change' }
			        ],
			        'spouse.pomz':[
			        	{ required: true, message:'配偶民族不能为空', trigger: 'change' }
			        ],
			        'spouse.pokhlx':[
			        	{ required: true, message:'配偶客户类型不能为空', trigger: 'change' }
			        ],
			        'spouse.pojdr':[
			        	{ required: true, message:'配偶借贷人/担保人不能为空', trigger: 'change' }
			        ],
			        'spouse.pozjlx':[
			        	{ required: true, message:'配偶证件类型不能为空', trigger: 'change' }
			        ],
			        'spouse.pozjhm':[
			        	{ required: true, message:'配偶证件号码不能为空', trigger: 'change' }
			        ],
			        'spouse.pocsrq':[
			        	{ required: true, message:'配偶出生日期不能为空', trigger: 'blur' }
			        ],
			        'spouse.posjh':[
			        	{ required: true, message:'配偶手机号不能为空', trigger: 'blur' }
			        ],
			        'spouse.pohjszdyb':[
			        	{ required: true, message:'配偶户籍所在地邮编不能为空', trigger: 'blur' }
			        ],
			        'spouse.podwdzyb':[
			        	{ required: true, message:'配偶单位地址邮编不能为空', trigger: 'blur' }
			        ],
			        'spouse.pohjxxdz':[
			        	{ required: true, message:'配偶户籍详细地址不能为空', trigger: 'blur' }
			        ],
			        'spouse.podwxxdz':[
			        	{ required: true, message:'配偶单位详细地址不能为空', trigger: 'blur' }
			        ],
			        'economics.nsr':[
			        	{ required: true, message:'年收入不能为空', trigger: 'blur' }
			        ],
			        'economics.brysr':[
			        	{ required: true, message:'本人月收入不能为空', trigger: 'blur' }
			        ],
			        'economics.brsjysr':[
			        	{ required: true, message:'本人实际月收入不能为空', trigger: 'blur' }
			        ],
			        'economics.jtsjysr':[
			        	{ required: true, message:'家庭实际月收入不能为空', trigger: 'blur' }
			        ],
			        'economics.gyrs':[
			        	{ required: true, message:'供养人数不能为空', trigger: 'blur' }
			        ],
			        'economics.zyjjly':[
			        	{ required: true, message:'主要经济来源不能为空', trigger: 'change' }
			        ],
			        'economics.qtjjly':[
			        	{ required: true, message:'其他经济来源不能为空', trigger: 'blur' }
			        ],
			        'economics.jtzzc':[
			        	{ required: true, message:'家庭总资产不能为空', trigger: 'blur' }
			        ],
			        'economics.jtfzl':[
			        	{ required: true, message:'家庭负债率不能为空', trigger: 'blur' }
			        ],
			        'housing.bdjzqssj':[
			        	{ required: true, message:'本地居住起始时间不能为空', trigger: 'blur' }
			        ],
			        'housing.jzzk':[
			        	{ required: true, message:'居住状况不能为空', trigger: 'blur' }
			        ],
			        'housing.jtxxzz':[
			        	{ required: true, message:'详细地址不能为空', trigger: 'blur' }
			        ],
			        'work.gzdw':[
			        	{ required: true, message:'工作单位不能为空', trigger: 'blur' }
			        ],
			        'work.dwlx':[
			        	{ required: true, message:'单位类型不能为空', trigger: 'change' }
			        ],
			        'work.sshy':[
			        	{ required: true, message:'所属行业不能为空', trigger: 'blur' }
			        ],
			        'work.ksgzsj':[
			        	{ required: true, message:'开始工作时间不能为空', trigger: 'blur' }
			        ],
			        lxrmc:[
			        	{ required: true, message:'联系人名称不能为空', trigger: 'blur' }
			        ],
			        zjlx:[
			        	{ required: true, message:'证件类型不能为空', trigger: 'blur' }
			        ],
			        zjhm:[
			        	{ required: true, message:'证件号码不能为空', trigger: 'blur' }
			        ],
			        ydkrgxlx:[
			        	{ required: true, message:'与贷款人关系类型不能为空', trigger: 'blur' }
			        ],
			        sjhm:[
			        	{ required: true, message:'手机号码不能为空', trigger: 'blur' }
			        ],
			        hjszdxxdz:[
			        	{ required: true, message:'户籍所在地详细地址不能为空', trigger: 'blur' }
			        ],
		    	}
		   };
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				var self=this
				bus.$on('getValue',res=>{
					self.basic.enterprise.khmc=res;
					console.log(res)
				})
			},
			choseProvince(){
				this.basic.bas.city=""
				this.basic.bas.area=""
				this.mapJson.forEach(item=>{
					if(this.basic.bas.province==item.name){
						this.basic.bas.allCity=item.city;
						console.log(this.basic.bas.allCity)
						return;
					}
				})
			},
			choseCity(){
				this.basic.bas.area=""
				this.basic.bas.allCity.forEach(item=>{
					if(this.basic.bas.city==item.name){
						this.basic.bas.allArea=item.area;
						return
					}
				})
			},
			choseProvinceA(){
				this.basic.bas.cityA=""
				this.basic.bas.areaA=""
				this.mapJson.forEach(item=>{
					if(this.basic.bas.provinceA==item.name){
						this.basic.bas.allCityA=item.city;
						console.log(this.basic.bas.allCity)
						return;
					}
				})
			},
			choseCityA(){
				this.basic.bas.areaA=""
				this.basic.bas.allCityA.forEach(item=>{
					if(this.basic.bas.cityA==item.name){
						this.basic.bas.allAreaA=item.area;
						return
					}
				})
			},
			choseProvinceB(){
				this.basic.housing.cityB=""
				this.basic.housing.areaB=""
				this.mapJson.forEach(item=>{
					if(this.basic.housing.provinceB==item.name){
						this.basic.housing.allCityB=item.city;
						console.log(this.basic.housing.allCity)
						return;
					}
				})
			},
			choseCityB(){
				this.basic.housing.areaB=""
				this.basic.housing.allCityB.forEach(item=>{
					if(this.basic.housing.cityB==item.name){
						this.basic.housing.allAreaB=item.area;
						return
					}
				})
			},
			choseProvinceC(){
				this.basic.work.cityC=""
				this.basic.work.areaC=""
				this.mapJson.forEach(item=>{
					if(this.basic.work.provinceC==item.name){
						this.basic.work.allCityC=item.city;
						console.log(this.basic.housing.allCity)
						return;
					}
				})
			},
			choseCityC(){
				this.basic.work.areaC=""
				this.basic.work.allCityC.forEach(item=>{
					if(this.basic.work.cityC==item.name){
						this.basic.work.allAreaC=item.area;
						return
					}
				})
			},
			choseProvinceD(){
				this.basic.spouse.cityD=""
				this.basic.spouse.areaD=""
				this.mapJson.forEach(item=>{
					if(this.basic.spouse.provinceD==item.name){
						this.basic.spouse.allCityD=item.city;
						console.log(this.basic.spouse.allCity)
						return;
					}
				})
			},
			choseCityD(){
				this.basic.spouse.areaD=""
				this.basic.spouse.allCityD.forEach(item=>{
					if(this.basic.spouse.cityD==item.name){
						this.basic.spouse.allAreaD=item.area;
						return
					}
				})
			},
			choseProvinceE(){
				this.basic.spouse.cityE=""
				this.basic.spouse.areaE=""
				this.mapJson.forEach(item=>{
					if(this.basic.spouse.provinceE==item.name){
						this.basic.spouse.allCityE=item.city;
						return;
					}
				})
			},
			choseCityE(){
				this.basic.spouse.areaE=""
				this.basic.spouse.allCityE.forEach(item=>{
					if(this.basic.spouse.cityE==item.name){
						this.basic.spouse.allAreaE=item.area;
						return
					}
				})
			},
			nextBasic(formName){//基本信息页面的下一步
				console.log(this.num)
        		this.$refs[formName].validate((valid) => {
        			if(valid){
        				this.num = 2
        			}
				})
			},
			backIndex(){//基本信息页面的返回
				this.$emit('fun','0')
			},
			prveContacts(){//联系人信息页面上一步
				this.num--
			},
			nextContacts(){//联系人信息页面下一步
				this.num++
			},
			addContacts(){//联系人信息页面新增
				this.contactsTitle="联系人新增"
				this.contactsEdit=false;
				this.resetForm('contacts')
				this.addUserDialog = true;
				console.log(this.basic)
			},
			resetForm(formName){
				if (this.$refs[formName] !== undefined) {
			        this.$refs[formName].resetFields();
			    }
			},
			sureContacts(formName){//联系人信息页面新增确定
				this.$refs[formName].validate((valid) => {
        			if(valid){
        				this.tableContacts.push({
        					lxrmc:this.contacts.lxrmc,
				    		zjlx:this.contacts.zjlx,
				    		zjhm:this.contacts.zjhm,
				    		ydkrgxlx:this.contacts.ydkrgxlx,
				    		sjhm:this.contacts.sjhm,
				    		hjszdxxdz:this.contacts.hjszdxxdz,
				    		gzdw:this.contacts.gzdw,
				    		dwdh:this.contacts.dwdh,
				    		dwdz:this.contacts.dwdz,
        				})
        				this.addUserDialog = false;
        				this.resetForm(formName)
        			}
				})
			},
			deleteItem(row){//联系人信息页面列表删除行
				this.$confirm(i18n.t('product.whether_to_delete'), i18n.t('Prompt'), {
			        confirmButtonText: i18n.t('OK'),
			        cancelButtonText: i18n.t('Cancel'),
			        type: 'warning'
			    }).then(() => {
			        console.log(row)
			        this.tableContacts.forEach((value,index)=>{
			        	if(value.zjhm==row.zjhm){
			        		this.tableContacts.splice(index,1)
			        		return
			        	}
			        })
			        
			    }).catch(() => {
			        
			    });
			},
			editItem(row,index){//联系人信息页面列表编辑行
				this.contactsTitle="修改联系人信息"
				this.contactsEdit=true;
				this.addUserDialog = true;
				this.contacts.lxrmc=row.lxrmc
		    	this.contacts.zjlx=row.zjlx
		    	this.contacts.zjhm=row.zjhm
		    	this.contacts.ydkrgxlx=row.ydkrgxlx
		    	this.contacts.sjhm=row.sjhm
		    	this.contacts.hjszdxxdz=row.hjszdxxdz
		    	this.contacts.gzdw=row.gzdw
		    	this.contacts.dwdh=row.dwdh
		    	this.contacts.dwdz=row.dwdz
		    	this.contacts.index=index
				console.log(index)
			},
			sureEdit(){//联系人信息页面列表编辑保存
				var index=this.contacts.index
        		this.tableContacts[index].lxrmc = this.contacts.lxrmc
        		this.tableContacts[index].zjlx = this.contacts.zjlx
        		this.tableContacts[index].zjhm = this.contacts.zjhm
        		this.tableContacts[index].ydkrgxlx = this.contacts.ydkrgxlx
        		this.tableContacts[index].sjhm = this.contacts.sjhm
        		this.tableContacts[index].hjszdxxdz = this.contacts.hjszdxxdz
        		this.tableContacts[index].gzdw = this.contacts.gzdw
        		this.tableContacts[index].dwdh = this.contacts.dwdh
        		this.tableContacts[index].dwdz = this.contacts.dwdz
        		this.addUserDialog = false;
			}
		}
	};
</script>

<style  lang='scss' scoped="scoped">
#contract_content {
  .el-dialog {
    width: 60% !important;
  }
}
.el-upload__tip {
  margin-top: 0;
  margin-left: 10px;
}
.el-input-group__prepend {
  background: #3a8ee6;
  color: #fff;
  border: none;
}
.bg{
	background:#fff;
}
.headTab {
	line-height:40px;
	background:#fff;
	padding:8px;
	.el-col{
		background:#eee;
		box-sizing: border-box;
		padding-left:20px;
	}
	.el-col.active{
		background:#5bc0de;
		color:#fff;
	}
}
.basicInformation{
	padding:0 8px;
}
.btnChose{margin-left:5px; margin-top:11px;}
.el-select{width:100%;}
.title{
	line-height:20px; 
	padding:10px;
	margin-top:20px;
	background: -webkit-linear-gradient(#fff,#5bc0de); /* Safari 5.1 - 6.0 */
	background: -o-linear-gradient(#fff,#5bc0de); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(#fff,#5bc0de); /* Firefox 3.6 - 15 */
	background: linear-gradient(#fff,#5bc0de); /* 标准的语法 */
}
</style>