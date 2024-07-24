export class DrugInfo {
  constructor(
    public time: string,  // 存入时间
    public name: string,  // 药品名称
    public use: string,   // 用法用量
    public func: string,  // 功能主治
    public otc: boolean,  // 是否OTC
  ) {}
}

export class DrugData {
  constructor(
    public id: string,        // 唯一标识   // 先用TimeStamp代替
    public drugName: string,  // 药品名称
    public dosage: string,    // 给药剂量
    public form: string,      // 药物剂型
    public dose: string,      // 给药方式
    public interval: string,  // 给药间隔
    public time: string,      // 初次给药
    public startDate: string, // 开始日期
    public stopDate: string,  // 结束日期
  ) { }

  static findWithID(drugs: DrugData[], id: string): DrugData | undefined {
    return drugs.find(item => item.id === id);
  }
}

export class DrugRecord {
  constructor(
    // ==== 注意用药记录的id就是该药物id ====
    public id: string,        // 唯一标识
    public drugName: string,  // 药品名称
    public dosage: string,    // 给药剂量
    public form: string,      // 药物剂型
    public dose: string,      // 给药方式
    public date: string,      // 服药日期
    public time: string,      // 服药时间
    public skip: Boolean,     // 是否跳过
  ) {
    // set skip=false on default.
    this.skip = false;
  }

  static getTime(a: DrugRecord): number {
    return new Date(a.date + 'T' + a.time).getTime();
  }

  static compareByDateTime(a: DrugRecord, b: DrugRecord): number {
    const m = DrugRecord.getTime(a);
    const n = DrugRecord.getTime(b);

    if (m < n) {
      return -1;
    } else if (m > n) {
      return 1;
    } else {
      return 0;
    }
  }
}

// 从Timestamp获取年月日、时分秒
function getDHMS(timestamp: number): [string, string, string, string] {
  // date
  let time = new Date(timestamp);
  let year = time.getFullYear();
  let month = String(time.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  let day = String(time.getDate()).padStart(2, "0");
  let date = year + "-" + month + "-" + day;
  // time
  let hours = String(time.getHours()).padStart(2, "0");
  let minutes = String(time.getMinutes()).padStart(2, "0");
  let seconds = String(time.getSeconds()).padStart(2, "0");
  return [date, hours, minutes, seconds]
}

function toStamp(time: string): number {
  // 返回毫秒 timestamp
  let [hours, minutes, seconds] = time.split(':');
  return (Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * 1000;
}

function toTimeStamp(date: string, time: string): number {
  // 返回毫秒 timestamp
  return new Date(date + 'T' + time).getTime();
}

// // 接受一个参数drugs，返回当前时间下马上要服药的药品名称和距离服药的时间
// export function getNextDrug(drugs: DrugData[]): {
//   drugName: string,
//   timeDiff: number,
//   index: number
// } {
//   let nowTime = new Date().getTime();
//   console.log("now:", nowTime);
//   let minTime = 9999999999999;
//   let minDrug = '';
//   let minIndex = 0;
//   // 遍历当前给药方案
//   drugs.forEach((drug, index) => {
//     // 将开始服药时间转换为时间戳
//     let startstamp = toTimeStamp(drug.startDate, drug.time);
//     let stopstamp = toTimeStamp(drug.stopDate, '24:00:00');
//     let interval = toStamp(drug.interval);
//     if (startstamp <= nowTime && nowTime <= stopstamp) {
//       let nextTime = startstamp;
//       // 找到下一个服药时间
//       while (nextTime <= nowTime) {
//         nextTime += interval;
//       }
//       if (nextTime < minTime) {
//         minTime = nextTime;
//         minDrug = drug.drugName;
//         minIndex = index;
//       }
//     }
//   });
//   return {
//     drugName: minDrug,
//     timeDiff: minTime - nowTime,
//     index: minIndex,
//   };
// }

// 接受 药物列表drugs[] 和 已经服用的药物记录drugRecord[]
export function getUntokenDrugs(drugs: DrugData[], drugRecord: DrugRecord[]): [
  // 返回当前时间下还没服用的药物列表 以及 将要服用的下一个药物
  DrugRecord[], DrugRecord
] {
  // 当前时间戳
  let nowTime = new Date().getTime();
  // 返回值
  let result: DrugRecord[] = [];
  let nextDrug: any[] = [];
  // 将 drugRecord 按照 id 分类
  // 请先确保 drugRecord 按照时间先后顺序排序！（否则需要进行排序）
  let classifiedDrugRecord = {};
  drugRecord.forEach(record => {
    if (!classifiedDrugRecord[record.id]) {
      classifiedDrugRecord[record.id] = [];
    }
    classifiedDrugRecord[record.id].push(record);
  });
  // console.log("classifiedDrugRecord:", classifiedDrugRecord);
  // 遍历当前给药方案
  drugs.forEach((drug) => {
    // 将开始服药时间转换为时间戳
    let startstamp = toTimeStamp(drug.startDate, drug.time);
    let stopstamp = toTimeStamp(drug.stopDate, '24:00:00');
    let interval = toStamp(drug.interval);
    if (startstamp <= nowTime && nowTime <= stopstamp) {
      // 最新服药记录
      let latestStamp = startstamp; // 如果是第一次服药，则最新服药记录为开始服药时间
      if (classifiedDrugRecord[drug.id]) { // 说明该药物不是第一次服药
        let latestRecord = classifiedDrugRecord[drug.id].slice(-1)[0];
        latestStamp = toTimeStamp(latestRecord.date, latestRecord.time);
      }
      // 找到下一个服药时间
      // console.log("id:", drug.id, "latestStamp:", latestStamp, nowTime);
      while (latestStamp <= nowTime) {
        latestStamp += interval;
        let [d, h, m, s] = getDHMS(latestStamp);
        result.push(
          new DrugRecord(
            drug.id,
            drug.drugName,
            drug.dosage,
            drug.form,
            drug.dose,
            d, `${h}:${m}:${s}`,
            false
          )
        );
        // console.log("pushed:", result[result.length - 1]);
      }
      // 此时 latestStamp > nowTime
      let tmp = result.pop(); // result 的最后一个值舍去
      if (tmp != undefined) {
        nextDrug.push(tmp); // 存入nextDrug
      }
    }
  });
  // 从大到小排序 第一个就是最新的那个
  result.sort(DrugRecord.compareByDateTime);
  nextDrug.sort(DrugRecord.compareByDateTime);
  // console.log("result:", result);
  // console.log("nextDrug:", nextDrug);
  return [result, nextDrug[0]];
}


// 接受 药物列表drugs[] 和 截止时间
// 返回当前时间到截止时间（未来）的所有需要服用的药物
export function getFutureDrugs(
  drugs: DrugData[],
  drugRecord: DrugRecord[],
  begStamp: number,
  endStamp: number
): DrugRecord[] {
  // 返回值
  let result: DrugRecord[] = [];
  // 将 drugRecord 按照 id 分类
  // 请先确保 drugRecord 按照时间先后顺序排序！（否则需要进行排序）
  let classifiedDrugRecord = {};
  drugRecord.forEach(record => {
    if (!classifiedDrugRecord[record.id]) {
      classifiedDrugRecord[record.id] = [];
    }
    classifiedDrugRecord[record.id].push(record);
  });
  // console.log("classifiedDrugRecord:", classifiedDrugRecord);
  // 遍历当前给药方案
  drugs.forEach((drug) => {
    // 将开始服药时间转换为时间戳
    let startstamp = toTimeStamp(drug.startDate, drug.time);
    let stopstamp = toTimeStamp(drug.stopDate, '24:00:00');
    let interval = toStamp(drug.interval);
    if (startstamp <= begStamp && begStamp <= stopstamp) {
      // 最新服药记录的时间（timestamp）
      let latestStamp = startstamp; // 如果是第一次服药，则最新服药记录为开始服药时间
      if (classifiedDrugRecord[drug.id]) { // 说明该药物不是第一次服药
        let latestRecord = classifiedDrugRecord[drug.id].slice(-1)[0];
        latestStamp = toTimeStamp(latestRecord.date, latestRecord.time);
      }
      // 找到大于begStamp的下一个服药时间
      let N = Math.ceil((begStamp - latestStamp) / interval);
      if (N > 0) { // begStamp > latestStamp
        let nextTime = latestStamp + N * interval;
        while (nextTime <= endStamp) {
          let [d, h, m, s] = getDHMS(nextTime);
          result.push(
            new DrugRecord(
              drug.id,
              drug.drugName,
              drug.dosage,
              drug.form,
              drug.dose,
              d, `${h}:${m}:${s}`,
              false
            )
          );
          nextTime += interval;
        }
      }
    }
  });
  // 从大到小排序 第一个就是最新的那个
  result.sort(DrugRecord.compareByDateTime);
  return result;
}
