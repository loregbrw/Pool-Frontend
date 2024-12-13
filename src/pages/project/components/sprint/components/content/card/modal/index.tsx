import Section from "./section";
import toast from "react-hot-toast";
import DescriptionEditor from "./description-editor";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EColorPalette from "../../../../../../../../enums/EColorPalette";

import { ICard, IProject, ISprint } from "../../../../../..";
import { Box, Grid, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { StyledSpaceBetween } from "../../column/style";
import { StyledForm } from "../../../../style";
import { StyledSec, StyledModal } from "../../../../../../../../components/modal/style";
import { api } from "../../../../../../../../services/api";
import { StyledCardName, StyledDate, StyledEmoji, StyledImg, StyledUsers } from "../style";
import { StyledCardButton, StyledGrid, StyledInput, StyledTitle } from "./style";

import StyledMarkdown from "../markdown";
import { useParams } from "react-router-dom";

interface ICardModalProps {
    cardId: string;
    onClose: () => void;
    sprint: ISprint;
    updateSprint: (e: ISprint) => void;
}

interface IUpdateCard {
    name?: string;
    description?: string;
    status?: boolean;
}

const CardModal = ({ cardId, onClose, sprint, updateSprint }: ICardModalProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const { sprintId } = useParams();

    const [currentCard, setCurrentCard] = useState<ICard>();

    const [editingName, setEditingName] = useState(false);
    const [editingNameContent, setEditingNameContent] = useState("");

    const [editingDescription, setEditingDescription] = useState(false);
    const [editingDescriptionContent, setEditingDescriptionContent] = useState("");

    useEffect(() => {
        if (editingName && inputRef.current)
            inputRef.current.focus();

    }, [editingName]);

    const getData = async () => {
        try {
            const response = await api.get(`/cards/${cardId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );

            setCurrentCard(response.data.card);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        toast.promise(
            getData().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Loading card...",
                success: "Loaded card!",
                error: (err) => err,
            }
        )
    }, [])

    if (!currentCard) {
        return null;
    }

    const openEditName = () => {
        setEditingNameContent(currentCard.name);
        setEditingName(true);
    }

    const apiRequest = async (props: IUpdateCard) => {
        const response = await api.patch(`/cards/${currentCard.id}`,
            {
                name: props.name,
                description: props.description,
                status: props.status
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newCard = response.data.card;
        const updatedCard = { ...currentCard, name: newCard.name, description: newCard.description, status: newCard.status };

        const updatedSprint = {
            ...sprint,
            columns: sprint.columns?.map(column => ({
                ...column,
                cards: column.cards.map(card =>
                    card.id === cardId ? updatedCard : card
                ),
            })),
        }

        updateSprint(updatedSprint);
        setCurrentCard(updatedCard);
    }

    const editCard = async (e: React.FormEvent, props: IUpdateCard) => {
        e.preventDefault();

        if (props.name === currentCard.name || props.description === currentCard.description || props.status === currentCard.status)
            return;

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

    return (
        <Box onClick={onClose} sx={{ cursor: "default", position: "fixed", width: "100%", height: "100%", backgroundColor: "rgba(51, 49, 56, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", top: 0, left: 0, zIndex: 9999 }}>
            <StyledModal onClick={(e) => e.stopPropagation()} style={{ width: "calc(100% - 40px)", maxWidth: "900px", height: "calc(100% - 120px)", maxHeight: "fit-content", border: `10px solid ${EColorPalette.MINTCREAM}`, padding: 0, gap: 0 }}>
                <StyledSec style={{ position: "sticky", top: 0, gap: "3px", zIndex: "11111" }}>
                    <StyledSpaceBetween>
                        {
                            !editingName &&

                            <StyledTitle onClick={(e) => e.stopPropagation()} onDoubleClick={openEditName} style={{ fontSize: "15px" }}>{currentCard.name}</StyledTitle>
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
                        <StyledEmoji style={{ margin: "0" }} onClick={(e) => editCard(e, { status: !currentCard.status })}>{currentCard?.status === false ? "🔴" : "🟢"}</StyledEmoji>
                        {currentCard?.dueDate ? new Date(currentCard.dueDate).toLocaleDateString() : 'No due date'}
                    </StyledDate>
                </StyledSec>
                <StyledSec>
                    {
                        currentCard.users?.length > 0 &&
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
                            <StyledMarkdown description={currentCard.description} />
                        </Section>
                    }
                    {
                        editingDescription &&
                        <Section title="Description" button={{
                            label: "Save", action: (e: React.FormEvent) => {
                                editCard(e, { description: editingDescriptionContent });
                                setEditingDescription(false);
                            }
                        }}>
                            <DescriptionEditor description={currentCard.description} value={editingDescriptionContent} setValue={setEditingDescriptionContent} />
                        </Section>
                    }
                    <Grid container spacing={2} justifyContent="left" style={{ width: "100%" }}>
                        <StyledGrid item xs={6} sm={4} md={3} lg={2}>
                            <StyledCardButton disabled={currentCard.description != undefined} onClick={() => setEditingDescription(true)}>Add Description</StyledCardButton>
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
                </StyledSec>
            </StyledModal>
        </Box>
    )
}

export default CardModal;