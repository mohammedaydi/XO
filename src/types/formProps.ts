export interface Props {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  value: string;
}
