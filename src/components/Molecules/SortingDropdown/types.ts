import { SortOption } from "@/utils/sorting";

export interface SortingDropdownProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}