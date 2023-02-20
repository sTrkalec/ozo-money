import { HeaderLogin, LoginDivision, LoginFormContainer, LoginMainContainer } from "./styled";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string } from "zod";
import * as Dialog from '@radix-ui/react-dialog'
import { RegisterAccountModal } from "../../components/RegisterAccount";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import LogoImg from '../../assets/logo.svg'
import { Footer } from "../../components/Footer";






export function Login() {
    const navigate = useNavigate();

    const login = z.object({
        email: z.string(),
        password: string()
    })

    type LoginFormInput = z.infer<typeof login>

    const {
        register,
        handleSubmit,
    } = useForm<LoginFormInput>({
        resolver: zodResolver(login),
    })

    async function Teste(data: any) {

        try {
            let response = await signInWithEmailAndPassword(auth, data.email, data.password)
            navigate("/home")
            console.log(response)
        } catch (error) {
            alert("Usuário não cadastrado")
            console.log(error)
        }

        // if (data.email) {
        //     navigate("/home")
        // }
    }

    return (
        <LoginMainContainer>
            <HeaderLogin>
                <img src={LogoImg} alt="" />
            </HeaderLogin>
            <LoginFormContainer onSubmit={handleSubmit(Teste)}>
                <LoginDivision>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Digite seu Email"
                        required
                        {...register('email')}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        required
                        {...register('password')}
                    />
                    <div>
                        <button type="submit">Entrar</button>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>Cadastrar</button>
                            </Dialog.Trigger>

                            <RegisterAccountModal />
                        </Dialog.Root>
                    </div>
                </LoginDivision>
            </LoginFormContainer>
            <Footer/>
        </LoginMainContainer>
    

    )
}