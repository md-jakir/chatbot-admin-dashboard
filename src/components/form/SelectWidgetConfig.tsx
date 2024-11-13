import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetWidgetConfigsAsOptionsQuery } from '@/redux/features/widgetConfig/widgetConfig.api';

export default function SelectWidgetConfig({
  changeThemeHandler,
}: {
  changeThemeHandler: (_themeId: string) => void;
}) {
  const { data, isLoading }: any = useGetWidgetConfigsAsOptionsQuery('');

  return (
    <Select onValueChange={changeThemeHandler}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a Widget theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isLoading ? (
            <SelectLabel>Loading...</SelectLabel>
          ) : (
            <>
              <SelectLabel>Configs</SelectLabel>
              {data?.map((item: { label: string; value: string }) => (
                <SelectItem
                  className=" cursor-pointer"
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
