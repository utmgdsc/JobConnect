import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext} from "../context/AuthContext";

const Chat = () => {
    const { user } = useContext(AuthContext);

    return (
        <Container>
            <h1>
                {(user?.data.isVerified) ? (
                    <span className="verified">verified</span>
                ) : (
                    <span className="not-verified">Verification email has been sent to {user?.data.email} </span>
                )}
            </h1>
        </Container>
    )
}

export default Chat;