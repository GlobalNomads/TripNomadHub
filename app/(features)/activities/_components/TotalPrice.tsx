// app/components/TotalPrice.tsx

interface TotalPriceProps {
  price: number;
  count: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price, count }) => {
  const totalPrice = price * count;

  return (
    <div className="text-xl-bold text-primary-black-100">
      <h3>총 합계</h3>
      <div>₩ {totalPrice}</div>
    </div>
  );
};

export default TotalPrice;
