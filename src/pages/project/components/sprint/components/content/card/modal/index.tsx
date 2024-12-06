import Section from "./section";
import toast from "react-hot-toast";
import DescriptionEditor from "./description-editor";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EColorPalette from "../../../../../../../../enums/EColorPalette";

import { ICard } from "../../../../../..";
import { Grid, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { StyledSpaceBetween } from "../../column/style";
import { StyledForm } from "../../../../style";
import { StyledModal } from "../../../../../../../../components/modal/style";
import { api } from "../../../../../../../../services/api";
import { StyledCardName, StyledDate, StyledEmoji, StyledImg, StyledUsers } from "../style";
import { StyledCardButton, StyledDescription, StyledGrid, StyledInput, StyledTitle } from "./style";

interface ICardModalProps {
    card: ICard;
}

interface IUpdateCard {
    name?: string;
    description?: string
}

const CardModal = ({ card }: ICardModalProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [currentCard, setCurrentCard] = useState(card);

    const [editingName, setEditingName] = useState(false);
    const [editingNameContent, setEditingNameContent] = useState("");

    const [editingDescription, setEditingDescription] = useState(false);
    const [editingDescriptionContent, setEditingDescriptionContent] = useState(currentCard.description);

    useEffect(() => {
        setCurrentCard(card);
    }, [card])

    useEffect(() => {
        if (editingName && inputRef.current)
            inputRef.current.focus();

    }, [editingName]);

    const openEditName = () => {
        setEditingNameContent(currentCard.name);
        setEditingName(true);
    }

    const apiRequest = async (props: IUpdateCard) => {
        const response = await api.patch(`/cards/${currentCard.id}`,
            {
                name: props.name,
                description: props.description
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newCard = response.data.card;
        setCurrentCard({ ...currentCard, name: newCard.name, description: newCard.description })
    }

    const editCard = async (e: React.FormEvent, props: IUpdateCard) => {
        e.preventDefault();

        toast.promise(
            apiRequest(props).catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Updating card...",
                success: "Card updated successfully!",
                error: (err) => err,
            }
        )
    }

    const apiRequestStatus = async () => {
        const response = await api.patch(`/cards/${currentCard.id}`,
            {
                status: !currentCard.status
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newCard = response.data.card;
        setCurrentCard({ ...currentCard, status: newCard.status });
    }

    const toggleStatus = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();

        toast.promise(
            apiRequestStatus().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Toggling card status...",
                success: !currentCard.status ? "Finished card!" : "Unfinished card!",
                error: (err) => err,
            }
        )
    }

    return (
        <>
            <StyledModal style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "calc(100% - 40px)", maxWidth: "900px", height: "calc(100% - 120px)", maxHeight: "fit-content", border: `10px solid ${EColorPalette.MINTCREAM}`, padding: "10px" }}>
                <StyledSpaceBetween>
                    {
                        !editingName &&

                        <StyledTitle onClick={(e) => e.stopPropagation()} onDoubleClick={openEditName} style={{ fontSize: "15px" }}>{currentCard?.name}</StyledTitle>
                    }
                    {
                        editingName &&
                        <StyledForm onSubmit={(e) => {
                            editCard(e, { name: editingNameContent });
                            setEditingName(false);
                        }} onClick={(e) => e.stopPropagation()} >
                            <StyledInput maxLength={50} ref={inputRef} onBlur={() => setEditingName(false)} type="text" value={editingNameContent} onChange={(e) => setEditingNameContent(e.target.value)} style={{ textAlign: "left", fontSize: "14px" }} required />
                        </StyledForm>
                    }
                    <IconButton size="small" aria-label="notifications" onClick={(e) => e.stopPropagation()} style={{ alignSelf: "flex-start" }} >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </StyledSpaceBetween>
                <StyledDate style={{ alignSelf: "flex-start" }}>
                    <StyledEmoji style={{ margin: "0" }} onClick={toggleStatus}>{currentCard?.status === false ? "🔴" : "🟢"}</StyledEmoji>
                    {currentCard?.dueDate ? new Date(currentCard.dueDate).toLocaleDateString() : 'No due date'}
                </StyledDate>
                {
                    currentCard.users.length > 0 &&
                    <Section title="Assignees" button={{ label: "Assign", action: () => { } }}>
                        <StyledUsers>
                            <StyledImg src="/User.png" />
                            <StyledImg src="/User.png" />
                            <StyledImg src="/User.png" />
                            <StyledCardName>+</StyledCardName>
                        </StyledUsers>
                    </Section>
                }
                {
                    currentCard.description && !editingDescription &&
                    <Section title="Description" button={{ label: "Edit", action: () => { setEditingDescription(true) } }}>
                        <StyledDescription>
                            {currentCard.description}
                        </StyledDescription>
                    </Section>
                }
                {
                    editingDescription &&
                    <Section title="Description" button={{ label: "Save", action: (e: React.FormEvent) => {
                        editCard(e, { description: editingDescriptionContent});
                        setEditingDescription(false);
                    }}}>
                        <DescriptionEditor description={currentCard.description} value={editingDescriptionContent} setValue={setEditingDescriptionContent} />
                    </Section>
                }
                <Grid container spacing={2} justifyContent="left" style={{ width: "100%" }}>
                    <StyledGrid item xs={6} sm={4} md={3} lg={2}>
                        <StyledCardButton onClick={() => setEditingDescription(true)}>Add Description</StyledCardButton>
                    </StyledGrid>
                    <StyledGrid item xs={6} sm={4} md={3} lg={2}>
                        <StyledCardButton>Add Assignees</StyledCardButton>
                    </StyledGrid>
                    <StyledGrid item xs={6} sm={4} md={3} lg={2}>
                        <StyledCardButton>Add Tags</StyledCardButton>
                    </StyledGrid>
                    <StyledGrid item xs={6} sm={4} md={3} lg={2}>
                        <StyledCardButton>Add Link</StyledCardButton>
                    </StyledGrid>
                </Grid>
            </StyledModal>
        </>
    )
}

export default CardModal;