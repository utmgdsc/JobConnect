import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate, json } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from  "../context/AuthContext";
import apiList from "../lib/apiList";
import Navbar from "./Navbar";
import axios from "axios";


const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const VerifyEmail = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAccountVerifiedAlertShown, setIsAccountVerifiedAlertShown] = useState(false);
    const navigate = useNavigate();
    const emailToken = searchParams.get("emailToken");
    useEffect(() => {
        const verifyEmail = async () => {
            setIsLoading(true);
            setError(null);
            console.log("Verifying");
            try {
                const response = await axios.post(apiList.verify, { emailToken });
                console.log("res", response);
                updateUser(response.data);
            } catch (error) {
                setError(error.response.data);
            }
            setIsLoading(false);
        };

        if (emailToken && !user?.isVerified) {
            // Debounce the verifyEmail function to prevent rapid API calls
            const debouncedVerifyEmail = debounce(verifyEmail, 1000);
            debouncedVerifyEmail();
        }
    }, [emailToken, user]);

    useEffect(() => {
        if (user?.isVerified) {
            setIsAccountVerifiedAlertShown(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }
    }, [user]);
    
    return (
        <div>
            <Navbar/>
            {isLoading ? (
                <div>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {isAccountVerifiedAlertShown && (
                        <Alert severity="success">
                            Your account has been verified, redirecting...
                        </Alert>
                    )}
                    {user?.isVerified ? (
                        <div>
                        </div>
                    ) : (
                        <div>
                            {error.error ? (
                                <Alert severity="error">{error.message}</Alert>
                            ) : null}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default VerifyEmail