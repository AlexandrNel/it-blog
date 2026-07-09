"use client";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import { FilterToolbar } from "./filter-toolbar";

export const FilterToolbarModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon-lg"}>
          <SlidersHorizontal size={30} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogTitle>Фильтры</DialogTitle>
        <FilterToolbar />
      </DialogContent>
    </Dialog>
  );
};
