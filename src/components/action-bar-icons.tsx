interface ActionBarIconsProps {
  onClickAction: Function;
  icon: string;
}

const ActionBarIcons: React.FC<ActionBarIconsProps> = ({ onClickAction, icon }) => {
  return (
      <button
        className="button is-primary is-small"
        onClick={() => {onClickAction()}}
      >
        <span className="icon">
          <i className={ icon }></i>
        </span>
      </button>
  );
};

export default ActionBarIcons;
