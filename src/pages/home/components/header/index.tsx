import toast from "react-hot-toast";
import SearchImg from "/Search.png"
import TuneIcon from '@mui/icons-material/Tune';
import TagModal from "../../../../components/modal/tag";
import EColorPalette from "../../../../enums/EColorPalette";
import CreateProjectModal from "../../../../components/modal/create-project";

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { StyledButton } from "../../../../components/style";
import { StyledContainer, StyledDiv, StyledHeader, StyledImg, StyledOption, StyledSearch, StyledSelect } from "./style";

export interface ITag {
    id: string;
    name: string;
    color: string;
}

interface IHeaderHomeProps {
    search: string;
    setSearch: (e: string) => void;

    selectedTag: ITag | null;
    setSelectedTag: (e: ITag | null) => void;

    projectModal: boolean;
    setProjectModal: (e: boolean) => void;
}

const HeaderHome = ({ search, setSearch, selectedTag, setSelectedTag, projectModal, setProjectModal }: IHeaderHomeProps) => {

    const [tags, setTags] = useState<ITag[]>([]);
    const [tagModal, setTagModal] = useState(false);

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
                            <TagModal onClose={() => setTagModal(false)} />
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
                        <StyledOption bgcolor={EColorPalette.COOLGRAY} value="">Filter</StyledOption>
                        {
                            tags.map((tag, index) => (
                                <StyledOption key={index} value={tag.id} bgcolor={tag.color}>
                                    {tag.name}
                                </StyledOption>
                            ))
                        }
                    </StyledSelect>
                    <StyledSearch value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a project" maxLength={50} />
                    <StyledImg src={SearchImg} />
                </StyledContainer>
            </StyledHeader >
            {
                projectModal &&
                <CreateProjectModal onClose={() => setProjectModal(false)} />
            }
        </>
    )
}

export default HeaderHome;