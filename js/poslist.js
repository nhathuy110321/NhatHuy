const data = [
  {
    id: "01",
    image: "./Assets/Img/giay1.jpg",
    title: "Giày 1",
    description:
      "Giày thể thao Adidas Superstar, kiểu dáng retro, chất liệu da bền đẹp, đế giày chống trượt, thích hợp cho đi bộ và các hoạt động thể thao nhẹ nhàng.",
    createdAt: "2024-04-14T05:37:38.873Z",
  },
  {
    id: "02",
    image: "./Assets/Img/giay2.jpg",
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sint nostrum cumque nemo! Neque itaque ut dignissimos non, esse reiciendis quis. Ut fugit repellendus explicabo consectetur corporis excepturi tempora culpa.",
    createdAt: "2024-04-14T05:38:26.736Z",
  },
  {
    id: "03",
    image: "./Assets/Img/giay3.jpg",
    title: "Title",
    description:
      "Giày thể thao Adidas Superstar, kiểu dáng retro, chất liệu da bền đẹp, đế giày chống trượt, thích hợp cho đi bộ và các hoạt động thể thao nhẹ nhàng.",

    createdAt: "2024-04-14T05:39:13.656Z",
  },
  {
    id: "04",
    image: "./Assets/Img/giay4.jpg",
    title: "Title",
    description:
      "Giày thể thao Adidas Superstar, kiểu dáng retro, chất liệu da bền đẹp, đế giày chống trượt, thích hợp cho đi bộ và các hoạt động thể thao nhẹ nhàng.",

    createdAt: "2024-04-14T05:39:13.656Z",
  },
];
let pos = 0;
const editModal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");
const addModal = document.getElementById("addModal");

var productListItem = document.getElementById("product_list_item");
function renderProducts() {
  let result = "";
  data.forEach(function (post) {
    result += `   <div class="product_list_item">
    <div class="product_list_item_top">
            <div class="product_list_top_icon">
                <button id="btn_edit${
                  post.id
                }" class="btn_edit btn btn-primary" data-bs-toggle="modal"  data-bs-target="#editModal" data-id="${
      post.id
    }">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button id="btn_delete${
                  post.id
                }" class="btn_delete" data-bs-toggle="modal"  data-bs-target="#deleteModal" data-id="${
      post.id
    }">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="product_list_item_img">
                <img src="${post.image}" alt="">
            </div>
            <div class="product_list_item_name">
                <h2>${post.title}</h2>
                <p>${post.description}</p>
            </div>
        </div>
        <div class="product_list_item_bootom">
            <span>Created at: ${new Date(
              post.createdAt
            ).toLocaleString()}</span>
        </div>
    </div>
    `;
  });
  productListItem.innerHTML = result;
}
const handleClickButtonSave = () => {
  // Lấy thông tin mới từ các trường nhập trong modal
  const newImage = document.getElementById("editImage").value;
  const newTitle = document.getElementById("editTitle").value;
  const newDescription = document.getElementById("editDescription").value;
  // Cập nhật thông tin sản phẩm trong mảng data
  const newProduct = {
    image: newImage,
    title: newTitle,
    description: newDescription,
  };

  data[pos] = {
    ...data[pos],
    ...newProduct,
  };

  render();

  // Ẩn modal sau khi lưu thông tin
  editModal.setAttribute("hidden", "true");
};

const handleClickButtonDelete = () => {
  data.splice(pos, 1);
  render();
  // Ẩn modal sau khi xóa thông tin
  deleteModal.setAttribute("hidden", "true");
};
const handleClickButtonAdd = () => {
  // Lấy thông tin mới từ các trường nhập trong modal
  const newImage = document.getElementById("addImage").value;
  const newTitle = document.getElementById("addTitle").value;
  const newDescription = document.getElementById("addDescription").value;
  // Cập nhật thông tin sản phẩm trong mảng data
  const newId = (data.length + 1).toString().padStart(2, "0");

  const newProduct = {
    id: newId,
    image: newImage,
    title: newTitle,
    description: newDescription,
    createdAt: new Date().toISOString(),
  };
  data.push(newProduct);
  console.log(data);
  render();

  // Ẩn modal sau khi lưu thông tin
  editModal.setAttribute("hidden", "true");
};

function handleClickButtonEdit() {
  document.querySelectorAll(".btn_edit").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      // Lấy giá trị của data attribute "data-banner-id"
      const bannerId = this.getAttribute("data-id");
      const index = data.findIndex((item) => item.id === bannerId);
      pos = index;
      // Dựa vào bannerId, bạn có thể xác định banner tương ứng và thực hiện các hành động cần thiết
      const banner = document.getElementById("btn_edit" + bannerId);

      if (banner) {
        const product = data.find((item) => item.id === bannerId);
        // console.log(data);
        if (product) {
          editModal.removeAttribute("hidden");
          // Điền thông tin sản phẩm vào các trường của modal
          document.getElementById("editImage").value = product.image;
          document.getElementById("editTitle").value = product.title;
          document.getElementById("editDescription").value =
            product.description;

          // Lắng nghe sự kiện click vào nút "Close" của modal để ẩn modal đi
          const closeButtons = document.querySelectorAll("#closebtn");
          const saveButtons = document.querySelectorAll("#saveChanges");

          closeButtons.forEach((closeButton) =>
            closeButton.addEventListener("click", function () {
              editModal.setAttribute("hidden", "true");
              saveButtons.forEach((saveButton) =>
                saveButton.removeEventListener("click", handleClickButtonSave)
              );
            })
          );

          saveButtons.forEach((saveButton) =>
            saveButton.addEventListener("click", handleClickButtonSave)
          );
        }

        // return;
      }
    });
  });
}
function handleClickButtonDeleteModal() {
  document.querySelectorAll(".btn_delete").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      const bannerId = this.getAttribute("data-id");
      const index = data.findIndex((item) => item.id === bannerId);
      pos = index;
      // Dựa vào bannerId, bạn có thể xác định banner tương ứng và thực hiện các hành động cần thiết
      const banner = document.getElementById("btn_edit" + bannerId);
      console.log(data);
      if (banner) {
        const product = data.find((item) => item.id === bannerId);
        if (product) {
          deleteModal.removeAttribute("hidden");

          //lắng nghe sự kiện close
          const closeButtons = document.querySelectorAll("#closebtn");
          closeButtons.forEach((closeButton) =>
            closeButton.addEventListener("click", function () {
              deleteModal.setAttribute("hidden", "true");
              deleteButton.removeEventListener(
                "click",
                handleClickButtonDelete
              );
            })
          );
        }
        const deleteButton = document.getElementById("deletebtn");
        deleteButton.addEventListener("click", handleClickButtonDelete);
      }
    });
  });
}
function handleClickButtonAddModal() {
  const addPostButton = document.querySelector(".btn_add_post");

  addPostButton.addEventListener("click", function (event) {
    addModal.removeAttribute("hidden");
  });

  const closeButtons = document.querySelectorAll("#closebtn");
  const saveButtons = document.querySelectorAll("#saveChanges");

  closeButtons.forEach((closeButton) =>
    closeButton.addEventListener("clickx", function () {
      addModal.setAttribute("hidden", "true");
      saveButtons.forEach((saveButton) =>
        saveButton.removeEventListener("click", handleClickButtonAdd)
      );
    })
  );

  saveButtons.forEach((saveButton) =>
    saveButton.addEventListener("click", function () {
      addModal.setAttribute("hidden", "true");
      handleClickButtonAdd();
    })
  );
}

const render = () => {
  renderProducts();
  handleClickButtonEdit();
  handleClickButtonDeleteModal();
  handleClickButtonAddModal();
};

render();
