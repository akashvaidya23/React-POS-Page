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
        <h1 style={{ textAlign: "center" }}>Product List</h1>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                }}
              >
                Sr. No
              </TableCell>
              <TableCell
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                SKU
              </TableCell>
              <TableCell
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              console.log(product);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell
                    style={{ border: "1px solid black", textAlign: "center" }}
                    key={index}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", textAlign: "center" }}
                    key={index}
                  >
                    {product.title}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", textAlign: "center" }}
                    key={index}
                  >
                    {product.sku}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid black", textAlign: "center" }}
                    key={index}
                  >
                    {product.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Product_List;
