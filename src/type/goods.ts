export interface ListInt {
    userId: number,
    id: number,
    title: string,
    introduce: string,
}
interface selectDataInt {
    title: string,
    introduce: string,
    page: number,
    count: number,
    pagesize: number,
}
export class InitData {
    selectDataInt:selectDataInt = {
        title: "",
        introduce: "",
        page: 1,
        count: 0,
        pagesize: 10,
    }
    // 展示的内容数据
    list:ListInt[] = [] 
}