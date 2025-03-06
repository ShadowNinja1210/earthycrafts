import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
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
  value: string | "";
}) {
  return (
    <div className="flex flex-col w-full gap-2 items-end">
      <Select
        onValueChange={(val) => {
          onChange(value === val ? "" : val);
        }}
        value={value}
        defaultValue={value}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="max-h-60 overflow-y-scroll">
            {items.sort().map((item) => (
              <SelectItem key={item} value={item} className="capitalize hover:bg-neutral-100 cursor-pointer">
                {item}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

      <Button type="button" className="w-fit" onClick={() => onChange("")}>
        Clear
      </Button>
    </div>
  );
}
