import {
  Box,
  Button,
  Image,
  Flex,
  useMediaQuery,
  Heading,
  Text,
  border,
  Spacer,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Select } from "@chakra-ui/react";

import {
  deleteCoupon,
  getCoupon,
  getData,
  deleteData,
  updateData,
} from "../../redux/DataReducer/action";
import AdminNavbar from "../AdminNavbar";
import { useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// import { ViewSku } from "./ViewSku";
import {
  DeleteIcon,
  Icon,
  EditIcon,
  ViewIcon,
  ArrowForwardIcon,
  CheckIcon,
  DragHandleIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { AdminUpdate } from "../AdminModal";
// import { ViewDetails } from "./viewDetails";
import swal from "sweetalert";
const StockPage2 = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 468px)");

  // const { quant } = useParams();
  var newObject = {};
  let num = 0;
  var sum = 0;
  const navigate = useNavigate();
  // const [showhide, setShowhide] = useState('');
  const products = useSelector((state) => state.dataReducer.products);
  const [prod, setProd] = useState([]);
  const [prod1, setProd1] = useState([]);
  const [productForQuantity, setPFQ] = useState([]);
  var filteredProducts1 = [];
  var productQuant = [];
  const [Quantity, setQuantity] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [InputFilter, setInputFilter] = useState("");
  const [Attribute, setAttribute] = useState("");
  const [operator, setOperator] = useState();
  const [Count1, setCount] = useState([]);

  const handleInputFilter = (e) => {
    const add = e.target.value;
    setInputFilter(add);
  };

  const handleAttributes = (e) => {
    const att = e.target.value;
    setAttribute(att);
  };
  // console.log(Attribute);

  const handleOperator = (e) => {
    const op = e.target.value;
    setOperator(op);
  };
  //   console.log(InputFilter);
  const deleteProduct = (id) => {
    dispatch(deleteData(id)).then(() => {
      dispatch(getData());
    });
  };

  const textStyle = {
    borderColor: "grey",
    textAlign: "center",
    border: "none",
  };

  const mystyle = {
    marginLeft: "1240px",
    marginTop: "-45px",
  };
  var len = prod.length;
  // console.log(prod.Quantity);
  const handleClick = async(id, sku, i) => {
    //   const aman = id + "/" + col + "/" + item;

    console.log(newObject);
    console.log(prod, 'prod');

    console.log(products);
    // console.log(currentProducts);

    if (newObject[i]) {
      var quant = newObject[i].value;
    }
    const data = new FormData();

    if (quant) {
      data.append("productId", id);
      data.append("SKUId", sku);
      data.append("Quantity", quant);
      

      const updatedDataResponse = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER}admin5/`,data).then((res) => {
        console.log(res.status);
        // if (res.data.status === 200) {
        swal("Success", res.data.message, "success")
      });

      const responses = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}getStock`);
      console.log('sd', responses.data);

      // setPFQ(responses.data);

      for(let i= 0; i< responses.data.length; i++){
        productQuant.push(responses.data[i]);
      }

      console.log('prodquant', productQuant);
  
      const currentProducts1 = productQuant.filter((item) => item.productId === id);
     
      console.log('pro', productQuant);
      console.log('curr', currentProducts1);
     
      for (let i = 0; i < currentProducts1.length; i++) {
        sum = sum + currentProducts1[i].Quantity;
      }
     
      console.log(sum);
      const payload = {
        Quantity: sum,
        Status: "Stock Updated",
      };
      dispatch(updateData(id, payload)).then(() => {
        dispatch(getData());
      });
    } else {
      swal("Quantity can't be empty");
    }
  };

  const handleChange = (e, id) => {
    newObject = { ...Quantity };
    newObject[`${id}`] = { value: e.target.value };
    console.log(newObject);
  };

  const dispatch = useDispatch();
  console.log(prod);
  console.log(products, 'amanaa123');
  //   const handleshowhide = (e) => {
  //     e.preventDefault();
  //     const getuser = e.target.value;
  //     console.log(getuser);
  //     setShowhide('1');

  // }
  const axiosTest = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}getStock`);
    setProd(response.data);
  };
  useEffect(() => {
    axiosTest();
  }, []);
 
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  {
    
        {products.map((products, num1) => (
          <>
          
            {products.color.map((col, index) => (
              <>
                {products.Sizes[index].map((item, i) => {
                  num = num + 1;
                  // console.log(products, num1);
                  var aman = num;

                  var sku = products.productId + "/" + col + "/" + item;

                   var nishu = prod.find((item)=>item.SKUId===sku) ? prod.find((item)=>item.SKUId===sku): {productId:products.productId , SKUId:sku, Quantity: 0}; 
                  

                  filteredProducts1[num - 1] = {
                    productId: products.productId,
                    skuid: sku,
                    productName: products.productName,
                    // Quantity: aman - 1 < len ? prod[aman - 1].Quantity : 0,
                    Quantity: nishu.Quantity ,
                  };
                  
                })}
              </>
            ))}
          </>
        ))}
     
  }

  const filteredProducts2 = filteredProducts1.filter((items) => {
    if (InputFilter === "") {
      return items;
    } else {
      if (operator === "Equals") {
        if (Attribute === "Product Id") {
          if (items.productId === InputFilter) {
            return items;
            // console.log(items);
          }
        } else if (Attribute === "Product Name") {
          if (items.productName === InputFilter) {
            return items;
          }
        } else if (Attribute === "SKU ID") {
          if (items.skuid === InputFilter) {
            return items;
          }
        } else if (Attribute === "Quantity") {
          if (items.Quantity === parseInt(InputFilter)) {
            return items;
          }
        }
      }else if(operator==='Contains'){
        if (Attribute === "Product Id") {
          if (items.productId.includes(InputFilter)) {
            return items;
            // console.log(items);
          }
        } else if (Attribute === "Product Name") {
          if (items.productName.toLowerCase().includes(InputFilter)) {
            return items;
          }
        } else if (Attribute === "SKU ID") {
          if (items.skuid.toLowerCase().includes(InputFilter) ) {
            return items;
          }
        } else if (Attribute === "Quantity") {
          if (items.Quantity===parseInt(InputFilter) ) {
            return items;
          }
        }
      }
    }
  });
  console.log(filteredProducts2, 'amanaa');

  return (
    <>
      <AdminNavbar />
      <br />
      <Heading>
        <p style={{ marginRight: "1100px" }}>Stock</p>
        <p style={mystyle}>
          <AdminUpdate />
        </p>
      </Heading>
      {/* <br></br> */}

      <Box
        m="auto"
        w={"100%"}
        boxShadow={"rgba(0, 0, 0, 0.12) 0px 3px 8px"}
        p={"1.1rem"}
      >
        <Flex alignItems={"left"} textAlign={"left"}>
          <Box
            m="auto"
            w={"40%"}
            p={"1rem"}
          >
            <Flex
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"stretch"}
              my={"1"}
            >
              <Container className="rounded border-right-0-dark">
                <Row>
                  <Col className="rounded border border-dark">

                    <Select
                      //   name="Color"
                      // variant="outline"
                      style={{border: 'none'}}
                      placeholder="Attribute"
                      onChange={(e) => handleAttributes(e)}
                    >
                      <option value="Product Id">Product Id</option>
                      <option value="Product Name">Product Name</option>
                      <option value="SKU ID">SKU ID</option>
                      <option value="Quantity">Quantity</option>
                    </Select>
                  </Col>
                  <Col className="rounded border border-dark">
                    <Select
                      //   name="Color"
                      style={{border: 'none'}}
                      placeholder="Operations"
                      onChange={(e) => handleOperator(e)}
                    >
                      <option value="Contains">Contains</option>
                      <option value="Equals">Equals</option>
                    </Select>
                  </Col>
                  <Col className="rounded border border-dark">
                    <Input
                      type={"text"}
                      style={textStyle}
                      onChange={handleInputFilter}
                      value={InputFilter}
                    ></Input>
                  </Col>

                 
                </Row>

                
              </Container>
            </Flex>
          </Box>
          <Spacer />
        </Flex>
       

        <Box
          m="auto"
          w={"100%"}
          boxShadow={"rgba(0.24, 0, 0, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        >
          <Flex
            alignItems={"center"}
            textAlign={"center"}
            justifyContent={"space-between"}
            my={"5"}
            fontSize={["7px", "10px", "12px", "15px"]}
          >
            <Box w="15%">
              <Text fontSize="1.2em" fontWeight="bold">
                SNO.
              </Text>
            </Box>
            <Box w="15%">
              <Text fontSize="1.2em" fontWeight="bold">
                {/* {filteredProducts1[0]} */}SKUId
              </Text>
            </Box>
            <Box w="15%">
              <Text fontSize="1.2em" fontWeight="bold">
                Product Id
              </Text>
            </Box>
            <Box w="15%">
              <Text fontSize="1.2em" fontWeight="bold">
                Product Name
              </Text>
            </Box>

            <Box w="15%">
              <Text fontSize="1.2em" fontWeight="bold">
                Quantity
              </Text>
            </Box>
            <Box mx={"3"}>
              <Button>
                <Icon as={EditIcon} float="right" color="red" />
              </Button>
            </Box>
          </Flex>

          {filteredProducts2.map((items, index) => {
            return (
              <Flex
                alignItems={"center"}
                textAlign={"center"}
                justifyContent={"space-between"}
                my={"5"}
                fontSize={["7px", "10px", "12px", "15px"]}
              >
                <Box w="15%">{index + 1}</Box>
                <Box w="15%">{items.skuid}</Box>
                <Box w="15%" textColor="Black">
                  {items.productId}
                </Box>
                {/* ))}  */}
                <Box w="15%">{items.productName}</Box>

                <Box w="15%">
                  <form>
                    <input
                      type="Number"
                      required
                      // key={item._id}
                      // textAlign='center'
                      placeholder={
                        items.Quantity
                        // prod.find((x)=> x.SKUId=== sku).
                      }
                      onChange={(e) => handleChange(e, index)}
                      value={Quantity[`${index}`]}
                      className="form-control"
                      style={textStyle}
                    />
                    {/* placeholder={ prod[i].Quantity!==null ? prod[i].Quantity : '0'} */}
                    {/* <p contenteditable="true">This is an editable paragraph.</p> */}
                  </form>
                  {/* <Box w="15%" bg={item.Status==="Stock Updated" ? '#198754':'#DC3444'}><Text color="white">{item.Status}</Text></Box>  */}
                </Box>

                <Box mx={"3"}>
                  <Button>
                    <Icon
                      as={CheckIcon}
                      color="green"
                      onClick={() =>
                        handleClick(items.productId, items.skuid, index)
                      }
                    />
                  </Button>
                </Box>
              </Flex>
            );
          })}

          <br></br>
          {/* <Box>
          <button type="submit" className="btn btn-primary " style={{marginLeft : '90%'}} onClick={handleSubmit}>Update Details</button></Box> */}
        </Box>
        {/* </Flex> */}
      </Box>
    </>
  );
};

export default StockPage2;