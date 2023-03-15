import { rest } from "msw";
import { setupServer } from "msw/node";
import { ProductCreateType } from "../../Types/product";
import { CreateUserType } from "../../Types/user";

const handler = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 2,
          title: "Intelligent Cotton Chair",
          price: 575,
          description:
            "The Football Is Good For Training And Recreational Purposes",
          images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
          ],
          creationAt: "2023-01-01T21:22:35.000Z",
          updatedAt: "2023-01-01T21:22:35.000Z",
          category: {
            id: 4,
            name: "Shoes",
            image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
            creationAt: "2023-01-01T21:22:35.000Z",
            updatedAt: "2023-01-01T21:22:35.000Z",
          },
        },
        {
          id: 3,
          title: "Recycled Soft Mouse",
          price: 139,
          description:
            "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
          images: [
            "https://api.lorem.space/image/fashion?w=640&h=480&r=8206",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=8343",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=8381",
          ],
          creationAt: "2023-01-01T21:22:35.000Z",
          updatedAt: "2023-01-01T21:22:35.000Z",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=2130",
            creationAt: "2023-01-01T21:22:35.000Z",
            updatedAt: "2023-01-01T21:22:35.000Z",
          },
        },
        {
          id: 4,
          title: "Rustic Steel Computer",
          price: 566,
          description:
            "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
          images: [
            "https://api.lorem.space/image/watch?w=640&h=480&r=9646",
            "https://api.lorem.space/image/watch?w=640&h=480&r=4605",
            "https://api.lorem.space/image/watch?w=640&h=480&r=1967",
          ],
          creationAt: "2023-01-01T21:22:35.000Z",
          updatedAt: "2023-01-01T21:22:35.000Z",
          category: {
            id: 2,
            name: "Electronics",
            image: "https://api.lorem.space/image/watch?w=640&h=480&r=1779",
            creationAt: "2023-01-01T21:22:35.000Z",
            updatedAt: "2023-01-01T21:22:35.000Z",
          },
        },
        {
          id: 5,
          title: "Generic Cotton Fish",
          price: 39,
          description:
            "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
          images: [
            "https://api.lorem.space/image/fashion?w=640&h=480&r=9378",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=9447",
            "https://api.lorem.space/image/fashion?w=640&h=480&r=5247",
          ],
          creationAt: "2023-01-01T21:22:35.000Z",
          updatedAt: "2023-01-01T21:22:35.000Z",
          category: {
            id: 1,
            name: "Clothes",
            image: "https://api.lorem.space/image/fashion?w=640&h=480&r=2130",
            creationAt: "2023-01-01T21:22:35.000Z",
            updatedAt: "2023-01-01T21:22:35.000Z",
          },
        },
      ])
    );
  }),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const product: ProductCreateType = await req.json();
      if (product.price < 0) {
        return res(ctx.status(400, "Data is invalid"));
      }
      if (!product.title) {
        return res(ctx.status(400, "Data is invalid"));
      }
      return res(ctx.json(product));
    }
  ),
  rest.delete("https://api.escuelajs.co/api/v1/products/2", (req, res, ctx) => {
    return res(
      ctx.json({
        isDeleted: true,
      })
    );
  }),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/100",
    (req, res, ctx) => {
      return res(
        ctx.json({
          isDeleted: false,
        })
      );
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/products/2",
    async (req, res, ctx) => {
      const editItems: {
        title: string;
        price: number;
        description: string;
      } = await req.json();

      if (!editItems.title) {
        return res(ctx.status(400, "Data invalid"));
      }

      if (editItems.price < 0) {
        return res(ctx.status(400, "Data invalid"));
      }

      return res(
        ctx.json({
          id: 2,
          title: editItems.title,
          price: editItems.price,
          description: editItems.description,
          images: [
            "https://api.lorem.space/image/shoes?w=640&h=480&r=2497",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=5307",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=4464",
          ],
          creationAt: "2023-01-01T21:22:35.000Z",
          updatedAt: "2023-01-01T21:22:35.000Z",
          category: {
            id: 4,
            name: "Shoes",
            image: "https://api.lorem.space/image/shoes?w=640&h=480&r=5514",
            creationAt: "2023-01-01T21:22:35.000Z",
            updatedAt: "2023-01-01T21:22:35.000Z",
          },
        })
      );
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/products/100",
    async (req, res, ctx) => {
      const editItems: {
        title: string;
        price: number;
        description: string;
      } = await req.json();

      return res(ctx.status(400, "Invalid product"));
    }
  ),
  rest.post( "https://api.escuelajs.co/api/v1/users/", async (req, res, ctx)=>{
    const newUser: CreateUserType = await req.json();
    return res(ctx.json(
        {
            "id": 1,
            "email": newUser.email,
            "password": newUser.password,
            "name": newUser.name,
            "role": "customer"
          },
    ))
  })
];

const server = setupServer(...handler);
export default server;
