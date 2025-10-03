import { ThemeProvider } from "../ThemeProvider";
import { CustomerHeader } from "../CustomerHeader";

export default function CustomerHeaderExample() {
  return (
    <ThemeProvider>
      <CustomerHeader
        cartItemCount={3}
        onSearchChange={(value) => console.log("Search:", value)}
        onCartClick={() => console.log("Cart clicked")}
      />
    </ThemeProvider>
  );
}
