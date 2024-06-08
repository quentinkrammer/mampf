import { get } from "../fetch";

export function DbResetMenu() {
  const onNoLeader = async () => {
    const res = await get("users/iniDb/noLeader");
    console.log(res?.body);
    window.location.reload();
  };

  const onMaria = async () => {
    const res = await get("users/iniDb/mariaIsLeader");
    console.log(res?.body);
    window.location.reload();
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        display: "flex",
        gap: "1rem",
      }}
    >
      <button onClick={onMaria}>Maria does the shopping</button>
      <button onClick={onNoLeader}>No shop leader exist</button>
    </div>
  );
}
