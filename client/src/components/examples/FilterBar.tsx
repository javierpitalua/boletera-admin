import { FilterBar } from "../FilterBar";

export default function FilterBarExample() {
  return (
    <FilterBar
      onCategoryChange={(cat) => console.log("Category:", cat)}
      onLocationChange={(loc) => console.log("Location:", loc)}
      onDateChange={(date) => console.log("Date:", date)}
    />
  );
}
