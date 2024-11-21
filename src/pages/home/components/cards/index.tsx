import toast from "react-hot-toast";
import EColorPalette from "../../../../enums/EColorPalette";

import { api } from "../../../../services/api";
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { StyledCard, StyledContainer, StyledContent, StyledDescription, StyledDiv, StyledGrid, StyledImg, StyledMain, StyledName, StyledSection, StyledSectionName, StyledTag } from "./style";

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

                (response.data.projects);
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
        <StyledMain>

            {
                (() => {
                    const groupedProjects: { [key: string]: IProject[] } = projects.reduce((acc, project) => {
                        const tagName = project.project.tag?.name || "My projects";
                        if (!acc[tagName]) acc[tagName] = [];
                        acc[tagName].push(project);
                        return acc;
                    }, {} as { [key: string]: IProject[] });

                    const sortedGroupNames = Object.keys(groupedProjects).sort((a, b) => {
                        if (a === "My projects") return -1;
                        if (b === "My projects") return 1; 
                        return a.localeCompare(b); 
                    });

                    return sortedGroupNames.map((tagName, index) => (
                        <StyledSection key={index}>
                            <StyledSectionName>{tagName}</StyledSectionName>
                            <Grid container spacing={4} justifyContent="left">
                                {groupedProjects[tagName].map((project, i) => (
                                    <StyledGrid item xs={12} sm={6} md={4} lg={3} key={i}>
                                        <StyledCard elevation={3}>
                                            <StyledTag
                                                style={{
                                                    backgroundColor: project.project.tag?.color || EColorPalette.COOLGRAY,
                                                }}
                                            >
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
                                ))}
                            </Grid>
                        </StyledSection>
                    ));
                })()
            }
        </StyledMain>
        </>
    )
}

export default Cards;
