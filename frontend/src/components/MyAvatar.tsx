import { Avatar, Tooltip } from "@mui/material";
import { useMyUserData } from "../hooks/useMyUserData";
import { useMyOrder } from "../hooks/useMyOrder";
import { css, keyframes } from "goober";

export function MyAvatar() {
    const { data: user } = useMyUserData();
    const { data: orders } = useMyOrder();

    return <Tooltip title={<MyStatus />} placement="left">
        <Avatar key={`${user?.role}${orders?.length}`}
            className={styles.blink}>{user && user?.name.charAt(0)}</Avatar>
    </Tooltip >;
}


function MyStatus() {
    const { data: user } = useMyUserData();
    const { data: orders } = useMyOrder();

    return <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', justifyItems: 'left' }}>
        <p className={styles.tooltipLabel}>orders:</p><p>{orders?.length ?? 0}</p>
        <p className={styles.tooltipLabel}>role: </p><p>{user?.role ?? 'none'}</p>
    </div>
}

const BLINK_KEYFRAME = keyframes({
    '100%': {
        backgroundColor: 'greenyellow'
    }
})
const styles = {
    blink: css({
        '&': {
            animationName: BLINK_KEYFRAME,
            animationIterationCount: 1,
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out'
        }
    }),
    tooltipLabel: css({ paddingRight: '0.5rem' })
}