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
  import { useNavigate } from "react-router-dom";
  import React from "react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import Container from "react-bootstrap/Container";
  import Header from "../components/Header";
  import Footer from "../components/Footer";
  import Row from "react-bootstrap/Row";
  import Col from "react-bootstrap/Col";
  import { Select } from "@chakra-ui/react";
  import {
    deleteCoupon,
    getCoupon,
    getData,
    deleteData,
    updateData,
  } from "../redux/DataReducer/action";
  import { DeleteIcon, Icon, EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
  const BackendServer = process.env.REACT_APP_BACKEND_SERVER;
  const ProductPage = () => {
   const [prod, setProd] = useState([]);
       const [nishu, setNishu] = useState({
      orders: [],
      products: [],
    });
    let num = 0;
    var filteredProducts1 = [];
  
      // const [products, setProducts] = useState(null);
      const location = useLocation();
      const email = JSON.parse(localStorage.getItem('all')).email;
      // const cartData =JSON.parse(localStorage.getItem('cart'));
    
      const axiosTest = async () =>{
        const response = await axios.get(`${BackendServer}getOrder`);
  
         const response1 = await axios.get(`${BackendServer}getImage`);
    
      // prod.push(response.data);
      // prod.push(response1.data);
      // const orders = response.data;
      // const products = response1.data;
      setProd(response.data);
  
      setNishu({
          orders: response.data,
          products : response1.data,
      })
       
      }
     
    
      useEffect(()=>{
        axiosTest();
    
      }, []);
      const myStyle = {
          borderRadius:'2px',
          borderColor:'black'
      }
  
  
      console.log('prod2', nishu.orders);
       console.log('prod', prod);
      // setProd(nishu.orders);
      const prod1 = nishu.orders.filter((items) =>items.email_reciever === email);
      console.log(prod1,'aman');
       console.log('prod233', nishu.products.data);
  
      //  const items = prod1[0].items;
      //  const id = [];
      //  for(let i = 0 ; i< items.length; i++){
      //     id.push( items[i].id.split("/"));
      //  }
      //  console.log('ids', id);
  
       {prod1.map((item, num1) => (
            <>
              {item.items.map((orders, index) => {
                  num = num + 1;
                
                  //  const id = [];
                   const id = orders.id.split("/");
                   const proid = id[0];
                   console.log(proid);
      
  
                  //   var sku = products.productId + "/" + col + "/" + item;
  
                     var products = nishu.products.data?.find((item1)=>item1.productId===proid); 
                     console.log(products, 'sanchit')
                    
  
                    filteredProducts1[num - 1] = {
                      user : item.name_reciever,
                      id : orders.id,
                      productName: products.productName,
                      image : products.image,
                      color : products.color,
                      Quantity: orders.quantity,
                      price :orders.price ? orders.price: 0,
                      Status : item.status,
                      // Quantity: nishu.Quantity ,
                    };
                    console.log(filteredProducts1,'asdcfv');
                    
  
              })}
            </>
          ))}
          // if(filteredProducts1.length ===0){
          //   filteredProducts1[0] ={
          //     order: 'You never ordered anything',
          //   }
          // };
  
    
  
    return (
      <>
        {/* <AdminNavbar /> */}
        <br />
        <Header/>
        
        <Heading style={{paddingLeft:'3%',fontSize:'40px'}}>My Orders</Heading>
        <br></br>
  
        {/* <Box
          m="auto"
          w={"95%"}
          bg={'#50CF96'}
          boxShadow={"rgba(80, 270, 150, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        > */}
          
          {
            filteredProducts1.length == 0 ?  <Box
            m="auto"
            w={"95%"}
            // bg={'#50CF96'}
            // boxShadow={"rgba(80, 270, 150, 0.24) 0px 3px 8px"}
            p={"1.8rem"}
          ><Text fontSize={'50px'}>You haven't ordered yet</Text></Box> :
         
          filteredProducts1.map((item, index) => (
              <>
              <Box
          m="auto"
          w={"95%"}
          bg={'#50CF96'}
          boxShadow={"rgba(80, 270, 150, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        >
             <Box
          m="auto"
          w={"95%"}
          bg={'#F5F5F4'}
          boxShadow={"rgba(12, 0, 0, 0.24) 0px 3px 8px"}
          p={"1.1rem"}
        >
            
            <Flex
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"space-between"}
              my={"5"}
              fontSize={["7px", "10px", "12px", "15px"]}
            >
              <Box w="15%">{item.order}</Box>
              <Box width={"15%"} mx={"2"}>
                <Image
                  width={"70%"}
                  src={item.image[item.color.indexOf((item.id).split('/')[1])]?.[0]}
                  alt={item.productName}
                />
              </Box>
              <Box w="15%"><Text fontSize='1.4em' fontWeight='bold' >{item.productName}</Text></Box>
              <Box w="15%"><Text fontSize='1.4em' fontWeight='bold' >Qty:{item.Quantity}</Text></Box>
             
              {/* {isLargerThan ? <Box w="15%">{item.productName}</Box> : null} */}
              {/* <Box w="15%">{item.productGender}</Box> */}
              <Box w="15%"><Text fontSize='1.4em' fontWeight='bold' > Rs. {item.price}</Text></Box>
              
              <Box
                w="15%"
              //   bg={item.Status === "Stock Updated" ? "#198754" : "#DC3444"}
              >
                <Text fontSize='1.4em' fontWeight='bold'> {item.Status}</Text>
              </Box>
              <Box>
                <Flex
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  w="10%"
                >
                  {/* <Box mx={"3"}>
                    <Button>
                      <Icon
                        as={DeleteIcon}
                        color="red"
                        onClick={() => deleteProduct(item.productId)}
                      />
                    </Button>
                  </Box> */}
                  <Box mx={"3"}>
                   
                      {/* id={item.productId}
                      products={products}
                      dispatch={dispatch} */}
                    
                    
                  </Box>
                </Flex>
              </Box>
            </Flex>
            </Box>
            <br></br>
            </Box>
            </>
            
            
          ))
                    }
  
        {/* </Box> */}
        <br>
        </br>
        <Footer/>
      </>
    );
  };
  
  export default ProductPage;