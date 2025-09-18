"use client";

import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Fragment } from "react";

interface ActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionsMenu({ onEdit, onDelete }: ActionsMenuProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex w-full justify-center rounded-md p-1 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className="absolute right-0 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10"
        >
          <div className="px-1 py-1 ">
            <MenuItem>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className={"data-[active]:bg-primary data-[active]:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"}
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className={"data-[active]:bg-red-500 data-[active]:text-white text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2"}
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}