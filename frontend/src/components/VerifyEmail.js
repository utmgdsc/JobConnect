import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate, json } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { AuthContext } from  "../context/AuthContext";
import apiList from "../lib/apiList";
import Navbar from "./Navbar";
import axios from "axios";

const VerifyEmail = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailToken = searchParams.get("emailToken");
    console.log(user);
    console.log("emailToken", emailToken)
    useEffect(() => {
        (async () => {
            if (user?.isVerified) {
                setTimeout(() => {
                    return navigate("/");
                }, 3000);
            } else {
                if (emailToken) {
                    setIsLoading(true);
                    const response = await(axios.post(apiList.verify, JSON.stringify({ emailToken })))
                    setIsLoading(false);
                    console.log("res", response);
                    if (response.error) {
                        return setError(response);
                    }
                    updateUser(response);
                };
            }
        })();
    }, [emailToken, user]);

    return (
        <div>
            <Navbar/>
            {isLoading ? (
                <div>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {user?.isVerified ? (
                        <div>
                            <Alert severity="success">
                                Email successfully verified, redirecting...
                            </Alert>
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