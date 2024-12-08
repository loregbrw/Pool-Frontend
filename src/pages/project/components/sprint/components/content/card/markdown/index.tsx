import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import "./style.css"
import { StyledDescription } from '../modal/style';

interface IStyledMarkdownProps {
    description: string;
    customClass?: string;
}

const StyledMarkdown = ({ description, customClass }: IStyledMarkdownProps) => {
    return (
        <>
            <StyledDescription
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                className={customClass}
            >{description}
            </StyledDescription>
        </>
    )
}

export default StyledMarkdown;