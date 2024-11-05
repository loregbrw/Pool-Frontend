import HeaderHome from "./components/header";

import { useState } from "react";
import { StyledMain } from "../../components/style";

const Home = () => {

    const [search, setSearch] = useState("");

    return (
        <>
            <StyledMain>
                <HeaderHome search={search} setSearch={setSearch} />
                
            </StyledMain>
        </>
    )
}

export default Home;