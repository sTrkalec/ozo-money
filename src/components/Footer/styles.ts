import styled from "styled-components";

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    nav{
        display: flex;
        gap: 0.5rem;
        a{
            width: 3rem;
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${props => props.theme["gray-100"]};
            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;
            #linked{
                &:hover{
                    color: ${props => props.theme["linkedin"]};
                }
            }
            #github{
                &:hover{
                    color: ${props => props.theme["github"]};
                }
            }
            #resume{
                &:hover{
                    color: ${props => props.theme["gray-500"]};
                }
            }
          
        }
    }
`