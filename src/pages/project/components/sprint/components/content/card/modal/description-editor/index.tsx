import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import { useEffect, useRef } from 'react';
import { CommandHandler, TextareaMarkdownRef } from 'textarea-markdown-editor';
import { HoverButton, StyledButton, StyledButtonRight, StyledButtonRightB, StyledButtons, StyledContainer, StyledTextArea, TextareaContainer } from './style';

interface IDescriptionProps {
    description?: string;
    value: string;
    setValue: (e: string) => void
}

const emojiCommandHandler: CommandHandler = ({ cursor }) => {
    cursor.insert(`${cursor.MARKER}❤️${cursor.MARKER}`);
};

const DescriptionEditor = ({ description, value, setValue }: IDescriptionProps) => {

    const ref = useRef<TextareaMarkdownRef>(null);

    useEffect(() => {
        setValue(description || "")
    }, [description])

    return (
        <StyledContainer>
            <StyledButtons>
                <StyledButton onClick={() => ref.current?.trigger('bold')} style={{ borderRadius: "3px 0 0 0 ", fontWeight: "700" }}>B</StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('italic')} style={{ fontStyle: "italic", fontFamily: "\"PT Serif\", serif", fontWeight: "600" }}>I</StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('h1')}>h1</StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('h2')}>h2</StyledButton>
                <StyledButtonRightB onClick={() => ref.current?.trigger('h3')}>h3</StyledButtonRightB>
                <StyledButton onClick={() => ref.current?.trigger('link')}>link</StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('unordered-list')}><FormatListBulletedIcon fontSize='small' /></StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('ordered-list')}><FormatListNumberedIcon fontSize='small' /></StyledButton>
                <StyledButton onClick={() => ref.current?.trigger('code')}><CodeIcon fontSize='small' /></StyledButton>
                <StyledButtonRight onClick={() => ref.current?.trigger('insert-emoji')}>❤️</StyledButtonRight>
            </StyledButtons>
            <TextareaContainer>
                <StyledTextArea
                    ref={ref}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    commands={[
                        {
                            name: 'code',
                            shortcut: ['command+/', 'ctrl+/'],
                            shortcutPreventDefault: true,
                        },
                        {
                            name: 'insert-emoji',
                            handler: emojiCommandHandler,
                        },
                    ]}
                />
                <HoverButton onClick={() => setValue(description || "")}>discard changes</HoverButton>
            </TextareaContainer>
        </StyledContainer>
    );
}

export default DescriptionEditor;