import { Avatar } from "@mui/material";
import { useMyUserData } from "../hooks/useMyUserData";
import { useMyOrder } from "../hooks/useMyOrder";
import { css, keyframes } from "goober";

export function MyAvatar() {
    const { data: user } = useMyUserData();
    const { data: orders } = useMyOrder();

    return <div>
        <Avatar key={`${user?.role}${orders?.length}`}
            className={BLINK}>{user && user?.name.charAt(0)}</Avatar>
    </div>;
}


const BLINK_KEYFRAME = keyframes({
    '100%': {
        backgroundColor: 'greenyellow'
    }
})
const BLINK = css({
    '&': {
        animationName: BLINK_KEYFRAME,
        animationIterationCount: 1,
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-out'
    }
})