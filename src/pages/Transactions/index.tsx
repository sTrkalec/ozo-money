import { Trash } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  RemoveTransaction,
  TransactionsContainer,
  TransactionsDiv,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const { transactions, removeTransactions } = useContext(TransactionContext)

  async function handleRemoveTransiton(data: any) {
    await removeTransactions(data)
  }

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        <TransactionsDiv>
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                      
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                    <td>
                      <RemoveTransaction
                        onClick={() => handleRemoveTransiton(transaction.id)}
                      >
                        <Trash size={24} />
                      </RemoveTransaction>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TransactionsDiv>
      </TransactionsContainer>
    </div>
  )
}
