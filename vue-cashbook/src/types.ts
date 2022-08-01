export interface Bill {
  type: number;
  time: number;
  category: string;
  amount: number;
}

export interface BillType {
  [type: number]: string;
}

export interface Category {
  id: string
  type: number;
  name: string;
}