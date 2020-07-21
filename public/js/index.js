import "./components/b-header.js";
import "./components/b-post-item.js";
import "./components/b-post-item-slot.js";

const deleteButtons = Array.from(
  document.querySelectorAll(".post-delete-button"),
);

const editButtons = Array.from(document.querySelectorAll(".post-edit-button"));

const draftButtons = Array.from(
  document.querySelectorAll(".post-draft-button"),
);

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const deleteId = event.target.dataset.postid;
    deletePost(deleteId);
  });
});

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const editId = event.target.dataset.postid;
    editPost(editId);
  });
});

draftButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const draftId = event.target.dataset.postid;
    draftPost(draftId);
  });
});

async function deletePost(id) {
  const response = await fetch(`/post`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  const data = await response.json();
  if (data.ok) {
    console.log(data);
    removeDomPost(data.id);
  } else {
    console.error("There was a problem deleting the post");
  }
}

async function editPost(id) {
  console.log("Edit!");
}

async function draftPost(id) {
  console.log("Draft!");
}

function removeDomPost(id) {
  const domPost = document.getElementById(id);
  domPost.setAttribute("visible", false);
  domPost.classList.add = "hidden";
  setTimeout(() => {
    domPost.remove();
  }, 400);
}
function domMsg(msgObj) {
  console.log(msgObj);
}
