<template>
  <AtAccordion
    class="card"
    :open="open1"
    :onClick="accordionChange1.bind(this)"
    title="基本信息"
  >
    <AtInput
      class="input"
      title="患者姓名"
      type="text"
      placeholder="请输入患者姓名"
      :value="patientInfo.name"
      :onChange="nameInput.bind(this)"
      required
    />
    <AtInput
      class="input"
      title="患者年龄"
      type="nubmer"
      placeholder="请输入患者年龄"
      :value="patientInfo.age"
      :onChange="ageInput.bind(this)"
      required
    />
    <Picker
      class="picker"
      mode="selector"
      :range="genderSelector"
      :onChange="onChangeGender.bind(this)"
    >
      <AtList>
        <AtListItem title="患者性别" :extraText="patientInfo.gender" />
      </AtList>
    </Picker>
    <AtInput
      class="input"
      title="联系电话"
      type="nubmer"
      placeholder="请输入联系电话"
      :value="patientInfo.phone"
      :onChange="phoneInput.bind(this)"
    />
  </AtAccordion>
  <AtAccordion
    class="card"
    :open="open2"
    :onClick="accordionChange2.bind(this)"
    title="其他信息"
  >
    <AtInput
      class="input"
      title="慢性病"
      type="text"
      placeholder="请输入患者病症"
      :value="patientInfo.illness"
      :onChange="illnessInput.bind(this)"
    />
    <Picker
      class="picker"
      mode="selector"
      :range="relationSelector"
      :onChange="onChangeRelation.bind(this)"
    >
      <AtList>
        <AtListItem title="关系" :extraText="patientInfo.relation" />
      </AtList>
    </Picker>
    <Picker
      class="picker"
      mode="selector"
      :range="livingSelector"
      :onChange="onChangeLiving.bind(this)"
    >
      <AtList>
        <AtListItem title="是否独居" :extraText="patientInfo.liveAlone" />
      </AtList>
    </Picker>
    <view class="textarea">
      <text class="title">饮食习惯</text>
      <AtTextarea
        class="content"
        :value="patientInfo.eatingHabit"
        :onChange="eatingHabitInput.bind(this)"
        :maxLength="200"
        placeholder="患者的饮食喜好、禁忌等..."
      />
    </view>
    <view class="textarea">
      <text class="title">身体状况</text>
      <AtTextarea
        class="content"
        :value="patientInfo.bodyHealth"
        :onChange="bodyHealthInput.bind(this)"
        :maxLength="200"
        placeholder="患者身体状况，是否残疾、生活是否自理等..."
      />
    </view>
  </AtAccordion>
  <AtButton v-if="id == -1" class="save" @click="save">添加</AtButton>
</template>


<script>
export default {
  name: "editPatientInfoPage",
};
</script>

<script setup>
import "./editPatientInfo.sass";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
  set,
} from "../../utils/global_data";
import PatientInfo from "../../utils/patientInfo";
import { ref } from "vue"; //声明响应式数据

let patientInfo = ref(new PatientInfo());
let id = ref(-1); // id表示的要编辑的患者信息的id，-1表示新增
// 接收页面传参
useLoad((o) => {
  id.value = o.id;
  console.log(id.value);
  if (o.id != -1) {
    patientInfo.value = getGlobalData("patients")[o.id];
  }
});
//控制手风琴打开/关闭
let open1 = ref(true);
let open2 = ref(false);
function accordionChange1(e) {
  open1.value = e;
}
function accordionChange2(e) {
  open2.value = e;
}
//基本信息
let genderSelector = ["男", "女"];
function nameInput(e) {
  console.log("name", e);
  patientInfo.value.name = e;
}
function ageInput(e) {
  console.log("age", e);
  patientInfo.value.age = e;
}
function phoneInput(e) {
  console.log("phone", e);
  patientInfo.value.phone = e;
}
function onChangeGender(e) {
  console.log("gender", e);
  patientInfo.value.gender = genderSelector[e.detail.value];
}
// 其他信息
let relationSelector = [
  "子女",
  "子孙",
  "近亲属",
  "邻居",
  "社区工作人员",
  "养老院工作人员",
  "其他",
];
let livingSelector = ["是", "否", "保密"];
// 监听输入框变化
function illnessInput(e) {
  console.log("illness", e);
  patientInfo.value.illness = e;
}
function onChangeRelation(e) {
  console.log("relation", e);
  patientInfo.value.relation = relationSelector[e.detail.value];
}
function onChangeLiving(e) {
  console.log("living", e);
  patientInfo.value.liveAlone = livingSelector[e.detail.value];
}
function eatingHabitInput(e) {
  console.log("eatingHabit", e);
  patientInfo.value.eatingHabit = e;
}
function bodyHealthInput(e) {
  console.log("bodyHealth", e);
  patientInfo.value.bodyHealth = e;
}
// 保存信息
function save() {
  console.log("save");
  // 确保必填项已填
  if (patientInfo.value.name && patientInfo.value.age) {
    let patients = getGlobalData("patients");
    // -1表示新增
    if (id.value == -1) {
      // 避免使用push时undefined错误
      if (!patients) patients = [];
      patients.push(patientInfo.value);
    } else {
      patients[id] = patientInfo.value;
    }
    console.log("aaa", patients);
    setGlobalData("patients", patients);
    // 向云端保存数据(未测试)
    Taro.request({
      url: "https://api.rainmaker.espressif.com/v1/user/custom_data/",
      method: "POST",
      data: {
        membership_info: {
          value: {
            premium: false,
          },
        },
        profile: {
          value: {
            patients: patients,
          },
        },
      },
      header: {
        "content-type": "application/json",
      },
      success: (res2) => {
        console.log("success!", res2);
      },
    });
  } else {
    Taro.showToast({
      title: "姓名和年龄为必填项",
      icon: "none",
      duration: 1000,
    });
  }
}
</script>
