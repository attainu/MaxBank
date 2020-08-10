import { GET_PRODUCTS } from "../actionTypes";

export const getAllProducts = () => {
  console.log("Getting products");
  const sampleData = [
    {
      productId: "Accounts",
      productImageURL: "https://unpkg.com/ionicons@5.1.2/dist/svg/wallet-outline.svg",
      productPrice: 20.2,
    },
    {
      productId: "Insurance",
      productImageURL: "https://unpkg.com/ionicons@5.1.2/dist/svg/shield-checkmark-outline.svg",
      productPrice: 1599.0,
    },
    {
      productId: "Cards",
      productImageURL: "https://unpkg.com/ionicons@5.1.2/dist/svg/card-outline.svg",
      productPrice: 20.2,
    },
    {
      productId: "Loans",
      productImageURL: "https://unpkg.com/ionicons@5.1.2/dist/svg/calculator-outline.svg",
      productPrice: 12000.0,
    },
    {
      productId: "Deposits",
      productImageURL: "https://unpkg.com/ionicons@5.1.2/dist/svg/briefcase-outline.svg",
      productPrice: 20.2,
    },
  ];
  return {
    type: GET_PRODUCTS,
    payload: sampleData,
  };
};
