import { stones } from "@/public/assets/some-data";
import { INewProduct } from "./schema";
import { lowerCase } from "lodash";

// Fetch all products from the API
export const fetchAllProducts = async () => {
  const res = await fetch("/api/product");
  const data = await res.json();
  return data;
};

// Fetch a single product from the API by ID
export const fetchProduct = async (id: string) => {
  const res = await fetch(`/api/product/${id}`);
  const data = await res.json();
  return data;
};

// Get all featured products from the API
export const fetchFeaturedProducts = async () => {
  const res = await fetch("/api/product/featured");
  const data = await res.json();

  if (res.status === 404) {
    return [];
  }
  return data;
};

// Add a new product to the API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addProduct = async (data: any) => {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to edit new product");
  }

  return response.json();
};

// Edit a product in the API by ID
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editProduct = async (data: any, id: string) => {
  const response = await fetch(`/api/product/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to edit the product");
  }

  return response.json();
};

export const updateStatus = async (orderStatus: "Delivered" | "Cancelled" | "Pending", id: string) => {
  const response = await fetch(`/api/customization/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderStatus }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the product status");
  }

  return response.ok;
};

export const enquiryPost = async (data: { name: string; email: string; phone: string; message: string }) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit enquiry");
  }

  return response.json();
};

export const fetchEnquiries = async () => {
  const res = await fetch("/api/contact");
  if (!res.ok) {
    if (res.status === 404) {
      return [];
    } else {
      throw new Error("Failed to fetch enquiries");
    }
  }

  const data = await res.json();

  return data;
};

export const customizationPost = async (data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  url: string;
}) => {
  const response = await fetch("/api/customization", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit customization request");
  }

  return response.json();
};

export const getStoneInfo = async (stoneName: string) => {
  // const res = await fetch(`/api/stone/${stoneName}`);
  // if (!res.ok) {
  //   return null;
  // }

  // const data = await res.json();

  const data = stones.find((stone) => lowerCase(stone.name) === lowerCase(stoneName));

  return data;
};

export const getStonesProduct = async (stoneName: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
  const data = await res.json();
  const stone = stones.find((stone) => lowerCase(stone.name) === lowerCase(stoneName));

  if (!res.ok || !stone) {
    return [];
  }

  const products = data.filter((product: INewProduct) => stone.products.includes(product.productCode));

  return products;
};
