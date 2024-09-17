import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const Product_List = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    document.title = "Products";
    fetch("https://dummyjson.com/products")
      .then((data) => data.json())
      .then((response) => {
        setProducts(response.products);
      });
  }, []);
  console.log(products);

  return (
    <>
      <div>
        <h1>Product List</h1>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 750 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => {
                  console.log(product);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell key={index}>{index + 1}</TableCell>
                      <TableCell key={index}>{product.title}</TableCell>
                      <TableCell key={index}>{product.sku}</TableCell>
                      <TableCell key={index}>{product.price}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default Product_List;
