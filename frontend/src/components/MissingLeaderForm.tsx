import { Button, TextField } from "@mui/material";
import { isNil } from "lodash";
import { useState } from "react";
import { useLeaderMutation } from "../hooks/useLeaderMutation";
import { useMyUserData } from "../hooks/useMyUserData";


export function MissingLeaderForm() {
    return (
        <div>
            <p>Before anyone can place an order, someone must sign up as leader.</p>
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
            <Button onClick={() => leaderMutation.mutate({})}>
                Sign up as Leader
            </Button>
        );

    return (
        <div>
            <p>To become a leader, please set up your Paypal-Me link:</p>
            <TextField
                // TODO paypal icon
                label="Paypal-Me"
                variant="outlined"
                onChange={(e) => setPaypal(e.target.value)}
                value={paypal} />
            <Button
                disabled={false}
                onClick={() => leaderMutation.mutate({ paypal })}
            >
                Sign up as Leader
            </Button>
        </div>
    );
}
