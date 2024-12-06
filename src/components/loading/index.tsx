import { LoadingContainer, Ripple } from "./style";

const Loading = () => {
    return (
        <LoadingContainer>
            <Ripple>
                <div></div>
                <div></div>
            </Ripple>
        </LoadingContainer>
    );
};

export default Loading;