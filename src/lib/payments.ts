export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const payments: Payment[] = [
  {
    id: 'aaa01',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'aaa02',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa03',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa04',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa05',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa06',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa07',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa08',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa09',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa10',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa11',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa12',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa13',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: 'aaa14',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
]
