import toast from "react-hot-toast";
import CloseIcon from '@mui/icons-material/Close';
import EColorPalette from "../../../enums/EColorPalette";

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { StyledButton } from "../../style";
import { api } from "../../../services/api";
import { ITag } from "../../../pages/home/components/header";
import { StyledDiv, StyledOption, StyledSelect, StyledTextArea } from "./style";
import { StyledContainer, StyledForm, StyledHr, StyledInput, StyledLabel, StyledModal, StyledTitle } from "../style";

interface ICreateProjectModalProps {
    closeAction: () => void;
}

const CreateProjectModal = ({ closeAction }: ICreateProjectModalProps) => {
    const [projectName, setProjectName] = useState("");
    const [projectTag, setProjectTag] = useState<ITag | null>(null);
    const [projectDescription, setProjectDescription] = useState("");
    const [projectContributors, setProjectContributors] = useState([]);
    const [projectInitialDate, setProjectInitialDate] = useState<Date | null>(null);
    const [projectEndDate, setProjectEndDate] = useState<Date | null>(null);
    const [projectDuration, setProjectDuration] = useState<number | null>(null);

    const [tags, setTags] = useState<ITag[]>([]);
    const [durationError, setDurationError] = useState(false);

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await api.get("/tags", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                    }
                });
                setTags(response.data.tags);
            } catch (error: any) {
                console.log(error);
                toast.error("Something went wrong!");
            }
        };
        getTags();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTagId = event.target.value;
        const tag = tags.find(tag => tag.id === selectedTagId) || null;
        setProjectTag(tag);
    };

    useEffect(() => {
        if (projectInitialDate && projectEndDate) {
            const duration = Math.ceil((projectEndDate.getTime() - projectInitialDate.getTime()) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);

            setDurationError(duration <= 0);
        }
    }, [projectInitialDate, projectDuration]);

    useEffect(() => {
        if (projectInitialDate && projectEndDate) {
            const duration = Math.ceil((projectEndDate.getTime() - projectInitialDate.getTime()) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    }, [projectInitialDate, projectEndDate]);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const duration = parseInt(e.target.value, 10);
        setProjectDuration(duration);

        if (projectInitialDate && duration) {
            const endDate = new Date(projectInitialDate);
            endDate.setDate(endDate.getDate() + duration);
            setProjectEndDate(endDate);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value);
        setProjectEndDate(endDate);

        if (projectInitialDate && endDate) {
            const duration = Math.ceil((endDate.getTime() - projectInitialDate.getTime()) / (1000 * 60 * 60 * 24));
            setProjectDuration(duration);
        }
    };

    const createProject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (durationError) {
            toast.error("Invalid duration!");
            return;
        }

        const apiRequest = async () => {
            const requestData: any = {
                name: projectName,
                description: projectDescription,
                users: [],
                sprintInitialDate: projectInitialDate,
                sprintDuration: projectDuration
            };
        
            if (projectTag) {
                requestData.tagId = projectTag.id;
            }
        
            await api.post("/projects", requestData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                }
            });
        };
        toast.promise(
            apiRequest().catch(error => {
                throw error.response?.data?.message || error.message;
            }),
            {
                loading: "Creating project",
                success: "Project created successfully!",
                error: (err) => err,
            }
        ).then(closeAction);
    }

    return (
        <StyledModal elevation={3} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "calc(100% - 40px)", maxWidth: "700px" }} >
            <StyledForm onSubmit={createProject}>
                <StyledTitle>New project</StyledTitle>
                <StyledDiv>
                    <StyledContainer style={{ width: "60%" }}>
                        <StyledLabel>Name:</StyledLabel>
                        <StyledInput onChange={(e) => setProjectName(e.target.value)} maxLength={255} required />
                    </StyledContainer>
                    <StyledContainer style={{ width: "40%" }}>
                        <StyledLabel>Tag:</StyledLabel>
                        <StyledSelect bgcolor={projectTag?.color || EColorPalette.FRENCHGRAY} onChange={handleChange}>
                            <StyledOption bgcolor={EColorPalette.FRENCHGRAY}>Select a tag</StyledOption>
                            {tags.map((tag, index) => (
                                <StyledOption key={index} value={tag.id} bgcolor={tag.color}>{tag.name}</StyledOption>
                            ))}
                        </StyledSelect>
                    </StyledContainer>
                </StyledDiv>
                <StyledContainer>
                    <StyledLabel>Description:</StyledLabel>
                    <StyledTextArea onChange={(e) => setProjectDescription(e.target.value)} maxLength={500} />
                </StyledContainer>
                <StyledContainer>
                    <StyledLabel>Contributors:</StyledLabel>
                    <StyledSelect bgcolor={EColorPalette.FRENCHGRAY} />
                </StyledContainer>
                <StyledDiv style={{ gap: "5px" }}>
                    <StyledLabel style={{ width: "150px", fontWeight: "600" }}>About the first sprint:</StyledLabel>
                    <StyledHr style={{ width: "calc(100% - 150px)" }} />
                </StyledDiv>
                <StyledDiv>
                    <StyledContainer style={{ width: "40%" }}>
                        <StyledLabel>Start date:</StyledLabel>
                        <StyledInput
                            type="date"
                            onChange={(e) => setProjectInitialDate(new Date(e.target.value))}
                            required
                        />
                    </StyledContainer>
                    <StyledContainer style={{ width: "40%" }}>
                        <StyledLabel>End date:</StyledLabel>
                        <StyledInput
                            type="date"
                            error={durationError || undefined}
                            value={projectEndDate ? projectEndDate.toISOString().split("T")[0] : ""}
                            onChange={handleEndDateChange}
                            required
                        />
                    </StyledContainer>
                    <StyledContainer style={{ width: "20%" }}>
                        <StyledLabel>Duration:</StyledLabel>
                        <StyledInput
                            type="number"
                            min={1}
                            error={durationError || undefined}
                            value={projectDuration || 0}
                            onChange={handleDurationChange}
                            required
                        />
                    </StyledContainer>
                </StyledDiv>
                <StyledButton bgcolor={EColorPalette.BURNTSIENNA} style={{ width: "100%" }} type="submit">Create project</StyledButton>
                <IconButton onClick={closeAction} size="small" style={{ position: "absolute", top: "5px", right: "5px" }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </StyledForm>
        </StyledModal>
    );
}

export default CreateProjectModal;
