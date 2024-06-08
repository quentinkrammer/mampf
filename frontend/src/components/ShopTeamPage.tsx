import { Avatar, Typography } from "@mui/material";
import { useFollower } from "../hooks/useFollower";

export function ShopTeamPage() {
    const { data: followers } = useFollower()

    return (
        <div style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', justifyItems: 'left' }}>
            {followers?.map((follower) => {
                const name = follower.name
                return (
                    <div key={follower.userId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', paddingLeft: '2rem' }}>
                        <Avatar>{follower.name.charAt(0)}</Avatar><Typography>{name}</Typography>
                    </div>)
            })}
        </div>)
}
