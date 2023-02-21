import styled from 'styled-components'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DivisionButtonDin = styled.div`
display: flex;
`


export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    transition: background-color 0.3s;
    background: ${(props) => props.theme['green-700']};
  }

  @media only screen and (max-width: 780px)  {
    padding: 0 1rem;
  }
  @media only screen and (max-width: 500px)  {
    padding: 0.2rem;
    height: 30px
  }
`
