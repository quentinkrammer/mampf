import { Button, TextField, Typography } from "@mui/material";
import { isNil } from "lodash";
import { useState } from "react";
import { useLeaderMutation } from "../hooks/useLeaderMutation";
import { useMyUserData } from "../hooks/useMyUserData";


export function MissingLeaderForm() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '35rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <Typography>Before anyone can place an order, someone must sign up as leader.</Typography>
            <SignUpAsLeader />
        </div>
    );
}
function SignUpAsLeader() {
    const { data } = useMyUserData();
    const [paypal, setPaypal] = useState("");
    const leaderMutation = useLeaderMutation();

    const hasPaypal = !isNil(data) && data?.paypalUrl;

    if (hasPaypal)
        return (
            <Button onClick={() => leaderMutation.mutate({})} variant="contained">
                Sign up as Leader
            </Button>
        );

    return (
        <>
            <TextField
                label="Paypal-Me"
                variant="outlined"
                onChange={(e) => setPaypal(e.target.value)}
                value={paypal} required />
            <Button
                disabled={!paypal}
                onClick={() => leaderMutation.mutate({ paypal })}
                variant="contained"
            >
                Sign up as Leader
            </Button>
        </>
    );
}
