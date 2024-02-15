//Maxmudov Ulug'bek
const BASE_URL = 'https://dummyapi.io/data/v1';
const API_KEY = '65cc3d28b1fc2da7a0d1714b';


function getDeletedPostIds() {
  const deletedIdsString = localStorage.getItem('deletedPostIds');
  return deletedIdsString ? JSON.parse(deletedIdsString) : [];
}


function saveDeletedPostIds(deletedIds) {
  localStorage.setItem('deletedPostIds', JSON.stringify(deletedIds));
}

async function fetchPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/post`, {
      headers: { 'app-id': API_KEY }
    });
    const posts = response.data.data;
    const postGrid = document.querySelector('.grid');
    const deletedPostIds = getDeletedPostIds();

    posts.forEach(post => {
      if (!deletedPostIds.includes(post.id)) {
        const postItem = createPostItem(post);
        postGrid.appendChild(postItem);
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}


function createPostItem(post) {
  const postItem = document.createElement('div');
  postItem.id = `post-${post.id}`; // Unique identifier for each card
  postItem.classList.add('border', 'border-gray-300', 'rounded-md', 'overflow-hidden', 'relative');
  const image = post.image ? `<img src="${post.image}" class="w-full h-40 object-cover" alt="Post Image">` : '';
  const textPreview = post.text.length > 50 ? post.text.substring(0, 50) + '...' : post.text;
  postItem.innerHTML = `
    ${image}
    <div class="p-4">
        <h3 class="text-lg font-semibold">${textPreview}</h3>
        <p class="text-sm text-gray-500">${post.owner.firstName} ${post.owner.lastName}</p>
        <a href="details.html?id=${post.id}" class="text-blue-500">View Details</a>
        <button class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full cursor-pointer" onclick="deleteCard('${post.id}')">Delete</button>
    </div>
  `;
  return postItem;
}


async function deleteCard(id) {
  try {

    await axios.delete(`${BASE_URL}/post/${id}`, {
      headers: { 'app-id': API_KEY }
    });


    const postElement = document.getElementById(`post-${id}`);
    if (postElement) {
      postElement.remove();


      const deletedPostIds = getDeletedPostIds();
      deletedPostIds.push(id);
      saveDeletedPostIds(deletedPostIds);
    }
  } catch (error) {
    console.error('Error deleting post:', error);

  }
}

fetchPosts();
