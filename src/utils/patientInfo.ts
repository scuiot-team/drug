export default class PatientInfo {
  constructor(
    public name: string,
    public age: number,
    public gender: string = '男',
    public phone: string,
    public avatar: string = 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280',
    public relation: string = '其他',
    public illness: string,
    public liveAlone: string = '否',
    public eatingHabit: string,
    public bodyHealth: string,
    public height: number,
    public weight: number,
    public BP: number,
    public BF: number,
    public BG: number,
    public HR: number,
    public drug: string) { }
}
