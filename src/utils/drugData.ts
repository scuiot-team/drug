export default class DrugData {
  constructor(
    public drugName: String,  // 药品名称
    public dosage: String,    // 给药剂量
    public form: String,      // 药物剂型
    public dose: String,      // 给药方式
    public interval: String,  // 给药间隔
    public time: String,      // 初次给药
    public startDate: String, // 开始日期
    public stopDate: String,  // 结束日期
  ) { }
}

// 处理 drugData
// example:
// let drugs = [
//   // 给药间隔 12h
//   new DrugData('阿司匹林', '1', '片', '口服', '12:00', '08:00', '2024-10-01', '2024-10-10'),
//   // 给药间隔 6h
//   new DrugData('山莨菪碱', '1', '片', '口服', '06:00', '08:00', '2024-10-01', '2024-10-10'),
//   // 给药间隔 3.5h
//   new DrugData('阿托品', '2', '片', '口服', '03:30', '08:00', '2024-10-01', '2024-10-10'),
//   // 给药间隔 24h
//   new DrugData('胰岛素', '1', '片', '口服', '24:00', '08:00', '2024-10-01', '2024-10-10'),
// ]

function toTimeStamp(time: String): number {
  // 返回毫秒 timestamp
  let [hour, minute] = time.split(':');
  return (Number(hour) * 60 + Number(minute)) * 60 * 1000;
}

// 写出一个function，接受一个参数drugs，返回当前时间下马上要服药的药品名称和距离服药的时间
export function getNextDrug(drugs: DrugData[]): { drugName: String, timeDiff: number, index: number } {
  let nowTime = new Date().getTime();
  console.log("now:", nowTime);
  let minTime = 9999999999999;
  let minDrug = '';
  let minIndex = 0;
  drugs.forEach((drug, index) => {
    // 将开始服药时间转换为时间戳
    let startstamp = new Date(drug.startDate + ' ' + drug.time).getTime();
    let stopstamp = new Date(drug.stopDate + ' ' + '24:00').getTime();
    let interval = toTimeStamp(drug.interval);
    if (startstamp <= nowTime && nowTime <= stopstamp) {
      let nextTime = startstamp;
      // 找到下一个服药时间
      while (nextTime <= nowTime) {
        nextTime += interval;
      }
      if (nextTime < minTime) {
        minTime = nextTime;
        minDrug = String(drug.drugName);
        minIndex = index;
      }
    }
  });
  return {
    drugName: minDrug,
    timeDiff: minTime - nowTime,
    index: minIndex,
  };
}

