interface SettingsLabelProps {
  title: string;
  description: string;
}

export const Heading: React.FC<SettingsLabelProps> = ({
  title,
  description,
}) => {
  return (
    <div className="space-y-2 ">
      <h1 className="font-bold text-3xl xl:text-4xl tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm ">{description}</p>
    </div>
  );
};
