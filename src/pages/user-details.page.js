import Parser from "../utils/parser.js";

let getUser = async (user) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://api.github.com/users/` + user,
      options
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

let getUserRepos = async (user) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://api.github.com/users/${user}/repos`,
      options
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
};

let UserDetailsPage = {
  render: async () => {
    let request = Parser.parseRequestURL();
    let user = await getUser(request.id);
    let userRepos = await getUserRepos(request.id);
    console.log(userRepos);

    return `
            <div>
            <button id='go-back' class='btn btn--dark'>Back To Users</button>
            </div>
            <div class="card">
                <div>
                <img src=${user.avatar_url}/>
                </div>
                <div>
                <h> username : ${user.login}</h>
                </div>
            </div>
            <h2>User Repositories </h2>
            ${
              userRepos
                ? userRepos.map(
                    (userRepo) =>
                      `<a class='d-block' href=${userRepo.svn_url} target='_blank'>${userRepo.name}</a>`
                  )
                : "user has not repo"
            }
        `;
  },
  after_render: async () => {
    let goBack = document.getElementById("go-back");
    goBack.addEventListener("click", () => {
      history.back();
    });
  },
};

export default UserDetailsPage;
