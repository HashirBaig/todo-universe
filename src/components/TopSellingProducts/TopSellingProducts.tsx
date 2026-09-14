import { type Product } from "../../lib/const";

type TopSellingProductsProps = {
  data: Product[];
};

function TopSellingProducts({ data }: TopSellingProductsProps) {
  const maxQuantity = Math.max(...data.map((p) => p?.quantitySold));

  return (
    <div className="space-y-4">
      {data.map((product, index) => (
        <div key={product.productId} className="flex items-center gap-4">
          <span className="text-sm text-gray-500 w-4 shrink-0">
            {index + 1}
          </span>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium truncate">
                {product.productName}
              </span>
              <span className="text-sm text-gray-400 shrink-0 ml-2">
                {product.quantitySold} sold
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-lime-800"
                style={{
                  width: `${(product.quantitySold / maxQuantity) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopSellingProducts;
