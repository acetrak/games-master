'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover';
import { useSearchParams } from '@remix-run/react';

const gameDealFields = [
  { value: 'DealRating', label: 'Deal Rating' },
  { value: 'Title', label: 'Title' },
  { value: 'Savings', label: 'Savings' },
  { value: 'Price', label: 'Price' },
  { value: 'Metacritic', label: 'Metacritic' },
  { value: 'Reviews', label: 'Reviews' },
  { value: 'Release', label: 'Release' },
  { value: 'Store', label: 'Store' },
  { value: 'Recent', label: 'Recent' },
];


export default function SortBy() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('DealRating');

  const [searchParams, setSearchParams] = useSearchParams();


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? gameDealFields.find((framework) => framework.value === value)?.label
            : 'Select sort...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0 min-w-[var(--radix-popper-anchor-width)]">
        <Command>
          <CommandInput placeholder="Search sort..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {gameDealFields.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    setSearchParams((prev) => {
                      prev.set('sortBy', currentValue);
                      return prev;
                    });
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
