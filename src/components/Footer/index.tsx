import { Timer, Scroll, GithubLogo, LinkedinLogo, BagSimple } from "phosphor-react"
import { NavLink } from "react-router-dom"
import { FooterContainer } from "./styles"

export function Footer() {
    return (
        <FooterContainer>
            <nav>
                <a href="https://github.com/sTrkalec" target={"_blank"}><GithubLogo id="github" size={30} weight="bold" /></a>
                <a href="https://www.linkedin.com/in/strkalec/" target={"_blank"}><LinkedinLogo id="linked" size={30} weight="bold"/></a>
                <a href="https://aboutozo.vercel.app/" target={"_blank"}><BagSimple id="resume" size={30} weight="bold" /></a>
            </nav>
        </FooterContainer>
    )
}