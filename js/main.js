import { data } from "./product.js";

const inputSearch = document.querySelector(".filter_form_input"); // tìm kiếm
const productEl = document.querySelector(".product_list"); // sản phẩm
const categories = document.querySelectorAll(".nav2_title"); //phân loại
const pagination = document.querySelector(".pagination-list"); //phân trang
let initPayload = {
  page: 1,
  search: "",
  limit: 9,
  filter: "all",
};
const renderProducts = (payload) => {
  const { page, search, limit, filter } = payload;
  
  const filteredProduct = data.filter((product) => {
    if (
      filter === "all" &&
      product.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    } else if (filter === product.type  && product.title.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
    return false;
  });
  //

  //filter xon,tiếp tục filter phân trag
  const skip = (page - 1) * limit;
  let productListEl = filteredProduct.reduce((acc, product, index) => {
    if (index >= skip && index < skip + limit) {
      const cardProductEl = `
        <div class="product_list_item">
           <div class="top">
            <div class="top_img">
                <img src="${product.imgProduct}" alt="" class="ava_top">
              </div>
                <div class="user">
                    <img src="./Assets/Img/product.png" alt="" class="user_avt">
                    <div class="user_name">
                        <p>${product.username}</p>
                    </div>
                </div>
                <div class="title">${product.title}</div>
                <div class="content">${product.content}</div>
           </div>
            <div class="bottom">
                <div class="quantity">
                    <img src="./Assets/Img/avt_product.png" alt="" class="quantity_avt">
                    <div class="quantity_sl">${product.likedCount}</div>
                </div>
                <div class="price">
                    <p>${product.price}</p>
                </div>
            </div>
            ${
              product.isCertificated
                ? `<div class="product_list_item_certifier">
            <p>Sản phẩm bán chạy</p>
        </div>`
                : ""
            }
            ${
              product.saved
                ? `<div class="product_list_item_favourite">  
              <button class="product_list_item_favourite_btn"> 
                  <i class="fa-regular fa-bookmark"></i>
              </button>                 
      </div>`
                : ``
            }
            
        </div>                   
   `;
      return acc.concat(cardProductEl);
    }

    return acc;
  }, "");
  if (!filteredProduct.length) alert("Không có kết quả tìm kiếm phù hợp");
  const totalPage = Math.ceil(filteredProduct.length / limit);
  return { productListEl, totalPage };
};
const renderPaginations = (totalPage, currentPage = 1) => {
  let paginationEl = "";
  for (let i = 1; i <= totalPage; i++) {
    const paginationItemEl = `<li data-index=${i} class="pagination-items ${
      currentPage === i ? "active" : ""
    }">${i}</li>`;
    paginationEl += paginationItemEl;
  }
  return paginationEl;
};

const handleClickPagination = () => {
  const paginationListEls = document.querySelectorAll(".pagination-items");
  if (paginationListEls) {
    paginationListEls.forEach((item) => {
      item.addEventListener("click", function (e) {
        const page = e.target.dataset.index;
        initPayload = {
          ...initPayload,
          page: Number(page),
        };
        render();
      });
    });
  }
};
const render = () => {
  const { productListEl, totalPage } = renderProducts(initPayload);
  const paginationEl = renderPaginations(totalPage, initPayload.page);
  productEl.innerHTML = productListEl;
  pagination.innerHTML = paginationEl;
  handleClickPagination();
};

if (productEl) {
  render();
}

if (inputSearch) {

  inputSearch.addEventListener("change", function (e) {
  
    const inputValue = e.target.value;
    const btnSearch = document.querySelector(".filter_form_search");
    btnSearch.addEventListener("click", function () {
      initPayload = { ...initPayload, search: inputValue, page: 1 };
      render();
    });
  });

  inputSearch.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      const inputValue = e.target.value;
      initPayload = { ...initPayload, search: inputValue, page: 1 };
      render();
    }
  });
}

if (categories) {
  categories.forEach((category) => {
    category.addEventListener("click", function (e) {
      document.querySelector(".nav2_title.active").classList.remove("active");
      this.classList.add("active");
    
      const categoryType = e.target.dataset.type;
      initPayload = {
        ...initPayload,
        filter: categoryType,
        page: 1,
      };
      render();
    });
  });
}
// const { productListEl, totalPage } = renderProducts(initPayload);
// productEl.innerHTML = productListEl;
// document.getElementById("filter_search") .addEventListener("submit", function (event) {
//     event.preventDefault();
//   });
