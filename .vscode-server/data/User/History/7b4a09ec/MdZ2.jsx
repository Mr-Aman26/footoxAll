import { useSelector, useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getData } from "../redux/DataReducer/action";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";





const ProductListing=()=>{
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const products = useSelector((store) => store.dataReducer.products);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const handleDes = (id) => {
    console.log('click');
    console.log(id);
    navigate(`/description/${id}`);
  };

  useEffect(() => {
    if (location.search || products?.length === 0) {
      const sortBy = searchParams.get("sortBy");

      const queryParams = {
        params: {
          category: searchParams.getAll("category"),
          gender: searchParams.getAll("productGender"),
          // colortype: searchParams.getAll("colortype"),
          sizes: searchParams.getAll("Sizes"),
          _sort: sortBy && "rating",
          _order: sortBy,
        },
      };
      dispatch(getData(queryParams));
    }
  }, [dispatch, location.search, products?.length, searchParams]);
  console.log(products);

    return(
        <>
        <Header></Header>
        <div>
        <main className="ps-main">
          <div className="ps-products-wrap pt-80 pb-80">
            <div className="ps-products" data-mh="product-listing">
              <div className="ps-product-action">
                <div className="ps-product__filter">
                  <select className="ps-select selectpicker">
                    <option value={1}>Shortby</option>
                    <option value={2}>Name</option>
                    <option value={3}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                  </select>
                </div>
                <div className="ps-pagination">
                  <ul className="pagination">
                    <li><a href="#"><i className="fa fa-angle-left" /></a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#"><i className="fa fa-angle-right" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="ps-product__columns">
              {products.map((item) => (
                <div className="ps-product__column" key={item._id}>
                  <div className="ps-shoe mb-30">
                    <div className="ps-shoe__thumbnail">
                      {/* <div className="ps-badge"><span>New</span></div> */}
                      {/* <div className="ps-badge ps-badge--sale ps-badge--2nd"><span>-35%</span></div> */}
                      <a className="ps-shoe__favorite" href="#"><i className="ps-icon-heart" /></a><img src={item.image?.[0][0]} alt="" /><a className="ps-shoe__overlay" onClick={() => handleDes(item.productId)} />
                    </div>
                    <div className="ps-shoe__content">
                      <div className="ps-shoe__variants">
                        <div className="ps-shoe__variant normal"><img width="85" src={item.image?.[0][1]} alt="" /><img width="55" src={item.image?.[0][2]}alt="" /><img width="55" src={item.image?.[0][3]} alt="" /><img width="55" src={item.image?.[0][4]} alt="" /></div>
                        {/* <select className="ps-rating ps-shoe__rating">
                          <option value={1}>1</option>
                          <option value={1}>2</option>
                          <option value={1}>3</option>
                          <option value={1}>4</option>
                          <option value={2}>5</option>
                        </select> */}
                      </div>
                      <div className="ps-shoe__detail"><a className="ps-shoe__name" href="#">{item.name}</a>
                        <p className="ps-shoe__categories" style={{width: '120px'}}><a href="#">{item.productName}</a></p><span className="ps-shoe__price">
                          <del>₹{item.original_price}</del> ₹{item.selling_price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
              {/* <div className="ps-product-action"> */}
                {/* <div className="ps-product__filter">
                  <select className="ps-select selectpicker">
                    <option value={1}>Shortby</option>
                    <option value={2}>Name</option>
                    <option value={3}>Price (Low to High)</option>
                    <option value={3}>Price (High to Low)</option>
                  </select>
                </div> */}
                {/* <div className="ps-pagination">
                  <ul className="pagination">
                    <li><a href="#"><i className="fa fa-angle-left" /></a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">...</a></li>
                    <li><a href="#"><i className="fa fa-angle-right" /></a></li>
                  </ul>
                </div> */}
              {/* </div> */}
            </div>
            <div className="ps-sidebar" data-mh="product-listing">
              <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Category</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Slides</a></li>
                    <li><a href="product-listing.html">Sneakers</a></li>
                    <li><a href="product-listing.html">Sports</a></li>
                    <li><a href="product-listing.html">Flip-Flop</a></li>
                    {/* <li><a href="product-listing.html">Soccer(108)</a></li>
                    <li><a href="product-listing.html">Trainning &amp; game(47)</a></li>
                    <li><a href="product-listing.html">More</a></li> */}
                  </ul>
                </div>
              </aside>
              {/* <aside className="ps-widget--sidebar ps-widget--filter">
                <div className="ps-widget__header">
                  <h3>Price</h3>
                </div>
                <div className="ps-widget__content">
                  <div className="ac-slider" data-default-min={300} data-default-max={2000} data-max={3450} data-step={50} data-unit="$" />
                  <p className="ac-slider__meta">Price:<span className="ac-slider__value ac-slider__min" />-<span className="ac-slider__value ac-slider__max" /></p><a className="ac-slider__filter ps-btn" href="#">Filter</a>
                </div>
              </aside> */}
              {/* <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Shoe Brand</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Nike(521)</a></li>
                    <li><a href="product-listing.html">Adidas(76)</a></li>
                    <li><a href="product-listing.html">Baseball(69)</a></li>
                    <li><a href="product-listing.html">Gucci(36)</a></li>
                    <li><a href="product-listing.html">Dior(108)</a></li>
                    <li><a href="product-listing.html">B&amp;G(108)</a></li>
                    <li><a href="product-listing.html">Louis Vuiton(47)</a></li>
                  </ul>
                </div>
              </aside> */}
              {/* <aside className="ps-widget--sidebar ps-widget--category">
                <div className="ps-widget__header">
                  <h3>Width</h3>
                </div>
                <div className="ps-widget__content">
                  <ul className="ps-list--checked">
                    <li className="current"><a href="product-listing.html">Narrow</a></li>
                    <li><a href="product-listing.html">Regular</a></li>
                    <li><a href="product-listing.html">Wide</a></li>
                    <li><a href="product-listing.html">Extra Wide</a></li>
                  </ul>
                </div>
              </aside> */}
              <div className="ps-sticky desktop">
                <aside className="ps-widget--sidebar">
                  <div className="ps-widget__header">
                    <h3>Size</h3>
                  </div>
                  <div className="ps-widget__content">
                    <table className="table ps-table--size">
                      <tbody>
                        <tr>
                          {/* <td className="active"></td> */}
                          <td>2</td>
                          <td>3</td>
                          <td>4</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>7</td>
                          <td>8</td>
                          <td>9</td>
                         
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>11</td>
                          <td>12</td>
                          <td>11.5</td>
                          <td>14</td>
                        </tr>
                        <tr>
                          <td>4.5</td>
                          <td>7</td>
                          <td>9.5</td>
                          <td>12</td>
                          <td>14.5</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>7.5</td>
                          <td>10</td>
                          <td>12.5</td>
                          <td>15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </aside>
                <aside className="ps-widget--sidebar">
                  <div className="ps-widget__header">
                    <h3>Color</h3>
                  </div>
                  <div className="ps-widget__content">
                    <ul className="ps-list--color">
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                      <li><a href="#" /></li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          {/* <div className="ps-subscribe">
            <div className="ps-container">
              <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                  <h3><i className="fa fa-envelope" />Sign up to Newsletter</h3>
                </div>
                <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12 ">
                  <form className="ps-subscribe__form" action="do_action" method="post">
                    <input className="form-control" type="text" />
                    <button>Sign up now</button>
                  </form>
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12 ">
                  <p>...and receive  <span>$20</span>  coupon for first shopping.</p>
                </div>
              </div>
            </div>
          </div> */}
          
        </main>
      </div>

          <Footer></Footer>
        </>
    )
}



export default ProductListing;