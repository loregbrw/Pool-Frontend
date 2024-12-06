import { StyledSpaceBetween } from "../../../column/style";
import { StyledButton, StyledSection, StyledSectionTitle } from "../style";

interface ISectionProps {
    title: string,
    button: {
        label: string,
        action: (e: any | undefined) => void
    }
    children: React.ReactNode
}

const Section = ({ title, button, children }: ISectionProps) => {
    return (
        <>
            <StyledSection>
                <StyledSpaceBetween>
                    <StyledSectionTitle>
                        { title }
                    </StyledSectionTitle>
                    <StyledButton onClick={button.action}>{ button.label }</StyledButton>
                </StyledSpaceBetween>
                { children }
            </StyledSection>
        </>
    )
}

export default Section;