import { Children, createContext, ReactNode, useEffect, useState } from 'react'
import { date } from 'zod'
import { api } from '../lib/axios'

interface Transaction {
  income: number
  total: number
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionsInput {
  description: string
  price: number
  cartegory: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactios: (data: CreateTransactionsInput) => Promise<void>
  removeTransactions: (id: number) => Promise<void>
}

interface TransactiosProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactiosProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransactios(data: CreateTransactionsInput) {
    const { description, price, cartegory, type } = data

    const response = await api.post('/transactions', {
      description,
      data,
      price,
      cartegory,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  async function removeTransactions(id: number) {
    await api.delete(`/transactions/${id}`)

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    )

    setTransactions(updatedTransactions)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransactios,
        removeTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
