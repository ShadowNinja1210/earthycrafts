import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectField({
  items,
  placeholder,
  onChange,
  value,
}: {
  items: string[];
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <Select onValueChange={onChange} value={value} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.sort().map((item) => (
            <SelectItem key={item} value={item} className="capitalize hover:bg-neutral-100 cursor-pointer">
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
