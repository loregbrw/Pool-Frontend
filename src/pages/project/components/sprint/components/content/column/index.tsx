import toast from "react-hot-toast";
import TuneIcon from '@mui/icons-material/Tune';

import { StyledColumn, StyledContent, StyledSections, StyledSpaceBetween } from "./style";
import { ICard, IColumn } from "../../../../..";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import { StyledName } from "../../../../style";
import { api } from "../../../../../../../services/api";
import { StyledForm, StyledNameInput } from "../../../style";
import { StyledButton } from "../../../../../../../components/style";
import EColorPalette from "../../../../../../../enums/EColorPalette";
import Card from "../card";
import StyledTooltip from "../../../../../../../components/tooltip";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface IColumnProps {
    column: IColumn
}

const Column = ({ column }: IColumnProps) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const [currentColumn, setCurrentColumn] = useState(column);

    const [editingName, setEditingName] = useState(column.name);
    const [editingNameColumn, setEditingNameColumn] = useState(false);

    useEffect(() => {
        if (editingNameColumn && inputRef.current)
            inputRef.current.focus();

    }, [editingNameColumn]);

    useEffect(() => {
        setCurrentColumn(column);
    }, [column])

    const openEditName = () => {
        setEditingName(column.name);
        setEditingNameColumn(true);
    }

    const apiRequest = async () => {

        const response = await api.patch(`/columns/${column.id}`,
            {
                name: editingName
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            });

        const newColumn = response.data.column;
        setCurrentColumn({ ...column, name: newColumn.name });
    }

    const editColumnName = (e: React.FormEvent) => {
        e.preventDefault();

        toast.promise(
            apiRequest().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Updating column name...",
                success: "Column name updated successfully!",
                error: (err) => err,
            }
        ).then(() => setEditingNameColumn(false));
    }

    const addCard = async (columnId: string, len: number) => {
        const add = async () => {
            try {
                const response = await api.post(`/cards`,
                    {
                        name: "New Card",
                        status: false,
                        index: len + 1,
                        columnId: columnId,
                        tagsId: []
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("Token")}`,
                        },
                    });

                const newCard: ICard = response.data.card;
                setCurrentColumn({ ...column, cards: [...column.cards, newCard] });

            } catch (error) {
                console.log(error);
            }
        }

        toast.promise(
            add(),
            {
                loading: "Creating card...",
                success: "Created card successfully!",
                error: "Something went wrong!"
            }
        )
    }

    return (
        <>
            <StyledColumn>
                <StyledSpaceBetween>
                    {
                        !editingNameColumn &&
                        <StyledTooltip title={currentColumn.name} placement="top-start">
                            <StyledName onDoubleClick={openEditName}>{currentColumn.name}</StyledName>
                        </StyledTooltip>
                    }
                    {
                        editingNameColumn &&
                        <StyledForm onSubmit={editColumnName}>
                            <StyledNameInput maxLength={50} ref={inputRef} onBlur={() => setEditingNameColumn(false)} type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)} style={{ textAlign: "left" }} required />
                        </StyledForm>
                    }
                    <IconButton size="small" aria-label="notifications" >
                        <TuneIcon />
                    </IconButton>
                </StyledSpaceBetween>
                <StyledButton bgcolor={EColorPalette.JET} onClick={() => addCard(currentColumn.id, currentColumn.cards.length)}>Add new card +</StyledButton>

                    <StyledContent>
                        <StyledSections>
                            <Droppable droppableId={currentColumn.id} type="CARD">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "7px",

                                            minHeight: "1px"
                                        }}
                                    >
                                        {currentColumn.cards?.map((card, index) => (
                                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card card={card} />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </StyledSections>
                    </StyledContent>
            </StyledColumn>
        </>
    )
}

export default Column;