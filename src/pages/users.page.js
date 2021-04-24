let getUsers = async (value = "") => {
  let searchValue = localStorage.getItem("search") || value;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchValue}&page=1&per_page=20`,
      options
    );
    const data = await response.json();
    return data.items;
  } catch (err) {
    console.log(err);
  }
};

let UsersPage = {
  render: async () => {
    let users = await getUsers();
    let view = `
            <section class="section">
                <button id='go-forward' class='btn btn--dark'>go forward</button>
                <input id="search" type="text" placeholder='search by criteria'/>
                <h1 class='text-center'> Users </h1>
                <ul class='card'>
                     ${
                       users
                         ? users.map(
                             (user) =>
                               `<li class='card__item'>
                              <a href="#/user/${user.login}">
                                <span class='card__title'>${user.login}</span>
                                <img src=${user.avatar_url}/>
                              </a>
                           </li>`
                           )
                         : ""
                     }
                </ul>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    let searchInput = document.getElementById("search");
    let goForward = document.getElementById("go-forward");

    goForward.addEventListener("click", () => {
      history.forward();
    });
    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        localStorage.setItem("search", e.target.value);
      }
    });
  },
};

export default UsersPage;
