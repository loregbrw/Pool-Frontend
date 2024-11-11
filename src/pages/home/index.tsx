import Cards from "./components/cards";
import HeaderHome, { ITag } from "./components/header";

import { useState } from "react";
import { StyledMain } from "../../components/style";

const Home = () => {

    const [search, setSearch] = useState("");

    const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
    const [projectModal, setProjectModal] = useState(false);

    return (
        <>
            <StyledMain>
                <HeaderHome search={search} setSearch={setSearch} selectedTag={selectedTag} setSelectedTag={setSelectedTag} projectModal={projectModal} setProjectModal={setProjectModal} />
                <Cards search={search} reload={projectModal} tagId={selectedTag?.id} />
            </StyledMain>
        </>
    )
}

export default Home;