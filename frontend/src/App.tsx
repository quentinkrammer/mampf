import { css } from "goober";
import { PropsWithChildren } from "react";
import "./App.css";
import { Input } from "./components/Input";

function App() {
  return (
    <>
      <Card label="Header">
        <div>
          <Input label="Username" />
        </div>
      </Card>
    </>
  );
}

export default App;

type CardProps = PropsWithChildren<{
  className?: string;
  label: string;
}>;
function Card({ label, children, ...otherProps }: CardProps) {
  return (
    <div {...otherProps}>
      <div className={styles.header}>{label}</div>
      {children}
    </div>
  );
}

const styles = {
  header: css({
    backgroundColor: "var(--primary-color)",
    color: "var(--text-color-light)",
  }),
};
