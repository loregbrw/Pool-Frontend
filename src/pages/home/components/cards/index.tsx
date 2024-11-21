import toast from "react-hot-toast";
import EColorPalette from "../../../../enums/EColorPalette";

import { api } from "../../../../services/api";
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { StyledCard, StyledContainer, StyledContent, StyledDescription, StyledDiv, StyledGrid, StyledImg, StyledName, StyledTag, StyledTagName } from "./style";

interface IProject {
    project: {
        id: string;
        name: string;
        description: string;
        status: boolean;
        tag?: ITag;
    };
    status: "Own" | "Viewer" | "Editor";
}

interface ITag {
    id: string;
    name: string;
    color: string;
}

interface ICardsProps {
    reload: boolean;
    search: string;
    tagId?: string;
}

const Cards = ({ reload, search, tagId }: ICardsProps) => {

    const [projects, setProjects] = useState<IProject[]>([]);

    useEffect(() => {

        const getProjects = async () => {
            try {
                const params = new URLSearchParams({
                    search: search || "",
                    ...(tagId ? { tagId } : {})
                });

                const response = await api.get(`/projects?${params.toString()}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                    }
                });

                setProjects(response.data.projects);
            } catch (error: any) {
                console.log(error);
                toast.error(error.response?.data?.message || error.message);
            }
        };


        getProjects();

    }, [reload, search, tagId]);

    if (!(projects.length > 0)) {
        return (
            <StyledContainer>
                Looks like you’re the first one here!
            </StyledContainer>
        )
    }

    return (
        <>
            <Grid container spacing={4} justifyContent="left">
                {
                    projects.map((project, index) => (
                        <StyledGrid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <StyledCard elevation={3}>
                                <StyledTag elevation={0} style={{ backgroundColor: project.project.tag?.color || EColorPalette.COOLGRAY }} >
                                    <StyledTagName color={project.project.tag?.color || EColorPalette.ENGINEERINGORANGE}>{project.project.tag?.name}</StyledTagName>
                                </StyledTag>
                                <StyledContent>
                                    <StyledName>{project.project.name}</StyledName>
                                    <StyledDescription>{project.project.description}</StyledDescription>
                                    <StyledDiv>
                                        <StyledImg src="/User.png" />
                                        <StyledImg src="/User.png" />
                                        <StyledImg src="/User.png" />
                                        <StyledName>+</StyledName>
                                    </StyledDiv>
                                </StyledContent>
                            </StyledCard>
                        </StyledGrid>
                    ))
                }
            </Grid >
        </>
    )
}

export default Cards;