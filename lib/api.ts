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

export const updateStatus = async (status: string, id: string) => {
  const response = await fetch(`/api/customization/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the product status");
  }

  return response.ok;
};
