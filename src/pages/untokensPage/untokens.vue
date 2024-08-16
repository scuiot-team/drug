<template>
  <View class="root-untokens">
    <View
      v-if="state.showUntokenDrug"
      class="time-up-cover warning"
      @click="hideDrugInfo"
    >
      <View class="prompt">
        您还没有服用{{ state.untokenDrug.drugName }}，请尽快服用
      </View>
      <View class="drug-info-container">
        <View class="drug-name">{{ state.untokenDrug.drugName }}</View>
        <View class="drug-dose">{{ state.untokenDrug.dose }}</View>
        <View class="drug-form">
          {{ state.untokenDrug.dosage }}
          {{ state.untokenDrug.form }}
        </View>
      </View>
      <View class="btn-container">
        <AtButton class="skip-btn" @click="untokenDone(true)" type="primary">
          忽略提醒
        </AtButton>
        <AtButton class="done-btn" @click="untokenDone(false)" type="primary">
          已服药
        </AtButton>
        <AtButton class="cancel-btn" @click="hideDrugInfo" type="secondary">
          取消
        </AtButton>
      </View>
      <View class="drug-date">
        该药应于
        {{ state.untokenDrug.date }}
        {{ state.untokenDrug.time }}
        服用
      </View>
    </View>
    <View class="headline">未服用的药物</View>
    <AtList v-for="(drug, index) in state.untokenDrugs" :key="index">
      <AtListItem
        hasBorder
        class="normal"
        :title="drug.drugName"
        :extraText="`${drug.dosage} ${drug.form} ${drug.dose}`"
        :onClick="showDrugInfo.bind(this, drug)"
      />
    </AtList>
  </View>
</template>

<script>
export default {
  name: "untokensPage",
};
</script>

<script setup>
import "./untokens.sass";
import Taro from "@tarojs/taro";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { reactive, ref } from "vue";
import { DrugData, DrugRecord, getUntokenDrugs } from "../../utils/drugData";

let drugs = ref(getGlobalData("drugs"));
let drugRecord = ref(getGlobalData("drugRecord"));

let state = reactive({
  untokenDrugs: [],
  untokenDrug: null,
  showUntokenDrug: false,
});

function calcDHMS(timeDiff) {
  const t = 1000;
  const m = t * 60;
  const h = m * 60;
  const d = h * 24;
  let day = Math.floor(timeDiff / d);
  let hours = Math.floor((timeDiff - day * d) / h);
  let minutes = Math.floor((timeDiff - hours * h) / m);
  let seconds = Math.floor((timeDiff - hours * h - minutes * m) / t);
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function updateToNext() {
  // console.log("获取未服药的药物 和 下一次服药的药物");
  // 获取未服药的药物 和 下一次服药的药物
  let untokens = getUntokenDrugs(drugs.value, drugRecord.value);
  state.untokenDrugs = untokens[0];
  state.nextDrug = untokens[1];
  // 计算nextDrug对应的时间，与当前时间做差，得到TimeDiff。传入函数中计算小时、分钟、秒
  let nowTime = new Date().getTime(); // TimeStamp
  state.clock = calcDHMS(DrugRecord.getTime(state.nextDrug) - nowTime);
}

function untokenDone(skip = false) {
  // console.log("删除未服药药物");
  // 删除未服药的第一个药物
  let tmp = state.untokenDrugs.shift();
  // 如果选择跳过，虽然仍然会被放入已服用，但是标记skip=true
  tmp.skip = skip;
  // 用于调试
  console.log(`new DrugRecord("${tmp.id}", \
"${tmp.drugName}", \
"${tmp.dosage}", \
"${tmp.form}", \
"${tmp.dose}", \
"${tmp.date}", \
"${tmp.time}", \
${skip})`);
  drugRecord.value.push(tmp);
  hideDrugInfo();
  updateToNext();
}

function showDrugInfo(drug) {
  state.showUntokenDrug = true;
  state.untokenDrug = drug;
}

function hideDrugInfo() {
  state.showUntokenDrug = false;
}

// 初始化
updateToNext();
</script>
