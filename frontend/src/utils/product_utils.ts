import { Paper, styled } from "@mui/material";

export const productOptions = [
  {
    value: "All",
    id: 0,
  },
  {
    value: "Clothes",
    id: 1,
  },
  {
    value: "Electronics",
    id: 2,
  },
  {
    value: "Furniture",
    id: 3,
  },
  {
    value: "Shoes",
    id: 4,
  },
  {
    value: "Others",
    id: 5,
  },
];

export const createproductOptions = [
  {
    value: "Clothes",
    id: 1,
  },
  {
    value: "Electronics",
    id: 2,
  },
  {
    value: "Furniture",
    id: 3,
  },
  {
    value: "Shoes",
    id: 4,
  },
  {
    value: "Others",
    id: 5,
  },
];

export const categoryOptions = [
  {
    value: "Clothes",
    id: 1,
  },
  {
    value: "Electronics",
    id: 2,
  },
  {
    value: "Furniture",
    id: 3,
  },
  {
    value: "Shoes",
    id: 4,
  },
  {
    value: "Others",
    id: 5,
  },
];


export const sortOptions = [
  {
    value: "None",
  },
  {
    value: "Lowest",
  },
  {
    value: "Highest",
  },
];

export const getCategoryId = (name: string) => {
  return productOptions.find((opt) => opt.value === name)?.id;
};

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const getPagesNo = (total: number, each: number) =>{
  return Math.ceil(total/each)
}

export const scrollUp = () =>{
  window.scrollTo({
    top: 0,
    behavior: "auto"
  }
    )
}