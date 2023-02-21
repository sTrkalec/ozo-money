import styled from "styled-components";




export const HeaderLogin = styled.div`

    display: flex;
    justify-content: center;
    margin-top: 5rem;
    img{
        width: 300px;
        height: 300px;
    }
    @media only screen and (max-width: 780px)  {
      img{
        width:150px;
        height: 100px;
      }
    }
    @media only screen and (max-width: 320px)  {
        margin-top: 0rem;
    }
`
export const MainLogin = styled.main`
`

export const LoginFormContainer = styled.form`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    input{
        flex: 1;
        border-radius: 6px;
        width: 20rem;
        border: 0;
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme['gray-300']};
        padding: 1rem;
    }
    
    div{
        display: flex;
        justify-content: center;
    }

    input:last-of-type{
        margin-bottom: 1rem;
    }

    label{
        color: ${(props) => props.theme.white};
        font-size: 20px;
        margin-bottom: 1rem;
    }

    label:last-of-type{
        margin-top: 1rem;
    }

    button{
        height: 40px;
        width: 8rem;
        border: 0;
        background: ${(props) => props.theme['green-500']};
        color: ${(props) => props.theme.white};
        font-weight: bold;
        border-radius: 6px;
        cursor: pointer;
    }

    button:last-of-type{
        margin-left: 1rem;

    }
`

export const LoginDivision = styled.div`

    display: flex;
    flex-direction: column;

`

export const LoginMainContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    position:fixed;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
`