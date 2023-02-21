import { Student } from 'phosphor-react'
import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 1rem;
    background: ${(props) => props.theme['gray-700']};
    font-size: 15px;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    @media only screen and (max-width: 500px)  {
      padding: 1.25rem 1rem;
    }
  }
`

export const TransactionsDiv = styled.div`
      @media only screen and (max-width: 635px)  {
        overflow: auto;
      }

`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const RemoveTransaction = styled.button`
  display: flex;
  align-items: center;

  padding: 1rem;
  background: transparent;
  border: 0;
  color: ${(props) => props.theme['red-500']};
  cursor: pointer;
`

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant == 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
