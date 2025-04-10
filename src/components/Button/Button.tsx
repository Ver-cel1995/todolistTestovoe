type Props = {
   title: string;
   onclick?: () => void;
   className?: string;
   disabled?: boolean;
};
export const Button = ({onclick, title, className, disabled}: Props) => {
    return (
        <button onClick={onclick} disabled={disabled} className={className}>{title}</button>
    );
};