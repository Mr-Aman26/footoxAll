import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OwlCarousel from 'react-owl-carousel';
import parse from 'html-react-parser';
import { CardFooter } from "@chakra-ui/react";
import axios from "axios";
// import CartData from "../components/CartData";
const BackendServer = process.env.REACT_APP_BACKEND_SERVER;




const ProductDetails=()=>{
    const { id } = useParams();
    let navigate = useNavigate();
    const [prod, setProd] = useState();
    const [color, setColor]=useState([]);
    const [imgg, setImg]=useState([]);
    const [allImage, setAllImage]=useState([[]]);
    const [indexNo, setIndexNo]=useState(0);
    const [sizes, setSize]=useState([[]]);
    const [cartProduct,setCartProduct]=useState({index:0});
    const userData=JSON.parse(localStorage.getItem('all'));
    const [change,setChange]=useState(false);
    // const products = useSelector((store) => store.dataReducer.products);




    const products = useSelector((store) => store.dataReducer.products);
    const dispatch = useDispatch();

    const handleDes = (id) => {
      console.log('click');
      console.log(id);
      navigate(`/${id}`);
      window.scrollTo(0,0); 

    };

    const Cart=async(e)=>{
      e.preventDefault();
      // console.log('cart');
      if(!e.target.size.value){
        alert("Select The Size First");
          return;
      }
      // console.log(e.target.size.value);
      if(!cartProduct.color){
        cartProduct.color=currentProducts.color[0];
      }

      const skuId=id+'/'+cartProduct.color+'/'+e.target.size.value;
      cartProduct.skuId=skuId;
      
      // console.log(cartProduct);
      if(!userData){
        // console.log(currentProducts);
        let items=sessionStorage.getItem('items');
        if(items && items.length>0){
          items=JSON.parse(items);
          await items.push(currentProducts);
          await sessionStorage.setItem('items',JSON.stringify(items));
          let quant=JSON.parse(sessionStorage.getItem('quantity'));
          let tot=Number(sessionStorage.getItem('total'));
          tot=tot+(Number(currentProducts.selling_price)*Number(e.target.quantity.value));
          let cart=JSON.parse(localStorage.getItem('cart'));
          await cart.push({id:skuId,quantity:Number(e.target.quantity.value),price:Number(currentProducts.selling_price)*Number(e.target.quantity.value)});
          await quant.push(e.target.quantity.value);
          await sessionStorage.setItem('quantity',JSON.stringify(quant));
          await sessionStorage.setItem('total',tot);
          await localStorage.setItem('cart',JSON.stringify(cart));
          // console.log(change);
          
        }
        else{
          await sessionStorage.setItem('items',JSON.stringify([currentProducts]));
          await sessionStorage.setItem('quantity',JSON.stringify([e.target.quantity.value]));
          await sessionStorage.setItem('total',(Number(currentProducts.selling_price)*Number(e.target.quantity.value)));
          await localStorage.setItem('cart',(JSON.stringify([{id:skuId,quantity:Number(e.target.quantity.value),price:Number(currentProducts.selling_price)*Number(e.target.quantity.value)}])));
          // await setChange(!change);
        }

        
        // sessionStorage.setItem
        // console.log('change is changing',change);
        setCartProduct(cartProduct);
        setChange(!change);

      }



      else{

      
      
      axios.post(`${BackendServer}checkout`, {
      email:userData.email,id:skuId,quantity:e.target.quantity.value,price:(Number(currentProducts.selling_price)*Number(e.target.quantity.value))
    }).then((response) => {
      // setCartData(response);
      // console.log(response)
      setCartProduct(cartProduct);
      setChange(!change);
      // CartData();
    });
      // setCartProduct()
      // navigate(`/checkout`);
      // window.location.reload();
      // window.scrollTo(0,0);
    }
  }

    // useEffect(() => {
    //   console.log('rerub');
    // }, [cartProduct]);


    const handleColor=(item,color)=>{
      // console.log(item,color);
      let cartProduct1={};
      cartProduct1.color=item;
      cartProduct1.index=color;
      setCartProduct(cartProduct1)
      setIndexNo(color);
      // console.log(cartProduct);
    }

    // console.log('cart',cartProduct);
    

    const [currentProducts, setCurrentProducts] = useState({});

    let num = useState({});

    useEffect(() => {
        if (products.length === 0) {
          dispatch(getData());
        }
      }, [dispatch, products.length,num]);
      useEffect(() => {
        if (id) {
          // const cartProduct1={color:'',index:0};
          const cur = products.find((item) => item.productId === id);

          cur && setCurrentProducts(cur);
          cur && setColor(cur.color)
          // cartProduct1.color=cur?.color[0];
          // cartProduct1.index=0;
          // cur &&setCartProduct(cartProduct1)
          cur && setImg(cur.image[0]);
          cur && setAllImage(cur.image);
          cur && setSize(cur.Sizes);
          setProd(products)
        }
      }, [id, products,dispatch,num]);

      // const imgg=currentProducts.image;
      // const color=currentProducts.color;
      // console.log(products,'cur2');
      // console.log(currentProducts, products);
      let index = products.indexOf(currentProducts);
      // console.log('numberObj',index,sizes,sizes[0],color);

      // console.log('colors',indexNo)
      if(products){

    return (

          
      <body className="ps-loading">
        

      <Header change={change}/>
    <main className="ps-main">
      <div className="test">
        <div className="container">
          <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
                </div>
          </div>
        </div>
      </div>
      <div className="ps-product--detail pt-60">
        <div className="ps-container">
        
          <div className="row">
            <div className="col-lg-10 col-md-12 col-lg-offset-1">
              <div className="ps-product__thumbnail">
                <div className="ps-product__preview">
                  <div className="ps-product__variants">
                  {/* {imgg?.map((item) => (                   
                  <div className="item"><img src={item? item:"images/shoe-detail/2.jpg"} alt=""/></div>))} */}
                    <div className="item"><img src={allImage[indexNo][0] || "images/shoe-detail/2.jpg"} alt=""/></div>
                     <div className="item"><img src={allImage[indexNo][1] || "images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={allImage[indexNo][2] || "images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={allImage[indexNo][3] || "images/shoe-detail/2.jpg"} alt=""/></div>
                    <div className="item"><img src={allImage[indexNo][4] || "images/shoe-detail/2.jpg"} alt=""/></div>
                  </div><a className="popup-youtube ps-product__video" href="http://www.youtube.com/watch?v=0O2aH4XLbto"><img src={allImage[indexNo][0]} alt=""/><i className="fa fa-play"></i></a>
                </div>
                <div className="ps-product__image">
                  <div className="item"><img className="zoom" src={allImage[indexNo][0] || "images/shoe-detail/2.jpg"} alt="" data-zoom-image={allImage[indexNo][0] || "images/shoe-detail/2.jpg"}/></div>
                  <div className="item"><img className="zoom" src={allImage[indexNo][1] || "images/shoe-detail/2.jpg"} alt="" data-zoom-image={allImage[indexNo][1] || "images/shoe-detail/2.jpg"}/></div>
                  <div className="item"><img className="zoom" src={allImage[indexNo][2] || "images/shoe-detail/2.jpg"} alt="" data-zoom-image={allImage[indexNo][2] || "images/shoe-detail/2.jpg"}/></div>
                  <div className="item"><img className="zoom" src={allImage[indexNo][3] || "images/shoe-detail/2.jpg"} alt="" data-zoom-image={allImage[indexNo][3] || "images/shoe-detail/2.jpg"}/></div>
                  <div className="item"><img className="zoom" src={allImage[indexNo][4] || "images/shoe-detail/2.jpg"} alt="" data-zoom-image={allImage[indexNo][5] || "images/shoe-detail/2.jpg"}/></div>
                </div>
              </div>
              <div className="ps-product__thumbnail--mobile">
                <div className="ps-product__main-img"><img src={allImage[indexNo][0]} alt=""/></div>
                <div className="ps-product__preview owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="20" data-owl-nav="true" data-owl-dots="false" data-owl-item="3" data-owl-item-xs="3" data-owl-item-sm="3" data-owl-item-md="3" data-owl-item-lg="3" data-owl-duration="1000" data-owl-mousedrag="on">
                <OwlCarousel items={3} margin={20} autoplay={true} loop={true} dots={false} nav={false}>
                  <img src={allImage[indexNo][0]} alt=""/><img src={allImage[indexNo][1]} alt=""/><img src={allImage[indexNo][2]} alt=""/>
                  </OwlCarousel>
                  </div>
              </div>
              <div className="ps-product__info">
                <div className="ps-product__rating">
                  <select className="ps-rating">
                    <option value="1"><span className="fa fa-star checked"></span>1</option>
                    <option value="1">2</option>
                    <option value="1">3</option>
                    <option value="1">4</option>
                    <option value="2">5</option>
                  </select><a href="#">(Read all 8 reviews)</a>
                </div>
                <h1>{currentProducts?.productName}</h1>
                <p className="ps-product__category"><a href="#"> Men shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p>
                <h3 className="ps-product__price">₹{currentProducts?.selling_price}  <del>₹{currentProducts?.original_price}</del></h3>
                <div className="ps-product__block ps-product__quickview">
                  <h4>QUICK REVIEW</h4>
                  <p>{parse(`${currentProducts.description}`)}</p>
                </div>
                <form onSubmit={Cart}>
                <div className="ps-product__block ps-product__style">
                  <h4 style={{textAlign:'left'}}>CHOOSE YOUR STYLE</h4>
                  <ul>
                  {color.map((item,i) => (
                    <li><a onClick={()=>handleColor(item,i)}><img  src={allImage[i][0]} alt=""/></a></li>
                  ))}
                    {/* <li><a href="product-detail.html"><img src={currentProducts?.image?.[0]} alt=""/></a></li> */}
                    {/* <li><a href="product-detail.html"><img src={currentProducts?.image?.[2]} alt=""/></a></li>
                    <li><a href="product-detail.html"><img src={currentProducts?.image?.[3]} alt=""/></a></li> */}
                  </ul>
                </div>
                <div className="ps-product__block ps-product__size">
                  <h4 style={{textAlign:'left'}}>CHOOSE SIZE<a href="#">Size chart</a></h4>
                  <select name="size" style={{display:'inline-block', overflow: 'hidden',width: '100%', textAlign: 'left',fontFamily: "sans-serif",fontWeight: '400',fontsize: '16px',lineHeight: '1.4em',color: '#5b5b5b',boxSizing: 'border-box',padding: '0 20px',height: '50px',lineHeight: '1.4em',width: '100%',backgroundColor:'#E4E4E4',border: 'none',position:'relative',display: 'inline-block',float:'left',width: '220px',appearance: 'none',paddingRight:'20px',backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.9rem center',
                  backgroundSize: '1em'}}>
                    <option value="" >SELECT SIZE</option>
                    {sizes?.[cartProduct.index].map((item,index)=>{
                      return(
                        <option value={item}>{item}</option>
                      );
                    })}
                    
                    {/* <option value="3">4.5</option>
                    <option value="3">5</option>
                    <option value="3">6</option>
                    <option value="3">6.5</option>
                    <option value="3">7</option>
                    <option value="3">7.5</option>
                    <option value="3">8</option>
                    <option value="3">8.5</option>
                    <option value="3">9</option>
                    <option value="3">9.5</option>
                    <option value="3">10</option> */}
                  </select>
                  <div className="form-group">
                    <input className="form-control" name="quantity" type="number" min="1" defaultValue="1"/>
                  </div>
                </div>
                <div className="ps-product__shopping" ><button className="ps-btn mb-10" type="submit"  style={{float:'left'}}>Add to cart<i className="ps-icon-next" ></i></button>
                  <div className="ps-product__actions"><a className="mr-10" href="whishlist.html"><i className="ps-icon-heart"></i></a><a href="compare.html"><i className="ps-icon-share"></i></a></div>
                </div>
                </form>
              </div>
              <div className="clearfix"></div>
              <div className="ps-product__content mt-50">
                <ul className="tab-list" role="tablist">
                  <li className="active"><a href="#tab_01" aria-controls="tab_01" role="tab" data-toggle="tab">Overview</a></li>
                  <li><a href="#tab_02" aria-controls="tab_02" role="tab" data-toggle="tab">Review</a></li>
                  <li><a href="#tab_03" aria-controls="tab_03" role="tab" data-toggle="tab">PRODUCT TAG</a></li>
                  <li><a href="#tab_04" aria-controls="tab_04" role="tab" data-toggle="tab">ADDITIONAL</a></li>
                </ul>
              </div>
              <div className="tab-content mb-60">
                <div className="tab-pane active" role="tabpanel" id="tab_01">
                  <p>{parse(`${currentProducts.description}`)}</p>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_02">
                  <p className="mb-20">1 review for <strong>Shoes Air Jordan</strong></p>
                  <div className="ps-review">
                    <div className="ps-review__thumbnail"><img src="images/user/1.jpg" alt=""/></div>
                    <div className="ps-review__content">
                      <header>
                        <select className="ps-rating">
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                          <option value="5">5</option>
                        </select>
                        <p>By<a href=""> Alena Studio</a> - November 25, 2017</p>
                      </header>
                      <p>Soufflé danish gummi bears tart. Pie wafer icing. Gummies jelly beans powder. Chocolate bar pudding macaroon candy canes chocolate apple pie chocolate cake. Sweet caramels sesame snaps halvah bear claw wafer. Sweet roll soufflé muffin topping muffin brownie. Tart bear claw cake tiramisu chocolate bar gummies dragée lemon drops brownie.</p>
                    </div>
                  </div>
                  <form className="ps-product__review" action="_action" method="post">
                    <h4>ADD YOUR REVIEW</h4>
                    <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                            <div className="form-group">
                              <label>Name:<span>*</span></label>
                              <input className="form-control" type="text" placeholder=""/>
                            </div>
                            <div className="form-group">
                              <label>Email:<span>*</span></label>
                              <input className="form-control" type="email" placeholder=""/>
                            </div>
                            <div className="form-group">
                              <label>Your rating<span></span></label>
                              <select className="ps-rating">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12 ">
                            <div className="form-group">
                              <label>Your Review:</label>
                              <textarea className="form-control" rows="6"></textarea>
                            </div>
                            <div className="form-group">
                              <button className="ps-btn ps-btn--sm">Submit<i className="ps-icon-next"></i></button>
                            </div>
                          </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_03">
                  <p>Add your tag <span> *</span></p>
                  <form className="ps-product__tags" action="_action" method="post">
                    <div className="form-group">
                      <input className="form-control" type="text" placeholder=""/>
                      <button className="ps-btn ps-btn--sm">Add Tags</button>
                    </div>
                  </form>
                </div>
                <div className="tab-pane" role="tabpanel" id="tab_04">
                  <div className="form-group">
                    <textarea className="form-control" rows="6" placeholder="Enter your addition here..."></textarea>
                  </div>
                  <div className="form-group">
                    <button className="ps-btn" type="button">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ps-section ps-section--top-sales ps-owl-root pt-40 pb-80">
        <div className="ps-container">
          <div className="ps-section__header mb-50">
            <div className="row">
                  <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 ">
                    <h3 className="ps-section__title" data-mask="Related item">- YOU MIGHT ALSO LIKE</h3>
                  </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
                    {/* <div className="ps-owl-actions"><a className="ps-prev" href="#"><i className="ps-icon-arrow-right"></i>Prev</a><a className="ps-next" href="#">Next<i className="ps-icon-arrow-left"></i></a></div> */}
                  </div>
                  

            </div>
          </div>
          <div className="ps-section__content">
            
            <OwlCarousel items={4} margin={30} autoplay={true} loop={true} dots={false} nav={true}>
            {products.map((item) => {
              if(item.productGender===currentProducts.productGender && item.productproductId!==currentProducts.productId)
                  return(
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail" onClick={() => handleDes(item.productId)}>
                    <a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src={item.image?.[0]?.[0]} alt=""/><a className="ps-shoe__overlay" ></a>
                  </div>
                  <div className="ps-shoe__content">
                    <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img style={{width:'64px',float:'left'}} src={item.image?.[0]?.[0]} alt=""/><img style={{width:'64px',float:'left'}} src={item.image?.[0]?.[1]} alt=""/><img style={{width:'64px',float:'left'}} src={item.image?.[2]} alt=""/><img style={{width:'64px'}} src={item.image?.[3]} alt=""/></div>
                      {/* <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select> */}
                    </div>
                    <div className="ps-shoe__detail" style={{textAlign:'left'}}>
                        <div style={{inlineSize: "150px",  overflowWrap: "break-word"}}><a className="ps-shoe__name" href="#" >{item.productName}</a></div>
                        <p className="ps-shoe__categories"><a href="#">
                          {item.productGender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">
                          <del>₹{item.original_price}</del> ₹{item.selling_price}</span>
                      </div>
                  </div>
                </div>
              </div>
              )})}
              
              <div className="ps-shoes--carousel">
                <div className="ps-shoe">
                  <div className="ps-shoe__thumbnail">
                    
                    <a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart"></i></a><img src=
                    {currentProducts.image?.[0]?.[0]} alt=""/><a className="ps-shoe__overlay" href="product-detail.html"></a>
                  </div>
                  <div className="ps-shoe__content">
                  <div className="ps-shoe__variants">
                      <div className="ps-shoe__variant normal"><img style={{width:'64px',float:'left'}} src={currentProducts.image?.[0]?.[0]} alt=""/><img style={{width:'64px',float:'left'}} src={currentProducts.image?.[0]?.[1]} alt=""/><img style={{width:'64px',float:'left'}} src={currentProducts.image?.[0]?.[2]} alt=""/><img style={{width:'64px'}} src={currentProducts.image?.[0]?.[3]} alt=""/></div>
                      {/* <select className="ps-rating ps-shoe__rating">
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                        <option value="2">5</option>
                      </select> */}
                    </div>
                    <div className="ps-shoe__detail" style={{textAlign:'left'}}>
                      <div style={{inlineSize: "150px",  overflowWrap: "break-word"}}><a className="ps-shoe__name" href="#" >{currentProducts.productName}</a></div>
                      <p className="ps-shoe__categories"><a href="#">
                        {currentProducts.gender} shoes</a>,<a href="#"> Nike</a>,<a href="#"> Jordan</a></p><span className="ps-shoe__price">
                        <del>₹{currentProducts.original_price}</del> ₹{currentProducts.selling_price}</span>
                    </div>
                  </div>
                </div>
              </div>
              </OwlCarousel>
            
          </div>
        </div>
      </div>

    <Footer />
    </main>
  </body>
        
      );
}
}


export default ProductDetails