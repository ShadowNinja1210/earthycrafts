import mongoose, { Schema, Document, Model, Types } from "mongoose";

// --------------------------------
// Product Schema
// --------------------------------
export interface INewProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  images: { image: string; main: boolean }[];
  description: string;
  productCode: string;
  primaryCategory: string[];
  secondaryCategory: string[];
  subCategory?: string;
  stoneName: string;
  isFeatured: boolean;
  inStock: boolean;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const NewProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        image: {
          type: String,
          required: true,
        },
        main: {
          type: Boolean,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    productCode: {
      type: String,
      required: true,
    },
    primaryCategory: {
      type: [String],
      required: true,
    },
    secondaryCategory: {
      type: [String],
      required: true,
    },
    subCategory: {
      type: String,
    },
    stoneName: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let NewProduct: Model<INewProduct>;
if (mongoose.models.Product) {
  NewProduct = mongoose.models.Product;
} else {
  NewProduct = mongoose.model<INewProduct>("Product", NewProductSchema);
}

// --------------------------------
// Gallery Schema
// --------------------------------

export interface IGallery extends Document {
  _id: Types.ObjectId;
  image: string;
  aspect: "landscape" | "portrait";
  productLink: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema: Schema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    aspect: {
      type: String,
      required: true,
      enum: ["landscape", "portrait"],
      default: "landscape",
    },
    productLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let Gallery: Model<IGallery>;
if (mongoose.models.Gallery) {
  Gallery = mongoose.models.Gallery;
} else {
  Gallery = mongoose.model<IGallery>("Gallery", GallerySchema);
}

// --------------------------------
// Blog Schema
// --------------------------------
export interface IBlog extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [String], // Array of strings for the blog content
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let Blog: Model<IBlog>;
if (mongoose.models.Blog) {
  Blog = mongoose.models.Blog;
} else {
  Blog = mongoose.model<IBlog>("Blog", BlogSchema);
}

// --------------------------------
// User Schema
// --------------------------------
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let User: Model<IUser>;
if (mongoose.models.User) {
  User = mongoose.models.User;
} else {
  User = mongoose.model<IUser>("User", UserSchema);
}

export interface IEnquiry extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let Enquiry: Model<IEnquiry>;
if (mongoose.models.Enquiry) {
  Enquiry = mongoose.models.Enquiry;
} else {
  Enquiry = mongoose.model<IEnquiry>("Enquiry", EnquirySchema);
}

export interface ICustomization extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "Pending" | "Delivered" | "Cancelled";
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CustomizationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

let Customization: Model<ICustomization>;
if (mongoose.models.Customization) {
  Customization = mongoose.models.Customization;
} else {
  Customization = mongoose.model<ICustomization>("Customization", CustomizationSchema);
}

export { Gallery, NewProduct, Blog, User, Enquiry, Customization };
