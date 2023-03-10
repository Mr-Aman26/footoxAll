import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData, getBannerData } from "../redux/DataReducer/action";
import { useEffect, useState,lazy } from "react";
import { useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import axios from "axios";
import parse from 'html-react-parser';
import { useRef } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import Banner from '../components/Banner';
import Contact from './contact';

const Header=lazy(() =>  import('../components/Header'));
const Footer=lazy(() =>  import('../components/Footer'));
// const Banner=lazy(() =>  import('./Banner'));

const BackendServer = process.env.REACT_APP_BACKEND_SERVER;

const Homepage = () => {
  const navigate = useNavigate();
  // console.log('state')

  const dispatch = useDispatch();
  const products1 = useSelector((store) => store.dataReducer.products);

  const products = useSelector((store) => store.dataReducer.products);
  const aboutSection = useRef(null);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/${id}`);
    window.location.reload();
    window.scrollTo(0,0); 
  };
   const scrollDown = () => {
    window.scrollTo({
      top: aboutSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  const sortBy = searchParams.get("sortBy");

  const queryParams = {
    params: {
      category: searchParams.getAll("category"),
      gender: searchParams.getAll("gender"),
      colortype: searchParams.getAll("colortype"),
      sizes: searchParams.getAll("sizes"),
      _sort: sortBy && "rating",
      _order: sortBy,
    },
  };
  const [prod, setProd] = useState();
  const [links, setLink] = useState();
  // const parentToChild = () => {
  //   setProd(prod);
  // }

  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}banner`)
      setProd(response.data)
    }
    const l = axiosTest()
  }, [products,location])


  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`${BackendServer}link`)
      setLink(response.data)
    }
    const l = axiosTest()
  }, [products])

  const link1=links?.users[0]?.link1;
  const link2=links?.users[0]?.link2;
  const link3=links?.users[0]?.link3;
  // console.log('sanchit',links?.users[0])
  // console.log('fghjk',link1)
  useEffect(() => {
    dispatch(getData(queryParams));
  }, [])
  // console.log('helloo', products, products1)
  products.sort(function(a,b){
    return new Date(b.modifiedDate) - new Date(a.modifiedDate);
  });
  // console.log(products,'sort');

  return (
    <React.Fragment>
      <body className="ps-loading">
        <Header scrollDown = {scrollDown}/>
        <main className="ps-main">
          <Banner/>
          <div className='container' style={{position:'relative',left:'-165px'}}>
          <div className="ps-section--features-product ps-section masonry-root pt-40 pb-80"  style={{paddingTop:'20%'}}>
            <div className="ps-container" >
              <div className="ps-section__header mb-50">
                <h3 className="ps-section__title" data-mask="features">- New Product</h3>
                <ul className="ps-masonry__filter" style={{paddingTop:'05%'}}>
                  <li className="current"><a  id='allp123'  href="#" data-filter="*">All <sup>{products.length}</sup></a></li>
                  <li><a style={{cursor: 'pointer'}} data-filter=".men">Men <sup>{(products.filter(x => x.productGender === 'Men')).length}</sup></a></li>
                  <li><a href='#' data-filter=".women">Women <sup>{(products.filter(x => x.productGender === 'Women')).length}</sup></a></li>
                  {/* <li><a href='#' data-filter=".shoes">Shoes <sup>4</sup></a></li> */}
                </ul>
              </div>
              <div className="ps-section__content pb-50">
                <div className="masonry-wrapper" data-col-md="4" data-col-sm="2" data-col-xs="1" data-gap="30" data-radio="100%">
                  <div className="ps-masonry">
                    {products.map((item) => {
                      if(item.productGender==="Men")
                      return(
                        <div className="grid-item men" key = {item.productId} style={{float: 'left' }}>
                        <div className="grid-item__content-wrapper" key = {item.productId} style={{minHeight: "300px", maxHeight: '400px',position: 'relative'}}>
                          <div className="ps-shoe mb-50" key = {item.productId}>
                            <div className="ps-shoe__thumbnail" key = {item.productId}>
                              {/* <div className="ps-badge"><span>New</span></div> */}
                              {/* <div className="ps-badge ps-badge--sale ps-badge--2nd">
                                <span>-35%</span>
                                </div> */}
                              <a className="ps-shoe__favorite" href="#" key = {item.productId}><i className="ps-icon-heart" key = {item.productId}></i></a><img style ={{height : '420px'}}key = {item.productId} src={item.image?.[0][0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.productId)}></a>
                            </div>
                            <div className="ps-shoe__content" key = {item.productId}>
                              <div className="ps-shoe__variants" key = {item.productId}>
                                <div className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded" key = {item.productId}>
                                  <div className='owl-stage-outer' key = {item.productId}>
                                    <OwlCarousel items={4} autoplay={true} dots={false} nav={false} key = {item.productId}>
                                      <img key = {item.productId} src={item.image?.[0][0]} alt="" style ={{height : '70px'}}/><img style ={{height : '70px'}} key = {item.productId} src={item.image?.[0][1]} alt="" /><img style ={{height : '70px'}} key = {item.productId} src={item.image?.[0][2]} alt="" /><img style ={{height : '70px'}} key = {item.productId} src={item.image?.[0][3]} alt="" />
                                    </OwlCarousel></div></div>
                                {/* <select className="ps-rating ps-shoe__rating">
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                      <option value="1">4</option>
                                      <option value="2">5</option>
                                    </select> */}


                              </div>
                              <div className="ps-shoe__detail" key = {item.productId} style={{textAlign:'left'}}>
                                <div key = {item.productId} style={{inlineSize: "150px",  overflowWrap: "break-word"}}><a className="ps-shoe__name" onClick={() => handleDes(item.productId)}>{item.productName}</a></div>
                                {/* <p key = {item.productId} className="ps-shoe__categories"><a key = {item.productId} href="#">
                                  {item.gender} shoes</a>,<a key = {item.productId} href="#"> Nike</a>,<a key = {item.productId} href="#"> Jordan</a></p> */}
                                  <span  key= {item.productId} className="ps-shoe__price">
                                  <del key = {item.productId}>₹{item.original_price}</del> ₹{item.selling_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}

                    
                    {products.map((item) => {
                      if(item.productGender==="Women")
                      return(
                        <div className="grid-item women" key = {item.productId} style={{float: 'left' }}>
                        <div className="grid-item__content-wrapper" key = {item.productId} style={{minHeight: "300px",position: 'relative'}}>
                          <div className="ps-shoe mb-30" key = {item.productId}>
                            <div className="ps-shoe__thumbnail" key = {item.productId}>
                              {/* <div className="ps-badge"><span>New</span></div> */}
                              {/* <div className="ps-badge ps-badge--sale ps-badge--2nd">
                                <span>-35%</span>
                                </div> */}
                              <a className="ps-shoe__favorite" key = {item.productId} href="#"><i key = {item.productId} className="ps-icon-heart"></i></a><img key = {item.productId} src={item.image?.[0][0]} alt="" /><a key = {item.productId} className="ps-shoe__overlay" onClick={() => handleDes(item.productId)}></a>
                            </div>
                            <div key = {item.productId} className="ps-shoe__content">
                              <div key = {item.productId} className="ps-shoe__variants">
                                <div key = {item.productId} className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                  <div key = {item.productId} className='owl-stage-outer'>
                                    <OwlCarousel key= {item.productId} items={4} autoplay={true} dots={false} nav={false}>
                                      <img key = {item.productId} src={item.image?.[0][0]} alt="" /><img key = {item.productId} src={item.image?.[0][1]} alt="" /><img key = {item.productId} src={item.image?.[0][2]} alt="" /><img key = {item.productId} src={item.image?.[0][3]} alt="" />
                                    </OwlCarousel></div></div>
                                {/* <select className="ps-rating ps-shoe__rating">
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                      <option value="1">4</option>
                                      <option value="2">5</option>
                                    </select> */}


                              </div>
                              <div key = {item.productId} className="ps-shoe__detail" style={{textAlign:'left'}}>
                                <div key= {item.productId} style={{inlineSize: "150px",  overflowWrap: "break-word"}}><a key= {item.productId} className="ps-shoe__name" onClick={() => handleDes(item.productId)}>{item.productName}</a></div>
                                {/* <p key= {item.productId} className="ps-shoe__categories"><a key= {item.productId} href="#">
                                  {item.gender} shoes</a>,<a = {item.productId} href="#"> Nike</a>,<a = {item.productId} href="#"> Jordan</a></p> */}
                                  <span key = {item.productId} className="ps-shoe__price">
                                  <del key = {item.productId}>₹{item.original_price}</del> ₹{item.selling_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}  

                    {products.map((item) => {
                      if(item.category==="shoes")
                      return(
                      <div className="grid-item shoes"key = {item.productId}>
                        <div className="grid-item__content-wrapper"key = {item.productId}>
                          <div className="ps-shoe mb-30" key = {item.productId}>
                            <div className="ps-shoe__thumbnail" key = {item.productId}><a key = {item.productId} className="ps-shoe__favorite" href="#"><i key= {item.productId} className="ps-icon-heart"></i></a><img key = {item.productId} src={item.image?.[0]} alt="" /><a key= {item.productId} className="ps-shoe__overlay"  onClick={() => handleDes(item.id)}></a>
                            </div>
                            <div key = {item.productId} className="ps-shoe__content">
                              <div key = {item.productId} className="ps-shoe__variants">
                              <div key= {item.productId} className="ps-shoe__variant normal owl-carousel owl-theme owl-loaded">
                                <div key = {item.productId} className='owl-stage-outer'>
                                  <OwlCarousel key={item.productId} items={4} autoplay={true} dots={false} nav={false}>
                                    <img key = {item.productId} src={item.image?.[0][0]} alt="" /><img key = {item.productId} src={item.image?.[0][1]} alt="" /><img key = {item.productId} src={item.image?.[0][2]} alt="" /><img key = {item.productId} src={item.image?.[0][3]} alt="" />
                                  </OwlCarousel></div></div>
                              </div>
                              <div key = {item.productId} className="ps-shoe__detail" style={{textAlign:'left'}}>
                                <div key= {item.productId} style={{inlineSize: "150px",  overflowWrap: "break-word"}}><a key = {item.productId} className="ps-shoe__name" href="#" >{item.name}</a></div>
                                {/* <p = {item.productId} className="ps-shoe__categories"><a = {item.productId} href="#">
                                  {item.gender} shoes</a>,<a = {item.productId} href="#"> Nike</a>,<a = {item.productId} href="#"> Jordan</a></p> */}
                                  <span key= {item.productId} className="ps-shoe__price">
                                  <del key = {item.productId}>₹{item.original_price}</del> ₹{item.final_price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )})}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* <div style={{padding:'130px'}}></div>
          <div style={{padding:`${((Math.ceil(products.length/4))-1)*260}px`}}></div> */}
          <div className="ps-home-testimonial bg--parallax pb-80" data-background={prod?.[1].images?.[0]} style={{display:'block',minHeight:'100px',maxHeight:'550px', background: `url(${prod?.[1].images?.[0]})` }}>

            <div className="container">


              <OwlCarousel items={1} autoplay={true} dots={false} nav={false}>

                <div className="ps-testimonial item kuhoo">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/1.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
                <div className="ps-testimonial item">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/2.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
                <div className="ps-testimonial item">
                  <div className="ps-testimonial__thumbnail"><img src="images/testimonial/3.jpg" alt="" /><i className="fa fa-quote-left"></i></div>
                  <header>
                    <select className="ps-rating">
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="5">5</option>
                    </select>
                    <p>Logan May - CEO & Founder Invision</p>
                  </header>
                  <footer>
                    <p>“Dessert pudding dessert jelly beans cupcake sweet caramels gingerbread. Fruitcake biscuit cheesecake. Cookie topping sweet muffin pudding tart bear claw sugar plum croissant. “</p>
                  </footer>
                </div>
              </OwlCarousel>

            </div>
          </div>
          <div className="ps-features pt-80 pb-80">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-delivery"></i>
                      <h3>Free shipping</h3>
                      <p>ON ORDER OVER $199</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>Want to track a package? Find tracking information and order details from Your Orders.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-money"></i>
                      <h3>100% MONEY BACK.</h3>
                      <p>WITHIN 30 DAYS AFTER DELIVERY.</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>You may return most new, unopened items sold within 30 days of delivery for a full refund.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                  <div className="ps-iconbox">
                    <div className="ps-iconbox__header"><i className="ps-icon-customer-service"></i>
                      <h3>SUPPORT 24/7.</h3>
                      <p>WE CAN HELP YOU ONLINE.</p>
                    </div>
                    <div className="ps-iconbox__content">
                      <p>We offer a 24/7 customer hotline so you’re never alone if you have a question.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-section ps-home-blog pt-80 pb-80">
            <div className="ps-container">
              <div className="ps-section__header mb-50">
                <h2 className="ps-section__title" data-mask="News">- Connect With Us</h2>
                <div className="ps-section__action"><a className="ps-morelink text-uppercase" href="#">View all post<i className="fa fa-long-arrow-right"></i></a></div>
              </div>
              <div className="ps-section__content">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                    {/* <Instagram url="https://www.instagram.com/p/Cbw6aAUv1GW/?next=%2F" />	 */}

                      {/* <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/Cbw6aAUv1GW/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/Cbw6aAUv1GW/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Footox footwear (@footoxfootwear)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script> */}
                      {/* <img src="https://instagram.fdla2-1.fna.fbcdn.net/v/t51.2885-15/e35/c73.0.554.554a/s150x150/105044346_127329445667781_2507554452160017737_n.jpg?_nc_ht=instagram.fdla2-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Z6GCQyBWc5AAX8UqqUO&oh=10de7d78b17ad97d292104e42b2bbce7&oe=5F175C4E" alt="instagram"/> */}
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a>
                      <InstagramEmbed url={link1||'https://www.instagram.com/p/CdnAqLmPLH6/'} />
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a><InstagramEmbed url={link2||"https://www.instagram.com/p/CZwUxp2Pn-x/"} /></div>
                      
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
                    <div className="ps-post">
                      <div className="ps-post__thumbnail"><a className="ps-post__overlay" href="blog-detail.html"></a><InstagramEmbed url={link3||"https://www.instagram.com/p/Cbw6aAUv1GW/"} /></div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-home-partner">
            <div className="ps-container">
              <div className="owl-slider" data-owl-auto="true" data-owl-loop="true" data-owl-speed="5000" data-owl-gap="40" data-owl-nav="false" data-owl-dots="false" data-owl-item="6" data-owl-item-xs="2" data-owl-item-sm="4" data-owl-item-md="5" data-owl-item-lg="6" data-owl-duration="1000" data-owl-mousedrag="on">

                <OwlCarousel items={6} autoplay={true} dots={false} margin={40} nav={false}>

                  <a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/1.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/2.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/3.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/4.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/5.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/6.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/7.png" alt="" /></a><a href="#"><img src="http://nouthemes.net/html/trueshoes/images/partner/8.png" alt="" /></a>
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="ps-home-contact" ref={aboutSection}>
            <div id="contact-map" data-address="New York, NY" data-title="BAKERY LOCATION!" data-zoom="17"></div>
            <div className="ps-home-contact__form">
              <header>
                <h3>Contact Us</h3>
                <p>Learn about our company profile, communityimpact, sustainable motivation, and more.</p>
              </header>
              <footer>
                <form action="product-listing.html" method="post">
                  <div className="form-group">
                    <label>Name<span>*</span></label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group">
                    <label>Email<span>*</span></label>
                    <input className="form-control" type="email" />
                  </div>
                  <div className="form-group">
                    <label>Your message<span>*</span></label>
                    <textarea className="form-control" rows="4"></textarea>
                  </div>
                  <div className="form-group text-center">
                    <button className="ps-btn">Send Message<i className="fa fa-angle-right"></i></button>
                  </div>
                </form>
              </footer>
            </div>
          </div>
          {/* <Contact/> */}
          
   
          <Footer />
        </main>
      </body>
      
    </React.Fragment>
  );
}



export default Homepage;