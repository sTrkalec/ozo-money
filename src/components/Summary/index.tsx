import { SummaryCard, SummaryContainer } from './styles'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  CurrencyDollarSimple,
} from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSumary.'

export function Summary() {
  const summary = useSummary()
  let numero = summary.total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  numero = numero.replace(/^(-)/, '$1 ')

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>
          {' '}
          {summary.total < 0
            ? numero
            : priceFormatter.format(summary.total)}{' '}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
ArrowCircleUp
