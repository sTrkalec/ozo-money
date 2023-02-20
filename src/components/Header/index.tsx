import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import {
  Plus,
  SignOut
} from 'phosphor-react'
import LogoImg from '../../assets/logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionsModal } from '../NewTransactionsModal'
import { signOut } from 'firebase/auth'
import { auth } from "../../config/firebase-config";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { TransactionContext } from '../../contexts/TransactionsContext'


export function Header() {
  const { logout } = useContext(TransactionContext)
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImg} alt="" />

        <div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton><Plus size={24}/></NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionButton onClick={logout}><SignOut size={24}/></NewTransactionButton>
          <NewTransactionsModal/>
        </Dialog.Root>
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
