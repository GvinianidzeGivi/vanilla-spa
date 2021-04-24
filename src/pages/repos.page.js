let getRepos = async (value = "") => {
  let searchValue = localStorage.getItem("search") || value;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${searchValue}&page=1&per_page=20`,
      options
    );
    const json = await response.json();
    return json.items;
  } catch (err) {
    console.log(err);
  }
};

let ReposPage = {
  render: async () => {
    let repos = await getRepos();
    let view = `
            <section class="section">
              <button id='go-back' class='btn btn--dark'>Go Back</button>
                <h1 class='text-center'> Repositories </h1>
                <ul class='card'>
                    ${repos.map(
                      (repo) =>
                        `<li>
                        <a class='d-block' href=${repo.html_url} target="_blank">${repo.name}</a>
                        <hr>
                        </li>`
                    )}
                </ul>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    let goBack = document.getElementById("go-back");
    goBack.addEventListener("click", () => {
      history.back();
    });
  },
};

export default ReposPage;
