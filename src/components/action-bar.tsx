import { useActions } from "../hooks/use-actions";
import ActionBarIcons from "./action-bar-icons";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div>
      <ActionBarIcons onClickAction={() => moveCell(id, "up")} icon="fas fa-arrow-up"/>
      <ActionBarIcons onClickAction={() => moveCell(id, "down")} icon="fas fa-arrow-down"/>
      <ActionBarIcons onClickAction={() => deleteCell(id)} icon="fas fa-times"/>
    </div>

  );
};

export default ActionBar;
