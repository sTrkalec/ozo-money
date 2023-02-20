import * as Dialog from '@radix-ui/react-dialog'
import {
  CloseButton,
  Content,
  Overlay,
} from './styles'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'phosphor-react'
import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const NewUserFormSchema = z.object({
  email: z.string(),
  password: z.string(),
  Confirmedpassword: z.string()
})

type RegisterUserFormInputs = z.infer<typeof NewUserFormSchema>

export function RegisterAccountModal() {

  console.log(auth.currentUser?.email)

  const {
    reset,
    register,
    handleSubmit,
  } = useForm<RegisterUserFormInputs>({
    resolver: zodResolver(NewUserFormSchema),
  })

  async function handleCreateNewTransaction(data: RegisterUserFormInputs) {
    const { password, Confirmedpassword } = data


    try {
      if (password !== Confirmedpassword) {
        alert('As senhas digitadas não coincidem.');
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        alert('Conta criada com sucesso!');
        reset()
      }
  
    } catch (error) {
      alert("Usuário já cadastrado")
    }

  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <CloseButton>
          <X />
        </CloseButton>
        <Dialog.Title>Cadastro</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Email"
            required
            {...register('email')}
          />
          <input
            type="password"
            placeholder="Password"
            required
            {...register('password')}
          />
          <input
            type="password"
            placeholder="Password"
            required
            {...register('Confirmedpassword',)}
          />

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
