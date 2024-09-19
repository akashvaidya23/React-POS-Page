import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

const POS = () => {
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const skuRef = useRef(null);
  const nameRef = useRef(null);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  const submitForm = () => {
    console.log(selectedProducts);
  };
  const getAllProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setAllProducts(data.products);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const getProductBySku = async (e) => {
    let sku = e.target.value;
    let selectedProds = [...selectedProducts];
    if (sku) {
      let prod = allProducts.find((product) => {
        return product.sku == sku;
      });
      if (prod) {
        let exists = selectedProds.find((prod) => {
          if (prod.sku == sku) {
            return true;
          } else {
            return false;
          }
        });
        if (!exists) {
          selectedProds.unshift({ ...prod, quantity: 1 });
        } else {
          selectedProds.map((prod) => {
            if (prod.sku == sku) {
              prod.quantity += 1;
            }
          });
        }
        setSelectedProducts(selectedProds);
      }
    }
  };

  const searchByName = async (e) => {
    const nameP = e.target.value;
    setName(nameP);
    if (name.length > 2) {
      const matched = allProducts.filter((prod) => {
        return prod.title.toLowerCase().includes(name.toLowerCase());
      });
      let optionsList = [];
      matched.map((match) => {
        optionsList.unshift({ id: match.id, label: match.title });
      });
      setOptions(optionsList);
    } else {
      setOptions([]);
    }
  };

  const selectProduct = async (event, value) => {
    console.log(value.id);
    let selectedProds = [...selectedProducts];
    const matched = allProducts.filter((prod) => {
      return prod.id == value.id;
    });
    if (matched) {
      let exists = selectedProds.find((prod) => {
        return prod.id == matched[0].id;
      });
      if (!exists) {
        selectedProds.push({ ...matched[0], quantity: 1 });
      } else {
        selectedProds.find((prod) => {
          if (prod.id == matched[0].id) {
            prod.quantity += 1;
          }
        });
      }
      setSelectedProducts(selectedProds);
    }
    setName("");
    setOptions([]);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  let totalQty = 0;
  let totalAmount = 0;
  return (
    <>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Location
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={location}
                  label="Select Location"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Warje</MenuItem>
                  <MenuItem value={2}>Kothrud</MenuItem>
                  <MenuItem value={3}>Katraj</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <Link target="_blank" to={`products`}>
                All Products
              </Link>
            </Grid>
          </Grid>
        </Box>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Autocomplete
                disablePortal
                // onInput={searchByName}
                options={options}
                sx={{ width: 300 }}
                // onChange={selectFilm}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search customer by name/mobile"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                autoComplete="off"
                onChange={getProductBySku}
                value={sku}
                id="outlined-basic"
                label="Search Product by SKU"
                variant="outlined"
                style={{ width: "400px" }}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                autoComplete="off"
                onInput={searchByName}
                value={name}
                options={options}
                sx={{ width: 300 }}
                onChange={selectProduct}
                style={{ width: "450px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by product name" />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Sr. No
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    SKU
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center", border: "1px solid black" }}
                  >
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map((product, index) => {
                  totalQty = totalQty + product.quantity;
                  totalAmount = totalAmount + product.price * product.quantity;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                        key={index}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                        key={index}
                      >
                        {product.title}
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                        key={index}
                      >
                        {product.sku}
                      </TableCell>
                      <TableCell
                        key={index}
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={product.quantity.toFixed(2)}
                        />
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                        key={index}
                      >
                        {product.price}
                      </TableCell>
                      <TableCell
                        key={index}
                        style={{
                          textAlign: "center",
                          border: "1px solid black",
                        }}
                      >
                        {product.price * product.quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter stickyHeader>
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                    colSpan={4}
                  >
                    <b>Total</b>
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <b>{totalQty.toFixed(2)}</b>
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: "center",
                      border: "1px solid black",
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#fff",
                      zIndex: 1,
                    }}
                  >
                    <b>{totalAmount.toFixed(2)}</b>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
        <br />
        <div>
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            onClick={submitForm}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default POS;
