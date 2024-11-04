import SearchImg from "/Search.png"
import TuneIcon from '@mui/icons-material/Tune';
import EColorPalette from "../../../../enums/EColorPalette";

import { IconButton } from "@mui/material";
import { StyledContainer, StyledDiv, StyledHeader, StyledImg, StyledOption, StyledSearch, StyledSelect } from "./style";
import { StyledButton } from "../../../../components/style";
import { useEffect, useState } from "react";
import { StyledModalBackground } from "../../../../components/modal/style";
import TagModal from "../../../../components/modal/tag";
import { api } from "../../../../services/api";
import toast from "react-hot-toast";
import CreateProjectModal from "../../../../components/modal/create-project";

export interface ITag {
    id: string;
    name: string;
    color: string;
}

const HeaderHome = () => {

    const [tagModal, setTagModal] = useState(false);
    const [projectModal, setProjectModal] = useState(false);

    const [tags, setTags] = useState<ITag[]>([]);
    const [selectedTag, setSelectedTag] = useState<ITag | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTagId = event.target.value;
        const tag = tags.find(tag => tag.id === selectedTagId) || null;
        setSelectedTag(tag);
    };

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
                toast.error(error.response?.data?.message || error.message);
            }
        };
        getTags();
    }, [tagModal]);

    return (
        <>
            <StyledHeader>
                <StyledContainer max="fit-content">
                    <StyledDiv>
                        <StyledButton bgcolor={EColorPalette.COOLGRAY} onClick={() => { setTagModal(true) }}>New Tag +</StyledButton>
                        {
                            tagModal &&
                            <>
                                <TagModal closeAction={() => setTagModal(false)} />
                                <StyledModalBackground onClick={() => setTagModal(false)} />
                            </>
                        }
                    </StyledDiv>
                    <StyledButton bgcolor={EColorPalette.ENGINEERINGORANGE} onClick={() => setProjectModal(true)}>New Project +</StyledButton>
                    <IconButton size="small">
                        <TuneIcon fontSize="small" />
                    </IconButton>
                </StyledContainer>
                <StyledContainer max="450px">
                    <StyledSelect
                        color={selectedTag?.color ? undefined : EColorPalette.MINTCREAM}
                        bgcolor={selectedTag?.color || EColorPalette.COOLGRAY}
                        onChange={handleChange}
                        value={selectedTag?.id || ""}
                    >
                        <StyledOption bgcolor={selectedTag?.color || EColorPalette.COOLGRAY} value="">Filter</StyledOption>
                        {
                            tags.map((tag, index) => (
                                <StyledOption key={index} value={tag.id} bgcolor={tag.color}>
                                    {tag.name}
                                </StyledOption>
                            ))
                        }
                    </StyledSelect>
                    <StyledSearch placeholder="Search a project" />
                    <StyledImg src={SearchImg} />
                </StyledContainer>
            </StyledHeader >
            {
                projectModal &&
                <>
                    <CreateProjectModal closeAction={() => setProjectModal(false)} />
                    <StyledModalBackground />
                </>
            }
        </>
    )
}

export default HeaderHome;