import FirstPage from "./first-page";
import SecondPage from "./second-page";

import { Dayjs } from "dayjs";
import { useState } from "react";

const SignUp = () => {
    const [init, setInit] = useState(true);
    const [completeName, setCompleteName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);

    return (
        <>
            {init ? (
                <FirstPage
                    completeName={completeName}
                    setCompleteName={setCompleteName}
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    birthDate={birthDate}
                    setBirthDate={setBirthDate}
                    setInit={setInit}
                />
            ) : (
                <SecondPage
                    completeName={completeName}
                    username={username}
                    email={email}
                    birthDate={birthDate}
                    setInit={setInit}
                />
            )}
        </>
    );
};

export default SignUp;
